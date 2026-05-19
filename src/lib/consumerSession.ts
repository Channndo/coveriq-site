import { withResolvedRole, type AccountRole } from "./admin";

const SESSION_KEY = "coveriq_consumer_v3";
const REGISTRY_KEY = "coveriq_consumer_registry_v3";

export interface ConsumerUser {
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
  createdAt: string;
  role: AccountRole;
  onboardingComplete: boolean;
}

export type ConsumerSignupInput = Omit<ConsumerUser, "createdAt" | "role" | "onboardingComplete">;

function normalizeUser(user: ConsumerUser): ConsumerUser {
  return {
    ...withResolvedRole(user),
    onboardingComplete: Boolean(user.onboardingComplete),
  };
}

export function readConsumerRegistry(): ConsumerUser[] {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ConsumerUser[];
    return Array.isArray(parsed)
      ? parsed.map((u) =>
          normalizeUser({
            ...u,
            role: u.role ?? "consumer",
            onboardingComplete: u.onboardingComplete ?? false,
            street: u.street ?? "",
            city: u.city ?? "",
            state: u.state ?? "",
            zip: u.zip ?? "",
            currentInsuranceProvider: u.currentInsuranceProvider ?? "",
            securityQuestion1: u.securityQuestion1 ?? "",
            securityAnswer1: u.securityAnswer1 ?? "",
            securityQuestion2: u.securityQuestion2 ?? "",
            securityAnswer2: u.securityAnswer2 ?? "",
            password: u.password ?? "",
          })
        )
      : [];
  } catch {
    return [];
  }
}

function writeRegistry(users: ConsumerUser[]) {
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(users));
}

export function readConsumerSession(): ConsumerUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw) as ConsumerUser;
    if (!user?.email) return null;
    return normalizeUser(user);
  } catch {
    return null;
  }
}

export function writeConsumerSession(user: ConsumerUser) {
  const normalized = normalizeUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
  const registry = readConsumerRegistry();
  const email = normalized.email.toLowerCase();
  const idx = registry.findIndex((u) => u.email.toLowerCase() === email);
  if (idx >= 0) registry[idx] = normalized;
  else registry.push(normalized);
  writeRegistry(registry);
}

export function clearConsumerSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function findConsumerByCredentials(email: string, password: string): ConsumerUser | null {
  const emailNorm = email.trim().toLowerCase();
  if (!emailNorm || !password) return null;

  const user = readConsumerRegistry().find((u) => u.email.toLowerCase() === emailNorm);
  if (!user || user.password !== password) return null;
  return normalizeUser(user);
}

export function createAdminSessionUser(email: string, password: string): ConsumerUser | null {
  const match = findConsumerByCredentials(email, password);
  return match?.role === "admin" ? match : null;
}

export function markOnboardingComplete() {
  const user = readConsumerSession();
  if (!user) return;
  writeConsumerSession({ ...user, onboardingComplete: true });
}
