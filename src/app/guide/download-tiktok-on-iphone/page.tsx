import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'How to Download TikTok Videos on iPhone — Save to Camera Roll (2026)',
  description: 'Save any TikTok video to your iPhone camera roll without watermark. Step-by-step guide for iOS Safari — no app install, no account, free.',
  alternates: { canonical: `${BASE}/guide/download-tiktok-on-iphone` },
  openGraph: {
    title: 'How to Download TikTok Videos on iPhone — Save to Camera Roll (2026)',
    description: 'Complete iPhone guide: copy any TikTok link, paste into TokDown, and save the clean HD video straight to your Photos app. Free, no login.',
    url: `${BASE}/guide/download-tiktok-on-iphone`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Download TikTok Videos on iPhone and Save to Camera Roll (2026)',
    description: 'Step-by-step guide for saving TikTok videos without watermark on iPhone using Safari — no app download required.',
    url: `${BASE}/guide/download-tiktok-on-iphone`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-01',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'TokDown',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/guide/download-tiktok-on-iphone` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to download a TikTok video on iPhone without watermark',
    description: 'Save any public TikTok video to your iPhone Camera Roll in HD without the TikTok watermark — using TokDown in Safari.',
    totalTime: 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'iPhone with Safari browser' }, { '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Open TikTok and find the video', text: 'Open the TikTok app on your iPhone and navigate to the video you want to save.' },
      { '@type': 'HowToStep', position: 2, name: 'Tap Share → Copy Link', text: 'Tap the Share icon (arrow pointing right) on the right side of the video. In the share sheet, tap "Copy link". The video URL is copied to your clipboard.' },
      { '@type': 'HowToStep', position: 3, name: 'Open Safari and go to TokDown', text: 'Open Safari on your iPhone and type tokdown.org in the address bar. Tap the input field and paste the TikTok link.' },
      { '@type': 'HowToStep', position: 4, name: 'Tap Download and choose HD No Watermark', text: 'Tap the Download button. When the options appear, tap "HD · No Watermark" to start downloading the clean video.' },
      { '@type': 'HowToStep', position: 5, name: 'Save video to Camera Roll', text: 'The video downloads to the Files app. Open Files → Downloads, long-press the video file, tap Share, then tap "Save Video". The video is now in your Photos Camera Roll.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I save a TikTok video to my Camera Roll on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Download the video using TokDown in Safari. It saves to the Files app first. Open Files → Downloads, long-press the video, tap Share → "Save Video" to move it to your Camera Roll in Photos.' } },
      { '@type': 'Question', name: 'Does TokDown work in Safari on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TokDown is a web app that works in Safari on all iPhone models running iOS 14 and later. No app installation required.' } },
      { '@type': 'Question', name: 'Why does the file go to Files instead of Photos on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Safari downloads all files to the Files app by default. Videos do not automatically go to Photos — you need to open Files, find the video, and use Share → "Save Video" to move it to your Camera Roll.' } },
      { '@type': 'Question', name: 'Can I download TikTok without the watermark on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TokDown fetches the original video file before TikTok applies the watermark, so what you download is the clean version in full HD.' } },
      { '@type': 'Question', name: 'Does it work with TikTok Live?', acceptedAnswer: { '@type': 'Answer', text: 'No. TikTok Lives are streamed in real time and cannot be downloaded with TokDown. Only recorded (non-live) public videos are supported.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'Download TikTok on iPhone', item: `${BASE}/guide/download-tiktok-on-iphone` },
    ],
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Open TikTok and find the video',
    body: 'Open the TikTok app on your iPhone and scroll to — or search for — the video you want to save.',
  },
  {
    n: 2,
    title: 'Tap Share → Copy Link',
    body: 'Tap the Share icon (the arrow pointing right, on the right side of the video). In the bottom sheet that appears, tap "Copy link". The video URL is now in your clipboard.',
  },
  {
    n: 3,
    title: 'Open Safari and go to TokDown',
    body: 'Open Safari on your iPhone. In the address bar, type tokdown.org and load the page. Tap the input field and paste the TikTok link (long-press → Paste).',
  },
  {
    n: 4,
    title: 'Tap Download',
    body: 'Tap the red Download button. TokDown fetches the video in a few seconds. When the options appear, tap "HD · No Watermark" to download the clean, high-definition version.',
  },
  {
    n: 5,
    title: 'Save to Camera Roll from Files',
    body: 'On iPhone, downloaded files go to the Files app. Open the Files app → tap Browse → Downloads. Long-press the video file and tap Share → "Save Video". The video moves to your Photos Camera Roll.',
  },
]

const TIPS = [
  {
    title: 'Use Safari, not the TikTok in-app browser',
    body: 'TikTok\'s built-in browser blocks downloads. Always open tokdown.org in Safari (the blue compass icon) — not inside TikTok itself.',
  },
  {
    title: 'iOS 16+ has a Download button in Safari',
    body: 'On iOS 16 and later, Safari shows a download progress indicator and a Downloads icon (arrow in a circle) in the toolbar. Tap it to see your downloaded file immediately.',
  },
  {
    title: 'Set your default download location',
    body: 'Go to Settings → Safari → Downloads and make sure it is set to "On My iPhone" so files are easy to find in the Files app.',
  },
  {
    title: 'Saving multiple videos? Batch them',
    body: 'TokDown has no daily limit. Open each TikTok link in a new Safari tab, paste them one at a time, and move all files to Camera Roll afterward.',
  },
]

const TROUBLESHOOT = [
  {
    problem: '"Download failed" or no options appear',
    fix: 'Make sure the video is public, not private. Also check that you copied the full link from the TikTok Share → Copy Link menu — not from the browser address bar, which may be a short redirect URL.',
  },
  {
    problem: 'Video file saves as .webm or .mp4 but won\'t play',
    fix: 'On iPhone this is rare, but if it happens rename the extension to .mp4 in the Files app. Long-press the file → Rename → change the extension.',
  },
  {
    problem: '"Save Video" option not visible in the share sheet',
    fix: 'Scroll down in the share sheet — the "Save Video" option may be below the fold. If it still doesn\'t appear, make sure the file is a valid .mp4. Some browsers also require you to grant Photos access in Settings → Privacy → Photos.',
  },
  {
    problem: 'Download is very slow',
    fix: 'TikTok video files can be 20–80 MB for HD videos. Downloading over cellular data may be slow. Switch to Wi-Fi for faster downloads.',
  },
]

export default function DownloadTikTokOnIphone() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>iPhone Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              How to Download TikTok Videos on iPhone
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Save any TikTok video to your Camera Roll in HD — without the watermark, without an app, and without a TikTok account. Works in Safari on every iPhone.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Step-by-step: download TikTok to iPhone Camera Roll
            </h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="faq-item flex gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)' }}
                  >
                    {n}
                  </span>
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
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Ready to try? Paste any TikTok link below — no login needed.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
            >
              Download a TikTok video →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tips-h">
            <h2 id="tips-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              iPhone-specific tips
            </h2>
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

          <section className="w-full max-w-2xl mb-12" aria-labelledby="trouble-h">
            <h2 id="trouble-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Troubleshooting on iPhone
            </h2>
            <div className="flex flex-col gap-3">
              {TROUBLESHOOT.map(({ problem, fix }) => (
                <div key={problem} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>Problem: {problem}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}><strong style={{ color: 'var(--t2)' }}>Fix:</strong> {fix}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/guide/download-tiktok-on-android" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🤖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download TikTok on Android</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Save TikTok videos to your Android gallery — no watermark.</p>
              </Link>
              <Link href="/guide/download-tiktok-without-watermark" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Full No-Watermark Guide</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Complete walkthrough for all devices including PC and Mac.</p>
              </Link>
              <Link href="/guide/tiktok-to-mp3" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP3</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Extract and save just the audio from any TikTok video.</p>
              </Link>
              <Link href="/guide/tiktok-to-mp4" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎬</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP4</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Download any TikTok as an MP4 file for editing or sharing.</p>
              </Link>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[
              { href: '/', label: 'Downloader' },
              { href: '/about', label: 'About' },
              { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' },
              { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
