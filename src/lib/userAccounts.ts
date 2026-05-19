import { USER_ACCOUNTS_WEB_APP_URL } from "./constants";

export type UserAccountType = "consumer" | "agent";

export interface UserAccountSignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  currentInsuranceProvider: string;
  securityQuestion1: string;
  securityAnswer1: string;
  securityQuestion2: string;
  securityAnswer2: string;
  accountType?: UserAccountType;
  action?: string;
  status?: string;
  source?: string;
  notes?: string;
  pageUrl?: string;
}

export interface UserOnboardingPayload {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  onboarding: Record<string, string | string[]>;
}

function basePayload(
  data: UserAccountSignupPayload | (UserOnboardingPayload & Partial<UserAccountSignupPayload>)
): Record<string, string> {
  const payload: Record<string, string> = {
    firstName: (data.firstName || "").trim(),
    lastName: (data.lastName || "").trim(),
    email: (data.email || "").trim().toLowerCase(),
    phone: (data.phone || "").trim(),
    timestamp: new Date().toISOString(),
    source: ("source" in data && data.source) || "cover-iq.com",
    pageUrl:
      ("pageUrl" in data && data.pageUrl) ||
      (typeof window !== "undefined" ? window.location.href : ""),
  };

  if ("street" in data && data.street) {
    payload.street = data.street.trim();
    payload.city = (data.city || "").trim();
    payload.state = (data.state || "").trim().toUpperCase();
    payload.zip = (data.zip || "").trim();
    payload.currentInsuranceProvider = (data.currentInsuranceProvider || "").trim();
    payload.securityQuestion1 = data.securityQuestion1 || "";
    payload.securityAnswer1 = data.securityAnswer1 || "";
    payload.securityQuestion2 = data.securityQuestion2 || "";
    payload.securityAnswer2 = data.securityAnswer2 || "";
    payload.accountType = data.accountType || "consumer";
    payload.status = data.status || "active";
    payload.action = data.action || "signup";
    if (data.notes) payload.notes = data.notes;
  }

  if ("onboarding" in data && data.onboarding) {
    payload.action = "onboarding";
    payload.onboardingJson = JSON.stringify(data.onboarding);
  }

  if (typeof window !== "undefined") {
    const qs = new URLSearchParams(window.location.search);
    payload.utm_source = qs.get("utm_source") || "direct";
    payload.utm_medium = qs.get("utm_medium") || "";
    payload.utm_campaign = qs.get("utm_campaign") || "";
  }

  return payload;
}

async function postAccount(payload: Record<string, string>): Promise<{ ok: boolean; error?: string }> {
  if (!USER_ACCOUNTS_WEB_APP_URL) {
    return { ok: false, error: "User accounts endpoint is not configured." };
  }
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

export async function submitUserAccount(
  data: UserAccountSignupPayload
): Promise<{ ok: boolean; error?: string }> {
  return postAccount(basePayload(data));
}

export async function submitUserOnboarding(
  data: UserOnboardingPayload
): Promise<{ ok: boolean; error?: string }> {
  return postAccount(basePayload({ ...data, action: "onboarding", status: "active" }));
}
