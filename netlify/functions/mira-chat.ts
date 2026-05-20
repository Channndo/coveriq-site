import {
  MIRA_OFF_TOPIC_REPLY,
  MIRA_SYSTEM_PROMPT,
  assessConversationOnTopic,
  assessMiraUserMessage,
} from "../../src/lib/miraGuardrails";

const SYNTRIX_CHAT_URL = "https://api.syntrix.solutions/api/mira/chat";

type ChatMessage = { role: string; content: string };

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "https://cover-iq.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function json(status: number, body: unknown, extraHeaders?: Record<string, string>) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json", ...corsHeaders(), ...extraHeaders },
    body: JSON.stringify(body),
  };
}

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
  headers: Record<string, string | undefined>;
}) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { detail: "Method not allowed" });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = JSON.parse(event.body || "{}") as { messages?: ChatMessage[] };
  } catch {
    return json(400, { detail: "Invalid JSON body" });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  const conversation = raw.filter(
    (m) =>
      m &&
      typeof m.content === "string" &&
      (m.role === "user" || m.role === "assistant")
  );

  const lastUser = [...conversation].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return json(400, { detail: "A user message is required." });
  }

  const priorOnTopic = assessConversationOnTopic(
    conversation.slice(0, -1).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))
  );

  const gate = assessMiraUserMessage(lastUser.content, priorOnTopic);
  if (!gate.allowed) {
    return json(200, { message: MIRA_OFF_TOPIC_REPLY, model: "guardrail" });
  }

  const forwardBody = {
    systemPrompt: MIRA_SYSTEM_PROMPT,
    messages: [{ role: "system", content: MIRA_SYSTEM_PROMPT }, ...conversation],
  };

  const auth = event.headers.authorization || event.headers.Authorization;

  try {
    const upstream = await fetch(SYNTRIX_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(forwardBody),
    });

    const data = (await upstream.json().catch(() => ({}))) as {
      message?: string;
      detail?: string;
      model?: string;
    };

    if (!upstream.ok) {
      return json(upstream.status, {
        detail: data.detail || "MIRA is temporarily unavailable.",
      });
    }

    return json(200, { message: data.message ?? "", model: data.model });
  } catch {
    return json(502, { detail: "Could not reach MIRA." });
  }
};
