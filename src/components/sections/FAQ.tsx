import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "../../lib/faq";
import { SectionHeading } from "../ui/SectionHeading";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-dark section-padding">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Support"
          title="Frequently Asked Questions"
          description="Common questions about insurance coverage, claims, and how CoverIQ fits in."
          light
        />
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/40"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-200 hover:bg-white/[0.02]"
              >
                {item.question}
                <span className="shrink-0 font-mono text-sm text-cyan-400">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-slate-400">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
