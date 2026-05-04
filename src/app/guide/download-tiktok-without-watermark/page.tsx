import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'How to Download TikTok Without Watermark (iPhone, Android, PC — 2026)',
  description: 'Step-by-step guide: download any TikTok video without watermark in HD on iPhone, Android, Windows, or Mac. Free, no login needed. Works in 2026.',
  alternates: { canonical: `${BASE}/guide/download-tiktok-without-watermark` },
  openGraph: {
    title: 'How to Download TikTok Without Watermark (iPhone, Android, PC — 2026)',
    description: 'A complete, honest guide to saving TikTok videos without the watermark on every device — with solutions for the most common problems.',
    url: `${BASE}/guide/download-tiktok-without-watermark`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Download TikTok Without Watermark (2026 Guide)',
    description: 'Step-by-step instructions for saving TikTok videos without watermark on iPhone, Android, PC and Mac.',
    url: `${BASE}/guide/download-tiktok-without-watermark`,
    datePublished: '2025-04-01',
    dateModified: '2026-05-01',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/guide/download-tiktok-without-watermark` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to download a TikTok video without watermark',
    description: 'Download any TikTok video in HD without the TikTok watermark using TokDown — free, no account, works on any device.',
    totalTime: 'PT1M',
    supply: [],
    tool: [{ '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Open TikTok and find your video',
        text: 'Open the TikTok app (or tiktok.com) and navigate to the video you want to save.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Copy the video link',
        text: 'Tap the Share button (arrow icon on the right side of the video). In the share sheet, tap "Copy link". The video URL is now in your clipboard.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Go to TokDown',
        text: 'Open tokdown.org in your browser (works in Safari, Chrome, Firefox, and Edge on any device).',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Paste the link and download',
        text: 'Paste the TikTok link into the input field and press the Download button. Wait a few seconds while TokDown fetches the video.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Save the HD no-watermark version',
        text: 'Click "HD · No Watermark" to download the clean, high-definition video file to your device.',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Why does TikTok add a watermark?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok adds its watermark when you save a video through their native "Save video" button. The watermark encourages viewers to find and follow the creator on TikTok. TokDown bypasses this by fetching the original source file directly.' } },
      { '@type': 'Question', name: 'Is it legal to download TikTok videos without watermark?', acceptedAnswer: { '@type': 'Answer', text: 'Downloading for personal use is generally accepted in most jurisdictions. You should never redistribute, repost, or monetise downloaded content without the creator\'s permission — that would infringe copyright.' } },
      { '@type': 'Question', name: 'Why is my TikTok download failing?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes: the video is set to private, the creator has disabled downloads in their TikTok settings, or the URL is incomplete. Make sure you copy the full link from the Share menu, not from the address bar.' } },
      { '@type': 'Question', name: 'How do I save a TikTok video to my iPhone camera roll?', acceptedAnswer: { '@type': 'Answer', text: 'After downloading on iPhone, the file saves to the Files app. Long-press the file, tap Share, then "Save Video" — this moves it to your Camera Roll (Photos).' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'Download TikTok Without Watermark', item: `${BASE}/guide/download-tiktok-without-watermark` },
    ],
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Open TikTok and find the video',
    body: 'Open the TikTok app on your phone, or go to tiktok.com in a browser. Scroll to — or search for — the video you want to save.',
  },
  {
    n: 2,
    title: 'Tap Share → Copy link',
    body: 'Tap the arrow (Share) icon on the right side of the video. In the share sheet that appears, tap Copy link. The video\'s URL is now in your clipboard.',
  },
  {
    n: 3,
    title: 'Open TokDown in your browser',
    body: 'Navigate to tokdown.org. The site works in any browser — Safari and Chrome on mobile, Edge or Firefox on desktop. No app download required.',
  },
  {
    n: 4,
    title: 'Paste the link and press Download',
    body: 'Tap the input field, paste your TikTok URL, and press the Download button. TokDown fetches the video details in a few seconds.',
  },
  {
    n: 5,
    title: 'Click "HD · No Watermark" and save',
    body: 'Once the download options appear, select "HD · No Watermark" to save the clean, high-definition version. The file saves to your Downloads folder or Files app.',
  },
]

const PLATFORM_TIPS = [
  {
    platform: 'iPhone (Safari)',
    tip: 'After the file downloads, open the Files app → Downloads, long-press the video, tap Share → Save Video to move it to your Camera Roll.',
  },
  {
    platform: 'Android (Chrome)',
    tip: 'The video saves directly to your Downloads folder. Open your Gallery or Files app to find it. Some Android phones need you to grant storage permission the first time.',
  },
  {
    platform: 'Windows (Chrome / Edge)',
    tip: 'The file downloads to your default Downloads folder (usually C:\\Users\\YourName\\Downloads). It plays in any media player.',
  },
  {
    platform: 'Mac (Safari / Chrome)',
    tip: 'The video saves to ~/Downloads. Drag it to any folder or directly into a video editing app like iMovie or CapCut.',
  },
]

const TROUBLESHOOT = [
  {
    problem: 'Download fails immediately',
    fix: 'Make sure the video is public. Private TikTok videos cannot be downloaded by any third-party tool. Also check that you copied the full link from the Share menu — not from the browser address bar, which may be a redirect URL.',
  },
  {
    problem: 'Video plays but has no audio',
    fix: 'This is a rare browser compatibility issue. Try right-clicking the download button and selecting "Save link as…" or try a different browser.',
  },
  {
    problem: '"Download disabled by creator"',
    fix: 'The creator has turned off downloads in their TikTok account settings. TokDown cannot override this restriction, as it is enforced server-side by TikTok.',
  },
  {
    problem: 'File saves as .webm instead of .mp4',
    fix: 'This happens in some Chromium-based browsers. Rename the extension from .webm to .mp4 — the file will play normally. Or try downloading in Safari.',
  },
]

export default function DownloadGuide() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          {/* Back */}
          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to downloader
            </Link>
          </div>

          {/* Header */}
          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>Guide · Updated May 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              How to Download TikTok Without Watermark
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              A complete, honest walkthrough for iPhone, Android, Windows and Mac — including fixes for the most common problems.
            </p>
          </header>

          {/* Steps */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Step-by-step instructions</h2>
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

          {/* CTA */}
          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Ready? Try it now — no login, no limits.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
            >
              Download a TikTok video →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Per-platform tips */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="platforms-h">
            <h2 id="platforms-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Saving to your device — by platform
            </h2>
            <div className="flex flex-col gap-3">
              {PLATFORM_TIPS.map(({ platform, tip }) => (
                <div key={platform} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: '#ff2d55' }}>{platform}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{tip}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Troubleshooting */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="trouble-h">
            <h2 id="trouble-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Troubleshooting common problems
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

          {/* Why no watermark */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="why-h">
            <h2 id="why-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              Why does TikTok add a watermark?
            </h2>
            <div className="faq-item flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>
                When you save a video using TikTok's built-in &ldquo;Save video&rdquo; button, TikTok overlays a watermark — your username and the TikTok logo — before saving it to your camera roll. This is intentional: it drives people who see the video elsewhere back to TikTok.
              </p>
              <p>
                The original video file (without watermark) is still hosted on TikTok's CDN. TokDown fetches that original file directly, bypassing the watermark entirely. The process is the same technical mechanism that TikTok's own embedding feature uses.
              </p>
            </div>
          </section>

          {/* Legal note */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="legal-h">
            <h2 id="legal-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              Is it legal?
            </h2>
            <div className="faq-item text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>
                Downloading TikTok videos for <strong style={{ color: 'var(--t2)' }}>personal, non-commercial use</strong> is generally accepted. It is similar to taking a screenshot. What is <em>not</em> allowed — and can get you in legal trouble — is redistributing, re-uploading, or monetising downloaded videos without the creator&apos;s explicit permission. Always credit the original creator and respect their copyright.
              </p>
            </div>
          </section>

          {/* Related guides */}
          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/guide/tiktok-to-mp3" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>How to Convert TikTok to MP3</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Extract audio from any TikTok video in seconds.</p>
              </Link>
              <Link href="/about" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>ℹ️</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>About TokDown</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>How TokDown works and why we built it.</p>
              </Link>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[
              { href: '/', label: 'Downloader' },
              { href: '/about', label: 'About' },
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
