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
- `src/app/[locale]/guide/` — locale-aware guide pages (watermark removal, mp3) — included in sitemap for both `en` and `de`
- `src/app/guide/` — English-only guide pages (mp4, iPhone, Android, SnapTik alternative) — not locale-routed, only in sitemap once
- `src/components/` — React components
- `src/components/ui/` — shadcn/ui primitives (badge, button, card, dialog, input, separator, tooltip)
- `src/components/ads/` — Ad network components (Monetag)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Styling

Tailwind CSS v4 with PostCSS. The design uses:
- **Only dark mode** — no light mode toggle
- Custom oklch-based design tokens defined in `src/app/globals.css`: surface colors (`s0`–`s4`), text hierarchy (`t1`–`t4`), brand colors (pink `#ff2d55`, orange `#ff8c42`, cyan `#00e5ff`, purple `#c084fc`)
- Utility classes: `glass` (glassmorphism), `btn-brand` (gradient button), `gradient-text`, `dl-btn`

### Internationalisation (i18n)

The site uses `next-intl` with App Router. All content pages live under `src/app/[locale]/`. Legal pages (`/privacy`, `/terms`, `/dmca`, `/disclaimer`) are excluded from locale routing and stay at the root — they render English content for all visitors.

- Locale routing config: [src/i18n/routing.ts](src/i18n/routing.ts) — locales `['en', 'de']`, prefix `as-needed` (English at `/`, German at `/de/`)
- Translations: [messages/en.json](messages/en.json) and [messages/de.json](messages/de.json)
- Proxy (middleware): [src/proxy.ts](src/proxy.ts) — Next.js 16 renamed `middleware.ts` to `proxy.ts`
- Server components use `getTranslations({ locale, namespace })`, client components use `useTranslations(namespace)`
- Adding a new locale: add it to `routing.locales`, create `messages/<locale>.json`, add to `hreflang` alternates in `[locale]/layout.tsx` and `sitemap.ts`
- Translation arrays (FAQ, features, steps) are stored as JSON arrays in messages files and accessed via `t.raw('key')`

### UI Components

`src/components/ui/` contains shadcn/ui primitives. The project also depends on `@base-ui/react` (headless primitives from the Base UI library) alongside shadcn. Use shadcn components for new UI work unless a Base UI primitive is already in use for that pattern.

### Sitemap Route Categories

`src/app/sitemap.ts` has three distinct arrays — keep them in sync when adding pages:
- `CONTENT_ROUTES` — locale-aware pages under `[locale]/`; emitted once per locale (`/` and `/de/`)
- `NEW_GUIDE_ROUTES` — English-only root guide pages; emitted once, no `/de/` variant
- `LEGAL_ROUTES` — root legal pages; English-only, no locale variant

### Key Constraints

- **No environment variables** — the TikWM API endpoint and all CDN allowlist entries are hardcoded. The production domain (`tokdown.org`) and ad publisher IDs are also hardcoded in source.
- **No testing framework** — there are no unit or integration tests.
- Deployed on Vercel; `@vercel/analytics` is wired into the root layout.
- When adding new CDN hosts for proxied downloads, update the allowlist in `src/app/api/proxy/route.ts`.
- When adding new image domains, update `remotePatterns` in `next.config.ts`.
- `src/app/sitemap.ts` and `src/app/robots.ts` are code-generated — update them if adding new public routes.
