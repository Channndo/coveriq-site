import { GLOBAL_DISCLAIMER } from "../../lib/constants";

interface DisclaimerProps {
  className?: string;
  compact?: boolean;
}

export function Disclaimer({ className = "", compact }: DisclaimerProps) {
  return (
    <p className={`prose-disclaimer ${compact ? "text-[11px]" : ""} ${className}`}>
      {GLOBAL_DISCLAIMER}
    </p>
  );
}
