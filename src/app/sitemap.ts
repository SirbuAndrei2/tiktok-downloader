import type { MetadataRoute } from 'next'

const BASE = 'https://tokdown.org'
const LEGAL_DATE = new Date('2025-04-24')
const GUIDE_DATE = new Date('2026-05-01')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/about`,
      lastModified: GUIDE_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/guide/download-tiktok-without-watermark`,
      lastModified: GUIDE_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/guide/tiktok-to-mp3`,
      lastModified: GUIDE_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: LEGAL_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: LEGAL_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/dmca`,
      lastModified: LEGAL_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/disclaimer`,
      lastModified: LEGAL_DATE,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
