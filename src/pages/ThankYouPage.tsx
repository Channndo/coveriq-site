import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  GLOBAL_DISCLAIMER,
} from "../lib/constants";
import { TechBackground } from "../components/ui/TechBackground";

export function ThankYouPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center p-4">
      <TechBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-border max-w-2xl w-full"
      >
        <div className="glass-card p-10 text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
            <svg className="h-10 w-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
            Request received
          </span>
          <h1 className="font-display mt-2 text-3xl font-bold text-white">You&apos;re All Set</h1>
          <p className="mt-4 text-lg text-slate-400">
            A licensed professional will review your request and follow up within 24 hours.
          </p>

          <div className="mt-8 rounded-xl border border-white/5 bg-slate-950/50 p-6 text-left max-w-md mx-auto">
            <h2 className="font-mono text-xs uppercase tracking-wider text-slate-500">Next steps</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <span className="font-mono text-cyan-400">01</span> Request securely received
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-cyan-400">02</span> Licensed agent reviews
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-cyan-400">03</span> Personalized options sent
              </li>
            </ol>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Questions?{" "}
            <a href={SUPPORT_PHONE_HREF} className="text-cyan-400 hover:underline">
              {SUPPORT_PHONE}
            </a>
          </p>

          <Link to="/" className="btn-primary mt-8 inline-block">
            Back to Home
          </Link>

          <div className="mt-10 border-t border-white/5 pt-6 text-left text-xs text-slate-600 space-y-3">
            <p>{GLOBAL_DISCLAIMER}</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
