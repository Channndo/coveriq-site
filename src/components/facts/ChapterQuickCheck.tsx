import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "../../lib/factsQuizTypes";
import { CHAPTER_QUICK_CHECK_LENGTH } from "../../lib/factsQuizTypes";
import { gradeSession, pickChapterQuickCheck } from "../../lib/factsQuizUtils";
import { markChapterQuickCheckPassed } from "../../lib/educationProgress";
import { readConsumerSession } from "../../lib/consumerSession";

type Phase = "idle" | "quiz" | "results";

interface ChapterQuickCheckProps {
  chapterNumber: number;
  chapterTitle: string;
}

export function ChapterQuickCheck({ chapterNumber, chapterTitle }: ChapterQuickCheckProps) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [graded, setGraded] = useState<ReturnType<typeof gradeSession> | null>(null);

  const current = questions[index];
  const allAnswered =
    questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);

  const start = useCallback(() => {
    setQuestions(pickChapterQuickCheck(chapterNumber));
    setIndex(0);
    setAnswers({});
    setGraded(null);
    setPhase("quiz");
    setOpen(true);
  }, [chapterNumber]);

  const submit = () => {
    const result = gradeSession(questions, answers);
    setGraded(result);
    setPhase("results");
    const session = readConsumerSession();
    if (session?.email && result.score === result.total) {
      markChapterQuickCheckPassed(session.email, chapterNumber);
    }
  };

  const retry = () => {
    start();
  };

  const collapse = () => {
    setOpen(false);
    setPhase("idle");
    setQuestions([]);
    setIndex(0);
    setAnswers({});
    setGraded(null);
  };

  return (
    <aside className="mt-14 border-t border-white/[0.08] pt-10" aria-labelledby={`quick-check-${chapterNumber}`}>
      {!open ? (
        <button
          type="button"
          onClick={start}
          className="flex w-full items-center justify-between gap-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4 text-left transition hover:border-cyan-500/35 hover:bg-cyan-500/10"
        >
          <div>
            <p
              id={`quick-check-${chapterNumber}`}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-500/90"
            >
              Quick check · ~2 min
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {CHAPTER_QUICK_CHECK_LENGTH} questions on this chapter before you move on
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-300">
            Start
          </span>
        </button>
      ) : (
        <div className="textbook-callout">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-500/90">
                Chapter {chapterNumber} quick check
              </p>
              <p className="mt-1 text-xs text-slate-500">{chapterTitle}</p>
            </div>
            <button
              type="button"
              onClick={collapse}
              className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-500 hover:text-slate-300"
            >
              Close
            </button>
          </div>

          <AnimatePresence mode="wait">
            {phase === "quiz" && current && (
              <motion.div
                key={`${current.id}-${index}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-6"
              >
                <p className="font-mono text-xs text-slate-500">
                  Question {index + 1} of {questions.length}
                </p>
                <p className="font-display mt-3 text-lg font-semibold leading-snug text-white">
                  {current.question}
                </p>
                <fieldset className="mt-5 space-y-2.5">
                  <legend className="sr-only">Choose an answer</legend>
                  {current.options.map((label, i) => {
                    const selected = answers[current.id] === i;
                    return (
                      <label
                        key={label}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3 text-sm leading-snug transition ${
                          selected
                            ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-100"
                            : "border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name={current.id}
                          checked={selected}
                          onChange={() =>
                            setAnswers((prev) => ({ ...prev, [current.id]: i }))
                          }
                          className="mt-0.5 shrink-0 accent-cyan-500"
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </fieldset>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => setIndex((i) => i - 1)}
                    className="rounded-lg border border-white/15 px-4 py-2 text-xs text-slate-300 transition hover:bg-white/5 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  {index < questions.length - 1 ? (
                    <button
                      type="button"
                      disabled={answers[current.id] === undefined}
                      onClick={() => setIndex((i) => i + 1)}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-40"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!allAnswered}
                      onClick={submit}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-40"
                    >
                      Check answers
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {phase === "results" && graded && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <p className="font-display text-2xl font-bold text-white">
                  {graded.score}
                  <span className="text-lg font-normal text-slate-500"> / {graded.total}</span>
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {graded.score === graded.total
                    ? "Nice — you're ready for the next chapter."
                    : "Review the explanations below, then continue reading."}
                </p>
                <ul className="mt-5 space-y-4">
                  {graded.results.map((r) => (
                    <li
                      key={r.question.id}
                      className={`rounded-lg border px-4 py-3 text-sm ${
                        r.correct
                          ? "border-emerald-500/25 bg-emerald-500/5"
                          : "border-white/10 bg-slate-900/50"
                      }`}
                    >
                      <p className="font-medium text-slate-200">{r.question.question}</p>
                      {!r.correct && (
                        <>
                          <p className="mt-2 text-emerald-400/90">
                            Correct: {r.question.options[r.question.correctIndex]}
                          </p>
                          {r.picked !== undefined && (
                            <p className="mt-1 text-rose-400/80">
                              You chose: {r.question.options[r.picked]}
                            </p>
                          )}
                        </>
                      )}
                      <p className="mt-2 leading-relaxed text-slate-500">{r.question.explanation}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={retry}
                    className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Try again
                  </button>
                  <button
                    type="button"
                    onClick={collapse}
                    className="rounded-lg border border-white/15 px-4 py-2 text-xs text-slate-300 transition hover:bg-white/5"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </aside>
  );
}
