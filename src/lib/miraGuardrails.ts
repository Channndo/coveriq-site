import type { MiraMessage } from "./miraApi";

/** Sent to Mindroot / Syntrix on every chat request (via proxy). */
export const MIRA_SYSTEM_PROMPT = `You are MIRA (Machine Intelligence & Risk Advisor) embedded in CoverIQ — an education-first insurance platform.

SCOPE — You may ONLY discuss topics directly related to:
- Insurance of all types (personal, commercial, life, health, property, casualty, specialty, reinsurance, etc.)
- Risk management, insurable risk, loss control, and claims concepts
- Finance when tied to insurance, coverage, or household/ business financial protection (e.g., deductibles, self-insurance, retirement income needs for life insurance, mortgage/escrow insurance requirements)
- Insurance regulation, licensing, and market structure at a high educational level
- CoverIQ's educational content (coverage types, glossary terms, how quotes generally work)

OUT OF SCOPE — Refuse politely and do not answer questions about: general trivia, entertainment, recipes, sports, politics unrelated to insurance regulation, medical diagnosis, legal representation, specific investment or crypto trading advice, writing unrelated code or homework, relationships, violence, or any topic with no clear insurance/finance/risk connection.

STYLE:
- Plain language, educational tone; never claim to bind coverage or replace a licensed agent
- Do not recommend a specific carrier or policy; explain concepts and tradeoffs
- If the user asks something out of scope, briefly decline and suggest an in-scope insurance question

You are not a lawyer, doctor, or licensed producer. Remind users to verify with policy documents and licensed professionals when appropriate.`;

export const MIRA_OFF_TOPIC_REPLY =
  "I can only help with insurance, risk, and related financial protection topics on CoverIQ. Try asking about coverage types, deductibles, liability, claims, or how policies generally work — or use one of the suggested prompts above.";

/** High-signal off-topic requests (checked first). */
const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\b(write|generate|create)\s+(me\s+)?(a\s+)?(poem|story|song|essay|code|script|app)\b/i,
  /\b(recipe|ingredients|how to cook|restaurant recommendation)\b/i,
  /\b(movie|tv show|celebrity|sports score|fantasy football|nba|nfl)\b/i,
  /\b(homework|solve this math|debug my|python|javascript|typescript|react)\b/i,
  /\b(crypto|bitcoin|stock pick|day trade|gambling|betting)\b/i,
  /\b(dating|relationship advice|therapy|diagnose my)\b/i,
  /\b(who won the|president|election)\b(?!.*\b(insurance|regulat|NAIC|department)\b)/i,
];

/** Insurance, risk, and adjacent finance vocabulary. */
const ON_TOPIC_PATTERNS: RegExp[] = [
  /\b(insurance|insurer|insured|policy|policies|premium|deductible|copay|coinsurance)\b/i,
  /\b(liability|coverage|claim|claims|underwriting|actuarial|risk|peril|exclusion|indemnity)\b/i,
  /\b(collision|comprehensive|umbrella|endorsement|rider|deductibles?|copayment)\b/i,
  /\b(homeowners?|renters?|auto|vehicle|flood|earthquake|wildfire|hurricane)\b/i,
  /\b(life insurance|health (plan|insurance)|medicare|medicaid|disability|long-term care)\b/i,
  /\b(workers.? comp|commercial lines?|personal lines?|surety|bond|reinsurance)\b/i,
  /\b(agent|producer|broker|adjuster|NAIC|department of insurance|licen[cs]e)\b/i,
  /\b(SR-?22|PIP|UIM|uninsured motorist|subrogation|replacement cost|ACV|actual cash value)\b/i,
  /\b(quote|quotes|rate|rates|carrier|underwriter|declaration page|dec page|COI)\b/i,
  /\b(finance|financial|mortgage|escrow|loan|interest|inflation|asset protection|estate plan)\b/i,
  /\b(mira|coveriq|cover-iq|glossary|facts textbook|deductible|premium)\b/i,
];

const FOLLOW_UP_PATTERNS: RegExp[] = [
  /^(yes|no|yep|nope|ok|okay|thanks|thank you|please|sure|got it)[\s!.?]*$/i,
  /^(can you|could you|please)\s+(explain|clarify|elaborate|expand|repeat)/i,
  /^(what about|how about|why|tell me more|more detail|go on|and what)/i,
  /^(what('s| is)|how('s| do| does)|when|where|who)\s/i,
];

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

/**
 * Client-side gate before calling MIRA.
 * @param priorOnTopic — any earlier user message in this session was on-topic
 */
export function assessMiraUserMessage(
  text: string,
  priorOnTopic: boolean
): { allowed: boolean; reason?: "off_topic" } {
  const trimmed = text.trim();
  if (!trimmed) return { allowed: false, reason: "off_topic" };

  if (matchesAny(trimmed, OFF_TOPIC_PATTERNS)) {
    return { allowed: false, reason: "off_topic" };
  }

  if (matchesAny(trimmed, ON_TOPIC_PATTERNS)) {
    return { allowed: true };
  }

  if (priorOnTopic) {
    if (matchesAny(trimmed, FOLLOW_UP_PATTERNS)) return { allowed: true };
    if (trimmed.length <= 120 && !matchesAny(trimmed, OFF_TOPIC_PATTERNS)) {
      return { allowed: true };
    }
  }

  return { allowed: false, reason: "off_topic" };
}

/** Payload for Syntrix — system instruction + conversation (user/assistant only). */
export function buildMiraChatPayload(messages: MiraMessage[]): {
  messages: Array<{ role: string; content: string }>;
  systemPrompt: string;
} {
  const conversation = messages.filter((m) => m.role === "user" || m.role === "assistant");
  return {
    systemPrompt: MIRA_SYSTEM_PROMPT,
    messages: [{ role: "system", content: MIRA_SYSTEM_PROMPT }, ...conversation],
  };
}

export function assessConversationOnTopic(messages: MiraMessage[]): boolean {
  return messages.some(
    (m) => m.role === "user" && assessMiraUserMessage(m.content, false).allowed
  );
}
