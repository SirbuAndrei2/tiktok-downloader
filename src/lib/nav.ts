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
        { href: `${localePath}/guide/download-tiktok-without-watermark`, label: tNav('downloadGuide') },
        { href: `${localePath}/guide/tiktok-to-mp3`, label: tNav('mp3Guide') },
        { href: `${localePath}/guide/download-tiktok-on-iphone`, label: tTools('items.iphone.title') },
        { href: `${localePath}/guide/download-tiktok-on-android`, label: tTools('items.android.title') },
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
