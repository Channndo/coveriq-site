import { USER_ACCOUNTS_WEB_APP_URL } from "./constants";

export type UserAccountType = "consumer" | "agent";

export interface UserAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountType: UserAccountType;
  action?: string;
  status?: string;
  source?: string;
  notes?: string;
  pageUrl?: string;
}

/** POST to the user-accounts Apps Script (separate spreadsheet from quote leads). */
export async function submitUserAccount(
  data: UserAccountPayload
): Promise<{ ok: boolean; error?: string }> {
  if (!USER_ACCOUNTS_WEB_APP_URL) {
    return { ok: false, error: "User accounts endpoint is not configured." };
  }

  const payload: Record<string, string> = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    accountType: data.accountType,
    action: data.action || "signup",
    status: data.status || "pending",
    source: data.source || "cover-iq.com",
    notes: (data.notes || "").trim(),
    pageUrl: data.pageUrl || window.location.href,
    timestamp: new Date().toISOString(),
  };

  const qs = new URLSearchParams(window.location.search);
  payload.utm_source = qs.get("utm_source") || "direct";
  payload.utm_medium = qs.get("utm_medium") || "";
  payload.utm_campaign = qs.get("utm_campaign") || "";

  try {
    await fetch(USER_ACCOUNTS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch {
    return { ok: true };
  }
}
