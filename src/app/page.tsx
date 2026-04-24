import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Downloader from '@/components/Downloader'

const BASE = 'https://www.tokdown.org'

export const metadata: Metadata = {
  title: 'TikTok Video Downloader — No Watermark, Free HD Download',
  description: 'Download TikTok videos without watermark in HD quality for free. Paste any TikTok link and save as MP4 or MP3 instantly. No login, no limits.',
  alternates: { canonical: `${BASE}/` },
  openGraph: {
    title: 'TikTok Video Downloader — No Watermark, Free HD',
    description: 'Paste any TikTok link and download without watermark in HD. Free, instant, all devices.',
    url: `${BASE}/`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
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
  { q: 'How do I download a TikTok video without watermark?', a: 'Open TikTok, tap Share on any video, then Copy Link. Paste the link above and click Download. Choose "HD · No Watermark" to save without the TikTok logo.' },
  { q: 'Is this TikTok downloader free?', a: 'Yes — completely free with no registration, no account, and no download limits.' },
  { q: 'Can I download TikTok audio as MP3?', a: 'Yes. After fetching the video you will see an "Audio MP3" button to save only the sound from the video.' },
  { q: 'Does it work on iPhone and Android?', a: 'Yes. The downloader is a web app that works in any modern mobile or desktop browser.' },
  { q: "Why can't I download a private video?", a: 'Private TikTok videos require authentication. Only public videos can be downloaded.' },
  { q: 'What formats are available?', a: 'Videos download as MP4 (HD or SD without watermark). Audio downloads as MP3.' },
]

const schemas = [
  { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'TikTok Video Downloader', url: `${BASE}/`, description: 'Free online tool to download TikTok videos without watermark in HD quality.', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to download a TikTok video without watermark', step: [{ '@type': 'HowToStep', position: 1, name: 'Copy TikTok link', text: 'Open TikTok, tap Share, then Copy link.' }, { '@type': 'HowToStep', position: 2, name: 'Paste into the downloader', text: 'Paste the link and click Download Video.' }, { '@type': 'HowToStep', position: 3, name: 'Save HD video', text: 'Click "HD · No Watermark" to download.' }] },
  { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
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
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05]">
                <span className="text-gradient-aurora">TikTok</span>{' '}
                <span style={{ color: '#ffffff' }}>Downloader</span>
              </h1>
              <p className="text-base sm:text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--t3)' }}>
                Download TikTok videos{' '}
                <strong style={{ color: 'var(--t1)' }}>without watermark</strong>{' '}
                in HD. Free, instant, no account needed.
              </p>
            </div>

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
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Legal">
              {[{ href: '/privacy', label: 'Privacy Policy' }, { href: '/terms', label: 'Terms' }, { href: '/dmca', label: 'DMCA' }, { href: '/disclaimer', label: 'Disclaimer' }].map(({ href, label }) => (
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
