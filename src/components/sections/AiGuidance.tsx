import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { Disclaimer } from "../ui/Disclaimer";
import { TechBackground } from "../ui/TechBackground";

const FEATURES = [
  {
    title: "Simplified explanations",
    desc: "Complex policy language translated into educational insights you can understand.",
    icon: "01",
  },
  {
    title: "Coverage comparison",
    desc: "Side-by-side overviews of how coverage types generally differ — not binding recommendations.",
    icon: "02",
  },
  {
    title: "Smart guidance",
    desc: "Contextual tips during the quote process so you know what carriers may ask for.",
    icon: "03",
  },
];

export function AiGuidance() {
  return (
    <section id="ai-guidance" className="section-padding relative overflow-hidden border-y border-cyan-500/10 bg-gradient-to-b from-cyan-950/20 via-[#030712] to-[#030712]">
      <TechBackground />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Neural Guidance Layer"
          title="AI That Explains — Never Decides"
          description="CoverIQ uses AI-assisted tools to help explain insurance concepts. Our technology helps users understand — it does not determine your policy or guarantee outcomes."
          light
        />
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group p-6 transition hover:border-cyan-400/30"
            >
              <span className="font-mono text-3xl font-bold text-cyan-500/30 group-hover:text-cyan-400/50">
                {f.icon}
              </span>
              <h3 className="font-display mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
        <Disclaimer className="mt-10 text-center text-slate-600" compact />
      </div>
    </section>
  );
}
