/** White logo on transparent background — no colored box */
const LOGO_SRC = "/coveriq-logo.svg?v=3";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt="CoverIQ"
      width={40}
      height={40}
      className={`h-10 w-10 shrink-0 object-contain ${className}`}
      decoding="async"
    />
  );
}
