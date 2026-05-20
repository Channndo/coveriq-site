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

  let body: Record<string, string>;
  try {
    body = JSON.parse(event.body || "{}") as Record<string, string>;
  } catch {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  if (!body.email || !body.firstName || !body.lastName) {
    return json(400, { ok: false, error: "Missing required account fields." });
  }

  if (!body.timestamp) {
    body.timestamp = new Date().toISOString();
  }
  if (!body.source) {
    body.source = "cover-iq.com";
  }
  if (!body.accountType) {
    body.accountType = "consumer";
  }
  if (!body.action) {
    body.action = "signup";
  }
  if (!body.status) {
    body.status = "active";
  }

  try {
    const upstream = await fetch(USER_ACCOUNTS_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    const text = await upstream.text();
    let data: { ok?: boolean; error?: string; accountId?: string } = {};
    try {
      data = JSON.parse(text) as { ok?: boolean; error?: string; accountId?: string };
    } catch {
      console.error("[submit-user-account] non-JSON upstream", text.slice(0, 200));
    }

    if (!upstream.ok || data.ok === false) {
      console.error("[submit-user-account] upstream", upstream.status, data);
      return json(502, {
        ok: false,
        error: data.error || "Account notification could not be recorded.",
      });
    }

    const emailSent = data.emailSent === true;
    const emailError = data.emailError || "";
    if (!emailSent) {
      console.warn(
        "[submit-user-account] sheet row ok but email not sent",
        emailError || "(deploy Apps Script with GmailApp + run testSendEmail)"
      );
    }

    return json(200, {
      ok: true,
      accountId: data.accountId,
      emailSent,
      emailError: emailError || undefined,
    });
  } catch (err) {
    console.error("[submit-user-account]", err);
    return json(502, {
      ok: false,
      error: "Account notification failed. Please try again.",
    });
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function json(statusCode: number, data: object) {
  return {
    statusCode,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
}
