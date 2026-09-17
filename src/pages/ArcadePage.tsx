import { Link } from "react-router-dom";

/** Local omni.games hub (CoverIQ Arcade) — cabinet launcher on port 5174 */
const ARCADE_ORIGIN =
  (import.meta.env.VITE_ARCADE_URL as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "http://localhost:5175" : "");

export function ArcadePage() {
  if (!ARCADE_ORIGIN) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030712] px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan-500/80">omni.games</p>
        <h1 className="font-display mt-3 text-2xl font-bold text-white">Arcade not configured</h1>
        <p className="mt-4 max-w-md text-sm text-slate-400">
          Set <code className="text-cyan-300">VITE_ARCADE_URL</code> to your deployed omni.games hub, or run locally
          with <code className="text-cyan-300">npm run dev:all</code>.
        </p>
        <Link to="/" className="mt-8 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          ← Back to CoverIQ
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#05050c]">
      <iframe
        src={ARCADE_ORIGIN}
        title="omni.games — Omnistrata Arcade"
        className="h-full w-full flex-1 border-0"
        allow="fullscreen"
      />
      <Link
        to="/"
        className="absolute left-4 top-4 z-10 rounded-lg border border-white/15 bg-[#030712]/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-300 backdrop-blur-sm transition hover:border-cyan-500/30 hover:text-cyan-200"
      >
        ← CoverIQ
      </Link>
    </div>
  );
}
