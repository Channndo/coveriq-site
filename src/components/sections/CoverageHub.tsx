import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSURANCE_LINES, type InsuranceCategory } from "../../lib/insuranceLines";
import { SectionHeading } from "../ui/SectionHeading";
import { Disclaimer } from "../ui/Disclaimer";
import { TechBackground } from "../ui/TechBackground";

const TABS: { id: InsuranceCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "personal", label: "Personal" },
  { id: "specialty", label: "Specialty" },
  { id: "life", label: "Life" },
  { id: "commercial", label: "Commercial" },
];

interface CoverageHubProps {
  onGetQuote: (formValue: string) => void;
}

export function CoverageHub({ onGetQuote }: CoverageHubProps) {
  const [tab, setTab] = useState<InsuranceCategory | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    tab === "all" ? INSURANCE_LINES : INSURANCE_LINES.filter((l) => l.category === tab);

  return (
    <section id="coverage" className="section-dark section-padding relative overflow-hidden">
      <TechBackground showGrid={false} />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Coverage Intelligence"
          title="Understand Before You Insure"
          description="Explore what each coverage type generally helps protect — in plain language, without binding advice."
          light
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition ${
                tab === t.id
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/25"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-400/30 hover:text-cyan-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((line, i) => (
            <motion.article
              key={line.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card group flex flex-col p-5 transition hover:border-cyan-400/20"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{line.icon}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/80">
                  {line.category}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{line.label}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-400 leading-relaxed">{line.summary}</p>
              <button
                type="button"
                onClick={() => setExpanded(expanded === line.id ? null : line.id)}
                className="mt-3 text-left font-mono text-xs text-cyan-400 hover:text-cyan-300"
              >
                {expanded === line.id ? "− collapse" : "+ learn more"}
              </button>
              <AnimatePresence>
                {expanded === line.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 space-y-2 overflow-hidden border-t border-white/5 pt-3 text-xs text-slate-500"
                  >
                    <p>
                      <strong className="text-slate-400">Protects:</strong> {line.protects}
                    </p>
                    <p>
                      <strong className="text-slate-400">Myth:</strong> {line.misconception}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => onGetQuote(line.formValue)}
                  className="btn-primary flex-1 !py-2.5 text-xs"
                >
                  Get Quote
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <Disclaimer className="mt-12 text-center text-slate-600" />
      </div>
    </section>
  );
}
