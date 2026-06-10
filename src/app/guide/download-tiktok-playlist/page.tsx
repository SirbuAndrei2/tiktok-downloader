import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'
const SLUG = '/guide/download-tiktok-playlist'

export const metadata: Metadata = {
  title: 'How to Download TikTok Playlists & Multiple Videos (2026)',
  description: 'Can you download a TikTok playlist in bulk? Full guide on how to download multiple TikTok videos — one by one or in batch. Free, HD, no watermark.',
  alternates: { canonical: `${BASE}${SLUG}` },
  openGraph: {
    title: 'How to Download TikTok Playlists & Multiple Videos (2026)',
    description: 'Download multiple TikTok videos or full playlists. Step-by-step guide for bulk downloading TikTok content without watermark.',
    url: `${BASE}${SLUG}`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Download TikTok Playlists and Multiple Videos (2026)',
    description: 'A practical guide to downloading multiple TikTok videos or full playlists — including current limitations and the most efficient workflow.',
    url: `${BASE}${SLUG}`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-10',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}${SLUG}` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can you download a full TikTok playlist at once?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok does not expose playlist links that third-party tools can bulk-process. Each video in a playlist has its own individual URL. TokDown downloads one video per URL — there is no playlist URL you can paste to get all videos at once. The most efficient method is to open each video, copy its link, and paste it into TokDown one at a time.' } },
      { '@type': 'Question', name: 'Is there a TikTok bulk downloader?', acceptedAnswer: { '@type': 'Answer', text: 'No fully reliable bulk downloader exists because TikTok\'s API does not expose playlist video lists to third parties. Browser automation tools exist but are against TikTok\'s terms of service and frequently break as TikTok updates its platform.' } },
      { '@type': 'Question', name: 'How do I download all videos from a TikTok account?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok itself provides a data export feature in Settings → Privacy → Download your data. This gives you all your own videos (with watermark). For another creator\'s videos, you would need to download each public video individually.' } },
      { '@type': 'Question', name: 'Is there a daily limit on TokDown?', acceptedAnswer: { '@type': 'Answer', text: 'No. TokDown has no daily download limit, no rate limiting, and no account required. You can download as many public videos as you want, one at a time.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'Download TikTok Playlist', item: `${BASE}${SLUG}` },
    ],
  },
]

const STEPS = [
  { n: 1, title: 'Open the TikTok playlist you want to download', body: 'Go to the creator\'s profile on TikTok and tap the "Playlists" tab (or scroll to the playlist section). Playlists are collections of videos grouped by the creator.' },
  { n: 2, title: 'Open the first video in the playlist', body: 'Tap the first video you want to download. It plays in the standard TikTok video view.' },
  { n: 3, title: 'Share → Copy Link for that video', body: 'Tap the Share icon (arrow) on the right side. Tap "Copy link". You now have the individual video URL in your clipboard.' },
  { n: 4, title: 'Paste into TokDown and download', body: 'Open tokdown.org in your browser, paste the link, tap Download, then choose "HD · No Watermark". The video saves to your device.' },
  { n: 5, title: 'Repeat for each video in the playlist', body: 'Go back to the playlist, open the next video, and repeat the Copy Link → TokDown process. TokDown has no daily limit, so you can work through the entire playlist at your own pace.' },
]

const TIPS = [
  { title: 'Use multiple browser tabs', body: 'Open several TikTok videos in different tabs, copy all the links first, then paste them into TokDown one at a time. This reduces context-switching.' },
  { title: 'Download your own videos without watermark', body: 'If you want to archive your own TikTok content without the watermark, use TokDown: copy the link to each of your public videos and download via TokDown for the clean version.' },
  { title: 'TikTok\'s official data export', body: 'TikTok Settings → Privacy → Download your data → Videos. This gives all your own videos in one go (with watermark). Processing takes up to 30 days depending on account size.' },
  { title: 'Organise downloads by playlist name', body: 'Create a folder on your device named after the playlist before you start downloading. Move each downloaded video into that folder as you go — otherwise 20 files named "video" get confusing fast.' },
]

export default function DownloadTikTokPlaylist() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">
          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              How to Download TikTok Playlists
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              TikTok does not offer a single playlist download URL — each video must be downloaded individually. Here is the most efficient workflow, plus what bulk tools can and cannot do.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-10 faq-item" aria-labelledby="reality-h">
            <h2 id="reality-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>The honest truth about playlist downloads</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--t3)' }}>
              TikTok playlists do not have a standalone URL that third-party tools can use to extract all videos at once. Each video in a playlist is an independent URL. This means <strong style={{ color: 'var(--t2)' }}>every downloader — paid or free — downloads TikTok videos one at a time</strong>.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              Sites that claim "playlist batch download" either process one video at a time behind the scenes, require you to paste all links manually anyway, or use browser automation scripts that frequently break and violate TikTok's terms of service.
            </p>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Most efficient workflow for downloading a playlist</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)' }}>{n}</span>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>No limit — download as many videos as you need, one at a time.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}>
              Start downloading →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tips-h">
            <h2 id="tips-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Tips for bulk downloading</h2>
            <div className="flex flex-col gap-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: '#ff2d55' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/guide/download-tiktok-without-watermark', icon: '🚫', title: 'No Watermark Guide', desc: 'Full guide for downloading TikTok videos on every device.' },
                { href: '/guide/tiktok-to-mp4', icon: '🎬', title: 'TikTok to MP4', desc: 'Download TikTok videos as MP4 files in HD quality.' },
                { href: '/guide/download-tiktok-private-video', icon: '🔒', title: 'Private TikTok Videos', desc: 'What can and cannot be downloaded — honest explanation.' },
                { href: '/guide/download-tiktok-on-iphone', icon: '📱', title: 'Download on iPhone', desc: 'Save TikTok videos directly to your iPhone Camera Roll.' },
              ].map(({ href, icon, title, desc }) => (
                <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs" style={{ color: 'var(--t4)' }}>{desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: '/', label: 'Downloader' }, { href: '/about', label: 'About' }, { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' }, { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
