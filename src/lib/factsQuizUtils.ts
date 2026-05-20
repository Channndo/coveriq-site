import type { QuizQuestion } from "./factsQuizTypes";
import { FACTS_QUIZ_BANK } from "./factsQuizBank";
import {
  CHAPTER_QUICK_CHECK_LENGTH,
  QUIZ_SESSION_LENGTH,
  TEXTBOOK_CHAPTER_COUNT,
} from "./factsQuizTypes";

/** Life & health chapter (VII) — includes legacy q55–q61 and dedicated bank ids q76+. */
const LIFE_HEALTH_QUESTION_IDS = new Set([
  "q55",
  "q56",
  "q57",
  "q58",
  "q59",
  "q60",
  "q61",
]);

const LIFE_HEALTH_ID_MAX = 105;

/**
 * Maps question ids to textbook chapters 1–11.
 * Life & health uses an explicit id list plus q76–q105; other ids keep legacy
 * bands with chapters 7–10 shifted to 8–11 after chapter VII was inserted.
 */
export function chapterForQuizQuestion(id: string): number {
  const n = parseInt(id.replace(/\D/g, ""), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  if (LIFE_HEALTH_QUESTION_IDS.has(id) || (n >= 76 && n <= LIFE_HEALTH_ID_MAX)) {
    return 7;
  }
  const legacyChapter = Math.min(10, Math.max(1, Math.ceil(n / 7.5)));
  if (legacyChapter >= 7) return legacyChapter + 1;
  return legacyChapter;
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

/** Picks one random question per chapter, then shuffles — used when count equals chapter count. */
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
