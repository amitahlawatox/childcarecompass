# Childcare Compass

A UK childcare cost calculator and Ofsted-registered nursery finder. Honest, zero-data-capture, fast.

**Live URL (once deployed):** `https://childcarecompass.co.uk`

---

## What's in this folder

A complete Next.js 15 application with:

- **Homepage** (`/`) — Brand, value props, finder & calculator previews
- **Cost calculator** (`/calculator`) — Six inputs → real monthly bill, with full breakdown
- **Nursery finder** (`/find`) — Postcode-based search with Ofsted ratings (sample data; real Ofsted CSV integration is Phase 1.5)
- **How it works** (`/how-it-works`) — Plain-English guide to UK childcare funding rules
- **Privacy** (`/privacy`) — Our zero-data promise, in writing
- **Terms** (`/terms`) — Legal disclaimer that this is estimate, not advice

## Tech stack

- Next.js 15 (App Router) + React 18
- TypeScript (strict mode, type-checks cleanly)
- Tailwind CSS with custom design tokens
- Fonts: Fraunces (display) + IBM Plex Sans (body) via next/font/google
- Zero database, zero auth, zero user data stored
- Free APIs: postcodes.io for postcode geocoding

## To deploy to Vercel (the easy path)

1. **Upload these files to your GitHub repo** `github.com/amitahlawatox/childcarecompass`:
   - Go to the repo on github.com
   - If the repo is empty, click **"uploading an existing file"**
   - Drag every file and folder from this ZIP into the browser
   - Type `Initial commit` as the message, click **Commit changes**

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Click **Import** next to your `childcarecompass` repo
   - Vercel will detect Next.js automatically — accept the defaults
   - Click **Deploy**
   - Site goes live in ~60 seconds at `childcarecompass-xxx.vercel.app`

3. **Add your custom domain:**
   - In the Vercel project: **Settings → Domains → Add**
   - Enter `childcarecompass.co.uk`
   - Vercel will show you 1–2 DNS records to add at GoDaddy
   - Paste those into GoDaddy: **My Products → DNS → Manage DNS**
   - Domain is live within 5–60 minutes

That's it. Every future code update follows the same flow: new files go into GitHub, Vercel auto-redeploys.

## Rule updates

The single source of truth for UK childcare funding rules lives in `lib/funding-rules.ts`. Update this file when government rules change. The "Rules last reviewed" date is `RULES_LAST_REVIEWED` at the top.

Set a calendar reminder for the first of every quarter to check gov.uk for changes.

## Real Ofsted data integration

For Phase 1.5: download the Ofsted childcare register monthly CSV from gov.uk, transform it to the `Nursery` interface in `lib/sample-nurseries.ts`, and replace the sample data. The data shape and finder logic are already production-ready.
