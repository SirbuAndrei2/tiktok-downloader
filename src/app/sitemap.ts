import type { MetadataRoute } from 'next'

const BASE = 'https://tokdown.org'
const LEGAL_DATE = new Date('2025-04-24')
const GUIDE_DATE = new Date('2026-05-01')
const GUIDE_DATE_NEW = new Date('2026-06-01')

const CONTENT_ROUTES = [
  { path: '/',      priority: 1.0, changeFrequency: 'daily'   as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/guide/download-tiktok-without-watermark', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/guide/tiktok-to-mp3',                     priority: 0.9, changeFrequency: 'monthly' as const },
]

const NEW_GUIDE_ROUTES = [
  { path: '/guide/tiktok-to-mp4',               priority: 0.9,  date: GUIDE_DATE_NEW },
  { path: '/guide/download-tiktok-on-iphone',   priority: 0.85, date: GUIDE_DATE_NEW },
  { path: '/guide/download-tiktok-on-android',  priority: 0.85, date: GUIDE_DATE_NEW },
  { path: '/guide/snaptik-alternative',         priority: 0.8,  date: GUIDE_DATE_NEW },
]

const LEGAL_ROUTES = [
  { path: '/privacy',    priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms',      priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/dmca',       priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDate = new Date()

  const enRoutes = CONTENT_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: path === '/' ? contentDate : GUIDE_DATE,
    changeFrequency,
    priority,
  }))

  const deRoutes = CONTENT_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}/de${path}`,
    lastModified: path === '/' ? contentDate : GUIDE_DATE,
    changeFrequency,
    priority: priority * 0.95,
  }))

  const newGuideRoutes = NEW_GUIDE_ROUTES.map(({ path, priority, date }) => ({
    url: `${BASE}${path}`,
    lastModified: date,
    changeFrequency: 'monthly' as const,
    priority,
  }))

  const legalRoutes = LEGAL_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: LEGAL_DATE,
    changeFrequency,
    priority,
  }))

  return [...enRoutes, ...deRoutes, ...newGuideRoutes, ...legalRoutes]
}
