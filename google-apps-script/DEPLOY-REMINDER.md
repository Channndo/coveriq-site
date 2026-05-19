# ⚠️ REDEPLOY BOTH GOOGLE APPS SCRIPTS

After any change to `Code.gs` in this folder:

## User accounts (`coveriq-user-accounts/`)
1. Open [script.google.com](https://script.google.com) → **CoverIQ User Accounts**
2. Paste updated `Code.gs`
3. Run **`createSpreadsheet()`** once (adds new columns to header row — existing data rows unchanged)
4. **Deploy → Manage deployments → Edit → New version → Deploy**
5. Copy new `/exec` URL if it changed → update `VITE_USER_ACCOUNTS_WEB_APP_URL` on Netlify

## Agent accounts (`coveriq-agent-accounts/`)
1. Open **CoverIQ Agent Accounts** project
2. Paste updated `Code.gs`
3. Run **`createSpreadsheet()`** once
4. **New version → Deploy**
5. Update `VITE_AGENT_ACCOUNTS_WEB_APP_URL` on Vercel (coveriq-exchange)

Current URLs in repo `src/lib/constants.ts` (marketing site) — update after redeploy if needed.
