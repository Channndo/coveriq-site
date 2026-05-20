import { INSURANCE_TEXTBOOK } from "./insuranceTextbook";
import {
  isChapterQuickCheckPassed,
  readEducationProgress,
  type ChapterStat,
} from "./educationProgress";

export interface ChapterInsight {
  chapterNumber: number;
  chapterId: string;
  title: string;
  accuracy: number | null;
  questionsAnswered: number;
  quickCheckPassed: boolean;
  studyHref: string;
}

export interface StudyInsights {
  hasData: boolean;
  overallAccuracy: number | null;
  totalAnswered: number;
  strengths: ChapterInsight[];
  weaknesses: ChapterInsight[];
  studyNext: ChapterInsight[];
  headline: string;
}

const STRENGTH_ACCURACY = 80;
const WEAKNESS_ACCURACY = 65;
const MIN_ANSWERED_FOR_STRENGTH = 2;

function buildChapterInsight(
  chapterNumber: number,
  email: string,
  stats: Record<string, ChapterStat>
): ChapterInsight {
  const ch = INSURANCE_TEXTBOOK.find((c) => c.number === chapterNumber);
  const stat = stats[String(chapterNumber)];
  const answered = stat ? stat.correct + stat.incorrect : 0;
  const accuracy =
    answered > 0 ? Math.round((stat!.correct / answered) * 100) : null;

  return {
    chapterNumber,
    chapterId: ch?.id ?? `chapter-${chapterNumber}`,
    title: ch?.title ?? `Chapter ${chapterNumber}`,
    accuracy,
    questionsAnswered: answered,
    quickCheckPassed: isChapterQuickCheckPassed(email, chapterNumber),
    studyHref: `/facts#${ch?.id ?? ""}`,
  };
}

export function buildStudyInsights(email: string): StudyInsights {
  const progress = readEducationProgress(email);
  const stats = progress.chapterStats ?? {};
  const all = INSURANCE_TEXTBOOK.map((ch) => buildChapterInsight(ch.number, email, stats));

  let totalCorrect = 0;
  let totalAnswered = 0;
  for (const s of Object.values(stats)) {
    totalCorrect += s.correct;
    totalAnswered += s.correct + s.incorrect;
  }

  const hasData = totalAnswered > 0;
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  const strengths = all.filter((ch) => {
    if (ch.accuracy === null || ch.questionsAnswered < MIN_ANSWERED_FOR_STRENGTH) return false;
    return ch.accuracy >= STRENGTH_ACCURACY;
  });

  const weaknesses = all.filter((ch) => {
    if (!ch.quickCheckPassed && ch.questionsAnswered === 0) return true;
    if (ch.accuracy === null) return false;
    return ch.accuracy < WEAKNESS_ACCURACY;
  });

  const studyNext = [...all]
    .filter((ch) => {
      if (!ch.quickCheckPassed) return true;
      if (ch.accuracy !== null && ch.accuracy < STRENGTH_ACCURACY) return true;
      return false;
    })
    .sort((a, b) => {
      if (!a.quickCheckPassed && b.quickCheckPassed) return -1;
      if (a.quickCheckPassed && !b.quickCheckPassed) return 1;
      const accA = a.accuracy ?? -1;
      const accB = b.accuracy ?? -1;
      return accA - accB;
    })
    .slice(0, 4);

  let headline = "Take a quick check or quiz to unlock personal study insights.";
  if (hasData) {
    if (weaknesses.length === 0 && strengths.length > 0) {
      headline = "Strong across the board — keep reviewing with the 20- or 50-question exams.";
    } else if (weaknesses.length > 0) {
      headline = `Focus on ${weaknesses.length} chapter${weaknesses.length === 1 ? "" : "s"} below — links go straight to the Facts material.`;
    } else {
      headline = "Building your profile — complete more quick checks for sharper recommendations.";
    }
  }

  return {
    hasData,
    overallAccuracy,
    totalAnswered,
    strengths,
    weaknesses,
    studyNext,
    headline,
  };
}
