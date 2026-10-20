# TokDown (tokdown.org) — Full SEO Audit

Date: 2026-10-20 · Method: claude-seo v2.4.2 (technical, content, schema, sitemap, hreflang, GEO, backlinks sub-skills) run against the live site and against the local production build that is about to be deployed, plus Google autocomplete research per tool. Where a plugin script needs a paid API (Moz, DataForSEO, PageSpeed with key) the free fallback was used and is noted.

## SEO Health Score

| Scope | Before (live, 2026-10-20 morning) | After (local build, same day) |
|---|---|---|
| Overall | **54 / 100** | **84 / 100** |
| Technical | 48 | 90 |
| On-page & keywords | 55 | 88 |
| Content quality | 60 | 80 (content_quality.py: 78–80, density 0.36–0.44, no filler/AI flags) |
| Schema | 75 | 80 |
| International (hreflang) | 60 | 92 |
| AI search / GEO | 45 | 85 |
| Authority & backlinks | 15 | 20 (structural fixes only; needs off-site work) |

Business type: single-purpose consumer utility (downloader + browser tools), global, three languages, monetised by ads. Not local, not e-commerce.

## What works (keep)

- Clean URL structure, one H1 per page everywhere, canonical self-references on all pages.
- JSON-LD on every page (WebSite + SearchAction, Organization, SoftwareApplication, BreadcrumbList; Article on guides). FAQPage/HowTo present: no rich-result value since 2023/2026 but harmless.
- Open Graph + Twitter cards on every page with a 1200×630 image.
- robots.txt valid, sitemap declared and valid (sitemap_discovery.py: `found` ok). No AI crawler is blocked, so AI Overviews, ChatGPT Search (OAI-SearchBot), Claude-SearchBot and Perplexity can all read the site.
- Zero `<img>` without alt (the UI uses SVG icons), no CLS-prone media above the fold.
- 10 English guides with 400–650 words each and internal links back to the tool.

## Findings and fixes

### Critical (fixed in this build)

1. **Titles over 60 characters site-wide (25 of 27 pages).** The layout appends ` | TokDown`, and several message strings already contained it (`/tools` rendered "… | TokDown | TokDown"). Longest was 83 chars (DE Facebook page). *Fix:* every `metaTitle` rewritten to ≤ 50 chars, keyword-first, in EN/DE/AR; six English-only guides rewritten inline; duplicate suffix removed. Verified: no English title > 56 chars, no description > 160.
2. **Every page was server-rendered on each request (ƒ).** Live TTFB measured 1.16 s for plain HTML, and HTML is served with `cache-control: no-store`. *Fix:* `generateStaticParams` + `setRequestLocale` on the locale layout and all 19 locale pages; build output now shows ● for every page, so Cloudflare serves prebuilt HTML. Expect TTFB in the low hundreds of ms and a direct LCP/INP gain.
3. **Security headers missing on the live site.** `next.config` `headers()` are ignored by the OpenNext/Cloudflare runtime; live responses had none of HSTS, nosniff, referrer-policy, frame-options. *Fix:* set in `src/middleware.ts` on every matched response (verified: 5 headers present).
4. **Legal pages rendered without any CSS, header or footer** (root layout has no document shell). Google saw bare, unstyled text for Privacy/Terms/DMCA/Disclaimer, which are trust pages. *Fix:* moved to `src/app/(legal)/` with its own shell (header, footer, theme, intl provider); titles shortened ("Privacy Policy | TokDown"). Static (○).

### High (fixed)

5. **Tool pages were thin (360–430 words) against an 800-word service-page threshold.** *Fix:* each of the five new tool pages gained two "In depth" paragraphs and two extra FAQs per language (now 560–634 words, FAQ 6–7 items), written around the autocomplete phrases ("compress video for Discord", "to 10 MB", "youtube thumbnail size", "GIF from iPhone video").
6. **Keyword mismatch.** Autocomplete shows demand for "tiktok downloader without watermark hd", "download tiktok photos", "facebook video downloader online without watermark", "twitter video downloader 1080p", "video compressor online free", "mp4 to gif converter free". Titles/descriptions now lead with these exact phrases.
7. **hreflang incomplete.** Translated guides lacked `x-default`; the sitemap carried no language alternates. *Fix:* `x-default` added on all translated pages; `sitemap.xml` now emits `xhtml:link` alternates (156 entries for 49 URLs).
8. **Internal linking.** Guides linked only to home/about/legal; new tools were reachable only from home, /tools and the footer. *Fix:* every guide footer links to `/tools`; the shared footer lists every tool on every page (23–49 internal links per page).
9. **AI-search discoverability.** `llms.txt` described a single-tool "TikDL" site. *Fix:* rewritten with every tool and guide, one-line factual descriptions and citable facts (no uploads, no storage, public content only).
10. **PWA manifest invalid** (JPEG files named .png, only a favicon.ico icon, old brand colour, generic name). *Fix:* real PNG 192/512 icons, TokDown name, dark theme colour, shortcuts, and an Android **share target** so TikTok's Share sheet can open TokDown directly; the downloader reads `?url=` and auto-submits.

### Medium (open)

11. **Backlinks: effectively none.** Common Crawl has no record of tokdown.org (`in_crawl: false`); no Moz/Bing key configured. The site now has a "Link to this tool" snippet on each tool page as a prompt, but authority must be built off-site (see action plan).
12. **Brand mentions.** No Reddit/YouTube/Wikipedia presence detected; AI citation correlates far more with mentions than with links.
13. **Testimonials are editorial placeholders.** Six quotes are not from real users. Under FTC's 2024 fake-review rule and the EU UCPD this is a legal exposure; replace with real feedback (e.g. a feedback form or support@ replies) or remove.
14. **Schema modernisation.** HowTo (deprecated 2023) and FAQPage (retired for rich results May 2026) are still emitted on 7 pages. Not harmful; remove when convenient to slim the HTML. `SoftwareApplication` could become `WebApplication` with `browserRequirements` and `featureList`.
15. **Per-page OG images.** All pages share one image; generated per-tool OG images would lift social CTR.
16. **Core Web Vitals field data: none** (CrUX has no record; PageSpeed API quota exceeded without a key). Re-measure after deploy with a PageSpeed API key or Lighthouse.

### Low

17. The homepage repeats its trust phrases several times (content_quality `repetition 36`): harmless, but the facts strip and trust pills could be deduplicated.
18. Arabic titles are counted in characters; several are 60–67 chars but narrow glyphs keep them under the pixel limit. Shortened the five longest anyway.
19. The `middleware` file convention is deprecated in Next 16 in favour of `proxy`; works today, migrate later.

## Keyword map (from Google autocomplete, 2026-10-20)

| Page | Primary phrase | Secondary phrases now covered |
|---|---|---|
| / | tiktok downloader | without watermark hd, free, mp4, download tiktok video high quality |
| /photo-downloader | tiktok photo downloader | tiktok slideshow downloader, download tiktok photos, without watermark hd |
| /facebook-video-downloader | facebook video downloader | online without watermark, hd, download facebook video using url |
| /twitter-video-downloader | twitter video downloader | 1080p, hd quality, iphone, GIF |
| /youtube-thumbnail-downloader | youtube thumbnail download | youtube thumbnail size, download url, Shorts |
| /video-compressor | video compressor online | compress video online free, for discord, to 10mb, without losing quality |
| /mp4-to-gif | mp4 to gif converter | video to gif high quality, free online, from iphone |
| DE | tiktok downloader ohne wasserzeichen, video komprimieren online kostenlos, mp4 zu gif umwandeln | |
| AR | تحميل فيديو تيك توك بدون الشعار hd, تحميل فيديو فيس بوك بدون برامج, ضغط الفيديو اون لاين | |

## Evidence

- Crawl tables: `scratchpad/onpage.json` (before) and `onpage2.json` (after), 63 URLs × 3 locales.
- Plugin runs: `sitemap_discovery.py`, `backlinks_auth.py --check`, `commoncrawl_graph.py tokdown.org`, `parse_html.py`, `metadata_template.py` (templated: false), `content_quality.py` (79/78/80).
- Live headers and TTFB via curl; Google autocomplete via suggestqueries endpoint for EN/DE/AR seeds.
