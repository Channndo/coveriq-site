# CoverIQ user accounts — Apps Script

Consumer signups (MIRA) on **cover-iq.com**. Separate from quote leads and agent accounts.

## Setup (no manual spreadsheet)

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Name it `CoverIQ User Accounts`.
3. Paste all of `Code.gs` into the editor (replace default code).
4. Select **`createSpreadsheet`** in the run dropdown → **Run** → authorize.
5. **View → Logs** — copy the spreadsheet URL (also appears in your Google Drive).
6. **Deploy → New deployment → Web app** → Execute as **Me**, access **Anyone** → copy the `/exec` URL.
7. Add to Netlify: `VITE_USER_ACCOUNTS_WEB_APP_URL=<your /exec url>`

Run `createSpreadsheet()` again anytime to refresh headers (won’t duplicate the file).
