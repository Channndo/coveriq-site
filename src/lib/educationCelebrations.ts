export type CelebrationMilestone =
  | "reading"
  | "exam10"
  | "course"
  | "quiz20"
  | "quiz50";

export const CELEBRATION_COPY: Record<
  CelebrationMilestone,
  { title: string; subtitle: string; badge: string }
> = {
  reading: {
    badge: "Reading complete",
    title: "You finished the Facts textbook",
    subtitle:
      "You read through the full guide. Your progress is saved — pick up anytime or move on to the chapter quick checks and exams.",
  },
  exam10: {
    badge: "Chapter exam passed",
    title: "Congratulations — you passed the 10-question exam",
    subtitle:
      "You scored 70% or higher on the chapter exam. This completion stays on your account. The 20- and 50-question practice exams are now unlocked.",
  },
  course: {
    badge: "Course complete",
    title: "Congratulations — you completed the Facts course",
    subtitle:
      "You passed every chapter quick check and the 10-question exam. Your course completion is saved on this device.",
  },
  quiz20: {
    badge: "20-question quiz passed",
    title: "Congratulations — comprehensive quiz passed",
    subtitle:
      "Strong work on the 20-question review. Your pass is saved — retake anytime for more practice.",
  },
  quiz50: {
    badge: "50-question mastery passed",
    title: "Congratulations — mastery exam passed",
    subtitle:
      "You passed the 50-question mastery quiz. That completion stays on your record.",
  },
};

export function celebrationPath(milestone: CelebrationMilestone): string {
  return `/facts/celebration/${milestone}`;
}

export function isCelebrationMilestone(value: string): value is CelebrationMilestone {
  return ["reading", "exam10", "course", "quiz20", "quiz50"].includes(value);
}
