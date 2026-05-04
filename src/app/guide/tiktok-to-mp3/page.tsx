import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'TikTok to MP3 — Download TikTok Audio Free (2026)',
  description: 'Convert any TikTok video to MP3 and save the audio to your phone or PC. Free, instant, no account needed. Works on iPhone, Android, Windows and Mac.',
  alternates: { canonical: `${BASE}/guide/tiktok-to-mp3` },
  openGraph: {
    title: 'TikTok to MP3 — Download TikTok Audio Free (2026)',
    description: 'Extract and save the audio from any TikTok video as an MP3 file. Free, no login, works on every device.',
    url: `${BASE}/guide/tiktok-to-mp3`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Convert TikTok to MP3 — Free Audio Downloader (2026)',
    description: 'Step-by-step guide to extracting and saving audio from TikTok videos as MP3 files on any device.',
    url: `${BASE}/guide/tiktok-to-mp3`,
    datePublished: '2025-04-01',
    dateModified: '2026-05-01',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/guide/tiktok-to-mp3` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to convert a TikTok video to MP3',
    description: 'Extract the audio from any TikTok video and save it as an MP3 file using TokDown — free, no account, works on any device.',
    totalTime: 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok video link', text: 'Open TikTok and tap the Share button on the video. Select "Copy link" to copy the URL.' },
      { '@type': 'HowToStep', position: 2, name: 'Go to TokDown and paste the link', text: 'Open tokdown.org in any browser, paste the copied URL into the input field, and press Download.' },
      { '@type': 'HowToStep', position: 3, name: 'Click "Audio MP3"', text: 'Once the download options load, click the "Audio MP3" button. The audio file downloads to your device.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can I download TikTok audio as MP3?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TokDown extracts the audio track from any public TikTok video and lets you save it as an MP3 file. Just paste the TikTok link, click Download, then click "Audio MP3".' } },
      { '@type': 'Question', name: 'What is the audio quality of TikTok MP3 downloads?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok encodes audio at up to 128kbps AAC. TokDown converts this to MP3 at the same quality level — no re-encoding loss.' } },
      { '@type': 'Question', name: 'Can I use downloaded TikTok audio in my own videos?', acceptedAnswer: { '@type': 'Answer', text: 'Music tracks used in TikTok videos are likely protected by copyright. You can save them for personal listening, but using them in your own published content without a license could infringe copyright.' } },
      { '@type': 'Question', name: 'Does TikTok to MP3 work on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Open tokdown.org in Safari on iPhone, paste the TikTok link, and tap "Audio MP3". The file downloads to your Files app.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'TikTok to MP3', item: `${BASE}/guide/tiktok-to-mp3` },
    ],
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Find the TikTok video with the audio you want',
    body: 'Open the TikTok app or tiktok.com. Navigate to the video whose sound, music, or voiceover you want to save.',
  },
  {
    n: 2,
    title: 'Tap Share → Copy link',
    body: 'Tap the Share icon (arrow) on the right side of the video. In the share sheet, tap "Copy link". The video URL is now in your clipboard.',
  },
  {
    n: 3,
    title: 'Open TokDown and paste the link',
    body: 'Go to tokdown.org in any browser. Paste the TikTok URL into the input field and press Download. This works on mobile and desktop.',
  },
  {
    n: 4,
    title: 'Click "Audio MP3"',
    body: 'When the download options appear, click the "Audio MP3" button. The audio file will start downloading to your device immediately.',
  },
]

const USE_CASES = [
  { icon: '🎧', title: 'Offline listening', desc: 'Save trending TikTok sounds to listen to on the go without needing mobile data.' },
  { icon: '🎤', title: 'Voiceovers & speech', desc: 'Extract spoken content — tutorials, advice, or commentary — to reference later.' },
  { icon: '🎼', title: 'Music discovery', desc: 'Save a track you heard on TikTok before you know the artist name, then Shazam it offline.' },
  { icon: '📚', title: 'Language learning', desc: 'Save native-speaker audio clips for pronunciation practice or vocabulary review.' },
]

const TROUBLESHOOT = [
  {
    problem: 'No "Audio MP3" button appears',
    fix: 'Make sure you copied the full TikTok share link, not a shortened or redirect URL. Try the Share → Copy link flow again.',
  },
  {
    problem: 'Downloaded file has no sound',
    fix: 'Some TikTok videos are silent (original creator did not use audio). Confirm the video has audio before downloading. Also check your device volume.',
  },
  {
    problem: 'File saves as .m4a instead of .mp3',
    fix: 'This happens in Safari on iPhone. The audio is the same quality — just rename the extension to .mp3 and it will work in any player.',
  },
  {
    problem: 'Audio cuts off early',
    fix: 'TikTok videos can be up to 10 minutes. If the video itself is very long, ensure your download completed fully. A slow connection can cause partial downloads.',
  },
]

export default function TikTokToMp3() {
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
              TikTok to MP3 — Free Audio Downloader
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Extract and save the audio from any TikTok video as an MP3 file in seconds — no login, no app, works on any device.
            </p>
          </header>

          {/* Steps */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>How to download TikTok audio as MP3</h2>
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
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Try it now — paste any TikTok link and download the audio.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
            >
              Go to TokDown downloader →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Use cases */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="uses-h">
            <h2 id="uses-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              When would you want the audio only?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {USE_CASES.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Audio quality */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="quality-h">
            <h2 id="quality-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              What audio quality can I expect?
            </h2>
            <div className="faq-item text-sm leading-relaxed flex flex-col gap-3" style={{ color: 'var(--t3)' }}>
              <p>
                TikTok encodes audio at up to <strong style={{ color: 'var(--t2)' }}>128 kbps AAC</strong>. TokDown delivers the original audio stream and converts it to MP3 at the same bitrate — there is no re-encoding loss in the conversion.
              </p>
              <p>
                If the original video used music from TikTok&apos;s licensed sound library, the audio quality will be as good as the source. Voiceovers and user-recorded audio follow the same rule — quality matches what the creator recorded.
              </p>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Copyright */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="copyright-h">
            <h2 id="copyright-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              Copyright and legal use
            </h2>
            <div className="faq-item text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>
                Music tracks embedded in TikTok videos are usually <strong style={{ color: 'var(--t2)' }}>licensed for use within TikTok only</strong>. Downloading for personal listening is generally fine. However, using downloaded audio in your own videos, streams, or commercial projects without obtaining a license is copyright infringement.
              </p>
              <p className="mt-2">
                Voiceovers, original compositions, and personal recordings shared by creators are their intellectual property. Always ask permission before reusing someone else&apos;s content publicly.
              </p>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Troubleshooting */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="trouble-h">
            <h2 id="trouble-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Troubleshooting
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

          {/* Related */}
          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/guide/download-tiktok-without-watermark" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download TikTok Without Watermark</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Full HD video guide for iPhone, Android, PC and Mac.</p>
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
              { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' },
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
