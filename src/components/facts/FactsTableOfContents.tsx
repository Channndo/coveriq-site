import { Link } from "react-router-dom";
import { INSURANCE_TEXTBOOK } from "../../lib/insuranceTextbook";
import { CHAPTER_META } from "../../lib/factsTextbookMeta";
import { useConsumerAuth } from "../../context/ConsumerAuthContext";
import { educationProgressSummary, isChapterQuickCheckPassed } from "../../lib/educationProgress";

interface FactsTableOfContentsProps {
  activeChapterId: string;
  activeSectionId: string | null;
}

export function FactsTableOfContents({
  activeChapterId,
  activeSectionId,
}: FactsTableOfContentsProps) {
  const { user } = useConsumerAuth();
  const learning = educationProgressSummary(user);

  return (
    <nav
      aria-label="Table of contents"
      className="lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-7rem)] lg:w-72 lg:shrink-0 lg:flex-col"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-slate-950/80 p-5 backdrop-blur-sm lg:overflow-hidden lg:flex lg:flex-col">
        <div className="mb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Table of contents
          </p>
          {user ? (
            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
                  Learning track
                </p>
                <span className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums text-cyan-100">
                  {learning.percent}%
                </span>
              </div>
              <div
                className="mt-2 h-2 overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-valuenow={learning.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Learning progress ${learning.percent} percent`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${learning.percent}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-300">
                Checks{" "}
                <span className="font-semibold tabular-nums text-slate-100">
                  {learning.quickChecksPassed}/{learning.quickChecksTotal}
                </span>
                {learning.chapterExamDone ? (
                  <span className="text-emerald-300/90"> · exam passed</span>
                ) : null}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-[10px] leading-relaxed text-slate-600">
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                Sign in
              </Link>{" "}
              to track quick checks and exam progress.
            </p>
          )}
        </div>

        <ol className="mt-2 space-y-1 overflow-y-auto pr-1 lg:flex-1">
          {INSURANCE_TEXTBOOK.map((ch) => {
            const isChapterActive = activeChapterId === ch.id;
            const meta = CHAPTER_META[ch.id];
            return (
              <li key={ch.id}>
                <a
                  href={`#${ch.id}`}
                  className={`block rounded-lg px-2.5 py-2 transition ${
                    isChapterActive
                      ? "textbook-toc-active -ml-px"
                      : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                  }`}
                >
                  <span className="font-mono text-[10px] text-cyan-500/70">
                    Ch. {ch.number}
                    {meta ? ` · ${meta.readMinutes}m` : ""}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-sm leading-snug">
                    {ch.title}
                    {user && isChapterQuickCheckPassed(user.email, ch.number) && (
                      <span className="text-emerald-500/80" title="Quick check passed">
                        ✓
                      </span>
                    )}
                  </span>
                </a>
                {isChapterActive && (
                  <ul className="mb-2 ml-3 mt-0.5 space-y-0.5 border-l border-white/[0.06] pl-3">
                    {ch.sections.map((sec) => {
                      const sectionLabel = sec.title.replace(/^\d+\.\d+\s*/, "");
                      const isSectionActive = activeSectionId === sec.id;
                      return (
                        <li key={sec.id}>
                          <a
                            href={`#${sec.id}`}
                            className={`block rounded py-1 pl-1 text-xs leading-snug transition ${
                              isSectionActive
                                ? "font-medium text-cyan-300"
                                : "text-slate-600 hover:text-slate-400"
                            }`}
                          >
                            {sectionLabel}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-5 hidden border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-slate-500 lg:block">
          <p>
            Jump between chapters or sections. For definitions, see the{" "}
            <Link to="/glossary" className="text-cyan-400 hover:text-cyan-300">
              glossary
            </Link>
            ; for quick answers, the{" "}
            <Link to="/#faq" className="text-cyan-400 hover:text-cyan-300">
              FAQ
            </Link>
            .
          </p>
        </div>
      </div>
    </nav>
  );
}
