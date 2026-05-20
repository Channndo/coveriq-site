import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  INSURANCE_TEXTBOOK,
  TEXTBOOK_INTRO,
  type TextbookChapter,
} from "../lib/insuranceTextbook";
import { Disclaimer } from "../components/ui/Disclaimer";
import { GLOBAL_DISCLAIMER } from "../lib/constants";
import { TechBackground } from "../components/ui/TechBackground";

function ChapterContent({ chapter }: { chapter: TextbookChapter }) {
  return (
    <article id={chapter.id} className="scroll-mt-28 border-b border-white/5 pb-14 last:border-0">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-500/90">
        Chapter {chapter.number}
      </p>
      <h2 className="font-display mt-2 text-2xl font-bold text-white sm:text-3xl">{chapter.title}</h2>
      {chapter.subtitle && (
        <p className="mt-2 text-base italic text-slate-500">{chapter.subtitle}</p>
      )}

      <div className="mt-8 space-y-10">
        {chapter.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h3 className="font-display text-lg font-semibold text-cyan-200/90">{section.title}</h3>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 text-[15px] leading-[1.75] text-slate-300">
                {p}
              </p>
            ))}
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-relaxed text-slate-400">
                {section.bulletPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.laws && section.laws.length > 0 && (
              <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-900/80">
                      <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-slate-500">
                        Law / Act
                      </th>
                      <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-slate-500">
                        Year
                      </th>
                      <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-slate-500">
                        Summary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.laws.map((law) => (
                      <tr key={law.name} className="border-b border-white/5 last:border-0">
                        <td className="px-4 py-3 font-medium text-slate-200">{law.name}</td>
                        <td className="px-4 py-3 font-mono text-cyan-400/80">{law.year ?? "—"}</td>
                        <td className="px-4 py-3 text-slate-400">{law.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

export function FactsPage() {
  const location = useLocation();
  const [activeChapter, setActiveChapter] = useState(INSURANCE_TEXTBOOK[0].id);

  useEffect(() => {
    document.title = "Insurance Facts & History | CoverIQ";
    return () => {
      document.title = "CoverIQ | Insurance Explained Simply";
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && INSURANCE_TEXTBOOK.some((c) => c.id === hash)) {
      setActiveChapter(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#030712]">
      <TechBackground showGrid={false} />

      <div className="section-padding relative mx-auto max-w-7xl">
        <Link to="/" className="font-mono text-xs text-cyan-400 hover:text-cyan-300">
          ← Back to CoverIQ
        </Link>

        <header className="mt-8 max-w-3xl border-b border-white/10 pb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-500/90">
            CoverIQ Facts · Educational reference
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl">
            {TEXTBOOK_INTRO.title}
          </h1>
          <p className="mt-3 text-lg italic text-slate-500">{TEXTBOOK_INTRO.subtitle}</p>
          {TEXTBOOK_INTRO.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="mt-4 text-[15px] leading-[1.75] text-slate-400">
              {p}
            </p>
          ))}
        </header>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Table of contents */}
          <nav
            aria-label="Table of contents"
            className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:w-64 lg:shrink-0 lg:overflow-y-auto"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Contents
            </p>
            <ol className="mt-4 space-y-1">
              {INSURANCE_TEXTBOOK.map((ch) => (
                <li key={ch.id}>
                  <a
                    href={`#${ch.id}`}
                    onClick={() => setActiveChapter(ch.id)}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      activeChapter === ch.id
                        ? "bg-cyan-500/15 text-cyan-300"
                        : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                    }`}
                  >
                    <span className="font-mono text-xs text-cyan-500/70">Ch. {ch.number}</span>
                    <span className="mt-0.5 block leading-snug">{ch.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-500">
              Read straight through or jump to a chapter. For quick Q&amp;A, see the{" "}
              <Link to="/#faq" className="text-cyan-400 hover:text-cyan-300">
                FAQ
              </Link>{" "}
              on the homepage.
            </div>
          </nav>

          {/* Main textbook body */}
          <div className="min-w-0 flex-1 max-w-3xl">
            <div className="space-y-4">
              {INSURANCE_TEXTBOOK.map((chapter) => (
                <ChapterContent key={chapter.id} chapter={chapter} />
              ))}
            </div>

            <Disclaimer className="mt-12" />
            <p className="mt-4 text-xs leading-relaxed text-slate-600">{GLOBAL_DISCLAIMER}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
