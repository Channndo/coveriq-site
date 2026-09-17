import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "../components/sections/Hero";
import { CoverageHub } from "../components/sections/CoverageHub";
import { HowInsuranceWorks } from "../components/sections/HowInsuranceWorks";
import { AiGuidance } from "../components/sections/AiGuidance";
import { FAQ } from "../components/sections/FAQ";
import { FaqSchema } from "../components/seo/FaqSchema";

export function HomePage() {
  const navigate = useNavigate();

  const handleGetQuote = useCallback(
    (formValue: string) => {
      navigate(`/quote?type=${encodeURIComponent(formValue)}`);
    },
    [navigate]
  );

  return (
    <>
      <FaqSchema />
      <Hero />
      <CoverageHub onGetQuote={handleGetQuote} />
      <HowInsuranceWorks />
      <AiGuidance />
      <FAQ />
    </>
  );
}
