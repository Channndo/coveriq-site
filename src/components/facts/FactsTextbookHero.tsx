import { TEXTBOOK_INTRO, INSURANCE_TEXTBOOK } from "../../lib/insuranceTextbook";
import { TEXTBOOK_EDITION, totalReadMinutes } from "../../lib/factsTextbookMeta";

export function FactsTextbookHero() {
  const chapters = INSURANCE_TEXTBOOK.length;
  const minutes = totalReadMinutes();

  return (
    <header className="textbook-page px-8 py-10 sm:px-12 sm:py-14">
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-200/50">
          {TEXTBOOK_EDITION}
        </p>
        <div className="mt-6 border-b border-white/10 pb-8">
          <p className="font-mono text-xs text-cyan-500/80">Volume I · General Reference</p>
          <h1 className="font-display mt-2 max-w-2xl text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
            {TEXTBOOK_INTRO.title}
          </h1>
          <p className="font-textbook mt-4 text-lg italic text-slate-400">{TEXTBOOK_INTRO.subtitle}</p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Chapters</dt>
            <dd className="font-display mt-1 text-2xl font-semibold text-cyan-300/90">{chapters}</dd>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Read time</dt>
            <dd className="font-display mt-1 text-2xl font-semibold text-cyan-300/90">~{minutes} min</dd>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Format</dt>
            <dd className="mt-1 text-sm font-medium text-slate-300">Textbook</dd>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Scope</dt>
            <dd className="mt-1 text-sm font-medium text-slate-300">U.S. general</dd>
          </div>
        </dl>

        <div className="mt-10 space-y-5 border-t border-white/[0.06] pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Preface</p>
          {TEXTBOOK_INTRO.paragraphs.map((p, i) => (
            <p
              key={p.slice(0, 48)}
              className={`textbook-prose-muted max-w-none ${i === 0 ? "textbook-dropcap text-[17px] text-slate-300" : ""}`}
            >
              {p}
            </p>
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-slate-600">
          How to use this guide: read sequentially for the full narrative, or jump via the table of contents.
          Each chapter opens with learning objectives and closes with navigation to the next.
        </p>
      </div>
    </header>
  );
}
