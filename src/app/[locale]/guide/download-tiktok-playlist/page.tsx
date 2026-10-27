import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/seo'
import { article, breadcrumbs, faqPage } from '@/lib/schema'
import { pageDates } from '@/lib/content-dates'
import JsonLd from '@/components/JsonLd'
import GuideFaq from '@/components/GuideFaq'
import Link from 'next/link'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

// English-only guide: no /de or /ar translation exists, so those URLs must 404.
type Props = { params: Promise<{ locale: string }> }
const SLUG = '/guide/download-tiktok-playlist'

export const metadata: Metadata = pageMetadata({
  locale: 'en',
  path: SLUG,
  title: 'Download TikTok Playlists & Multiple Videos',
  description: 'Can you download a TikTok playlist in bulk? How to save several TikTok videos one after another, what bulk tools risk, and how to keep files organised.',
  translated: false,
  ogType: 'article',
})

// Rendered visibly by <GuideFaq> and mirrored in FAQPage JSON-LD.
const FAQ = [
  { q: 'Can you download a full TikTok playlist at once?', a: 'TikTok does not expose playlist links that third-party tools can bulk-process. Each video in a playlist has its own individual URL. TokDown downloads one video per URL — there is no playlist URL you can paste to get all videos at once. The most efficient method is to open each video, copy its link, and paste it into TokDown one at a time.' },
  { q: 'Is there a TikTok bulk downloader?', a: 'No fully reliable bulk downloader exists because TikTok\'s API does not expose playlist video lists to third parties. Browser automation tools exist but are against TikTok\'s terms of service and frequently break as TikTok updates its platform.' },
  { q: 'How do I download all videos from a TikTok account?', a: 'There is no safe one-click way. TikTok\'s "Download your data" export is an archive of account data (JSON or TXT) that lists your activity; it is not a folder of ready-to-watch videos. Save your own videos from the app, and download another creator\'s public videos one link at a time.' },
  { q: 'Is there a limit on how many videos I can download?', a: 'TokDown sets no quota and needs no account, but the TikTok service it relies on limits busy periods. If you get a "try again later" message after many downloads in a row, wait a few minutes and continue.' },
]

const dates = pageDates(SLUG)
const jsonLd = [
  article({ locale: 'en', path: SLUG, headline: 'How to Download TikTok Playlists and Multiple Videos (2026)', description: 'A practical guide to downloading multiple TikTok videos or full playlists — including current limitations and the most efficient workflow.', datePublished: dates.published, dateModified: dates.modified }),
  faqPage(FAQ),
  breadcrumbs('en', [{ name: 'Guides', path: '/guide' }, { name: 'TikTok Playlists', path: SLUG }]),
]

const STEPS = [
  { n: 1, title: 'Open the TikTok playlist you want to download', body: 'Go to the creator\'s profile on TikTok and tap the "Playlists" tab (or scroll to the playlist section). Playlists are collections of videos grouped by the creator.' },
  { n: 2, title: 'Open the first video in the playlist', body: 'Tap the first video you want to download. It plays in the standard TikTok video view.' },
  { n: 3, title: 'Share → Copy Link for that video', body: 'Tap the Share icon (arrow) on the right side. Tap "Copy link". You now have the individual video URL in your clipboard.' },
  { n: 4, title: 'Paste into TokDown and download', body: 'Open tokdown.org in your browser, paste the link, tap Download, then choose "HD · No Watermark". The video saves to your device.' },
  { n: 5, title: 'Repeat for each video in the playlist', body: 'Go back to the playlist, open the next video, and repeat the Copy Link → TokDown process. There is no quota, so work through the playlist at your own pace; if you see a "try again later" message, pause for a few minutes.' },
]

const TIPS = [
  { title: 'Use multiple browser tabs', body: 'Open several TikTok videos in different tabs, copy all the links first, then paste them into TokDown one at a time. This reduces context-switching.' },
  { title: 'Download your own videos without watermark', body: 'If you want to archive your own TikTok content without the watermark, use TokDown: copy the link to each of your public videos and download via TokDown for the clean version.' },
  { title: 'TikTok\'s official data export', body: 'Settings and privacy → Account → Download your data. You get an archive of your account data (JSON or TXT) that lists your posts and activity. It is useful as a record, but it is not a bundle of video files.' },
  { title: 'Organise downloads by playlist name', body: 'Create a folder on your device named after the playlist before you start downloading. Move each downloaded video into that folder as you go — otherwise 20 files named "video" get confusing fast.' },
]

export default async function DownloadTikTokPlaylist({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'en') notFound()

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">
          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>Guide · Updated June 2026</p>
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

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Most efficient workflow for downloading a playlist</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: 'rgba(139,108,255,0.15)', color: 'var(--brand)', border: '1px solid rgba(139,108,255,0.3)' }}>{n}</span>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>No limit — download as many videos as you need, one at a time.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}>
              Start downloading →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tips-h">
            <h2 id="tips-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Tips for bulk downloading</h2>
            <div className="flex flex-col gap-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--brand)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <GuideFaq title="Frequently asked questions" faq={FAQ} />

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

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
          <div className="w-full max-w-2xl px-4 pb-12">
            <AdsterraBanner size="responsive" />
          </div>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'var(--line)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: '/', label: 'Downloader' }, { href: '/tools', label: 'All tools' }, { href: '/guide', label: 'All guides' }, { href: '/about', label: 'About' }, { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' }, { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
