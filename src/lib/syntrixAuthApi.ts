/**
 * Syntrix password auth API (consumer accounts).
 * Default: same-origin via Netlify proxy (/api/auth/* → api.syntrix.solutions).
 * Set VITE_SYNTRIX_API_URL only for local dev against Syntrix directly if needed.
 */

export function syntrixApiBase(): string {
  // Production always uses same-origin /api/auth/* proxy (Netlify → Syntrix).
  // Direct api.syntrix.solutions calls fail in the browser (no ACAO for cover-iq.com).
  if (import.meta.env.PROD) return "";

  const env = import.meta.env.VITE_SYNTRIX_API_URL as string | undefined;
  if (env?.trim()) return env.replace(/\/$/, "");
  return "";
}

export class SyntrixAuthError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "SyntrixAuthError";
  }
}

export interface SyntrixMeUser {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  postal_code?: string;
  current_insurance_provider?: string;
  currentInsuranceProvider?: string;
  security_question_1?: string;
  security_question_2?: string;
  onboarding_complete?: boolean;
  onboardingComplete?: boolean;
  role?: string;
  [key: string]: unknown;
}

export interface SyntrixAuthResult {
  accessToken: string;
  user?: SyntrixMeUser;
  requiresSecurity?: boolean;
  securityQuestions?: string[];
}

function extractToken(data: Record<string, unknown>): string | null {
  const token =
    (data.access_token as string) ||
    (data.accessToken as string) ||
    (data.token as string) ||
    null;
  return typeof token === "string" && token.length > 0 ? token : null;
}

async function parseJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function syntrixFetch(path: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(`${syntrixApiBase()}${path}`, init);
  } catch (e) {
    throw new SyntrixAuthError(
      "Could not reach the account service. Check your connection and try again.",
      0,
      "network"
    );
  }
}

function errorMessage(data: Record<string, unknown>, fallback: string): string {
  const detail = data.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0] && typeof detail[0] === "object") {
    const first = detail[0] as { msg?: string };
    if (first.msg) return first.msg;
  }
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  return fallback;
}

export async function syntrixRegister(body: Record<string, unknown>): Promise<SyntrixAuthResult> {
  const res = await syntrixFetch("/api/auth/password/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new SyntrixAuthError(errorMessage(data, "Registration failed."), res.status);
  }
  const token = extractToken(data);
  if (!token) {
    throw new SyntrixAuthError("Registration succeeded but no session token was returned.", res.status);
  }
  return {
    accessToken: token,
    user: data.user as SyntrixMeUser | undefined,
  };
}

export async function syntrixLogin(email: string, password: string): Promise<SyntrixAuthResult> {
  const res = await syntrixFetch("/api/auth/password/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new SyntrixAuthError(errorMessage(data, "Invalid email or password."), res.status);
  }

  const requiresSecurity =
    data.requires_security === true ||
    data.requiresSecurity === true ||
    data.security_required === true;

  if (requiresSecurity) {
    const questions = (data.security_questions ?? data.securityQuestions) as string[] | undefined;
    return { accessToken: "", requiresSecurity: true, securityQuestions: questions };
  }

  const token = extractToken(data);
  if (!token) {
    throw new SyntrixAuthError("Sign-in requires additional verification.", res.status, "no_token");
  }
  return {
    accessToken: token,
    user: data.user as SyntrixMeUser | undefined,
  };
}

export async function syntrixLoginSecurity(body: Record<string, unknown>): Promise<SyntrixAuthResult> {
  const res = await syntrixFetch("/api/auth/password/login/security", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new SyntrixAuthError(errorMessage(data, "Security verification failed."), res.status);
  }
  const token = extractToken(data);
  if (!token) {
    throw new SyntrixAuthError("Verification succeeded but no session token was returned.", res.status);
  }
  return {
    accessToken: token,
    user: data.user as SyntrixMeUser | undefined,
  };
}

export async function syntrixMe(accessToken: string): Promise<SyntrixMeUser> {
  const res = await syntrixFetch("/api/auth/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new SyntrixAuthError(errorMessage(data, "Session expired. Please sign in again."), res.status);
  }
  return (data.user ?? data) as SyntrixMeUser;
}

export function buildRegisterPayload(input: {
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
}): Record<string, unknown> {
  return {
    email: input.email.trim().toLowerCase(),
    password: input.password,
    first_name: input.firstName.trim(),
    last_name: input.lastName.trim(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    phone: input.phone.trim(),
    street: input.street.trim(),
    city: input.city.trim(),
    state: input.state.trim().toUpperCase(),
    zip: input.zip.trim(),
    postal_code: input.zip.trim(),
    current_insurance_provider: input.currentInsuranceProvider.trim(),
    currentInsuranceProvider: input.currentInsuranceProvider.trim(),
    security_question_1: input.securityQuestion1,
    security_answer_1: input.securityAnswer1,
    security_question_2: input.securityQuestion2,
    security_answer_2: input.securityAnswer2,
  };
}
