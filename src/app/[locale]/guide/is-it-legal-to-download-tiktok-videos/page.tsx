import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { Separator } from '@/components/ui/separator'
import { pageMetadata } from '@/lib/seo'
import { article, breadcrumbs, faqPage } from '@/lib/schema'
import { pageDates } from '@/lib/content-dates'
import JsonLd from '@/components/JsonLd'
import GuideFaq from '@/components/GuideFaq'

// English-only guide: no /de or /ar translation exists, so those URLs must 404.
type Props = { params: Promise<{ locale: string }> }
const SLUG = '/guide/is-it-legal-to-download-tiktok-videos'
const H1 = 'Is It Legal to Download TikTok Videos?'
const SHORT_ANSWER =
  'Usually yes for a private copy you keep to yourself, depending on your country; almost never for re-uploading, sharing or monetising someone else’s video without permission. TikTok’s own terms also restrict copying content with outside tools, so the platform can act even where the law does not.'

export const metadata: Metadata = pageMetadata({
  locale: 'en',
  path: SLUG,
  title: 'Is It Legal to Download TikTok Videos?',
  description: 'Is it legal to download TikTok videos? What copyright law in the US, EU, Germany and UK and TikTok’s terms say, with sources and safe ways to save clips.',
  translated: false,
  ogType: 'article',
})

// Rendered visibly by <GuideFaq> and mirrored in FAQPage JSON-LD.
const FAQ = [
  { q: 'Is it illegal to download TikTok videos?', a: 'Downloading a public TikTok for private viewing is not a crime in most countries, and many allow it as a private copy. It becomes infringement when you copy for commercial use or share the file with others without permission. In the US there is no blanket private-copy rule, so personal copies rely on fair use.' },
  { q: 'Is it against TikTok’s rules to use a downloader?', a: 'TikTok’s Terms of Service forbid extracting content from the platform with automated software unless TikTok approves it in writing. That is a contract rule, not a criminal law: the realistic consequence is action against an account, not a fine. The in-app Save video button, when the creator allows it, is always within the rules.' },
  { q: 'Can I repost a TikTok I downloaded?', a: 'Only with the creator’s permission, or if your use is covered by an exception such as fair use for commentary or criticism. Crediting the creator does not replace permission. Reposting without it can lead to a copyright takedown and strikes on your own account.' },
  { q: 'Is removing the TikTok watermark illegal?', a: 'Saving the original file without the logo for private use is generally treated like any other private copy. Republishing a video after removing the creator’s name can add liability under the rules that protect copyright-management information, such as 17 U.S.C. § 1202 in the US and § 95c UrhG in Germany.' },
  { q: 'Can I use TikTok sounds or music I downloaded?', a: 'For private listening, usually yes. Music on TikTok is licensed for use inside TikTok, so using a downloaded track in your own videos, streams or ads needs a licence from the rights holders.' },
  { q: 'Is downloading my own TikTok videos legal?', a: 'Yes. You own the content you post on TikTok, so you can keep copies of it. Downloading your own public videos with a web tool also avoids the watermark TikTok adds to in-app saves.' },
]

const dates = pageDates(SLUG)
const jsonLd = [
  article({ locale: 'en', path: SLUG, headline: H1, description: 'What copyright law and TikTok’s own terms say about downloading TikTok videos, by country, with sources.', datePublished: dates.published, dateModified: dates.modified }),
  faqPage(FAQ),
  breadcrumbs('en', [{ name: 'Guides', path: '/guide' }, { name: 'Is it legal to download TikToks?', path: SLUG }]),
]

const COUNTRIES = [
  { place: 'United States', rule: 'No general private-copy exception. Personal copies rely on fair use (17 U.S.C. § 107), which weighs purpose, the nature of the work, the amount used and the effect on the market.', risk: 'Private viewing: low. Reposting or commercial use: infringement unless fair use applies.' },
  { place: 'European Union', rule: 'The InfoSoc Directive (2001/29/EC, Art. 5(2)(b)) lets each member state allow private copies by individuals, usually paid for through levies on devices and media.', risk: 'Depends on the member state; the exception never covers sharing.' },
  { place: 'Germany', rule: '§ 53 UrhG allows single copies by a natural person for private use, unless the source was obviously made or made available unlawfully.', risk: 'Private copy of a public, lawfully posted TikTok: generally allowed.' },
  { place: 'United Kingdom', rule: 'The private-copying exception added in 2014 was quashed by the High Court in 2015, so there is no general right to make personal copies.', risk: 'Even private copies are technically infringing; enforcement against individuals is rare.' },
  { place: 'Elsewhere', rule: 'Most countries, including Saudi Arabia and the UAE, have their own copyright laws with their own exceptions.', risk: 'Check the local law; the safe rule below works everywhere.' },
]

const SAFE = [
  { title: 'Use TikTok’s Save video button', body: 'If the creator has downloads turned on, the in-app option is the one route that is always within TikTok’s rules. The copy carries a watermark.' },
  { title: 'Keep downloads private', body: 'Watching later, offline or for your own reference is the use that private-copy rules and fair use protect best.' },
  { title: 'Ask before you reuse', body: 'A short message to the creator is usually enough. Keep the reply: it is your proof of permission if a takedown ever arrives.' },
  { title: 'Download your own videos freely', body: 'You own what you post. Saving your own clips without the watermark for your portfolio or another platform is fine.' },
]

const SOURCES = [
  { label: 'TikTok Terms of Service, “What you can’t do on the Platform”', href: 'https://www.tiktok.com/legal/page/us/terms-of-service/en' },
  { label: '17 U.S.C. § 107, limitations on exclusive rights: fair use', href: 'https://www.law.cornell.edu/uscode/text/17/107' },
  { label: '17 U.S.C. § 1202, integrity of copyright management information', href: 'https://www.law.cornell.edu/uscode/text/17/1202' },
  { label: 'Directive 2001/29/EC (InfoSoc), Article 5', href: 'https://eur-lex.europa.eu/eli/dir/2001/29/oj' },
  { label: '§ 53 UrhG, Vervielfältigungen zum privaten und sonstigen eigenen Gebrauch', href: 'https://www.gesetze-im-internet.de/urhg/__53.html' },
  { label: '§ 95c UrhG, Schutz der zur Rechtewahrnehmung erforderlichen Informationen', href: 'https://www.gesetze-im-internet.de/urhg/__95c.html' },
]

export default async function IsItLegal({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'en') notFound()

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">
          <div className="w-full max-w-2xl mb-8">
            <Link href="/guide" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              All guides
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>Guide · Updated October 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>{H1}</h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              What copyright law and TikTok’s own rules say about saving TikTok videos, country by country, with the sources linked. This is general information, not legal advice.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="short-h">
            <div className="faq-item">
              <h2 id="short-h" className="text-sm font-bold mb-2" style={{ color: 'var(--t1)' }}>The short answer</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t2)' }}>{SHORT_ANSWER}</p>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="two-h">
            <h2 id="two-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>Two different rule books</h2>
            <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>
                <strong style={{ color: 'var(--t1)' }}>Copyright law</strong> decides whether making a copy is lawful. The creator owns the video; the law of your country decides which copies you may make without asking, usually a private copy for your own use, and never the right to publish it again.
              </p>
              <p>
                <strong style={{ color: 'var(--t1)' }}>TikTok’s Terms of Service</strong> are a contract between TikTok and its users. They forbid extracting content from the platform with automated software unless TikTok approves it, and they let creators switch downloads of their own videos on or off. Breaking the terms is not a crime, but TikTok can restrict accounts that do it.
              </p>
              <p>
                A downloader such as TokDown fetches the same public file your browser plays. Whether keeping that file is fine depends on the first rule book; whether TikTok approves of the method depends on the second.
              </p>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="countries-h">
            <h2 id="countries-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Country by country</h2>
            <div className="rounded-xl overflow-hidden overflow-x-auto" style={{ border: '1px solid var(--line)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: 520 }}>
                <thead>
                  <tr style={{ background: 'rgba(139,108,255,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Where</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>What the law says</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>In practice</th>
                  </tr>
                </thead>
                <tbody>
                  {COUNTRIES.map(({ place, rule, risk }, i) => (
                    <tr key={place} style={{ background: i % 2 === 0 ? 'var(--line)' : 'transparent', borderTop: '1px solid var(--line)' }}>
                      <td className="px-4 py-3 font-medium align-top" style={{ color: 'var(--t2)' }}>{place}</td>
                      <td className="px-4 py-3 text-xs align-top" style={{ color: 'var(--t3)' }}>{rule}</td>
                      <td className="px-4 py-3 text-xs align-top" style={{ color: 'var(--t3)' }}>{risk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="never-h">
            <h2 id="never-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>What is not OK anywhere</h2>
            <ul className="flex flex-col gap-2 text-sm leading-relaxed pl-4 list-disc" style={{ color: 'var(--t3)' }}>
              <li>Re-uploading someone else’s TikTok to your own account, channel or page without permission, credited or not.</li>
              <li>Using a downloaded video or sound in ads, paid content or anything you earn money from.</li>
              <li>Removing or hiding the creator’s name before publishing a clip.</li>
              <li>Downloading private or friends-only videos by logging in with someone else’s account, or giving a tool your TikTok password.</li>
            </ul>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="safe-h">
            <h2 id="safe-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Safe ways to save TikToks</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {SAFE.map(({ title, body }, i) => (
                <li key={title} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: 'rgba(139,108,255,0.15)', color: 'var(--brand)', border: '1px solid rgba(139,108,255,0.3)' }}>{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <GuideFaq title="Frequently asked questions" faq={FAQ} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="sources-h">
            <h2 id="sources-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>Sources</h2>
            <ul className="flex flex-col gap-2 text-sm pl-4 list-disc" style={{ color: 'var(--t3)' }}>
              {SOURCES.map(({ label, href }) => (
                <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--t2)' }}>{label}</a></li>
              ))}
              <li>R (British Academy of Songwriters, Composers and Authors) v Secretary of State for Business, Innovation and Skills [2015] EWHC 2041 (Admin), which quashed the UK private-copying exception.</li>
            </ul>
            <p className="text-xs mt-4" style={{ color: 'var(--t4)' }}>
              TokDown is not a law firm and this page is not legal advice. If you plan to reuse someone else’s content commercially, ask the creator or a lawyer first. Copyright notices about content fetched through TokDown follow our <Link href="/dmca" className="underline">DMCA process</Link>.
            </p>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/guide/download-tiktok-private-video', title: 'Private TikTok videos', desc: 'What can and cannot be downloaded, and why.' },
                { href: '/guide/download-tiktok-without-watermark', title: 'Download without watermark', desc: 'Step by step for iPhone, Android, PC and Mac.' },
                { href: '/guide/tiktok-to-mp3', title: 'TikTok to MP3', desc: 'Save a sound for private listening.' },
                { href: '/guide', title: 'All guides', desc: 'Every TokDown guide in one place.' },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs" style={{ color: 'var(--t4)' }}>{desc}</p>
                </Link>
              ))}
            </div>
          </section>
          <div className="w-full max-w-2xl px-4 pb-12">
            <AdsterraBanner size="responsive" />
          </div>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'var(--line)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: '/', label: 'Downloader' }, { href: '/tools', label: 'All tools' }, { href: '/guide', label: 'All guides' }, { href: '/about', label: 'About' }, { href: '/dmca', label: 'DMCA' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok, ByteDance, Meta, X or Google.</p>
        </footer>
      </div>
    </>
  )
}
