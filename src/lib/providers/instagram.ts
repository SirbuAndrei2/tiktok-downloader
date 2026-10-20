import { BROWSER_HEADERS, emptyResult, ProviderError, unescapeJson, type MediaResult } from './types'

/**
 * Instagram public posts/reels. Instagram serves a login wall to most data-centre
 * IPs, so this is best-effort: the captioned embed first, then og: tags on the
 * post page. When both are walled we answer 503 so the UI can say so honestly.
 * Not linked from the site until it has a reliable upstream (see CLAUDE.md).
 */
export async function fetchInstagram(url: string): Promise<MediaResult> {
  const m = /\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]{5,})/.exec(url)
  if (!m) throw new ProviderError('Please paste a link to a post or reel, e.g. https://www.instagram.com/reel/…', 400)
  const code = m[1]
  const pick = (html: string, re: RegExp) => {
    const r = re.exec(html)
    return r ? unescapeJson(r[1]) : ''
  }

  let video = ''
  let image = ''
  let user = ''
  try {
    const e = await fetch(`https://www.instagram.com/p/${code}/embed/captioned/`, { headers: BROWSER_HEADERS, signal: AbortSignal.timeout(10_000) })
    const h = await e.text()
    video = pick(h, /video_url\\?":\\?"([^"\\]+)/) || pick(h, /"video_url":"([^"]+)"/) || pick(h, /<video[^>]+src="([^"]+)"/)
    image = pick(h, /display_url\\?":\\?"([^"\\]+)/) || pick(h, /"display_url":"([^"]+)"/) || pick(h, /class="EmbeddedMediaImage"[^>]+src="([^"]+)"/)
    user = pick(h, /"username":"([^"]+)"/) || pick(h, /class="UsernameText">([^<]+)</)
  } catch {
    /* fall through to og: tags */
  }
  if (!video && !image) {
    try {
      const p = await fetch(`https://www.instagram.com/reel/${code}/`, { headers: BROWSER_HEADERS, redirect: 'follow', signal: AbortSignal.timeout(10_000) })
      const h = await p.text()
      video = pick(h, /<meta property="og:video" content="([^"]+)"/)
      image = pick(h, /<meta property="og:image" content="([^"]+)"/)
    } catch {
      /* handled below */
    }
  }
  if (!video && !image) {
    throw new ProviderError('Instagram is blocking automated access right now. Please try again later.', 503, 300)
  }
  return {
    ...emptyResult('instagram', code),
    cover: image,
    hdplay: video,
    play: video,
    images: video ? [] : [image],
    isPhoto: !video,
    author: { nickname: user, avatar: '', uniqueId: user },
  }
}
