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
  readConsumerSession,
  writeConsumerSession,
  type ConsumerUser,
} from "../lib/consumerSession";
import { submitUserAccount } from "../lib/userAccounts";

interface ConsumerAuthContextValue {
  user: ConsumerUser | null;
  isAdmin: boolean;
  ready: boolean;
  signUp: (data: Omit<ConsumerUser, "createdAt" | "role">) => Promise<{ ok: boolean; error?: string }>;
  signIn: (email: string, phone: string) => { ok: boolean; error?: string };
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

  const signUp = useCallback(async (data: Omit<ConsumerUser, "createdAt" | "role">) => {
    const email = data.email.trim().toLowerCase();
    const phone = data.phone.trim();
    const userRecord: ConsumerUser = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email,
      phone,
      createdAt: new Date().toISOString(),
      role: resolveAccountRole(email, phone),
    };

    if (!userRecord.firstName || !userRecord.lastName) {
      return { ok: false, error: "Please enter your first and last name." };
    }
    if (!userRecord.email.includes("@")) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (userRecord.phone.replace(/\D/g, "").length < 10) {
      return { ok: false, error: "Please enter a valid phone number." };
    }

    void submitUserAccount({
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      email: userRecord.email,
      phone: userRecord.phone,
      accountType: "consumer",
      action: "signup",
      status: "active",
      notes: userRecord.role === "admin" ? "site admin · MIRA access" : "MIRA access",
    });

    writeConsumerSession(userRecord);
    setUser(userRecord);
    return { ok: true };
  }, []);

  const signIn = useCallback((email: string, phone: string) => {
    const match = findConsumerByCredentials(email, phone) ?? createAdminSessionUser(email, phone);
    if (!match) {
      return {
        ok: false,
        error: "No account found on this device. Create a free account first.",
      };
    }
    writeConsumerSession(match);
    setUser(match);
    void submitUserAccount({
      firstName: match.firstName,
      lastName: match.lastName,
      email: match.email,
      phone: match.phone,
      accountType: "consumer",
      action: "login",
      status: "active",
      notes: match.role === "admin" ? "site admin" : undefined,
    });
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    clearConsumerSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAdmin: isSiteAdmin(user), ready, signUp, signIn, signOut }),
    [user, ready, signUp, signIn, signOut]
  );

  return <ConsumerAuthContext.Provider value={value}>{children}</ConsumerAuthContext.Provider>;
}

export function useConsumerAuth() {
  const ctx = useContext(ConsumerAuthContext);
  if (!ctx) throw new Error("useConsumerAuth must be used within ConsumerAuthProvider");
  return ctx;
}
