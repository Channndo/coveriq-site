const USER_ACCOUNTS_WEB_APP_URL =
  process.env.USER_ACCOUNTS_WEB_APP_URL ||
  "https://script.google.com/macros/s/AKfycbxFw9mZWuvZKcubUSQYSNIh89xa_u1dGWSk0lQaFHHAP2B7GH6poxGLsVmWljJBifTO/exec";

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
}) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  let body: { email?: string };
  try {
    body = JSON.parse(event.body || "{}") as { email?: string };
  } catch {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { ok: false, error: "Valid email is required." });
  }

  try {
    const upstream = await fetch(USER_ACCOUNTS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "passwordResetRequest", email }),
      redirect: "follow",
    });

    const text = await upstream.text();
    let data: { ok?: boolean; message?: string; error?: string } = {};
    try {
      data = JSON.parse(text) as { ok?: boolean; message?: string; error?: string };
    } catch {
      console.error("[password-reset-request] non-JSON", text.slice(0, 200));
    }

    if (!upstream.ok || data.ok === false) {
      console.error("[password-reset-request] upstream", upstream.status, data);
      return json(502, {
        ok: false,
        error: data.error || "Could not process reset request.",
      });
    }

    return json(200, {
      ok: true,
      message:
        data.message ||
        "If an account exists for this email, you will receive reset instructions shortly.",
    });
  } catch (err) {
    console.error("[password-reset-request]", err);
    return json(502, { ok: false, error: "Account service unavailable. Try again later." });
  }
};

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function json(statusCode: number, body: object) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
    body: JSON.stringify(body),
  };
}
