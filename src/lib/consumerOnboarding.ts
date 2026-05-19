export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  multi?: boolean;
  options: { id: string; label: string }[];
}

export const CONSUMER_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "primaryInterest",
    title: "What do you want to learn about most?",
    subtitle: "Select all that apply.",
    multi: true,
    options: [
      { id: "auto", label: "Auto insurance" },
      { id: "home", label: "Homeowners / renters" },
      { id: "life", label: "Life insurance" },
      { id: "health", label: "Health basics" },
      { id: "business", label: "Business coverage" },
      { id: "general", label: "General education" },
    ],
  },
  {
    id: "household",
    title: "Who are you shopping for?",
    subtitle: "Select all that apply.",
    multi: true,
    options: [
      { id: "self", label: "Just me" },
      { id: "couple", label: "Me + spouse/partner" },
      { id: "family", label: "Family with kids" },
      { id: "multi_driver", label: "Multiple drivers" },
    ],
  },
  {
    id: "timeline",
    title: "When are you looking to make a change?",
    options: [
      { id: "asap", label: "As soon as possible" },
      { id: "30_days", label: "Within 30 days" },
      { id: "renewal", label: "At my renewal date" },
      { id: "exploring", label: "Just exploring" },
    ],
  },
  {
    id: "helpStyle",
    title: "How should MIRA help you?",
    multi: true,
    options: [
      { id: "definitions", label: "Explain terms simply" },
      { id: "compare", label: "Compare coverage types" },
      { id: "quote_prep", label: "Prepare for a quote" },
      { id: "claims", label: "Claims & deductibles" },
    ],
  },
];
