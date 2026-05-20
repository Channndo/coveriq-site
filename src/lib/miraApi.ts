import { getAccessToken } from "./consumerSession";

export interface MiraMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MiraStatus {
  enabled: boolean;
  responded: boolean;
  httpOk: boolean;
}

export interface MiraChatResponse {
  message: string;
  model?: string;
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = { Accept: "application/json" };
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** Same-origin via Netlify proxy → api.syntrix.solutions Mindroot stack */
export function miraApiBase(): string {
  const env = import.meta.env.VITE_MIRA_API_BASE as string | undefined;
  if (env !== undefined && env !== "") return env.replace(/\/$/, "");
  return "";
}

export async function fetchMiraStatus(): Promise<MiraStatus> {
  const base = miraApiBase();
  try {
    const r = await fetch(`${base}/api/mira/status`, {
      credentials: "omit",
      headers: authHeaders(),
    });
    const d = (await r.json().catch(() => ({}))) as { enabled?: boolean };
    return { responded: true, httpOk: r.ok, enabled: !!(r.ok && d.enabled) };
  } catch {
    return { responded: false, httpOk: false, enabled: false };
  }
}

export async function sendMiraChat(messages: MiraMessage[]): Promise<{
  ok: boolean;
  status: number;
  data?: MiraChatResponse;
  error?: string;
}> {
  const base = miraApiBase();
  try {
    const r = await fetch(`${base}/api/mira/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      credentials: "omit",
      body: JSON.stringify({ messages }),
    });
    const data = (await r.json().catch(() => ({}))) as MiraChatResponse & {
      detail?: string | { msg?: string }[];
    };
    if (!r.ok) {
      const err =
        typeof data.detail === "string"
          ? data.detail
          : r.status === 429
            ? "Too many requests — please wait a moment."
            : "MIRA is temporarily unavailable.";
      return { ok: false, status: r.status, error: err };
    }
    return { ok: true, status: r.status, data };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      error: e instanceof Error ? e.message : "Could not reach MIRA.",
    };
  }
}
