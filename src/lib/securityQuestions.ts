/** Must match Syntrix `security_q*_id` catalog (api.syntrix.solutions). */
export const SECURITY_QUESTIONS = [
  { id: 1, text: "What was the name of your first school?" },
  { id: 2, text: "What was your childhood nickname?" },
  { id: 3, text: "What is your maternal grandmother's first name?" },
  { id: 4, text: "In what city did you meet your spouse or partner?" },
  { id: 5, text: "What was the make of your first car?" },
  { id: 6, text: "What was the name of your first pet?" },
  { id: 7, text: "What street did you grow up on?" },
  { id: 8, text: "What was your dream job as a child?" },
] as const;

export type SecurityQuestionId = (typeof SECURITY_QUESTIONS)[number]["id"];

export function securityQuestionById(id: number) {
  return SECURITY_QUESTIONS.find((q) => q.id === id);
}

export function securityQuestionText(id: number): string {
  return securityQuestionById(id)?.text ?? `Security question ${id}`;
}
