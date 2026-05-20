import { COVERAGE_DEEP_DIVE } from "./coverageDeepDive";

export type InsuranceCategory =
  | "personal"
  | "specialty"
  | "life"
  | "commercial";

export interface InsuranceLine {
  id: string;
  /** Value sent as `insuranceType` — legacy slugs preserved for core lines */
  formValue: string;
  label: string;
  category: InsuranceCategory;
  icon: string;
  summary: string;
  protects: string;
  misconception: string;
  example: string;
  withoutCoverage: string;
  addOns: string[];
  requiresVehicleCount?: boolean;
}

/** Parity with Chandler Hill Agency funnel + commercial lines */
const RAW_INSURANCE_LINES: Omit<InsuranceLine, "example" | "withoutCoverage">[] = [
  {
    id: "auto",
    formValue: "auto",
    label: "Auto Insurance",
    category: "personal",
    icon: "🚗",
    summary:
      "Auto insurance generally helps protect you financially when you're responsible for injuries or damage from a covered accident involving your vehicle.",
    protects: "Liability, and optionally physical damage to your vehicle depending on coverages selected.",
    misconception:
      "Minimum state requirements are often not the same as adequate protection for your assets and lifestyle.",
    addOns: ["Comprehensive", "Collision", "Roadside assistance", "Rental reimbursement"],
    requiresVehicleCount: true,
  },
  {
    id: "home",
    formValue: "home",
    label: "Homeowners Insurance",
    category: "personal",
    icon: "🏠",
    summary:
      "Homeowners insurance typically helps protect your dwelling, personal belongings, and may include liability coverage for certain incidents.",
    protects: "Structure, personal property, and liability — subject to policy terms and exclusions.",
    misconception: "Standard homeowners policies often exclude flood, earthquake, and some maintenance-related damage.",
    addOns: ["Extended replacement cost", "Water backup", "Scheduled personal property"],
  },
  {
    id: "renters",
    formValue: "renters",
    label: "Renters Insurance",
    category: "personal",
    icon: "🔑",
    summary:
      "Renters insurance generally covers your personal belongings and may include liability protection while you rent.",
    protects: "Personal property and liability — your landlord's policy typically does not cover your belongings.",
    misconception: "Renters insurance is often more affordable than people expect and may be required by landlords.",
    addOns: ["Replacement cost contents", "Identity theft assistance", "Additional living expenses"],
  },
  {
    id: "condo",
    formValue: "Condo Insurance",
    label: "Condo Insurance",
    category: "personal",
    icon: "🏢",
    summary:
      "Condo (HO-6) policies generally cover your unit's interior, personal property, and liability — complementing the association master policy.",
    protects: "Interior improvements, belongings, loss assessment, and personal liability.",
    misconception: "The condo association policy usually does not cover everything inside your unit.",
    addOns: ["Loss assessment", "Building property additions", "Water backup"],
  },
  {
    id: "bundle",
    formValue: "bundle",
    label: "Auto + Home Bundle",
    category: "personal",
    icon: "📦",
    summary:
      "Bundling auto and home (or renters) with one carrier may offer convenience and potential premium savings — availability varies.",
    protects: "Combined personal lines with simplified billing and potential multi-policy discounts.",
    misconception: "Bundling is not always the lowest total cost — comparing options is still worthwhile.",
    addOns: ["Umbrella", "Scheduled valuables", "Enhanced liability limits"],
    requiresVehicleCount: true,
  },
  {
    id: "umbrella",
    formValue: "Umbrella Insurance",
    label: "Umbrella Insurance",
    category: "personal",
    icon: "☂️",
    summary:
      "Umbrella policies generally provide additional liability limits above your underlying auto, home, or renters policies.",
    protects: "Extra liability coverage after underlying policy limits are exhausted.",
    misconception: "Umbrella coverage is not only for wealthy households — it can extend protection affordably.",
    addOns: ["Excess uninsured motorist (where available)", "Worldwide liability extensions"],
  },
  {
    id: "motorcycle",
    formValue: "Motorcycle Insurance",
    label: "Motorcycle Insurance",
    category: "personal",
    icon: "🏍️",
    summary:
      "Motorcycle insurance is designed for two-wheeled vehicles with coverage options tailored to riding risks.",
    protects: "Liability, collision, comprehensive, and accessories — depending on selections.",
    misconception: "Your auto policy typically does not extend full coverage to motorcycles.",
    addOns: ["Accessory coverage", "Trip interruption", "Guest passenger liability"],
  },
  {
    id: "rv",
    formValue: "RV & Trailer Insurance",
    label: "RV & Trailer Insurance",
    category: "personal",
    icon: "🚐",
    summary:
      "RV and trailer policies address vehicles used for recreation, often combining auto-like and property-like protections.",
    protects: "Vehicle, personal belongings inside, and liability while traveling or parked.",
    misconception: "Standard auto policies may not adequately cover motorhomes or large trailers.",
    addOns: ["Vacation liability", "Emergency expenses", "Total loss replacement"],
  },
  {
    id: "orv",
    formValue: "ORV Insurance",
    label: "ORV Insurance",
    category: "personal",
    icon: "🏔️",
    summary:
      "Off-road vehicle insurance generally covers ATVs, UTVs, and similar vehicles used off public roads.",
    protects: "Physical damage and liability for off-road use — subject to policy territory limits.",
    misconception: "Homeowners policies rarely cover ORVs used away from your property.",
    addOns: ["Accessory coverage", "Safety apparel", "Transportation coverage"],
  },
  {
    id: "golf-cart",
    formValue: "Golf Cart Insurance",
    label: "Golf Cart Insurance",
    category: "personal",
    icon: "⛳",
    summary:
      "Golf cart and low-speed vehicle policies address liability and physical damage for neighborhood or course use.",
    protects: "Liability and physical damage for low-speed vehicles.",
    misconception: "Homeowners liability may not apply when operating carts on public roads.",
    addOns: ["Medical payments", "Uninsured motorist", "Comprehensive"],
  },
  {
    id: "boat",
    formValue: "Boat & Watercraft Insurance",
    label: "Boat & Watercraft Insurance",
    category: "personal",
    icon: "⛵",
    summary:
      "Boat insurance generally covers watercraft, equipment, and liability on and off the water.",
    protects: "Hull, liability, medical payments, and equipment — varies by watercraft type.",
    misconception: "Homeowners policies typically offer limited, if any, boat coverage.",
    addOns: ["Towing", "Fuel spill liability", "Fishing equipment"],
  },
  {
    id: "flood",
    formValue: "Flood Insurance",
    label: "Flood Insurance",
    category: "personal",
    icon: "🌊",
    summary:
      "Flood insurance is usually a separate policy that helps protect against flood-related property damage.",
    protects: "Building and contents from flood — often through NFIP or private carriers.",
    misconception: "Flooding is not covered by standard homeowners policies in most cases.",
    addOns: ["Basement contents", "Increased building limits", "Replacement cost options"],
  },
  {
    id: "jewelry",
    formValue: "Jewelry",
    label: "Jewelry",
    category: "specialty",
    icon: "💎",
    summary: "Scheduled jewelry coverage helps protect high-value pieces beyond standard personal property sub-limits.",
    protects: "Named items at agreed values — often with broader peril coverage.",
    misconception: "A homeowners policy may cap jewelry losses at a low sub-limit.",
    addOns: ["Mysterious disappearance", "Worldwide coverage", "Inflation guard"],
  },
  {
    id: "furs",
    formValue: "Furs",
    label: "Furs",
    category: "specialty",
    icon: "🧥",
    summary: "Specialty coverage for fur garments and collections with proper valuation.",
    protects: "Scheduled fur items at agreed values.",
    misconception: "Standard homeowners limits may not cover full fur collection value.",
    addOns: ["Scheduled items", "Inflation guard"],
  },
  {
    id: "coins",
    formValue: "Coins & Collectibles",
    label: "Coins & Collectibles",
    category: "specialty",
    icon: "🪙",
    summary: "Coverage for rare coins, stamps, and collectibles with agreed values.",
    protects: "Named collectibles beyond standard sub-limits.",
    misconception: "Collectibles often need scheduled coverage, not blanket limits.",
    addOns: ["Agreed value", "Mysterious disappearance"],
  },
  {
    id: "sporting-goods",
    formValue: "Sporting Goods",
    label: "Sporting Goods",
    category: "specialty",
    icon: "🎿",
    summary: "Protection for high-value sports equipment and recreational gear.",
    protects: "Scheduled sporting equipment and gear.",
    misconception: "Standard policies may cap coverage for expensive equipment.",
    addOns: ["Worldwide coverage", "Replacement cost"],
  },
  {
    id: "collector-items",
    formValue: "Collector Items",
    label: "Collector Items",
    category: "specialty",
    icon: "🏺",
    summary: "Tailored schedules for antiques, memorabilia, and prized collections.",
    protects: "Named collector items at agreed values.",
    misconception: "Sentimental value does not equal insured value without appraisal.",
    addOns: ["Breakage", "Inflation guard"],
  },
  {
    id: "tools",
    formValue: "Tools",
    label: "Tools",
    category: "specialty",
    icon: "🔧",
    summary: "Coverage for professional or personal tools exceeding standard policy limits.",
    protects: "Scheduled tools and equipment.",
    misconception: "Business use tools may need commercial coverage, not homeowners.",
    addOns: ["Off-premises coverage", "Replacement cost"],
  },
  {
    id: "firearms",
    formValue: "Firearms",
    label: "Firearms",
    category: "specialty",
    icon: "🎯",
    summary: "Scheduled firearm coverage for theft, loss, and liability needs.",
    protects: "Named firearms with optional liability extensions.",
    misconception: "Firearms often have sub-limits under standard homeowners policies.",
    addOns: ["Scheduled coverage", "Liability extensions"],
  },
  {
    id: "special-filings",
    formValue: "Special Insurance Filings",
    label: "Special Insurance Filings",
    category: "specialty",
    icon: "📑",
    summary: "Assistance with state-specific filings and compliance documentation.",
    protects: "Regulatory compliance where filings are required.",
    misconception: "Filings are administrative — they do not replace required underlying coverage.",
    addOns: ["State-specific forms", "Certificate requests"],
  },
  {
    id: "sr22",
    formValue: "SR-22 Filings",
    label: "SR-22 Filings",
    category: "specialty",
    icon: "📋",
    summary:
      "An SR-22 is a certificate of financial responsibility filed with your state — not insurance itself, but proof of required auto coverage.",
    protects: "Compliance with state requirements after certain violations.",
    misconception: "SR-22 is a filing, not a separate type of insurance policy.",
    addOns: ["Non-owner auto policies", "Increased liability limits"],
  },
  {
    id: "life",
    formValue: "Life Insurance",
    label: "Life Insurance",
    category: "life",
    icon: "❤️",
    summary:
      "Life insurance generally provides a death benefit to beneficiaries and may include cash value in permanent products.",
    protects: "Income replacement, debts, final expenses, and legacy goals.",
    misconception: "Term and permanent life serve different purposes — one size does not fit all.",
    addOns: ["Term", "Whole life", "Universal life", "Final expense"],
  },
  {
    id: "commercial",
    formValue: "Commercial Insurance",
    label: "Commercial Insurance",
    category: "commercial",
    icon: "🏭",
    summary:
      "Commercial insurance packages help businesses manage property, liability, and operational risks.",
    protects: "Business assets, operations, and third-party claims.",
    misconception: "Personal policies generally do not cover business activities or equipment.",
    addOns: ["BOP", "General liability", "Commercial auto", "Workers comp"],
  },
  {
    id: "bop",
    formValue: "Business Owners Policy",
    label: "Business Owners Policy (BOP)",
    category: "commercial",
    icon: "📊",
    summary:
      "A BOP typically bundles property and liability coverages for small to mid-sized businesses in one package.",
    protects: "Building, business personal property, and general liability in a combined form.",
    misconception: "BOPs have eligibility requirements — not every business qualifies.",
    addOns: ["Business interruption", "Cyber liability", "Hired/non-owned auto"],
  },
  {
    id: "gl",
    formValue: "General Liability",
    label: "General Liability",
    category: "commercial",
    icon: "⚖️",
    summary:
      "General liability generally covers third-party bodily injury and property damage claims arising from business operations.",
    protects: "Customer injuries, property damage, and advertising injury claims.",
    misconception: "GL does not typically cover professional errors — that may require E&O coverage.",
    addOns: ["Products/completed operations", "Hired/non-owned auto", "Umbrella"],
  },
  {
    id: "workers-comp",
    formValue: "Workers Compensation",
    label: "Workers Compensation",
    category: "commercial",
    icon: "👷",
    summary:
      "Workers comp generally covers medical costs and lost wages for work-related employee injuries.",
    protects: "Employees injured on the job — often legally required for employers.",
    misconception: "Independent contractors may still need coverage depending on state rules.",
    addOns: ["Employers liability", "Officer inclusion/exclusion endorsements"],
  },
  {
    id: "commercial-auto",
    formValue: "Commercial Auto",
    label: "Commercial Auto",
    category: "commercial",
    icon: "🚛",
    summary:
      "Commercial auto insurance covers vehicles used for business purposes with higher limits and fleet options.",
    protects: "Company vehicles, drivers, cargo, and liability from business use.",
    misconception: "Personal auto policies typically exclude regular business use.",
    addOns: ["Hired/non-owned", "Motor truck cargo", "Drive-other-car"],
  },
  {
    id: "pet",
    formValue: "Pet Insurance",
    label: "Pet Insurance",
    category: "personal",
    icon: "🐾",
    summary:
      "Pet insurance generally helps reimburse veterinary costs for illness and injury — separate from homeowners liability for pets.",
    protects: "Vet bills for covered conditions — subject to deductibles and reimbursement levels.",
    misconception: "Pre-existing conditions are often excluded or limited.",
    addOns: ["Wellness riders", "Dental", "Alternative therapy"],
  },
];

export const INSURANCE_LINES: InsuranceLine[] = RAW_INSURANCE_LINES.map((line) => {
  const dive = COVERAGE_DEEP_DIVE[line.id];
  if (!dive) {
    throw new Error(`Missing coverage deep dive for: ${line.id}`);
  }
  return { ...line, ...dive };
});

export function lineRequiresVehicleCount(formValue: string): boolean {
  const v = formValue.toLowerCase();
  return v === "auto" || v === "bundle" || v.includes("auto insurance");
}

export function getLineById(id: string): InsuranceLine | undefined {
  return INSURANCE_LINES.find((l) => l.id === id);
}

export function getLineByFormValue(value: string): InsuranceLine | undefined {
  return INSURANCE_LINES.find((l) => l.formValue === value);
}
