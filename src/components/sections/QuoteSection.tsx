import { QuoteEngine } from "../quote/QuoteEngine";
import { SectionHeading } from "../ui/SectionHeading";
import { TechBackground } from "../ui/TechBackground";
import { getLineByFormValue } from "../../lib/insuranceLines";

interface QuoteSectionProps {
  selectedType: string;
}

export function QuoteSection({ selectedType }: QuoteSectionProps) {
  const line = selectedType ? getLineByFormValue(selectedType) : undefined;
  const tip = line
    ? `For ${line.label}: ${line.misconception}`
    : "Understanding your coverage needs before you buy helps you ask better questions with a licensed agent.";

  return (
    <section id="quote" className="section-padding relative overflow-hidden border-t border-cyan-500/10 scroll-mt-28">
      <TechBackground />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Quote Terminal"
          title="Ready When You Are"
          description="Same trusted submission pipeline — upgraded experience. Connect with licensed professionals in minutes."
          light
        />
        <div className="grid items-start gap-10 lg:grid-cols-5">
          <aside className="lg:col-span-2 space-y-4">
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white">Why CoverIQ?</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {[
                  "Educational context before submit",
                  "Licensed agent follow-up",
                  "256-bit encrypted pipeline",
                  "Zero obligation to purchase",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cyan-400">▸</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-mono text-[10px] text-slate-600">
              Submitting does not bind coverage · Subject to underwriting
            </p>
          </aside>
          <div className="lg:col-span-3">
            <QuoteEngine initialInsuranceType={selectedType} tip={tip} />
          </div>
        </div>
      </div>
    </section>
  );
}
