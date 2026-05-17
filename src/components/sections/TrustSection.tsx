import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";

const CARRIERS = ["Allstate", "Progressive", "Safeco", "National General", "Foremost", "Hagerty"];
const TESTIMONIALS = [
  { quote: "Finally understood what my deductible actually means.", name: "Sarah M.", loc: "IN" },
  { quote: "Educational content made the process feel transparent.", name: "James T.", loc: "MI" },
  { quote: "Licensed agent called back the same day.", name: "Maria L.", loc: "OH" },
];

export function TrustSection() {
  return (
    <section className="section-elevated section-padding border-y border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust Layer"
          title="Built on Education & Expertise"
          description="Partner carriers and licensed professionals — your request handled with care."
          light
        />

        <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
          Carrier partners may include
        </p>
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {CARRIERS.map((c) => (
            <span
              key={c}
              className="rounded-lg border border-white/5 bg-slate-900/50 px-5 py-2.5 font-mono text-xs text-slate-400"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <p className="text-slate-300 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 font-mono text-xs text-slate-500">
                — {t.name} · {t.loc}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Secure", "Encrypted submissions"],
            ["Educational", "Learn before you buy"],
            ["Fast", "Quick quote requests"],
            ["Licensed", "Agent follow-up"],
          ].map(([title, sub]) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-slate-900/30 p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
                {title.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-xs text-slate-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
