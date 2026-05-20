import type { QuizQuestion } from "./factsQuizTypes";
import { FACTS_QUIZ_BANK } from "./factsQuizBank";
import { QUIZ_SESSION_LENGTH } from "./factsQuizTypes";

/** Fisher–Yates shuffle (copy array first). */
export function shuffleQuestions<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickQuizSession(count = QUIZ_SESSION_LENGTH): QuizQuestion[] {
  return shuffleQuestions(FACTS_QUIZ_BANK).slice(0, count);
}

export function gradeSession(
  questions: QuizQuestion[],
  answers: Record<string, number | undefined>
): { score: number; total: number; results: { question: QuizQuestion; correct: boolean; picked?: number }[] } {
  const results = questions.map((q) => {
    const picked = answers[q.id];
    const correct = picked === q.correctIndex;
    return { question: q, correct, picked };
  });
  const score = results.filter((r) => r.correct).length;
  return { score, total: questions.length, results };
}
