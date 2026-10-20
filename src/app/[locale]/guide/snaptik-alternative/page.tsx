import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { OG_IMAGE } from '@/lib/seo'
import Link from 'next/link'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

// English-only guide: no /de or /ar translation exists, so those URLs must 404.
type Props = { params: Promise<{ locale: string }> }

export const metadata: Metadata = {
  title: 'Best SnapTik Alternative 2026 – Compared',
  description: 'Looking for a SnapTik or SSSTikTok alternative? TokDown downloads TikTok videos without watermark, no redirects, no forced ads. Free, instant, all devices.',
  alternates: { canonical: `${BASE}/guide/snaptik-alternative` },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Best SnapTik Alternative 2026 — TokDown vs SnapTik, SSSTikTok & More',
    description: 'Compare TokDown against SnapTik, SSSTikTok, and Tikup. No forced redirects, clean HD downloads, no account needed. See which TikTok downloader is best for you.',
    url: `${BASE}/guide/snaptik-alternative`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best SnapTik Alternative in 2026 — TokDown vs. SnapTik, SSSTikTok, Tikup',
    description: 'Detailed comparison of the best TikTok downloader alternatives to SnapTik in 2026 — features, speed, ad experience, and privacy.',
    url: `${BASE}/guide/snaptik-alternative`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-01',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'TokDown',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/guide/snaptik-alternative` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is the best SnapTik alternative?', acceptedAnswer: { '@type': 'Answer', text: 'TokDown is a clean SnapTik alternative: no forced redirects, no pop-up ads, HD downloads without watermark, and MP3 audio extraction. It works on iPhone, Android, PC and Mac without an account.' } },
      { '@type': 'Question', name: 'Is TokDown better than SnapTik?', acceptedAnswer: { '@type': 'Answer', text: 'TokDown differs from SnapTik in key areas: no forced redirect ads before downloading, no account required, and no data stored on servers. If you are looking for a cleaner download experience, TokDown is a strong alternative.' } },
      { '@type': 'Question', name: 'What is the difference between SnapTik, SSSTikTok and TokDown?', acceptedAnswer: { '@type': 'Answer', text: 'All three download TikTok videos without watermark. SnapTik and SSSTikTok are older, higher-traffic tools but use aggressive ad redirects. TokDown prioritises a faster, cleaner experience with no forced interstitials.' } },
      { '@type': 'Question', name: 'Can I download TikTok without SnapTik?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TokDown, SSSTikTok, Tikup, and musicaldown.com are all alternatives to SnapTik that download TikTok videos without watermark. TokDown requires no account and has no forced ad redirects.' } },
      { '@type': 'Question', name: 'Is there a TikTok downloader with no ads?', acceptedAnswer: { '@type': 'Answer', text: 'TokDown minimises aggressive ad formats — no forced interstitials, no pop-ups that block the download flow. Standard banner ads help keep the service free, but they never interrupt your download.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'SnapTik Alternative', item: `${BASE}/guide/snaptik-alternative` },
    ],
  },
]

const COMPARISON = [
  { feature: 'No watermark HD download', tokdown: true, snaptik: true, ssstik: true, tikup: true },
  { feature: 'MP3 audio extraction', tokdown: true, snaptik: true, ssstik: true, tikup: true },
  { feature: 'No account or login', tokdown: true, snaptik: true, ssstik: true, tikup: false },
  { feature: 'No forced ad redirects', tokdown: true, snaptik: false, ssstik: false, tikup: false },
  { feature: 'No pop-up ads', tokdown: true, snaptik: false, ssstik: false, tikup: false },
  { feature: 'No video stored on servers', tokdown: true, snaptik: false, ssstik: false, tikup: true },
  { feature: 'Works in all browsers', tokdown: true, snaptik: true, ssstik: true, tikup: true },
  { feature: 'HD + SD quality options', tokdown: true, snaptik: true, ssstik: true, tikup: true },
]

const WHY_SWITCH = [
  {
    icon: '🚫',
    title: 'Tired of ad redirects?',
    desc: 'SnapTik and SSSTikTok route you through one or more advertising redirect pages before every download. TokDown delivers your file without any forced interstitials.',
  },
  {
    icon: '🔒',
    title: 'Privacy-conscious?',
    desc: 'TokDown does not store any video files on its servers. The video is streamed from TikTok\'s CDN through our server to your device without being saved. Your TikTok URL is not logged.',
  },
  {
    icon: '⚡',
    title: 'Want faster downloads?',
    desc: 'Fewer redirect steps mean faster time-to-file. Paste the link, press Download, get your MP4 — that\'s it.',
  },
  {
    icon: '📱',
    title: 'Mobile-friendly?',
    desc: 'TokDown is optimised for Safari on iPhone and Chrome on Android — the download flow works cleanly on small screens without pop-ups covering the interface.',
  },
]

const ALTERNATIVES = [
  {
    name: 'TokDown',
    url: 'tokdown.org',
    highlight: true,
    pros: ['No forced redirects', 'No pop-ups', 'No server storage', 'HD + MP3'],
    cons: ['Newer domain, lower brand recognition'],
  },
  {
    name: 'SnapTik',
    url: 'snaptik.app',
    highlight: false,
    pros: ['High traffic, proven reliability', 'HD + SD + MP3'],
    cons: ['Forced ad redirects before download', 'Pop-up ads on mobile'],
  },
  {
    name: 'SSSTikTok',
    url: 'ssstik.io',
    highlight: false,
    pros: ['Very high traffic', 'HD + MP3 + GIF', 'Multi-language support'],
    cons: ['Heavy ad load', 'Forced interstitial redirects'],
  },
  {
    name: 'Tikup',
    url: 'tikup.me',
    highlight: false,
    pros: ['Fast download speed', 'Clean-ish UI'],
    cons: ['Requires account for some features', 'Fewer quality options'],
  },
]

export default async function SnaptikAlternative({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'en') notFound()

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
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>Comparison · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              Best SnapTik Alternative in 2026
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Comparing TokDown against SnapTik, SSSTikTok, and Tikup — so you can pick the right TikTok downloader for your needs.
            </p>
          </header>

          {/* Why switch section */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="why-h">
            <h2 id="why-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Why people look for a SnapTik alternative
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WHY_SWITCH.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          {/* Feature comparison table */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="compare-h">
            <h2 id="compare-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Feature comparison: TokDown vs. SnapTik vs. SSSTikTok
            </h2>
            <div className="rounded-xl overflow-hidden overflow-x-auto" style={{ border: '1px solid var(--line)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: 480 }}>
                <thead>
                  <tr style={{ background: 'rgba(139,108,255,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)', width: '40%' }}>Feature</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: 'var(--brand)' }}>TokDown</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: 'var(--t4)' }}>SnapTik</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: 'var(--t4)' }}>SSSTikTok</th>
                    <th className="text-center px-3 py-3 font-semibold" style={{ color: 'var(--t4)' }}>Tikup</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ feature, tokdown, snaptik, ssstik, tikup }, i) => (
                    <tr key={feature} style={{ background: i % 2 === 0 ? 'var(--line)' : 'transparent', borderTop: '1px solid var(--line)' }}>
                      <td className="px-4 py-3" style={{ color: 'var(--t3)' }}>{feature}</td>
                      <td className="px-3 py-3 text-center" style={{ color: tokdown ? 'var(--success)' : 'var(--danger)' }}>{tokdown ? '✓' : '✗'}</td>
                      <td className="px-3 py-3 text-center" style={{ color: snaptik ? 'var(--success)' : 'var(--danger)', opacity: 0.7 }}>{snaptik ? '✓' : '✗'}</td>
                      <td className="px-3 py-3 text-center" style={{ color: ssstik ? 'var(--success)' : 'var(--danger)', opacity: 0.7 }}>{ssstik ? '✓' : '✗'}</td>
                      <td className="px-3 py-3 text-center" style={{ color: tikup ? 'var(--success)' : 'var(--danger)', opacity: 0.7 }}>{tikup ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          {/* Individual tool breakdowns */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="tools-h">
            <h2 id="tools-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Each tool at a glance
            </h2>
            <div className="flex flex-col gap-3">
              {ALTERNATIVES.map(({ name, url, highlight, pros, cons }) => (
                <div
                  key={name}
                  className="faq-item"
                  style={highlight ? { borderLeft: '2px solid var(--brand)' } : {}}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-bold" style={{ color: highlight ? 'var(--brand)' : 'var(--t1)' }}>{name}</h3>
                    <span className="text-xs" style={{ color: 'var(--t4)' }}>({url})</span>
                    {highlight && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(139,108,255,0.15)', color: 'var(--brand)', border: '1px solid rgba(139,108,255,0.3)' }}>
                        This site
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--success)' }}>Pros</p>
                      <ul className="flex flex-col gap-1">
                        {pros.map((p) => (
                          <li key={p} className="text-xs" style={{ color: 'var(--t3)' }}>+ {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--danger)' }}>Cons</p>
                      <ul className="flex flex-col gap-1">
                        {cons.map((c) => (
                          <li key={c} className="text-xs" style={{ color: 'var(--t3)' }}>− {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          {/* CTA */}
          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-2" style={{ color: 'var(--t2)' }}>Try TokDown — no redirects, no pop-ups, no account.</p>
            <p className="text-xs mb-5" style={{ color: 'var(--t4)' }}>Paste any TikTok link below to download it in HD without watermark.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}
            >
              Try TokDown free →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/guide/download-tiktok-without-watermark" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download Without Watermark</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Full step-by-step guide for all devices.</p>
              </Link>
              <Link href="/guide/tiktok-to-mp3" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP3</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Extract audio from any TikTok video.</p>
              </Link>
              <Link href="/guide/tiktok-to-mp4" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎬</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP4</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Download any TikTok as a standard MP4 file.</p>
              </Link>
              <Link href="/guide/download-tiktok-on-iphone" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📱</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download on iPhone</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>iPhone-specific guide — save to Camera Roll.</p>
              </Link>
            </div>
          </section>
          <div className="w-full max-w-2xl px-4 pb-12">
            <AdsterraBanner size="responsive" />
          </div>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'var(--line)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[
              { href: '/', label: 'Downloader' },
              { href: '/tools', label: 'All tools' },              { href: '/about', label: 'About' },
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
