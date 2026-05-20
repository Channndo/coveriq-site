import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthShell } from "../components/auth/AuthShell";
import { AccountAvatarPicker } from "../components/account/AccountAvatarPicker";
import { EducationProgressCard } from "../components/account/EducationProgressCard";
import { StudyInsightsCard } from "../components/account/StudyInsightsCard";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { readConsumerSession } from "../lib/consumerSession";
import { FactsQuizList } from "../components/facts/FactsQuizList";

export function AccountPage() {
  const { user, isAdmin, signOut } = useConsumerAuth();
  const [, bump] = useState(0);
  const refresh = () => bump((n) => n + 1);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const session = readConsumerSession() ?? user;

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

        <StudyInsightsCard user={session} />

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Quizzes</h2>
          <FactsQuizList compact />
        </div>

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

