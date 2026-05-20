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
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="section-padding mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="CoverIQ Exchange"
          title="The intelligent lead exchange for licensed producers"
          description="CoverIQ.com educates consumers and captures quotes. CoverIQ Exchange is where licensed agents sign in to claim leads, manage pipeline, and grow their book."
        />

        <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card flex flex-col p-6"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 font-mono text-xs font-semibold text-cyan-400">
                {f.icon}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/[0.07] to-slate-900/60 p-8 sm:p-10">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-cyan-500/90">
            Licensed producers
          </p>
          <p className="mt-2 text-center text-sm text-slate-400">
            Sign in to your account or register for producer verification.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <a
              href={EXCHANGE_LOGIN_URL}
              className="btn-primary flex-1 justify-center px-6 py-3.5 text-center text-sm font-semibold"
            >
              Exchange sign in
            </a>
            <a
              href={EXCHANGE_REGISTER_URL}
              className="btn-secondary flex-1 justify-center px-6 py-3.5 text-center text-sm font-semibold"
            >
              Create account
            </a>
          </div>

          <a
            href={EXCHANGE_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/25 hover:bg-cyan-500/5 hover:text-white"
          >
            Open agents.cover-iq.com
            <span aria-hidden className="text-cyan-400">
              →
            </span>
          </a>
        </div>

        <p className="prose-disclaimer mx-auto mt-10 max-w-2xl text-center text-slate-600">
          CoverIQ Exchange is for licensed insurance professionals only. Accounts may require verification
          before dashboard access. Binding coverage always flows through licensed carriers and underwriting.
        </p>
      </div>
    </section>
  );
}
