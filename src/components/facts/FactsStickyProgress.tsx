import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INSURANCE_TEXTBOOK } from "../../lib/insuranceTextbook";
import { useConsumerAuth } from "../../context/ConsumerAuthContext";
import { educationProgressSummary } from "../../lib/educationProgress";

interface FactsStickyProgressProps {
  readProgress: number;
  activeChapterId: string;
}

export function FactsStickyProgress({ readProgress, activeChapterId }: FactsStickyProgressProps) {
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
      className="fixed left-0 right-0 top-[3.75rem] z-40 border-b border-white/10 bg-[#030712]/95 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur-md"
      role="region"
      aria-label="Reading and learning progress"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Reading
            </span>
            <span className="font-mono text-[10px] text-cyan-400/90">
              {Math.round(readProgress)}%
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="textbook-reading-bar h-full rounded-full transition-all duration-300"
              style={{ width: `${readProgress}%` }}
            />
          </div>
          {activeChapter && (
            <p className="mt-1 truncate text-[10px] text-slate-600">
              Ch. {activeChapter.number} — {activeChapter.title}
            </p>
          )}
        </div>

        <div className="flex-1 sm:max-w-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Learning
            </span>
            <span className="font-mono text-[10px] text-violet-300/90">
              {user ? `${summary.percent}%` : "—"}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${user ? summary.percent : 0}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-slate-600">
            {user ? (
              <>
                Quick checks {summary.quickChecksPassed}/{summary.quickChecksTotal}
                {summary.chapterExamDone ? " · Exam passed" : ""}
              </>
            ) : (
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
                Sign in to track learning
              </Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
