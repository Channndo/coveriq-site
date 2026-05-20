import { Link } from "react-router-dom";
import { useConsumerAuth } from "../../context/ConsumerAuthContext";
import {
  advancedQuizLockReason,
  educationProgressSummary,
  isAdvancedQuizUnlocked,
} from "../../lib/educationProgress";

interface FactsQuizListProps {
  compact?: boolean;
}

export function FactsQuizList({ compact }: FactsQuizListProps) {
  const { user } = useConsumerAuth();
  const summary = educationProgressSummary(user);
  const advancedUnlocked = isAdvancedQuizUnlocked(user);
  const lockReason = advancedQuizLockReason(user);

  return (
    <section className={compact ? "space-y-3" : "textbook-page mt-16 px-8 py-10 sm:px-10"}>
      {!compact && (
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500/90">
            End-of-text review
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-white">Facts quizzes</h2>
          <p className="textbook-prose-muted mt-3">
            Chapter quick checks are at the end of each chapter. Pass the 10-question exam to unlock
            the 20- and 50-question practice exams.
          </p>
        </div>
      )}
      <ul className="space-y-2">
        <QuizRow
          label="10-question chapter exam"
          detail="One question per chapter · instant feedback"
          href="/facts/quiz?count=10"
          unlocked
          done={summary.chapterExamDone}
        />
        <QuizRow
          label="20-question comprehensive quiz"
          detail="Broader review from the question bank"
          href="/facts/quiz?count=20"
          unlocked={advancedUnlocked}
          done={summary.quiz20Done}
          lockReason={lockReason}
        />
        <QuizRow
          label="50-question mastery quiz"
          detail="Full-length practice · results at the end"
          href="/facts/quiz?count=50"
          unlocked={advancedUnlocked}
          done={summary.quiz50Done}
          lockReason={lockReason}
        />
      </ul>
      {!user && (
        <p className="mt-4 text-center text-sm text-slate-500">
          <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
            Sign in
          </Link>{" "}
          to save quiz progress to your account and unlock advanced exams.
        </p>
      )}
    </section>
  );
}

function QuizRow({
  label,
  detail,
  href,
  unlocked,
  done,
  lockReason,
}: {
  label: string;
  detail: string;
  href: string;
  unlocked: boolean;
  done?: boolean;
  lockReason?: string;
}) {
  if (!unlocked) {
    return (
      <li className="rounded-xl border border-white/5 bg-slate-900/40 px-4 py-3 opacity-80">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className="mt-0.5 text-xs text-slate-600">{detail}</p>
        {lockReason && <p className="mt-2 text-xs text-amber-200/80">{lockReason}</p>}
      </li>
    );
  }

  return (
    <li className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-slate-200">{label}</p>
          <p className="mt-0.5 text-xs text-slate-500">{detail}</p>
        </div>
        {done && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            Passed
          </span>
        )}
      </div>
      <Link
        to={href}
        className="mt-3 inline-block text-xs font-semibold text-cyan-300 hover:text-cyan-200"
      >
        {done ? "Retake quiz →" : "Start quiz →"}
      </Link>
    </li>
  );
}
