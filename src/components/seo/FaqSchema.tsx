import { FAQ_ITEMS } from "../../lib/faq";
import { INSURANCE_HISTORY_SECTIONS } from "../../lib/insuranceHistory";

export function FaqSchema() {
  const historyEntities = INSURANCE_HISTORY_SECTIONS.filter((s) => s.id !== "disclaimer").map(
    (section) => ({
      "@type": "Question",
      name: section.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: section.paragraphs.join(" "),
      },
    })
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...historyEntities,
      ...FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
