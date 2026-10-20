import { BROWSER_HEADERS, decodeEntities, emptyResult, ProviderError, unescapeJson, type MediaResult } from './types'

/**
 * Facebook public videos via the login-free video plugin embed
 * (facebook.com/plugins/video.php), which inlines `hd_src` / `sd_src`.
 * Title and thumbnail come from the watch page's <title>/og tags when available.
 */
async function resolveShareUrl(url: string): Promise<string> {
  if (!/fb\.watch\/|\/share\//.test(url)) return url
  try {
    const r = await fetch(url, { headers: BROWSER_HEADERS, redirect: 'manual', signal: AbortSignal.timeout(8_000) })
    const loc = r.headers.get('location')
    return loc && !/login/.test(loc) ? loc : url
  } catch {
    return url
  }
}

function pick(html: string, re: RegExp): string {
  const m = re.exec(html)
  return m ? unescapeJson(m[1]) : ''
}

export async function fetchFacebook(url: string): Promise<MediaResult> {
  const target = await resolveShareUrl(url)
  const idMatch = /\/videos\/(?:[^/]+\/)?(\d{6,})|[?&]v=(\d{6,})|\/reel\/(\d{6,})|\/watch\/\?v=(\d{6,})/.exec(target)
  const id = idMatch?.slice(1).find(Boolean) ?? ''

  const plugin = await fetch(`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(target)}&show_text=0&width=560`, {
    headers: BROWSER_HEADERS,
    signal: AbortSignal.timeout(12_000),
  })
  if (!plugin.ok) throw new ProviderError('Facebook did not answer. Please try again in a moment.', 502)
  const html = await plugin.text()

  const hd = pick(html, /"hd_src":"([^"]+)"/) || pick(html, /"browser_native_hd_url":"([^"]+)"/) || pick(html, /"playable_url_quality_hd":"([^"]+)"/)
  const sd = pick(html, /"sd_src":"([^"]+)"/) || pick(html, /"browser_native_sd_url":"([^"]+)"/) || pick(html, /"playable_url":"([^"]+)"/)
  if (!hd && !sd) {
    // Facebook answers data-centre IPs (incl. Cloudflare Workers) with a login wall even for public
    // videos. Say so honestly instead of blaming the video; a non-datacentre egress (see cobalt.ts) fixes it.
    if (/login_form|"LoginForm"|checkpoint/.test(html)) {
      throw new ProviderError('Facebook is temporarily blocking our servers. Please try again later.', 503, 600)
    }
    throw new ProviderError('Could not read this video. It may be private, age-restricted, in a group, or a live stream.', 404)
  }
  let cover = pick(html, /"thumbnailImage":\{"uri":"([^"]+)"/) || pick(html, /"preferred_thumbnail":\{"image":\{"uri":"([^"]+)"/)

  // Best-effort metadata from the public page (works even when the page itself shows a login wall).
  let title = ''
  let page = ''
  try {
    const r = await fetch(target, { headers: BROWSER_HEADERS, redirect: 'follow', signal: AbortSignal.timeout(10_000) })
    const ph = await r.text()
    title = decodeEntities(pick(ph, /<meta property="og:title" content="([^"]*)"/) || pick(ph, /<title[^>]*>([^<]*)/))
    cover ||= pick(ph, /<meta property="og:image" content="([^"]*)"/)
    page = pick(ph, /"ownerName":"([^"]+)"/) || pick(ph, /"name":"([^"]{2,80})","profile_picture"/)
  } catch {
    /* metadata is optional */
  }
  // "2.8M views · 1.3K reactions | Caption" → "Caption"
  title = title.replace(/^[^|]*\|\s*/, '').replace(/\s*\|\s*Facebook$/i, '').trim()

  return {
    ...emptyResult('facebook', id),
    title,
    cover,
    hdplay: hd || sd,
    play: sd || hd,
    author: { nickname: page, avatar: '', uniqueId: '' },
  }
}
