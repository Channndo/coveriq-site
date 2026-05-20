/** Production-critical: CoverIQ lead endpoint — do not change without backend coordination */
export const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyt1mrcdt6HP3uuaNwOQ1FcQKdHk95YK7z7KWph8azpx8HzhVkThX9Ept7IwwYQ2VhD/exec";

/** Consumer accounts (MIRA signups) — google-apps-script/coveriq-user-accounts */
export const USER_ACCOUNTS_WEB_APP_URL =
  (import.meta.env.VITE_USER_ACCOUNTS_WEB_APP_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://script.google.com/macros/s/AKfycbzr7vs2ocU-qN0ak8GensegM_CHoS9LludHePMaNVPG-5P3q46eqhC2TBPwsJasOzir/exec";

/** Licensed producer accounts — google-apps-script/coveriq-agent-accounts */
export const AGENT_ACCOUNTS_WEB_APP_URL =
  (import.meta.env.VITE_AGENT_ACCOUNTS_WEB_APP_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://script.google.com/macros/s/AKfycbzucxSuI3S04zq60X6MgiM2mR9vwWyEmt0qqjWJFxxX2f9mihew5IuQntYONfsrqH6e/exec";

export const SUPPORT_PHONE = "(574) 309-0107";
export const SUPPORT_PHONE_HREF = "tel:5743090107";
export const SUPPORT_EMAIL = "chandler@cover-iq.com";

/** Sole site admin (see src/lib/admin.ts). */
export const SITE_ADMIN_EMAIL = SUPPORT_EMAIL;

/** CoverIQ Exchange — B2B agent portal (github.com/Channndo/coveriq-exchange) */
export const EXCHANGE_PORTAL_URL =
  (import.meta.env.VITE_EXCHANGE_PORTAL_URL as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.VITE_AGENT_PORTAL_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://agents.cover-iq.com";

export const EXCHANGE_LOGIN_URL =
  (import.meta.env.VITE_EXCHANGE_LOGIN_URL as string | undefined)?.replace(/\/$/, "") ||
  (import.meta.env.VITE_AGENT_LOGIN_URL as string | undefined)?.replace(/\/$/, "") ||
  `${EXCHANGE_PORTAL_URL}/login`;

export const EXCHANGE_REGISTER_URL =
  (import.meta.env.VITE_EXCHANGE_REGISTER_URL as string | undefined)?.replace(/\/$/, "") ||
  `${EXCHANGE_PORTAL_URL}/register`;

/** @deprecated Use EXCHANGE_* — kept for existing imports */
export const AGENT_PORTAL_URL = EXCHANGE_PORTAL_URL;
export const AGENT_LOGIN_URL = EXCHANGE_LOGIN_URL;

export const GLOBAL_DISCLAIMER =
  "This content is provided for educational purposes only and should not be interpreted as legal, financial, or coverage advice. Coverage availability, definitions, exclusions, and limits vary by carrier and state. Always refer to your actual insurance policy for exact coverage details.";

export const QUOTE_DISCLAIMER =
  "Submitting this form does not bind coverage or guarantee a price. A licensed insurance professional may contact you by phone, email, or text about your request. By submitting, you consent to this contact and confirm the information is accurate to the best of your knowledge.";
