import type { MetadataRoute } from 'next'

const BASE = 'https://www.tokdown.org'
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified: NOW,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/dmca`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE}/disclaimer`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
