import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'TikTok to MP4 — Download TikTok as MP4 Free, No Watermark (2026)',
  description: 'Convert any TikTok video to MP4 format instantly — HD quality, no watermark, no login. Free online tool that works on iPhone, Android, PC and Mac.',
  alternates: { canonical: `${BASE}/guide/tiktok-to-mp4` },
  openGraph: {
    title: 'TikTok to MP4 — Download TikTok as MP4 Free, No Watermark (2026)',
    description: 'Save any TikTok video as an MP4 file in HD without the watermark. Works on every device, free, no account needed.',
    url: `${BASE}/guide/tiktok-to-mp4`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Download TikTok Videos as MP4 — Free, No Watermark (2026)',
    description: 'How to save any TikTok video as an MP4 file in HD quality without the watermark using TokDown.',
    url: `${BASE}/guide/tiktok-to-mp4`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-01',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'TokDown',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/guide/tiktok-to-mp4` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to convert TikTok to MP4',
    description: 'Download any public TikTok video as an MP4 file in HD without the watermark using TokDown — free, no account.',
    totalTime: 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok link', text: 'Open TikTok, find the video, tap the Share icon, and tap "Copy link".' },
      { '@type': 'HowToStep', position: 2, name: 'Paste into TokDown', text: 'Open tokdown.org in any browser, paste the link into the input field, and tap or click Download.' },
      { '@type': 'HowToStep', position: 3, name: 'Choose HD MP4', text: 'Select "HD · No Watermark" or "SD · No Watermark" to download the video as an MP4 file to your device.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What format does TikTok download in?', acceptedAnswer: { '@type': 'Answer', text: 'TokDown downloads TikTok videos as MP4 files. MP4 is the most widely compatible video format and plays on all devices, media players, and editing software.' } },
      { '@type': 'Question', name: 'Is TikTok MP4 or MOV?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok videos are stored and delivered as MP4 files internally. When you use TokDown, the downloaded file is an MP4 (.mp4) — compatible with every device and video editor.' } },
      { '@type': 'Question', name: 'What quality is the TikTok MP4 download?', acceptedAnswer: { '@type': 'Answer', text: 'TokDown offers two quality options: HD (the highest resolution the creator uploaded, typically 1080p at 30fps) and SD (lower resolution for smaller file sizes). Both are watermark-free.' } },
      { '@type': 'Question', name: 'Can I edit a downloaded TikTok MP4?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The downloaded MP4 is a standard video file that works in any video editing software — CapCut, iMovie, DaVinci Resolve, Adobe Premiere, and more.' } },
      { '@type': 'Question', name: 'Why does my TikTok download as .webm instead of .mp4?', acceptedAnswer: { '@type': 'Answer', text: 'Some Chromium-based browsers save videos as .webm. The content is identical — just rename the file extension from .webm to .mp4 and it will play in any player.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'TikTok to MP4', item: `${BASE}/guide/tiktok-to-mp4` },
    ],
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Copy the TikTok video link',
    body: 'Open TikTok on your phone or desktop. Find the video, tap the Share icon, then tap "Copy link". On a desktop browser, you can also copy the URL from the address bar.',
  },
  {
    n: 2,
    title: 'Open TokDown and paste the link',
    body: 'Go to tokdown.org in any browser. Tap the input field and paste the TikTok URL. Press the Download button.',
  },
  {
    n: 3,
    title: 'Choose your MP4 quality',
    body: 'When the download options appear, choose "HD · No Watermark" for the full-resolution MP4, or "SD · No Watermark" for a smaller file. Both formats download as .mp4.',
  },
  {
    n: 4,
    title: 'Save the MP4 to your device',
    body: 'The file downloads to your default Downloads folder (or Files app on iPhone). It is ready to play, edit, or share immediately.',
  },
]

const QUALITY_INFO = [
  {
    label: 'HD · No Watermark',
    resolution: 'Up to 1080p',
    fps: '30fps',
    size: '20–100 MB',
    best: 'Editing, archiving, sharing',
  },
  {
    label: 'SD · No Watermark',
    resolution: '480p–720p',
    fps: '30fps',
    size: '5–25 MB',
    best: 'Messaging, quick preview',
  },
  {
    label: 'Audio MP3',
    resolution: '—',
    fps: '—',
    size: '1–8 MB',
    best: 'Music, voiceovers, sounds',
  },
]

const USE_CASES = [
  { icon: '✂️', title: 'Video editing', desc: 'Import the MP4 into CapCut, iMovie, or Premiere for remixing or reposting to your own account.' },
  { icon: '💾', title: 'Offline archive', desc: 'Save videos from creators you love before they get deleted — especially time-sensitive content.' },
  { icon: '📤', title: 'Cross-platform sharing', desc: 'Share the MP4 via WhatsApp, Telegram, email, or AirDrop — bypassing TikTok\'s watermark.' },
  { icon: '🖥️', title: 'Presentations & moodboards', desc: 'Embed clean TikTok clips in slide decks, design references, or inspiration boards.' },
]

export default function TikTokToMp4() {
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
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              TikTok to MP4 — Download Without Watermark
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Convert any TikTok video to a standard MP4 file in HD. No watermark, no login, no limits. The downloaded file plays on every device and works in any video editor.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              How to download TikTok as MP4
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
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Try it now — paste any TikTok link and get your MP4.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
            >
              Download a TikTok video →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="quality-h">
            <h2 id="quality-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Download quality comparison
            </h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,45,85,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Format</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Resolution</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>File Size</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {QUALITY_INFO.map(({ label, resolution, size, best }, i) => (
                    <tr key={label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: i === 0 ? '#ff2d55' : 'var(--t2)' }}>{label}</td>
                      <td className="px-4 py-3 text-center" style={{ color: 'var(--t3)' }}>{resolution}</td>
                      <td className="px-4 py-3 text-center" style={{ color: 'var(--t3)' }}>{size}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--t3)' }}>{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="uses-h">
            <h2 id="uses-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              What can you do with the downloaded MP4?
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

          <section className="w-full max-w-2xl mb-12" aria-labelledby="format-h">
            <h2 id="format-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>
              Why is the download MP4 and not MOV or AVI?
            </h2>
            <div className="faq-item text-sm leading-relaxed flex flex-col gap-3" style={{ color: 'var(--t3)' }}>
              <p>
                TikTok stores and delivers all video content internally as <strong style={{ color: 'var(--t2)' }}>MP4 (H.264/H.265)</strong>. TokDown fetches the source file directly, so the download format is always MP4 — no conversion step required.
              </p>
              <p>
                MP4 is the most universally compatible video format. It plays on iPhone, Android, Windows, Mac, smart TVs, and is accepted by every major video editing app and social media platform.
              </p>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/guide/tiktok-to-mp3" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP3</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Extract and download just the audio track as an MP3.</p>
              </Link>
              <Link href="/guide/download-tiktok-without-watermark" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🚫</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>No Watermark Guide</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Why the watermark appears and exactly how to remove it.</p>
              </Link>
              <Link href="/guide/download-tiktok-on-iphone" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📱</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download on iPhone</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Save the MP4 directly to your iPhone Camera Roll.</p>
              </Link>
              <Link href="/guide/download-tiktok-on-android" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🤖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download on Android</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Save the MP4 to your Android gallery in seconds.</p>
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
