import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TechBackground } from "../components/ui/TechBackground";
import {
  EXCHANGE_LOGIN_URL,
  EXCHANGE_PORTAL_URL,
  EXCHANGE_REGISTER_URL,
} from "../lib/constants";

const WORKFLOW = [
  { step: "01", title: "Consumer educates on CoverIQ", body: "Prospects explore coverage topics, MIRA, and submit quote requests on cover-iq.com." },
  { step: "02", title: "Leads enter Exchange", body: "Qualified submissions appear in CoverIQ Exchange for licensed producers to review and claim." },
  { step: "03", title: "You work the pipeline", body: "Dashboard, verification, and subscription tools help you follow up and close with carriers." },
];

export function AgentPage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-white">
      <TechBackground />
      <div className="section-padding relative mx-auto max-w-4xl py-16 md:py-24">
        <SectionHeading
          eyebrow="CoverIQ Exchange"
          title="B2B portal for licensed producers"
          description="The intelligent insurance lead exchange — connect CoverIQ consumer demand to your book with a producer-first dashboard."
          align="left"
        />
        <motion.div className="mb-12 space-y-6">
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
        </motion.div>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a href={EXCHANGE_LOGIN_URL} className="btn-primary text-center">Sign in to Exchange</a>
          <a href={EXCHANGE_REGISTER_URL} className="btn-secondary text-center">Register as a producer</a>
          <Link to="/" className="btn-secondary text-center">Back to CoverIQ</Link>
        </div>
        <p className="mt-6 font-mono text-xs text-slate-600">
          Portal: <a href={EXCHANGE_PORTAL_URL} className="text-cyan-500/80 hover:text-cyan-400" target="_blank" rel="noopener noreferrer">{EXCHANGE_PORTAL_URL}</a>
        </p>
        <p className="prose-disclaimer mt-10 text-slate-600">
          Licensed producers only. CoverIQ Exchange supports your workflow; binding coverage always flows through licensed carriers and applicable underwriting.
        </p>
      </div>
    </div>
  );
}
