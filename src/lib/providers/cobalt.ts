import { emptyResult, ProviderError, type MediaResult, type Platform } from './types'

/**
 * Optional upstream: a self-hosted cobalt instance (https://github.com/imputnet/cobalt)
 * running on a non-datacentre egress. It covers TikTok (no watermark), Facebook,
 * Instagram, Twitter and more, and is the way around TikWM's shared-IP quota and
 * Facebook/Instagram login walls on Cloudflare IPs.
 *
 * Enabled only when the Worker has the `COBALT_API_URL` (and optional
 * `COBALT_API_KEY`) variable; otherwise `fetchViaCobalt` returns null and the
 * caller falls back to the built-in provider.
 */
function config() {
  const url = (process.env.COBALT_API_URL ?? '').replace(/\/$/, '')
  return url ? { url, key: process.env.COBALT_API_KEY ?? '' } : null
}

export function cobaltEnabled(): boolean {
  return config() !== null
}

export async function fetchViaCobalt(url: string, platform: Platform): Promise<MediaResult | null> {
  const cfg = config()
  if (!cfg) return null
  const res = await fetch(cfg.url + '/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(cfg.key ? { Authorization: `Api-Key ${cfg.key}` } : {}),
    },
    body: JSON.stringify({ url, videoQuality: '1080', filenameStyle: 'basic', alwaysProxy: false }),
    signal: AbortSignal.timeout(20_000),
  })
  if (!res.ok) throw new ProviderError('The download service did not answer. Please try again.', 502)
  const j = await res.json()
  // cobalt v10 responses: { status: 'redirect'|'tunnel'|'picker'|'error', url?, picker?[], audio?, filename? }
  if (j.status === 'error') {
    throw new ProviderError(j.error?.code === 'error.api.content.video.private' ? 'This content is private.' : 'Could not fetch this link. Try again.', 404)
  }
  const base = emptyResult(platform, '')
  if (j.status === 'picker' && Array.isArray(j.picker)) {
    const images = j.picker.filter((p: { type: string }) => p.type === 'photo').map((p: { url: string }) => p.url)
    const video = j.picker.find((p: { type: string }) => p.type === 'video')?.url ?? ''
    return { ...base, images, isPhoto: images.length > 0 && !video, hdplay: video, play: video, music: j.audio ?? '', title: j.filename ?? '' }
  }
  if ((j.status === 'redirect' || j.status === 'tunnel') && j.url) {
    return { ...base, hdplay: j.url, play: j.url, title: j.filename ?? '' }
  }
  throw new ProviderError('Unexpected answer from the download service.', 502)
}
