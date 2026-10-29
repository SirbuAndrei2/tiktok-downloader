/**
 * Real publish / last-substantive-edit dates per route (without locale prefix).
 * Feeds the sitemap <lastmod> and Article datePublished/dateModified.
 * Bump `modified` only when the page's content really changes: Google ignores
 * lastmod values that are not consistently accurate.
 * Published dates come from the first git commit of each page.
 */
export const PAGE_DATES: Record<string, { published: string; modified: string }> = {
  '/': { published: '2026-04-24', modified: '2026-10-27' },
  '/tools': { published: '2026-10-20', modified: '2026-10-29' },
  '/guide': { published: '2026-10-27', modified: '2026-10-29' },
  '/about': { published: '2026-05-24', modified: '2026-10-27' },
  '/photo-downloader': { published: '2026-10-20', modified: '2026-10-27' },
  '/facebook-video-downloader': { published: '2026-10-20', modified: '2026-10-27' },
  '/twitter-video-downloader': { published: '2026-10-20', modified: '2026-10-27' },
  '/youtube-thumbnail-downloader': { published: '2026-10-20', modified: '2026-10-27' },
  '/video-compressor': { published: '2026-10-20', modified: '2026-10-27' },
  '/mp4-to-gif': { published: '2026-10-20', modified: '2026-10-27' },
  '/guide/download-tiktok-without-watermark': { published: '2026-05-24', modified: '2026-10-27' },
  '/guide/tiktok-to-mp3': { published: '2026-05-24', modified: '2026-10-27' },
  '/guide/download-tiktok-on-iphone': { published: '2026-06-10', modified: '2026-10-27' },
  '/guide/download-tiktok-on-android': { published: '2026-06-10', modified: '2026-10-27' },
  '/guide/download-tiktok-on-pc': { published: '2026-10-29', modified: '2026-10-29' },
  '/guide/download-tiktok-slideshow': { published: '2026-10-29', modified: '2026-10-29' },
  '/guide/tiktok-no-save-video-option': { published: '2026-10-29', modified: '2026-10-29' },
  '/guide/save-tiktok-draft': { published: '2026-10-29', modified: '2026-10-29' },
  '/guide/tiktok-to-mp4': { published: '2026-06-02', modified: '2026-10-27' },
  '/guide/snaptik-alternative': { published: '2026-06-02', modified: '2026-10-27' },
  '/guide/tiktok-downloader-chrome': { published: '2026-06-10', modified: '2026-10-27' },
  '/guide/download-tiktok-private-video': { published: '2026-06-10', modified: '2026-10-27' },
  '/guide/tiktok-video-to-gif': { published: '2026-06-10', modified: '2026-10-27' },
  '/guide/download-tiktok-playlist': { published: '2026-06-10', modified: '2026-10-27' },
  '/guide/is-it-legal-to-download-tiktok-videos': { published: '2026-10-27', modified: '2026-10-27' },
  '/privacy': { published: '2026-04-24', modified: '2026-10-27' },
  '/terms': { published: '2026-04-24', modified: '2026-10-27' },
  '/dmca': { published: '2026-04-24', modified: '2026-04-24' },
  '/disclaimer': { published: '2026-04-24', modified: '2026-10-27' },
}

export function pageDates(path: string) {
  return PAGE_DATES[path] ?? { published: '2026-04-24', modified: '2026-10-27' }
}
