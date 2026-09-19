import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Comic } from "../../data/comics";
import { getReaderPages, interiorPageCount } from "../../data/comics";

interface ComicReaderProps {
  comic: Comic;
  /** Called when the reader should close and return to the library. */
  onClose: () => void;
}

/**
 * Book-style comic reader.
 *
 * Custom framer-motion 3D page flip (no external page-flip dependency) so we
 * keep full control over the "only a cover exists yet" reality and degrade
 * gracefully with a "More pages coming soon" state. Supports prev/next
 * buttons, ← / → keyboard arrows, click/tap left-right zones, touch swipe,
 * a fullscreen toggle (Fullscreen API), and a page counter.
 */
export function ComicReader({ comic, onClose }: ComicReaderProps) {
  const leaves = useMemo(() => getReaderPages(comic), [comic]);
  const total = leaves.length;
  const hasInteriorPages = interiorPageCount(comic) > 0;

  // [index, direction] — direction drives the flip animation (1 fwd, -1 back).
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const atStart = index <= 0;
  const atEnd = index >= total - 1;

  const paginate = useCallback(
    (dir: number) => {
      setState(([current]) => {
        const next = current + dir;
        if (next < 0 || next > total - 1) return [current, 0];
        return [next, dir];
      });
    },
    [total]
  );

  // Lock background scroll while the reader is mounted.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Keyboard: arrows to flip, Escape to close (native Esc handles fullscreen exit).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "Escape" && !document.fullscreenElement) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate, onClose]);

  // Sync fullscreen state with the browser (covers Esc / F11 exits).
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* Fullscreen can be blocked (e.g. iOS Safari); fail silently. */
    }
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 45) paginate(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const isCover = index === 0;
  const counterLabel = isCover ? "Cover" : `${index} / ${total - 1}`;

  const flipVariants = {
    enter: (dir: number) => ({
      rotateY: dir >= 0 ? 78 : -78,
      x: dir >= 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { rotateY: 0, x: 0, opacity: 1 },
    exit: (dir: number) => ({
      rotateY: dir >= 0 ? -78 : 78,
      x: dir >= 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col bg-[#05070f]/98 backdrop-blur-xl"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="glow-orb left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 bg-cyan-500/10" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#030712]/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-300 backdrop-blur transition hover:border-cyan-500/40 hover:text-cyan-200"
        >
          ← Library
        </button>

        <div className="min-w-0 text-center">
          <p className="truncate font-display text-sm font-bold text-white sm:text-base">
            {comic.title}
          </p>
          {comic.issue && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
              {comic.issue}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#030712]/70 p-2 text-slate-300 backdrop-blur transition hover:border-cyan-500/40 hover:text-cyan-200"
        >
          {isFullscreen ? (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9H4m0 0V4m0 5l6-6m5 5h5m0 0V4m0 5l-6-6M9 15H4m0 0v5m0-5l6 6m5-6h5m0 0v5m0-5l-6 6" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5v4m0-4h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 sm:px-6"
        style={{ perspective: 1800 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Left / right click-tap zones */}
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => paginate(-1)}
          disabled={atStart}
          className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-w-resize disabled:cursor-default"
        />
        <button
          type="button"
          aria-label="Next page"
          onClick={() => paginate(1)}
          disabled={atEnd}
          className="absolute inset-y-0 right-0 z-10 w-1/3 cursor-e-resize disabled:cursor-default"
        />

        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d", transformOrigin: "center" }}
            className="relative flex max-h-full items-center justify-center"
          >
            {/* The page/leaf */}
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <img
                src={leaves[index]}
                alt={
                  isCover
                    ? `${comic.title} cover`
                    : `${comic.title} — page ${index} of ${total - 1}`
                }
                draggable={false}
                className="block max-h-[calc(100vh-11rem)] w-auto max-w-[92vw] select-none object-contain"
              />
              {/* Subtle page spine sheen */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/25 to-transparent"
                aria-hidden
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Coming-soon banner when only the cover exists */}
      {isCover && !hasInteriorPages && (
        <div className="relative z-20 mx-auto -mt-1 mb-1 px-4">
          <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-center">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-200">
              More pages coming soon
            </span>
          </div>
        </div>
      )}

      {/* Bottom controls */}
      <div className="relative z-20 flex items-center justify-center gap-4 px-4 py-4 sm:gap-6">
        <button
          type="button"
          onClick={() => paginate(-1)}
          disabled={atStart}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#030712]/70 px-4 py-2 text-sm text-slate-200 backdrop-blur transition hover:border-cyan-500/40 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-slate-200"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="min-w-[5.5rem] text-center font-mono text-xs uppercase tracking-widest text-slate-400">
          {counterLabel}
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          disabled={atEnd}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#030712]/70 px-4 py-2 text-sm text-slate-200 backdrop-blur transition hover:border-cyan-500/40 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:text-slate-200"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
