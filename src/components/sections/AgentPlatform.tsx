import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { AGENT_LOGIN_URL, AGENT_PORTAL_URL } from "../../lib/constants";

const FEATURES = [
  {
    title: "Agent workspace",
    desc: "Manage leads, follow-ups, and client conversations in one place built for licensed producers.",
    icon: "01",
  },
  {
    title: "MIRA + Mindroot",
    desc: "AI-assisted explanations you can share with clients — educational tone, compliance-aware guardrails.",
    icon: "02",
  },
  {
    title: "Quote intake sync",
    desc: "CoverIQ.com submissions flow into your pipeline so nothing falls through after a web quote.",
    icon: "03",
  },
  {
    title: "Coverage intelligence",
    desc: "Line-of-business context for auto, home, life, and commercial — before you talk to the carrier.",
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
          eyebrow="CoverIQ Agent"
          title="Built for licensed insurance professionals"
          description="The public site educates consumers. CoverIQ Agent is where producers sign in to work leads, collaborate with MIRA, and move quotes forward."
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
          <a
            href={AGENT_LOGIN_URL}
            className="btn-primary min-w-[200px] text-center"
          >
            Agent sign in
          </a>
          <Link to="/agent" className="btn-secondary min-w-[200px] text-center">
            Learn more
          </Link>
          <a
            href={AGENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-slate-500 underline-offset-4 hover:text-cyan-400 hover:underline"
          >
            Open agent portal →
          </a>
        </div>

        <p className="prose-disclaimer mt-10 text-slate-600">
          CoverIQ Agent is for licensed insurance professionals. It does not replace carrier systems,
          underwriting, or your obligations as a licensed producer.
        </p>
      </motion.div>
    </section>
  );
}
