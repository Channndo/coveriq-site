import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthShell } from "../components/auth/AuthShell";
import { AccountAvatarPicker } from "../components/account/AccountAvatarPicker";
import { EducationProgressCard } from "../components/account/EducationProgressCard";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { readConsumerSession } from "../lib/consumerSession";
import { educationProgressSummary } from "../lib/educationProgress";

export function AccountPage() {
  const { user, isAdmin, signOut } = useConsumerAuth();
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const session = readConsumerSession() ?? user;
  const summary = educationProgressSummary(session);

  return (
    <AuthShell
      title={`Hi, ${session.firstName}`}
      subtitle={
        isAdmin
          ? "Site admin · full MIRA access and education tracking"
          : "Your CoverIQ account, learning progress, and unlocked quizzes"
      }
    >
      <div className="mt-6 max-h-[70vh] space-y-4 overflow-y-auto pr-1">
        <AccountAvatarPicker user={session} onChange={refresh} />

        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Account</h2>
          <dl className="mt-3 space-y-2 text-slate-300">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Name</dt>
              <dd className="text-right">
                {session.firstName} {session.lastName}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Email</dt>
              <dd className="text-right break-all">{session.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Phone</dt>
              <dd className="text-right">{session.phone || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Address</dt>
              <dd className="text-right">
                {[session.street, session.city, session.state, session.zip].filter(Boolean).join(", ") ||
                  "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Insurance</dt>
              <dd className="text-right">{session.currentInsuranceProvider || "—"}</dd>
            </div>
          </dl>
        </section>

        <EducationProgressCard user={session} />

        <section className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Quizzes</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Complete onboarding, all chapter quick checks, and the 10-question exam once to unlock
            the 20- and 50-question exams.
          </p>
          <ul className="mt-4 space-y-2">
            <QuizRow
              label="10-question chapter exam"
              detail="One question per chapter"
              href="/facts/quiz?count=10"
              unlocked
              done={summary.chapterExamDone}
            />
            <QuizRow
              label="20-question comprehensive quiz"
              detail="Broader review from the question bank"
              href="/facts/quiz?count=20"
              unlocked={summary.advancedUnlocked}
              done={summary.quiz20Done}
              lockReason="Finish all chapter quick checks and pass the 10-question exam first."
            />
            <QuizRow
              label="50-question mastery quiz"
              detail="Full-length practice from the bank"
              href="/facts/quiz?count=50"
              unlocked={summary.advancedUnlocked}
              done={summary.quiz50Done}
              lockReason="Finish all chapter quick checks and pass the 10-question exam first."
            />
          </ul>
        </section>

        <motion.div className="flex flex-col gap-2 pt-2">
          {!session.onboardingComplete ? (
            <Link to="/onboarding" className="btn-primary block w-full text-center">
              Complete setup
            </Link>
          ) : (
            <Link to="/?openMira=1" className="btn-primary block w-full text-center">
              Open MIRA
            </Link>
          )}
          <Link to="/facts" className="btn-secondary block w-full text-center">
            Insurance Facts
          </Link>
          <button
            type="button"
            className="w-full py-2 text-sm text-slate-500 hover:text-slate-300"
            onClick={signOut}
          >
            Sign out
          </button>
        </motion.div>
      </div>
    </AuthShell>
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
      <li className="rounded-lg border border-white/5 bg-slate-900/40 px-4 py-3 opacity-70">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className="mt-0.5 text-xs text-slate-600">{detail}</p>
        <p className="mt-2 text-xs text-amber-200/70">{lockReason}</p>
      </li>
    );
  }

  return (
    <li className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
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
