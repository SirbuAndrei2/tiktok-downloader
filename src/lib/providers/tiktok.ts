import { emptyResult, ProviderError, type MediaResult } from './types'

/** TikWM (free tier, daily quota per egress IP). Handles videos and photo/slideshow posts. */
export async function fetchTikTok(url: string): Promise<MediaResult> {
  const form = new URLSearchParams()
  form.set('url', url)
  form.set('hd', '1')

  const res = await fetch('https://www.tikwm.com/api/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0 (compatible; TikDL/1.0)' },
    body: form.toString(),
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) throw new ProviderError('Could not fetch video. Try again.', 502)

  const json = await res.json()
  // TikWM's free tier answers "Free Api Limit: ..." once its quota is used up.
  if (typeof json.msg === 'string' && /limit/i.test(json.msg)) {
    throw new ProviderError('Our download service is very busy right now. Please try again in a few minutes.', 503, 120)
  }
  if (json.code !== 0 || !json.data) {
    throw new ProviderError(json.msg ?? 'Video not found. Make sure the video is public.', 404)
  }

  const d = json.data
  const images: string[] = Array.isArray(d.images)
    ? d.images.filter((u: unknown): u is string => typeof u === 'string' && u.startsWith('https://'))
    : []

  return {
    ...emptyResult('tiktok', String(d.id ?? '')),
    isPhoto: images.length > 0,
    images,
    title: d.title ?? '',
    cover: d.cover ?? '',
    play: d.play ?? '',
    hdplay: d.hdplay ?? d.play ?? '',
    music: d.music ?? '',
    musicTitle: d.music_info?.title ?? '',
    author: { nickname: d.author?.nickname ?? 'Unknown', avatar: d.author?.avatar ?? '', uniqueId: d.author?.unique_id ?? '' },
    stats: { plays: d.play_count ?? 0, likes: d.digg_count ?? 0, comments: d.comment_count ?? 0, shares: d.share_count ?? 0 },
  }
}
