/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXCHANGE_PORTAL_URL?: string;
  readonly VITE_EXCHANGE_LOGIN_URL?: string;
  readonly VITE_EXCHANGE_REGISTER_URL?: string;
  readonly VITE_AGENT_PORTAL_URL?: string;
  readonly VITE_AGENT_LOGIN_URL?: string;
  readonly VITE_MIRA_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
