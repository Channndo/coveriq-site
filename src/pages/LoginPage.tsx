import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { useConsumerAuth, type SecurityLoginChallenge } from "../context/ConsumerAuthContext";
import { readConsumerSession } from "../lib/consumerSession";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMira = searchParams.get("from") === "mira";
  const { user, signIn, completeSecurityLogin } = useConsumerAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityChallenge, setSecurityChallenge] = useState<SecurityLoginChallenge | null>(null);
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const goAfterAuth = (session: { onboardingComplete: boolean }) => {
    if (!session.onboardingComplete) {
      navigate(fromMira ? "/onboarding?from=mira" : "/onboarding", { replace: true });
      return;
    }
    navigate(fromMira ? "/account?from=mira" : "/account", { replace: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await signIn(email, password);
    setSubmitting(false);
    if (result.ok) {
      const session = readConsumerSession();
      if (session) goAfterAuth(session);
      else navigate("/account", { replace: true });
      return;
    }
    if ("needsSecurity" in result && result.needsSecurity) {
      setSecurityChallenge(result.challenge);
      return;
    }
    if ("error" in result) {
      setError(result.error || "Could not sign in.");
    }
  };

  const handleSecuritySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!securityChallenge) return;
    setError("");
    setSubmitting(true);
    const result = await completeSecurityLogin(
      securityChallenge,
      securityAnswer1,
      securityAnswer2
    );
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error || "Verification failed.");
      return;
    }
    const session = readConsumerSession();
    if (session) goAfterAuth(session);
    else navigate("/account", { replace: true });
  };

  if (user) {
    return <Navigate to="/account" replace />;
  }

  if (securityChallenge) {
    return (
      <AuthShell
        title="Verify your identity"
        subtitle="Answer your security questions to finish signing in."
        miraNote={fromMira}
      >
        <form onSubmit={handleSecuritySubmit} className="mt-6 space-y-3">
          <p className="text-sm text-slate-400">{securityChallenge.securityQuestion1}</p>
          <input
            type="text"
            required
            autoComplete="off"
            className="input-tech w-full"
            placeholder="Answer"
            value={securityAnswer1}
            onChange={(e) => setSecurityAnswer1(e.target.value)}
          />
          <p className="pt-2 text-sm text-slate-400">{securityChallenge.securityQuestion2}</p>
          <input
            type="text"
            required
            autoComplete="off"
            className="input-tech w-full"
            placeholder="Answer"
            value={securityAnswer2}
            onChange={(e) => setSecurityAnswer2(e.target.value)}
          />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full">
            {submitting ? "Verifying…" : "Continue"}
          </button>
          <button
            type="button"
            className="w-full py-2 text-sm text-slate-500 hover:text-slate-300"
            onClick={() => {
              setSecurityChallenge(null);
              setSecurityAnswer1("");
              setSecurityAnswer2("");
            }}
          >
            Back to sign in
          </button>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Sign in with the email and password you used when you created your account."
      miraNote={fromMira}
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="email"
          required
          autoComplete="email"
          className="input-tech w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          minLength={8}
          className="input-tech w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-rose-400">
            {error}{" "}
            <Link to={fromMira ? "/signup?from=mira" : "/signup"} className="text-cyan-400 hover:text-cyan-300">
              Create an account
            </Link>
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full">
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        New to CoverIQ?{" "}
        <Link
          to={fromMira ? "/signup?from=mira" : "/signup"}
          className="font-medium text-cyan-400 hover:text-cyan-300"
        >
          Create a free account
        </Link>
      </p>
    </AuthShell>
  );
}
