import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuoteForm } from "../../hooks/useQuoteForm";
import { INSURANCE_LINES } from "../../lib/insuranceLines";
import { QUOTE_DISCLAIMER } from "../../lib/constants";

interface QuoteEngineProps {
  initialInsuranceType?: string;
  tip?: string;
}

export function QuoteEngine({ initialInsuranceType = "", tip }: QuoteEngineProps) {
  const navigate = useNavigate();
  const { data, setField, vehicleRequired, progress, submitting, consent, setConsent, formatPhone, submit } =
    useQuoteForm(initialInsuranceType);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await submit();
    if (!result.ok) {
      alert(result.error);
      return;
    }
    navigate("/thank-you");
  };

  const inputClass = "input-tech";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="gradient-border"
    >
      <div className="glass-card p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400">
              Quote Engine
            </span>
            <h3 className="font-display mt-1 text-xl font-bold text-white">Request a Quote Review</h3>
            <p className="mt-1 text-sm text-slate-500">Education first — a licensed agent follows up</p>
          </div>
          <span className="relative mt-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
        </div>

        <div className="mb-6">
          <div className="mb-1 flex justify-between font-mono text-[10px] text-slate-500">
            <span>PROGRESS</span>
            <span className="text-cyan-400">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
              style={{ boxShadow: "0 0 12px rgba(34, 211, 238, 0.5)" }}
            />
          </div>
        </div>

        {tip && (
          <aside className="mb-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-xs text-slate-400">
            <strong className="font-mono text-cyan-400">TIP</strong> — {tip}
          </aside>
        )}

        <form id="quoteForm" onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              required
              className={inputClass}
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              required
              className={inputClass}
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
            />
          </div>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="Email address"
            value={data.email}
            onChange={(e) => setField("email", e.target.value)}
          />
          <input
            type="tel"
            name="phone"
            required
            className={inputClass}
            placeholder="Phone number"
            value={data.phone}
            onChange={(e) => setField("phone", formatPhone(e.target.value))}
          />
          <input
            type="text"
            name="address"
            required
            className={inputClass}
            placeholder="Street address"
            value={data.address}
            onChange={(e) => setField("address", e.target.value)}
          />
          <input
            type="text"
            name="zipCode"
            required
            pattern="[0-9]{5}"
            className={inputClass}
            placeholder="ZIP code"
            value={data.zipCode}
            onChange={(e) =>
              setField("zipCode", e.target.value.replace(/[^0-9]/g, "").slice(0, 5))
            }
          />
          <select
            name="insuranceType"
            id="insuranceType"
            required
            className={`${inputClass} cursor-pointer appearance-none`}
            value={data.insuranceType}
            onChange={(e) => setField("insuranceType", e.target.value)}
          >
            <option value="">Select insurance type</option>
            <optgroup label="Personal">
              {INSURANCE_LINES.filter((l) => l.category === "personal").map((l) => (
                <option key={l.id} value={l.formValue}>
                  {l.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Specialty">
              {INSURANCE_LINES.filter((l) => l.category === "specialty").map((l) => (
                <option key={l.id} value={l.formValue}>
                  {l.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Life">
              {INSURANCE_LINES.filter((l) => l.category === "life").map((l) => (
                <option key={l.id} value={l.formValue}>
                  {l.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Commercial">
              {INSURANCE_LINES.filter((l) => l.category === "commercial").map((l) => (
                <option key={l.id} value={l.formValue}>
                  {l.label}
                </option>
              ))}
            </optgroup>
          </select>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              vehicleRequired ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <select
              name="vehicleCount"
              id="vehicleCount"
              className={`${inputClass} cursor-pointer appearance-none`}
              value={data.vehicleCount}
              onChange={(e) => setField("vehicleCount", e.target.value)}
              required={vehicleRequired}
            >
              <option value="">How many vehicles?</option>
              <option value="1">1 Vehicle</option>
              <option value="2">2 Vehicles</option>
              <option value="3">3 Vehicles</option>
              <option value="4">4 Vehicles</option>
              <option value="5+">5+ Vehicles</option>
            </select>
          </div>

          <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3 text-left text-xs leading-relaxed text-slate-400">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 shrink-0 accent-cyan-500"
              required
            />
            <span>
              I agree a licensed insurance professional may contact me about this request. I understand
              this is not an instant bindable quote.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || !consent}
            className="btn-primary mt-2 w-full disabled:opacity-60"
          >
            {submitting ? "Sending request…" : "Submit quote request"}
          </button>
          <p className="text-center font-mono text-[10px] text-slate-600">
            Secure submission · We confirm delivery when possible
          </p>
          <p className="text-center text-[11px] text-slate-600">{QUOTE_DISCLAIMER}</p>
        </form>
      </div>
    </motion.div>
  );
}
