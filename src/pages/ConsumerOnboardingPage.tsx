import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthShell } from "../components/auth/AuthShell";
import { BubbleSelect } from "../components/onboarding/BubbleSelect";
import { useConsumerAuth } from "../context/ConsumerAuthContext";
import { CONSUMER_ONBOARDING_STEPS } from "../lib/consumerOnboarding";

export function ConsumerOnboardingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, completeOnboarding } = useConsumerAuth();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  const fromMira = searchParams.get("from") === "mira";
  const current = CONSUMER_ONBOARDING_STEPS[step];
  const isLast = step === CONSUMER_ONBOARDING_STEPS.length - 1;

  if (!user) {
    navigate("/signup", { replace: true });
    return null;
  }

  const selected = (selections[current.id] as string[] | undefined) || [];
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : [];

  const canNext = current.multi ? selectedArr.length > 0 : selectedArr.length === 1;

  const finish = async (finalSelections: Record<string, string | string[]>) => {
    setSubmitting(true);
    await completeOnboarding(finalSelections);
    setSubmitting(false);
    navigate(fromMira ? "/?openMira=1" : "/", { replace: true });
  };

  const next = () => {
    if (!canNext) return;
    const value = current.multi ? selectedArr : selectedArr[0];
    const nextSelections = { ...selections, [current.id]: value };
    setSelections(nextSelections);
    if (isLast) {
      void finish(nextSelections);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <AuthShell
      title="Personalize your experience"
      subtitle={`Step ${step + 1} of ${CONSUMER_ONBOARDING_STEPS.length} — tap the options that fit you.`}
      miraNote={fromMira}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          className="mt-6"
        >
          <h2 className="mb-2 text-center font-display text-lg font-semibold text-white">{current.title}</h2>
          {current.subtitle && (
            <p className="mb-4 text-center text-sm text-slate-500">{current.subtitle}</p>
          )}
          <BubbleSelect
            options={current.options}
            selected={selectedArr}
            multi={current.multi}
            onChange={(ids) => setSelections((prev) => ({ ...prev, [current.id]: current.multi ? ids : ids[0] }))}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button type="button" className="btn-secondary flex-1" onClick={() => setStep((s) => s - 1)}>
            Back
          </button>
        )}
        <button
          type="button"
          className="btn-primary flex-1"
          disabled={!canNext || submitting}
          onClick={next}
        >
          {submitting ? "Saving…" : isLast ? "Finish" : "Continue"}
        </button>
      </div>
    </AuthShell>
  );
}
