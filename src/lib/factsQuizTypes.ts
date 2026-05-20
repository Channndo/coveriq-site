export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

/** One question per textbook chapter on each exam. */
export const QUIZ_SESSION_LENGTH = 10;
export const TEXTBOOK_CHAPTER_COUNT = 10;
