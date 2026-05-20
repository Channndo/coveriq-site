import { useEffect } from "react";
import { motion } from "framer-motion";
import type { InsuranceLine } from "../../lib/insuranceLines";

interface CoverageDetailModalProps {
  line: InsuranceLine;
  onClose: () => void;
  onGetQuote: (formValue: string) => void;
}

export function CoverageDetailModal({ line, onClose, onGetQuote }: CoverageDetailModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coverage-modal-title"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        className="relative z-10 flex max-h-[min(90vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900 to-[#0a1628] shadow-2xl shadow-cyan-950/40"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/90">
              {line.category} coverage
            </p>
            <h2
              id="coverage-modal-title"
              className="mt-1 flex items-center gap-2 font-display text-xl font-bold text-white sm:text-2xl"
            >
              <span className="text-2xl" aria-hidden>
                {line.icon}
              </span>
              {line.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:border-cyan-400/30 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-slate-300">{line.summary}</p>

          <div className="mt-6 space-y-5">
            <DetailBlock title="What it generally protects" accent="cyan">
              {line.protects}
            </DetailBlock>

            <DetailBlock title="Common myth" accent="amber">
              {line.misconception}
            </DetailBlock>

            <DetailBlock title="How it works in practice" accent="teal">
              {line.example}
            </DetailBlock>

            <DetailBlock title="If you don't have it" accent="rose">
              {line.withoutCoverage}
            </DetailBlock>

            {line.addOns.length > 0 && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">
                  Options people often add
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {line.addOns.map((addon) => (
                    <li
                      key={addon}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400"
                    >
                      {addon}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-slate-600">
            Educational overview only — not legal or coverage advice. Policy terms, limits, and
            exclusions vary by carrier and state.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 bg-slate-950/60 px-5 py-4 sm:flex-row sm:px-6">
          <button
            type="button"
            onClick={() => {
              onGetQuote(line.formValue);
              onClose();
            }}
            className="btn-primary flex-1 !py-3 text-sm"
          >
            Get a quote for {line.label}
          </button>
          <button type="button" onClick={onClose} className="btn-secondary !py-3 text-sm sm:w-32">
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function DetailBlock({
  title,
  accent,
  children,
}: {
  title: string;
  accent: "cyan" | "amber" | "teal" | "rose";
  children: string;
}) {
  const border =
    accent === "cyan"
      ? "border-cyan-500/25 bg-cyan-500/5"
      : accent === "amber"
        ? "border-amber-500/25 bg-amber-500/5"
        : accent === "teal"
          ? "border-teal-500/25 bg-teal-500/5"
          : "border-rose-500/25 bg-rose-500/5";

  return (
    <div className={`rounded-xl border p-4 ${border}`}>
      <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{children}</p>
    </div>
  );
}
