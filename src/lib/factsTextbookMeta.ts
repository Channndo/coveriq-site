/** Per-chapter study metadata for the Facts textbook UI. */
export const TEXTBOOK_EDITION = "CoverIQ Reference · 2026";

export const ROMAN_NUMERALS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
] as const;

export const CHAPTER_META: Record<
  string,
  { readMinutes: number; objectives: string[] }
> = {
  "why-it-matters": {
    readMinutes: 6,
    objectives: [
      "Explain why societies pool risk through insurance",
      "Describe how coverage protects personal and household finances",
      "Name core principles: indemnity, insurable interest, and utmost good faith",
    ],
  },
  history: {
    readMinutes: 8,
    objectives: [
      "Trace insurance from ancient trade codes to Lloyd's and fire societies",
      "Identify milestones in U.S. insurance development",
      "Place major reforms on a historical timeline",
    ],
  },
  regulation: {
    readMinutes: 7,
    objectives: [
      "Describe the state-based U.S. regulatory structure",
      "Explain McCarran-Ferguson and federal–state boundaries",
      "Summarize licensing, solvency, and guaranty fund concepts",
    ],
  },
  "federal-laws": {
    readMinutes: 9,
    objectives: [
      "Recognize major federal statutes that touch insurance markets",
      "Distinguish health, benefits, flood, and terrorism backstops",
      "Understand when federal law operates alongside state codes",
    ],
  },
  "insurer-rules": {
    readMinutes: 7,
    objectives: [
      "Outline fair claims handling and prompt payment expectations",
      "Identify producer conduct and disclosure requirements",
      "Describe privacy and financial solvency obligations",
    ],
  },
  "state-laws": {
    readMinutes: 6,
    objectives: [
      "Explain why rules vary by jurisdiction without memorizing state statutes",
      "Compare auto, workers' comp, and health regulatory themes",
      "Know where to verify requirements in your state",
    ],
  },
  lines: {
    readMinutes: 8,
    objectives: [
      "Differentiate property-casualty, life, health, and commercial lines",
      "Match common products to the risks they address",
      "Recognize when multiple policies work together",
    ],
  },
  modern: {
    readMinutes: 5,
    objectives: [
      "Understand how climate and catastrophe affect availability and pricing",
      "Describe technology's role in underwriting and claims",
      "Anticipate evolving consumer and regulatory expectations",
    ],
  },
  "claims-process": {
    readMinutes: 7,
    objectives: [
      "Walk through first notice of loss and documentation duties",
      "Explain the adjuster's role and settlement factors",
      "Outline appeals when coverage is disputed or denied",
    ],
  },
  "fraud-ethics": {
    readMinutes: 6,
    objectives: [
      "Distinguish hard fraud from soft fraud and application misrepresentation",
      "Apply producer ethics and suitability standards",
      "Recognize anti-fraud enforcement at federal and industry levels",
    ],
  },
  reinsurance: {
    readMinutes: 5,
    objectives: [
      "Define reinsurance and why primary insurers cede risk",
      "Explain treaty vs. facultative arrangements",
      "Connect reinsurance to catastrophe capacity and solvency",
    ],
  },
  "government-programs": {
    readMinutes: 7,
    objectives: [
      "Contrast Social Security with private insurance",
      "Summarize Medicare, Medicaid, and ACA marketplace roles",
      "Identify NFIP and other federal risk programs",
    ],
  },
  "policy-contract": {
    readMinutes: 7,
    objectives: [
      "Locate declarations, insuring agreement, exclusions, and conditions",
      "Interpret endorsements and ISO-style form structure",
      "Spot clauses that commonly surprise policyholders",
    ],
  },
  resources: {
    readMinutes: 4,
    objectives: [
      "Find authoritative NAIC and state regulator resources",
      "Use this guide responsibly as education, not legal advice",
      "Continue learning via glossary, FAQ, and quiz",
    ],
  },
};

export function totalReadMinutes(): number {
  return Object.values(CHAPTER_META).reduce((sum, m) => sum + m.readMinutes, 0);
}

export function toRoman(n: number): string {
  return ROMAN_NUMERALS[n - 1] ?? String(n);
}
