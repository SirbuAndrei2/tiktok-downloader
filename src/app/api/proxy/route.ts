import { type NextRequest } from 'next/server'

export const runtime = 'nodejs'

const ALLOWED_SUFFIXES = [
  'tiktokcdn.com',
  'tiktokcdn-us.com',
  'tiktokcdn-eu.com',
  'tiktok.com',
  'tikwm.com',
  'muscdn.com',
]

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

  if (!videoUrl) {
    return new Response('Missing url param', { status: 400 })
  }

  if (!isAllowedUrl(videoUrl)) {
    return new Response('URL not allowed', { status: 403 })
  }

  const upstream = await fetch(videoUrl, {
    headers: {
      'Referer': 'https://www.tiktok.com/',
      'User-Agent': 'Mozilla/5.0 (compatible; TikDL/1.0)',
    },
    signal: AbortSignal.timeout(30_000),
  })

  if (!upstream.ok) {
    return new Response('Failed to fetch media', { status: 502 })
  }

  const contentType = type === 'audio' ? 'audio/mpeg' : 'video/mp4'
  const safeFilename = filename.replace(/[^a-z0-9_\-\.]/gi, '_')

  return new Response(upstream.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${safeFilename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
