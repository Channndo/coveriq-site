import { withResolvedRole, type AccountRole } from "./admin";
import { normalizePhoneDigits } from "./formatPhone";

const SESSION_KEY = "coveriq_consumer_v1";
const REGISTRY_KEY = "coveriq_consumer_registry_v1";

export interface ConsumerUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  role: AccountRole;
}

function normalizeUser(user: ConsumerUser): ConsumerUser {
  return withResolvedRole(user);
}

function readRegistry(): ConsumerUser[] {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ConsumerUser[];
    return Array.isArray(parsed) ? parsed.map((u) => normalizeUser({ ...u, role: u.role ?? "consumer" })) : [];
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
    return normalizeUser({ ...user, role: user.role ?? "consumer" });
  } catch {
    return null;
  }
}

export function writeConsumerSession(user: ConsumerUser) {
  const normalized = normalizeUser(user);
  localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
  const registry = readRegistry();
  const email = normalized.email.toLowerCase();
  const phone = normalizePhoneDigits(normalized.phone);
  const idx = registry.findIndex(
    (u) => u.email.toLowerCase() === email && normalizePhoneDigits(u.phone) === phone
  );
  if (idx >= 0) registry[idx] = normalized;
  else registry.push(normalized);
  writeRegistry(registry);
}

export function clearConsumerSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function findConsumerByCredentials(email: string, phone: string): ConsumerUser | null {
  const emailNorm = email.trim().toLowerCase();
  const phoneNorm = normalizePhoneDigits(phone);
  if (!emailNorm || phoneNorm.length < 10) return null;

  const match = readRegistry().find(
    (u) => u.email.toLowerCase() === emailNorm && normalizePhoneDigits(u.phone) === phoneNorm
  );
  if (match) return match;

  return null;
}

/** Admin can sign in on a new device without a prior local registry entry. */
export function createAdminSessionUser(email: string, phone: string): ConsumerUser | null {
  const normalized = normalizeUser({
    firstName: "Chandler",
    lastName: "Hill",
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    createdAt: new Date().toISOString(),
    role: "consumer",
  });
  return normalized.role === "admin" ? normalized : null;
}
