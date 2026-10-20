import type { Platform } from './types'

const HOSTS: { platform: Platform; test: (host: string) => boolean }[] = [
  { platform: 'tiktok', test: (h) => h === 'tiktok.com' || h.endsWith('.tiktok.com') },
  { platform: 'facebook', test: (h) => h === 'facebook.com' || h.endsWith('.facebook.com') || h === 'fb.watch' || h === 'fb.com' || h.endsWith('.fb.com') },
  { platform: 'twitter', test: (h) => h === 'twitter.com' || h.endsWith('.twitter.com') || h === 'x.com' || h.endsWith('.x.com') || h === 't.co' },
  { platform: 'instagram', test: (h) => h === 'instagram.com' || h.endsWith('.instagram.com') || h === 'instagr.am' },
]

export function detectPlatform(raw: string): Platform | null {
  try {
    const { hostname, protocol } = new URL(raw)
    if (protocol !== 'https:' && protocol !== 'http:') return null
    const host = hostname.toLowerCase().replace(/^www\./, '')
    return HOSTS.find((h) => h.test(host))?.platform ?? null
  } catch {
    return null
  }
}
