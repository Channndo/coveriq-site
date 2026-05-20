export interface TextbookLaw {
  name: string;
  year?: string;
  summary: string;
}

/** External references for learners who want to verify or go deeper. */
export interface TextbookCitation {
  source: string;
  url?: string;
  note?: string;
}

export interface TextbookSection {
  id: string;
  title: string;
  paragraphs: string[];
  laws?: TextbookLaw[];
  bulletPoints?: string[];
  citations?: TextbookCitation[];
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
    "Use the table of contents to jump between eleven chapters — including a dedicated life and health chapter with cited sources. Read straight through for the full narrative, or return to specific sections when you want a refresher before talking with an agent or using MIRA. This is general education — not state licensing exam preparation.",
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
          "Insurers rely on several foundational concepts you will see in introductory insurance education and producer training: indemnity (restoring financial position, not profiting from loss), insurable interest (you must suffer financial harm), utmost good faith (honest applications), subrogation (insurer may recover from responsible third parties), and contribution (multiple policies share a loss).",
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
      {
        id: "state-themes",
        title: "3.4 State laws consumers and producers should know",
        paragraphs: [
          "Every state requires financial responsibility for drivers — usually liability insurance minimums. SR-22 filings prove compliance after certain violations. Homeowners and renters policies are not required by state law but are required by lenders and landlords.",
          "Workers' compensation is almost entirely state law: employers buy insurance or self-insure; benefits cover work-related injuries without requiring proof of employer negligence. Individual and small-group health plans face ACA federal rules alongside state mandates, network adequacy, and external review of denials.",
        ],
        bulletPoints: [
          "Auto liability minimums and cancellation rules vary by state — verify with your Department of Insurance",
          "Workers' comp is mandatory for most employers in most states",
          "Health: ACA marketplace rules plus state benefit mandates",
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
        citations: [
          {
            source: "Congress.gov — McCarran-Ferguson Act overview",
            url: "https://www.congress.gov/bill/79th-congress/house-bill/3269",
            note: "Legislative history",
          },
          {
            source: "FEMA — National Flood Insurance Program",
            url: "https://www.floodsmart.gov",
            note: "NFIP consumer site",
          },
          {
            source: "U.S. Department of Labor — ERISA",
            url: "https://www.dol.gov/general/topic/health-plans/erisa",
            note: "Employer plan rules",
          },
          {
            source: "HHS — HIPAA",
            url: "https://www.hhs.gov/hipaa/index.html",
            note: "Privacy and security rules",
          },
          {
            source: "U.S. Treasury — Federal Insurance Office",
            url: "https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/federal-insurance-office",
            note: "Dodd-Frank Title V",
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
      {
        id: "fraud-policyholder",
        title: "5.5 Fraud and policyholder duties",
        paragraphs: [
          "Insurance fraud inflates premiums for everyone. Hard fraud includes staged accidents and arson for profit; soft fraud includes exaggerating damages or misrepresenting facts on applications. Insurers investigate suspicious claims through special investigation units. Application misrepresentations can void coverage if material to risk.",
        ],
      },
      {
        id: "producer-ethics",
        title: "5.6 Producer ethics and anti-fraud enforcement",
        paragraphs: [
          "Licensed producers owe duties of honesty, disclosure, and suitability. Twisting and churning violate unfair trade practice laws. Producers must complete pre-licensing education, pass exams, and meet continuing education requirements. Many states require insurers to report suspected fraud; federal mail and wire fraud statutes apply to interstate schemes.",
        ],
        bulletPoints: [
          "Material misrepresentation on applications can void coverage",
          "Producers must be licensed in each state where they sell",
          "State insurance departments investigate producer complaints",
        ],
      },
    ],
  },
  {
    id: "lines",
    number: 6,
    title: "Major lines of insurance (overview)",
    sections: [
      {
        id: "p-and-c",
        title: "6.1 Property and casualty",
        paragraphs: [
          "Property insurance covers buildings and belongings against fire, wind, theft, and other perils (subject to exclusions). Casualty includes liability — auto, homeowners liability, commercial general liability, umbrella, and professional liability. Auto physical damage adds collision and comprehensive.",
        ],
      },
      {
        id: "life-health-pointer",
        title: "6.2 Life and health (see Chapter VII)",
        paragraphs: [
          "Life and health insurance use different contracts, regulators, and federal statutes than most property-casualty lines. Chapter VII has seventeen sections on term and permanent life, annuities, health plan costs and networks, employer and ACA coverage, Medicare and Medicaid, disability, and supplemental products — each with cited sources where helpful.",
        ],
        citations: [
          {
            source: "NAIC — Life insurance consumer resources",
            url: "https://content.naic.org/consumer/life-insurance",
            note: "Overview of life products and consumer tips",
          },
          {
            source: "NAIC — Health insurance resources",
            url: "https://content.naic.org/consumer/health-insurance",
            note: "Health coverage basics and complaints",
          },
        ],
      },
      {
        id: "commercial",
        title: "6.3 Commercial",
        paragraphs: [
          "Businesses buy general liability, commercial property, business interruption, workers' comp, commercial auto, professional liability (E&O), cyber, and umbrella. BOPs package coverages for eligible small businesses.",
        ],
      },
      {
        id: "modern-market",
        title: "6.4 Climate, catastrophe, and insurtech",
        paragraphs: [
          "Hurricanes, wildfires, and hail drive reinsurance costs and insurer withdrawals from high-risk areas. State wind pools and FAIR plans provide last-resort coverage. Telematics prices auto by driving behavior; AI assists claims triage and fraud detection. Regulators scrutinize algorithms for bias and transparency.",
        ],
        citations: [
          {
            source: "FEMA — National Flood Insurance Program",
            url: "https://www.floodsmart.gov",
            note: "Flood coverage outside standard homeowners policies",
          },
        ],
      },
    ],
  },
  {
    id: "life-and-health",
    number: 7,
    title: "Life and health insurance",
    subtitle: "Life products, health coverage, public programs, and how they differ from property-casualty",
    sections: [
      {
        id: "lh-overview",
        title: "7.1 Life and health lines — overview",
        paragraphs: [
          "Life and health insurance address human risks: death, illness, injury, and medical expenses. They share state insurance regulation but involve more federal law than most auto or homeowners policies — especially for employer benefits, Medicare, Medicaid, and the Affordable Care Act (ACA).",
          "Life insurance pays beneficiaries when the insured dies (subject to policy terms). Health insurance helps pay for medical services through networks, cost-sharing, and plan rules. Disability income replaces wages when you cannot work. Supplemental products (dental, vision, critical illness) fill gaps but are not substitutes for comprehensive major medical coverage.",
        ],
        bulletPoints: [
          "Life: mortality risk, beneficiaries, and sometimes living benefits or cash value",
          "Health: medical services, formularies, prior authorization, and provider networks",
          "Public programs (Medicare, Medicaid) overlap with private coverage for many Americans",
          "This chapter is general education — not licensing exam prep or personal tax/legal advice",
        ],
        citations: [
          {
            source: "NAIC — Life insurance",
            url: "https://content.naic.org/consumer/life-insurance",
          },
          {
            source: "NAIC — Health insurance",
            url: "https://content.naic.org/consumer/health-insurance",
          },
        ],
      },
      {
        id: "term-life",
        title: "7.2 Term life insurance",
        paragraphs: [
          "Term life provides a death benefit for a set period — commonly 10, 20, or 30 years — with no cash value. If the insured dies during the term, beneficiaries receive the face amount (minus any loans or unpaid premium). If the term ends while the insured is living, coverage stops unless renewed or converted per policy terms.",
          "Term is often used for income replacement while raising children, covering a mortgage, or funding business buy-sell needs. Premiums are lower than permanent insurance at the same face amount because the insurer expects fewer deaths during a limited term and there is no savings component.",
        ],
        bulletPoints: [
          "Level term keeps the same premium for the term period; annual renewable term can increase each year",
          "Conversion options may let you switch to permanent coverage without a new medical exam — deadlines apply",
          "Return-of-premium term costs more but refunds premiums if you outlive the term (read conditions)",
        ],
        citations: [
          {
            source: "FTC — Life insurance",
            url: "https://consumer.ftc.gov/articles/life-insurance",
          },
        ],
      },
      {
        id: "permanent-life",
        title: "7.3 Whole life and universal life",
        paragraphs: [
          "Whole life is permanent insurance with a fixed death benefit and premiums that typically do not increase with age. It may build cash value that grows on a schedule defined in the contract; loans and surrenders access that value but reduce the death benefit if not repaid.",
          "Universal life (UL) offers flexible premiums and adjustable death benefits within limits. Interest-credited UL depends on insurer-declared rates. Variable universal life (VUL) ties cash value to separate investment accounts — market risk falls on the policyholder. Illustrations show hypothetical values; guarantees are limited to what the contract states.",
        ],
        bulletPoints: [
          "Participating whole life may pay dividends — not guaranteed",
          "Surrender charges often apply in early policy years on permanent contracts",
          "Compare fees, guarantees, and non-guaranteed elements before buying VUL or indexed products",
        ],
        citations: [
          {
            source: "NAIC — Life insurance buyer's guide (PDF)",
            url: "https://content.naic.org/sites/default/files/publication-lig-zb.pdf",
          },
        ],
      },
      {
        id: "life-policy-admin",
        title: "7.4 Beneficiaries, riders, and replacements",
        paragraphs: [
          "You name beneficiaries to receive life proceeds — primary and contingent. Review designations after marriage, divorce, births, and deaths. Proceeds usually pass outside probate but may be taxable in rare estate situations; consult a professional for complex estates.",
          "Riders add benefits: waiver of premium if disabled, accelerated death benefit for terminal illness, child term riders, or accidental death. Each rider has a cost and conditions.",
          "Replacing one life policy with another can restart contestability periods and trigger surrender charges. State replacement regulations require disclosure and signed statements explaining why a change is in the consumer's interest.",
        ],
        bulletPoints: [
          "Contestability (often two years) lets insurers review application accuracy after issue",
          "Suicide exclusions may apply for a limited period after policy issue",
          "Group life through employers may not be portable when employment ends",
        ],
      },
      {
        id: "life-regulation",
        title: "7.5 Life insurance regulation",
        paragraphs: [
          "State insurance departments license life insurers and producers, approve policy forms, and examine financial condition. The NAIC promotes consistent replacement, illustration, and annuity suitability standards. There is no federal charter for ordinary retail life insurance comparable to national banks.",
          "Federal tax rules affect how policyholders and beneficiaries are taxed on cash value, withdrawals, and death benefits under current law. Tax law changes; this guide does not provide tax advice.",
        ],
        citations: [
          {
            source: "NAIC — Life insurance and annuities (industry)",
            url: "https://content.naic.org/industry/life-insurance-and-annuities",
          },
        ],
      },
      {
        id: "annuities",
        title: "7.6 Annuities — basics",
        paragraphs: [
          "Annuities are insurance contracts that pay income over time — often used for retirement. Accumulation annuities grow funds tax-deferred until withdrawal. Immediate annuities convert a lump sum into a stream of payments starting soon after purchase.",
          "Fixed annuities credit a declared rate; indexed annuities link returns to a market index with caps and floors; variable annuities invest in subaccounts similar to mutual funds. Surrender charges, mortality and expense fees, and rider costs vary widely. Free-look periods let buyers cancel within a set number of days after delivery in many states.",
        ],
        bulletPoints: [
          "Annuities are long-term contracts — early withdrawals may trigger taxes and penalties",
          "Suitability rules require producers to match products to client needs and risk tolerance",
          "Guarantees apply only to the insurer's financial strength and stated contract terms",
        ],
        citations: [
          {
            source: "NAIC — Annuities consumer information",
            url: "https://content.naic.org/consumer/annuities",
          },
          {
            source: "SEC — Variable annuities investor bulletin",
            url: "https://www.sec.gov/investor/pubs/varannty.htm",
          },
        ],
      },
      {
        id: "health-cost-sharing",
        title: "7.7 Health plan costs and cost-sharing",
        paragraphs: [
          "Health plans use a stack of cost-sharing: premium (monthly bill), deductible (what you pay before the plan pays much), copayment (flat fee per visit or drug), coinsurance (your percentage of allowed charges), and out-of-pocket maximum (cap on your spending for covered essential benefits in a year, ACA plans).",
          "Allowed amounts are what the plan will pay toward a negotiated rate — balance billing can occur if you use out-of-network providers. Always check whether a service is covered and whether prior authorization is required before non-emergency care.",
        ],
        bulletPoints: [
          "High-deductible health plans (HDHPs) pair with health savings accounts (HSAs) when IRS rules are met",
          "Preventive care is often covered at no cost on ACA-compliant plans",
          "Formulary tiers affect prescription copays — generic tiers cost less than brand or specialty",
        ],
        citations: [
          {
            source: "Healthcare.gov — Out-of-pocket costs",
            url: "https://www.healthcare.gov/glossary/out-of-pocket-costs/",
          },
        ],
      },
      {
        id: "health-networks",
        title: "7.8 Provider networks and plan types",
        paragraphs: [
          "Managed care plans contract with networks of doctors, hospitals, and pharmacies. HMOs usually require a primary care physician and referrals for specialists. PPOs offer more flexibility to see out-of-network providers at higher cost. EPOs cover in-network care only except emergencies. POS plans blend HMO and PPO features.",
          "Narrow networks can lower premiums but limit provider choice. Verify that your doctors, hospitals, and medications are in-network before enrolling — especially during annual open enrollment.",
        ],
        bulletPoints: [
          "Out-of-network care can mean higher bills and surprise balance billing in some situations",
          "Emergency care must be covered as in-network on ACA plans regardless of hospital network status",
          "Telehealth benefits expanded after 2020 but vary by plan",
        ],
      },
      {
        id: "employer-health",
        title: "7.9 Employer group health and COBRA",
        paragraphs: [
          "Most working-age Americans get health coverage through employers. Employers often subsidize premiums; employees share costs through payroll deduction. Self-funded plans (common at large employers) are governed by ERISA federally; fully insured group plans are also subject to state insurance rules.",
          "When employment ends, COBRA may let you continue the group plan for 18–36 months in qualifying events by paying the full premium plus a small administrative fee. State continuation laws sometimes extend rights for small employers not subject to federal COBRA.",
        ],
        laws: [
          {
            name: "ERISA",
            year: "1974",
            summary: "Federal standards for many employer health and welfare benefit plans.",
          },
          {
            name: "COBRA",
            year: "1985",
            summary: "Temporary continuation of group health after job loss and certain other events.",
          },
        ],
        citations: [
          {
            source: "U.S. Department of Labor — COBRA",
            url: "https://www.dol.gov/general/topic/health-plans/cobra",
          },
        ],
      },
      {
        id: "aca-marketplace",
        title: "7.10 ACA marketplace and essential health benefits",
        paragraphs: [
          "The Affordable Care Act reformed individual and small-group markets: no pre-existing condition exclusions, no annual or lifetime dollar limits on essential health benefits, medical loss ratio rebates if insurers spend too little on care, and premium tax credits for eligible marketplace enrollees based on household income.",
          "Metal tiers (Bronze, Silver, Gold, Platinum) indicate how costs are split — Bronze has lower premiums and higher out-of-pocket costs; Platinum is the reverse. Open enrollment runs each fall for coverage starting January 1; special enrollment periods apply after marriage, birth, loss of other coverage, and other qualifying events.",
          "Short-term limited-duration and some sharing-ministry arrangements are not full substitutes for comprehensive ACA-compliant major medical coverage.",
        ],
        laws: [
          {
            name: "Affordable Care Act (ACA)",
            year: "2010",
            summary: "Market reforms, essential benefits, subsidies, and Medicaid expansion option.",
          },
        ],
        citations: [
          {
            source: "Healthcare.gov — Plan types",
            url: "https://www.healthcare.gov/choose-a-plan/plan-types/",
          },
        ],
      },
      {
        id: "hipaa-privacy",
        title: "7.11 HIPAA and health privacy",
        paragraphs: [
          "HIPAA requires health plans, most healthcare providers, and clearinghouses to safeguard protected health information (PHI). Patients receive privacy notices explaining uses and disclosures. Minimum necessary rules limit how much information is shared internally.",
          "Security rules require administrative, physical, and technical safeguards for electronic PHI. Breach notification rules require reporting to individuals and HHS when unsecured PHI is compromised. Business associates (vendors) must sign agreements and follow HIPAA too.",
          "Mental health parity laws (federal and state) require comparable treatment limits for mental health and substance use disorder benefits versus medical/surgical benefits in many plans.",
        ],
        laws: [
          {
            name: "HIPAA",
            year: "1996",
            summary: "Privacy, security, and portability rules for covered entities.",
          },
        ],
        citations: [
          {
            source: "HHS — HIPAA",
            url: "https://www.hhs.gov/hipaa/index.html",
          },
        ],
      },
      {
        id: "medicare-parts",
        title: "7.12 Medicare — Original Medicare and Parts A–D",
        paragraphs: [
          "Medicare is federal health insurance for people 65 and older, certain younger disabled individuals, and those with end-stage renal disease. Part A (hospital insurance) covers inpatient care, skilled nursing after a hospital stay, hospice, and limited home health — often premium-free if you paid Medicare taxes long enough.",
          "Part B (medical insurance) covers doctor visits, outpatient care, preventive services, and durable medical equipment — monthly premiums and an annual deductible apply, plus coinsurance. Part D covers outpatient prescription drugs through private plans approved by Medicare.",
          "Enrollment windows matter: initial enrollment around age 65, annual open enrollment for Part D and Advantage, and general enrollment for Part B if you delayed. Late enrollment penalties can apply for Part B and Part D if you lack other creditable coverage.",
        ],
        citations: [
          {
            source: "Medicare.gov — What's Medicare?",
            url: "https://www.medicare.gov/what-medicare-covers/your-medicare-coverage-choices",
          },
        ],
      },
      {
        id: "medicare-advantage-medigap",
        title: "7.13 Medicare Advantage and Medigap",
        paragraphs: [
          "Medicare Advantage (Part C) is offered by private insurers that contract with Medicare to provide Part A and Part B benefits — often with Part D included. Plans may add dental, vision, or fitness benefits but use network rules and prior authorization. You still pay the Part B premium in most cases.",
          "Medigap (Medicare supplement) policies help pay deductibles, coinsurance, and copays for people in Original Medicare — standardized plans (A, B, C, D, F, G, K, L, M, N) vary by letter; not all letters are sold to new enrollees in every state. You cannot use Medigap with Medicare Advantage — choose one path during enrollment planning.",
        ],
        bulletPoints: [
          "Compare total costs: premiums, copays, drug coverage, and network access",
          "Star ratings on Medicare.gov summarize plan quality and member experience",
          "Creditable coverage rules affect Part D late penalties when you delay enrollment",
        ],
        citations: [
          {
            source: "Medicare.gov — Medigap",
            url: "https://www.medicare.gov/health-drug-plans/medigap",
          },
        ],
      },
      {
        id: "medicaid-ltc",
        title: "7.14 Medicaid and long-term care",
        paragraphs: [
          "Medicaid is a joint federal-state program for low-income children, parents, pregnant women, seniors, and people with disabilities. Eligibility and benefits differ by state. Expansion under the ACA raised income limits for adults in participating states.",
          "Medicaid is the largest payer of long-term nursing home care in the U.S. Medicare generally does not cover extended custodial nursing home stays. Planning for long-term care may involve Medicaid eligibility rules (look-back periods for asset transfers), private long-term care insurance, or self-funding — each has tradeoffs.",
          "Dual eligibles receive both Medicare and Medicaid; Medicare pays first for Medicare-covered services; Medicaid may pay premiums and cost-sharing.",
        ],
        citations: [
          {
            source: "Medicaid.gov",
            url: "https://www.medicaid.gov",
          },
          {
            source: "Medicare.gov — Long-term care",
            url: "https://www.medicare.gov/coverage/long-term-care",
          },
        ],
      },
      {
        id: "disability-income",
        title: "7.15 Disability income insurance",
        paragraphs: [
          "Short-term disability (STD) often replaces a portion of income for weeks to months after a waiting period. Long-term disability (LTD) may pay for years or to retirement age if you remain disabled. Employer plans are common; individual policies fill gaps for self-employed workers.",
          "Definitions matter: 'own occupation' pays if you cannot perform your job; 'any occupation' is stricter. Elimination periods (waiting before benefits start) and benefit periods (how long benefits last) drive premium. Offsets may reduce benefits if Social Security Disability or workers' comp also pays.",
        ],
        citations: [
          {
            source: "NAIC — Disability insurance",
            url: "https://content.naic.org/consumer/disability-insurance",
          },
          {
            source: "Social Security Administration — Disability benefits",
            url: "https://www.ssa.gov/disability",
          },
        ],
      },
      {
        id: "supplemental-health",
        title: "7.16 Supplemental and limited-benefit products",
        paragraphs: [
          "Dental and vision plans cover routine care and some major services — often with annual maximums and waiting periods. Critical illness policies pay a lump sum if you are diagnosed with specified conditions (heart attack, stroke, cancer, etc.) — they do not replace comprehensive health insurance.",
          "Hospital indemnity plans pay fixed amounts per day of hospitalization. Accident policies cover injury from accidents. These products can help with cash flow but leave gaps for ongoing chronic care and prescriptions unless paired with major medical coverage.",
          "Health care sharing ministries are not insurance — members share expenses under religious or ethical agreements without the same regulatory protections as licensed insurers.",
        ],
        bulletPoints: [
          "Read exclusions, waiting periods, and maximum benefits on supplemental policies",
          "Verify whether premiums are affordable relative to the limited benefits paid",
          "Licensed agents must explain differences between major medical and limited-benefit plans",
        ],
        citations: [
          {
            source: "NAIC — Supplemental health insurance",
            url: "https://content.naic.org/consumer/health-insurance",
          },
        ],
      },
      {
        id: "lh-vs-pc",
        title: "7.17 How life and health differ from property-casualty",
        paragraphs: [
          "Property-casualty policies typically renew annually and indemnify physical damage or legal liability. Life policies may last decades; health policies revolve around networks, utilization management, and federal program rules. Claims on health policies are service reimbursements or provider payments, not rebuilding a house or fixing a car.",
          "Consumers should keep summary of benefits and coverage (SBC) documents for health, evidence of coverage for Medicare plans, and policy illustrations plus contracts for life products. File complaints with your state insurance department or, for employer plans, DOL or HHS as appropriate.",
        ],
        citations: [
          {
            source: "NAIC — File a complaint",
            url: "https://content.naic.org/consumer/insurance-topics/file-a-complaint",
          },
        ],
      },
    ],
  },
  {
    id: "claims-process",
    number: 8,
    title: "The claims process: from loss to settlement",
    subtitle: "What happens after something goes wrong",
    sections: [
      {
        id: "first-steps",
        title: "8.1 Duties after a loss",
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
        title: "8.2 Adjusters, investigations, and estimates",
        paragraphs: [
          "The insurer assigns a claims adjuster — staff, independent, or public (if you hire one at your expense). Adjusters inspect damage, review policy language, interview witnesses, and estimate repair cost. They determine whether the loss is covered, whether limits and deductibles apply, and whether depreciation reduces payment.",
          "Supplemental claims may arise when hidden damage appears after initial repairs. Disputes often center on scope of damage, cause of loss (wear and tear vs. covered peril), and whether estimates use aftermarket or OEM parts.",
        ],
      },
      {
        id: "denials-appeals",
        title: "8.3 Denials, appeals, and disputes",
        paragraphs: [
          "If a claim is denied, the insurer must explain the reason in writing, citing policy provisions. You may request internal appeal, file a complaint with your state insurance department, or consult an attorney. Some states allow bad-faith lawsuits when insurers unreasonably deny covered claims.",
          "Appraisal clauses in property policies can resolve valuation disputes without full litigation. Arbitration may be required for certain auto physical damage disagreements under policy terms.",
        ],
      },
    ],
  },
  {
    id: "reinsurance",
    number: 9,
    title: "Reinsurance and catastrophic risk",
    subtitle: "How insurers protect themselves — and why it affects your premium",
    sections: [
      {
        id: "what-is-reinsurance",
        title: "9.1 What reinsurance is",
        paragraphs: [
          "Reinsurance is insurance for insurance companies. A primary insurer transfers part of its risk to a reinsurer in exchange for premium. When a large hurricane hits, no single carrier wants all exposure concentrated in one state — reinsurance spreads catastrophic loss globally.",
          "Treaty reinsurance covers a block of policies automatically; facultative reinsurance covers a single large risk (e.g., a stadium or refinery) negotiated case by case.",
        ],
      },
      {
        id: "why-it-matters",
        title: "9.2 Why consumers should care",
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
    number: 10,
    title: "Government insurance and social programs",
    subtitle: "When the private market stops and public programs begin",
    sections: [
      {
        id: "social-security",
        title: "10.1 Social Security and disability",
        paragraphs: [
          "Social Security (1935) provides retirement, survivor, and disability benefits funded by payroll taxes — social insurance, not private underwriting. Supplemental Security Income (SSI) aids low-income disabled and elderly individuals separately.",
          "These programs differ from private life and disability policies but shape how families plan for income replacement.",
        ],
      },
      {
        id: "medicare-medicaid",
        title: "10.2 Medicare, Medicaid, and private plans",
        paragraphs: [
          "Medicare and Medicaid are covered in depth in Chapter VII (Life and health insurance). Here the key point is that public programs sit alongside private insurers — many Medicare Advantage and Part D plans are administered by insurance companies under federal contract.",
          "Medicaid expansion under the ACA extended eligibility in participating states; benefits still vary by state.",
        ],
        citations: [
          {
            source: "Medicare.gov",
            url: "https://www.medicare.gov",
            note: "Official Medicare information",
          },
          {
            source: "Medicaid.gov",
            url: "https://www.medicaid.gov",
            note: "Federal Medicaid policy",
          },
        ],
      },
      {
        id: "other-programs",
        title: "10.3 NFIP, crop, and residual markets",
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
    number: 11,
    title: "Reading your policy, resources, and disclaimer",
    subtitle: "Declarations, exclusions, and where to learn more",
    sections: [
      {
        id: "parts",
        title: "11.1 Parts of an insurance policy",
        paragraphs: [
          "A policy is a legal contract. The declarations page summarizes who is insured, what is insured, limits, deductibles, premium, and policy period. The insuring agreement states what the insurer promises to pay. Exclusions list what is not covered. Conditions describe duties of insured and insurer (notice, cooperation, cancellation). Endorsements modify the base form.",
          "ISO (Insurance Services Office) and AAIS publish standard forms used by many carriers — but carriers may file modifications. Always read your specific policy, not a generic sample online.",
        ],
      },
      {
        id: "key-clauses",
        title: "11.2 Clauses that often surprise policyholders",
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
      {
        id: "resources-list",
        title: "11.3 Where to learn more",
        paragraphs: [
          "National Association of Insurance Commissioners (NAIC.org) — model laws, consumer guides, complaint filing. Your state Department of Insurance website — licensing verification, bulletins, rate filings. Federal Insurance Office (Treasury) — national reports.",
        ],
        bulletPoints: [
          "NAIC.org — consumer information and insurer financial data",
          "State Department of Insurance — complaints and licensed agent lookup",
          "Healthcare.gov — ACA marketplace and Medicaid information",
          "FloodSmart.gov — NFIP flood insurance",
        ],
        citations: [
          {
            source: "NAIC — Consumer insurance resources",
            url: "https://content.naic.org/consumer",
            note: "Central hub for consumer guides",
          },
          {
            source: "NAIC — State insurance departments",
            url: "https://content.naic.org/state-insurance-departments",
            note: "Find your state regulator",
          },
          {
            source: "U.S. Treasury — Federal Insurance Office",
            url: "https://home.treasury.gov/policy-issues/financial-markets-financial-institutions-and-fiscal-service/federal-insurance-office",
            note: "National insurance market monitoring",
          },
          {
            source: "Healthcare.gov",
            url: "https://www.healthcare.gov",
            note: "ACA enrollment and plan information",
          },
        ],
      },
      {
        id: "disclaimer",
        title: "11.4 Educational disclaimer",
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
