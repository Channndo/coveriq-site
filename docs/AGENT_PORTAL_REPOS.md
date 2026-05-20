# CoverIQ agent portal — which repo is canonical?

## Canonical (production target)

**Path:** `other ventures/coveriq_parent/AgentIQ`  
**Deploy:** Vercel → `agents.cover-iq.com`  
**Stack:** Next.js App Router, Supabase Auth + RLS, Stripe webhooks

Use this repo for agent portal features, admin verification, leads, billing, and Supabase migrations.

## Legacy / snapshot copy (do not treat as source of truth)

**Path:** `other ventures/CoverIQ/coveriq-site/coveriq-exchange`

Embedded inside the consumer Netlify monorepo. It was used during early Exchange work and may contain useful SQL snippets or experiments, but **AgentIQ is the maintained application**.

Before copying code from `coveriq-exchange`, prefer porting into `AgentIQ` with review.

## Consumer site (separate app)

**Path:** `other ventures/CoverIQ/coveriq-site` (root, not `coveriq-exchange/`)  
**Deploy:** Netlify → `cover-iq.com`  
**Role:** Education, quote intake, MIRA, consumer accounts (Syntrix auth)

Do not merge consumer and agent apps into one deployment.
