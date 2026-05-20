/** Extended educational copy for coverage detail modals */
export interface CoverageDeepDive {
  example: string;
  withoutCoverage: string;
}

export const COVERAGE_DEEP_DIVE: Record<string, CoverageDeepDive> = {
  auto: {
    example:
      "You're at a red light and another driver rear-ends you. Your car needs $8,000 in repairs and the other driver is injured. Liability coverage may help pay their medical bills and your legal defense if you're at fault; collision may help repair your vehicle after you pay your deductible — depending on what you purchased.",
    withoutCoverage:
      "Without adequate auto insurance, you could pay repair bills, medical costs, and legal judgments out of pocket. Many states require minimum liability, but those limits are often far below the cost of a serious accident — which can put savings, wages, and assets at risk.",
  },
  home: {
    example:
      "A kitchen fire spreads and damages cabinets, flooring, and personal belongings. Homeowners insurance may help pay to rebuild or repair the structure and replace covered contents, and liability may respond if a guest is injured on your property — subject to your deductible and policy terms.",
    withoutCoverage:
      "Without homeowners coverage, you would typically pay to rebuild, replace belongings, and handle lawsuits yourself. Your mortgage lender may also require insurance — going without can violate loan terms and leave your largest asset unprotected.",
  },
  renters: {
    example:
      "A burst pipe in the unit above soaks your furniture, laptop, and clothing. Renters insurance may help replace your belongings and cover temporary housing if your lease allows — your landlord's policy usually fixes the building, not your stuff.",
    withoutCoverage:
      "Without renters insurance, replacing stolen or damaged belongings and defending a liability claim (e.g., someone trips in your apartment) often comes entirely from your own funds — often thousands of dollars for a single event.",
  },
  condo: {
    example:
      "Your condo association's master policy covers the building exterior, but a water leak from your bathroom damages your upgraded floors and cabinets. Your HO-6 policy may cover interior finishes and personal property the master policy excludes.",
    withoutCoverage:
      "Without condo insurance, you may pay to repair your unit's interior, replace belongings, and cover loss-assessment charges from the association. Gaps between the master policy and your unit are a common and expensive surprise.",
  },
  bundle: {
    example:
      "You insure your home and two vehicles with one carrier. After a hailstorm damages the roof and a car in the driveway, you file related claims with one adjuster and billing account — bundling can simplify service and may reduce total premium versus separate policies.",
    withoutCoverage:
      "Without proper coverage on both home and auto, one bad day (storm plus accident) could mean paying for property repairs and vehicle damage separately, with no multi-policy discounts or coordinated claims support.",
  },
  umbrella: {
    example:
      "You're found liable for a serious auto accident with damages of $750,000, but your auto liability limit is $300,000. An umbrella policy may pay amounts above that limit — up to your umbrella limit — protecting savings and future earnings from garnishment.",
    withoutCoverage:
      "Without excess liability coverage, amounts above your auto or home liability limits may come from personal assets, college funds, or future wages. A single lawsuit can exceed standard policy limits faster than most people expect.",
  },
  motorcycle: {
    example:
      "You lay the bike down avoiding debris on the highway. Motorcycle collision coverage may help repair fairings and frame damage; medical payments or health insurance may handle injuries depending on selections and state rules.",
    withoutCoverage:
      "Without motorcycle-specific coverage, you may have no physical damage protection and limited liability for riding — a personal auto policy often excludes or severely limits motorcycles.",
  },
  rv: {
    example:
      "While parked at a campground, a tree branch cracks your motorhome roof and rainwater ruins interior cabinets. RV insurance may cover the vehicle and attached personal property, and vacation liability may apply if a guest is hurt at your campsite.",
    withoutCoverage:
      "Without RV coverage, repairing a large motorhome or trailer and replacing built-in contents can cost tens of thousands of dollars — far beyond what a standard auto policy typically pays.",
  },
  orv: {
    example:
      "Your UTV rolls on a trail and is damaged; a passenger is injured. ORV insurance may cover vehicle repair and liability for off-road use where homeowners policies often stop at your property line.",
    withoutCoverage:
      "Without ORV coverage, crash damage, theft away from home, and injury claims may be uninsured — homeowners liability rarely covers recreational vehicles off your premises.",
  },
  "golf-cart": {
    example:
      "Your golf cart collides with another cart on a neighborhood path and injures the other driver. A dedicated policy may provide liability and physical damage for low-speed vehicles that homeowners policies may not cover on public paths.",
    withoutCoverage:
      "Without cart coverage, injury and damage claims from neighborhood or street use may fall on you personally — HO policies often exclude motorized carts off your property.",
  },
  boat: {
    example:
      "Your boat hits a submerged object, damaging the hull and engine. Boat insurance may cover repairs, towing, and liability if another boater is hurt — coverage territory and navigation limits apply.",
    withoutCoverage:
      "Without boat insurance, salvage, repair, fuel spill cleanup, and injury lawsuits can be entirely out of pocket. Homeowners policies usually cap or exclude watercraft.",
  },
  flood: {
    example:
      "Heavy rains overwhelm local drainage and two feet of water enters your first floor. A separate flood policy may pay for structural drying, flooring, and contents — standard homeowners policies typically exclude flood.",
    withoutCoverage:
      "Without flood insurance, even one inch of water can mean paying for demolition, mold remediation, and replacement yourself. Federal disaster aid is not guaranteed and is usually a loan, not a grant.",
  },
  jewelry: {
    example:
      "Your engagement ring is stolen from your gym locker. Scheduled jewelry coverage may pay the agreed value without fighting a low homeowners sub-limit (often $1,500 or less for theft).",
    withoutCoverage:
      "Without scheduled coverage, a theft loss may be capped at a small sub-limit — leaving you with a fraction of the ring's value after deductible.",
  },
  furs: {
    example:
      "A fur coat is stolen from your closet during a break-in. Scheduled fur coverage may insure the appraised value with fewer restrictions than a standard personal property limit.",
    withoutCoverage:
      "Without specialty scheduling, high-value furs may be covered only up to a low sub-limit, with no payment for mysterious disappearance in many policies.",
  },
  coins: {
    example:
      "A rare coin collection is lost in a house fire. Agreed-value collectibles coverage may pay the documented value instead of depreciated or generic contents limits.",
    withoutCoverage:
      "Without collectibles coverage, insurers may pay only standard contents limits or actual cash value — often far below market value for rare items.",
  },
  "sporting-goods": {
    example:
      "Your skis and bike are stolen from a rack on your car while traveling. Scheduled sporting goods may cover high-end gear worldwide; homeowners policies may limit theft away from home.",
    withoutCoverage:
      "Without proper scheduling, expensive gear may be underinsured or excluded when stolen off-premises — replacements come from your pocket.",
  },
  "collector-items": {
    example:
      "A signed memorabilia piece is damaged when a shelf collapses. Scheduled collector coverage may include breakage and inflation guard; standard policies may not.",
    withoutCoverage:
      "Without agreed-value scheduling, antiques and memorabilia may be settled at generic contents limits — not auction or appraisal value.",
  },
  tools: {
    example:
      "A contractor's trailer of power tools is stolen from a job site. Scheduled tools coverage may cover professional equipment; homeowners policies often exclude business property.",
    withoutCoverage:
      "Without tools coverage, replacing stolen job-site equipment can halt work and cost thousands — often not covered under a home policy used for business.",
  },
  firearms: {
    example:
      "Several firearms are stolen from a secured safe during a burglary. Scheduled firearm coverage may pay agreed values above the typical homeowners sub-limit for guns.",
    withoutCoverage:
      "Without scheduling, theft of firearms may hit a low sub-limit — leaving you to replace valuable pieces largely on your own.",
  },
  "special-filings": {
    example:
      "Your state requires proof of insurance before reinstating a commercial vehicle registration. An agent files the correct certificate so you can legally operate — the filing documents compliance, not extra protection by itself.",
    withoutCoverage:
      "Without required filings and underlying policies, you may face fines, registration holds, or inability to operate legally — even if you thought 'paperwork' was optional.",
  },
  sr22: {
    example:
      "After a DUI, your state requires an SR-22 filing for three years. Your insurer files proof that you maintain required auto liability limits; if the policy lapses, the state is notified and your license may be suspended again.",
    withoutCoverage:
      "Without maintaining the underlying auto policy tied to the SR-22, your filing becomes invalid — leading to license suspension, reinstatement fees, and higher future premiums.",
  },
  life: {
    example:
      "A parent with young children buys term life so that if they pass away, the death benefit may help pay the mortgage, childcare, and college savings — replacing income the family depends on.",
    withoutCoverage:
      "Without life insurance, survivors may struggle with mortgage payments, debts, funeral costs, and daily expenses — often during the hardest emotional period of their lives.",
  },
  commercial: {
    example:
      "A customer slips on a wet floor in your shop and breaks a wrist. Commercial general liability may help pay medical bills and legal costs; property coverage may help if a fire damages inventory.",
    withoutCoverage:
      "Without commercial insurance, one injury claim or property loss can bankrupt a small business — personal policies usually exclude business operations and assets.",
  },
  bop: {
    example:
      "A small retail store suffers a break-in and a customer injury in the same month. A BOP may combine property (inventory, fixtures) and general liability in one policy built for eligible small businesses.",
    withoutCoverage:
      "Without a BOP or equivalent coverage, theft, fire, and customer injury costs hit the business directly — and many carriers won't cover high-risk operations on a BOP.",
  },
  gl: {
    example:
      "A client visits your office and trips over a cord, requiring surgery. General liability may help pay their medical expenses and settlement costs if you're found negligent — products/completed ops may apply if you sell goods.",
    withoutCoverage:
      "Without GL, defending even a small slip-and-fall can cost tens of thousands in legal fees and settlements — often more than years of premium.",
  },
  "workers-comp": {
    example:
      "An employee lifts a heavy box and herniates a disc on the job. Workers comp may pay medical treatment and a portion of lost wages while they recover — as required in most states for employees.",
    withoutCoverage:
      "Without workers comp where required, employers face state penalties, lawsuits from injured workers, and full payment of medical bills and lost wages out of business funds.",
  },
  "commercial-auto": {
    example:
      "Your delivery van is at fault in an intersection crash, damaging another vehicle and injuring its driver. Commercial auto may cover liability and repair the company van — personal auto often excludes deliveries.",
    withoutCoverage:
      "Without commercial auto, the business pays crash costs, injured parties may sue personally, and personal policies may deny claims for business use — risking operations and assets.",
  },
  pet: {
    example:
      "Your dog needs emergency surgery after swallowing a foreign object. Pet insurance may reimburse a large share of vet bills after deductible — depending on plan, illness vs. accident, and exclusions.",
    withoutCoverage:
      "Without pet insurance, a single emergency vet visit can cost $3,000–$10,000+ out of pocket; chronic conditions can mean years of uninsured bills.",
  },
};
