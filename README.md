# Dive Hard Website

Marketing site for **Dive Hard** — underwater cinema by [Kabir Teja](https://www.youtube.com/@DiveHard).

Stack: **Next.js (App Router) · TypeScript · Tailwind CSS v4**

## Local path

`/workspace/dive-hard-website`

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero, about, Watch grid, destinations, newsletter, merch + course teases |
| `/join` | Newsletter signup page |
| `/merch` | Placeholder products + notify interest |
| `/api/subscribe` | POST `{ email, source? }` → Google Sheet via Apps Script webhook (local JSON fallback in dev) |

Homepage Watch order (exact YouTube IDs):

1. Raja Ampat 2024 4K — `db4VJ0LFG0I`
2. Tubbataha 2024 4K — `2V_DqhoQEj4`
3. Socorro Dec 2025 8K — `Nta1ImiWHaI`
4. Cocos 2025 8K — `VSbmOX4Vgh8`

## Brand

- Wordmark: **DIVE HARD.** (SVG/text in header; PNG at `public/brand/logo-dive-hard.png`)
- Palette: black / white chrome, deep navy, turquoise–teal
- Channels: [YouTube @DiveHard](https://www.youtube.com/@DiveHard) · [Instagram @kabirteja](https://www.instagram.com/kabirteja/) · `divehardcreative@gmail.com`

## Newsletter storage

**Source of truth:** Google Sheet titled **Dive Hard — Email list** (Sheet ID `1PYrNDAmtKJ8Sz7gtOThPrjKTciAtJSpg8emSCfh37Ks`).

Signups POST to `/api/subscribe` with `{ email, source? }`. In production the route forwards `{ secret, email, source }` to a Google Apps Script webhook, which appends a row to the Sheet. `source` is recorded (`home-newsletter`, `join-page`, `merch`, etc.). Duplicate emails (webhook `message` containing “already”) return the same success UX as a new signup.

### Environment variables

Set these in `.env.local` (local) or your host’s env (e.g. Vercel). Never commit real secrets. See `.env.example`.

| Variable | Purpose |
|----------|---------|
| `SHEETS_WEBHOOK_URL` | Apps Script web app URL |
| `SHEETS_WEBHOOK_SECRET` | Shared secret the script expects in the JSON body |

Both are **required in production**. In development, if either is missing, the API falls back to appending `data/subscribers.json` (empty `[]` committed) so local signup still works without the webhook.

## Image attribution (Unsplash)

Hero and destination stills are **Unsplash stock** for mood only. They are **not** Dive Hard footage. Films and thumbnails come from the Dive Hard YouTube channel.

Suggested credit line if you publish publicly:

- Unsplash photographers via `images.unsplash.com` (reef / ocean atmosphere)
- Video thumbnails: YouTube `img.youtube.com` for the listed Dive Hard uploads

## Deploy notes

- Set `SHEETS_WEBHOOK_URL` and `SHEETS_WEBHOOK_SECRET` on the host before going live; production will not accept signups without them.
- Local `data/subscribers.json` is a development fallback only — do not rely on it on serverless (Vercel).
- Set `metadataBase` / `SITE.url` in `src/lib/constants.ts` when the production domain is final.

## GitHub

Repo: https://github.com/sanchobendinga/dive-hard-website
