export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is CoverIQ an insurance company?",
    answer:
      "No. CoverIQ provides educational resources and helps connect you with licensed professionals for quotes. We do not issue policies or guarantee coverage outcomes.",
  },
  {
    question: "Does CoverIQ provide legal or coverage advice?",
    answer:
      "No. Our content is for general education only. Coverage availability, definitions, and limits vary by carrier and state. Always refer to your actual policy documents.",
  },
  {
    question: "How does the quote process work?",
    answer:
      "You submit basic contact information and insurance interest. A licensed agent reviews your request and follows up with options subject to carrier underwriting.",
  },
  {
    question: "Will submitting a form bind my coverage?",
    answer:
      "No. Submitting a quote request does not bind coverage. Final terms are determined by the carrier after underwriting review.",
  },
  {
    question: "What does AI-assisted mean on CoverIQ?",
    answer:
      "AI-assisted features help explain insurance concepts in plain language. They do not make binding coverage decisions or replace advice from a licensed professional.",
  },
  {
    question: "How is my information used?",
    answer:
      "We collect information necessary to process your quote request. Data is shared only with licensed partners to fulfill your request and is not sold to third parties.",
  },
];
