/** White head mark on transparent background */
const LOGO_SRC = "/coveriq-logo.png?v=4";

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
