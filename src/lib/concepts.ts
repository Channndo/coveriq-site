export interface InsuranceConcept {
  id: string;
  title: string;
  short: string;
  detail: string;
  example: string;
  whyItMatters: string;
  /** Quick-review accordion prompt, e.g. "What are deductibles?" */
  reviewQuestion: string;
}

export const INSURANCE_CONCEPTS: InsuranceConcept[] = [
  {
    id: "deductibles",
    title: "Deductibles",
    reviewQuestion: "What are deductibles?",
    short: "What you pay out of pocket before coverage applies.",
    detail:
      "A deductible is the amount you generally pay toward a covered loss before your insurer contributes. Deductibles apply per claim (not per year) on many property policies, though health plans often use annual deductibles. Choosing a higher deductible usually lowers your premium because you're taking more financial risk upfront — but that means more cash out of pocket when something goes wrong.",
    example:
      "You have a $1,000 collision deductible and $6,200 in repairs after an at-fault accident. You pay the first $1,000; your collision coverage may pay the remaining $5,200 if the claim is approved under your policy.",
    whyItMatters:
      "Picking a deductible you can't comfortably pay in an emergency can delay repairs or leave you stuck with a damaged car or home while you scramble for funds.",
  },
  {
    id: "liability",
    title: "Liability",
    reviewQuestion: "What is liability coverage?",
    short: "Coverage for harm you may cause to others.",
    detail:
      "Liability coverage generally helps pay for bodily injury or property damage you're legally responsible for — plus legal defense costs in many cases. Auto policies often show split limits (e.g., $100,000 per person / $300,000 per accident / $100,000 property damage). Home and renters policies include personal liability for incidents like a guest injury. Liability does not usually pay for your own injuries or damage to your property.",
    example:
      "A delivery driver slips on your icy walkway and needs surgery. Your homeowners liability coverage may help pay their medical bills and legal costs if you're found negligent — up to your policy limits.",
    whyItMatters:
      "Serious injury claims can exceed state minimum auto limits quickly. Without adequate liability, wages, savings, and future earnings can be at risk in a lawsuit.",
  },
  {
    id: "comp-vs-collision",
    title: "Comprehensive vs Collision",
    reviewQuestion: "What is comprehensive vs. collision?",
    short: "Two ways auto physical damage is commonly covered.",
    detail:
      "Collision typically covers damage to your vehicle from impact with another car, object, or rollover — regardless of fault, subject to your deductible. Comprehensive (sometimes called 'other than collision') generally covers theft, vandalism, fire, hail, falling objects, animal strikes, and similar events. Neither covers routine maintenance or mechanical breakdown. Lenders often require both while you have a car loan.",
    example:
      "A deer runs into your hood — that's usually comprehensive. You rear-end someone at a stop sign — that's usually collision. A cracked windshield from a rock may fall under comprehensive depending on the policy.",
    whyItMatters:
      "Carrying only liability on a vehicle you still owe money on can leave you paying for a totaled car while the loan remains due.",
  },
  {
    id: "policy-limits",
    title: "Policy Limits",
    reviewQuestion: "What are policy limits?",
    short: "The maximum your insurer may pay for a covered loss.",
    detail:
      "Limits are the caps on what an insurer will pay for covered claims. They can be per person, per accident, per item, or per policy term. Once limits are exhausted, you may be responsible for remaining costs. Umbrella policies exist partly because underlying limits can be used up in a single severe claim.",
    example:
      "Your auto policy has $50,000 in property damage liability. You cause an accident that totals a $90,000 luxury SUV. You may owe the $40,000 difference out of pocket if limits aren't higher.",
    whyItMatters:
      "Minimum state limits are designed for compliance, not asset protection. Matching limits to your net worth and risk exposure is a core part of responsible planning.",
  },
  {
    id: "premiums",
    title: "Premiums",
    reviewQuestion: "What are premiums?",
    short: "The price you pay to keep coverage in force.",
    detail:
      "Premium is the cost to maintain your policy — usually billed monthly, semi-annually, or annually. Insurers price risk using location, age, driving record, claims history, credit (where allowed), coverage types, deductibles, and vehicle or property characteristics. A lower premium isn't always better if it means stripped coverage or deductibles you can't afford.",
    example:
      "Two neighbors with the same car might pay different premiums because one has a recent at-fault accident and the other has a clean record and higher deductible.",
    whyItMatters:
      "Letting a policy lapse for non-payment can create gaps in coverage, higher rates later, and SR-22 requirements in some situations after reinstatement.",
  },
  {
    id: "exclusions",
    title: "Exclusions",
    reviewQuestion: "What are exclusions?",
    short: "What a policy typically does not cover.",
    detail:
      "Exclusions are specific situations, perils, or property types your policy won't cover. Common examples include intentional acts, wear and tear, flood and earthquake (often separate policies), business use of personal vehicles, and certain dog breeds. Endorsements can sometimes buy back limited coverage for excluded items.",
    example:
      "A sewer backs up into your basement. Standard homeowners policies often exclude or severely limit this — you may need a water backup endorsement or separate coverage.",
    whyItMatters:
      "Assuming 'full coverage' means everything is covered leads to denied claims. Reading exclusions before a loss is far less painful than after.",
  },
  {
    id: "claims",
    title: "Claims",
    reviewQuestion: "What is a claim?",
    short: "How you request payment for a covered loss.",
    detail:
      "A claim is your formal notice to the insurer that a loss occurred. The carrier assigns an adjuster, investigates facts, reviews policy language, and determines whether the loss is covered and how much to pay. You'll document damage, cooperate with interviews, and pay your deductible when applicable. Filing small claims can sometimes affect future premiums.",
    example:
      "After a hailstorm, you photograph roof damage, call your insurer's claims line, receive a claim number, meet an adjuster, and receive payment minus your deductible if the damage exceeds that amount and is covered.",
    whyItMatters:
      "Waiting too long to report a loss, making repairs before inspection, or misstating facts can complicate or jeopardize a claim.",
  },
  {
    id: "underwriting",
    title: "Underwriting",
    reviewQuestion: "What is underwriting?",
    short: "How insurers evaluate risk before offering coverage.",
    detail:
      "Underwriting is the insurer's process of deciding whether to offer coverage, at what price, and with which conditions. They use applications, motor vehicle reports, property inspections, claims databases (like CLUE), and proprietary models. Misrepresentations on an application can void coverage later.",
    example:
      "You apply for homeowners insurance on a home with an old roof. The underwriter may require a roof update, charge a higher premium, or decline to write the policy until repairs are made.",
    whyItMatters:
      "What you disclose at application time matters. Undisclosed pets, business use, or prior damage discovered after a claim can lead to denial.",
  },
  {
    id: "rcv-vs-acv",
    title: "Replacement Cost vs ACV",
    reviewQuestion: "What is replacement cost vs. ACV?",
    short: "How property value may be calculated at claim time.",
    detail:
      "Replacement cost value (RCV) generally pays to repair or replace damaged property with similar new materials, minus deductible — sometimes paying depreciated amount first and holding back depreciation until repairs are completed. Actual cash value (ACV) pays replacement cost minus depreciation, which can be much lower on older items.",
    example:
      "A 10-year-old roof is destroyed. ACV might pay based on remaining life of the roof; RCV may pay for a new roof subject to policy terms and recoverable depreciation rules.",
    whyItMatters:
      "Choosing ACV to save premium on contents coverage can leave you unable to refurnish a home after a fire at today's prices.",
  },
  {
    id: "bundling",
    title: "Bundling",
    reviewQuestion: "What is bundling?",
    short: "Combining policies with one carrier.",
    detail:
      "Bundling means placing multiple policies (e.g., auto + home) with the same insurer. Benefits may include one billing account, one agent relationship, and multi-policy discounts. It doesn't guarantee the lowest total price — specialty risks or poor loss history on one line can affect both policies.",
    example:
      "You move auto and homeowners to one carrier and receive a 10% multi-policy discount, but you still compare total out-of-pocket cost against keeping auto with a specialist carrier.",
    whyItMatters:
      "Canceling one policy in a bundle may remove discounts on the other — understand how policies are linked before switching.",
  },
  {
    id: "umbrella",
    title: "Umbrella Policies",
    reviewQuestion: "What is an umbrella policy?",
    short: "Extra liability above your primary policies.",
    detail:
      "Personal umbrella liability provides additional limits after your auto, home, or renters liability is exhausted. Typical policies start at $1 million and require minimum underlying limits (e.g., $250k/$500k auto). Coverage may extend to certain lawsuits, libel/slander, and worldwide incidents — subject to exclusions.",
    example:
      "You're liable for $800,000 in damages from a serious auto accident. Your auto policy pays $300,000; a $1M umbrella may pay the next $500,000 if terms are met.",
    whyItMatters:
      "Umbrella coverage is often inexpensive relative to the limits provided — one lawsuit can exceed standard policy limits many times over.",
  },
];
