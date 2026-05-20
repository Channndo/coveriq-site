import { Link } from "react-router-dom";
import { buildStudyInsights, type ChapterInsight } from "../../lib/studyInsights";
import type { ConsumerUser } from "../../lib/consumerSession";

interface StudyInsightsCardProps {
  user: ConsumerUser;
}

export function StudyInsightsCard({ user }: StudyInsightsCardProps) {
  const insights = buildStudyInsights(user.email);

  return (
    <section className="rounded-xl border border-violet-500/20 bg-violet-500/[0.04] p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/80">
            Study insights
          </h2>
          <p className="mt-1 text-xs text-slate-500">Private · only on this device</p>
        </div>
        {insights.overallAccuracy !== null && (
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-violet-200">
              {insights.overallAccuracy}%
            </p>
            <p className="text-[10px] text-slate-500">
              {insights.totalAnswered} questions tracked
            </p>
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-400">{insights.headline}</p>

      {!insights.hasData ? (
        <div className="mt-4 rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-400">
          <p>Start with any chapter quick check on the{" "}
            <Link to="/facts" className="text-cyan-400 hover:text-cyan-300">
              Facts
            </Link>{" "}
            page, or take the{" "}
            <Link to="/facts/quiz?count=10" className="text-cyan-400 hover:text-cyan-300">
              10-question exam
            </Link>
            . We&apos;ll show strengths, gaps, and where to read next.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {insights.strengths.length > 0 && (
            <InsightGroup title="Strengths" tone="emerald" items={insights.strengths} />
          )}
          {insights.weaknesses.length > 0 && (
            <InsightGroup title="Needs review" tone="amber" items={insights.weaknesses} />
          )}
          {insights.studyNext.length > 0 && (
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-cyan-500/90">
                Study next
              </h3>
              <ul className="mt-2 space-y-2">
                {insights.studyNext.map((ch) => (
                  <StudyRow key={ch.chapterId} chapter={ch} showReason />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function InsightGroup({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "emerald" | "amber";
  items: ChapterInsight[];
}) {
  const titleClass =
    tone === "emerald"
      ? "text-emerald-400/90"
      : "text-amber-300/90";

  return (
    <div>
      <h3 className={`font-mono text-[10px] uppercase tracking-wider ${titleClass}`}>{title}</h3>
      <ul className="mt-2 space-y-2">
        {items.map((ch) => (
          <StudyRow key={ch.chapterId} chapter={ch} />
        ))}
      </ul>
    </div>
  );
}

function StudyRow({ chapter, showReason }: { chapter: ChapterInsight; showReason?: boolean }) {
  const reason = !chapter.quickCheckPassed
    ? "Quick check not passed"
    : chapter.accuracy !== null
      ? `${chapter.accuracy}% on ${chapter.questionsAnswered} questions`
      : "Not assessed yet";

  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/30 px-3 py-2.5">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-slate-200">
          Ch. {chapter.chapterNumber} — {chapter.title}
        </p>
        {showReason && (
          <p className="mt-0.5 text-xs text-slate-500">{reason}</p>
        )}
        {!showReason && chapter.accuracy !== null && (
          <p className="mt-0.5 text-xs text-slate-500">{chapter.accuracy}% accuracy</p>
        )}
      </div>
      <Link
        to={chapter.studyHref}
        className="shrink-0 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
      >
        Study →
      </Link>
    </li>
  );
}
