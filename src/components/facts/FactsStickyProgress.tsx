import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INSURANCE_TEXTBOOK } from "../../lib/insuranceTextbook";
import { useConsumerAuth } from "../../context/ConsumerAuthContext";
import { educationProgressSummary } from "../../lib/educationProgress";

interface FactsStickyProgressProps {
  activeChapterId: string;
}

export function FactsStickyProgress({ activeChapterId }: FactsStickyProgressProps) {
  const { user } = useConsumerAuth();
  const [visible, setVisible] = useState(false);
  const summary = educationProgressSummary(user);
  const activeChapter = INSURANCE_TEXTBOOK.find((c) => c.id === activeChapterId);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 z-40 overflow-visible border-b border-white/10 bg-[#030712]/98 px-4 py-3.5 shadow-lg shadow-black/30 backdrop-blur-md"
      style={{ top: "var(--coveriq-header-height, 5.5rem)" }}
      role="region"
      aria-label="Learning progress"
    >
      <div className="mx-auto flex max-w-7xl items-start gap-4">
        {activeChapter && (
          <p className="hidden min-w-0 shrink truncate text-xs leading-snug text-slate-500 sm:block sm:max-w-[38%] sm:pt-1">
            Ch. {activeChapter.number} — {activeChapter.title}
          </p>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3 pb-1">
            <span className="font-mono text-xs uppercase leading-normal tracking-wide text-slate-300">
              Learning progress
            </span>
            <span className="shrink-0 rounded-md bg-white/10 px-2.5 py-1 font-mono text-xs font-semibold leading-none tabular-nums text-cyan-100">
              {user ? `${summary.percent}%` : "—"}
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-white/15"
            role="progressbar"
            aria-valuenow={user ? summary.percent : 0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={user ? `Learning progress ${summary.percent} percent` : "Learning progress"}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${user ? summary.percent : 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs leading-snug text-slate-300">
            {user ? (
              <>
                Quick checks{" "}
                <span className="font-semibold tabular-nums text-slate-100">
                  {summary.quickChecksPassed}/{summary.quickChecksTotal}
                </span>
                {summary.chapterExamDone ? (
                  <span className="text-emerald-300/90"> · Exam passed</span>
                ) : null}
              </>
            ) : (
              <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                Sign in to track learning
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
