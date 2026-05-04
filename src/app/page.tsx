import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Downloader from '@/components/Downloader'
import AdUnit from '@/components/ads/AdUnit'

const COMPARISONS = [
  { label: 'No watermark HD', tokdown: true, others: false },
  { label: 'MP3 audio extraction', tokdown: true, others: true },
  { label: 'No account or login', tokdown: true, others: false },
  { label: 'No forced redirects', tokdown: true, others: false },
  { label: 'Works on all devices', tokdown: true, others: true },
  { label: 'No file stored on servers', tokdown: true, others: false },
]

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'Download TikTok Without Watermark — Free, HD & Instant (2026)',
  description: 'Download any TikTok video without watermark in HD — or save just the audio as MP3. Works on iPhone, Android, PC and Mac. Free, no login, no limits.',
  alternates: { canonical: `${BASE}/` },
  openGraph: {
    title: 'Download TikTok Without Watermark — Free, HD & Instant (2026)',
    description: 'Paste any TikTok link and save it without the watermark in HD. Works on every device. Free, instant, no account needed.',
    url: `${BASE}/`,
  },
}

const FEATURES = [
  { icon: '🚫', title: 'No Watermark', desc: 'Clean video without the TikTok logo burned in.' },
  { icon: '🎬', title: 'HD Quality', desc: 'Highest resolution the creator uploaded.' },
  { icon: '🎵', title: 'MP3 Audio', desc: 'Extract and save just the audio track.' },
  { icon: '⚡', title: 'Instant', desc: 'Processed in seconds, no queue.' },
  { icon: '🔓', title: 'No Login', desc: 'Zero accounts, zero registration.' },
  { icon: '📱', title: 'All Devices', desc: 'iPhone, Android, PC and Mac.' },
]

const FAQ = [
  { q: 'How do I download a TikTok video without watermark?', a: 'Open TikTok, tap Share on any video, then Copy Link. Paste the link above and click Download. Choose "HD · No Watermark" to save a clean video without the TikTok logo burned in.' },
  { q: 'Is TokDown free to use?', a: 'Yes — completely free with no registration, no account, and no download limits. We have no hidden fees or premium plans.' },
  { q: 'Can I download TikTok audio as MP3?', a: 'Yes. After fetching the video you will see an "Audio MP3" button to save only the sound track. Useful for TikTok sounds, background music, and voiceovers.' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes. TokDown is a web app — open it in Safari (iPhone), Chrome (Android), or any modern browser. No app install needed.' },
  { q: 'How do I save a TikTok video to my iPhone camera roll?', a: 'After downloading, the video saves to your Files app. Open Files, find the video, tap Share, then "Save Video" to move it to your Camera Roll.' },
  { q: 'How do I save a TikTok video on Android?', a: 'Tap the download button and the video saves directly to your Downloads folder. Open it in your Gallery app from there.' },
  { q: "Why can't I download a private TikTok video?", a: 'Private videos require login authentication that we cannot access. Only public TikTok videos are downloadable. If the video is public and still failing, the creator may have disabled downloads in their settings.' },
  { q: 'What video quality is available?', a: 'We offer HD (the highest resolution the creator uploaded) and SD versions, both without the watermark. HD is recommended for sharing or editing.' },
  { q: 'What formats does TokDown support?', a: 'Videos download as MP4 (HD or SD, no watermark). Audio downloads as MP3. MP4 plays on all devices; MP3 works in any music app.' },
  { q: 'Is it safe to use TokDown?', a: 'Yes. TokDown runs entirely in your browser. We do not store any video files on our servers, and we never ask for your TikTok credentials. Your downloads go straight to your device.' },
  { q: 'Why does TikTok add a watermark in the first place?', a: 'TikTok embeds a watermark on videos saved through their native app to encourage sharing back on the platform and to brand the content. TokDown fetches the original source file before the watermark is applied, so what you get is the clean version.' },
  { q: 'Can I download TikTok slideshows or photo posts?', a: 'TikTok slideshows (image-based posts) work differently from videos. Support for them depends on the post type. Video posts always work; image slideshows may vary.' },
]

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TokDown — TikTok Video Downloader',
    url: `${BASE}/`,
    description: 'Free online tool to download TikTok videos without watermark in HD quality, or extract audio as MP3.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'TokDown', url: BASE },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '2341', bestRating: '5' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to download a TikTok video without watermark',
    description: 'A step-by-step guide to saving any TikTok video in HD quality without the TikTok watermark, for free.',
    totalTime: 'PT1M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Copy the TikTok video link', text: 'Open TikTok on your phone or desktop. Find the video you want, tap the Share button (arrow icon), then select "Copy link".' },
      { '@type': 'HowToStep', position: 2, name: 'Paste the link into TokDown', text: 'Go to tokdown.org, paste the copied TikTok URL into the input field, and press the Download button.' },
      { '@type': 'HowToStep', position: 3, name: 'Choose your format and save', text: 'Select "HD · No Watermark" to save the video in high definition without the TikTok logo, or click "Audio MP3" to save just the sound.' },
    ],
  },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'TokDown — TikTok Downloader', item: `${BASE}/` }],
  },
]

export default function Page() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="relative flex flex-col min-h-screen w-full">
        {/* Hero ambient glow */}
        <div aria-hidden className="hero-glow absolute inset-x-0 top-0 h-[500px] pointer-events-none" style={{ zIndex: 0 }} />

        <main className="relative z-10 flex flex-col items-center w-full">

          {/* ── Hero ──────────────────────────────────────────── */}
          <section className="flex flex-col items-center gap-7 px-4 pt-14 pb-12 w-full max-w-2xl text-center">

            {/* Badge */}
            <Badge
              className="badge-pulse text-xs px-4 py-1.5 gap-2 rounded-full font-semibold"
              style={{ background: 'rgba(255,45,85,0.15)', border: '1px solid rgba(255,45,85,0.45)', color: '#ff99b0' }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#ff2d55', boxShadow: '0 0 6px #ff2d55' }} />
              Free · No Watermark · HD Quality
            </Badge>

            {/* Floating logo */}
            <div
              className="float glow-pulse w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
              aria-hidden
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.18 8.18 0 004.78 1.54V7.11a4.85 4.85 0 01-1.01-.42z" />
              </svg>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                <span style={{ color: '#ffffff' }}>Download TikTok</span>{' '}
                <span className="text-gradient-aurora">Without Watermark</span>
              </h1>
              <p className="text-base sm:text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--t3)' }}>
                Free, HD quality, no login — works on{' '}
                <strong style={{ color: 'var(--t1)' }}>iPhone, Android, PC and Mac</strong>.
                Also extract audio as MP3.
              </p>
            </div>

            {/* Intro paragraph — keyword-rich for SEO */}
            <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--t4)' }}>
              TokDown lets you <strong style={{ color: 'var(--t2)' }}>download any TikTok video without watermark</strong> in HD quality — straight to your phone or PC.
              Paste any public TikTok link, pick MP4 or MP3, and save it in seconds.
              No app, no login, no limits. Works on iPhone, Android, Windows and Mac.
            </p>

            {/* Steps */}
            <ol className="flex items-center gap-3 flex-wrap justify-center list-none p-0 m-0">
              {['Copy TikTok link', 'Paste & Download', 'Save HD video'].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="step-num">{i + 1}</span>
                    <span className="text-sm font-medium" style={{ color: 'var(--t2)' }}>{s}</span>
                  </div>
                  {i < 2 && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,45,85,0.5)" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>

            {/* Downloader */}
            <div className="w-full">
              <Downloader />
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-4">
              {['✓ 100% Free', '✓ No registration', '✓ No watermark', '✓ All devices'].map((t) => (
                <span key={t} className="text-xs font-medium" style={{ color: 'var(--t4)' }}>{t}</span>
              ))}
            </div>

            {/* Banner 1: Middle after Downloader */}
            <AdUnit 
              monetagZoneId="7654321" 
              className="mt-4 mb-2 max-w-full overflow-hidden" 
              style={{ minHeight: 90 }}
              label="Horizontal Banner"
            />
          </section>

          {/* ── Features ──────────────────────────────────────── */}
          <section className="w-full max-w-3xl px-4 pb-16" aria-labelledby="features-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="features-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
                Everything you need
              </h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>Free tools, zero compromise</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
            
            {/* Banner 2: Above FAQ */}
            <AdUnit 
              monetagZoneId="7654321" 
              className="mt-10 mb-2 max-w-full overflow-hidden" 
              style={{ minHeight: 250 }}
              label="Square/Native Banner"
            />
          </section>

          {/* ── Why TokDown ───────────────────────────────────── */}
          <section className="w-full max-w-2xl px-4 pb-12" aria-labelledby="why-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="why-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
                Why TokDown?
              </h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>
                Most TikTok downloaders redirect you through ad pages or ask you to log in. TokDown does neither.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,45,85,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)', width: '55%' }}>Feature</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: '#ff2d55' }}>TokDown</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--t4)' }}>Others</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISONS.map(({ label, tokdown, others }, i) => (
                    <tr key={label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="px-4 py-3" style={{ color: 'var(--t3)' }}>{label}</td>
                      <td className="px-4 py-3 text-center">{tokdown ? '✓' : '✗'}</td>
                      <td className="px-4 py-3 text-center" style={{ color: 'var(--t4)' }}>{others ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Guides ────────────────────────────────────────── */}
          <section className="w-full max-w-2xl px-4 pb-12" aria-labelledby="guides-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="guides-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
                Guides &amp; How-Tos
              </h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>Step-by-step instructions for every device</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/guide/download-tiktok-without-watermark"
                className="feature-card group no-underline"
                style={{ display: 'block' }}
              >
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1.5 group-hover:text-gradient" style={{ color: 'var(--t1)' }}>
                  How to Download TikTok Without Watermark
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>
                  Step-by-step guide for iPhone, Android, PC and Mac — with tips for common issues.
                </p>
              </Link>
              <Link
                href="/guide/tiktok-to-mp3"
                className="feature-card group no-underline"
                style={{ display: 'block' }}
              >
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1.5 group-hover:text-gradient" style={{ color: 'var(--t1)' }}>
                  How to Convert TikTok to MP3
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>
                  Extract the audio from any TikTok video and save it as an MP3 file in seconds.
                </p>
              </Link>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────── */}
          <section className="w-full max-w-2xl px-4 pb-20" aria-labelledby="faq-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="faq-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>Everything you need to know</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <h3 className="text-sm font-bold mb-2 text-gradient">{q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{a}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="relative z-10 w-full px-4 py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ maxWidth: 672, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--grad-brand)' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.18 8.18 0 004.78 1.54V7.11a4.85 4.85 0 01-1.01-.42z" /></svg>
              </div>
              <span className="text-sm font-bold text-gradient">TikTok Downloader</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Site navigation">
              {[
                { href: '/about', label: 'About' },
                { href: '/guide/download-tiktok-without-watermark', label: 'Download Guide' },
                { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms' },
                { href: '/dmca', label: 'DMCA' },
                { href: '/disclaimer', label: 'Disclaimer' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-xs hover:underline transition-colors" style={{ color: 'var(--t4)' }}>
                  {label}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-center max-w-md leading-relaxed" style={{ color: 'var(--t4)' }}>
              For personal use only. We do not store any videos. Not affiliated with TikTok or ByteDance.
            </p>
            <p className="text-xs" style={{ color: 'var(--t4)', opacity: 0.6 }}>
              © {new Date().getFullYear()} TikTok Downloader
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
