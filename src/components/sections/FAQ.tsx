import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "../../lib/faq";
import { INSURANCE_HISTORY_SECTIONS } from "../../lib/insuranceHistory";
import { SectionHeading } from "../ui/SectionHeading";
import { Disclaimer } from "../ui/Disclaimer";

export function FAQ() {
  const [openHistory, setOpenHistory] = useState<string | null>("origins");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="section-dark section-padding">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Support & education"
          title="Frequently Asked Questions"
          description="Insurance history, regulation, and answers to common coverage questions."
          light
        />

        {/* History & regulation */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            History of insurance & U.S. regulation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            An in-depth educational overview — from ancient risk pooling to modern state and federal
            law. Not legal advice; rules vary by state.
          </p>

          <div className="mt-8 space-y-2">
            {INSURANCE_HISTORY_SECTIONS.map((section) => (
              <motion.div
                key={section.id}
                className="overflow-hidden rounded-xl border border-cyan-500/10 bg-slate-900/50"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenHistory(openHistory === section.id ? null : section.id)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-100 hover:bg-cyan-500/5"
                >
                  {section.title}
                  <span className="shrink-0 font-mono text-sm text-cyan-400">
                    {openHistory === section.id ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openHistory === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="space-y-4 px-5 py-5">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 48)}
                            className="text-sm leading-relaxed text-slate-400"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Practical FAQs */}
        <div>
          <h2 className="font-display text-xl font-bold text-white">Common coverage questions</h2>
          <p className="mt-2 text-sm text-slate-500">
            Practical questions about policies, claims, and CoverIQ.
          </p>
          <div className="mt-6 space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={item.question}
                className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-200 hover:bg-white/[0.02]"
                >
                  {item.question}
                  <span className="shrink-0 font-mono text-sm text-cyan-400">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
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

        <Disclaimer className="mt-12 text-center text-slate-600" />
      </div>
    </section>
  );
}
