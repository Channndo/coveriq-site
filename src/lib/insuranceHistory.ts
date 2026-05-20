export interface InsuranceHistorySection {
  id: string;
  title: string;
  paragraphs: string[];
}

/** Educational overview — not legal advice. Laws vary by state and change over time. */
export const INSURANCE_HISTORY_SECTIONS: InsuranceHistorySection[] = [
  {
    id: "origins",
    title: "Origins: From ancient trade to modern risk pooling",
    paragraphs: [
      "Insurance is one of humanity's oldest financial tools. The basic idea — spreading the cost of unpredictable losses across many people — appears in ancient merchant codes. The Code of Hammurabi (circa 1750 BCE) included provisions that limited financial punishment on merchants if losses occurred through robbery or natural events beyond their control, an early form of risk transfer thinking.",
      "Marine insurance developed in Mediterranean trading centers. Italian and Genoese merchants in the 14th century used contracts to share voyage risk among investors. By the late 1600s, Lloyd's of London emerged from coffee-house gatherings where shipowners, captains, and underwriters negotiated marine coverage. That marketplace model — specialists evaluating unique risks — still influences commercial insurance today.",
      "Property insurance grew after catastrophic fires. The Great Fire of London (1666) destroyed much of the city and accelerated organized fire insurance. Mutual societies formed so members pooled premiums to rebuild after losses. In the American colonies, Benjamin Franklin co-founded the Philadelphia Contributionship for the Insurance of Houses from Loss by Fire (1752), among the first successful fire insurers in what would become the United States.",
      "Life insurance expanded in the 18th and 19th centuries as actuarial science improved. Mathematicians and statisticians developed mortality tables to price policies more accurately. Industrialization, railroads, and factory work created new liability exposures, leading to accident insurance, workers' compensation systems, and eventually modern health and disability products.",
    ],
  },
  {
    id: "us-growth",
    title: "Growth in the United States (1800s–1900s)",
    paragraphs: [
      "The 19th century saw rapid insurance expansion alongside economic growth. Fire insurers learned hard lessons from conflagrations — including the Chicago Fire (1871) and San Francisco earthquake and fire (1906) — that bankrupted some carriers and strengthened underwriting discipline, reinsurance, and reserve requirements.",
      "Liability insurance developed as lawsuits increased with urbanization and automobiles. Automobile liability became a public policy issue in the early 20th century as car ownership spread. States began enacting compulsory auto liability laws (Massachusetts enacted the first compulsory auto liability law in 1927; other states followed over decades).",
      "Workers' compensation laws transformed workplace injury coverage. Before workers' comp, injured employees often had to sue employers — a slow, uncertain process. State workers' compensation systems (widespread by the 1910s–1920s) generally provide defined benefits regardless of fault, funded by employer-purchased insurance or self-insurance.",
      "Health insurance grew after World War II. Wage controls during the war encouraged employers to offer health benefits as a recruitment tool. Medicare and Medicaid (1965) created large government programs for seniors and low-income populations, reshaping how medical care is financed in the U.S.",
      "Standardization accelerated in the 20th century. Organizations such as the Insurance Services Office (ISO) and the National Association of Insurance Commissioners (NAIC) promoted uniform policy forms, statistical reporting, and regulatory coordination among states.",
    ],
  },
  {
    id: "regulatory-framework",
    title: "How insurance is regulated in the United States",
    paragraphs: [
      "Unlike many industries governed primarily by federal agencies, insurance in the U.S. is regulated chiefly at the state level. Each state (and U.S. territory) has an insurance department led by a commissioner or director, responsible for licensing companies and agents, reviewing rates and policy forms in many lines, monitoring solvency, and enforcing consumer protection laws.",
      "The McCarran-Ferguson Act (1945) is the cornerstone of this structure. It provides that states remain the primary regulators of insurance and that federal antitrust law applies to insurance only where states do not regulate. In practice, this preserves state-by-state licensing, rate approval processes, and market conduct rules — which is why coverage, pricing, and complaint processes can differ when you move across state lines.",
      "Insurers must be licensed in every state where they sell policies. They file financial statements, maintain reserves, and participate in guaranty funds that may pay claims if an insurer becomes insolvent. Agents and brokers must pass exams, carry licenses, and complete continuing education in most states.",
      "Rate regulation varies by line and state. Some states require prior approval of rates before use ('prior approval'); others allow use with later review ('file and use' or 'use and file'). Auto and homeowners rates often reflect regulated factors such as territory, driving record, and construction type — but prohibited factors (where banned) may include race, and some states restrict credit-based insurance scoring.",
      "Market conduct examinations investigate whether insurers treat consumers fairly — claims handling delays, improper cancellations, and misleading sales practices are common targets. Consumers can file complaints with their state insurance department, which may mediate or penalize carriers for violations.",
    ],
  },
  {
    id: "federal-laws",
    title: "Major federal laws affecting insurance",
    paragraphs: [
      "McCarran-Ferguson Act (1945): Affirms state primacy in insurance regulation; limits federal antitrust interference where states regulate. Still shapes the dual state/federal landscape today.",
      "National Flood Insurance Act / NFIP (1968, amended): Created the National Flood Insurance Program because private flood coverage was largely unavailable. Flood remains excluded on most homeowners policies; NFIP and private flood markets operate alongside it.",
      "Employee Retirement Income Security Act — ERISA (1974): Governs many employer-sponsored health and welfare benefit plans. Large employer plans are often regulated under federal ERISA rules rather than state insurance law, creating a split system for health coverage.",
      "Terrorism Risk Insurance Act — TRIA (2002, reauthorized): Federal backstop for certified terrorism losses after insurers excluded terrorism coverage post-9/11. Insurers must offer terrorism coverage on commercial policies in many cases; the federal program shares catastrophic terrorism losses above thresholds.",
      "Gramm-Leach-Bliley Act — GLBA (1999): Privacy and safeguards rules for financial institutions, including insurers. Requires privacy notices and limits on sharing nonpublic personal information with third parties.",
      "Health Insurance Portability and Accountability Act — HIPAA (1996): Privacy and security rules for health information; portability provisions for pre-existing conditions (expanded significantly by the Affordable Care Act). Applies to insurers, providers, and many business associates handling health data.",
      "Affordable Care Act — ACA (2010): Transformed individual and small-group health insurance markets — guaranteed issue, essential health benefits, premium subsidies, Medicaid expansion (in participating states), medical loss ratio requirements, and marketplace enrollment. Does not regulate most property/casualty lines.",
      "Dodd-Frank Wall Street Reform Act (2010): Created the Federal Insurance Office (FIO) within the Treasury to monitor insurance nationally and represent the U.S. internationally; does not replace state insurance departments for day-to-day regulation.",
      "COBRA (1985): Allows certain employees to continue group health coverage temporarily after job loss, at their own cost — intersecting with employer plans and state continuation laws.",
    ],
  },
  {
    id: "state-consumer-laws",
    title: "State laws and consumer protections (overview)",
    paragraphs: [
      "Unfair Claims Settlement Practices Acts: Most states adopted laws or regulations (often based on NAIC model acts) prohibiting insurers from unreasonably delaying, denying, or lowballing claims. Examples of prohibited conduct include failing to acknowledge claims promptly, not conducting reasonable investigations, and misrepresenting policy provisions. Remedies may include penalties, interest, and in some states private causes of action.",
      "Unfair Trade Practices Acts: Broad rules against deceptive sales, twisting (inducing replacement of policies through misrepresentation), churning, and false advertising. State attorneys general and insurance departments enforce these rules.",
      "Prompt payment and interest statutes: Many states require insurers to pay undisputed covered claims within specified timeframes and award interest on late payments.",
      "Cancellation and nonrenewal protections: Personal auto and homeowners policies often have restricted cancellation reasons during the policy term and notice requirements for nonrenewal. Rules differ materially by state and line.",
      "Compulsory auto liability and financial responsibility laws: Every state has a system requiring minimum liability coverage or proof of financial responsibility. Penalties for driving uninsured may include fines, license suspension, and SR-22 filings.",
      "Homeowners bill of rights / claim disclosure laws: Several states require insurers to explain claim rights, timelines, and coverage decisions in plain language after disasters or upon request.",
      "Surplus lines and admitted carriers: 'Admitted' insurers are licensed in-state and participate in guaranty funds. 'Surplus lines' (non-admitted) insurers cover hard-to-place risks through licensed surplus lines brokers — less state rate control, no guaranty fund protection in most cases.",
      "Workers' compensation: Almost entirely state-governed — benefits, rates, and disputes are handled under state commissions or boards, not a single federal workers' comp policy.",
    ],
  },
  {
    id: "modern-trends",
    title: "Modern era: technology, climate, and evolving risk",
    paragraphs: [
      "Catastrophe modeling and climate risk now heavily influence homeowners and commercial property pricing in coastal and wildfire-prone regions. Reinsurance costs, building codes, and state catastrophe funds (e.g., wind pools, FAIR plans) affect availability and affordability.",
      "Usage-based insurance (telematics) and data analytics changed auto rating — driving behavior, miles driven, and smartphone apps can influence premiums where permitted by state law and disclosed to consumers.",
      "Cyber insurance emerged as a distinct commercial line as data breaches and ransomware increased. Policies vary widely in scope; war and infrastructure exclusions are actively debated.",
      "Insurtech and embedded insurance distribute coverage through apps and checkout flows, raising new questions about licensing, transparency, and who is responsible for explaining coverage to consumers.",
      "Healthcare policy remains politically dynamic — ACA marketplace subsidies, Medicaid eligibility, and network adequacy rules continue to evolve through legislation and agency guidance.",
    ],
  },
  {
    id: "disclaimer",
    title: "Important note on this overview",
    paragraphs: [
      "This history and regulatory summary is for general education only. It is not legal advice, does not list every statute or regulation, and cannot capture all state-specific rules. Insurance law changes frequently through legislation, court decisions, and administrative rules.",
      "For questions about your specific policy, claim, or legal rights, contact a licensed insurance professional in your state and consult your state insurance department's consumer services division. Official resources include NAIC.org (National Association of Insurance Commissioners) and your state's Department of Insurance website.",
    ],
  },
];
