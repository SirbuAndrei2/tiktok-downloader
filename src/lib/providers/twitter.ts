import { BROWSER_HEADERS, emptyResult, ProviderError, type MediaResult } from './types'

/**
 * Twitter/X via the public syndication endpoint used by embedded tweets
 * (no API key). The `token` is derived from the tweet id the same way
 * react-tweet does it.
 */
function syndicationToken(id: string) {
  return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, '')
}

async function resolveTweetId(url: string): Promise<string> {
  let target = url
  // t.co short links redirect to the tweet.
  if (/^https?:\/\/t\.co\//.test(url)) {
    const r = await fetch(url, { method: 'HEAD', redirect: 'manual', headers: BROWSER_HEADERS, signal: AbortSignal.timeout(8_000) })
    target = r.headers.get('location') ?? url
  }
  const m = /\/status(?:es)?\/(\d{8,25})/.exec(target)
  if (!m) throw new ProviderError('Please paste a link to a tweet, e.g. https://x.com/user/status/123…', 400)
  return m[1]
}

interface Variant { bitrate?: number; content_type?: string; url?: string; type?: string; src?: string }

export async function fetchTwitter(url: string): Promise<MediaResult> {
  const id = await resolveTweetId(url)
  const res = await fetch(`https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${syndicationToken(id)}&lang=en`, {
    headers: BROWSER_HEADERS,
    signal: AbortSignal.timeout(10_000),
  })
  if (res.status === 404) throw new ProviderError('Tweet not found. It may be deleted, private, or age-restricted.', 404)
  if (!res.ok) throw new ProviderError('Twitter did not answer. Please try again in a moment.', 502)
  const j = await res.json()
  if (j?.__typename === 'TweetTombstone') throw new ProviderError('This tweet is unavailable (deleted or restricted).', 404)

  const media: { type: string; media_url_https?: string; video_info?: { variants?: Variant[] } }[] = j.mediaDetails ?? []
  const videoMedia = media.find((m) => m.type === 'video' || m.type === 'animated_gif')
  // Progressive MP4 variants, best bitrate first.
  const variants: Variant[] = (videoMedia?.video_info?.variants ?? j.video?.variants ?? [])
    .filter((v: Variant) => (v.content_type ?? v.type) === 'video/mp4' && (v.url ?? v.src))
    .sort((a: Variant, b: Variant) => (b.bitrate ?? 0) - (a.bitrate ?? 0))
  const photos = media.filter((m) => m.type === 'photo' && m.media_url_https).map((m) => `${m.media_url_https}?name=large`)

  if (variants.length === 0 && photos.length === 0) {
    throw new ProviderError('This tweet has no video or photos to download.', 404)
  }

  const hd = variants[0]?.url ?? variants[0]?.src ?? ''
  const sd = variants[variants.length - 1]?.url ?? variants[variants.length - 1]?.src ?? hd
  return {
    ...emptyResult('twitter', id),
    title: (j.text ?? '').replace(/\s*https:\/\/t\.co\/\S+$/g, '').trim(),
    cover: videoMedia?.media_url_https ?? j.video?.poster ?? photos[0] ?? '',
    hdplay: hd,
    play: sd,
    images: variants.length === 0 ? photos : [],
    isPhoto: variants.length === 0 && photos.length > 0,
    author: { nickname: j.user?.name ?? '', avatar: j.user?.profile_image_url_https?.replace('_normal', '_200x200') ?? '', uniqueId: j.user?.screen_name ?? '' },
    stats: { plays: 0, likes: j.favorite_count ?? 0, comments: j.conversation_count ?? 0, shares: 0 },
  }
}
