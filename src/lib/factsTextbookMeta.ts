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
    readMinutes: 9,
    objectives: [
      "Describe the state-based U.S. regulatory structure",
      "Explain McCarran-Ferguson and federal–state boundaries",
      "Summarize licensing, solvency, and common state-level themes",
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
    readMinutes: 8,
    objectives: [
      "Outline fair claims handling and prompt payment expectations",
      "Identify producer conduct, privacy, and solvency obligations",
      "Distinguish fraud types and anti-fraud enforcement",
    ],
  },
  lines: {
    readMinutes: 7,
    objectives: [
      "Differentiate property-casualty and commercial lines at a high level",
      "Understand climate, catastrophe, and insurtech trends",
      "Know where to read the dedicated life and health chapter",
    ],
  },
  "life-and-health": {
    readMinutes: 24,
    objectives: [
      "Compare term, whole, universal life, and basic annuity concepts",
      "Understand health plan costs, networks, and employer vs. marketplace coverage",
      "Explain Medicare parts, Advantage, Medigap, and Medicaid basics",
      "Recognize HIPAA, disability income, and supplemental health products",
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
  reinsurance: {
    readMinutes: 5,
    objectives: [
      "Define reinsurance and why primary insurers cede risk",
      "Explain treaty vs. facultative arrangements",
      "Connect reinsurance to catastrophe capacity and availability",
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
    readMinutes: 8,
    objectives: [
      "Locate declarations, insuring agreement, exclusions, and conditions",
      "Spot clauses that commonly surprise policyholders",
      "Find authoritative resources and use this guide responsibly",
    ],
  },
};

export function totalReadMinutes(): number {
  return Object.values(CHAPTER_META).reduce((sum, m) => sum + m.readMinutes, 0);
}

export function toRoman(n: number): string {
  return ROMAN_NUMERALS[n - 1] ?? String(n);
}
