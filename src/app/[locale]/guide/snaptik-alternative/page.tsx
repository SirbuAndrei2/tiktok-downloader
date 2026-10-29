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
const SLUG = '/guide/snaptik-alternative'

export const metadata: Metadata = pageMetadata({
  locale: 'en',
  path: SLUG,
  title: 'SnapTik & SSSTik Alternative: Honest Guide',
  description: 'Looking for a SnapTik or SSSTik alternative? What TokDown does and does not do, how its ads work, and a checklist for choosing any TikTok downloader.',
  translated: false,
  ogType: 'article',
})

// Rendered visibly by <GuideFaq> and mirrored in FAQPage JSON-LD.
const FAQ = [
  { q: 'What is a good SnapTik alternative?', a: 'Any web downloader that gives you a real download button, never asks for your TikTok password and does not require an app or extension. TokDown fits that list: paste a public TikTok link and save the MP4 or the MP3, with no account. It shows ads to stay free, including one pop-under after a download result.' },
  { q: 'Is TokDown better than SnapTik?', a: 'We have not run a dated, measured test of other downloaders, so we do not claim that. What we can state is how TokDown works: no account, files streamed through our server without being stored, and TikTok downloads that depend on a third-party API which is sometimes busy. Compare that with what you see on other sites today.' },
  { q: 'What is the difference between SnapTik, SSSTik and TokDown?', a: 'All three are web tools that fetch a public TikTok and offer the file without the watermark. TokDown also covers TikTok photo slideshows, X (Twitter) videos and YouTube thumbnails, and it has a video compressor and an MP4 to GIF converter that run in your browser without uploading anything.' },
  { q: 'Can I download TikTok without SnapTik?', a: 'Yes. Several web downloaders do the same job, TokDown among them. If you only need your own videos, TikTok can also save a copy from the app when downloads are allowed in your settings, but that copy carries the watermark.' },
  { q: 'Is there a TikTok downloader with no ads?', a: 'Free web downloaders are almost always paid for by ads, and TokDown is no exception: it shows banners, a social bar and one pop-under that opens only after a download result appears. The ads are never placed on top of the real download buttons.' },
]

const dates = pageDates(SLUG)
const jsonLd = [
  article({ locale: 'en', path: SLUG, headline: 'SnapTik Alternative: An Honest Guide', description: 'What to look for in a SnapTik or SSSTik alternative, and exactly what TokDown does and does not do.', datePublished: dates.published, dateModified: dates.modified }),
  faqPage(FAQ),
  breadcrumbs('en', [{ name: 'Guides', path: '/guide' }, { name: 'SnapTik Alternative', path: SLUG }]),
]

// What TokDown itself does, stated plainly. Other sites are not scored: we have no dated test of them.
const FACTS = [
  { feature: 'TikTok video without watermark (MP4)', value: 'Yes, when the upstream API answers; otherwise a watermarked fallback is labelled as such' },
  { feature: 'TikTok sound as MP3', value: 'Yes' },
  { feature: 'TikTok photo slideshows', value: 'Yes, every image in full size' },
  { feature: 'Private or friends-only videos', value: 'No (nobody can fetch them without the owner\'s login)' },
  { feature: 'Bulk / whole-profile download', value: 'No, one link at a time' },
  { feature: 'Account, app or extension needed', value: 'No' },
  { feature: 'Videos stored on our servers', value: 'No, streamed through in one pass' },
  { feature: 'Ads', value: 'Yes: banners, a social bar and one pop-under after a download result' },
]

const CHECKLIST = [
  {
    icon: '🔘',
    title: 'One real download button',
    desc: 'The file button should appear only after you paste a link. Large "Download" buttons that show up before that are usually ads.',
  },
  {
    icon: '🔒',
    title: 'Never your TikTok password',
    desc: 'Public videos need no login. A downloader that asks for your TikTok username and password is a phishing risk, whatever it promises.',
  },
  {
    icon: '🧩',
    title: 'No APK or extension required',
    desc: 'A website works on every phone and computer. Sideloaded APKs and browser extensions get far more access to your device than a web page.',
  },
  {
    icon: '📋',
    title: 'Clear about ads and limits',
    desc: 'Free tools are paid for by ads and depend on upstream services. A trustworthy site says which ads it runs and shows a clear error when a video cannot be fetched.',
  },
]

const ALTERNATIVES = [
  {
    name: 'TokDown',
    url: 'tokdown.org',
    highlight: true,
    pros: ['No account, app or extension', 'MP4, MP3 and photo slideshows', 'Also X videos, YouTube thumbnails, compressor, GIF maker'],
    cons: ['Shows ads, including a pop-under after a result', 'TikTok API is sometimes busy (retry later)', 'No private videos or bulk download'],
  },
  {
    name: 'SnapTik',
    url: 'snaptik.app',
    highlight: false,
    pros: ['Long-running, widely used web downloader'],
    cons: ['Not tested by us: check its current ads and permissions'],
  },
  {
    name: 'SSSTik',
    url: 'ssstik.io',
    highlight: false,
    pros: ['Long-running web downloader for TikTok videos'],
    cons: ['Not tested by us: check its current ads and permissions'],
  },
]

export default async function SnaptikAlternative({ params }: Props) {
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>Guide · Updated October 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              SnapTik Alternative: An Honest Guide
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              What to look for in a SnapTik or SSSTik alternative, and exactly what TokDown does and does not do, ads included.
            </p>
          </header>

          {/* Why switch section */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="why-h">
            <h2 id="why-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              What to check in any TikTok downloader
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHECKLIST.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Phones only: first ad after the opening section instead of only at the end */}
          <div className="w-full max-w-2xl mb-12 md:hidden">
            <AdsterraBanner size="300x250" only="mobile" />
          </div>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          {/* What TokDown does (no scores for other sites: we have no dated test of them) */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="compare-h">
            <h2 id="compare-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              What TokDown does and does not do
            </h2>
            <div className="rounded-xl overflow-hidden overflow-x-auto" style={{ border: '1px solid var(--line)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(139,108,255,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)', width: '40%' }}>Feature</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--brand)' }}>TokDown</th>
                  </tr>
                </thead>
                <tbody>
                  {FACTS.map(({ feature, value }, i) => (
                    <tr key={feature} style={{ background: i % 2 === 0 ? 'var(--line)' : 'transparent', borderTop: '1px solid var(--line)' }}>
                      <td className="px-4 py-3" style={{ color: 'var(--t3)' }}>{feature}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--t2)' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--t4)' }}>
              We do not score other downloaders: their ads and features change often and we have not run a dated test. Check any site, including this one, before you rely on it.
            </p>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          {/* Individual tool breakdowns */}
          <section className="w-full max-w-2xl mb-12" aria-labelledby="tools-h">
            <h2 id="tools-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Popular options at a glance
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
            <p className="text-sm mb-2" style={{ color: 'var(--t2)' }}>Try TokDown — free, no account, no app.</p>
            <p className="text-xs mb-5" style={{ color: 'var(--t4)' }}>Paste any public TikTok link to save the video or its sound.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}
            >
              Try TokDown free →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <GuideFaq title="Frequently asked questions" faq={FAQ} />

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
              { href: '/tools', label: 'All tools' }, { href: '/guide', label: 'All guides' },              { href: '/about', label: 'About' },
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
