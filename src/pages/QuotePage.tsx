import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LineSelector } from "../components/sections/LineSelector";
import { QuoteSection } from "../components/sections/QuoteSection";

export function QuotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get("type") || "";
  const [selectedType, setSelectedType] = useState(typeFromUrl);

  useEffect(() => {
    document.title = "Get a Quote | CoverIQ";
    return () => {
      document.title = "CoverIQ | Insurance Explained Simply";
    };
  }, []);

  useEffect(() => {
    setSelectedType(typeFromUrl);
  }, [typeFromUrl]);

  const handleSelect = useCallback(
    (formValue: string) => {
      setSelectedType(formValue);
      navigate(`/quote?type=${encodeURIComponent(formValue)}`, { replace: true });
    },
    [navigate]
  );

  return (
    <>
      <LineSelector onSelect={handleSelect} />
      <QuoteSection key={selectedType || "blank"} selectedType={selectedType} />
    </>
  );
}
