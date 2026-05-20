import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSURANCE_CONCEPTS } from "../../lib/concepts";
import { SectionHeading } from "../ui/SectionHeading";
import { TechBackground } from "../ui/TechBackground";

export function HowInsuranceWorks() {
  const [active, setActive] = useState(INSURANCE_CONCEPTS[0].id);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const current = INSURANCE_CONCEPTS.find((c) => c.id === active)!;

  return (
    <section id="how-it-works" className="section-dark section-padding relative overflow-hidden">
      <TechBackground showGrid={false} />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Insurance 101"
          title="Key Concepts, Decoded"
          description="Interactive guides to terminology that carriers use every day — with examples and practical context."
          light
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="grid gap-2 sm:grid-cols-2">
            {INSURANCE_CONCEPTS.map((concept) => (
              <button
                key={concept.id}
                type="button"
                onMouseEnter={() => setActive(concept.id)}
                onClick={() => setActive(concept.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  active === concept.id
                    ? "border-cyan-400/40 bg-cyan-500/10 shadow-lg shadow-cyan-500/10"
                    : "border-white/5 bg-slate-900/40 hover:border-cyan-400/20"
                }`}
              >
                <h3 className="font-display font-semibold text-white">{concept.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{concept.short}</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              className="glass-card p-6 sm:p-8"
            >
              <span className="font-mono text-xs text-cyan-400">CONCEPT</span>
              <h3 className="font-display mt-2 text-2xl font-bold text-white">{current.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{current.detail}</p>
              <div className="mt-4 space-y-3">
                <p className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 text-sm leading-relaxed text-slate-400">
                  <strong className="text-cyan-300">Example:</strong> {current.example}
                </p>
                <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm leading-relaxed text-slate-400">
                  <strong className="text-amber-300/90">Why it matters:</strong> {current.whyItMatters}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 space-y-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500">Quick review</h3>
          {INSURANCE_CONCEPTS.slice(0, 5).map((c) => (
            <div key={c.id} className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/30">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === c.id ? null : c.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-200 hover:bg-white/[0.02]"
              >
                {c.reviewQuestion}
                <span className="shrink-0 font-mono text-cyan-400">{openFaq === c.id ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {openFaq === c.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-white/5"
                  >
                    <p className="px-5 py-4 text-sm leading-relaxed text-slate-500">{c.detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
