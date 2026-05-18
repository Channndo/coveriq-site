# CoverIQ user accounts — Google Apps Script

Use this for a **separate spreadsheet** from the quote-lead script (`WEB_APP_URL` on the marketing site). It logs consumer or agent account signups / interest from CoverIQ (or any client that POSTs the same JSON shape).

## Setup

1. In Google Drive, create a new spreadsheet (e.g. **CoverIQ User Accounts**).
2. **Extensions → Apps Script**, delete the default `Code.gs` content, and paste everything from `Code.gs` in this folder.
3. Optional: set `CONFIG.SPREADSHEET_ID` to the sheet ID from the URL (`/d/THIS_PART/edit`). If you opened Apps Script from the spreadsheet, you can leave it empty.
4. Adjust `CONFIG.EMAIL_RECIPIENTS` if needed.
5. In the Apps Script editor, run **`setupSheetHeaders`** once (authorize when prompted).
6. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Copy the `/exec` URL and add it to the site:
   - `.env`: `VITE_USER_ACCOUNTS_WEB_APP_URL=https://script.google.com/macros/s/…/exec`
   - Or `USER_ACCOUNTS_WEB_APP_URL` in `src/lib/constants.ts` after deploy.

## Test

- **GET** the deploy URL in a browser — should return `{ "ok": true, "message": "CoverIQ user accounts endpoint is running." }`.
- **POST** sample JSON (curl or Postman):

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "(574) 555-0100",
  "accountType": "consumer",
  "action": "signup",
  "source": "cover-iq.com",
  "timestamp": "2026-05-17T12:00:00.000Z",
  "utm_source": "direct"
}
```

## Sheet columns

| Column | Description |
|--------|-------------|
| Account ID | `CIQ-ACC-YYYYMMDD-0001` |
| Date / Time | Server timezone |
| First / Last / Email / Phone | Contact |
| Account Type | `consumer` or `agent` |
| Status | Default `pending` |
| Action | e.g. `signup` |
| Source | Site or campaign |
| Page URL | Optional landing page |
| UTM Source / Medium / Campaign | Marketing attribution |
| Notes | Optional free text |
| Client Timestamp | ISO string from client |

## Site integration

`src/lib/userAccounts.ts` exposes `submitUserAccount()` — same `no-cors` POST pattern as the quote form. Wire it when you add a consumer signup or account-interest form. **Do not** point this URL at the quote leads deployment.

## Exchange (agents.cover-iq.com)

Producer login and registration stay on **CoverIQ Exchange** (Supabase). Use this sheet when you want a spreadsheet audit trail from the marketing site or a future signup flow—not as a replacement for Exchange auth.
