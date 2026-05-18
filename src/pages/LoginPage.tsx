import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoMark } from "../components/ui/LogoMark";
import {
  EXCHANGE_LOGIN_URL,
  EXCHANGE_PORTAL_URL,
  EXCHANGE_REGISTER_URL,
} from "../lib/constants";

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

        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">CoverIQ Exchange</p>
        <h1 className="font-display mt-2 text-2xl font-bold text-white">Licensed producer sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Consumer education and quotes live on cover-iq.com. Exchange is the B2B portal where licensed
          agents claim leads and manage pipeline.
        </p>

        <a href={EXCHANGE_LOGIN_URL} className="btn-primary mt-8 block w-full text-center">
          Continue to Exchange login
        </a>

        <p className="mt-4 text-sm text-slate-500">
          New producer?{" "}
          <a href={EXCHANGE_REGISTER_URL} className="text-cyan-400 hover:text-cyan-300">
            Create an account
          </a>
        </p>

        <p className="mt-4 text-xs text-slate-600">
          Redirects to{" "}
          <span className="font-mono text-slate-500">{EXCHANGE_PORTAL_URL}</span>
        </p>

        <Link to="/" className="mt-6 inline-block text-sm text-slate-500 hover:text-cyan-400">
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
