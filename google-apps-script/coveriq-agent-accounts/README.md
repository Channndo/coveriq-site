# CoverIQ agent accounts — Apps Script

Licensed producers on **agents.cover-iq.com** (Exchange). Separate from quote leads and consumer accounts.

## Setup (no manual spreadsheet)

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Name it `CoverIQ Agent Accounts`.
3. Paste all of `Code.gs` into the editor.
4. Run **`createSpreadsheet`** once → authorize → check **View → Logs** for the sheet URL.
5. **Deploy → Web app** → Execute as **Me**, access **Anyone** → copy `/exec` URL.
6. Add to Netlify: `VITE_AGENT_ACCOUNTS_WEB_APP_URL=<your /exec url>`
