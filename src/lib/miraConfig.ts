export const MIRA_WELCOME =
  "Hi — I'm MIRA. I only discuss insurance, risk, and related financial protection topics in plain language — coverage types, deductibles, liability, claims, and how quotes generally work. I do not provide binding coverage advice or recommend specific policies. What would you like to learn?";

export const MIRA_DISCLAIMER_AVAILABLE =
  "Insurance & risk topics only · AI educational guidance — not legal, financial, or binding coverage advice. Verify with a licensed professional and your policy documents.";

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
