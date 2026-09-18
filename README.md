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
| `/api/subscribe` | POST `{ email, source? }` → appends to `data/subscribers.json` |

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

Emails are stored in `data/subscribers.json` (empty `[]` committed). The API creates/updates the file on signup. `source` is recorded (`home-newsletter`, `join-page`, `merch`, etc.).

### Swap to Buttondown / ConvertKit / Resend later

Replace the body of `src/app/api/subscribe/route.ts` with a provider call. Sketch:

**Buttondown**

```ts
await fetch("https://api.buttondown.email/v1/subscribers", {
  method: "POST",
  headers: {
    Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, tags: [source] }),
});
```

**ConvertKit**

```ts
await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email,
    tags: [source],
  }),
});
```

**Resend Audiences**

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.contacts.create({
  email,
  audienceId: process.env.RESEND_AUDIENCE_ID!,
});
```

Keep the same request/response shape so `NewsletterForm` does not need changes. Add secrets to `.env.local` (never commit).

## Image attribution (Unsplash)

Hero and destination stills are **Unsplash stock** for mood only. They are **not** Dive Hard footage. Films and thumbnails come from the Dive Hard YouTube channel.

Suggested credit line if you publish publicly:

- Unsplash photographers via `images.unsplash.com` (reef / ocean atmosphere)
- Video thumbnails: YouTube `img.youtube.com` for the listed Dive Hard uploads

## Deploy notes

- File-based `subscribers.json` works on a persistent disk (VPS, Docker volume). On serverless (Vercel), swap to an ESP or database before going live.
- Set `metadataBase` / `SITE.url` in `src/lib/constants.ts` when the production domain is final.

## GitHub

Repo: https://github.com/sanchobendinga/dive-hard-website
