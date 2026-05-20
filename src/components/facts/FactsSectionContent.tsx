import type { TextbookSection } from "../../lib/insuranceTextbook";

function isTimelineSection(section: TextbookSection): boolean {
  return (
    section.id.includes("timeline") || section.title.toLowerCase().includes("timeline")
  );
}

function parseTimelineItem(item: string): { year: string; text: string } {
  const dash = item.indexOf(" — ");
  if (dash > 0) {
    return { year: item.slice(0, dash).trim(), text: item.slice(dash + 3).trim() };
  }
  const hyphen = item.indexOf(" - ");
  if (hyphen > 0) {
    return { year: item.slice(0, hyphen).trim(), text: item.slice(hyphen + 3).trim() };
  }
  return { year: "", text: item };
}

export function FactsSectionContent({
  section,
  leadDropCap = false,
}: {
  section: TextbookSection;
  leadDropCap?: boolean;
}) {
  const showTimeline = isTimelineSection(section) && section.bulletPoints;

  return (
    <section id={section.id} className="scroll-mt-32">
      <div className="flex items-center gap-4">
        <div className="textbook-section-rule shrink-0" />
        <h3 className="font-display text-lg font-semibold tracking-tight text-slate-100">
          {section.title}
        </h3>
      </div>

      <div className="mt-6 space-y-5">
        {section.paragraphs.map((p, i) => (
          <p
            key={`${section.id}-p-${i}`}
            className={`textbook-prose max-w-none ${leadDropCap && i === 0 ? "textbook-dropcap" : ""}`}
          >
            {p}
          </p>
        ))}
      </div>

      {section.bulletPoints && section.bulletPoints.length > 0 && !showTimeline && (
        <div className="mt-6 textbook-callout">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-500/80">
            Key points
          </p>
          <ul className="textbook-objectives mt-3 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-slate-300">
            {section.bulletPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {showTimeline && section.bulletPoints && (
        <div className="mt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Historical timeline
          </p>
          <ol className="textbook-timeline mt-5 space-y-0">
            {section.bulletPoints.map((item) => {
              const { year, text } = parseTimelineItem(item);
              return (
                <li key={item} className="textbook-timeline-item">
                  {year ? (
                    <p className="font-mono text-xs font-medium text-cyan-400/90">{year}</p>
                  ) : null}
                  <p className="mt-0.5 text-[15px] leading-relaxed text-slate-300">{text || item}</p>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {section.laws && section.laws.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.08] bg-slate-950/50">
          <table className="textbook-law-table w-full min-w-[520px] text-left text-sm">
            <caption>Reference table — laws and acts</caption>
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/90">
                <th className="px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Law / Act
                </th>
                <th className="px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Year
                </th>
                <th className="px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {section.laws.map((law, row) => (
                <tr
                  key={law.name}
                  className={row % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}
                >
                  <td className="px-5 py-3.5 font-medium text-slate-200">{law.name}</td>
                  <td className="px-5 py-3.5 font-mono text-sm text-cyan-400/85">{law.year ?? "—"}</td>
                  <td className="px-5 py-3.5 leading-relaxed text-slate-400">{law.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.citations && section.citations.length > 0 && (
        <div className="mt-8 textbook-callout border-cyan-500/15">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-500/80">
            Sources & further reading
          </p>
          <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-300">
            {section.citations.map((cite) => (
              <li key={`${cite.source}-${cite.url ?? "no-url"}`}>
                {cite.url ? (
                  <a
                    href={cite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-cyan-400/95 underline decoration-cyan-500/30 underline-offset-2 transition hover:text-cyan-300"
                  >
                    {cite.source}
                  </a>
                ) : (
                  <span className="font-medium text-slate-200">{cite.source}</span>
                )}
                {cite.note ? (
                  <span className="text-slate-500"> — {cite.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            External links are for general education. CoverIQ does not control third-party sites; verify
            current information with your state insurance department or a licensed professional.
          </p>
        </div>
      )}
    </section>
  );
}
