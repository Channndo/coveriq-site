import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TechBackground } from "../components/ui/TechBackground";
import { AGENT_LOGIN_URL, AGENT_PORTAL_URL } from "../lib/constants";

const WORKFLOW = [
  { step: "01", title: "Consumer educates on CoverIQ", body: "Prospects explore coverage topics, MIRA, and submit quote requests on cover-iq.com." },
  { step: "02", title: "Lead hits your agent queue", body: "Submissions sync to CoverIQ Agent so you can prioritize follow-up." },
  { step: "03", title: "You close with context", body: "Use Mindroot-assisted notes and line-of-business context before carrier conversations." },
];

export function AgentPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-white">
      <TechBackground />
      <div className="section-padding relative mx-auto max-w-4xl py-16 md:py-24">
        <SectionHeading
          eyebrow="CoverIQ Agent"
          title="Your producer workspace"
          description="Sign in to manage leads, collaborate with MIRA, and keep quote intake connected to the public CoverIQ funnel."
          align="left"
        />

        <div className="mb-12 space-y-6">
          {WORKFLOW.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <span className="font-mono text-sm text-cyan-400">{item.step}</span>
              <div>
                <h2 className="font-display text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a href={AGENT_LOGIN_URL} className="btn-primary text-center">
            Sign in to CoverIQ Agent
          </a>
          <Link to="/" className="btn-secondary text-center">
            Back to CoverIQ
          </Link>
        </div>

        <p className="mt-6 font-mono text-xs text-slate-600">
          Portal:{" "}
          <a href={AGENT_PORTAL_URL} className="text-cyan-500/80 hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
            {AGENT_PORTAL_URL}
          </a>
        </p>

        <p className="prose-disclaimer mt-10 text-slate-600">
          Licensed producers only. CoverIQ Agent supports your workflow; binding coverage always flows through
          licensed carriers and applicable underwriting.
        </p>
      </div>
    </div>
  );
}
