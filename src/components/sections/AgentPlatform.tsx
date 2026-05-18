import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import {
  EXCHANGE_LOGIN_URL,
  EXCHANGE_PORTAL_URL,
  EXCHANGE_REGISTER_URL,
} from "../../lib/constants";

const FEATURES = [
  {
    title: "Lead exchange",
    desc: "Licensed producers browse and claim qualified leads from the CoverIQ consumer funnel.",
    icon: "01",
  },
  {
    title: "Producer dashboard",
    desc: "Track pipeline, follow-ups, and account status in one workspace built for agents.",
    icon: "02",
  },
  {
    title: "MIRA + Mindroot",
    desc: "AI-assisted coverage explanations you can use with clients — educational, compliance-aware.",
    icon: "03",
  },
  {
    title: "Plans & billing",
    desc: "Starter and Professional tiers via Stripe — scale as your book grows.",
    icon: "04",
  },
];

export function AgentPlatform() {
  return (
    <section id="agent" className="relative scroll-mt-24 border-t border-white/5 bg-[#020617] py-24">
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <motion.div className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="CoverIQ Exchange"
          title="The intelligent lead exchange for licensed producers"
          description="CoverIQ.com educates consumers and captures quotes. CoverIQ Exchange is where licensed agents sign in to claim leads, manage pipeline, and grow their book."
        />

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="gradient-border rounded-2xl p-6"
            >
              <span className="font-mono text-xs text-cyan-400">{f.icon}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={EXCHANGE_LOGIN_URL} className="btn-primary min-w-[200px] text-center">
            Exchange sign in
          </a>
          <a href={EXCHANGE_REGISTER_URL} className="btn-secondary min-w-[200px] text-center">
            Create account
          </a>
          <a
            href={EXCHANGE_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-slate-500 underline-offset-4 hover:text-cyan-400 hover:underline"
          >
            Open Exchange →
          </a>
        </div>

        <p className="prose-disclaimer mt-10 text-slate-600">
          CoverIQ Exchange is for licensed insurance professionals only. Accounts may require verification
          before dashboard access. Binding coverage always flows through licensed carriers and underwriting.
        </p>
      </motion.div>
    </section>
  );
}
