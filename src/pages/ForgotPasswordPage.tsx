import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { requestPasswordReset } from "../lib/passwordReset";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    const result = await requestPasswordReset(email);
    setSubmitting(false);
    if (result.ok) {
      setMessage(result.message);
      return;
    }
    setError(result.message);
  };

  return (
    <AuthShell
      title="Forgot password"
      subtitle="Enter the email on your CoverIQ account. We'll send reset instructions if we find a match."
    >
      {message ? (
        <div className="mt-6 space-y-4">
          <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </p>
          <Link to="/login" className="btn-primary block w-full text-center">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="input-tech w-full"
            placeholder="Email on your account"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full">
            {submitting ? "Sending…" : "Send reset instructions"}
          </button>
        </form>
      )}

      <p className="mt-5 text-center text-sm text-slate-500">
        Remember your email?{" "}
        <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
          Sign in
        </Link>
        {" · "}
        <Link to="/forgot-email" className="font-medium text-cyan-400 hover:text-cyan-300">
          Forgot email?
        </Link>
      </p>
    </AuthShell>
  );
}
