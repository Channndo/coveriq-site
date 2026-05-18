import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { formatPhone } from "../lib/formatPhone";

export function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMira = searchParams.get("from") === "mira";
  const { signUp } = useConsumerAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const afterAuthPath = fromMira ? "/?openMira=1" : "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await signUp({ firstName, lastName, email, phone });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error || "Could not create your account.");
      return;
    }
    navigate(afterAuthPath, { replace: true });
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free access to MIRA and personalized insurance education."
      miraNote={fromMira}
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            autoComplete="given-name"
            className="input-tech"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            required
            autoComplete="family-name"
            className="input-tech"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button type="submit" className="btn-primary mt-2 w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to={fromMira ? "/login?from=mira" : "/login"}
          className="font-medium text-cyan-400 hover:text-cyan-300"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-600">
        By creating an account, you agree we may contact you about your insurance education and quote
        requests. This is not binding coverage.
      </p>
    </AuthShell>
  );
}
