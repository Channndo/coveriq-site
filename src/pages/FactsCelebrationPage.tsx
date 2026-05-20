import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { TechBackground } from "../components/ui/TechBackground";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import {
  CELEBRATION_COPY,
  isCelebrationMilestone,
  type CelebrationMilestone,
} from "../lib/educationCelebrations";
import {
  hasCompletedChapterExam,
  hasCompletedReading,
  isCourseComplete,
  markCelebrationSeen,
  readEducationProgress,
} from "../lib/educationProgress";

function isMilestoneEarned(email: string, milestone: CelebrationMilestone): boolean {
  const progress = readEducationProgress(email);
  switch (milestone) {
    case "reading":
      return hasCompletedReading(email);
    case "exam10":
      return hasCompletedChapterExam(email);
    case "course":
      return isCourseComplete(email);
    case "quiz20":
      return Boolean(progress.quiz20);
    case "quiz50":
      return Boolean(progress.quiz50);
    default:
      return false;
  }
}

export function FactsCelebrationPage() {
  const { milestone: raw } = useParams<{ milestone: string }>();
  const navigate = useNavigate();
  const { user } = useConsumerAuth();

  const milestone = raw && isCelebrationMilestone(raw) ? raw : null;

  useEffect(() => {
    document.title = "Congratulations | CoverIQ Facts";
    return () => {
      document.title = "CoverIQ | Insurance Explained Simply";
    };
  }, []);

  useEffect(() => {
    if (!milestone) {
      navigate("/facts", { replace: true });
      return;
    }
    if (!user?.email) {
      navigate("/login", { replace: true, state: { from: `/facts/celebration/${milestone}` } });
      return;
    }
    if (!isMilestoneEarned(user.email, milestone)) {
      navigate("/facts", { replace: true });
      return;
    }
    markCelebrationSeen(user.email, milestone);
  }, [milestone, user?.email, navigate]);

  if (!milestone || !user?.email) {
    return null;
  }

  const copy = CELEBRATION_COPY[milestone];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#030712] p-4">
      <TechBackground showGrid={false} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-950/40 to-slate-950/90 p-8 text-center shadow-2xl shadow-emerald-950/30 sm:p-10"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15">
          <svg
            className="h-10 w-10 text-emerald-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/90">
          {copy.badge}
        </p>
        <h1 className="font-display mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{copy.subtitle}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/account"
            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            View progress
          </Link>
          {milestone === "exam10" || milestone === "course" ? (
            <Link
              to="/facts/quiz?count=20"
              className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Try 20-question quiz
            </Link>
          ) : (
            <Link
              to="/facts"
              className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Back to Facts
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
