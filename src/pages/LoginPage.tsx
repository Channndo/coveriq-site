import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { formatPhone } from "../lib/formatPhone";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMira = searchParams.get("from") === "mira";
  const { user, isAdmin, signIn, signOut } = useConsumerAuth();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const afterAuthPath = fromMira ? "/?openMira=1" : "/";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const result = signIn(email, phone);
    if (!result.ok) {
      setError(result.error || "Could not sign in.");
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
          <Link to="/?openMira=1" className="btn-primary block w-full text-center">
            Open MIRA
          </Link>
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
      subtitle="Use the email and phone from when you created your account."
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
          type="tel"
          required
          autoComplete="tel"
          className="input-tech w-full"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
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
