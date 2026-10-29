/**
 * Shared navigation data for the header/footer so every tool page links to
 * every other tool. Translators are passed in because this runs on the server
 * per request (getTranslations is async and locale-bound).
 */
type T = (key: string) => string

export const TOOL_PAGES = [
  { key: 'video', path: '/', icon: 'Film' },
  { key: 'photo', path: '/photo-downloader', icon: 'Images' },
  { key: 'facebook', path: '/facebook-video-downloader', icon: 'Facebook' },
  { key: 'twitter', path: '/twitter-video-downloader', icon: 'Twitter' },
  { key: 'youtubeThumbnail', path: '/youtube-thumbnail-downloader', icon: 'ImageDown' },
  { key: 'compressor', path: '/video-compressor', icon: 'Minimize2' },
  { key: 'mp4ToGif', path: '/mp4-to-gif', icon: 'ImagePlay' },
] as const

export type ToolPageKey = (typeof TOOL_PAGES)[number]['key']

/** Guides translated into every locale (key = Tools.items.<key>). */
export const TRANSLATED_GUIDES = [
  { key: 'hd', path: '/guide/download-tiktok-without-watermark' },
  { key: 'audio', path: '/guide/tiktok-to-mp3' },
  { key: 'iphone', path: '/guide/download-tiktok-on-iphone' },
  { key: 'android', path: '/guide/download-tiktok-on-android' },
  { key: 'pc', path: '/guide/download-tiktok-on-pc' },
  { key: 'slideshow', path: '/guide/download-tiktok-slideshow' },
  { key: 'noSave', path: '/guide/tiktok-no-save-video-option' },
  { key: 'draft', path: '/guide/save-tiktok-draft' },
] as const

/** English-only guides: they 404 under /de and /ar, so links to them never carry a locale prefix. */
export const EN_GUIDES = [
  { key: 'legal', path: '/guide/is-it-legal-to-download-tiktok-videos' },
  { key: 'mp4', path: '/guide/tiktok-to-mp4' },
  { key: 'gif', path: '/guide/tiktok-video-to-gif' },
  { key: 'chrome', path: '/guide/tiktok-downloader-chrome' },
  { key: 'playlist', path: '/guide/download-tiktok-playlist' },
  { key: 'private', path: '/guide/download-tiktok-private-video' },
  { key: 'snaptik', path: '/guide/snaptik-alternative' },
] as const

type LinkKey = ToolPageKey | (typeof TRANSLATED_GUIDES)[number]['key'] | (typeof EN_GUIDES)[number]['key']

const ALL_LINKS: { key: LinkKey; path: string; en?: true }[] = [
  ...TOOL_PAGES.map((p) => ({ key: p.key, path: p.path })),
  ...TRANSLATED_GUIDES.map((g) => ({ key: g.key, path: g.path })),
  ...EN_GUIDES.map((g) => ({ key: g.key, path: g.path, en: true as const })),
]

/** Contextual "related" links per page (tool pages and the photo downloader). */
const RELATED: Record<string, LinkKey[]> = {
  '/photo-downloader': ['video', 'slideshow', 'audio', 'hd', 'mp4ToGif'],
  '/facebook-video-downloader': ['compressor', 'mp4ToGif', 'twitter', 'legal'],
  '/twitter-video-downloader': ['mp4ToGif', 'compressor', 'facebook', 'youtubeThumbnail'],
  '/youtube-thumbnail-downloader': ['twitter', 'compressor', 'video'],
  '/video-compressor': ['mp4ToGif', 'twitter', 'video', 'iphone'],
  '/mp4-to-gif': ['compressor', 'gif', 'twitter', 'video'],
}

/**
 * Cards for a guide's "Related guides" block: href per key, English-only
 * guides dropped outside /en (they 404 there and would mix languages).
 */
export function guideCards(keys: LinkKey[], locale: string, localePath: string) {
  return keys
    .map((key) => ALL_LINKS.find((l) => l.key === key)!)
    .filter((l) => locale === 'en' || !l.en)
    .map((l) => ({ key: l.key, href: l.en ? l.path : l.path === '/' ? localePath || '/' : `${localePath}${l.path}` }))
}

export type { LinkKey }

/** Related links for `slug`, with locale-aware hrefs; English-only guides are dropped outside /en. */
export function relatedLinks(slug: string, locale: string, localePath: string, tTools: T) {
  return (RELATED[slug] ?? [])
    .map((key) => ALL_LINKS.find((l) => l.key === key)!)
    .filter((l) => locale === 'en' || !l.en)
    .map((l) => ({
      href: l.en ? l.path : l.path === '/' ? localePath || '/' : `${localePath}${l.path}`,
      label: tTools(`items.${l.key}.title`),
    }))
}

export function buildFooterColumns(localePath: string, tNav: T, tFooter: T, tTools: T) {
  return [
    {
      heading: tFooter('toolsHeading'),
      links: [
        { href: `${localePath}/tools`, label: tNav('tools') },
        ...TOOL_PAGES.filter((p) => p.key !== 'video').map((p) => ({ href: `${localePath}${p.path}`, label: tTools(`items.${p.key}.title`) })),
      ],
    },
    {
      heading: tFooter('guidesHeading'),
      links: [
        { href: `${localePath}/guide`, label: tNav('allGuides') },
        { href: `${localePath}/guide/download-tiktok-without-watermark`, label: tNav('downloadGuide') },
        { href: `${localePath}/guide/tiktok-to-mp3`, label: tNav('mp3Guide') },
        { href: `${localePath}/guide/download-tiktok-on-iphone`, label: tTools('items.iphone.title') },
        { href: `${localePath}/guide/download-tiktok-on-android`, label: tTools('items.android.title') },
        { href: `${localePath}/guide/download-tiktok-on-pc`, label: tTools('items.pc.title') },
        { href: `${localePath}/about`, label: tNav('about') },
      ],
    },
    {
      heading: tFooter('legalHeading'),
      links: [
        { href: '/privacy', label: tNav('privacy') },
        { href: '/terms', label: tNav('terms') },
        { href: '/dmca', label: tNav('dmca') },
        { href: '/disclaimer', label: tNav('disclaimer') },
      ],
    },
  ]
}
