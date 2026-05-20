import type { QuizQuestion } from "../../lib/factsQuizTypes";

export type QuizFeedbackMode = "immediate" | "deferred";

interface QuizAnswerFieldsetProps {
  question: QuizQuestion;
  selected?: number;
  revealed: boolean;
  feedbackMode: QuizFeedbackMode;
  onSelect: (index: number) => void;
  size?: "sm" | "md";
}

function optionClasses(
  index: number,
  selected: number | undefined,
  question: QuizQuestion,
  revealed: boolean,
  feedbackMode: QuizFeedbackMode,
  size: "sm" | "md"
): string {
  const round = size === "md" ? "rounded-xl" : "rounded-lg";
  const pad = size === "md" ? "px-4 py-3.5 text-[15px]" : "px-3.5 py-3 text-sm";
  const base = `flex items-start gap-3 border leading-snug transition ${round} ${pad} `;

  if (feedbackMode === "deferred" || !revealed) {
    return (
      base +
      (selected === index
        ? "cursor-pointer border-cyan-500/50 bg-cyan-500/10 text-cyan-100"
        : "cursor-pointer border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20")
    );
  }

  if (index === question.correctIndex) {
    return base + "border-emerald-500/50 bg-emerald-500/10 text-emerald-100";
  }
  if (selected === index) {
    return base + "border-rose-500/50 bg-rose-500/10 text-rose-100";
  }
  return base + "border-white/5 bg-slate-900/20 text-slate-500 opacity-60";
}

export function QuizAnswerFieldset({
  question,
  selected,
  revealed,
  feedbackMode,
  onSelect,
  size = "sm",
}: QuizAnswerFieldsetProps) {
  const isCorrect = revealed && selected === question.correctIndex;
  const isWrong = revealed && selected !== undefined && selected !== question.correctIndex;
  const locked = feedbackMode === "immediate" && revealed;

  return (
    <div>
      {revealed && feedbackMode === "immediate" && (
        <p
          className={`mb-3 text-sm font-semibold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}
          role="status"
        >
          {isCorrect ? "Correct" : "Incorrect"}
        </p>
      )}
      <fieldset className={size === "md" ? "space-y-3" : "space-y-2.5"}>
        <legend className="sr-only">Choose an answer</legend>
        {question.options.map((label, i) => (
          <label key={label} className={optionClasses(i, selected, question, revealed, feedbackMode, size)}>
            <input
              type="radio"
              name={question.id}
              checked={selected === i}
              disabled={locked}
              onChange={() => !locked && onSelect(i)}
              className="mt-0.5 shrink-0 accent-cyan-500 disabled:opacity-50"
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      {revealed && feedbackMode === "immediate" && (
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{question.explanation}</p>
      )}
      {isWrong && revealed && (
        <p className="mt-2 text-sm text-emerald-400/90">
          Correct answer: {question.options[question.correctIndex]}
        </p>
      )}
    </div>
  );
}
