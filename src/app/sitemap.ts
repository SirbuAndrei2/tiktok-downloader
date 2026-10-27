import type { MetadataRoute } from 'next'
import { BASE, hreflang, localeUrl } from '@/lib/seo'
import { pageDates } from '@/lib/content-dates'

// Translated pages: emitted for /, /de and /ar with hreflang alternates that
// mirror the <link rel="alternate"> tags on each page.
const CONTENT_ROUTES = [
  '/',
  '/tools',
  '/guide',
  '/photo-downloader',
  '/facebook-video-downloader',
  '/twitter-video-downloader',
  '/youtube-thumbnail-downloader',
  '/video-compressor',
  '/mp4-to-gif',
  '/guide/download-tiktok-without-watermark',
  '/guide/tiktok-to-mp3',
  '/guide/download-tiktok-on-iphone',
  '/guide/download-tiktok-on-android',
  '/about',
]

// English-only guides under [locale]/guide that 404 for /de and /ar (keep in sync with EN_GUIDES in lib/nav.ts)
const NEW_GUIDE_ROUTES = [
  '/guide/is-it-legal-to-download-tiktok-videos',
  '/guide/tiktok-to-mp4',
  '/guide/snaptik-alternative',
  '/guide/tiktok-downloader-chrome',
  '/guide/download-tiktok-private-video',
  '/guide/tiktok-video-to-gif',
  '/guide/download-tiktok-playlist',
]

const LEGAL_ROUTES = ['/privacy', '/terms', '/dmca', '/disclaimer']

// lastmod comes from lib/content-dates.ts (real edit dates). changefreq and
// priority are omitted: Google ignores both.
export default function sitemap(): MetadataRoute.Sitemap {
  const translated = CONTENT_ROUTES.flatMap((path) =>
    (['en', 'de', 'ar'] as const).map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: new Date(pageDates(path).modified),
      alternates: { languages: hreflang(path) },
    })),
  )
  const english = [...NEW_GUIDE_ROUTES, ...LEGAL_ROUTES].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(pageDates(path).modified),
  }))
  return [...translated, ...english]
}
