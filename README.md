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

## Your projects (CoverIQ)

| App | GitHub repo | Host | Production URL | Status |
|-----|-------------|------|----------------|--------|
| **Marketing site** | [Channndo/coveriq-site](https://github.com/Channndo/coveriq-site) | **Netlify** | **https://cover-iq.com** | Live |
| **Exchange (agents)** | [Channndo/coveriq-exchange](https://github.com/Channndo/coveriq-exchange) | **Vercel** | **https://agents.cover-iq.com** | DNS + deploy needed |

DNS for `cover-iq.com` is on **Cloudflare** (`sandy.ns.cloudflare.com`, `abdullah.ns.cloudflare.com`). You do **not** buy `agents.cover-iq.com` separately — add a **CNAME** for `agents` after Vercel is set up.

### Fix `agents.cover-iq.com` (NXDOMAIN)

1. **Vercel** → [vercel.com/new](https://vercel.com/new) → Import **`Channndo/coveriq-exchange`** → project name **`coveriq-exchange`**.
2. Add env vars from that repo’s `.env.example` (Supabase, etc.).
3. **Vercel** → project **`coveriq-exchange`** → **Settings** → **Domains** → add **`agents.cover-iq.com`**.
4. **Cloudflare** → zone **`cover-iq.com`** → **DNS** → add record Vercel shows, e.g.:
   - Type: `CNAME` | Name: `agents` | Target: `cname.vercel-dns.com` (use Vercel’s exact value)
5. **Supabase** → Auth URLs → `https://agents.cover-iq.com` and `https://agents.cover-iq.com/api/auth/callback`.

Until step 4 propagates, use the **`.vercel.app`** URL from Vercel (e.g. `https://coveriq-exchange.vercel.app`) for testing `/login`.

### Netlify env (site **coveriq-site** → **cover-iq.com**)

In [Netlify](https://app.netlify.com) → your **coveriq-site** site → **Site configuration** → **Environment variables**:

```bash
# Target (after DNS works):
VITE_EXCHANGE_PORTAL_URL=https://agents.cover-iq.com
VITE_EXCHANGE_LOGIN_URL=https://agents.cover-iq.com/login
VITE_EXCHANGE_REGISTER_URL=https://agents.cover-iq.com/register

# Temporary (only until agents.cover-iq.com resolves — use URL from Vercel → coveriq-exchange):
# VITE_EXCHANGE_PORTAL_URL=https://coveriq-exchange.vercel.app
# VITE_EXCHANGE_LOGIN_URL=https://coveriq-exchange.vercel.app/login
# VITE_EXCHANGE_REGISTER_URL=https://coveriq-exchange.vercel.app/register
```

Redeploy **coveriq-site** after changing env vars.
