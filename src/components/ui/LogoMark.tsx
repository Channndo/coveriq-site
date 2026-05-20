import { CoverIqLogoSvg } from "./CoverIqLogoSvg";

export function LogoMark({ className = "" }: { className?: string }) {
  return <CoverIqLogoSvg className={`h-10 w-10 shrink-0 ${className}`.trim()} />;
}
