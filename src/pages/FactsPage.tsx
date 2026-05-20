import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { INSURANCE_TEXTBOOK } from "../lib/insuranceTextbook";
import { Disclaimer } from "../components/ui/Disclaimer";
import { GLOBAL_DISCLAIMER } from "../lib/constants";
import { TechBackground } from "../components/ui/TechBackground";
import { FactsTextbookHero } from "../components/facts/FactsTextbookHero";
import { FactsTableOfContents } from "../components/facts/FactsTableOfContents";
import { FactsChapterArticle } from "../components/facts/FactsChapterArticle";
import { FactsQuizList } from "../components/facts/FactsQuizList";
import { FactsStickyProgress } from "../components/facts/FactsStickyProgress";
import { useTextbookScrollSpy } from "../components/facts/useTextbookScrollSpy";
import { FactsMobileChapterSelect } from "../components/facts/FactsMobileChapterSelect";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { celebrationPath } from "../lib/educationCelebrations";
import {
  celebrationAfterReading,
  updateReadingProgress,
} from "../lib/educationProgress";

export function FactsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useConsumerAuth();
  const { activeChapterId, activeSectionId, readProgress } = useTextbookScrollSpy();
  const readingCelebrationQueued = useRef(false);

  useEffect(() => {
    document.title = "Insurance Facts & History | CoverIQ";
    return () => {
      document.title = "CoverIQ | Insurance Explained Simply";
    };
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (!hash) return;
    const isChapter = INSURANCE_TEXTBOOK.some((c) => c.id === hash);
    const isSection = INSURANCE_TEXTBOOK.some((c) => c.sections.some((s) => s.id === hash));
    if (isChapter || isSection) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, [location.hash]);

  useEffect(() => {
    if (!user?.email) return;
    const newlyComplete = updateReadingProgress(user.email, readProgress);
    if (newlyComplete && !readingCelebrationQueued.current) {
      const milestone = celebrationAfterReading(user.email);
      if (milestone) {
        readingCelebrationQueued.current = true;
        navigate(celebrationPath(milestone));
      }
    }
  }, [readProgress, user?.email, navigate]);

  return (
    <div className="min-h-screen bg-[#030712]">
      <TechBackground showGrid={false} />
      <FactsStickyProgress activeChapterId={activeChapterId} />

      <div className="section-padding relative mx-auto max-w-7xl">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to CoverIQ
        </Link>

        <div className="mt-8 max-w-4xl">
          <FactsTextbookHero />
        </div>

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:gap-12 xl:gap-16">
          <FactsTableOfContents
            activeChapterId={activeChapterId}
            activeSectionId={activeSectionId}
          />

          <div className="min-w-0 flex-1 max-w-3xl">
            <FactsMobileChapterSelect />
            {INSURANCE_TEXTBOOK.map((chapter, i) => (
              <FactsChapterArticle
                key={chapter.id}
                chapter={chapter}
                prev={i > 0 ? INSURANCE_TEXTBOOK[i - 1] : undefined}
                next={i < INSURANCE_TEXTBOOK.length - 1 ? INSURANCE_TEXTBOOK[i + 1] : undefined}
              />
            ))}

            <FactsQuizList />

            <Disclaimer className="mt-12" />
            <p className="mt-4 text-xs leading-relaxed text-slate-600">{GLOBAL_DISCLAIMER}</p>
          </div>
        </div>
        </div>
    </div>
  );
}
