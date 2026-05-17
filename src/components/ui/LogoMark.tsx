/** Teal mark with transparent PNG head/network icon */
const LOGO_SRC = "/coveriq-logo.png?v=2";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 to-teal-600 shadow-lg shadow-cyan-500/25 ${className}`}
    >
      <img
        src={LOGO_SRC}
        alt="CoverIQ"
        width={28}
        height={28}
        className="h-8 w-8 object-contain drop-shadow-sm"
        decoding="async"
      />
    </span>
  );
}
