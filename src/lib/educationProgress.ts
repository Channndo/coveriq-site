import { chapterForQuizQuestion } from "./factsQuizUtils";
import type { QuizQuestion } from "./factsQuizTypes";
import { TEXTBOOK_CHAPTER_COUNT } from "./factsQuizTypes";
import type { ConsumerUser } from "./consumerSession";

export interface ChapterStat {
  correct: number;
  incorrect: number;
}

const STORAGE_PREFIX = "coveriq_education_progress_v1";

export type QuizSize = 10 | 20 | 50;

export interface QuizAttemptRecord {
  score: number;
  total: number;
  at: string;
}

export interface EducationProgressData {
  chapterQuickChecks: Record<string, boolean>;
  chapterStats?: Record<string, ChapterStat>;
  exam10?: QuizAttemptRecord;
  quiz20?: QuizAttemptRecord;
  quiz50?: QuizAttemptRecord;
}

function storageKey(email: string): string {
  return `${STORAGE_PREFIX}:${email.trim().toLowerCase()}`;
}

export function readEducationProgress(email: string): EducationProgressData {
  try {
    const raw = localStorage.getItem(storageKey(email));
    if (!raw) return { chapterQuickChecks: {}, chapterStats: {} };
    const parsed = JSON.parse(raw) as EducationProgressData;
    return {
      chapterQuickChecks: parsed.chapterQuickChecks ?? {},
      chapterStats: parsed.chapterStats ?? {},
      exam10: parsed.exam10,
      quiz20: parsed.quiz20,
      quiz50: parsed.quiz50,
    };
  } catch {
    return { chapterQuickChecks: {}, chapterStats: {} };
  }
}

function writeEducationProgress(email: string, data: EducationProgressData): void {
  localStorage.setItem(storageKey(email), JSON.stringify(data));
}

/** Updates per-chapter accuracy from any graded quiz or quick check. */
export function recordQuizQuestionStats(
  email: string,
  results: { question: QuizQuestion; correct: boolean }[]
): void {
  if (!email || results.length === 0) return;
  const data = readEducationProgress(email);
  if (!data.chapterStats) data.chapterStats = {};
  for (const r of results) {
    const ch = String(chapterForQuizQuestion(r.question.id));
    const stat = data.chapterStats[ch] ?? { correct: 0, incorrect: 0 };
    if (r.correct) stat.correct += 1;
    else stat.incorrect += 1;
    data.chapterStats[ch] = stat;
  }
  writeEducationProgress(email, data);
}

export function markChapterQuickCheckPassed(email: string, chapterNumber: number): void {
  const data = readEducationProgress(email);
  data.chapterQuickChecks[String(chapterNumber)] = true;
  writeEducationProgress(email, data);
}

export function isChapterQuickCheckPassed(email: string, chapterNumber: number): boolean {
  return Boolean(readEducationProgress(email).chapterQuickChecks[String(chapterNumber)]);
}

export function countPassedQuickChecks(email: string): number {
  const checks = readEducationProgress(email).chapterQuickChecks;
  return Object.keys(checks).filter((k) => checks[k]).length;
}

const PASS_RATIO = 0.7;

export function isPassingScore(score: number, total: number): boolean {
  if (total <= 0) return false;
  return score >= Math.ceil(total * PASS_RATIO);
}

export function recordQuizAttempt(
  email: string,
  size: QuizSize,
  score: number,
  total: number
): void {
  if (!isPassingScore(score, total)) return;
  const data = readEducationProgress(email);
  const record: QuizAttemptRecord = { score, total, at: new Date().toISOString() };
  if (size === 10) data.exam10 = record;
  if (size === 20) data.quiz20 = record;
  if (size === 50) data.quiz50 = record;
  writeEducationProgress(email, data);
}

export function hasCompletedChapterExam(email: string): boolean {
  return Boolean(readEducationProgress(email).exam10);
}

export function isEducationPathComplete(user: ConsumerUser | null): boolean {
  if (!user?.email) return false;
  if (!user.onboardingComplete) return false;
  const passed = countPassedQuickChecks(user.email);
  if (passed < TEXTBOOK_CHAPTER_COUNT) return false;
  return hasCompletedChapterExam(user.email);
}

export function isAdvancedQuizUnlocked(user: ConsumerUser | null): boolean {
  return isEducationPathComplete(user);
}

export function educationProgressPercent(user: ConsumerUser | null): number {
  if (!user) return 0;
  let steps = 0;
  const totalSteps = TEXTBOOK_CHAPTER_COUNT + 2; // quick checks + onboarding + exam
  if (user.onboardingComplete) steps += 1;
  steps += countPassedQuickChecks(user.email);
  if (hasCompletedChapterExam(user.email)) steps += 1;
  return Math.round((steps / totalSteps) * 100);
}

export function educationProgressSummary(user: ConsumerUser | null): {
  onboardingDone: boolean;
  quickChecksPassed: number;
  quickChecksTotal: number;
  chapterExamDone: boolean;
  advancedUnlocked: boolean;
  quiz20Done: boolean;
  quiz50Done: boolean;
  percent: number;
} {
  const email = user?.email ?? "";
  const progress = email ? readEducationProgress(email) : { chapterQuickChecks: {} };
  return {
    onboardingDone: Boolean(user?.onboardingComplete),
    quickChecksPassed: email ? countPassedQuickChecks(email) : 0,
    quickChecksTotal: TEXTBOOK_CHAPTER_COUNT,
    chapterExamDone: email ? hasCompletedChapterExam(email) : false,
    advancedUnlocked: isAdvancedQuizUnlocked(user),
    quiz20Done: Boolean(progress.quiz20),
    quiz50Done: Boolean(progress.quiz50),
    percent: educationProgressPercent(user),
  };
}
