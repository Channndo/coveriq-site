import { chapterForQuizQuestion } from "./factsQuizUtils";
import type { QuizQuestion } from "./factsQuizTypes";
import { TEXTBOOK_CHAPTER_COUNT } from "./factsQuizTypes";
import type { ConsumerUser } from "./consumerSession";
import type { CelebrationMilestone } from "./educationCelebrations";

export interface ChapterStat {
  correct: number;
  incorrect: number;
}

const STORAGE_PREFIX = "coveriq_education_progress_v1";
const READING_COMPLETE_THRESHOLD = 90;

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
  /** Highest scroll-through percent on Facts (0–100). */
  maxReadPercent?: number;
  readingComplete?: boolean;
  readingCompletedAt?: string;
  celebrationsSeen?: Partial<Record<CelebrationMilestone, boolean>>;
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
      maxReadPercent: parsed.maxReadPercent,
      readingComplete: parsed.readingComplete,
      readingCompletedAt: parsed.readingCompletedAt,
      celebrationsSeen: parsed.celebrationsSeen ?? {},
    };
  } catch {
    return { chapterQuickChecks: {}, chapterStats: {} };
  }
}

function writeEducationProgress(email: string, data: EducationProgressData): void {
  localStorage.setItem(storageKey(email), JSON.stringify(data));
}

function shouldReplaceQuizRecord(
  existing: QuizAttemptRecord | undefined,
  score: number,
  total: number
): boolean {
  if (!existing) return true;
  const hadPass = isPassingScore(existing.score, existing.total);
  const newPass = isPassingScore(score, total);
  if (hadPass && !newPass) return false;
  return true;
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
  const data = readEducationProgress(email);
  const record: QuizAttemptRecord = { score, total, at: new Date().toISOString() };

  if (size === 10) {
    if (shouldReplaceQuizRecord(data.exam10, score, total)) {
      data.exam10 = record;
    }
  }
  if (size === 20 && isPassingScore(score, total)) {
    if (!data.quiz20 || shouldReplaceQuizRecord(data.quiz20, score, total)) {
      data.quiz20 = record;
    }
  }
  if (size === 50 && isPassingScore(score, total)) {
    if (!data.quiz50 || shouldReplaceQuizRecord(data.quiz50, score, total)) {
      data.quiz50 = record;
    }
  }

  writeEducationProgress(email, data);
}

export function hasCompletedChapterExam(email: string): boolean {
  const exam = readEducationProgress(email).exam10;
  if (!exam) return false;
  return isPassingScore(exam.score, exam.total);
}

export function hasAttemptedChapterExam(email: string): boolean {
  return Boolean(readEducationProgress(email).exam10);
}

export function hasCompletedReading(email: string): boolean {
  return Boolean(readEducationProgress(email).readingComplete);
}

/** Persists scroll progress; marks reading complete once at threshold. */
export function updateReadingProgress(email: string, scrollPercent: number): boolean {
  const data = readEducationProgress(email);
  const pct = Math.min(100, Math.max(0, Math.round(scrollPercent)));
  const prevMax = data.maxReadPercent ?? 0;
  if (pct > prevMax) data.maxReadPercent = pct;

  let newlyComplete = false;
  if (!data.readingComplete && (data.maxReadPercent ?? pct) >= READING_COMPLETE_THRESHOLD) {
    data.readingComplete = true;
    data.readingCompletedAt = new Date().toISOString();
    newlyComplete = true;
  }

  writeEducationProgress(email, data);
  return newlyComplete;
}

export function isCourseComplete(email: string): boolean {
  return (
    countPassedQuickChecks(email) >= TEXTBOOK_CHAPTER_COUNT && hasCompletedChapterExam(email)
  );
}

export function isEducationPathComplete(user: ConsumerUser | null): boolean {
  if (!user?.email) return false;
  if (!user.onboardingComplete) return false;
  return isCourseComplete(user.email);
}

export function isAdvancedQuizUnlocked(user: ConsumerUser | null): boolean {
  if (!user?.email) return false;
  return hasCompletedChapterExam(user.email);
}

export function advancedQuizLockReason(user: ConsumerUser | null): string {
  if (!user?.email) {
    return "Sign in and pass the 10-question chapter exam (70%+) to unlock.";
  }
  if (hasCompletedChapterExam(user.email)) return "";
  return "Pass the 10-question chapter exam (70% or higher) to unlock.";
}

export function hasSeenCelebration(
  email: string,
  milestone: CelebrationMilestone
): boolean {
  return Boolean(readEducationProgress(email).celebrationsSeen?.[milestone]);
}

export function markCelebrationSeen(email: string, milestone: CelebrationMilestone): void {
  const data = readEducationProgress(email);
  if (!data.celebrationsSeen) data.celebrationsSeen = {};
  data.celebrationsSeen[milestone] = true;
  if (milestone === "course") {
    data.celebrationsSeen.exam10 = true;
  }
  writeEducationProgress(email, data);
}

/** Returns the highest-priority celebration to show after a quiz, if any. */
export function celebrationAfterQuiz(
  email: string,
  size: QuizSize,
  score: number,
  total: number
): CelebrationMilestone | null {
  if (!isPassingScore(score, total)) return null;
  const data = readEducationProgress(email);
  const seen = data.celebrationsSeen ?? {};

  if (size === 10) {
    if (isCourseComplete(email) && !seen.course) return "course";
    if (!seen.exam10) return "exam10";
    return null;
  }
  if (size === 20 && !seen.quiz20) return "quiz20";
  if (size === 50 && !seen.quiz50) return "quiz50";
  return null;
}

/** First-time reading completion celebration. */
export function celebrationAfterReading(email: string): CelebrationMilestone | null {
  if (!hasCompletedReading(email)) return null;
  if (hasSeenCelebration(email, "reading")) return null;
  return "reading";
}

/** After final quick check passed — course celebration if exam already passed. */
export function celebrationAfterQuickCheck(email: string): CelebrationMilestone | null {
  if (!isCourseComplete(email)) return null;
  if (hasSeenCelebration(email, "course")) return null;
  return "course";
}

export function educationProgressPercent(user: ConsumerUser | null): number {
  if (!user) return 0;
  let steps = 0;
  const totalSteps = TEXTBOOK_CHAPTER_COUNT + 3; // quick checks + reading + exam + onboarding
  if (user.onboardingComplete) steps += 1;
  if (user.email && hasCompletedReading(user.email)) steps += 1;
  steps += countPassedQuickChecks(user.email);
  if (hasCompletedChapterExam(user.email)) steps += 1;
  return Math.round((steps / totalSteps) * 100);
}

export function educationProgressSummary(user: ConsumerUser | null): {
  onboardingDone: boolean;
  readingComplete: boolean;
  quickChecksPassed: number;
  quickChecksTotal: number;
  chapterExamDone: boolean;
  chapterExamAttempted: boolean;
  courseComplete: boolean;
  advancedUnlocked: boolean;
  quiz20Done: boolean;
  quiz50Done: boolean;
  percent: number;
} {
  const email = user?.email ?? "";
  const progress = email ? readEducationProgress(email) : { chapterQuickChecks: {} };
  return {
    onboardingDone: Boolean(user?.onboardingComplete),
    readingComplete: email ? hasCompletedReading(email) : false,
    quickChecksPassed: email ? countPassedQuickChecks(email) : 0,
    quickChecksTotal: TEXTBOOK_CHAPTER_COUNT,
    chapterExamDone: email ? hasCompletedChapterExam(email) : false,
    chapterExamAttempted: email ? hasAttemptedChapterExam(email) : false,
    courseComplete: email ? isCourseComplete(email) : false,
    advancedUnlocked: isAdvancedQuizUnlocked(user),
    quiz20Done: Boolean(progress.quiz20),
    quiz50Done: Boolean(progress.quiz50),
    percent: educationProgressPercent(user),
  };
}
