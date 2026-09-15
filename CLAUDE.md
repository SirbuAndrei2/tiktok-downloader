# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (no separate test suite exists)
```

## Architecture

This is a Next.js 16 (App Router) TikTok video downloader. It is **stateless** — no database, no auth, no session storage. All downloads are proxied server-side.

### Request Flow

1. User submits a TikTok URL in `src/components/Downloader.tsx` (client component)
2. `POST /api/download` validates the URL, calls the TikWM API, and returns video metadata (title, cover, HD/SD play URLs, audio URL, author, stats)
3. `GET /api/proxy?url=<cdn-url>&filename=<name>&type=video|audio` proxies the actual file download — only URLs from an explicit allowlist of TikTok/TikWM CDN hostnames are permitted; `type` controls `Content-Type` (defaults to `video/mp4`)
4. `src/components/VideoResult.tsx` renders the result with download buttons that trigger the proxy

Both API routes declare `export const runtime = 'nodejs'`.

### Directory Layout

- `src/app/` — App Router pages and API routes
- `src/app/api/download/` — TikWM API wrapper
- `src/app/api/proxy/` — CDN proxy with hostname allowlist
- `src/app/[locale]/guide/` — guide pages. Translated ones (watermark, mp3, iPhone, Android) render for every locale; English-only ones (mp4, SnapTik alternative, Chrome, GIF, playlist, private video) call `notFound()` when `locale !== 'en'`. English-only guides must live here too — a root `src/app/guide/` route gets rewritten by the i18n middleware to `/en/guide/...` and 404s, and has no `<html>` layout
- `src/lib/seo.ts` — `BASE` and `OG_IMAGE`; every page that sets its own `openGraph` must include `images: [OG_IMAGE]` (metadata merges shallowly, so the layout's image is lost otherwise). The image is the static `public/og-image.png` (1200×630)
- `src/components/` — React components
- `src/components/ui/` — shadcn/ui primitives (badge, button, card, dialog, input, separator, tooltip)
- `src/components/ads/` — Ad network components (Google AdSense `AdUnit` + Monetag `MonetagTags`)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Styling

Tailwind CSS v4 with PostCSS. The design uses:
- **Only dark mode** — no light mode toggle
- Custom oklch-based design tokens defined in `src/app/globals.css`: surface colors (`s0`–`s4`), text hierarchy (`t1`–`t4`), brand colors (pink `#ff2d55`, orange `#ff8c42`, cyan `#00e5ff`, purple `#c084fc`)
- Utility classes: `glass` (glassmorphism), `btn-brand` (gradient button), `gradient-text`, `dl-btn`

### Internationalisation (i18n)

The site uses `next-intl` with App Router. All content pages live under `src/app/[locale]/`. Legal pages (`/privacy`, `/terms`, `/dmca`, `/disclaimer`) are excluded from locale routing and stay at the root — they render English content for all visitors.

- Locale routing config: [src/i18n/routing.ts](src/i18n/routing.ts) — locales `['en', 'de', 'ar']`, prefix `as-needed` (English at `/`, German at `/de`, Arabic at `/ar`, RTL)
- Translations: [messages/en.json](messages/en.json), [messages/de.json](messages/de.json), [messages/ar.json](messages/ar.json)
- Middleware: [src/middleware.ts](src/middleware.ts) — Edge Middleware for i18n routing (required by OpenNext Cloudflare)
- Server components use `getTranslations({ locale, namespace })`, client components use `useTranslations(namespace)`
- Adding a new locale: add it to `routing.locales`, create `messages/<locale>.json`, add to `hreflang` alternates in `[locale]/layout.tsx` and `sitemap.ts`
- Translation arrays (FAQ, features, steps) are stored as JSON arrays in messages files and accessed via `t.raw('key')`

### UI Components

`src/components/ui/` contains shadcn/ui primitives. The project also depends on `@base-ui/react` (headless primitives from the Base UI library) alongside shadcn. Use shadcn components for new UI work unless a Base UI primitive is already in use for that pattern.

### Sitemap Route Categories

`src/app/sitemap.ts` has three distinct arrays — keep them in sync when adding pages:
- `CONTENT_ROUTES` — translated pages; emitted once per locale (`/`, `/de`, `/ar` — locale roots without trailing slash, since `/de/` 308-redirects)
- `NEW_GUIDE_ROUTES` — English-only guides; emitted once, no locale variant
- `LEGAL_ROUTES` — root legal pages; English-only, no locale variant

### Key Constraints

- **No environment variables** — the TikWM API endpoint and all CDN allowlist entries are hardcoded. The production domain (`tokdown.org`) and ad publisher IDs are also hardcoded in source.
- **No testing framework** — there are no unit or integration tests.
- Deployed on Cloudflare Workers via OpenNext (`npm run deploy`, config in `wrangler.jsonc`); `@vercel/analytics` is still wired into the locale layout.
- TikWM free tier has a daily request quota (it appears to be per egress IP, which Cloudflare Workers share — the same request succeeds from a local machine while production gets "Free Api Limit"), so `/api/download` maps TikWM's "Free Api Limit" reply to a friendly 503.
- When adding new CDN hosts for proxied downloads, update the allowlist in `src/app/api/proxy/route.ts`.
- When adding new image domains, update `remotePatterns` in `next.config.ts`.
- `src/app/sitemap.ts` and `src/app/robots.ts` are code-generated — update them if adding new public routes.
