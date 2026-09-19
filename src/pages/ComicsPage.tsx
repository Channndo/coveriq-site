import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { TechBackground } from "../components/ui/TechBackground";
import { ComicReader } from "../components/comics/ComicReader";
import { COMICS, getComicBySlug, interiorPageCount } from "../data/comics";

/**
 * Comics library + reader launcher.
 *
 * The open comic is tracked via a `?issue=<slug>` query param so the browser
 * back button closes the reader and deep links work. The site Header/Footer
 * chrome stays visible on the library; the reader mounts as its own fixed
 * fullscreen overlay on top.
 */
export function ComicsPage() {
  const [params, setParams] = useSearchParams();
  const activeComic = getComicBySlug(params.get("issue"));

  useEffect(() => {
    document.title = "Comics | CoverIQ";
    return () => {
      document.title = "CoverIQ | Insurance Explained Simply";
    };
  }, []);

  const openComic = (slug: string) => setParams({ issue: slug });
  const closeReader = () => setParams({}, { replace: true });

  // Locked issues can be shown but not opened (even via a manual ?issue= URL).
  const readerComic = activeComic && !activeComic.locked ? activeComic : null;

  return (
    <div className="relative min-h-screen bg-[#030712]">
      <TechBackground showGrid={false} />

      <div className="section-padding relative mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to CoverIQ
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl"
        >
          <p className="font-mono mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
            CoverIQ Comics
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Captain <span className="gradient-text">CoverIQ</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            Insurance, but make it heroic. Follow Captain CoverIQ as they turn
            confusing fine print into clear, confident decisions. Pick an issue
            to open the book-style reader and flip through page by page.
          </p>
        </motion.div>

        {/* Library grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COMICS.map((comic, i) => {
            const pageCount = interiorPageCount(comic);
            const locked = Boolean(comic.locked);
            return (
              <motion.button
                key={comic.id}
                type="button"
                onClick={() => !locked && openComic(comic.slug)}
                disabled={locked}
                aria-label={
                  locked
                    ? `${comic.title} — coming soon`
                    : `Read ${comic.title}`
                }
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
                className={`glass-card group flex flex-col text-left transition ${
                  locked
                    ? "cursor-not-allowed"
                    : "hover:-translate-y-1 hover:border-cyan-400/30"
                }`}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-2xl bg-slate-950">
                  <img
                    src={comic.coverImage}
                    alt={`${comic.title} ${comic.issue ?? ""} cover`}
                    loading="lazy"
                    className={`h-full w-full object-cover transition duration-500 ${
                      locked ? "opacity-90" : "group-hover:scale-[1.03]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {locked ? (
                    <>
                      {/* Persistent lock/coming-soon treatment */}
                      <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-[#030712]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300 backdrop-blur">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Coming Soon
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-4">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#030712]/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-slate-300 backdrop-blur">
                          Locked · Full story soon
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center py-4 opacity-0 transition group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-[#030712]/80 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-cyan-200 backdrop-blur">
                        Read now →
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-display text-lg font-bold text-white">
                      {comic.title}
                    </h2>
                    {comic.issue && (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-cyan-400/80">
                        {comic.issue}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                    {comic.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        locked ? "bg-amber-400" : "bg-cyan-400"
                      }`}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      {locked
                        ? "Coming soon"
                        : pageCount > 0
                          ? `${pageCount} page${pageCount === 1 ? "" : "s"}`
                          : "Cover only — pages coming soon"}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {readerComic && <ComicReader comic={readerComic} onClose={closeReader} />}
    </div>
  );
}
