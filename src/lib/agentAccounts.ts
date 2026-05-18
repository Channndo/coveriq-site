import { AGENT_ACCOUNTS_WEB_APP_URL } from "./constants";

export interface AgentAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  agencyName?: string;
  npn?: string;
  licensedStates?: string;
  action?: string;
  status?: string;
  source?: string;
  notes?: string;
  pageUrl?: string;
}

/** POST to the agent-accounts Apps Script (licensed producers / Exchange). */
export async function submitAgentAccount(
  data: AgentAccountPayload
): Promise<{ ok: boolean; error?: string }> {
  if (!AGENT_ACCOUNTS_WEB_APP_URL) {
    return { ok: false, error: "Agent accounts endpoint is not configured." };
  }

  const payload: Record<string, string> = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    agencyName: (data.agencyName || "").trim(),
    npn: (data.npn || "").trim(),
    licensedStates: (data.licensedStates || "").trim(),
    action: data.action || "signup",
    status: data.status || "pending_verification",
    source: data.source || "agents.cover-iq.com",
    notes: (data.notes || "").trim(),
    pageUrl: data.pageUrl || (typeof window !== "undefined" ? window.location.href : ""),
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    const qs = new URLSearchParams(window.location.search);
    payload.utm_source = qs.get("utm_source") || "direct";
    payload.utm_medium = qs.get("utm_medium") || "";
    payload.utm_campaign = qs.get("utm_campaign") || "";
  }

  try {
    await fetch(AGENT_ACCOUNTS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch {
    return { ok: true };
  }
}
