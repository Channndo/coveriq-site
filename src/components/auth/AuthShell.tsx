import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogoMark } from "../ui/LogoMark";
import { EXCHANGE_LOGIN_URL } from "../../lib/constants";

interface AuthShellProps {
  title: string;
  subtitle: string;
  miraNote?: boolean;
  children: ReactNode;
}

export function AuthShell({ title, subtitle, miraNote, children }: AuthShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md flex-col justify-center px-4 py-16 sm:max-w-lg"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl shadow-black/20 backdrop-blur-sm">
        <div className="mb-6 flex justify-center">
          <LogoMark className="h-11 w-11" />
        </div>

        <h1 className="font-display text-center text-2xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-center text-sm text-slate-400">{subtitle}</p>

        {miraNote && (
          <p className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-center text-xs leading-relaxed text-slate-400">
            A free CoverIQ account is required to chat with{" "}
            <span className="font-medium text-cyan-300">MIRA</span>, our AI insurance educator.
          </p>
        )}

        {children}

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          Licensed producer?{" "}
          <a
            href={EXCHANGE_LOGIN_URL}
            className="font-medium text-cyan-400 hover:text-cyan-300"
            rel="noopener noreferrer"
          >
            Agent login on Exchange
          </a>
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-slate-600">
        <Link to="/" className="hover:text-cyan-400">
          ← Back to CoverIQ
        </Link>
      </p>
    </motion.div>
  );
}
