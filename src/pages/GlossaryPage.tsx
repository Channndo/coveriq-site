import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GLOSSARY_TERMS } from "../lib/glossary";
import { Disclaimer } from "../components/ui/Disclaimer";
import { GLOBAL_DISCLAIMER } from "../lib/constants";
import { TechBackground } from "../components/ui/TechBackground";

export function GlossaryPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <TechBackground />
      <div className="section-padding relative mx-auto max-w-4xl">
        <Link to="/" className="font-mono text-xs text-cyan-400 hover:text-cyan-300">
          ← Back to CoverIQ
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display mt-6 text-4xl font-bold text-white"
        >
          Insurance Glossary
        </motion.h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-500">
          In-depth definitions of common insurance terms — with context and examples where helpful.
        </p>

        <dl className="mt-12 space-y-5">
          {GLOSSARY_TERMS.map((item, i) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="glass-card p-6"
            >
              <dt className="font-display text-lg font-semibold text-cyan-300">{item.term}</dt>
              <dd className="mt-3 space-y-3">
                <p className="text-sm font-medium text-slate-300">{item.definition}</p>
                <p className="text-sm leading-relaxed text-slate-400">{item.detail}</p>
                {item.example && (
                  <p className="rounded-lg border border-cyan-500/15 bg-cyan-500/5 p-3 text-sm leading-relaxed text-slate-500">
                    <strong className="text-cyan-400/90">Example:</strong> {item.example}
                  </p>
                )}
              </dd>
            </motion.div>
          ))}
        </dl>

        <Disclaimer className="mt-12" />
        <p className="mt-4 prose-disclaimer">{GLOBAL_DISCLAIMER}</p>
      </div>
    </div>
  );
}
