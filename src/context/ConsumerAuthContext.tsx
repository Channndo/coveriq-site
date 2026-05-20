import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isSiteAdmin, resolveAccountRole } from "../lib/admin";
import {
  clearConsumerSession,
  clearLegacyAuthStorage,
  getAccessToken,
  mapSyntrixUserToProfile,
  markOnboardingComplete,
  readConsumerSession,
  writeConsumerSession,
  type ConsumerSignupInput,
  type ConsumerUser,
} from "../lib/consumerSession";
import { validateConsumerPassword } from "../lib/passwordRules";
import { securityQuestionText } from "../lib/securityQuestions";
import {
  buildRegisterPayload,
  SyntrixAuthError,
  syntrixLogin,
  syntrixLoginSecurity,
  syntrixMe,
  syntrixRegister,
} from "../lib/syntrixAuthApi";
import { submitUserAccount, submitUserOnboarding } from "../lib/userAccounts";

export interface SecurityLoginChallenge {
  email: string;
  password: string;
  challengeToken: string;
  securityQuestion1: string;
  securityQuestion2: string;
}

interface ConsumerAuthContextValue {
  user: ConsumerUser | null;
  isAdmin: boolean;
  ready: boolean;
  signUp: (data: ConsumerSignupInput) => Promise<{ ok: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<
    | { ok: true }
    | { ok: false; error: string }
    | { ok: false; needsSecurity: true; challenge: SecurityLoginChallenge }
  >;
  completeSecurityLogin: (
    challenge: SecurityLoginChallenge,
    securityAnswer1: string,
    securityAnswer2: string
  ) => Promise<{ ok: boolean; error?: string }>;
  completeOnboarding: (selections: Record<string, string | string[]>) => Promise<{ ok: boolean }>;
  signOut: () => void;
}

const ConsumerAuthContext = createContext<ConsumerAuthContextValue | null>(null);

function applySession(accessToken: string, profile: ConsumerUser) {
  writeConsumerSession(accessToken, profile);
}

export function ConsumerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ConsumerUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    clearLegacyAuthStorage();
    const token = getAccessToken();
    const cached = readConsumerSession();
    if (!token) {
      clearConsumerSession();
      setReady(true);
      return;
    }
    if (cached) setUser(cached);
    void syntrixMe(token)
      .then((me) => {
        const profile = mapSyntrixUserToProfile(me, cached ?? undefined);
        const withRole = {
          ...profile,
          role: resolveAccountRole(profile.email, profile.phone),
        };
        applySession(token, withRole);
        setUser(withRole);
      })
      .catch(() => {
        clearConsumerSession();
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const signUp = useCallback(async (data: ConsumerSignupInput) => {
    const email = data.email.trim().toLowerCase();
    const phone = data.phone.trim();

    if (!data.firstName.trim() || !data.lastName.trim()) {
      return { ok: false, error: "Please enter your first and last name." };
    }
    if (!email.includes("@")) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (phone.replace(/\D/g, "").length < 10) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
    if (!data.street.trim() || !data.city.trim() || !data.state.trim() || !data.zip.trim()) {
      return { ok: false, error: "Please complete your mailing address." };
    }
    if (!data.currentInsuranceProvider.trim()) {
      return { ok: false, error: "Please enter your current insurance provider." };
    }
    if (
      !data.securityQuestion1Id ||
      !data.securityAnswer1.trim() ||
      !data.securityQuestion2Id ||
      !data.securityAnswer2.trim()
    ) {
      return { ok: false, error: "Please complete both security questions." };
    }
    if (data.securityQuestion1Id === data.securityQuestion2Id) {
      return { ok: false, error: "Please choose two different security questions." };
    }
    if (data.securityAnswer1.trim().length < 2 || data.securityAnswer2.trim().length < 2) {
      return { ok: false, error: "Security answers must be at least 2 characters." };
    }
    const passwordError = validateConsumerPassword(data.password);
    if (passwordError) {
      return { ok: false, error: passwordError };
    }

    try {
      const payload = buildRegisterPayload(data);
      const result = await syntrixRegister(payload);
      const profile = mapSyntrixUserToProfile(result.user ?? {}, {
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        phone,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        currentInsuranceProvider: data.currentInsuranceProvider,
        securityQuestion1: securityQuestionText(data.securityQuestion1Id),
        securityQuestion2: securityQuestionText(data.securityQuestion2Id),
        createdAt: new Date().toISOString(),
        role: resolveAccountRole(email, phone),
        onboardingComplete: false,
      });
      applySession(result.accessToken, profile);
      setUser(profile);

      void submitUserAccount({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        street: profile.street,
        city: profile.city,
        state: profile.state,
        zip: profile.zip,
        currentInsuranceProvider: profile.currentInsuranceProvider,
        securityQuestion1: securityQuestionText(data.securityQuestion1Id),
        securityAnswer1: "[redacted]",
        securityQuestion2: securityQuestionText(data.securityQuestion2Id),
        securityAnswer2: "[redacted]",
        accountType: "consumer",
        action: "signup",
        status: "active",
        notes: profile.role === "admin" ? "site admin · MIRA access" : "MIRA access · Syntrix",
      });

      return { ok: true };
    } catch (err) {
      const message =
        err instanceof SyntrixAuthError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Could not create your account.";
      return { ok: false, error: message };
    }
  }, []);

  const finishLogin = useCallback(
    (accessToken: string, me: Parameters<typeof mapSyntrixUserToProfile>[0], email: string, phone: string) => {
      const profile = mapSyntrixUserToProfile(me, {
        email,
        phone,
        role: resolveAccountRole(email, phone),
        onboardingComplete: Boolean(me.onboarding_complete ?? me.onboardingComplete),
      });
      applySession(accessToken, profile);
      setUser(profile);
      void submitUserAccount({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        street: profile.street,
        city: profile.city,
        state: profile.state,
        zip: profile.zip,
        currentInsuranceProvider: profile.currentInsuranceProvider,
        securityQuestion1: profile.securityQuestion1,
        securityAnswer1: "[redacted]",
        securityQuestion2: profile.securityQuestion2,
        securityAnswer2: "[redacted]",
        accountType: "consumer",
        action: "login",
        status: "active",
      });
    },
    []
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const emailNorm = email.trim().toLowerCase();
    try {
      const result = await syntrixLogin(emailNorm, password);
      if (result.requiresSecurity) {
        const q1 = result.securityQuestions?.[0];
        const q2 = result.securityQuestions?.[1];
        if (!result.challengeToken || !q1 || !q2) {
          return {
            ok: false as const,
            error: "Additional verification is required but could not be loaded. Try again.",
          };
        }
        return {
          ok: false as const,
          needsSecurity: true as const,
          challenge: {
            email: emailNorm,
            password,
            challengeToken: result.challengeToken,
            securityQuestion1: q1.text,
            securityQuestion2: q2.text,
          },
        };
      }
      const me = result.user ?? (await syntrixMe(result.accessToken));
      finishLogin(result.accessToken, me, emailNorm, me.phone ?? "");
      return { ok: true as const };
    } catch (err) {
      return {
        ok: false as const,
        error:
          err instanceof SyntrixAuthError
            ? err.message
            : "Invalid email or password. Create a free account if you're new.",
      };
    }
  }, [finishLogin]);

  const completeSecurityLogin = useCallback(
    async (challenge: SecurityLoginChallenge, securityAnswer1: string, securityAnswer2: string) => {
      try {
        const result = await syntrixLoginSecurity({
          email: challenge.email,
          password: challenge.password,
          challenge_token: challenge.challengeToken,
          answer1: securityAnswer1.trim(),
          answer2: securityAnswer2.trim(),
        });
        const me = result.user ?? (await syntrixMe(result.accessToken));
        finishLogin(result.accessToken, me, challenge.email, me.phone ?? "");
        return { ok: true };
      } catch (err) {
        return {
          ok: false,
          error: err instanceof SyntrixAuthError ? err.message : "Security verification failed.",
        };
      }
    },
    [finishLogin]
  );

  const completeOnboarding = useCallback(async (selections: Record<string, string | string[]>) => {
    const current = readConsumerSession();
    if (!current) return { ok: false };
    void submitUserOnboarding({
      email: current.email,
      phone: current.phone,
      firstName: current.firstName,
      lastName: current.lastName,
      onboarding: selections,
    });
    markOnboardingComplete();
    setUser(readConsumerSession());
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    clearConsumerSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAdmin: isSiteAdmin(user),
      ready,
      signUp,
      signIn,
      completeSecurityLogin,
      completeOnboarding,
      signOut,
    }),
    [user, ready, signUp, signIn, completeSecurityLogin, completeOnboarding, signOut]
  );

  return <ConsumerAuthContext.Provider value={value}>{children}</ConsumerAuthContext.Provider>;
}

export function useConsumerAuth() {
  const ctx = useContext(ConsumerAuthContext);
  if (!ctx) throw new Error("useConsumerAuth must be used within ConsumerAuthProvider");
  return ctx;
}
