import { withResolvedRole, type AccountRole } from "./admin";
import type { SyntrixMeUser } from "./syntrixAuthApi";

const TOKEN_KEY = "coveriq_access_token_v1";
const PROFILE_KEY = "coveriq_profile_v1";
const LEGACY_KEYS = ["coveriq_consumer_v3", "coveriq_consumer_registry_v3"] as const;

/** Safe profile stored locally — never includes password or security answers. */
export interface ConsumerUser {
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
  securityQuestion2: string;
  createdAt: string;
  role: AccountRole;
  onboardingComplete: boolean;
}

export type ConsumerSignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
};

function normalizeUser(user: ConsumerUser): ConsumerUser {
  return {
    ...withResolvedRole(user),
    onboardingComplete: Boolean(user.onboardingComplete),
  };
}

export function clearLegacyAuthStorage(): void {
  for (const key of LEGACY_KEYS) {
    localStorage.removeItem(key);
  }
}

export function getAccessToken(): string | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    return token && token.length > 10 ? token : null;
  } catch {
    return null;
  }
}

export function readConsumerSession(): ConsumerUser | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as ConsumerUser;
    if (!user?.email) return null;
    return normalizeUser(user);
  } catch {
    return null;
  }
}

export function writeConsumerSession(accessToken: string, user: ConsumerUser): void {
  const normalized = normalizeUser(user);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(normalized));
  clearLegacyAuthStorage();
}

export function updateConsumerProfile(patch: Partial<ConsumerUser>): void {
  const current = readConsumerSession();
  const token = getAccessToken();
  if (!current || !token) return;
  writeConsumerSession(token, { ...current, ...patch });
}

export function clearConsumerSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PROFILE_KEY);
}

export function markOnboardingComplete(): void {
  updateConsumerProfile({ onboardingComplete: true });
}

export function mapSyntrixUserToProfile(
  me: SyntrixMeUser,
  fallback?: Partial<ConsumerUser>
): ConsumerUser {
  const email = (me.email ?? fallback?.email ?? "").trim().toLowerCase();
  const phone = (me.phone ?? fallback?.phone ?? "").trim();
  return normalizeUser({
    firstName: me.first_name ?? me.firstName ?? fallback?.firstName ?? "",
    lastName: me.last_name ?? me.lastName ?? fallback?.lastName ?? "",
    email,
    phone,
    street: me.street ?? fallback?.street ?? "",
    city: me.city ?? fallback?.city ?? "",
    state: (me.state ?? fallback?.state ?? "").toString().toUpperCase(),
    zip: (me.zip ?? me.postal_code ?? fallback?.zip ?? "").toString(),
    currentInsuranceProvider:
      me.current_insurance_provider ??
      me.currentInsuranceProvider ??
      fallback?.currentInsuranceProvider ??
      "",
    securityQuestion1: me.security_question_1 ?? fallback?.securityQuestion1 ?? "",
    securityQuestion2: me.security_question_2 ?? fallback?.securityQuestion2 ?? "",
    createdAt: fallback?.createdAt ?? new Date().toISOString(),
    role: fallback?.role ?? "consumer",
    onboardingComplete: Boolean(me.onboarding_complete ?? me.onboardingComplete ?? fallback?.onboardingComplete),
  });
}
