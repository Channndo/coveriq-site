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
  createAdminSessionUser,
  findConsumerByCredentials,
  markOnboardingComplete,
  readConsumerRegistry,
  readConsumerSession,
  writeConsumerSession,
  type ConsumerSignupInput,
  type ConsumerUser,
} from "../lib/consumerSession";
import { validateConsumerPassword } from "../lib/passwordRules";
import { submitUserAccount, submitUserOnboarding } from "../lib/userAccounts";

interface ConsumerAuthContextValue {
  user: ConsumerUser | null;
  isAdmin: boolean;
  ready: boolean;
  signUp: (data: ConsumerSignupInput) => Promise<{ ok: boolean; error?: string }>;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  completeOnboarding: (selections: Record<string, string | string[]>) => Promise<{ ok: boolean }>;
  signOut: () => void;
}

const ConsumerAuthContext = createContext<ConsumerAuthContextValue | null>(null);

export function ConsumerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ConsumerUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readConsumerSession());
    setReady(true);
  }, []);

  const signUp = useCallback(async (data: ConsumerSignupInput) => {
    const email = data.email.trim().toLowerCase();
    const phone = data.phone.trim();
    const userRecord: ConsumerUser = {
      ...data,
      email,
      phone,
      state: data.state.trim().toUpperCase(),
      createdAt: new Date().toISOString(),
      role: resolveAccountRole(email, phone),
      onboardingComplete: false,
    };

    if (!userRecord.firstName || !userRecord.lastName) {
      return { ok: false, error: "Please enter your first and last name." };
    }
    if (!email.includes("@")) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (userRecord.phone.replace(/\D/g, "").length < 10) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
    if (!userRecord.street || !userRecord.city || !userRecord.state || !userRecord.zip) {
      return { ok: false, error: "Please complete your mailing address." };
    }
    if (!userRecord.currentInsuranceProvider) {
      return { ok: false, error: "Please enter your current insurance provider." };
    }
    if (!userRecord.securityQuestion1 || !userRecord.securityAnswer1) {
      return { ok: false, error: "Please complete security question 1." };
    }
    if (!userRecord.securityQuestion2 || !userRecord.securityAnswer2) {
      return { ok: false, error: "Please complete security question 2." };
    }
    const passwordError = validateConsumerPassword(data.password);
    if (passwordError) {
      return { ok: false, error: passwordError };
    }

    const existing = readConsumerRegistry().find((u) => u.email.toLowerCase() === email);
    if (existing) {
      return { ok: false, error: "An account with this email already exists. Sign in instead." };
    }

    void submitUserAccount({
      ...userRecord,
      accountType: "consumer",
      action: "signup",
      status: "active",
      notes: userRecord.role === "admin" ? "site admin · MIRA access" : "MIRA access",
    });

    writeConsumerSession(userRecord);
    setUser(userRecord);
    return { ok: true };
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const match = findConsumerByCredentials(email, password) ?? createAdminSessionUser(email, password);
    if (!match) {
      return {
        ok: false,
        error: "Invalid email or password. Create a free account if you're new.",
      };
    }
    writeConsumerSession(match);
    setUser(match);
    void submitUserAccount({
      firstName: match.firstName,
      lastName: match.lastName,
      email: match.email,
      phone: match.phone,
      street: match.street,
      city: match.city,
      state: match.state,
      zip: match.zip,
      currentInsuranceProvider: match.currentInsuranceProvider,
      securityQuestion1: match.securityQuestion1,
      securityAnswer1: match.securityAnswer1,
      securityQuestion2: match.securityQuestion2,
      securityAnswer2: match.securityAnswer2,
      accountType: "consumer",
      action: "login",
      status: "active",
    });
    return { ok: true };
  }, []);

  const completeOnboarding = useCallback(
    async (selections: Record<string, string | string[]>) => {
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
      const updated = readConsumerSession();
      setUser(updated);
      return { ok: true };
    },
    []
  );

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
      completeOnboarding,
      signOut,
    }),
    [user, ready, signUp, signIn, completeOnboarding, signOut]
  );

  return <ConsumerAuthContext.Provider value={value}>{children}</ConsumerAuthContext.Provider>;
}

export function useConsumerAuth() {
  const ctx = useContext(ConsumerAuthContext);
  if (!ctx) throw new Error("useConsumerAuth must be used within ConsumerAuthProvider");
  return ctx;
}
