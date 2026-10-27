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
const SLUG = '/guide/tiktok-downloader-chrome'

export const metadata: Metadata = pageMetadata({
  locale: 'en',
  path: SLUG,
  title: 'TikTok Downloader for Chrome – No Extension',
  description: 'Download TikTok videos in Google Chrome without installing an extension: paste the link, save the MP4, and see why web tools beat risky Chrome add-ons.',
  translated: false,
  ogType: 'article',
})

// Rendered visibly by <GuideFaq> and mirrored in FAQPage JSON-LD.
const FAQ = [
  { q: 'Do I need a Chrome extension to download TikTok?', a: 'No. TokDown is a web app that works directly in Chrome without any extension or plugin. Just open tokdown.org, paste the link, and download.' },
  { q: 'Where does Chrome save downloaded TikTok videos?', a: 'Chrome saves downloads to your default Downloads folder (C:\\Users\\YourName\\Downloads on Windows, ~/Downloads on Mac). You can change this in Chrome Settings → Downloads.' },
  { q: 'Is a TikTok downloader Chrome extension safe?', a: 'Some are, but an extension can usually read and change the pages you visit, so a badly made one, or one that is later sold to a new owner, can inject ads or track you. A website needs no permissions at all: paste the link in a normal tab and Chrome saves the MP4 like any other download.' },
  { q: 'Does TokDown work on Chrome for Android?', a: 'Yes. Open tokdown.org in Chrome on Android, paste the TikTok link, and tap Download. The video saves to your Downloads folder and is accessible from your Gallery app.' },
  { q: 'Is there a TikTok Chrome extension?', a: 'There are third-party TikTok downloader extensions, but most require broad browser permissions and pose privacy risks. TokDown requires no extension — it is a website, so it cannot access your browser data or other tabs.' },
]

const dates = pageDates(SLUG)
const jsonLd = [
  article({ locale: 'en', path: SLUG, headline: 'How to Download TikTok Videos in Google Chrome (2026)', description: 'Step-by-step guide to downloading TikTok videos in Chrome — no extension required, HD quality, no watermark.', datePublished: dates.published, dateModified: dates.modified }),
  faqPage(FAQ),
  breadcrumbs('en', [{ name: 'Guides', path: '/guide' }, { name: 'TikTok Downloader for Chrome', path: SLUG }]),
]

const STEPS = [
  { n: 1, title: 'Copy the TikTok video link', body: 'Open TikTok in the app or at tiktok.com. Tap the Share icon (the arrow) on the right side of the video, then tap "Copy link". On desktop, you can also copy the URL directly from the address bar.' },
  { n: 2, title: 'Open a new Chrome tab and go to TokDown', body: 'Press Ctrl+T (Windows) or Cmd+T (Mac) to open a new tab in Chrome. Type tokdown.org in the address bar and press Enter.' },
  { n: 3, title: 'Paste the TikTok link', body: 'Click the input field on TokDown and paste your TikTok URL (Ctrl+V or Cmd+V). Then click the Download button.' },
  { n: 4, title: 'Select HD quality and save', body: 'When the download options appear, click "HD · No Watermark". Chrome will start downloading immediately. A download indicator appears in the toolbar — click it to see progress.' },
  { n: 5, title: 'Find your file in Downloads', body: 'The MP4 file appears in Chrome\'s downloads bar at the bottom (or top-right on newer Chrome). Click the file name to open it, or press Ctrl+J (Cmd+J on Mac) to see all downloads.' },
]

const TIPS = [
  { title: 'No extension needed — ever', body: 'TokDown is a website, not a browser extension. Extensions require broad permissions ("read and change all your data on websites you visit"). TokDown has no such access — it only runs on its own page.' },
  { title: 'Change Chrome\'s default download folder', body: 'Go to Chrome Settings → Downloads → Change the location. Set it to your Desktop or a dedicated Videos folder so downloaded TikToks are easy to find.' },
  { title: 'Chrome on Android saves to Downloads', body: 'On Android Chrome, files save to the device\'s Downloads folder. Open the Files app or your Gallery app to find and play the video after downloading.' },
  { title: 'Choose where Chrome saves files', body: 'Chrome → Settings → Downloads → turn on "Ask where to save each file before downloading" if you want to file TikToks straight into a folder instead of Downloads.' },
]

export default async function TikTokDownloaderChrome({ params }: Props) {
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
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>Chrome Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              TikTok Downloader for Chrome
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Download any TikTok video directly in Google Chrome — no extension, no plugin, no account. Just a website that works.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>How to download TikTok in Chrome</h2>
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
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Try it now — paste any TikTok link and download in Chrome.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}>
              Download a TikTok video →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tips-h">
            <h2 id="tips-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Chrome-specific tips</h2>
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
                { href: '/guide/download-tiktok-on-iphone', icon: '📱', title: 'Download TikTok on iPhone', desc: 'Save TikTok videos to your iPhone Camera Roll via Safari.' },
                { href: '/guide/download-tiktok-on-android', icon: '🤖', title: 'Download TikTok on Android', desc: 'Save TikTok videos to your Android gallery.' },
                { href: '/guide/tiktok-to-mp4', icon: '🎬', title: 'TikTok to MP4', desc: 'Download any TikTok as an MP4 for editing or sharing.' },
                { href: '/guide/download-tiktok-without-watermark', icon: '🚫', title: 'No Watermark Guide', desc: 'Full walkthrough for all devices and browsers.' },
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
