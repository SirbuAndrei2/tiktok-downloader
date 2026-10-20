import { BROWSER_HEADERS, emptyResult, ProviderError, type MediaResult } from './types'

/**
 * TikTok fallback that reads the public video page itself (no third-party API).
 * Used when TikWM's shared free quota is exhausted. The web renditions carry
 * TikTok's watermark, so results are flagged `watermarked: true`, and the CDN
 * requires the page's cookies + Referer, so the cookie is passed to /api/proxy.
 * Verified from Cloudflare's edge on 2026-10-20 (206 video/mp4 with cookie+referer).
 */
interface Bitrate { GearName?: string; PlayAddr?: { UrlList?: string[] } }

async function resolveVideoUrl(url: string): Promise<string> {
  // vm./vt. short links redirect to the canonical /@user/video/<id> URL.
  if (/\/\/(vm|vt)\.tiktok\.com\//.test(url) || /\/t\//.test(url)) {
    const r = await fetch(url, { method: 'HEAD', redirect: 'manual', headers: BROWSER_HEADERS, signal: AbortSignal.timeout(8_000) })
    const loc = r.headers.get('location')
    if (loc) return loc.split('?')[0]
  }
  return url
}

function pickBest(bitrates: Bitrate[]): string {
  const scored = bitrates
    .map((b) => ({ url: b.PlayAddr?.UrlList?.[0] ?? '', height: Number((/(\d{3,4})/.exec(b.GearName ?? '') ?? [])[1] ?? 0) }))
    .filter((b) => b.url)
    .sort((a, b) => b.height - a.height)
  return scored[0]?.url ?? ''
}

export async function fetchTikTokWeb(url: string): Promise<MediaResult> {
  const target = await resolveVideoUrl(url)
  const res = await fetch(target, { headers: BROWSER_HEADERS, redirect: 'follow', signal: AbortSignal.timeout(12_000) })
  if (!res.ok) throw new ProviderError('TikTok did not answer. Please try again.', 502)
  const cookies = (typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [res.headers.get('set-cookie') ?? ''])
    .map((c) => c.split(';')[0])
    .filter(Boolean)
    .join('; ')
  const html = await res.text()
  const m = /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([\s\S]*?)<\/script>/.exec(html)
  if (!m) throw new ProviderError('Could not read this video page. Please try again later.', 502)

  let item: Record<string, unknown> | undefined
  try {
    const detail = JSON.parse(m[1]).__DEFAULT_SCOPE__?.['webapp.video-detail']
    if (detail?.statusCode && detail.statusCode !== 0) {
      throw new ProviderError('Video not found. Make sure the video is public.', 404)
    }
    item = detail?.itemInfo?.itemStruct
  } catch (e) {
    if (e instanceof ProviderError) throw e
  }
  if (!item) throw new ProviderError('Video not found. Make sure the video is public.', 404)

  const video = (item.video ?? {}) as { playAddr?: string; downloadAddr?: string; cover?: string; bitrateInfo?: Bitrate[] }
  const music = (item.music ?? {}) as { playUrl?: string; title?: string }
  const author = (item.author ?? {}) as { nickname?: string; uniqueId?: string; avatarMedium?: string }
  const stats = (item.stats ?? {}) as { playCount?: number; diggCount?: number; commentCount?: number; shareCount?: number }
  const imagePost = item.imagePost as { images?: { imageURL?: { urlList?: string[] } }[] } | undefined
  const images = (imagePost?.images ?? []).map((i) => i.imageURL?.urlList?.[0] ?? '').filter(Boolean)

  const best = pickBest(video.bitrateInfo ?? []) || video.downloadAddr || video.playAddr || ''
  const sd = video.playAddr || best
  if (!best && images.length === 0) throw new ProviderError('This post has no downloadable media.', 404)

  return {
    ...emptyResult('tiktok', String(item.id ?? '')),
    watermarked: true,
    cookie: cookies,
    title: String(item.desc ?? ''),
    cover: video.cover ?? '',
    hdplay: best,
    play: sd,
    music: music.playUrl ?? '',
    musicTitle: music.title ?? '',
    images,
    isPhoto: images.length > 0,
    author: { nickname: author.nickname ?? '', avatar: author.avatarMedium ?? '', uniqueId: author.uniqueId ?? '' },
    stats: { plays: stats.playCount ?? 0, likes: stats.diggCount ?? 0, comments: stats.commentCount ?? 0, shares: stats.shareCount ?? 0 },
  }
}
