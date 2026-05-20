import type { QuizQuestion } from "./factsQuizTypes";
import { FACTS_QUIZ_BANK } from "./factsQuizBank";
import {
  CHAPTER_QUICK_CHECK_LENGTH,
  QUIZ_SESSION_LENGTH,
  TEXTBOOK_CHAPTER_COUNT,
} from "./factsQuizTypes";

/** Maps question ids (q01–q75) to textbook chapters 1–10. */
export function chapterForQuizQuestion(id: string): number {
  const n = parseInt(id.replace(/\D/g, ""), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(TEXTBOOK_CHAPTER_COUNT, Math.max(1, Math.ceil(n / 7.5)));
}

/** Fisher–Yates shuffle (copy array first). */
export function shuffleQuestions<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Questions for a chapter's optional 2-question quick check. */
export function questionsForChapter(chapterNumber: number): QuizQuestion[] {
  return FACTS_QUIZ_BANK.filter((q) => chapterForQuizQuestion(q.id) === chapterNumber);
}

export function pickChapterQuickCheck(
  chapterNumber: number,
  count = CHAPTER_QUICK_CHECK_LENGTH
): QuizQuestion[] {
  const pool = questionsForChapter(chapterNumber);
  if (pool.length <= count) return shuffleQuestions([...pool]);
  return shuffleQuestions(pool).slice(0, count);
}

/** Picks one random question per chapter, then shuffles — aligns with 10-chapter textbook. */
export function pickQuizSession(count = QUIZ_SESSION_LENGTH): QuizQuestion[] {
  if (count === TEXTBOOK_CHAPTER_COUNT) {
    const byChapter = new Map<number, QuizQuestion[]>();
    for (const question of FACTS_QUIZ_BANK) {
      const ch = chapterForQuizQuestion(question.id);
      const list = byChapter.get(ch) ?? [];
      list.push(question);
      byChapter.set(ch, list);
    }
    const picked: QuizQuestion[] = [];
    for (let ch = 1; ch <= TEXTBOOK_CHAPTER_COUNT; ch++) {
      const pool = byChapter.get(ch);
      if (pool?.length) {
        picked.push(shuffleQuestions(pool)[0]);
      }
    }
    return shuffleQuestions(picked);
  }
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
