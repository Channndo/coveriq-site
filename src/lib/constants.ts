/** Production-critical: CoverIQ lead endpoint — do not change without backend coordination */
export const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyt1mrcdt6HP3uuaNwOQ1FcQKdHk95YK7z7KWph8azpx8HzhVkThX9Ept7IwwYQ2VhD/exec";

/** Consumer accounts (MIRA signups) — google-apps-script/coveriq-user-accounts */
export const USER_ACCOUNTS_WEB_APP_URL =
  (import.meta.env.VITE_USER_ACCOUNTS_WEB_APP_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://script.google.com/macros/s/AKfycbxg_X7kTnvTxE7XSZPc-55mvfwOjjrl_oEY_abxxMD4iT_vHDIxPKPmlHuDLI9aXaTj/exec";

/** Licensed producer accounts — google-apps-script/coveriq-agent-accounts */
export const AGENT_ACCOUNTS_WEB_APP_URL =
  (import.meta.env.VITE_AGENT_ACCOUNTS_WEB_APP_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://script.google.com/macros/s/AKfycbw-qeYdrL5WNhUtejTJildMepB1uVuVv0M3v7oPVwEKMnOpdys3APPkJs6wRL8ZSK7K/exec";

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
  "Submitting a quote request does not bind coverage. Quotes are estimates subject to carrier underwriting. By submitting, you agree to be contacted about your request.";
