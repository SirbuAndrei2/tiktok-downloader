# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install        # node_modules is not checked in; AGENTS.md's node_modules/next/dist/docs only exists after this
npm run dev        # Dev server at localhost:3000
npm run build      # Production build — also the only type check (there is no tsc script)
npm run lint       # ESLint flat config (eslint-config-next core-web-vitals + typescript)
npm run build:cf   # OpenNext Cloudflare build → .open-next/
npm run deploy     # build:cf + wrangler deploy to Cloudflare Workers
```

There is no test framework and no test suite.

**Deploys happen on push.** The `tiktok-downloader` Worker is connected to GitHub (Workers Builds): every push to `main` builds and deploys. Keep the working tree committed and pushed, otherwise the next build publishes whatever is on GitHub over the live site. The build image runs **npm 10**, so regenerate `package-lock.json` with `npx npm@10 install --package-lock-only` after dependency changes (an npm 11 lock fails `npm ci` there with "Missing: … from lock file"). `wrangler.jsonc` sets `workers_dev: false` / `preview_urls: false` (site only on `tokdown.org`) and enables Workers Logs. `www-redirect/` is a separate Worker (`tokdown-www-redirect`, custom domain `www.tokdown.org`, 301 to the apex), deployed by hand with `npx wrangler deploy -c www-redirect/wrangler.jsonc`.

## Architecture

Next.js 16 (App Router) TikTok video downloader, deployed on Cloudflare Workers via OpenNext (`wrangler.jsonc`, `open-next.config.ts`). It is **stateless** — no database, no auth, no sessions. All downloads are proxied server-side.

### Request Flow

1. A `Downloader` instance (client component; `platform` prop only changes copy and the input id) posts `{ url }` to `POST /api/download`
2. `src/app/api/download/route.ts` detects the network from the hostname (`src/lib/providers/detect.ts`) and dispatches to a provider in `src/lib/providers/`, all returning the same `MediaResult` shape (`types.ts`):
   - `tiktok.ts` — TikWM API (`hd=1`, no watermark); photo/slideshow posts come back with `images[]` → `isPhoto`. When TikWM answers its quota 503, it falls back to `tiktok-web.ts`, which parses the public video page's `__UNIVERSAL_DATA_FOR_REHYDRATION__` JSON: watermarked renditions (flagged `watermarked: true`, UI shows "With watermark" + a note) whose CDN needs the page cookies, so the result carries `cookie` and `VideoResult` appends it as `ck=` to `/api/proxy`, which forwards it **only** to tiktok/tiktokcdn hosts. `TIKTOK_FORCE_WEB=1` forces the fallback for local testing
   - `twitter.ts` — public syndication endpoint `cdn.syndication.twimg.com/tweet-result` with the react-tweet token derivation; no API key. Picks the highest-bitrate MP4, photo tweets become an image gallery, `t.co` links are resolved
   - `facebook.ts` — login-free video plugin embed (`facebook.com/plugins/video.php`) which inlines `hd_src`/`sd_src`; title/cover scraped from the watch page as best effort. Private, group, age-gated and live videos fail with a 404 message
   - `instagram.ts` — best effort only (embed + og: tags). Instagram login-walls data-centre IPs, so it answers 503 most of the time. **Wired into the API but no page links to it**; it needs a real upstream (e.g. a self-hosted Cobalt instance) before an `/instagram-reels-downloader` page is published
   - `cobalt.ts` — optional upstream, enabled only when the Worker has `COBALT_API_URL` (+ optional `COBALT_API_KEY`) set (`wrangler.jsonc` `vars` / `wrangler secret put`). The route tries cobalt **first** for Facebook/Instagram and as a **fallback** for TikTok/Twitter
   Provider errors are `ProviderError(message, status, retryAfter?)`; TikWM's "Free Api Limit" becomes a 503 with `Retry-After`.

   **Egress reality on Cloudflare Workers (measured 2026-10-20 with a scratch `wrangler dev --remote` probe):** Facebook serves a login wall to Cloudflare IPs for every endpoint (plugin embed, m., video/embed, mbasic, watch page), so `facebook.ts` only works from a non-datacentre egress and answers 503 "Facebook is temporarily blocking our servers" in prod; TikWM's free quota is shared across all Workers (503 most of the day); TikTok's own page JSON (`__UNIVERSAL_DATA_FOR_REHYDRATION__`) is readable from Workers but its video URLs return 403 even with the page cookies, only `music.playUrl` is fetchable; Twitter's syndication endpoint works from Workers. The structural fix for TikTok quota + Facebook + Instagram is one self-hosted cobalt instance on a cheap VPS, pointed to by `COBALT_API_URL`
3. `src/components/VideoResult.tsx` renders the result: video → HD/SD buttons (SD hidden when identical to HD) + MP3 when the source has a separate track; photos → gallery with per-image and sequential "Download all"; stats pills only when non-zero
4. `GET /api/proxy?url=<cdn-url>&filename=<name>&type=video|audio|image` streams the file. Only `https:` URLs whose hostname ends with an entry of `ALLOWED_SUFFIXES` (TikTok CDNs, `twimg.com`, `fbcdn.net`, `cdninstagram.com`, `ytimg.com`) are allowed, and the `Referer` is chosen per host (`refererFor`)

Both API routes declare `export const runtime = 'nodejs'`. TikWM's free tier has a daily quota that appears to be per egress IP, which Cloudflare Workers share — the same request can succeed locally while production gets "Free Api Limit".

### Tool pages

Every tool page lives under `src/app/[locale]/<slug>/page.tsx`, is translated (EN/DE/AR), and is a thin wrapper around `src/components/ToolPageLayout.tsx` (hero with the tool inside a border-beam card, trust pills, 3 steps, 4 feature cards, FAQ accordion, CTA, header/footer, JSON-LD). Each page's message namespace must provide the keys listed in that file's doc comment, plus `tool.*` strings for its interactive component where applicable:

| Slug | Namespace | Tool component |
|---|---|---|
| `/photo-downloader` | `PhotoDownloader` | `Downloader variant="photo"` (own page layout, predates ToolPageLayout) |
| `/facebook-video-downloader` | `FacebookDownloader` | `Downloader platform="facebook"` |
| `/twitter-video-downloader` | `TwitterDownloader` | `Downloader platform="twitter"` |
| `/youtube-thumbnail-downloader` | `YoutubeThumbnail` | `tools/YoutubeThumbnail` — pure URL parsing, images from `i.ytimg.com` via the proxy; no API quota |
| `/video-compressor` | `VideoCompressor` | `tools/MediaConverter mode="compress"` |
| `/mp4-to-gif` | `Mp4ToGif` | `tools/MediaConverter mode="gif"` |

`MediaConverter` runs ffmpeg.wasm **in the browser** (`@ffmpeg/ffmpeg` + `@ffmpeg/util`; the single-thread core and the class worker are fetched from unpkg at runtime, so no COOP/COEP headers are needed and nothing is uploaded). 500 MB input cap, 15 s GIF cap.

Adding a tool page: create the page + namespace in all three message files, add it to `TOOL_PAGES` in `src/lib/nav.ts` (drives the footer), to `TOOLS` in `tools/page.tsx`, to `Tools.items.<key>` messages, to `CONTENT_ROUTES` in `sitemap.ts`, and optionally to the home `toolsPreview`.

### Layouts and routing

- `src/app/layout.tsx` (root) returns `children` only — no `<html>`, no CSS. The real document shell (`<html lang dir>`, `globals.css`, Geist font, JSON-LD, ad scripts, cookie banner, Cloudflare Web Analytics beacon) lives in `src/app/[locale]/layout.tsx`. It exports `generateStaticParams` for the three locales and calls `setRequestLocale`, and **every page under `[locale]` calls `setRequestLocale(locale)`** right after awaiting `params` — that is what lets Next prerender all locale pages statically (served from Cloudflare assets, no Worker render on each hit). Do not read `headers()`/`cookies()` in those pages or they fall back to dynamic rendering
- Legal pages (`/privacy`, `/terms`, `/dmca`, `/disclaimer`) live in the `src/app/(legal)/` route group, outside `[locale]`, and are excluded from the i18n middleware matcher. `(legal)/layout.tsx` is their own document shell (English header/footer, `globals.css`, no ads, no cookie banner); it uses `getTranslations({ locale: 'en' })` for the shared labels
- Any other new page must live under `src/app/[locale]/`. A page placed at e.g. `src/app/guide/foo/` gets rewritten by the middleware to `/en/guide/foo` and 404s
- `src/app/[locale]/tools/` — translated "Tools & services" index (`Tools` namespace); English-only guides are listed only when `locale === 'en'`. See **Tool pages** above for the individual tool routes
- `src/app/[locale]/photo-downloader/` — translated TikTok photo/slideshow downloader (`PhotoDownloader` namespace); same `Downloader` component with `variant="photo"`, listed on `/tools` via the `tool` field of its `TOOLS` entry
- `src/app/[locale]/guide/`: translated guides (watermark, mp3, iPhone, Android) render for every locale via `getTranslations`; English-only guides (mp4, SnapTik alternative, Chrome, GIF, playlist, private video) must call `notFound()` when `locale !== 'en'`

### Internationalisation (next-intl)

- Routing: `src/i18n/routing.ts` — locales `['en', 'de', 'ar']`, `localePrefix: 'as-needed'` (English at `/`, German at `/de`, Arabic at `/ar` with `dir="rtl"`)
- Middleware: `src/middleware.ts` — Edge middleware required by OpenNext (next-intl only). Security headers live in `next.config.ts` `headers()`, which the Cloudflare runtime applies to every route including the legal pages; do not set them in middleware too (that duplicated them in prod). Matcher excludes `api`, `_next`, files with a dot, and the four legal slugs
- Messages: `messages/{en,de,ar}.json`, one top-level namespace per page/component (`Downloader`, `VideoResult`, `Nav`, `Footer`, `Common`, `Home`, `About`, `Tools`, `PhotoDownloader`, `Guide*`). Arrays (FAQ, steps, features) are read with `t.raw('key')`
- Server components use `getTranslations({ locale, namespace })`; client components use `useTranslations(namespace)`
- Adding a locale: extend `routing.locales`, add `messages/<locale>.json`, add it to the `hreflang` alternates in `[locale]/layout.tsx`, every page's `generateMetadata`, and `sitemap.ts`
- Adding a translated guide: add its namespace to all three message files, or it will throw at render for the missing locales

### SEO conventions

- Titles: every `metaTitle` must stay ≤ 50 characters because the locale layout appends ` | TokDown` (≤ 60 total); never put `| TokDown` in a message string. Descriptions 120–155 characters. Lead with the phrase people type (`Facebook video downloader`, `MP4 to GIF converter`, `video compressor online`), then the differentiators (`no watermark`, `HD`, `free`, `no login`, `no upload`). Google autocomplete for each tool's seed phrase is the keyword source of record; re-check it when rewriting metadata
- Tool pages carry a `details` array (2 paragraphs) and 6–7 FAQs per language so they clear the ~800-word service-page threshold, plus a "Link to this tool" snippet box (`LinkToTool`) as a backlink prompt
- `public/llms.txt` lists every tool and guide with one-line descriptions for AI search engines; `public/manifest.json` is a full PWA manifest with 192/512 PNG icons, shortcuts and an Android **share target** (`/?url=`), which `Downloader` reads on mount and auto-submits

- `src/lib/seo.ts` exports `BASE` (`https://tokdown.org`) and `OG_IMAGE`. Next merges metadata shallowly, so **every page that sets its own `openGraph` must include `images: [OG_IMAGE]`** or the layout's image is lost. The image is the static `public/og-image.png` (1200×630, Signal theme, source SVG in the session scratchpad; regenerate by rendering an SVG with headless Chrome at 1200×630). Icons: `src/app/icon.svg` (vector favicon, referenced first in `metadata.icons`), `src/app/icon.png` 1024, `src/app/apple-icon.png` 180, `public/icon-192.png`, `icon-512.png`, `icon-512-maskable.png` for the manifest — all the lime rounded square with the black download arrow, same as `Logo.tsx`
- Pages build canonical/hreflang URLs with `localePath = locale === 'en' ? '' : '/' + locale`. Locale roots have no trailing slash (`/de`, not `/de/` — the latter 308-redirects and a redirecting canonical is ignored)
- `src/app/sitemap.ts` has three arrays that must be kept in sync when adding pages: `CONTENT_ROUTES` (translated, incl. `/tools`, `/photo-downloader` and the tool pages; emitted for `/`, `/de`, `/ar` with `alternates.languages` hreflang entries), `NEW_GUIDE_ROUTES` (English-only guides; emitted once), `LEGAL_ROUTES` (root legal pages). `robots.ts` disallows `/api/`
- Each page carries its own JSON-LD (`Article`/`HowTo`/`FAQPage`/`BreadcrumbList`) inline via `dangerouslySetInnerHTML`

### Ads

- There is no Google AdSense (removed 2026-10-20). Two networks run: **Adsterra** (`ads/AdsterraTags.tsx` = the `/14/` **Social Bar** (SocialBar_1, 31829133), once per page from the locale layout; `ads/AdsterraPopunder.tsx` = the `/1/` **Popunder** (Popunder_1, 31828936; identified by elimination: `/22/` = iframe banners, `/21/` = native, `/14/` = Social Bar, so `/1/` is the popunder — the script bodies are a shared loader and cannot tell formats apart), injected **only after** `Downloader` dispatches `tokdown:result`, once per session, so it never hijacks the Paste/Download clicks and pages without a downloader never load it; `ads/AdsterraNative.tsx` = the `/21/` Native Banner zone rendered into `#container-<zone>` inside a labelled `.ad-slot` with reserved height, **one instance per page** because the container id must be unique: home between features and steps, tool pages after the steps; `ads/AdsterraBanner.tsx` = iframe banner zones 300×250 and 728×90 rendered via `srcDoc` because Adsterra's banner script uses `document.write`: the 300×250 sits under every download result inside `Downloader`, the `responsive` variant (728×90 ≥768px, 300×250 below, only one mounted) sits at the end of every guide). **Monetag was removed entirely on 2026-10-21** (popunder, vignette, push service worker); Adsterra is the only ad network. Mobile layout: phones get a `responsive` 300×250 under the hero and a `only="mobile"` 300×250 before the FAQ (home + tool pages) because the side rails cannot fit; `AdsterraBanner`'s `only` prop renders nothing server-side and mounts only on the matching viewport. `ads/SideRails.tsx` mounts two fixed Adsterra banners beside the content on viewports ≥1536px: 160×600 left (`rail-left`) and 160×300 right (`rail-right`), one zone each.
- The Adsterra **smart link** (`araplhn.org/4/9414…`) is a "Sponsored" footer link in `SiteFooter` (`rel="sponsored nofollow"`); `(legal)/layout.tsx` passes `sponsored={false}`
- `CookieConsent.tsx` only sets a `localStorage` flag; it does not gate ad loading

### Styling

Tailwind CSS v4 via PostCSS, **dark theme only** ("Signal": near-black surfaces, 1px hairline borders, one electric-lime accent, teal/violet glow only in the hero). Fonts come from the `geist` package in `[locale]/layout.tsx`: Geist Sans (`--font-geist-sans`, everything) and Geist Mono (`--font-geist-mono`, eyebrows, labels, numerals via `.mono`). Arabic falls back to system fonts via `[dir="rtl"]`.

`src/app/globals.css` is the single token source: `--bg`, `--bg-2`, `--surface`, `--surface-2/3`, text `--t1`–`--t4` (all ≥ 4.5:1), `--lime` / `--lime-dim` / `--lime-fg`, `--teal`, `--violet`, `--danger`, `--line` / `--line-strong`. shadcn semantic tokens map onto these. The long alias block (`--ink`, `--peach`, `--sky`, `--cobalt`, `--s0`–`--s4`, `--brand`, …) exists only so the guide pages and `photo-downloader` keep working — use the new names in new code and never hardcode hex in components. Use the lime accent sparingly: primary CTA, focus ring, icons, one highlighted card.

Utility classes: `card` (+ `card--hover`, `card--float`, `card--lime`), `pill` (+ `pill--lime`, `pill--teal`), `eyebrow`, `mono`, `gradient-text`, `numeral`, `blob` (+ `--peach`/`--sky`/`--violet`, `--animate` — soft glow washes), `grid-bg`, `band`, `btn-brand` (lime), `btn-ghost`, `link-ink`, `dl-btn*`, `icon-tile`, `step-num`, `stat-pill`, `shimmer`, `fade-up`. Older names (`cut-card*`, `sticker*`, `tape`, `torn-*`, `highlight`, `btn-apricot`) are mapped to the same look. Icons come from `lucide-react` — no emoji as icons.

UI primitives in `src/components/ui/`: shadcn (`base-nova` style, Base UI underneath): badge, button, card, dialog, input, separator, tooltip, accordion, avatar; Magic UI `marquee`, `blur-fade`, `border-beam` (need `motion`), installed from their registries with `npx shadcn add <url>`. Add more the same way rather than hand-writing primitives. Magic UI marquee keyframes live in the `@theme inline` block at the end of `globals.css`.

Shared chrome: `SiteHeader` (sticky glass bar, locale switcher, takes translated labels as props), `SiteFooter` (three link columns as props), `CtaBand`, `Testimonials` (two `Marquee` rows; data from `Home.testimonials` in the message files, avatars are CC0 DiceBear SVGs in `public/avatars/`), `Logo`. `cn()` lives in `src/lib/utils.ts`.

## Key Constraints

- **No required environment variables.** The TikWM endpoint, CDN allowlist, production domain (`tokdown.org`), Google Search Console token, and the Adsterra zone keys are hardcoded in source. The only env read is an optional `NEXT_PUBLIC_SITE_URL` fallback for `metadataBase` in the root layout
- New CDN hosts for proxied downloads go in `ALLOWED_SUFFIXES` (and `refererFor`) in `src/app/api/proxy/route.ts`; new image hosts go in `images.remotePatterns` in `next.config.ts`
- Facebook/Twitter scraping has no SLA: the upstream HTML/JSON shapes can change without notice. When a provider starts failing, check the regexes in `src/lib/providers/*.ts` first
- `sitemap.ts` and `robots.ts` are code-generated — update them when adding public routes
- **Workers CPU budget is the hard constraint.** The account runs on the Workers Free plan (10 ms CPU per request); a full SSR of a page costs 300–950 ms CPU and produced `Error 1102` in production on 2026-10-20. Therefore `open-next.config.ts` uses the **static-assets incremental cache**: every page is prerendered at build time and `opennextjs-cloudflare deploy` copies `.open-next/cache` into `assets/cdn-cgi/_next_cache`, so the Worker only serves cached HTML/RSC. Keep every page statically renderable (no `headers()`/`cookies()`, `setRequestLocale` on each page), keep `motion`/framer out of server components (BlurFade and BorderBeam are CSS-only on purpose), and keep API routes cheap. Upgrading to Workers Paid raises the limit to 30 s and is the right move once ads pay for it
- Analytics: `src/components/GoogleAnalytics.tsx` renders GA4 once `GA_ID` is filled in (production builds only, `next/script` afterInteractive, Consent Mode v2: storage denied by default in the EEA/UK/CH, granted elsewhere, "Accept" in `CookieConsent` grants it). `src/components/CloudflareAnalytics.tsx` renders the Cloudflare Web Analytics beacon once `CF_BEACON_TOKEN` is filled in (cookieless, no consent needed). `@vercel/analytics` was removed on 2026-10-20: it never reported anything on Cloudflare hosting
- SEO audits: the `claude-seo` plugin is installed at user scope (`/seo audit <url>`, `/seo page <url>`). Its fetchers refuse localhost unless `CLAUDE_SEO_LOCAL_TARGETS=localhost:<port>` is set; the latest audit is in `../audits/tokdown.org/`
- The plugin clones (`ui-ux-pro-max-skill`, `claude-seo`) and calctidy moved out to the SirbuWorkers workspace (`../tools/`, `../calctidy/`). Their ignore entries in `.gitignore`, `eslint.config.mjs` and `tsconfig.json` stay so a stray clone here never reaches `lint`/`build`; new audits go to `../audits/tokdown.org/`
