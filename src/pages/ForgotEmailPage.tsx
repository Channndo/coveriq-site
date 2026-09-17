import { Link } from "react-router-dom";
import { AuthShell } from "../components/auth/AuthShell";

export function ForgotEmailPage() {
  return (
    <AuthShell
      title="Forgot your email?"
      subtitle="CoverIQ uses your email address as your username — there is no separate username."
    >
      <div className="mt-6 space-y-4 text-sm text-slate-400">
        <p>
          Try the address you used when you{" "}
          <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300">
            created your account
          </Link>
          . Common places to check:
        </p>
        <ul className="list-inside list-disc space-y-2 text-slate-400">
          <li>Inbox and spam for messages from CoverIQ or cover-iq.com</li>
          <li>Password manager or browser saved logins</li>
          <li>Another email you use for insurance or newsletter signups</li>
        </ul>
        <p>
          If you signed up with a phone number only in the past, create a new free account with your
          current email — or contact{" "}
          <a
            href="mailto:support@cover-iq.com"
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            support@cover-iq.com
          </a>{" "}
          and we can help locate your record.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link to="/login" className="btn-primary w-full text-center">
          Back to sign in
        </Link>
        <Link
          to="/forgot-password"
          className="w-full py-2 text-center text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          Forgot password instead?
        </Link>
      </div>
    </AuthShell>
  );
}
