import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { readConsumerSession } from "../lib/consumerSession";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMira = searchParams.get("from") === "mira";
  const { user, isAdmin, signIn, signOut } = useConsumerAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const afterAuthPath = fromMira ? "/?openMira=1" : "/";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = signIn(email, password);
    if (!result.ok) {
      setError(result.error || "Could not sign in.");
      return;
    }
    const session = readConsumerSession();
    if (session && !session.onboardingComplete) {
      navigate(fromMira ? "/onboarding?from=mira" : "/onboarding", { replace: true });
      return;
    }
    navigate(afterAuthPath, { replace: true });
  };

  if (user) {
    return (
      <AuthShell
        title={`Welcome back, ${user.firstName}`}
        subtitle={
          isAdmin
            ? "Signed in as site admin. You have full access including MIRA."
            : "You're signed in and can use MIRA on CoverIQ."
        }
      >
        <div className="mt-6 space-y-3">
          {!user.onboardingComplete ? (
            <Link
              to={fromMira ? "/onboarding?from=mira" : "/onboarding"}
              className="btn-primary block w-full text-center"
            >
              Complete setup
            </Link>
          ) : (
            <Link to="/?openMira=1" className="btn-primary block w-full text-center">
              Open MIRA
            </Link>
          )}
          <Link to="/" className="btn-secondary block w-full text-center">
            Back to homepage
          </Link>
          <button type="button" className="w-full py-2 text-sm text-slate-500 hover:text-slate-300" onClick={signOut}>
            Sign out
          </button>
        </div>
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

        <button type="submit" className="btn-primary mt-2 w-full">
          Sign in
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
