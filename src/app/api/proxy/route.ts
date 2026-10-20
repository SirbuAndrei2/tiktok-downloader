import { type NextRequest } from 'next/server'

export const runtime = 'nodejs'

const ALLOWED_SUFFIXES = [
  // TikTok
  'tiktokcdn.com',
  'tiktokcdn-us.com',
  'tiktokcdn-eu.com',
  'tiktok.com',
  'tikwm.com',
  'muscdn.com',
  // Twitter / X
  'twimg.com',
  // Facebook / Instagram (shared CDN)
  'fbcdn.net',
  'cdninstagram.com',
  // YouTube thumbnails
  'ytimg.com',
  'img.youtube.com',
]

/** Some CDNs check the Referer; send the one that matches the host. */
function refererFor(hostname: string): string {
  if (hostname.endsWith('twimg.com')) return 'https://x.com/'
  if (hostname.endsWith('fbcdn.net')) return 'https://www.facebook.com/'
  if (hostname.endsWith('cdninstagram.com')) return 'https://www.instagram.com/'
  if (hostname.endsWith('ytimg.com') || hostname.endsWith('youtube.com')) return 'https://www.youtube.com/'
  return 'https://www.tiktok.com/'
}

function isAllowedUrl(raw: string): boolean {
  try {
    const { protocol, hostname } = new URL(raw)
    if (protocol !== 'https:') return false
    return ALLOWED_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  const videoUrl = request.nextUrl.searchParams.get('url')
  const filename = request.nextUrl.searchParams.get('filename') ?? 'video.mp4'
  const type = request.nextUrl.searchParams.get('type') ?? 'video'
  // Page cookie for TikTok's own CDN (web fallback); ignored for every other host.
  const ck = request.nextUrl.searchParams.get('ck') ?? ''

  if (!videoUrl) {
    return new Response('Missing url param', { status: 400 })
  }

  if (!isAllowedUrl(videoUrl)) {
    return new Response('URL not allowed', { status: 403 })
  }

  const upstream = await fetch(videoUrl, {
    headers: {
      'Referer': refererFor(new URL(videoUrl).hostname),
      ...(ck && /(^|\.)tiktok(cdn(-us|-eu)?)?\.com$/.test(new URL(videoUrl).hostname) ? { Cookie: ck } : {}),
      'User-Agent': 'Mozilla/5.0 (compatible; TikDL/1.0)',
    },
    signal: AbortSignal.timeout(30_000),
  })

  if (!upstream.ok) {
    return new Response('Failed to fetch media', { status: 502 })
  }

  const upstreamType = upstream.headers.get('content-type') ?? ''
  const contentType =
    type === 'audio' ? 'audio/mpeg'
    : type === 'image' ? (upstreamType.startsWith('image/') ? upstreamType : 'image/jpeg')
    : 'video/mp4'
  const safeFilename = filename.replace(/[^a-z0-9_\-\.]/gi, '_')

  return new Response(upstream.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
