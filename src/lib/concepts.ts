export interface InsuranceConcept {
  id: string;
  title: string;
  short: string;
  detail: string;
  example?: string;
}

export const INSURANCE_CONCEPTS: InsuranceConcept[] = [
  {
    id: "deductibles",
    title: "Deductibles",
    short: "What you pay out of pocket before coverage applies.",
    detail:
      "A deductible is the amount you generally pay toward a covered loss before your insurer pays. Higher deductibles often mean lower premiums, but more out-of-pocket cost when you file a claim.",
    example: "A $500 deductible on collision means you pay the first $500 of repair costs.",
  },
  {
    id: "liability",
    title: "Liability",
    short: "Coverage for harm you may cause to others.",
    detail:
      "Liability coverage generally helps pay for bodily injury or property damage you are legally responsible for. Limits are often split (per person / per accident / property damage).",
  },
  {
    id: "comp-vs-collision",
    title: "Comprehensive vs Collision",
    short: "Two ways auto physical damage is commonly covered.",
    detail:
      "Collision typically covers damage from accidents with another vehicle or object. Comprehensive generally covers non-collision events like theft, vandalism, or weather — subject to policy terms.",
  },
  {
    id: "policy-limits",
    title: "Policy Limits",
    short: "The maximum your insurer may pay for a covered loss.",
    detail:
      "Limits cap how much the carrier may pay. Choosing limits involves balancing affordability with protecting your assets — this is general education, not a recommendation for your situation.",
  },
  {
    id: "premiums",
    title: "Premiums",
    short: "The price you pay to keep coverage in force.",
    detail:
      "Premiums are influenced by many factors: location, coverage selections, deductibles, claims history, and underwriting guidelines. Rates vary by carrier and state.",
  },
  {
    id: "exclusions",
    title: "Exclusions",
    short: "What a policy typically does not cover.",
    detail:
      "Every policy has exclusions — intentional damage, wear and tear, and certain catastrophes are common examples. Always read your declarations page and policy forms.",
  },
  {
    id: "claims",
    title: "Claims",
    short: "How you request payment for a covered loss.",
    detail:
      "Filing a claim notifies your insurer of a loss. They investigate, apply deductibles and limits, and determine payment based on policy language — approval is never guaranteed in advance.",
  },
  {
    id: "underwriting",
    title: "Underwriting",
    short: "How insurers evaluate risk before offering coverage.",
    detail:
      "Underwriters review applications using guidelines that vary by carrier. Information you provide affects eligibility, pricing, and available coverages.",
  },
  {
    id: "rcv-vs-acv",
    title: "Replacement Cost vs ACV",
    short: "How property value may be calculated at claim time.",
    detail:
      "Replacement cost generally pays to replace items with similar new ones (minus deductible). Actual cash value deducts depreciation, which may result in lower payouts.",
  },
  {
    id: "bundling",
    title: "Bundling",
    short: "Combining policies with one carrier.",
    detail:
      "Bundling auto with home or renters may simplify billing and sometimes reduce total premium — but comparing separate policies can still be worthwhile.",
  },
  {
    id: "umbrella",
    title: "Umbrella Policies",
    short: "Extra liability above your primary policies.",
    detail:
      "Umbrella insurance extends liability limits after underlying auto or home limits are used. It typically requires minimum underlying limits.",
  },
];
