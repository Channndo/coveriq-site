/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXCHANGE_PORTAL_URL?: string;
  readonly VITE_EXCHANGE_LOGIN_URL?: string;
  readonly VITE_EXCHANGE_REGISTER_URL?: string;
  readonly VITE_AGENT_PORTAL_URL?: string;
  readonly VITE_AGENT_LOGIN_URL?: string;
  readonly VITE_MIRA_API_BASE?: string;
  readonly VITE_SYNTRIX_API_URL?: string;
  readonly VITE_USER_ACCOUNTS_WEB_APP_URL?: string;
  readonly VITE_AGENT_ACCOUNTS_WEB_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
