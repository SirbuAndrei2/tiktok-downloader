# TokDown — SEO Action Plan

Each item states what to do, how we would know it failed, and the leading indicator to watch.

## Done in this build (deploy to realise)

| # | Action | Falsifiability check | Leading indicator |
|---|---|---|---|
| 1 | Keyword-first titles ≤ 60 chars, descriptions 120–155 chars, all pages, 3 languages | GSC "Pages" report shows Google rewriting titles for > 20% of pages | CTR on existing impressions rises within 2–4 weeks |
| 2 | Static prerender of all 23 locale routes + legal pages | PageSpeed TTFB stays > 800 ms after deploy | CrUX LCP p75 < 2.5 s once field data appears |
| 3 | Security headers via middleware | securityheaders.com grade below A | — |
| 4 | Styled legal pages with site chrome | Pages still render without `site-header` live | Lower bounce on /privacy, /terms |
| 5 | In-depth copy + extra FAQs on tool pages (560–634 words) | Pages stay out of top 50 for their primary phrase after 8 weeks | Impressions for long-tail FAQ queries |
| 6 | hreflang x-default + sitemap alternates | GSC International Targeting reports return-tag errors | DE/AR impressions share grows |
| 7 | Tools linked from every guide footer and the shared footer | New tool pages not indexed within 3 weeks | "Discovered, currently not indexed" count falls |
| 8 | llms.txt rewritten, manifest with share target | — | AI referrals (ChatGPT/Perplexity) appear in analytics; PWA installs |

## Next 30 days

1. **Deploy, then request indexing** for the 7 tool pages ×3 locales in Search Console; submit the sitemap again. Optional: `/seo google` with a Search Console connection to track them.
2. **Replace the placeholder testimonials** with real feedback. Add a one-line "Rate this tool" widget storing counts in Cloudflare KV/D1 if you want numbers.
3. **Get the first 20 referring domains** (Common Crawl currently sees none):
   - Submit to tool directories (AlternativeTo, Product Hunt, SaaSHub, Toolify, There's An AI For That is irrelevant; use "free tools" lists).
   - Answer "how do I download a Facebook video / compress a video for Discord" questions on Reddit, Quora and the Discord/WhatsApp subreddits with the specific tool URL. Brand mentions on Reddit/YouTube correlate more with AI citations than backlinks do.
   - Publish one short YouTube video per tool (screen recording, 60–90 s) linking the page.
   - Add a GitHub repo README or a dev.to post about "ffmpeg.wasm video compressor in the browser" linking /video-compressor: developer audiences link freely.
4. **Per-tool OG images** with `next/og` (title + tool icon on the dark theme).
5. **Measure CWV** with a PageSpeed API key (`/seo google pagespeed`) after deploy; fix anything LCP > 2.5 s.

## Next 90 days

6. Add Spanish and Portuguese (BR) locales: the biggest TikTok markets after Indonesia; routing is already in place.
7. Publish 3 guide articles per new tool (e.g. "Compress a video for Discord", "Download a Facebook Reel on iPhone", "YouTube thumbnail size guide") to build topical clusters; link them from the tool page and the tool from them.
8. Remove HowTo/FAQPage JSON-LD; switch `SoftwareApplication` to `WebApplication` with `featureList`.
9. Start drift monitoring: `/seo drift baseline https://tokdown.org` after deploy, compare monthly.
10. Revisit Instagram: once a reliable upstream exists (self-hosted Cobalt), publish `/instagram-reels-downloader`; demand ("reel downloader") is the largest of all platforms.
