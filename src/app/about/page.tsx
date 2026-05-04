import type { Metadata } from 'next'
import Link from 'next/link'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'About TokDown — Why We Built a Better TikTok Downloader',
  description: 'Learn why TokDown was built: a fast, honest TikTok downloader with no redirects, no stored files, and no hidden fees. We value your privacy and your time.',
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: 'About TokDown — Why We Built a Better TikTok Downloader',
    description: 'TokDown was built out of frustration with clunky, ad-riddled TikTok downloaders. No redirects, no stored videos, just a tool that works.',
    url: `${BASE}/about`,
  },
}

const jsonLdAbout = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About TokDown',
  url: `${BASE}/about`,
  description: 'TokDown is a free, privacy-focused TikTok video downloader that does not store video files, require login, or redirect users through ad pages.',
  publisher: {
    '@type': 'Organization',
    name: 'TokDown',
    url: BASE,
    logo: `${BASE}/icon.png`,
    sameAs: ['https://twitter.com/tokdownorg'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@tokdown.org',
    },
  },
}

const VALUES = [
  {
    icon: '🔒',
    title: 'Privacy first',
    desc: 'We never store the videos you download. Files go directly from TikTok\'s servers to your device. We have no database of your downloads.',
  },
  {
    icon: '⚡',
    title: 'Speed without compromise',
    desc: 'Every download is processed in seconds. No queues, no "please wait" timers designed to show you more ads.',
  },
  {
    icon: '🚫',
    title: 'No dark patterns',
    desc: 'No fake download buttons, no forced redirects to ad sites, no captchas before every download. Just a clean, honest tool.',
  },
  {
    icon: '🆓',
    title: 'Genuinely free',
    desc: 'TokDown is free with no rate limits, no premium tier, and no hidden fees. We cover costs through non-intrusive advertising.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }} />

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          {/* Back */}
          <div className="w-full max-w-2xl mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium transition-colors"
              style={{ color: 'var(--t4)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to downloader
            </Link>
          </div>

          {/* Header */}
          <header className="w-full max-w-2xl mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--t1)' }}>
              About <span className="text-gradient-aurora">TokDown</span>
            </h1>
            <p className="text-base leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              We built TokDown because we were tired of TikTok downloaders that waste your time with fake buttons, forced redirects, and privacy nightmares.
            </p>
          </header>

          {/* Story */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="story-h">
            <div className="faq-item">
              <h2 id="story-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>
                Our story
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                <p>
                  Most "free" TikTok downloaders have the same playbook: bury the real download button under three fake ones, redirect you through ad domains, make you solve captchas, and — some of them — even ask for your TikTok username and password. We think that is unacceptable.
                </p>
                <p>
                  TokDown was built to be the tool we wished existed: fast, clean, and honest. You paste a link. You get your video. That&apos;s it.
                </p>
                <p>
                  We do not store any video files on our servers. The moment you hit download, your file goes straight from TikTok&apos;s CDN to your device. We keep no record of what you downloaded, when, or from which IP address.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="values-h">
            <h2 id="values-h" className="text-lg font-bold mb-6 text-center" style={{ color: 'var(--t1)' }}>
              What we stand for
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {VALUES.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works technically */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="tech-h">
            <div className="faq-item">
              <h2 id="tech-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>
                How TokDown works
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                <p>
                  When you paste a TikTok URL, TokDown resolves the video ID and fetches the available download links from TikTok&apos;s public API. We return direct links to the original video file — in the highest quality the creator uploaded — without re-encoding or compressing anything.
                </p>
                <p>
                  The &quot;no watermark&quot; version is the original file as uploaded by the creator before TikTok&apos;s app overlays the logo. Both versions exist on TikTok&apos;s CDN; TokDown simply surfaces the right one.
                </p>
                <p>
                  No video data passes through our servers. Your download is a direct connection between your device and TikTok&apos;s content delivery network.
                </p>
              </div>
            </div>
          </section>

          {/* Legal note */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="legal-h">
            <div className="faq-item">
              <h2 id="legal-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>
                Important legal note
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                TokDown is intended for personal, non-commercial use only. Always respect the rights of TikTok creators — downloading a video does not transfer copyright. Do not redistribute, re-upload, or monetise downloaded content without explicit permission from the original creator. TokDown is not affiliated with, endorsed by, or connected to TikTok or ByteDance in any way.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="w-full max-w-2xl mb-4" aria-labelledby="contact-h">
            <div className="faq-item">
              <h2 id="contact-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>
                Contact &amp; support
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                Have a question, found a bug, or need to report a DMCA issue? Reach us at{' '}
                <a href="mailto:support@tokdown.org" className="text-gradient font-medium" style={{ textDecoration: 'underline' }}>
                  support@tokdown.org
                </a>
                . We respond within 48 hours.
              </p>
            </div>
          </section>

          {/* Nav */}
          <nav className="w-full max-w-2xl mt-8 pt-6 flex flex-wrap gap-4 justify-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/guide/download-tiktok-without-watermark', label: 'Download Guide' },
              { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms' },
              { href: '/dmca', label: 'DMCA' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>
                {label}
              </Link>
            ))}
          </nav>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
