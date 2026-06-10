import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'
const SLUG = '/guide/download-tiktok-private-video'

export const metadata: Metadata = {
  title: 'Can You Download a Private TikTok Video? — Full Explanation (2026)',
  description: 'Can you download private TikTok videos? Full honest explanation of what is possible, what is not, and the only legitimate ways to save TikTok content.',
  alternates: { canonical: `${BASE}${SLUG}` },
  openGraph: {
    title: 'Can You Download a Private TikTok Video? — Full Explanation (2026)',
    description: 'The truth about downloading private TikTok videos — what works, what does not, and how to download public TikTok videos for free in HD.',
    url: `${BASE}${SLUG}`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Can You Download a Private TikTok Video? — Full Explanation (2026)',
    description: 'An honest guide explaining whether private TikTok videos can be downloaded and what alternatives exist.',
    url: `${BASE}${SLUG}`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-10',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}${SLUG}` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can you download a private TikTok video?', acceptedAnswer: { '@type': 'Answer', text: 'No. Private TikTok videos require login authentication that only the account owner can provide. No third-party downloader, including TokDown, can access private videos. Any tool claiming to do so is either lying or attempting to steal your TikTok credentials.' } },
      { '@type': 'Question', name: 'Why can\'t I download a private TikTok?', acceptedAnswer: { '@type': 'Answer', text: 'TikTok enforces privacy settings server-side. A private video\'s URL returns an authentication error to anyone who is not the account owner or an approved follower. There is no technical workaround.' } },
      { '@type': 'Question', name: 'Can I download my own private TikTok video?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — from within the TikTok app itself. Open TikTok, go to the private video, tap the three dots (⋯), and tap "Save video". TikTok will save it to your Camera Roll with its standard watermark.' } },
      { '@type': 'Question', name: 'Can I download a friends-only TikTok?', acceptedAnswer: { '@type': 'Answer', text: 'If you are listed as a friend of the account, you can view the video. If downloading is enabled by the creator, TokDown can download it using the share link. If the creator has disabled downloads, no tool can override this.' } },
      { '@type': 'Question', name: 'What types of TikTok videos can be downloaded?', acceptedAnswer: { '@type': 'Answer', text: 'Only public TikTok videos where the creator has not disabled the download option can be downloaded with TokDown. If a video is public but still fails, the creator has turned off downloads in their TikTok privacy settings.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'Download Private TikTok', item: `${BASE}${SLUG}` },
    ],
  },
]

const PRIVACY_LEVELS = [
  { level: 'Public', downloadable: true, note: 'Anyone can download if creator allows it' },
  { level: 'Friends Only', downloadable: null, note: 'Downloadable only if you are a friend AND creator allows it' },
  { level: 'Private', downloadable: false, note: 'Cannot be downloaded by any third-party tool' },
]

const ALTERNATIVES = [
  { icon: '📥', title: 'Save your own private videos', body: 'Inside the TikTok app: tap the three dots (⋯) on your private video → "Save video". The video saves to your Camera Roll with TikTok\'s watermark.' },
  { icon: '🔓', title: 'Make the video public temporarily', body: 'Change the video\'s privacy from Private to Public in TikTok settings, download it with TokDown (no watermark, HD), then switch it back to Private.' },
  { icon: '💬', title: 'Ask the creator directly', body: 'If you want someone else\'s private video, the only legitimate path is to ask the creator to send it to you directly via DM or to make it public.' },
  { icon: '🖥️', title: 'Screen record as a last resort', body: 'Screen recording captures any video regardless of privacy settings — but the quality is limited to your screen resolution and the result includes UI elements unless you go full-screen.' },
]

export default function DownloadPrivateTikTok() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">
          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              Can You Download a Private TikTok Video?
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              The honest answer, the technical reason, and the legitimate alternatives — no false promises.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-10 faq-item" aria-labelledby="answer-h">
            <h2 id="answer-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>The short answer</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--t3)' }}>
              <strong style={{ color: '#ff2d55' }}>No — private TikTok videos cannot be downloaded</strong> by any third-party tool, including TokDown. TikTok enforces privacy settings server-side: a request for a private video returns an authentication error to anyone who is not the account owner.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              Any website or app claiming to download private TikTok videos is either not delivering what it promises, or — more dangerously — asking for your TikTok username and password to "log in on your behalf". Never give your TikTok credentials to a third-party tool.
            </p>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="levels-h">
            <h2 id="levels-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>TikTok privacy levels — what can be downloaded</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,45,85,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Privacy Level</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Downloadable?</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {PRIVACY_LEVELS.map(({ level, downloadable, note }, i) => (
                    <tr key={level} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--t2)' }}>{level}</td>
                      <td className="px-4 py-3 text-center">
                        {downloadable === true ? <span style={{ color: '#4ade80' }}>✓ Yes</span> : downloadable === false ? <span style={{ color: '#ff2d55' }}>✗ No</span> : <span style={{ color: '#ff8c42' }}>⚠ Maybe</span>}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t3)' }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="alternatives-h">
            <h2 id="alternatives-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Legitimate alternatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALTERNATIVES.map(({ icon, title, body }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Want to download a public TikTok video instead? Free, HD, no watermark.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}>
              Download a public TikTok video →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/guide/download-tiktok-without-watermark', icon: '🚫', title: 'No Watermark Guide', desc: 'Full guide for downloading public TikTok videos on any device.' },
                { href: '/guide/tiktok-to-mp4', icon: '🎬', title: 'TikTok to MP4', desc: 'Download public TikTok videos as MP4 files in HD.' },
                { href: '/guide/download-tiktok-on-iphone', icon: '📱', title: 'Download on iPhone', desc: 'Save TikTok videos to your iPhone Camera Roll.' },
                { href: '/guide/download-tiktok-on-android', icon: '🤖', title: 'Download on Android', desc: 'Save TikTok videos to your Android gallery.' },
              ].map(({ href, icon, title, desc }) => (
                <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs" style={{ color: 'var(--t4)' }}>{desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: '/', label: 'Downloader' }, { href: '/about', label: 'About' }, { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' }, { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
