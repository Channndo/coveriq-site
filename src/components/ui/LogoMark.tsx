/** Teal mark with transparent PNG head/network icon */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 to-teal-600 shadow-lg shadow-cyan-500/25 ${className}`}
    >
      <img
        src="/coveriq-logo.png"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
        decoding="async"
      />
    </span>
  );
}
