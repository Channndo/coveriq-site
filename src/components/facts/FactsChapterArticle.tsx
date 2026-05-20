import type { TextbookChapter } from "../../lib/insuranceTextbook";
import { CHAPTER_META, toRoman } from "../../lib/factsTextbookMeta";
import { ChapterQuickCheck } from "./ChapterQuickCheck";
import { FactsSectionContent } from "./FactsSectionContent";

interface FactsChapterArticleProps {
  chapter: TextbookChapter;
  prev?: TextbookChapter;
  next?: TextbookChapter;
}

export function FactsChapterArticle({ chapter, prev, next }: FactsChapterArticleProps) {
  const meta = CHAPTER_META[chapter.id];
  const roman = toRoman(chapter.number);

  return (
    <article
      id={chapter.id}
      className="scroll-mt-28 textbook-page mb-16 px-8 py-10 sm:px-10 sm:py-12 last:mb-0"
    >
      {/* Chapter opener */}
      <header className="relative border-b border-white/[0.08] pb-10">
        <p
          className="textbook-chapter-num pointer-events-none absolute -right-2 -top-4 select-none sm:-right-4"
          aria-hidden
        >
          {roman}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-500/90">
          Chapter {chapter.number}
        </p>
        <h2 className="font-display mt-2 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">
          {chapter.title}
        </h2>
        {chapter.subtitle && (
          <p className="font-textbook mt-3 text-base italic text-slate-500">{chapter.subtitle}</p>
        )}
        {meta && (
          <p className="mt-4 font-mono text-xs text-slate-600">
            Estimated reading time · {meta.readMinutes} min
          </p>
        )}
      </header>

      {meta && meta.objectives.length > 0 && (
        <aside className="mt-8 textbook-callout">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-500/90">
            Learning objectives
          </p>
          <p className="mt-1 text-xs text-slate-500">After this chapter, you should be able to:</p>
          <ul className="textbook-objectives mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-slate-300">
            {meta.objectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-12 space-y-14">
        {chapter.sections.map((section, i) => (
          <FactsSectionContent key={section.id} section={section} leadDropCap={i === 0} />
        ))}
      </div>

      <ChapterQuickCheck chapterNumber={chapter.number} chapterTitle={chapter.title} />

      {/* Chapter navigation */}
      <footer className="mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <a
            href={`#${prev.id}`}
            className="group max-w-[48%] rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3 transition hover:border-cyan-500/25 hover:bg-cyan-500/5"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              ← Previous
            </span>
            <span className="mt-1 block text-sm font-medium text-slate-300 group-hover:text-cyan-200">
              Ch. {prev.number}: {prev.title}
            </span>
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a
            href={`#${next.id}`}
            className="group max-w-[48%] rounded-lg border border-white/[0.06] bg-black/20 px-4 py-3 text-right transition hover:border-cyan-500/25 hover:bg-cyan-500/5 sm:ml-auto"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
              Next →
            </span>
            <span className="mt-1 block text-sm font-medium text-slate-300 group-hover:text-cyan-200">
              Ch. {next.number}: {next.title}
            </span>
          </a>
        ) : null}
      </footer>
    </article>
  );
}
