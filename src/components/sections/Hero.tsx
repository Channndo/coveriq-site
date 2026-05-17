import { motion } from "framer-motion";
import { TechBackground } from "../ui/TechBackground";

const TRUST_ITEMS = [
  { icon: "◆", text: "Licensed agent follow-up" },
  { icon: "◇", text: "256-bit encrypted submissions" },
  { icon: "○", text: "Educational-first AI" },
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-[#030712] text-white">
      <TechBackground />
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="section-padding relative mx-auto max-w-7xl pt-8">
        <motion.div
          className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              Mindroot Intelligence
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display mt-8 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Coverage Made{" "}
              <span className="gradient-text">Crystal Clear.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed"
            >
              The AI-assisted insurance platform that educates first — so you understand your
              options before you buy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a href="#quote" className="btn-primary">
                Get My Quote
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#coverage" className="btn-secondary">
                Explore Coverage
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
            >
              {TRUST_ITEMS.map((item, i) => (
                <span
                  key={item.text}
                  className="flex items-center gap-2 font-mono text-xs text-slate-500"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Tech dashboard visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            <motion.div className="gradient-border animate-float">
              <div className="glass-card p-6 sm:p-8">
                <motion.div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="font-mono text-xs text-cyan-400">COVERIQ.INTEL</span>
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/80" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                  </span>
                </motion.div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "150k+", label: "Protected", trend: "+12%" },
                    { val: "4.9", label: "Rating", trend: "★" },
                    { val: "$520", label: "Avg saved", trend: "est." },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="rounded-xl border border-white/5 bg-slate-950/50 p-4 text-center"
                    >
                      <p className="font-display text-2xl font-bold text-white">{s.val}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        {s.label}
                      </p>
                      <p className="mt-1 text-[10px] text-cyan-400">{s.trend}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div className="mt-4 space-y-2 rounded-xl border border-white/5 bg-slate-950/30 p-4">
                  <motion.div className="flex justify-between font-mono text-[10px] text-slate-500">
                    <span>COVERAGE ANALYSIS</span>
                    <span className="text-emerald-400">LIVE</span>
                  </motion.div>
                  {[85, 72, 94].map((w, i) => (
                    <div key={i} className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${w}%` }}
                        transition={{ delay: 0.8 + i * 0.15, duration: 1 }}
                      />
                    </div>
                  ))}
                </motion.div>

                <p className="mt-4 text-center font-mono text-[10px] text-slate-600">
                  *Educational estimates only · Not a guarantee
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 -top-4 rounded-lg border border-cyan-400/20 bg-slate-900/90 px-3 py-2 font-mono text-[10px] text-cyan-300 backdrop-blur-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              AI-assisted ✦
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
