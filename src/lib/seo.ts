import type { Metadata } from 'next'

export const BASE = 'https://tokdown.org'

export const LOCALES = ['en', 'de', 'ar', 'es', 'pt', 'id'] as const

/** Open Graph locale per site locale (og:locale). */
export const OG_LOCALE: Record<string, string> = { en: 'en_US', de: 'de_DE', ar: 'ar_SA', es: 'es_LA', pt: 'pt_BR', id: 'id_ID' }

/**
 * <html lang> per site locale. The URL segment stays short (/pt), but the copy
 * is Brazilian Portuguese and neutral Latin American Spanish. hreflang keeps the
 * bare language codes so /pt and /es also serve Portugal and Spain.
 */
export const HTML_LANG: Record<string, string> = { en: 'en', de: 'de', ar: 'ar', es: 'es', pt: 'pt-BR', id: 'id' }

/** Right-to-left locales. */
export const RTL_LOCALES = new Set(['ar'])

// Pages that define their own `openGraph` replace the layout's one entirely
// (Next merges metadata shallowly), so every openGraph object must repeat this.
export const OG_IMAGE = {
  url: `${BASE}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'TokDown — download TikTok, Facebook and Twitter videos without watermark',
}

/** '' for English (served at the root), '/<locale>' otherwise. */
export function localePrefix(locale: string) {
  return locale === 'en' ? '' : `/${locale}`
}

/**
 * Absolute URL of `path` in `locale`. Locale roots have no trailing slash
 * (`/de`, not `/de/`, which 308-redirects); the English root is `BASE/`.
 */
export function localeUrl(locale: string, path = '/') {
  const prefix = localePrefix(locale)
  if (path === '/' || path === '') return prefix ? `${BASE}${prefix}` : `${BASE}/`
  return `${BASE}${prefix}${path}`
}

/** hreflang map (every locale + x-default → English) for a page that exists in every locale. */
export function hreflang(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, path)])),
    'x-default': localeUrl('en', path),
  }
}

/**
 * Metadata for a page: title/description, self-referencing canonical, hreflang
 * alternates (only for pages translated into every locale) and a complete
 * openGraph object (image, url, og:locale) so nothing from the layout is lost.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  translated = true,
  ogType = 'website',
  keywords,
  brandInTitle = false,
}: {
  locale: string
  path: string
  title: string
  description: string
  translated?: boolean
  ogType?: 'website' | 'article'
  keywords?: string[]
  /** Locale roots live in the same segment as the layout, so its "%s | TokDown" template does not apply. */
  brandInTitle?: boolean
}): Metadata {
  const url = localeUrl(locale, path)
  return {
    title: brandInTitle ? { absolute: `${title} | TokDown` } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: translated ? { canonical: url, languages: hreflang(path) } : { canonical: url },
    openGraph: {
      type: ogType,
      siteName: 'TokDown',
      locale: OG_LOCALE[locale] ?? 'en_US',
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  }
}
