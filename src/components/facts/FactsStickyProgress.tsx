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
      className="fixed left-0 right-0 top-[3.75rem] z-40 border-b border-white/10 bg-[#030712]/95 px-4 py-2 shadow-lg shadow-black/30 backdrop-blur-md"
      role="region"
      aria-label="Learning progress"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        {activeChapter && (
          <p className="hidden min-w-0 shrink truncate text-xs text-slate-500 sm:block sm:max-w-[40%]">
            Ch. {activeChapter.number} — {activeChapter.title}
          </p>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Learning progress
            </span>
            <span className="font-mono text-[10px] text-violet-300/90">
              {user ? `${summary.percent}%` : "—"}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${user ? summary.percent : 0}%` }}
              role="progressbar"
              aria-valuenow={user ? summary.percent : 0}
              aria-valuemin={0}
              aria-valuemax={100}
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
