export const BASE = 'https://tokdown.org'

// Pages that define their own `openGraph` replace the layout's one entirely
// (Next merges metadata shallowly), so every openGraph object must repeat this.
export const OG_IMAGE = {
  url: `${BASE}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'TokDown — Download TikTok videos without watermark in HD',
}
