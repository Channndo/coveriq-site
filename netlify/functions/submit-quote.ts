const QUOTE_WEB_APP_URL =
  process.env.QUOTE_WEB_APP_URL ||
  "https://script.google.com/macros/s/AKfycbyt1mrcdt6HP3uuaNwOQ1FcQKdHk95YK7z7KWph8azpx8HzhVkThX9Ept7IwwYQ2VhD/exec";

const ALLOWED_KEYS = new Set([
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "zipCode",
  "insuranceType",
  "vehicleCount",
  "timestamp",
  "utm_source",
  "utm_medium",
  "utm_campaign",
]);

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

  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_KEYS.has(key) && typeof value === "string") {
      payload[key] = value;
    }
  }

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.insuranceType) {
    return json(400, { ok: false, error: "Missing required fields" });
  }

  if (!payload.timestamp) {
    payload.timestamp = new Date().toISOString();
  }

  try {
    const upstream = await fetch(QUOTE_WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!upstream.ok) {
      console.error("[submit-quote] upstream status", upstream.status);
      return json(502, {
        ok: false,
        error: "We could not confirm your request was received. Please try again or call us.",
      });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("[submit-quote]", err);
    return json(502, {
      ok: false,
      error: "Submission failed. Please try again in a moment.",
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
