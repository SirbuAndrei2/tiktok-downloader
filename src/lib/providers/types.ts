export type Platform = 'tiktok' | 'facebook' | 'twitter' | 'instagram'

/** Normalised media payload shared by every provider and rendered by VideoResult. */
export interface MediaResult {
  id: string
  platform: Platform
  title: string
  cover: string
  /** Best-quality progressive MP4. Empty for photo-only posts. */
  hdplay: string
  /** Smaller MP4 (or same as hdplay when the source has one rendition). */
  play: string
  /** Separate audio track when the source offers one (TikTok only). */
  music: string
  musicTitle: string
  /** Photo posts / carousels: full-size image URLs in order. */
  images: string[]
  isPhoto: boolean
  author: { nickname: string; avatar: string; uniqueId: string }
  stats: { plays: number; likes: number; comments: number; shares: number }
}

export class ProviderError extends Error {
  constructor(message: string, public status: number = 404, public retryAfter?: number) {
    super(message)
  }
}

export const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
}

export function emptyResult(platform: Platform, id: string): MediaResult {
  return {
    id, platform, title: '', cover: '', hdplay: '', play: '', music: '', musicTitle: '', images: [], isPhoto: false,
    author: { nickname: '', avatar: '', uniqueId: '' },
    stats: { plays: 0, likes: 0, comments: 0, shares: 0 },
  }
}

/** Undo JSON string escaping found in inline <script> blobs ("https:\/\/…", "&"). */
export function unescapeJson(s: string): string {
  return s.replace(/\\\//g, '/').replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/&amp;/g, '&')
}

export function decodeEntities(s: string): string {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}
