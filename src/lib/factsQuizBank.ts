import type { QuizQuestion } from "./factsQuizTypes";

function q(
  id: string,
  question: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string
): QuizQuestion {
  return { id, question, options, correctIndex, explanation };
}

export const FACTS_QUIZ_BANK: QuizQuestion[] = [
  q(
    "q01",
    "What fundamental problem does insurance help society solve?",
    [
      "Eliminating all financial uncertainty for individuals",
      "Converting rare, catastrophic losses into manageable shared costs",
      "Guaranteeing profits for insurers in every policy year",
      "Replacing government social programs entirely",
    ],
    1,
    "Insurance pools premiums from many policyholders so the few who suffer large losses can be compensated without each person saving for worst-case scenarios alone."
  ),
  q(
    "q02",
    "The principle of indemnity means that insurance should:",
    [
      "Pay more than the actual financial loss to encourage filing claims",
      "Restore the insured to approximately the same financial position after a covered loss",
      "Guarantee replacement of property with newer, upgraded materials",
      "Cover intentional acts if the insured regrets them",
    ],
    1,
    "Indemnity prevents profiting from insurance; the goal is to make the insured whole, not better off than before the loss."
  ),
  q(
    "q03",
    "Insurable interest requires that the applicant:",
    [
      "Be related to the beneficiary by blood",
      "Suffer a financial loss if the insured event occurs",
      "Own the insurance company issuing the policy",
      "Have filed at least one prior claim",
    ],
    1,
    "You must have a legitimate economic stake in what is insured; without insurable interest, insurance contracts are void or unenforceable."
  ),
  q(
    "q04",
    "Utmost good faith (uberrimae fidei) in insurance primarily requires:",
    [
      "The insurer to waive all exclusions after a loss",
      "Both parties to disclose material facts honestly on applications and at claim time",
      "The insured to accept the lowest premium offered in the market",
      "Agents to sell only one carrier's products",
    ],
    1,
    "Insurance relies on honest disclosure because the insurer prices risk before fully knowing every detail about the applicant or property."
  ),
  q(
    "q05",
    "Subrogation allows an insurer, after paying a covered claim, to:",
    [
      "Cancel the policy without notice",
      "Pursue recovery from a responsible third party",
      "Increase premiums retroactively for five years",
      "Deny all future claims automatically",
    ],
    1,
    "After indemnifying the insured, the insurer may step into the insured's rights and seek reimbursement from parties who caused the loss."
  ),
  q(
    "q06",
    "When two or more policies cover the same loss, the principle of contribution:",
    [
      "Requires the insured to collect double payment in full from each insurer",
      "Shares the loss among insurers so the insured is not overpaid",
      "Eliminates the need for deductibles",
      "Applies only to life insurance policies",
    ],
    1,
    "Contribution prevents the insured from recovering more than the actual loss when multiple valid policies apply to the same event."
  ),
  q(
    "q07",
    "Actuarial science in insurance is primarily used to:",
    [
      "Design marketing logos for insurers",
      "Estimate future claims and set adequate premiums using loss and mortality data",
      "Replace state insurance department examinations",
      "Guarantee that no insurer will ever become insolvent",
    ],
    1,
    "Actuaries analyze historical loss, morbidity, and mortality data to project how much premium must be collected to pay claims and expenses."
  ),
  q(
    "q08",
    "Underwriting in insurance refers to:",
    [
      "Paying claims after a loss occurs",
      "Selecting and pricing risks the insurer is willing to accept",
      "Selling reinsurance to other countries only",
      "Drafting state insurance statutes",
    ],
    1,
    "Underwriters evaluate applications, apply rating factors, and decide whether to offer coverage and at what premium."
  ),
  q(
    "q09",
    "Early marine insurance practices in Mediterranean trade are historically linked to:",
    [
      "Modern auto telematics devices",
      "Italian merchants sharing voyage risk in the 1300s",
      "The Affordable Care Act of 2010",
      "Federal flood insurance mandates in the 1960s",
    ],
    1,
    "Marine insurance among merchants laid groundwork for formal risk-sharing that later evolved into Lloyd's and modern commercial markets."
  ),
  q(
    "q10",
    "Lloyd's of London is best known historically as:",
    [
      "A U.S. federal health agency",
      "A marketplace where underwriters evaluate complex commercial risks",
      "The first auto liability insurer in America",
      "A state guaranty association for failed insurers",
    ],
    1,
    "Lloyd's emerged in the late 1600s as a hub for marine underwriting and remains a major market for specialized commercial coverage."
  ),
  q(
    "q11",
    "The Great Fire of London (1666) contributed to insurance history by:",
    [
      "Ending all fire insurance worldwide",
      "Spurring organized fire insurance societies to rebuild after catastrophic loss",
      "Creating Medicare and Medicaid",
      "Establishing the McCarran-Ferguson Act",
    ],
    1,
    "The fire demonstrated the need for pooled funds to rebuild property, accelerating the growth of fire insurance models."
  ),
  q(
    "q12",
    "Benjamin Franklin is associated with early U.S. insurance because he helped establish:",
    [
      "The National Flood Insurance Program",
      "The Philadelphia Contributionship for fire insurance on houses (1752)",
      "Social Security retirement benefits",
      "Lloyd's of London",
    ],
    1,
    "The Philadelphia Contributionship was among the first successful U.S. property insurers, reflecting Franklin's interest in mutual protection."
  ),
  q(
    "q13",
    "The 1906 San Francisco earthquake is significant in insurance history because it:",
    [
      "Had no effect on insurer finances",
      "Bankrupted some carriers and improved industry discipline on reserves and reinsurance",
      "Eliminated the need for property insurance in California",
      "Created HIPAA privacy rules",
    ],
    1,
    "The catastrophe exposed weak reserving practices and reinforced the importance of reinsurance and solvency management."
  ),
  q(
    "q14",
    "Workers' compensation insurance in the U.S. generally:",
    [
      "Requires employees to sue employers in court for every injury",
      "Provides medical and wage benefits for work-related injuries without requiring proof of employer negligence",
      "Covers only injuries that occur off the job",
      "Is optional for all employers in every jurisdiction",
    ],
    1,
    "Workers' comp replaced many injury lawsuits with no-fault benefit systems funded by employers, though rules are set at the state level."
  ),
  q(
    "q15",
    "Medicare and Medicaid were enacted in 1965 primarily to:",
    [
      "Replace all private auto insurance",
      "Expand federal health coverage for seniors and low-income populations",
      "Regulate surplus lines brokers nationally",
      "Mandate flood insurance on all homeowners policies",
    ],
    1,
    "Medicare serves seniors and certain disabled individuals; Medicaid is a joint federal-state program for low-income and medically needy groups."
  ),
  q(
    "q16",
    "In the United States, insurance is regulated primarily by:",
    [
      "One federal agency that replaces all state authority",
      "Individual states, each with its own insurance department and rules",
      "The United Nations exclusively",
      "Private reinsurers without government oversight",
    ],
    1,
    "Unlike banking's federal framework, insurance licensing, market conduct, and solvency oversight are chiefly state responsibilities."
  ),
  q(
    "q17",
    "The National Association of Insurance Commissioners (NAIC) primarily:",
    [
      "Issues federal insurance licenses that override states",
      "Coordinates model laws and financial examinations among states",
      "Sets uniform auto liability limits for every driver nationally",
      "Operates Medicare Part D directly",
    ],
    1,
    "The NAIC helps states harmonize standards and share regulatory tools but does not replace state insurance departments."
  ),
  q(
    "q18",
    "The McCarran-Ferguson Act (1945) affirmed that:",
    [
      "All insurance must be sold only by the federal government",
      "State regulation of insurance is primary unless a federal law specifically relates to insurance",
      "Federal antitrust law always overrides state insurance codes without exception",
      "Insurers need not be licensed in any jurisdiction",
    ],
    1,
    "Congress passed McCarran-Ferguson after court decisions suggested federal oversight might apply, confirming state primacy in insurance regulation."
  ),
  q(
    "q19",
    "Under McCarran-Ferguson, federal antitrust laws apply to insurance:",
    [
      "Without any regard to state regulation",
      "Only to the extent state law does not regulate the conduct in question",
      "Never under any circumstances",
      "Only to life insurance, not property insurance",
    ],
    1,
    "The act limits federal antitrust reach where states actively regulate insurance practices, preserving the state-based system."
  ),
  q(
    "q20",
    "An admitted (licensed) insurer in a state is one that:",
    [
      "Sells coverage without filing financial statements",
      "Is authorized to do business there and participates in guaranty fund protections",
      "Cannot be examined by regulators",
      "Is always a surplus lines non-admitted carrier",
    ],
    1,
    "Admitted insurers meet state licensing and financial requirements and contribute to guaranty associations that may pay claims if the insurer fails."
  ),
  q(
    "q21",
    "Surplus lines (non-admitted) insurers typically serve:",
    [
      "Only government employees' health plans",
      "Hard-to-place risks when standard admitted markets will not write coverage",
      "Drivers with perfect records at the lowest rates",
      "Flood damage under every homeowners policy automatically",
    ],
    1,
    "Surplus lines carriers fill gaps for unusual or high-risk exposures through specially licensed brokers when admitted markets decline the risk."
  ),
  q(
    "q22",
    "Risk-Based Capital (RBC) requirements help regulators:",
    [
      "Set advertising slogans for insurers",
      "Detect potential insolvency early based on an insurer's financial ratios",
      "Eliminate the need for reinsurance",
      "Guarantee that premiums never increase",
    ],
    1,
    "RBC formulas compare capital to risk exposure; low ratios trigger regulatory action before an insurer becomes unable to pay claims."
  ),
  q(
    "q23",
    "The Social Security Act (1935) established federal:",
    [
      "Private homeowners wind coverage",
      "Social insurance programs including retirement and disability benefits funded by payroll taxes",
      "Mandatory commercial general liability for all businesses",
      "Surplus lines broker licensing",
    ],
    1,
    "Social Security provides retirement, survivor, and disability benefits as social insurance, distinct from private underwriting."
  ),
  q(
    "q24",
    "The National Flood Insurance Program (NFIP), created in 1968, exists because:",
    [
      "Flood is covered automatically on standard homeowners policies",
      "Private insurers largely exclude flood, leaving a federal program to offer flood policies in participating communities",
      "All auto policies must include flood coverage",
      "Medicare Part B pays for flood damage to homes",
    ],
    1,
    "Most homeowners policies exclude flood; NFIP provides flood insurance where communities adopt floodplain management standards."
  ),
  q(
    "q25",
    "ERISA (1974) primarily governs:",
    [
      "Every individual auto policy sold at retail",
      "Many employer-sponsored health and welfare benefit plans at the federal level",
      "Crop insurance subsidies exclusively",
      "State property rate filings for homeowners",
    ],
    1,
    "ERISA sets federal standards for employer benefit plans, often preempting state insurance laws for self-funded employer health plans."
  ),
  q(
    "q26",
    "COBRA (1985) allows eligible employees to:",
    [
      "Cancel all prior health claims retroactively",
      "Temporarily continue group health coverage after certain qualifying events such as job loss",
      "Avoid paying any premium for life insurance",
      "Obtain federal flood insurance at no cost",
    ],
    1,
    "COBRA provides continuation of employer group health benefits for a limited time when coverage would otherwise end, usually at the employee's cost."
  ),
  q(
    "q27",
    "HIPAA (1996) is best known in insurance for:",
    [
      "Setting auto liability minimum limits nationally",
      "Health data privacy, portability, and security rules for covered entities",
      "Requiring all homes to carry earthquake insurance",
      "Eliminating state insurance departments",
    ],
    1,
    "HIPAA protects protected health information and limits use of pre-existing condition exclusions in certain contexts, alongside security requirements."
  ),
  q(
    "q28",
    "The Gramm-Leach-Bliley Act (GLBA) requires financial institutions, including many insurers, to:",
    [
      "Sell only government-issued policies",
      "Provide privacy notices and safeguards for customer nonpublic personal information",
      "Pay all claims within 24 hours without investigation",
      "Eliminate deductibles on commercial property policies",
    ],
    1,
    "GLBA mandates privacy notices and reasonable security measures when insurers share or use customer financial information."
  ),
  q(
    "q29",
    "The Terrorism Risk Insurance Act (TRIA) creates:",
    [
      "A federal backstop for certified terrorism losses on commercial policies, with mandatory offer rules in many cases",
      "Unlimited coverage for all war worldwide on homeowners policies",
      "A replacement for Social Security retirement",
      "State-by-state auto no-fault systems",
    ],
    0,
    "TRIA helps ensure terrorism coverage remains available in commercial markets by sharing catastrophic terrorism losses between insurers and the federal government."
  ),
  q(
    "q30",
    "The Affordable Care Act (2010) significantly reformed:",
    [
      "Commercial general liability for contractors only",
      "Individual and small-group health insurance markets, including essential benefits and premium subsidies",
      "All homeowners windstorm deductibles",
      "Marine cargo insurance at Lloyd's",
    ],
    1,
    "The ACA expanded access, regulated individual/small-group health plans, and created marketplace subsidies and consumer protections."
  ),
  q(
    "q31",
    "The Dodd-Frank Act's Federal Insurance Office (FIO) was created to:",
    [
      "Replace every state insurance commissioner",
      "Monitor the insurance industry nationally without displacing state regulation",
      "License all insurance agents federally",
      "Operate the NFIP exclusively",
    ],
    1,
    "FIO advises the federal government on insurance matters and collects data but does not replace state Departments of Insurance."
  ),
  q(
    "q32",
    "Unfair Claims Settlement Practices Acts generally require insurers to:",
    [
      "Deny all claims within 24 hours",
      "Acknowledge claims, investigate promptly, and not misrepresent policy language",
      "Pay unlimited amounts regardless of policy limits",
      "Avoid providing written denial explanations",
    ],
    1,
    "These laws, often based on NAIC models, prohibit unreasonable delay, misrepresentation, and denial without a valid policy basis."
  ),
  q(
    "q33",
    "Twisting in insurance sales refers to:",
    [
      "Bundling home and auto for a multi-policy discount",
      "Misleading a policyholder to replace coverage for the producer's benefit without consumer advantage",
      "Adjusting a claim after hurricane damage",
      "Reinsuring a treaty portfolio internationally",
    ],
    1,
    "Twisting is an unfair trade practice involving deceptive replacement of policies, often to generate new commission."
  ),
  q(
    "q34",
    "Churning in insurance is:",
    [
      "Cooling a damaged vehicle engine after a loss",
      "Unnecessary replacement of policies primarily to earn commission",
      "The legal process of subrogation against a third party",
      "Federal funding of Medicare Part A",
    ],
    1,
    "Churning harms consumers when policies are replaced without meaningful benefit, violating unfair trade practice standards."
  ),
  q(
    "q35",
    "Credit-based insurance scoring in auto and homeowners insurance:",
    [
      "Is prohibited in every jurisdiction without exception",
      "May be used in many states with required disclosures and adverse action notices when it affects rate or eligibility",
      "Replaces the need for underwriting entirely",
      "Applies only to life insurance death benefits",
    ],
    1,
    "Where permitted, insurers must often notify consumers when credit information adversely affects their application or renewal."
  ),
  q(
    "q36",
    "Auto liability insurance primarily covers:",
    [
      "Damage to your own vehicle from theft",
      "Bodily injury and property damage you cause to others",
      "Routine maintenance and oil changes",
      "Depreciation of your car over time",
    ],
    1,
    "Liability pays for harm you legally owe others; physical damage to your own car requires collision or comprehensive coverage."
  ),
  q(
    "q37",
    "Collision coverage on an auto policy pays for:",
    [
      "Medical bills of pedestrians you injure",
      "Damage to your insured vehicle from impact with another vehicle or object",
      "Flood damage to your garage",
      "Lost wages if you cannot work",
    ],
    1,
    "Collision covers your car's damage from crashes, subject to deductible and policy limits, regardless of fault in many policies."
  ),
  q(
    "q38",
    "Comprehensive (other than collision) auto coverage typically includes:",
    [
      "Liability for injuries you cause in an at-fault accident",
      "Theft, vandalism, fire, and falling objects damage to your vehicle",
      "Uninsured motorist bodily injury only",
      "Employer workers' compensation claims",
    ],
    1,
    "Comprehensive covers many non-collision physical damage perils to the insured auto, such as theft and hail, minus the deductible."
  ),
  q(
    "q39",
    "Uninsured/underinsured motorist coverage protects:",
    [
      "The at-fault driver who has no insurance",
      "You when the other driver lacks adequate liability insurance to pay your injuries or damages",
      "The insurer from paying any claims",
      "Only commercial trucks on interstate highways",
    ],
    1,
    "UM/UIM coverage steps in when a negligent driver has no insurance or limits too low to cover your losses."
  ),
  q(
    "q40",
    "A homeowners policy typically combines:",
    [
      "Only life insurance and annuities",
      "Property coverage for the dwelling and personal property plus liability protection",
      "Federal flood coverage without endorsement",
      "Workers' compensation for all employees nationwide",
    ],
    1,
    "Homeowners policies insure the structure and belongings against covered perils and include personal liability for injuries or property damage you cause."
  ),
  q(
    "q41",
    "Renters insurance primarily covers:",
    [
      "The building structure owned by the landlord",
      "The tenant's personal belongings and often personal liability",
      "All flood damage without a separate policy",
      "The landlord's mortgage interest",
    ],
    1,
    "Renters policies protect the tenant's possessions and liability; the landlord's policy usually covers the building itself."
  ),
  q(
    "q42",
    "A deductible in property insurance is:",
    [
      "The maximum the insurer will ever pay on a policy",
      "The amount the insured pays out of pocket before the insurer pays on a covered claim",
      "A bonus payment to the agent at renewal",
      "The same as the policy's aggregate limit",
    ],
    1,
    "Deductibles reduce small claims and align the insured's incentives with the insurer; higher deductibles often lower premium."
  ),
  q(
    "q43",
    "An umbrella liability policy generally:",
    [
      "Covers only damage inside the insured's car engine",
      "Provides excess liability limits above underlying auto and homeowners policies",
      "Replaces Medicare Part D prescriptions",
      "Eliminates the need for any underlying insurance",
    ],
    1,
    "Umbrella policies sit above primary liability limits and may broaden coverage for certain claims after underlying limits are exhausted."
  ),
  q(
    "q44",
    "After a property loss, policyholders are typically required to:",
    [
      "Destroy all evidence before calling anyone",
      "Notify the insurer promptly and take reasonable steps to prevent further damage",
      "Wait one year before reporting",
      "Repair everything before the insurer is notified, without documentation",
    ],
    1,
    "Policies impose duties of prompt notice, cooperation, and mitigation; failure can jeopardize coverage if prejudice results."
  ),
  q(
    "q45",
    "A claims adjuster's primary role is to:",
    [
      "Sell new policies at the accident scene",
      "Investigate the loss, interpret policy language, and determine coverage and payment",
      "Set federal Medicare reimbursement rates",
      "License producers in multiple states",
    ],
    1,
    "Adjusters inspect damage, gather facts, apply limits and deductibles, and negotiate settlement within policy terms."
  ),
  q(
    "q46",
    "If an insurer denies a claim, it should generally:",
    [
      "Provide no explanation to speed the process",
      "Give a written explanation citing relevant policy provisions",
      "Automatically pay double the requested amount",
      "Transfer the case to the NFIP for all denials",
    ],
    1,
    "Written denial letters help consumers understand the basis for denial and pursue internal appeal or department complaints."
  ),
  q(
    "q47",
    "Hard insurance fraud includes:",
    [
      "Honestly reporting a minor fender-bender",
      "Staged accidents or arson committed to collect insurance proceeds",
      "Paying premiums on time",
      "Completing continuing education for producers",
    ],
    1,
    "Hard fraud involves deliberate schemes to fabricate losses; it is criminal and raises premiums for all policyholders."
  ),
  q(
    "q48",
    "Soft insurance fraud often involves:",
    [
      "Exaggerating claim damages or misrepresenting facts on an application",
      "Voluntarily lowering coverage limits",
      "Reporting a loss within the policy period",
      "Using licensed agents for all transactions",
    ],
    0,
    "Soft fraud may seem minor but still misrepresents risk or loss and can void coverage or lead to prosecution."
  ),
  q(
    "q49",
    "Material misrepresentation on an insurance application can:",
    [
      "Never affect the policy under any circumstances",
      "Void coverage or rescind the policy if the misstatement was material to the risk accepted",
      "Automatically double the policy limits",
      "Require the insurer to pay all claims regardless of truth",
    ],
    1,
    "If the insurer would not have issued the policy or would have charged more had it known the truth, remedies may include rescission or denial."
  ),
  q(
    "q50",
    "Special Investigation Units (SIU) at insurers focus on:",
    [
      "Marketing holiday promotions",
      "Identifying and investigating suspicious claims",
      "Setting Social Security payroll tax rates",
      "Filing state rate decreases automatically",
    ],
    1,
    "SIUs use analytics, interviews, and databases to detect fraud and protect honest policyholders from subsidizing criminals."
  ),
  q(
    "q51",
    "Reinsurance is best defined as:",
    [
      "Insurance sold directly to consumers at retail",
      "Insurance purchased by an insurance company to transfer part of its risk",
      "A federal health program for seniors",
      "The deductible on a homeowners policy",
    ],
    1,
    "Primary insurers cede risk to reinsurers so catastrophic losses do not threaten solvency of a single carrier."
  ),
  q(
    "q52",
    "Treaty reinsurance typically:",
    [
      "Covers one specific risk negotiated individually each time",
      "Automatically covers a defined block of policies under ongoing agreement",
      "Applies only to life insurance beneficiary designations",
      "Eliminates the need for primary insurer reserves",
    ],
    1,
    "Treaty arrangements cover portfolios of business automatically, unlike facultative reinsurance on individual large risks."
  ),
  q(
    "q53",
    "Facultative reinsurance is commonly used for:",
    [
      "Every standard personal auto policy automatically",
      "A single large or unusual risk negotiated case by case",
      "Payroll tax withholding for Social Security",
      "Medicaid eligibility determinations only",
    ],
    1,
    "Facultative reinsurance is optional per risk—often for stadiums, refineries, or other exposures too large for treaty capacity alone."
  ),
  q(
    "q54",
    "When reinsurance costs rise after global catastrophes, consumers may see:",
    [
      "Guaranteed lower premiums in all areas",
      "Higher rates or reduced availability of coverage in high-risk regions",
      "Elimination of all deductibles nationally",
      "Automatic NFIP inclusion in auto policies",
    ],
    1,
    "Reinsurance pricing flows through to primary insurers, which may raise premiums, tighten underwriting, or exit difficult markets."
  ),
  q(
    "q55",
    "Term life insurance provides:",
    [
      "Death benefit protection for a specified period without permanent cash value buildup",
      "Guaranteed medical expense coverage for hospital stays",
      "Flood insurance for coastal property",
      "Workers' compensation wage replacement",
    ],
    0,
    "Term policies offer pure death protection for a set number of years; they are often the most affordable life insurance for income replacement."
  ),
  q(
    "q56",
    "Whole life insurance differs from term life because it:",
    [
      "Expires without value at the end of one year always",
      "Combines permanent death benefit protection with a cash value component",
      "Covers only commercial general liability",
      "Is issued only by surplus lines brokers",
    ],
    1,
    "Whole life lasts for the insured's lifetime (if premiums are paid) and accumulates cash value that may be borrowed against or surrendered."
  ),
  q(
    "q57",
    "Medicare Part A primarily covers:",
    [
      "Prescription drugs only",
      "Inpatient hospital care",
      "Private auto physical damage",
      "Commercial property windstorm",
    ],
    1,
    "Part A is hospital insurance for eligible beneficiaries; other parts address medical services, managed care, and prescriptions."
  ),
  q(
    "q58",
    "Medicare Part B generally covers:",
    [
      "Outpatient medical services and physician care",
      "Only nursing home custodial care with no limits",
      "Flood damage to residences",
      "Employer workers' compensation medical bills",
    ],
    0,
    "Part B is medical insurance for doctor visits, outpatient care, and many preventive services, usually with premiums and cost-sharing."
  ),
  q(
    "q59",
    "Medicare Part C (Medicare Advantage) plans are:",
    [
      "Issued only by state workers' compensation funds",
      "Private plans that contract with Medicare to provide Part A and B benefits, often with additional benefits",
      "Mandatory flood policies for seniors",
      "Surplus lines auto policies",
    ],
    1,
    "Medicare Advantage plans are offered by approved private insurers and must cover at least what Original Medicare covers, often with extra features."
  ),
  q(
    "q60",
    "Medicare Part D provides:",
    [
      "Prescription drug coverage",
      "Unlimited long-term custodial nursing home care at no cost",
      "Federal crop insurance subsidies",
      "Terrorism backstop for commercial buildings",
    ],
    0,
    "Part D helps beneficiaries pay for outpatient prescription drugs through standalone or Medicare Advantage plans with drug coverage."
  ),
  q(
    "q61",
    "Medicaid is best described as:",
    [
      "A private life insurance policy for high-income earners",
      "A joint federal-state program providing health coverage for low-income and medically needy populations",
      "The reinsurance market at Lloyd's of London",
      "Mandatory auto collision coverage",
    ],
    1,
    "Medicaid eligibility and benefits vary by state within federal guidelines; it complements Medicare for different populations."
  ),
  q(
    "q62",
    "Commercial general liability (CGL) insurance protects businesses against:",
    [
      "Only employee payroll taxes",
      "Third-party bodily injury and property damage claims arising from business operations",
      "Internal employee dishonesty only",
      "All flood losses without exclusion",
    ],
    1,
    "CGL covers legal liability to others for accidents on premises or from products and operations, subject to policy exclusions."
  ),
  q(
    "q63",
    "A Business Owners Policy (BOP) typically:",
    [
      "Packages property and liability coverages for eligible small businesses",
      "Replaces all federal Medicare benefits",
      "Covers only ocean marine cargo on tankers",
      "Eliminates the need for workers' compensation everywhere",
    ],
    0,
    "BOPs simplify buying by combining common commercial coverages for qualifying small businesses at a bundled premium."
  ),
  q(
    "q64",
    "Business interruption insurance helps cover:",
    [
      "Lost income and extra expenses when a covered peril shuts down operations",
      "Personal auto theft of employees",
      "Medicare Part D copayments",
      "Criminal fines imposed on executives",
    ],
    0,
    "After a covered property loss, business interruption can pay ongoing expenses and profit loss during restoration, subject to policy terms."
  ),
  q(
    "q65",
    "Professional liability (errors and omissions) insurance protects:",
    [
      "Against claims alleging negligent acts, errors, or omissions in professional services",
      "Only physical damage to the insured's office building",
      "All intentional criminal acts by the insured",
      "Federal payroll tax penalties exclusively",
    ],
    0,
    "E&O coverage addresses financial harm clients suffer from professional mistakes, common for consultants, agents, and healthcare providers."
  ),
  q(
    "q66",
    "Cyber insurance for businesses often covers:",
    [
      "Data breaches, ransomware, and related response costs subject to policy terms",
      "All flood damage to servers without limit",
      "Social Security retirement shortfalls",
      "Unlimited punitive damages in every state without exclusion",
    ],
    0,
    "Cyber policies help with incident response, notification, and liability from data events, though war and infrastructure exclusions may apply."
  ),
  q(
    "q67",
    "The declarations page of an insurance policy summarizes:",
    [
      "Only the insurer's stock price history",
      "Named insureds, covered property, limits, deductibles, premium, and policy period",
      "Every court case ever decided about insurance",
      "Federal Medicare reimbursement schedules",
    ],
    1,
    "Declarations are the quick reference sheet for who and what is insured and for how much; always start reading a policy here."
  ),
  q(
    "q68",
    "The insuring agreement in a policy:",
    [
      "Lists every exclusion without exception",
      "States what the insurer promises to cover or pay",
      "Replaces the need for any conditions",
      "Is optional and never binding",
    ],
    1,
    "The insuring agreement defines the scope of coverage; exclusions and conditions then narrow or qualify those promises."
  ),
  q(
    "q69",
    "Policy exclusions typically:",
    [
      "Expand coverage to every possible peril worldwide",
      "Specify losses or circumstances the policy does not cover",
      "Eliminate the need for premiums",
      "Guarantee payment for intentional acts",
    ],
    1,
    "Common exclusions include flood, earthquake, intentional acts, and wear and tear—read them carefully before a loss occurs."
  ),
  q(
    "q70",
    "An endorsement on an insurance policy:",
    [
      "Cancels all prior insurance history permanently",
      "Modifies, adds, or removes coverage from the base policy form",
      "Is illegal in all personal lines",
      "Replaces the declarations page with a blank page",
    ],
    1,
    "Endorsements change standard forms—for example, scheduling jewelry, adding water backup, or increasing liability limits."
  ),
  q(
    "q71",
    "Actual cash value (ACV) settlement on property usually means:",
    [
      "Payment based on replacement cost with no depreciation",
      "Payment based on replacement cost minus depreciation",
      "Payment of twice the policy limit automatically",
      "No payment until the insured rebuilds entirely",
    ],
    1,
    "ACV accounts for age and wear; replacement cost coverage (when purchased) pays more to replace property without deducting depreciation, subject to terms."
  ),
  q(
    "q72",
    "A coinsurance clause on commercial property policies:",
    [
      "Rewards underinsurance with full claim payment",
      "Penalizes the insured if property is insured for less than a required percentage of value at loss time",
      "Applies only to life insurance beneficiary designations",
      "Eliminates all deductibles",
    ],
    1,
    "Coinsurance encourages adequate limits; if you insure below the required percentage, the insurer may pay only a proportional share of the loss."
  ),
  q(
    "q73",
    "An ordinance or law coverage endorsement helps pay for:",
    [
      "Increased construction costs to meet current building codes when rebuilding after a covered loss",
      "Routine maintenance required by manufacturers",
      "Traffic tickets after an auto accident",
      "Medicare Part B premiums",
    ],
    0,
    "Standard property limits may not cover code-upgrade costs; this endorsement addresses extra expenses to comply with newer regulations."
  ),
  q(
    "q74",
    "The 'other insurance' clause in a policy:",
    [
      "Prohibits ever having more than one policy",
      "Coordinates payment when multiple policies cover the same loss",
      "Requires the insured to buy flood insurance from NFIP only",
      "Transfers all risk to reinsurers automatically",
    ],
    1,
    "Other insurance provisions determine whether coverage is primary, excess, or shared pro rata when overlapping policies exist."
  ),
  q(
    "q75",
    "Standard homeowners policies in the U.S. generally:",
    [
      "Include unlimited flood and earthquake coverage automatically",
      "Exclude flood and often exclude earthquake unless added by endorsement or separate policy",
      "Cover every business activity without a commercial policy",
      "Replace Medicaid for all medical expenses",
    ],
    1,
    "Flood requires NFIP or private flood policy in most cases; earthquake and other perils need endorsements or separate coverage."
  ),
  q(
    "q76",
    "Universal life insurance is characterized by:",
    [
      "Flexible premiums and adjustable death benefits within contract limits",
      "Coverage that expires with no death benefit after exactly one year always",
      "Mandatory enrollment at age 65 through Social Security",
      "Unlimited flood coverage on mortgaged homes",
    ],
    0,
    "Universal life blends permanent protection with flexible funding; credited interest and costs affect cash value over time."
  ),
  q(
    "q77",
    "A primary purpose of naming a life insurance beneficiary is to:",
    [
      "Eliminate the need for any premium payments",
      "Direct who receives the death benefit when the insured dies",
      "Guarantee approval for all future health claims",
      "Replace Medicare Part D drug coverage",
    ],
    1,
    "Beneficiary designations control policy proceeds; keep them current after major life events."
  ),
  q(
    "q78",
    "Replacing an existing life policy with a new one may:",
    [
      "Restart contestability periods and trigger surrender charges on the old contract",
      "Automatically double the death benefit with no underwriting",
      "Convert homeowners flood coverage to term life",
      "Eliminate state insurance department oversight",
    ],
    0,
    "Replacement regulations require disclosure because new policies can cost more and reduce benefits in early years."
  ),
  q(
    "q79",
    "An immediate annuity generally:",
    [
      "Converts a lump-sum premium into a stream of income payments starting soon after purchase",
      "Covers auto collision damage for fleet vehicles",
      "Provides unlimited long-term nursing home care under Medicare",
      "Replaces workers' compensation in every state",
    ],
    0,
    "Immediate annuities are often used for retirement income; payout options and insurer strength matter."
  ),
  q(
    "q80",
    "On most health plans, a deductible is:",
    [
      "The amount you pay out of pocket before the plan begins sharing covered costs",
      "A flat fee paid at each doctor visit regardless of other costs",
      "The insurer's profit margin on reinsurance treaties",
      "A federal tax on life insurance death benefits",
    ],
    0,
    "Deductibles are annual thresholds; copays and coinsurance apply after the deductible is met on many plans."
  ),
  q(
    "q81",
    "An HMO health plan typically:",
    [
      "Requires use of a primary care physician and referrals for many specialist visits",
      "Pays the same for all out-of-network care as in-network care",
      "Covers only prescription drugs with no medical services",
      "Is identical to surplus lines property insurance",
    ],
    0,
    "HMOs emphasize coordinated in-network care; out-of-network services are often not covered except emergencies."
  ),
  q(
    "q82",
    "ACA marketplace metal tiers (Bronze through Platinum) mainly indicate:",
    [
      "How premium and out-of-pocket costs are split between you and the plan",
      "The insurer's stock ticker symbol",
      "Whether flood is included on homeowners policies",
      "Social Security retirement age",
    ],
    0,
    "Bronze plans have lower premiums and higher member cost-sharing; Platinum is the opposite pattern."
  ),
  q(
    "q83",
    "Medigap (Medicare supplement) policies are designed to:",
    [
      "Help pay cost-sharing for people enrolled in Original Medicare",
      "Replace Part A hospital insurance entirely",
      "Sell only to employers under ERISA without state oversight",
      "Provide auto liability coverage in no-fault states",
    ],
    0,
    "Medigap fills gaps like deductibles and coinsurance for Original Medicare; you cannot pair Medigap with Medicare Advantage."
  ),
  q(
    "q84",
    "Medicare Advantage (Part C) plans are offered by:",
    [
      "Private insurers that contract with Medicare to deliver Part A and B benefits",
      "County property tax assessors only",
      "Surplus lines brokers for earthquake risks",
      "The National Flood Insurance Program exclusively",
    ],
    0,
    "Medicare Advantage bundles Medicare benefits through approved private plans, often with Part D and extra benefits."
  ),
  q(
    "q85",
    "Long-term custodial nursing home care is generally:",
    [
      "Not covered by standard Medicare; Medicaid may pay after eligibility rules are met",
      "Fully paid by Medicare Part B for unlimited years",
      "Included in every auto liability policy",
      "Funded only through workers' compensation",
    ],
    0,
    "Medicare covers limited skilled nursing after hospitalization; extended custodial care often relies on Medicaid or private funds."
  ),
  q(
    "q86",
    "Short-term disability insurance usually:",
    [
      "Replaces a portion of income for a limited period after a brief waiting period",
      "Covers flood damage to commercial buildings under TRIA",
      "Eliminates all life insurance contestability rules",
      "Replaces Medigap for Medicare beneficiaries",
    ],
    0,
    "STD bridges income for weeks or months; LTD may pay for years if disability continues."
  ),
  q(
    "q87",
    "An 'own occupation' definition of disability generally means:",
    [
      "Benefits may be paid if you cannot perform the duties of your own job",
      "Benefits are paid only if you can perform any job in the economy",
      "The policy covers only property theft, not illness",
      "Medicare Part D pays all prescriptions with no copay",
    ],
    0,
    "Own-occupation definitions are broader than any-occupation definitions and usually cost more."
  ),
  q(
    "q88",
    "Critical illness insurance typically:",
    [
      "Pays a lump sum if diagnosed with specified serious conditions listed in the policy",
      "Replaces comprehensive major medical coverage for all services",
      "Covers unlimited nursing home stays under Original Medicare",
      "Eliminates HIPAA privacy requirements",
    ],
    0,
    "Critical illness is supplemental; it does not replace ACA-compliant health insurance for ongoing care."
  ),
  q(
    "q89",
    "Coinsurance on a health policy usually means:",
    [
      "You pay a percentage of allowed charges after the deductible is met",
      "The insurer pays 100% of all medical bills with no limit",
      "A flat dollar amount per prescription only",
      "The premium paid to reinsurers for catastrophe treaties",
    ],
    0,
    "Example: 20% coinsurance means you pay 20% of the allowed amount and the plan pays 80%, subject to out-of-pocket maximums."
  ),
  q(
    "q90",
    "A health plan out-of-pocket maximum (on ACA-compliant plans) caps:",
    [
      "Your total spending on covered essential health benefits in a plan year",
      "The insurer's stock price during open enrollment",
      "All property damage from hurricanes nationwide",
      "Social Security payroll tax rates",
    ],
    0,
    "After you reach the OOP max, the plan pays 100% of covered essential benefits for the rest of the year."
  ),
  q(
    "q91",
    "Variable universal life insurance cash value is linked to:",
    [
      "Separate investment accounts chosen by the policyholder, with market risk",
      "Federal Medicare reimbursement schedules only",
      "NFIP flood zone maps exclusively",
      "Workers' compensation experience modifiers",
    ],
    0,
    "VUL policyholders bear investment risk; fees and guarantees are limited to contract language."
  ),
  q(
    "q92",
    "Participating whole life policies may pay:",
    [
      "Dividends when the insurer's experience is favorable — not guaranteed",
      "Unlimited flood coverage on all coastal homes automatically",
      "Federal crop subsidies for every policyholder",
      "Social Security retirement benefits at age 62 automatically",
    ],
    0,
    "Dividends can reduce premium, buy paid-up additions, or be taken as cash — read dividend options in the contract."
  ),
  q(
    "q93",
    "ERISA primarily governs:",
    [
      "Many employer-sponsored health and welfare benefit plans at the federal level",
      "Every personal auto policy sold at retail",
      "State homeowners rate filings exclusively",
      "Medicare Part A hospital deductibles only",
    ],
    0,
    "Self-funded employer health plans are a key ERISA area; fully insured group business also interacts with state regulation."
  ),
  q(
    "q94",
    "Mental health parity laws generally require:",
    [
      "Comparable limits on mental health and substance use benefits vs. medical/surgical benefits",
      "Elimination of all health insurance premiums nationwide",
      "Coverage of intentional property damage by the insured",
      "Replacement of Medicaid with private auto policies",
    ],
    0,
    "Parity rules address quantitative and non-quantitative treatment limits on behavioral health benefits."
  ),
  q(
    "q95",
    "A PPO health plan compared with a strict HMO usually offers:",
    [
      "More flexibility to see out-of-network providers at higher cost",
      "No premiums and no cost-sharing ever",
      "Only dental cleanings with no medical coverage",
      "Mandatory flood insurance on all vehicles",
    ],
    0,
    "PPOs use networks but often pay partial benefits out of network; HMOs are more restrictive."
  ),
  q(
    "q96",
    "Health care sharing ministries differ from insurance because they:",
    [
      "Are not licensed insurance contracts with the same regulatory protections",
      "Are required for all Medicare beneficiaries",
      "Guarantee payment of every medical bill without limits",
      "Replace state insurance department licensing for all carriers",
    ],
    0,
    "Sharing arrangements are member agreements, not regulated insurance products in the same way as major medical policies."
  ),
  q(
    "q97",
    "Creditable coverage for Medicare Part D matters because:",
    [
      "Lack of creditable drug coverage when first eligible can trigger late enrollment penalties",
      "It eliminates all Medicare Part B premiums permanently",
      "It converts term life to whole life automatically",
      "It mandates flood insurance in every state",
    ],
    0,
    "If you delay Part D without other creditable prescription coverage, penalties may apply when you enroll later."
  ),
  q(
    "q98",
    "Dual eligibles are people who qualify for:",
    [
      "Both Medicare and Medicaid, with coordination rules for premiums and cost-sharing",
      "Only surplus lines auto coverage in every state",
      "Unlimited life insurance without insurable interest",
      "Workers' compensation for off-the-job injuries only",
    ],
    0,
    "Dual eligibles often have most costs covered, but plan choices and provider access still require attention."
  ),
  q(
    "q99",
    "Hospital indemnity insurance pays:",
    [
      "Fixed cash amounts per day of hospitalization rather than full medical bills",
      "The entire cost of every surgery with no limits",
      "Social Security disability benefits automatically",
      "All flood damage under homeowners policies",
    ],
    0,
    "Indemnity plans supplement cash flow; they do not replace comprehensive health insurance."
  ),
  q(
    "q100",
    "Life insurance contestability periods (often two years) allow insurers to:",
    [
      "Review application accuracy and contest misrepresentations on new policies",
      "Deny all property claims for hail damage automatically",
      "Set federal Medicare reimbursement rates",
      "Eliminate COBRA continuation rights",
    ],
    0,
    "Material misstatements discovered during contestability can affect claim payment; after the period, rules tighten."
  ),
  q(
    "q101",
    "An accelerated death benefit rider may:",
    [
      "Pay part of the death benefit early if the insured is terminally ill",
      "Convert auto liability to universal life without underwriting",
      "Guarantee Medicaid nursing home coverage for all Americans",
      "Replace the ACA essential health benefits package",
    ],
    0,
    "Accelerated benefits reduce the remaining death benefit; conditions and discounts vary by contract."
  ),
  q(
    "q102",
    "Open enrollment for individual ACA marketplace coverage typically occurs:",
    [
      "Each fall for coverage effective the following January 1, with special enrollment for qualifying events",
      "Only on the day you turn 65 with no exceptions",
      "Whenever you file a homeowners claim",
      "After every auto accident regardless of date",
    ],
    0,
    "Outside open enrollment, you need a qualifying life event (marriage, birth, loss of coverage, etc.) for a special enrollment period."
  ),
  q(
    "q103",
    "High-deductible health plans (HDHPs) are often paired with:",
    [
      "Health savings accounts (HSAs) when IRS eligibility rules are met",
      "Mandatory flood policies from NFIP on every home",
      "Surplus lines brokers for all personal auto",
      "Medicare Part A only with no Part B",
    ],
    0,
    "HSAs offer tax-advantaged savings for qualified medical expenses when paired with qualifying HDHPs."
  ),
  q(
    "q104",
    "Dental insurance plans often include:",
    [
      "Annual maximum benefits and waiting periods for major services",
      "Unlimited coverage for all medical hospital stays",
      "Replacement of Medicare Part D for seniors",
      "Automatic long-term disability to age 67",
    ],
    0,
    "Dental is supplemental; annual caps and networks limit what the plan pays."
  ),
  q(
    "q105",
    "Life and health insurance claims differ from typical P&C claims because:",
    [
      "Health claims involve benefits, networks, and utilization review; life claims pay death benefits to beneficiaries",
      "Life policies always rebuild damaged homes at replacement cost",
      "Health insurers never use prior authorization",
      "P&C policies always last for the insured's entire lifetime",
    ],
    0,
    "Health is ongoing service financing; life is mortality-based with beneficiary proceeds — different processes than property adjusters."
  ),
];
