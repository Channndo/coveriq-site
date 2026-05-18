import { normalizePhoneDigits } from "./formatPhone";
import { SUPPORT_EMAIL, SUPPORT_PHONE_HREF } from "./constants";

/** Sole site admin — only this email can receive the admin role. */
export const SITE_ADMIN_EMAIL = SUPPORT_EMAIL;

const SITE_ADMIN_PHONE_DIGITS = SUPPORT_PHONE_HREF.replace(/\D/g, "");

export type AccountRole = "admin" | "consumer";

export function isSiteAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === SITE_ADMIN_EMAIL;
}

/** Admin role requires the configured admin email and support phone number. */
export function canGrantAdmin(email: string, phone: string): boolean {
  return isSiteAdminEmail(email) && normalizePhoneDigits(phone) === SITE_ADMIN_PHONE_DIGITS;
}

export function resolveAccountRole(email: string, phone: string): AccountRole {
  return canGrantAdmin(email, phone) ? "admin" : "consumer";
}

export function withResolvedRole<T extends { email: string; phone: string; role?: AccountRole }>(
  user: T
): T & { role: AccountRole } {
  const role = resolveAccountRole(user.email, user.phone);
  return { ...user, role };
}

export function isSiteAdmin(user: { email: string; phone: string; role?: AccountRole } | null): boolean {
  if (!user) return false;
  return user.role === "admin" && canGrantAdmin(user.email, user.phone);
}
