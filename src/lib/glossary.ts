export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: "Premium", definition: "The amount paid to maintain an insurance policy, usually monthly or annually." },
  { term: "Deductible", definition: "The out-of-pocket amount you pay before insurance contributes to a covered loss." },
  { term: "Liability", definition: "Coverage that may pay for injuries or damage you cause to others." },
  { term: "Comprehensive", definition: "Auto coverage for non-collision losses like theft, fire, or weather — per policy terms." },
  { term: "Collision", definition: "Auto coverage for damage from impact with another vehicle or object." },
  { term: "Endorsement", definition: "A policy add-on that modifies coverage, limits, or exclusions." },
  { term: "Exclusion", definition: "A specific loss or circumstance a policy does not cover." },
  { term: "Underwriting", definition: "The insurer's process of evaluating risk and determining eligibility and price." },
  { term: "Declaration Page", definition: "A summary of your policy's coverages, limits, deductibles, and premium." },
  { term: "Actual Cash Value (ACV)", definition: "Replacement cost minus depreciation at the time of loss." },
  { term: "Replacement Cost", definition: "Coverage that may pay to replace property without deducting depreciation." },
  { term: "Umbrella Policy", definition: "Extra liability coverage above underlying auto, home, or renters limits." },
  { term: "SR-22", definition: "A certificate filed with the state proving required auto financial responsibility." },
  { term: "BOP", definition: "Business Owners Policy — a packaged commercial policy combining property and liability." },
  { term: "General Liability", definition: "Commercial coverage for third-party bodily injury and property damage claims." },
];
