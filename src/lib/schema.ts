import { BASE, LOCALES, OG_IMAGE, localeUrl } from '@/lib/seo'

/**
 * JSON-LD builders shared by every page. One Organization and one WebSite node
 * (emitted by the locale layout) are referenced by `@id` everywhere else.
 *
 * Deliberately not used: HowTo (no rich result since 2023), aggregateRating /
 * Review (TokDown has no real reviews: never add them), SearchAction
 * (sitelinks search box retired in 2024).
 */
export const ORG_ID = `${BASE}/#organization`
export const WEBSITE_ID = `${BASE}/#website`

type Json = Record<string, unknown>

export function siteGraph(): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'TokDown',
        alternateName: 'TokDown.org',
        url: `${BASE}/`,
        logo: { '@type': 'ImageObject', url: `${BASE}/icon.png`, width: 1024, height: 1024 },
        description: 'Free web tools to download public TikTok, X (Twitter) and Facebook media and to compress or convert video in the browser. Not affiliated with TikTok, ByteDance, Meta, X or Google.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@tokdown.org',
          availableLanguage: [...LOCALES],
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'TokDown',
        alternateName: 'TokDown.org',
        url: `${BASE}/`,
        inLanguage: [...LOCALES],
        publisher: { '@id': ORG_ID },
      },
    ],
  }
}

/** BreadcrumbList; the first crumb (home in that locale) is added automatically. */
export function breadcrumbs(locale: string, items: { name: string; path: string }[]): Json {
  const all = [{ name: 'TokDown', path: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: localeUrl(locale, it.path) })),
  }
}

export function webApplication({ locale, path, name, description, category = 'MultimediaApplication', features }: {
  locale: string
  path: string
  name: string
  description: string
  category?: 'MultimediaApplication' | 'UtilitiesApplication'
  features?: string[]
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${localeUrl(locale, path)}#app`,
    name,
    url: localeUrl(locale, path),
    description,
    applicationCategory: category,
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(features && features.length ? { featureList: features } : {}),
    publisher: { '@id': ORG_ID },
  }
}

export function article({ locale, path, headline, description, datePublished, dateModified }: {
  locale: string
  path: string
  headline: string
  description: string
  datePublished: string
  dateModified: string
}): Json {
  const url = localeUrl(locale, path)
  const org = { '@type': 'Organization', '@id': ORG_ID, name: 'TokDown', url: `${BASE}/` }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    inLanguage: locale,
    image: OG_IMAGE.url,
    datePublished,
    dateModified,
    author: org,
    publisher: { ...org, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': WEBSITE_ID },
  }
}

/** FAQPage: only for Q&As that are rendered visibly on the same page. */
export function faqPage(faq: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }
}

export function itemList(name: string, items: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
  }
}
