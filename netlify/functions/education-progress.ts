const SYNTIX_API =
  process.env.SYNTIX_API_URL?.replace(/\/$/, "") || "https://api.syntrix.solutions";

const USER_ACCOUNTS_WEB_APP_URL =
  process.env.USER_ACCOUNTS_WEB_APP_URL ||
  "https://script.google.com/macros/s/AKfycbxFw9mZWuvZKcubUSQYSNIh89xa_u1dGWSk0lQaFHHAP2B7GH6poxGLsVmWljJBifTO/exec";

const SERVER_SECRET =
  process.env.EDUCATION_PROGRESS_SECRET ||
  "31653bad4a555b5bb48fd5c649abe654dc21deda11c7f4c8d9528a101dc7c5d5";

export const handler = async (event: {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
}) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  if (event.httpMethod !== "GET" && event.httpMethod !== "PUT") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  if (!SERVER_SECRET) {
    console.error("[education-progress] EDUCATION_PROGRESS_SECRET not set");
    return json(503, { ok: false, error: "Education progress sync is not configured." });
  }

  const authHeader =
    event.headers.authorization || event.headers.Authorization || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return json(401, { ok: false, error: "Sign in required." });
  }

  const email = await verifySyntrixToken(token);
  if (!email) {
    return json(401, { ok: false, error: "Invalid or expired session." });
  }

  try {
    if (event.httpMethod === "GET") {
      const progress = await callAppsScript({
        action: "educationProgressGet",
        serverSecret: SERVER_SECRET,
        email,
      });
      return json(200, {
        ok: true,
        progress: progress?.progress ?? null,
      });
    }

    let body: { progress?: unknown };
    try {
      body = JSON.parse(event.body || "{}") as { progress?: unknown };
    } catch {
      return json(400, { ok: false, error: "Invalid JSON body." });
    }

    if (!body.progress || typeof body.progress !== "object") {
      return json(400, { ok: false, error: "Missing progress object." });
    }

    await callAppsScript({
      action: "educationProgressSave",
      serverSecret: SERVER_SECRET,
      email,
      progressJson: JSON.stringify(body.progress),
    });

    return json(200, { ok: true });
  } catch (err) {
    console.error("[education-progress]", err);
    return json(502, {
      ok: false,
      error: "Could not sync education progress.",
    });
  }
};

async function verifySyntrixToken(token: string): Promise<string | null> {
  const res = await fetch(`${SYNTIX_API}/api/auth/me`, {
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    user?: { email?: string };
    email?: string;
  };
  const email = data.user?.email || data.email;
  return typeof email === "string" ? email.trim().toLowerCase() : null;
}

async function callAppsScript(payload: Record<string, string>): Promise<{
  ok?: boolean;
  progress?: unknown;
  error?: string;
}> {
  const res = await fetch(USER_ACCOUNTS_WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });
  const text = await res.text();
  try {
    return JSON.parse(text) as { ok?: boolean; progress?: unknown; error?: string };
  } catch {
    console.error("[education-progress] non-JSON upstream", text.slice(0, 200));
    throw new Error("Invalid upstream response");
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
  };
}

function json(statusCode: number, data: object) {
  return {
    statusCode,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}
