import { INSURANCE_TEXTBOOK } from "../../lib/insuranceTextbook";

export function FactsMobileChapterSelect() {
  return (
    <div className="mb-8 lg:hidden">
      <label htmlFor="facts-chapter-jump" className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
        Jump to chapter
      </label>
      <select
        id="facts-chapter-jump"
        className="input-tech mt-2 w-full font-textbook text-sm"
        defaultValue=""
        onChange={(e) => {
          const id = e.target.value;
          if (id) window.location.hash = id;
        }}
      >
        <option value="" disabled>
          Select a chapter…
        </option>
        {INSURANCE_TEXTBOOK.map((ch) => (
          <option key={ch.id} value={ch.id}>
            Ch. {ch.number} — {ch.title}
          </option>
        ))}
      </select>
    </div>
  );
}
