import { motion } from "framer-motion";
import { INSURANCE_LINES } from "../../lib/insuranceLines";
import { SectionHeading } from "../ui/SectionHeading";

interface LineSelectorProps {
  onSelect: (formValue: string) => void;
}

export function LineSelector({ onSelect }: LineSelectorProps) {
  const popular = INSURANCE_LINES.filter((l) =>
    ["auto", "home", "renters", "bundle", "life", "umbrella", "commercial"].includes(l.id)
  );

  return (
    <section id="lines" className="section-elevated section-padding relative border-y border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Quick Select"
          title="What Are You Protecting?"
          description="Tap a coverage type to jump straight to your quote."
          light
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {popular.map((line, i) => (
            <motion.button
              key={line.id}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(line.formValue)}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-slate-900/50 p-5 transition hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <span className="text-3xl transition group-hover:scale-110">{line.icon}</span>
              <span className="text-center font-mono text-[10px] uppercase tracking-wide text-slate-400 group-hover:text-cyan-300">
                {line.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
