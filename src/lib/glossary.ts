export interface GlossaryTerm {
  term: string;
  definition: string;
  detail: string;
  example?: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: "Premium",
    definition: "The amount you pay to keep an insurance policy active.",
    detail:
      "Premiums can usually be paid monthly, every six months, or annually. Insurers set premiums based on the risk they expect from you — factors include where you live, what you're insuring, your claims history, coverage choices, and deductibles. Missing a payment can cause a lapse, which means you have no coverage until the policy is reinstated (if the carrier allows it).",
    example: "A $1,200 annual premium might be billed as $100 per month with a small installment fee.",
  },
  {
    term: "Deductible",
    definition: "Your share of a covered loss before the insurer pays.",
    detail:
      "Deductibles reduce small nuisance claims and lower premiums when you choose higher amounts. They apply differently by line: auto collision/comprehensive deductibles are usually per incident; health insurance often uses an annual deductible. You pay the deductible even when you're not at fault in some cases, though subrogation may recover it later.",
    example: "With a $500 deductible and $3,000 in covered repairs, you pay $500 and the insurer may pay $2,500.",
  },
  {
    term: "Liability",
    definition: "Coverage for injury or damage you cause to other people or their property.",
    detail:
      "Liability is third-party coverage — it generally does not fix your car or pay your medical bills (other coverages do that). Auto liability is often legally required. Home and renters liability can cover incidents worldwide in some cases, such as a dog bite away from home. Defense costs may be paid in addition to limits or within limits depending on the policy.",
    example: "You're at fault in a fender-bender; bodily injury liability may pay the other driver's medical bills up to your limits.",
  },
  {
    term: "Comprehensive",
    definition: "Auto coverage for many non-collision losses to your vehicle.",
    detail:
      "Comprehensive covers events like theft, vandalism, fire, flood (verify policy), hail, falling trees, and animal collisions. It is optional unless required by a lender. A separate comprehensive deductible applies. Glass-only claims may have different deductible rules.",
    example: "Someone breaks your window to steal a laptop from the back seat — comprehensive may cover glass and stolen property limits permitting.",
  },
  {
    term: "Collision",
    definition: "Auto coverage for damage from impact with another vehicle or object.",
    detail:
      "Collision pays for damage to your car from accidents regardless of fault, minus deductible. If another driver is at fault, your insurer may pursue their insurance (subrogation) to recover your deductible. Collision does not cover mechanical failure or maintenance issues.",
    example: "You hit a guardrail on black ice; collision may pay for body shop repairs after your deductible.",
  },
  {
    term: "Endorsement",
    definition: "A written change that adds, removes, or modifies coverage on a policy.",
    detail:
      "Endorsements (also called riders on some policies) become part of your contract. Common endorsements include scheduled jewelry, water backup, home business coverage, and increased liability limits. They may add premium and often have their own limits and deductibles.",
    example: "You add a scheduled endorsement for a $15,000 engagement ring so it isn't subject to the standard jewelry sub-limit.",
  },
  {
    term: "Exclusion",
    definition: "A provision that states what the policy will not cover.",
    detail:
      "Exclusions define the boundaries of coverage. Reading them prevents surprise denials. Some exclusions can be narrowed with additional coverage or separate policies — flood and earthquake are classic examples on homeowners policies.",
    example: "Damage from gradual mold growth is often excluded unless caused by a covered sudden water event.",
  },
  {
    term: "Underwriting",
    definition: "The insurer's process of evaluating and pricing your risk.",
    detail:
      "Underwriting happens at new business, renewal, and sometimes mid-term when material facts change. Carriers may inspect homes, run MVR reports, and use credit-based insurance scores where permitted. Adverse underwriting can mean higher premium, exclusions, or declination.",
    example: "After two at-fault accidents in 18 months, underwriting may non-renew your policy at renewal.",
  },
  {
    term: "Declaration Page",
    definition: "A summary document listing your coverages, limits, and premium.",
    detail:
      "The dec page is usually the first pages of your policy packet. It shows named insureds, vehicles or property insured, effective dates, premium, deductibles, and coverage lines. Lenders and landlords often request it as proof of insurance.",
    example: "Your dec page shows 100/300/100 liability limits, $500 collision deductible, and lienholder information on a financed car.",
  },
  {
    term: "Actual Cash Value (ACV)",
    definition: "Replacement cost minus depreciation at the time of loss.",
    detail:
      "ACV settlements reflect age and wear. On older vehicles or belongings, ACV payouts may be far below what it costs to replace items new. Some policies use ACV for roofs after a certain age even when the rest of the policy is replacement cost.",
    example: "A 12-year-old couch destroyed in a fire might be valued at $200 ACV though a similar new couch costs $1,200.",
  },
  {
    term: "Replacement Cost",
    definition: "Payment to replace damaged property with similar new items, subject to terms.",
    detail:
      "Replacement cost coverage on homeowners policies often requires you to actually repair or replace before receiving full payment (recoverable depreciation). Personal property replacement cost is usually an optional upgrade from ACV.",
    example: "A stolen TV is replaced with a comparable new model; you may receive depreciated value first, then the holdback after purchase.",
  },
  {
    term: "Umbrella Policy",
    definition: "Extra liability limits above your auto, home, or renters policies.",
    detail:
      "Umbrella policies typically start at $1 million and require minimum underlying liability limits. They may cover certain claims excluded on home policies and can provide defense coverage. Commercial umbrellas exist for businesses separately.",
    example: "After exhausting $300,000 auto liability, a $1M umbrella may respond to additional court-awarded damages.",
  },
  {
    term: "SR-22",
    definition: "A certificate proving you carry required auto insurance, filed with your state.",
    detail:
      "An SR-22 is not insurance — it's a filing from your insurer after certain violations (DUI, driving without insurance, etc.). If your policy lapses, the state is notified. Fees apply for filing and reinstatement. Non-owner policies can satisfy SR-22 requirements in some cases.",
    example: "After a suspension, you pay reinstatement fees and maintain continuous auto insurance for three years while the SR-22 is on file.",
  },
  {
    term: "BOP",
    definition: "Business Owners Policy — packaged commercial property and liability.",
    detail:
      "A BOP bundles general liability and commercial property for eligible small businesses. Not every business qualifies — higher-risk operations may need monoline policies. Optional coverages like business interruption and cyber can sometimes be added.",
    example: "A retail shop insures inventory, fixtures, and customer slip-and-fall liability under one BOP.",
  },
  {
    term: "General Liability",
    definition: "Commercial coverage for third-party injury and property damage claims.",
    detail:
      "GL covers premises operations, products, and completed operations for many businesses. It does not cover employee injuries (workers comp), professional mistakes (E&O), or company vehicles (commercial auto). Contractual liability requirements often specify GL limits.",
    example: "A client trips over your equipment at their office; GL may defend you and pay settlements within limits.",
  },
  {
    term: "Subrogation",
    definition: "When your insurer recovers costs from the party responsible for a loss.",
    detail:
      "If you're not at fault, your insurer may pay your claim and then pursue the other driver's insurer for reimbursement, including your deductible in successful cases. Subrogation clauses prevent you from collecting twice for the same loss.",
    example: "Your insurer pays your repair bill, then collects from the at-fault driver's carrier and refunds your $500 deductible.",
  },
  {
    term: "Named Insured",
    definition: "The person or entity the policy is primarily written to protect.",
    detail:
      "Named insureds have the broadest rights and duties under the contract — they receive notices, pay premiums, and file claims. Additional insureds and household members may have coverage without being named, depending on policy type.",
    example: "On a homeowners policy, both spouses are often named insureds; a child away at college may be a covered family member.",
  },
  {
    term: "Peril",
    definition: "The specific cause of loss covered by a policy.",
    detail:
      "Homeowners policies may be 'named peril' (only listed causes) or 'open peril' on dwelling (everything not excluded). Understanding perils helps you know whether fire, theft, or sewer backup is covered.",
    example: "Windstorm is a covered peril on many policies; earth movement often is not unless endorsed.",
  },
];
