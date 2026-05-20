import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { formatPhone } from "../lib/formatPhone";
import { CONSUMER_PASSWORD_HINT } from "../lib/passwordRules";
import { SECURITY_QUESTIONS } from "../lib/securityQuestions";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
  "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
  "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
  "WI", "WY",
];

export function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromMira = searchParams.get("from") === "mira";
  const { signUp } = useConsumerAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [currentInsuranceProvider, setCurrentInsuranceProvider] = useState("");
  const [securityQuestion1Id, setSecurityQuestion1Id] = useState<number>(SECURITY_QUESTIONS[0].id);
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityQuestion2Id, setSecurityQuestion2Id] = useState<number>(SECURITY_QUESTIONS[1].id);
  const [securityAnswer2, setSecurityAnswer2] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    const result = await signUp({
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      state,
      zip,
      currentInsuranceProvider,
      securityQuestion1Id,
      securityAnswer1,
      securityQuestion2Id,
      securityAnswer2,
    });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error || "Could not create your account.");
      return;
    }
    const onboardingPath = fromMira ? "/onboarding?from=mira" : "/onboarding";
    navigate(onboardingPath, { replace: true });
  };

  const selectClass = "input-tech w-full";

  return (
    <AuthShell
      title="Create your account"
      subtitle="Free access to MIRA — we'll personalize your experience next."
      miraNote={fromMira}
    >
      <form onSubmit={handleSubmit} className="mt-6 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
        <motion.div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            className="input-tech"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            required
            className="input-tech"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </motion.div>
        <input
          type="email"
          required
          className="input-tech w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          autoComplete="new-password"
          minLength={8}
          className="input-tech w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-xs text-slate-500">{CONSUMER_PASSWORD_HINT}</p>
        <input
          type="password"
          required
          autoComplete="new-password"
          minLength={8}
          className="input-tech w-full"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="tel"
          required
          className="input-tech w-full"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
        />
        <input
          type="text"
          required
          className="input-tech w-full"
          placeholder="Street address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <div className="grid grid-cols-6 gap-2">
          <input
            type="text"
            required
            name="city"
            autoComplete="address-level2"
            className="input-tech col-span-3"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <select
            required
            name="state"
            autoComplete="address-level1"
            aria-label="State"
            className={`${selectClass} col-span-1`}
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">ST</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="text"
            required
            name="postal-code"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={10}
            className="input-tech col-span-2"
            placeholder="ZIP"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 10))}
          />
        </div>
        <label className="block pt-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Current insurance provider
          </span>
          <input
            type="text"
            required
            name="insurance_carrier"
            autoComplete="off"
            className="input-tech mt-1 w-full"
            placeholder="e.g. Allstate, Progressive, none"
            value={currentInsuranceProvider}
            onChange={(e) => setCurrentInsuranceProvider(e.target.value)}
          />
        </label>

        <p className="pt-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">Security questions</p>
        <select
          className={selectClass}
          value={securityQuestion1Id}
          onChange={(e) => setSecurityQuestion1Id(Number(e.target.value))}
        >
          {SECURITY_QUESTIONS.map((q) => (
            <option key={q.id} value={q.id}>
              {q.text}
            </option>
          ))}
        </select>
        <input
          type="text"
          required
          className="input-tech w-full"
          placeholder="Answer"
          value={securityAnswer1}
          onChange={(e) => setSecurityAnswer1(e.target.value)}
        />
        <select
          className={selectClass}
          value={securityQuestion2Id}
          onChange={(e) => setSecurityQuestion2Id(Number(e.target.value))}
        >
          {SECURITY_QUESTIONS.filter((q) => q.id !== securityQuestion1Id).map((q) => (
            <option key={q.id} value={q.id}>
              {q.text}
            </option>
          ))}
        </select>
        <input
          type="text"
          required
          className="input-tech w-full"
          placeholder="Answer"
          value={securityAnswer2}
          onChange={(e) => setSecurityAnswer2(e.target.value)}
        />

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button type="submit" className="btn-primary mt-2 w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account & continue"}
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
    </AuthShell>
  );
}
