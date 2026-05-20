import { Link } from "react-router-dom";
import { INSURANCE_TEXTBOOK } from "../../lib/insuranceTextbook";
import {
  educationProgressSummary,
  isChapterQuickCheckPassed,
} from "../../lib/educationProgress";
import type { ConsumerUser } from "../../lib/consumerSession";

interface EducationProgressCardProps {
  user: ConsumerUser;
}

export function EducationProgressCard({ user }: EducationProgressCardProps) {
  const summary = educationProgressSummary(user);

  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Education progress
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Facts textbook · chapter quick checks · chapter exam
          </p>
        </div>
        <p className="font-display text-3xl font-bold text-cyan-300">{summary.percent}%</p>
      </div>

      <div
        className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={summary.percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
          style={{ width: `${summary.percent}%` }}
        />
      </div>

      <ul className="mt-5 space-y-2 text-sm">
        <li className="flex items-center gap-2 text-slate-300">
          <StatusDot done={summary.onboardingDone} />
          Account setup {summary.onboardingDone ? "complete" : "— finish onboarding"}
        </li>
        <li className="flex items-center gap-2 text-slate-300">
          <StatusDot done={summary.readingComplete} />
          Textbook reading {summary.readingComplete ? "complete" : "in progress"}
        </li>
        <li className="flex items-center gap-2 text-slate-300">
          <StatusDot done={summary.quickChecksPassed === summary.quickChecksTotal} />
          Chapter quick checks {summary.quickChecksPassed}/{summary.quickChecksTotal}
        </li>
        <li className="flex items-center gap-2 text-slate-300">
          <StatusDot done={summary.chapterExamDone} />
          10-question chapter exam {summary.chapterExamDone ? "passed" : "not yet"}
        </li>
        {summary.courseComplete && (
          <li className="flex items-center gap-2 text-emerald-300/90">
            <StatusDot done />
            Facts course complete
          </li>
        )}
      </ul>

      <div className="mt-5 max-h-48 space-y-1 overflow-y-auto pr-1">
        {INSURANCE_TEXTBOOK.map((ch) => {
          const done = isChapterQuickCheckPassed(user.email, ch.number);
          return (
            <Link
              key={ch.id}
              to={`/facts#${ch.id}`}
              className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-cyan-300"
            >
              <span>
                Ch. {ch.number} — {ch.title}
              </span>
              <span className={done ? "text-emerald-400" : "text-slate-600"}>
                {done ? "✓" : "—"}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link to="/facts" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-cyan-300 hover:bg-white/5">
          Continue reading Facts
        </Link>
        <Link
          to="/facts/quiz?count=10"
          className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/15"
        >
          Take 10-question exam
        </Link>
      </div>
    </section>
  );
}

function StatusDot({ done }: { done: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${done ? "bg-emerald-400" : "bg-slate-600"}`}
      aria-hidden
    />
  );
}
