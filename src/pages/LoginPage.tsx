import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoMark } from "../components/ui/LogoMark";
import { AGENT_LOGIN_URL, AGENT_PORTAL_URL } from "../lib/constants";

export function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#030712] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="gradient-border w-full max-w-md rounded-2xl p-8 text-center"
      >
        <div className="mb-6 flex justify-center">
          <LogoMark className="h-12 w-12" />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">CoverIQ Agent</p>
        <h1 className="font-display mt-2 text-2xl font-bold text-white">Licensed agent sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Consumer quotes and education live on CoverIQ.com. Agents sign in to the producer portal to
          manage leads and work with MIRA.
        </p>

        <a href={AGENT_LOGIN_URL} className="btn-primary mt-8 block w-full text-center">
          Continue to sign in
        </a>

        <p className="mt-4 text-xs text-slate-600">
          You will be redirected to{" "}
          <span className="font-mono text-slate-500">{AGENT_PORTAL_URL}</span>
        </p>

        <Link
          to="/"
          className="mt-6 inline-block text-sm text-slate-500 hover:text-cyan-400"
        >
          ← Back to CoverIQ
        </Link>

        <p className="mt-8 border-t border-white/5 pt-6 text-xs text-slate-600">
          Looking for a quote?{" "}
          <Link to="/#quote" className="text-cyan-400 hover:text-cyan-300">
            Get a quote on the homepage
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
