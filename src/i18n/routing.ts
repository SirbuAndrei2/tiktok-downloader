import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'de', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // Every URL serves exactly one language: no Accept-Language/cookie redirect
  // from `/` (crawlers sending a locale header were bounced to /de), and no
  // NEXT_LOCALE cookie on otherwise cacheable responses. The header switcher
  // is the way to change language.
  localeDetection: false,
  localeCookie: false,
  // hreflang lives in each page's <link rel="alternate"> tags (pageMetadata).
  // The middleware's automatic Link header also advertised /de and /ar
  // versions of the English-only guides, which 404.
  alternateLinks: false,
})

export type Locale = (typeof routing.locales)[number]
