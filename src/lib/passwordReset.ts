import { syntrixApiBase } from "./syntrixAuthApi";

const SUCCESS_MESSAGE =
  "If an account exists for this email, you'll receive reset instructions shortly. Check your inbox and spam folder.";

/** Try Syntrix reset API (when available), then Apps Script notification fallback. */
export async function requestPasswordReset(email: string): Promise<{
  ok: boolean;
  message: string;
}> {
  const emailNorm = email.trim().toLowerCase();

  const syntrixPaths = [
    "/api/auth/password/forgot",
    "/api/auth/password/reset-request",
    "/api/auth/password/forgot-password",
  ];

  for (const path of syntrixPaths) {
    try {
      const res = await fetch(`${syntrixApiBase()}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: emailNorm }),
      });
      if (res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        return {
          ok: true,
          message: data.message || SUCCESS_MESSAGE,
        };
      }
      if (res.status !== 404 && res.status !== 405) {
        break;
      }
    } catch {
      /* try next path or fallback */
    }
  }

  try {
    const res = await fetch("/api/password-reset-request", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: emailNorm }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      message?: string;
      error?: string;
    };
    if (!res.ok || data.ok === false) {
      return {
        ok: false,
        message: data.error || "Could not send reset request. Try again or contact support@cover-iq.com.",
      };
    }
    return { ok: true, message: data.message || SUCCESS_MESSAGE };
  } catch {
    return {
      ok: false,
      message: "Could not reach the account service. Check your connection and try again.",
    };
  }
}
