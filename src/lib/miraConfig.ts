export const MIRA_WELCOME =
  "Hi — I'm MIRA. I help explain insurance concepts in plain language — coverage types, deductibles, liability, and how quotes generally work. I do not provide binding coverage advice or recommend specific policies. How can I help you learn today?";

export const MIRA_DISCLAIMER_AVAILABLE =
  "AI-generated educational guidance only — not legal, financial, or coverage advice. Verify details with a licensed professional and your actual policy documents.";

export const MIRA_QUICK_PROMPTS = [
  {
    label: "What is a deductible?",
    prompt:
      "Explain what an insurance deductible is in plain language, with a simple example. Educational only — not advice for my specific situation.",
  },
  {
    label: "Comprehensive vs collision",
    prompt:
      "Explain the general difference between comprehensive and collision coverage on an auto policy. Educational only.",
  },
  {
    label: "What does liability cover?",
    prompt:
      "Explain what liability coverage generally helps with on auto and home policies. Educational only — not binding advice.",
  },
  {
    label: "Umbrella insurance basics",
    prompt:
      "Explain umbrella insurance at a high level — what it generally extends and who often considers it. Educational only.",
  },
] as const;
