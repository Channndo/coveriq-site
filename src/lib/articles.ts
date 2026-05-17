export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
}

export const ARTICLES: Article[] = [
  {
    slug: "understanding-auto-insurance",
    title: "Understanding Auto Insurance",
    excerpt: "Learn what common auto coverages generally include and how limits and deductibles work.",
    category: "Auto",
    readMinutes: 6,
  },
  {
    slug: "what-is-comprehensive-coverage",
    title: "What Is Comprehensive Coverage?",
    excerpt: "A plain-language look at comprehensive auto coverage and typical exclusions.",
    category: "Auto",
    readMinutes: 4,
  },
  {
    slug: "how-deductibles-work",
    title: "How Deductibles Work",
    excerpt: "Why deductibles exist and how they may affect your premium and claim payout.",
    category: "Basics",
    readMinutes: 5,
  },
  {
    slug: "umbrella-insurance-explained",
    title: "What Does Umbrella Insurance Cover?",
    excerpt: "How umbrella policies generally extend liability protection above primary policies.",
    category: "Personal",
    readMinutes: 5,
  },
  {
    slug: "business-insurance-basics",
    title: "Business Insurance Basics",
    excerpt: "An introduction to BOP, general liability, workers comp, and commercial auto.",
    category: "Commercial",
    readMinutes: 8,
  },
  {
    slug: "insurance-terms-explained",
    title: "Insurance Terms Explained",
    excerpt: "A starter glossary for premiums, limits, endorsements, and more.",
    category: "Glossary",
    readMinutes: 7,
  },
];
