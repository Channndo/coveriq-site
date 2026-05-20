import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "../lib/factsQuizTypes";
import { QUIZ_SESSION_LENGTH } from "../lib/factsQuizTypes";
import { pickQuizSession, gradeSession } from "../lib/factsQuizUtils";
import { QuizAnswerFieldset } from "../components/facts/QuizAnswerFieldset";
import { GLOBAL_DISCLAIMER } from "../lib/constants";
import { TechBackground } from "../components/ui/TechBackground";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import {
  advancedQuizLockReason,
  isAdvancedQuizUnlocked,
  recordQuizAttempt,
  recordQuizQuestionStats,
  type QuizSize,
} from "../lib/educationProgress";

type Phase = "intro" | "quiz" | "results" | "locked";

const ALLOWED_COUNTS: QuizSize[] = [10, 20, 50];

function parseQuestionCount(raw: string | null): QuizSize {
  const n = parseInt(raw || String(QUIZ_SESSION_LENGTH), 10);
  return ALLOWED_COUNTS.includes(n as QuizSize) ? (n as QuizSize) : QUIZ_SESSION_LENGTH;
}

export function FactsQuizPage() {
  const [searchParams] = useSearchParams();
  const { user } = useConsumerAuth();
  const questionCount = parseQuestionCount(searchParams.get("count"));
  const needsAccount = questionCount === 20 || questionCount === 50;
  const advancedLocked = needsAccount && !isAdvancedQuizUnlocked(user);

  const [phase, setPhase] = useState<Phase>(advancedLocked ? "locked" : "intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [graded, setGraded] = useState<ReturnType<typeof gradeSession> | null>(null);

  useEffect(() => {
    document.title = `Insurance Facts Quiz (${questionCount}) | CoverIQ`;
    return () => {
      document.title = "CoverIQ | Insurance Explained Simply";
    };
  }, [questionCount]);

  useEffect(() => {
    if (advancedLocked) setPhase("locked");
    else if (phase === "locked") setPhase("intro");
  }, [advancedLocked, phase]);

  const current = questions[index];
  const immediateFeedback = questionCount === 10;
  const currentRevealed = current ? Boolean(revealed[current.id]) : false;
  const answeredCount = useMemo(
    () => questions.filter((q) => answers[q.id] !== undefined).length,
    [questions, answers]
  );
  const allAnswered = questions.length > 0 && answeredCount === questions.length;

  const startQuiz = useCallback(() => {
    setQuestions(pickQuizSession(questionCount));
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setGraded(null);
    setPhase("quiz");
  }, [questionCount]);

  const selectAnswer = (optionIndex: number) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }));
  };

  const revealCurrent = () => {
    if (!current || answers[current.id] === undefined) return;
    setRevealed((prev) => ({ ...prev, [current.id]: true }));
    if (user?.email) {
      const picked = answers[current.id];
      recordQuizQuestionStats(user.email, [
        { question: current, correct: picked === current.correctIndex },
      ]);
    }
  };

  const submitQuiz = () => {
    const result = gradeSession(questions, answers);
    setGraded(result);
    setPhase("results");
    if (user?.email) {
      if (!immediateFeedback) {
        recordQuizQuestionStats(user.email, result.results);
      }
      recordQuizAttempt(user.email, questionCount, result.score, result.total);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const retake = () => {
    setPhase("intro");
    setQuestions([]);
    setIndex(0);
    setAnswers({});
    setRevealed({});
    setGraded(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#030712]"
    >
      <TechBackground showGrid={false} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-padding relative mx-auto max-w-2xl"
      >
        <Link to="/facts" className="font-mono text-xs text-cyan-400 hover:text-cyan-300">
          ← Back to Facts
        </Link>

        <header className="textbook-page mt-8 px-8 py-8 sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-200/50">
            CoverIQ Facts · End-of-text review
          </p>
          <h1 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl">
            Insurance knowledge quiz
          </h1>
          <p className="textbook-prose-muted mt-4">
            {questionCount === 10
              ? "A 10-question exam — one question per textbook chapter — from the CoverIQ Facts bank."
              : questionCount === 20
                ? "A 20-question comprehensive review for signed-in learners who completed the full Facts path once."
                : "A 50-question mastery exam for signed-in learners who completed the full Facts path once."}{" "}
            General U.S. concepts, not state exam prep.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {phase === "locked" && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10 space-y-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-6"
            >
              {!user ? (
                <>
                  <p className="text-sm text-slate-300">
                    Sign in to access the {questionCount}-question quiz.
                  </p>
                  <Link to="/login" className="inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                    Sign in →
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-300">{advancedQuizLockReason(user)}</p>
                  <Link to="/account" className="inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                    View your progress →
                  </Link>
                </>
              )}
            </motion.div>
          )}

          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-10 space-y-6"
            >
              <div className="textbook-callout text-sm leading-relaxed text-slate-400">
                <ul className="list-disc space-y-2 pl-5">
                  <li>{questionCount} questions drawn from the vetted bank.</li>
                  {immediateFeedback ? (
                    <li>Submit each answer to see if you&apos;re right before moving on.</li>
                  ) : (
                    <li>No feedback until the end — review your full score when you finish.</li>
                  )}
                  <li>Passing score is 70% or higher (saved to your account on this device).</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={startQuiz}
                className="w-full rounded-xl bg-cyan-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
              >
                Start quiz
              </button>
            </motion.div>
          )}

          {phase === "quiz" && current && (
            <motion.div
              key={`q-${current.id}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="mt-10"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="h-1 origin-left rounded-full bg-cyan-500/30"
                style={{ transformOrigin: "left" }}
              >
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                />
              </motion.div>
              <p className="mt-3 font-mono text-xs text-slate-500">
                Question {index + 1} of {questions.length} · {answeredCount} answered
              </p>

              <h2 className="font-display mt-6 text-xl font-semibold leading-snug text-white sm:text-2xl">
                {current.question}
              </h2>

              <div className="mt-8">
                <QuizAnswerFieldset
                  question={current}
                  selected={answers[current.id]}
                  revealed={immediateFeedback ? currentRevealed : false}
                  feedbackMode={immediateFeedback ? "immediate" : "deferred"}
                  onSelect={selectAnswer}
                  size="md"
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => i - 1)}
                  className="rounded-xl border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                {immediateFeedback ? (
                  !currentRevealed ? (
                    <button
                      type="button"
                      disabled={answers[current.id] === undefined}
                      onClick={revealCurrent}
                      className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Submit answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (index < questions.length - 1) {
                          setIndex((i) => i + 1);
                        } else {
                          submitQuiz();
                        }
                      }}
                      className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      {index < questions.length - 1 ? "Next question" : "See results"}
                    </button>
                  )
                ) : index < questions.length - 1 ? (
                  <button
                    type="button"
                    disabled={answers[current.id] === undefined}
                    onClick={() => setIndex((i) => i + 1)}
                    className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!allAnswered}
                    onClick={submitQuiz}
                    className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    See results
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}

          {phase === "results" && graded && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-10"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-8 text-center"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-400/80">Your score</p>
                <p className="font-display mt-2 text-5xl font-bold text-white">
                  {graded.score}
                  <span className="text-2xl font-normal text-slate-500"> / {graded.total}</span>
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  {graded.score === graded.total
                    ? "Perfect — you nailed every question in this round."
                    : graded.score >= graded.total * 0.8
                      ? "Strong work. Review the missed items below."
                      : "Keep studying the Facts chapters and try another random set."}
                </p>
              </motion.div>

              {graded.results.some((r) => !r.correct) && (
                <div className="mt-10">
                  <h3 className="font-display text-lg font-semibold text-white">Review</h3>
                  <ul className="mt-4 space-y-6">
                    {graded.results
                      .filter((r) => !r.correct)
                      .map((r) => (
                        <li
                          key={r.question.id}
                          className="rounded-xl border border-white/10 bg-slate-900/50 p-5"
                        >
                          <p className="font-medium text-slate-200">{r.question.question}</p>
                          <p className="mt-2 text-sm text-emerald-400/90">
                            Correct: {r.question.options[r.question.correctIndex]}
                          </p>
                          {r.picked !== undefined && (
                            <p className="mt-1 text-sm text-rose-400/80">
                              You chose: {r.question.options[r.picked]}
                            </p>
                          )}
                          <p className="mt-3 text-sm leading-relaxed text-slate-500">
                            {r.question.explanation}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <motion.div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  New random quiz
                </button>
                <button
                  type="button"
                  onClick={retake}
                  className="rounded-xl border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
                >
                  Back to start
                </button>
                <Link
                  to="/facts"
                  className="inline-flex items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
                >
                  Read Facts chapters
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="prose-disclaimer mt-14 text-slate-600">
          {GLOBAL_DISCLAIMER} This quiz is for general education only and is not preparation for any
          licensing or state examination.
        </p>
      </motion.div>
    </motion.div>
  );
}
