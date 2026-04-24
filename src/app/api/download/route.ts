import { type NextRequest } from 'next/server'

export const runtime = 'nodejs'

function isTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return (
      parsed.hostname.includes('tiktok.com') ||
      parsed.hostname.includes('vm.tiktok.com') ||
      parsed.hostname.includes('vt.tiktok.com')
    )
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  let url: string
  try {
    const body = await request.json()
    url = (body.url ?? '').trim()
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!url) {
    return Response.json({ error: 'URL is required.' }, { status: 400 })
  }

  if (!isTikTokUrl(url)) {
    return Response.json({ error: 'Please enter a valid TikTok URL.' }, { status: 400 })
  }

  const form = new URLSearchParams()
  form.set('url', url)
  form.set('hd', '1')

  const tikwmRes = await fetch('https://www.tikwm.com/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (compatible; TikDL/1.0)',
    },
    body: form.toString(),
    signal: AbortSignal.timeout(15_000),
  })

  if (!tikwmRes.ok) {
    return Response.json({ error: 'Could not fetch video. Try again.' }, { status: 502 })
  }

  const json = await tikwmRes.json()

  if (json.code !== 0 || !json.data) {
    return Response.json(
      { error: json.msg ?? 'Video not found. Make sure the video is public.' },
      { status: 404 }
    )
  }

  const d = json.data

  return Response.json({
    id: d.id,
    title: d.title ?? '',
    cover: d.cover ?? '',
    play: d.play ?? '',
    hdplay: d.hdplay ?? d.play ?? '',
    music: d.music ?? '',
    musicTitle: d.music_info?.title ?? '',
    author: {
      nickname: d.author?.nickname ?? 'Unknown',
      avatar: d.author?.avatar ?? '',
      uniqueId: d.author?.unique_id ?? '',
    },
    stats: {
      plays: d.play_count ?? 0,
      likes: d.digg_count ?? 0,
      comments: d.comment_count ?? 0,
      shares: d.share_count ?? 0,
    },
  })
}
