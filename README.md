# CoverIQ Site

Education-first InsurTech platform with an embedded lead quote engine.

## Stack

- React 19 + Vite 6
- Tailwind CSS 4
- Framer Motion
- React Router

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Preview (staging build)

```bash
npm run start
```

Open [http://localhost:4173](http://localhost:4173)

If a preview link from an agent does not load, run the command above in your own terminal — background preview processes often exit before the server is reachable.

## Production-critical: Quote engine

The quote form in `src/components/quote/QuoteEngine.tsx` preserves the original submission contract:

- **Endpoint:** Google Apps Script `WEB_APP_URL` in `src/lib/constants.ts`
- **Fields:** `firstName`, `lastName`, `email`, `phone`, `address`, `zipCode`, `insuranceType`, `vehicleCount`, `timestamp`, `utm_source`, `utm_medium`, `utm_campaign`
- **Method:** `POST` with `mode: "no-cors"`
- **Redirect:** `/thank-you` on success or error

Legacy static pages are kept as `legacy-index.html` and `legacy-thank-you.html` for reference.

## User accounts spreadsheet (separate from quotes)

- **Script:** `google-apps-script/coveriq-user-accounts/` — deploy to its own Google Sheet.
- **Site constant:** `USER_ACCOUNTS_WEB_APP_URL` / `VITE_USER_ACCOUNTS_WEB_APP_URL` in `src/lib/constants.ts`
- **Client helper:** `submitUserAccount()` in `src/lib/userAccounts.ts`
- **Fields:** `firstName`, `lastName`, `email`, `phone`, `accountType` (`consumer` | `agent`), `action`, `status`, `source`, `timestamp`, `utm_*`

Do not use the quote `WEB_APP_URL` for account rows.

## Insurance line parity

Coverage lines align with Chandler Hill Agency funnel options plus commercial lines. See `src/lib/insuranceLines.ts`.

## Deploy

Build output is in `dist/`. Configure SPA rewrites (see `vercel.json`) so `/thank-you` and `/glossary` routes work.
