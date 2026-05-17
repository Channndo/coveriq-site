import { useState, useCallback } from "react";
import { Hero } from "../components/sections/Hero";
import { CoverageHub } from "../components/sections/CoverageHub";
import { LineSelector } from "../components/sections/LineSelector";
import { HowInsuranceWorks } from "../components/sections/HowInsuranceWorks";
import { AiGuidance } from "../components/sections/AiGuidance";
import { TrustSection } from "../components/sections/TrustSection";
import { FAQ } from "../components/sections/FAQ";
import { QuoteSection } from "../components/sections/QuoteSection";
import { BlogResources } from "../components/sections/BlogResources";
import { FaqSchema } from "../components/seo/FaqSchema";

export function HomePage() {
  const [selectedType, setSelectedType] = useState("");

  const handleGetQuote = useCallback((formValue: string) => {
    setSelectedType(formValue);
    setTimeout(() => {
      document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <>
      <FaqSchema />
      <Hero />
      <CoverageHub onGetQuote={handleGetQuote} />
      <LineSelector onSelect={handleGetQuote} />
      <HowInsuranceWorks />
      <AiGuidance />
      <TrustSection />
      <FAQ />
      <QuoteSection selectedType={selectedType} />
      <BlogResources />
    </>
  );
}
