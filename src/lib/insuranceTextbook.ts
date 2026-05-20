export interface TextbookLaw {
  name: string;
  year?: string;
  summary: string;
}

export interface TextbookSection {
  id: string;
  title: string;
  paragraphs: string[];
  laws?: TextbookLaw[];
  bulletPoints?: string[];
}

export interface TextbookChapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  sections: TextbookSection[];
}

export const TEXTBOOK_INTRO = {
  title: "Insurance: History, Law, and Why It Matters",
  subtitle: "A CoverIQ educational reference — read like a textbook chapter overview",
  paragraphs: [
    "Insurance is not a single product or company — it is a system societies built to survive unpredictable loss. When thousands of households and businesses each pay a relatively small amount into a pool, the pool can pay the few who suffer large losses. That idea has shaped commerce, homeownership, driving, healthcare, and employment for centuries.",
    "This guide explains where insurance came from, why it became essential to modern life, how the United States regulates it, which laws and acts apply, and what rules insurers must follow. It is written for learners — consumers, students, and future producers — not as legal advice. Every state has its own statutes; federal law intersects mainly in health, benefits, flood, terrorism, and privacy.",
    "Use the table of contents to jump between chapters. Read straight through for the full narrative, or return to specific sections when you study for licensing exams or counsel clients.",
  ],
};

export const INSURANCE_TEXTBOOK: TextbookChapter[] = [
  {
    id: "why-it-matters",
    number: 1,
    title: "Why insurance exists and why it matters",
    subtitle: "The social and economic purpose of risk transfer",
    sections: [
      {
        id: "purpose",
        title: "1.1 The problem insurance solves",
        paragraphs: [
          "Life is uncertain. Fires, lawsuits, car crashes, illness, and death can destroy savings in a single event. Most people cannot budget for rare but catastrophic costs. Insurance converts the question 'What if disaster strikes me?' into a shared question: 'What if disaster strikes someone in our group this year?'",
          "Without insurance, many economic activities would be too risky. Banks would hesitate to lend on homes in fire zones. Families would avoid medical care. Businesses would not hire or expand. Insurance does not eliminate risk — it reallocates it, prices it, and makes recovery possible.",
        ],
      },
      {
        id: "importance",
        title: "1.2 Why it matters to you personally",
        paragraphs: [
          "Insurance protects human capital and physical capital. Auto liability shields your wages and assets from lawsuit. Homeowners coverage helps you rebuild after storm or fire. Health insurance spreads medical costs over time. Life insurance replaces income for dependents.",
          "It also satisfies legal and contractual requirements. States require auto liability. Lenders require homeowners coverage on mortgaged property. Landlords require renters insurance. Commercial leases and government contracts often require general liability and workers' compensation.",
        ],
        bulletPoints: [
          "Protects savings and future earnings from catastrophic loss",
          "Required by law for driving in every state (minimum limits vary)",
          "Required by lenders, landlords, and business contracts",
          "Enables credit — insurers and banks both assess risk",
          "Supports disaster recovery for communities after hurricanes, wildfires, and floods",
        ],
      },
      {
        id: "principles",
        title: "1.3 Core principles insurers use",
        paragraphs: [
          "Insurers rely on several foundational concepts taught in every licensing course: indemnity (restoring financial position, not profiting from loss), insurable interest (you must suffer financial harm), utmost good faith (honest applications), subrogation (insurer may recover from responsible third parties), and contribution (multiple policies share a loss).",
          "Actuarial science uses mortality, morbidity, and loss data to estimate how much premium must be collected to pay future claims and expenses. Underwriting selects and prices risk; claims adjusts losses; reinsurance spreads catastrophic exposure globally.",
        ],
      },
    ],
  },
  {
    id: "history",
    number: 2,
    title: "History: When insurance started and how it evolved",
    sections: [
      {
        id: "ancient",
        title: "2.1 Ancient and medieval roots",
        paragraphs: [
          "Merchant codes in ancient Babylon (Code of Hammurabi, ~1750 BCE) limited harsh penalties on traders who suffered robbery or certain natural events — an early recognition that not all loss is moral failure.",
          "Marine insurance grew in Mediterranean ports. Italian merchants in the 1300s shared voyage risk. Lloyd's of London (late 1600s) became the hub where underwriters evaluated ships and cargoes — the Lloyd's market still exists for complex commercial risks.",
          "After the Great Fire of London (1666), organized fire insurance societies formed. Members paid into funds to rebuild. The model spread to the American colonies.",
        ],
      },
      {
        id: "america",
        title: "2.2 Insurance in the United States",
        paragraphs: [
          "Benjamin Franklin helped establish the Philadelphia Contributionship for the Insurance of Houses from Loss by Fire (1752) — among the first successful U.S. property insurers.",
          "The 1800s brought growth, major fires (Chicago 1871), and lessons in reserves and reinsurance. The 1906 San Francisco earthquake bankrupted some carriers and improved industry discipline.",
          "Automobiles created mass liability exposure. Massachusetts passed the first compulsory auto liability law (1927). Other states followed, creating today's patchwork of minimum limits.",
          "Workers' compensation laws (1910s–1920s) replaced many workplace injury lawsuits with no-fault benefit systems funded by employers.",
          "Medicare and Medicaid (1965) reshaped health financing. Employer-sponsored health benefits expanded after WWII wage controls made benefits attractive.",
        ],
      },
      {
        id: "timeline",
        title: "2.3 Milestones timeline",
        paragraphs: [],
        bulletPoints: [
          "~1750 BCE — Code of Hammurabi merchant risk provisions",
          "1688–1690s — Lloyd's of London marine market emerges",
          "1666 — Great Fire of London spurs fire insurance growth",
          "1752 — Philadelphia Contributionship (U.S. fire insurance)",
          "1871 — Chicago Fire tests insurer solvency",
          "1927 — First U.S. compulsory auto liability (Massachusetts)",
          "1935 — Social Security Act (federal social insurance)",
          "1945 — McCarran-Ferguson Act (state regulation affirmed)",
          "1965 — Medicare and Medicaid enacted",
          "1968 — National Flood Insurance Program created",
          "1996 — HIPAA (health privacy and portability)",
          "2002 — TRIA (terrorism risk backstop)",
          "2010 — Affordable Care Act (health market reform)",
        ],
      },
    ],
  },
  {
    id: "regulation",
    number: 3,
    title: "How insurance is regulated in America",
    sections: [
      {
        id: "state-primary",
        title: "3.1 State-based regulation",
        paragraphs: [
          "Insurance is regulated primarily by each state, not by one federal agency like banking. Every state has a Department of Insurance (or equivalent) led by an elected or appointed commissioner. Duties include licensing insurers and agents, approving rates and forms in many lines, examining financial condition, and enforcing consumer protection laws.",
          "The National Association of Insurance Commissioners (NAIC) coordinates model laws and financial examinations but does not replace state authority. When you move from Texas to California, different rules, forms, and rate factors may apply.",
        ],
      },
      {
        id: "mccarran",
        title: "3.2 McCarran-Ferguson Act (1945)",
        paragraphs: [
          "After the Supreme Court suggested federal oversight might apply, Congress passed the McCarran-Ferguson Act to confirm state regulation. It provides that no federal law shall invalidate state insurance regulation unless federal law specifically relates to insurance.",
          "Federal antitrust laws apply to insurance only to the extent state law does not regulate the conduct. This structure explains why insurance markets look different state by state and why producers must be licensed in each state where they sell.",
        ],
        laws: [
          {
            name: "McCarran-Ferguson Act",
            year: "1945",
            summary: "Affirms state primacy; limits federal antitrust where states regulate insurance.",
          },
        ],
      },
      {
        id: "licensing",
        title: "3.3 Licensing and solvency rules",
        paragraphs: [
          "Insurers must be admitted (licensed) in each state where they sell, file annual financial statements, and maintain reserves. State guaranty associations may pay claims up to statutory limits if an insurer fails.",
          "Agents and brokers pass pre-licensing exams, background checks, and continuing education. Unlicensed selling is illegal and may void consumer protections.",
          "Regulators conduct financial examinations and risk-based capital (RBC) analysis to detect insolvency early. Insurers also buy reinsurance to cap catastrophic exposure.",
        ],
        bulletPoints: [
          "Admitted insurers participate in state guaranty funds",
          "Surplus lines (non-admitted) insurers serve hard-to-place risks via special brokers",
          "Rate filings: prior approval, file-and-use, or use-and-file depending on state",
          "Market conduct exams target claims delays and unfair sales",
        ],
      },
    ],
  },
  {
    id: "federal-laws",
    number: 4,
    title: "Major federal laws and acts",
    subtitle: "Laws that touch insurance even when states lead",
    sections: [
      {
        id: "federal-list",
        title: "4.1 Federal statutes (reference table)",
        paragraphs: [
          "The following federal laws significantly affect insurance markets, insurers, or policyholders. Health and benefits laws often apply alongside state insurance codes.",
        ],
        laws: [
          {
            name: "McCarran-Ferguson Act",
            year: "1945",
            summary: "State regulation of insurance; limited federal antitrust.",
          },
          {
            name: "Social Security Act",
            year: "1935",
            summary: "Federal social insurance (retirement, disability, Medicare funding).",
          },
          {
            name: "National Flood Insurance Act / NFIP",
            year: "1968",
            summary: "Federal flood program; flood excluded on most homeowners policies.",
          },
          {
            name: "Employee Retirement Income Security Act (ERISA)",
            year: "1974",
            summary: "Governs many employer health and welfare plans federally.",
          },
          {
            name: "Consolidated Omnibus Budget Reconciliation Act (COBRA)",
            year: "1985",
            summary: "Temporary continuation of group health after job loss.",
          },
          {
            name: "Health Insurance Portability and Accountability Act (HIPAA)",
            year: "1996",
            summary: "Health data privacy; portability; security rules for covered entities.",
          },
          {
            name: "Gramm-Leach-Bliley Act (GLBA)",
            year: "1999",
            summary: "Financial privacy notices; safeguards for customer information.",
          },
          {
            name: "Terrorism Risk Insurance Act (TRIA)",
            year: "2002",
            summary: "Federal backstop for certified terrorism losses; mandatory offer rules.",
          },
          {
            name: "Affordable Care Act (ACA)",
            year: "2010",
            summary: "Individual/small-group health reform; subsidies; essential benefits; MLR rules.",
          },
          {
            name: "Dodd-Frank Act (Title V — Federal Insurance Office)",
            year: "2010",
            summary: "Created FIO to monitor insurance nationally; does not replace state DOIs.",
          },
        ],
      },
    ],
  },
  {
    id: "insurer-rules",
    number: 5,
    title: "Rules insurers must abide by",
    subtitle: "Market conduct, claims, and sales standards",
    sections: [
      {
        id: "claims-rules",
        title: "5.1 Claims handling standards",
        paragraphs: [
          "Most states adopted Unfair Claims Settlement Practices Acts (often based on NAIC models). Insurers must acknowledge claims, investigate promptly, not misrepresent policy language, and not refuse payment without reasonable basis.",
          "Prompt payment laws require payment of undisputed covered amounts within time limits and may award interest on late payment. After disasters, states sometimes enact emergency claim-handling orders.",
        ],
        bulletPoints: [
          "Acknowledge claims within required timeframes",
          "Conduct reasonable investigations",
          "Not deny without valid policy basis",
          "Provide written explanation of denials",
          "Not require unnecessary paperwork to delay payment",
        ],
      },
      {
        id: "sales-rules",
        title: "5.2 Sales and marketing rules",
        paragraphs: [
          "Unfair Trade Practices Acts prohibit twisting (misleading replacement of policies), churning (unnecessary replacements for commission), false advertising, and deceptive comparisons. Producers must be licensed and follow suitability expectations.",
          "Policy forms and endorsements must be filed and approved in many states before use. Rates must follow filed rating plans; discriminatory factors may be prohibited.",
        ],
      },
      {
        id: "privacy",
        title: "5.3 Privacy and data",
        paragraphs: [
          "GLBA requires privacy notices and opt-out rights for certain information sharing. HIPAA governs health information for insurers handling protected health information. State laws (e.g., California Consumer Privacy Act concepts) add requirements.",
          "Credit-based insurance scoring is permitted in many states for auto and homeowners with disclosures and adverse action notices when score affects rate or eligibility.",
        ],
      },
      {
        id: "solvency-rules",
        title: "5.4 Solvency and financial conduct",
        paragraphs: [
          "Insurers must invest within state-approved guidelines, hold statutory reserves, and report annually. Risk-Based Capital (RBC) ratios trigger regulatory action if too low. Dividends to shareholders may be restricted when surplus is weak.",
        ],
      },
    ],
  },
  {
    id: "state-laws",
    number: 6,
    title: "State laws consumers and producers should know",
    sections: [
      {
        id: "auto-home",
        title: "6.1 Auto, home, and renters",
        paragraphs: [
          "Every state requires financial responsibility for drivers — usually liability insurance minimums. SR-22 filings prove compliance after certain violations. Homeowners and renters policies are not required by state law but are required by lenders and landlords.",
          "Cancellation and nonrenewal statutes limit when insurers can drop you mid-term or at renewal. Homeowners claim bill of rights laws exist in several states after catastrophes.",
        ],
      },
      {
        id: "workers-comp",
        title: "6.2 Workers' compensation",
        paragraphs: [
          "Workers' comp is almost entirely state law. Employers buy insurance or self-insure per state rules. Benefits cover medical care and lost wages for work-related injuries without requiring the employee to prove employer negligence.",
        ],
      },
      {
        id: "health",
        title: "6.3 Health insurance (state + federal)",
        paragraphs: [
          "Individual and small-group health plans face ACA federal rules (guaranteed issue, essential health benefits in marketplace plans, premium tax credits). Large employer plans may fall under ERISA federally. State laws add mandates, network adequacy, and external review of denials.",
        ],
      },
    ],
  },
  {
    id: "lines",
    number: 7,
    title: "Major lines of insurance (overview)",
    sections: [
      {
        id: "p-and-c",
        title: "7.1 Property and casualty",
        paragraphs: [
          "Property insurance covers buildings and belongings against fire, wind, theft, and other perils (subject to exclusions). Casualty includes liability — auto, homeowners liability, commercial general liability, umbrella, and professional liability. Auto physical damage adds collision and comprehensive.",
        ],
      },
      {
        id: "life-health",
        title: "7.2 Life and health",
        paragraphs: [
          "Life insurance pays beneficiaries at death (term, whole, universal). Health insurance covers medical expenses (employer group, individual, Medicare, Medicaid). Disability income replaces wages when you cannot work.",
        ],
      },
      {
        id: "commercial",
        title: "7.3 Commercial",
        paragraphs: [
          "Businesses buy general liability, commercial property, business interruption, workers' comp, commercial auto, professional liability (E&O), cyber, and umbrella. BOPs package coverages for eligible small businesses.",
        ],
      },
    ],
  },
  {
    id: "modern",
    number: 8,
    title: "Modern challenges and the future",
    sections: [
      {
        id: "climate",
        title: "8.1 Climate and catastrophe",
        paragraphs: [
          "Hurricanes, wildfires, and hail drive reinsurance costs and insurer withdrawals from high-risk areas. State wind pools and FAIR plans provide last-resort coverage. Building codes and mitigation discounts influence pricing.",
        ],
      },
      {
        id: "tech",
        title: "8.2 Technology and insurtech",
        paragraphs: [
          "Telematics prices auto by driving behavior. AI assists claims triage and fraud detection. Embedded insurance sells coverage at point of purchase. Regulators scrutinize algorithms for bias and transparency.",
        ],
      },
    ],
  },
  {
    id: "claims-process",
    number: 9,
    title: "The claims process: from loss to settlement",
    subtitle: "What happens after something goes wrong",
    sections: [
      {
        id: "first-steps",
        title: "9.1 Duties after a loss",
        paragraphs: [
          "When a loss occurs, policyholders have contractual duties: notify the insurer promptly, protect property from further damage (reasonable emergency repairs), cooperate with investigation, and document everything. Failure to give prompt notice can give the insurer grounds to deny a claim — though states often require the insurer to prove actual prejudice from delay.",
          "For auto accidents, exchange information, photograph damage, obtain police reports when appropriate, and seek medical care if injured. For property losses, inventory damaged items, keep receipts for temporary repairs, and do not discard evidence until the adjuster instructs you.",
        ],
        bulletPoints: [
          "Call your insurer or agent as soon as practical after a loss",
          "Mitigate further damage (tarps, board-up windows) and keep receipts",
          "Do not admit fault at an accident scene beyond what law requires",
          "Keep a log of calls, claim numbers, and adjuster names",
        ],
      },
      {
        id: "adjusters",
        title: "9.2 Adjusters, investigations, and estimates",
        paragraphs: [
          "The insurer assigns a claims adjuster — staff, independent, or public (if you hire one at your expense). Adjusters inspect damage, review policy language, interview witnesses, and estimate repair cost. They determine whether the loss is covered, whether limits and deductibles apply, and whether depreciation reduces payment.",
          "Supplemental claims may arise when hidden damage appears after initial repairs. Disputes often center on scope of damage, cause of loss (wear and tear vs. covered peril), and whether estimates use aftermarket or OEM parts.",
        ],
      },
      {
        id: "denials-appeals",
        title: "9.3 Denials, appeals, and disputes",
        paragraphs: [
          "If a claim is denied, the insurer must explain the reason in writing, citing policy provisions. You may request internal appeal, file a complaint with your state insurance department, or consult an attorney. Some states allow bad-faith lawsuits when insurers unreasonably deny covered claims.",
          "Appraisal clauses in property policies can resolve valuation disputes without full litigation. Arbitration may be required for certain auto physical damage disagreements under policy terms.",
        ],
      },
    ],
  },
  {
    id: "fraud-ethics",
    number: 10,
    title: "Fraud, ethics, and producer responsibilities",
    subtitle: "Legal duties of insurers, agents, and policyholders",
    sections: [
      {
        id: "policyholder-fraud",
        title: "10.1 Policyholder fraud",
        paragraphs: [
          "Insurance fraud inflates premiums for everyone. Hard fraud includes staged accidents, arson for profit, and fake injuries. Soft fraud includes exaggerating damages, misrepresenting facts on applications, or padding inventories after a loss.",
          "Insurers investigate suspicious claims using special investigation units (SIU), databases, and social media. Convictions can bring fines, restitution, policy rescission, and criminal penalties. Application misrepresentations can void coverage even for unrelated later claims if material to risk.",
        ],
      },
      {
        id: "producer-ethics",
        title: "10.2 Producer ethics and licensing law",
        paragraphs: [
          "Licensed producers owe duties of honesty, disclosure, and suitability. Twisting and churning violate unfair trade practice laws. Replacing a policy solely for commission without consumer benefit is prohibited in many states.",
          "Producers must complete pre-licensing education, pass exams, submit to background checks, and meet continuing education requirements. Commissions must be disclosed where required; rebating (sharing commission with the customer) is illegal in many states.",
        ],
        bulletPoints: [
          "Material misrepresentation on applications can void coverage",
          "Producers must be licensed in each state where they sell",
          "Unfair claims settlement practices apply to insurers, not consumers",
          "State insurance departments investigate producer complaints",
        ],
      },
      {
        id: "anti-fraud-laws",
        title: "10.3 Anti-fraud statutes",
        paragraphs: [
          "Many states require insurers to report suspected fraud to bureaus and participate in fraud authorities. Federal mail and wire fraud statutes apply to interstate schemes. Healthcare fraud enforcement involves CMS, FBI, and state Medicaid fraud units for false billing.",
        ],
        laws: [
          {
            name: "State insurance fraud reporting laws",
            year: "Varies",
            summary: "Require investigation and reporting of suspected fraudulent claims.",
          },
          {
            name: "False Claims Act (federal)",
            year: "1863 / amended",
            summary: "Civil and criminal penalties for false claims to government programs.",
          },
        ],
      },
    ],
  },
  {
    id: "reinsurance",
    number: 11,
    title: "Reinsurance and catastrophic risk",
    subtitle: "How insurers protect themselves — and why it affects your premium",
    sections: [
      {
        id: "what-is-reinsurance",
        title: "11.1 What reinsurance is",
        paragraphs: [
          "Reinsurance is insurance for insurance companies. A primary insurer transfers part of its risk to a reinsurer in exchange for premium. When a large hurricane hits, no single carrier wants all exposure concentrated in one state — reinsurance spreads catastrophic loss globally.",
          "Treaty reinsurance covers a block of policies automatically; facultative reinsurance covers a single large risk (e.g., a stadium or refinery) negotiated case by case.",
        ],
      },
      {
        id: "why-it-matters",
        title: "11.2 Why consumers should care",
        paragraphs: [
          "When reinsurance costs rise after global disasters (hurricanes, earthquakes, wildfires), primary insurers raise rates or reduce capacity in high-risk areas. Some carriers exit states entirely. State residual markets (wind pools, FAIR plans) grow when private market withdraws.",
          "Reinsurance does not change your policy contract directly — your claim is still paid by your insurer — but it influences whether coverage is available at all in your ZIP code.",
        ],
        bulletPoints: [
          "Reinsurance helps insurers survive mega-catastrophes",
          "Global reinsurers include Munich Re, Swiss Re, Lloyd's syndicates",
          "Florida Hurricane Catastrophe Fund and similar entities layer state protection",
          "Capital markets (catastrophe bonds) also absorb risk",
        ],
      },
    ],
  },
  {
    id: "government-programs",
    number: 12,
    title: "Government insurance and social programs",
    subtitle: "When the private market stops and public programs begin",
    sections: [
      {
        id: "social-security",
        title: "12.1 Social Security and disability",
        paragraphs: [
          "Social Security (1935) provides retirement, survivor, and disability benefits funded by payroll taxes — social insurance, not private underwriting. Supplemental Security Income (SSI) aids low-income disabled and elderly individuals separately.",
          "These programs differ from private life and disability policies but shape how families plan for income replacement.",
        ],
      },
      {
        id: "medicare-medicaid",
        title: "12.2 Medicare and Medicaid",
        paragraphs: [
          "Medicare (1965) covers seniors 65+ and certain disabled individuals — Part A hospital, Part B medical, Part C Medicare Advantage plans, Part D prescription drugs. Medicaid is state-federal coverage for low-income populations with benefits varying by state.",
          "Private insurers administer many Medicare Advantage and Part D plans under federal contracts. Medicaid expansion under the ACA extended eligibility in participating states.",
        ],
        laws: [
          {
            name: "Medicare (Title XVIII, Social Security Act)",
            year: "1965",
            summary: "Federal health coverage for seniors and qualifying disabled persons.",
          },
          {
            name: "Medicaid (Title XIX)",
            year: "1965",
            summary: "Joint federal-state program for low-income and medically needy populations.",
          },
        ],
      },
      {
        id: "other-programs",
        title: "12.3 NFIP, crop, and residual markets",
        paragraphs: [
          "The National Flood Insurance Program sells flood policies where private market declined. Federal crop insurance supports agriculture. State FAIR plans and wind pools offer basic property coverage when standard carriers will not write policies.",
          "Terrorism Risk Insurance Act creates a federal backstop for certified terrorism losses on commercial policies, with insurers required to offer terrorism coverage in many cases.",
        ],
        bulletPoints: [
          "NFIP — FloodSmart.gov for flood policy information",
          "State high-risk auto pools for drivers who cannot obtain standard coverage",
          "Workers' comp monopolistic state funds in North Dakota, Ohio, Washington, Wyoming",
        ],
      },
    ],
  },
  {
    id: "policy-contract",
    number: 13,
    title: "Reading and understanding your policy contract",
    subtitle: "Declarations, insuring agreements, exclusions, and conditions",
    sections: [
      {
        id: "parts",
        title: "13.1 Parts of an insurance policy",
        paragraphs: [
          "A policy is a legal contract. The declarations page summarizes who is insured, what is insured, limits, deductibles, premium, and policy period. The insuring agreement states what the insurer promises to pay. Exclusions list what is not covered. Conditions describe duties of insured and insurer (notice, cooperation, cancellation). Endorsements modify the base form.",
          "ISO (Insurance Services Office) and AAIS publish standard forms used by many carriers — but carriers may file modifications. Always read your specific policy, not a generic sample online.",
        ],
      },
      {
        id: "key-clauses",
        title: "13.2 Clauses that often surprise policyholders",
        paragraphs: [
          "Co-insurance clauses penalize underinsurance on commercial property. Actual cash value vs. replacement cost affects claim payment on older property. Ordinance or law coverage pays extra to meet current building codes when rebuilding. Other insurance clauses coordinate when multiple policies apply.",
          "Cancellation and nonrenewal notices must follow state statutes. Mortgage clauses name lenders as loss payees. Subrogation lets your insurer recover from at-fault parties after paying you.",
        ],
        bulletPoints: [
          "Declarations page — start here for limits and deductibles",
          "Exclusions — flood, earthquake, intentional acts, wear and tear",
          "Endorsements — scheduled jewelry, water backup, umbrella",
          "Policy jacket — lists form numbers incorporated by reference",
        ],
      },
    ],
  },
  {
    id: "resources",
    number: 14,
    title: "Study resources and disclaimer",
    sections: [
      {
        id: "resources-list",
        title: "14.1 Where to learn more",
        paragraphs: [
          "National Association of Insurance Commissioners (NAIC.org) — model laws, consumer guides, complaint filing. Your state Department of Insurance website — licensing verification, bulletins, rate filings. Federal Insurance Office (Treasury) — national reports. For producer licensing, your state's exam content outline references state statutes and NAIC models.",
        ],
        bulletPoints: [
          "NAIC.org — consumer information and insurer financial data",
          "State Department of Insurance — complaints and licensed agent lookup",
          "Healthcare.gov — ACA marketplace and Medicaid information",
          "FloodSmart.gov — NFIP flood insurance",
        ],
      },
      {
        id: "disclaimer",
        title: "14.2 Educational disclaimer",
        paragraphs: [
          "This textbook-style overview is published by CoverIQ for general education. It is not legal advice, not a substitute for your policy contract, and not exhaustive of every law in every jurisdiction. Statutes change; court decisions interpret them. Consult a licensed insurance professional and your state insurance department for matters affecting you.",
        ],
      },
    ],
  },
];

export function getAllChapterIds(): string[] {
  return INSURANCE_TEXTBOOK.map((c) => c.id);
}
