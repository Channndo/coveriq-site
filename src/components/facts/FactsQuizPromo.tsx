import { Link } from "react-router-dom";

export function FactsQuizPromo() {
  return (
    <section className="textbook-page mt-16 px-8 py-10 sm:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500/90">
            End-of-text review
          </p>
          <h2 className="font-display mt-2 text-2xl font-bold text-white">10-question chapter exam</h2>
          <p className="textbook-prose-muted mt-3">
            Each chapter ends with an optional 2-question quick check. After all ten chapters, take
            the full review — one question per chapter from the same vetted bank (general U.S.
            concepts, not state exam prep).
          </p>
        </div>
        <Link
          to="/facts/quiz"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Start the quiz
        </Link>
      </div>
    </section>
  );
}
