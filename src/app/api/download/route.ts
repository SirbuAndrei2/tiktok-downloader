import { type NextRequest } from 'next/server'
import { detectPlatform } from '@/lib/providers/detect'
import { fetchTikTok } from '@/lib/providers/tiktok'
import { fetchTwitter } from '@/lib/providers/twitter'
import { fetchFacebook } from '@/lib/providers/facebook'
import { fetchInstagram } from '@/lib/providers/instagram'
import { ProviderError, type MediaResult, type Platform } from '@/lib/providers/types'
import { cobaltEnabled, fetchViaCobalt } from '@/lib/providers/cobalt'

export const runtime = 'nodejs'

const PROVIDERS: Record<Platform, (url: string) => Promise<MediaResult>> = {
  tiktok: fetchTikTok,
  twitter: fetchTwitter,
  facebook: fetchFacebook,
  instagram: fetchInstagram,
}

/**
 * POST { url } → normalised MediaResult. The platform is detected from the
 * hostname, so any downloader page accepts any supported link.
 */
export async function POST(request: NextRequest) {
  let url: string
  try {
    const body = await request.json()
    url = String(body.url ?? '').trim()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }
  if (!url) return Response.json({ error: 'URL is required.' }, { status: 400 })

  const platform = detectPlatform(url)
  if (!platform) {
    return Response.json({ error: 'Please enter a valid TikTok, Facebook or Twitter/X link.' }, { status: 400 })
  }

  try {
    // Facebook/Instagram are login-walled for datacentre IPs, so cobalt (when configured) goes first;
    // TikTok/Twitter use the built-in provider first and fall back to cobalt (e.g. TikWM quota hit).
    const cobaltFirst = platform === 'facebook' || platform === 'instagram'
    if (cobaltFirst && cobaltEnabled()) {
      try {
        const viaCobalt = await fetchViaCobalt(url, platform)
        if (viaCobalt) return Response.json(viaCobalt)
      } catch { /* fall through to the built-in provider */ }
    }
    try {
      const data = await PROVIDERS[platform](url)
      return Response.json(data)
    } catch (e) {
      if (!cobaltFirst && cobaltEnabled()) {
        const viaCobalt = await fetchViaCobalt(url, platform).catch(() => null)
        if (viaCobalt) return Response.json(viaCobalt)
      }
      throw e
    }
  } catch (e) {
    if (e instanceof ProviderError) {
      return Response.json({ error: e.message }, { status: e.status, headers: e.retryAfter ? { 'Retry-After': String(e.retryAfter) } : undefined })
    }
    const name = e instanceof Error ? e.name : ''
    if (name === 'TimeoutError' || name === 'AbortError') {
      return Response.json({ error: 'The source took too long to answer. Please try again.' }, { status: 504 })
    }
    return Response.json({ error: 'Could not fetch this link. Try again.' }, { status: 502 })
  }
}
