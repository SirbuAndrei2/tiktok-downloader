import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Downloader from '@/components/Downloader'
import AdUnit from '@/components/ads/AdUnit'

const BASE = 'https://tokdown.org'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home' })
  const isDefault = locale === 'en'
  const localePath = isDefault ? '' : `/${locale}`

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t.raw('metaKeywords') as string[],
    alternates: {
      canonical: `${BASE}${localePath}/`,
      languages: {
        'en': `${BASE}/`,
        'de': `${BASE}/de/`,
        'ar': `${BASE}/ar/`,
      },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `${BASE}${localePath}/`,
    },
  }
}

const COMPARISONS = [
  { tokdown: true, others: false },
  { tokdown: true, others: true },
  { tokdown: true, others: false },
  { tokdown: true, others: false },
  { tokdown: true, others: true },
  { tokdown: true, others: false },
]

export default async function Page({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Home' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })

  const features = t.raw('features') as { icon: string; title: string; desc: string }[]
  const comparisons = t.raw('comparisons') as { label: string }[]
  const faq = t.raw('faq') as { q: string; a: string }[]

  const isDefault = locale === 'en'
  const localePath = isDefault ? '' : `/${locale}`

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TokDown — TikTok Video Downloader',
      url: `${BASE}${localePath}/`,
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
      name: t('h1') + ' ' + t('h1Accent'),
      totalTime: 'PT1M',
      step: [
        { '@type': 'HowToStep', position: 1, name: t('step1'), text: t('step1') },
        { '@type': 'HowToStep', position: 2, name: t('step2'), text: t('step2') },
        { '@type': 'HowToStep', position: 3, name: t('step3'), text: t('step3') },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'TokDown', item: `${BASE}${localePath}/` }],
    },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="relative flex flex-col min-h-screen w-full">
        <div aria-hidden className="hero-glow absolute inset-x-0 top-0 h-[500px] pointer-events-none" style={{ zIndex: 0 }} />

        <main className="relative z-10 flex flex-col items-center w-full">

          {/* ── Hero ────────────────────────────────────────────── */}
          <section className="flex flex-col items-center gap-7 px-4 pt-14 pb-12 w-full max-w-2xl text-center">

            <Badge
              className="badge-pulse text-xs px-4 py-1.5 gap-2 rounded-full font-semibold"
              style={{ background: 'rgba(255,45,85,0.15)', border: '1px solid rgba(255,45,85,0.45)', color: '#ff99b0' }}
            >
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#ff2d55', boxShadow: '0 0 6px #ff2d55' }} />
              {t('badge')}
            </Badge>

            <div
              className="float glow-pulse w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
              aria-hidden
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.18 8.18 0 004.78 1.54V7.11a4.85 4.85 0 01-1.01-.42z" />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1]">
                <span style={{ color: '#ffffff' }}>{t('h1')}</span>{' '}
                <span className="text-gradient-aurora">{t('h1Accent')}</span>
              </h1>
              <p className="text-base sm:text-lg max-w-md mx-auto leading-relaxed" style={{ color: 'var(--t3)' }}>
                {t('subtitle')}
              </p>
            </div>

            <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--t4)' }}>
              {t('introParagraph')}
            </p>

            <ol className="flex items-center gap-3 flex-wrap justify-center list-none p-0 m-0">
              {[t('step1'), t('step2'), t('step3')].map((s, i) => (
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

            <div className="w-full">
              <Downloader />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {[t('trust1'), t('trust2'), t('trust3'), t('trust4')].map((trust) => (
                <span key={trust} className="text-xs font-medium" style={{ color: 'var(--t4)' }}>{trust}</span>
              ))}
            </div>

            <AdUnit
              monetagZoneId="7654321"
              className="mt-4 mb-2 max-w-full overflow-hidden"
              style={{ minHeight: 90 }}
              label="Horizontal Banner"
            />
          </section>

          {/* ── Features ────────────────────────────────────────── */}
          <section className="w-full max-w-3xl px-4 pb-16" aria-labelledby="features-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="features-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>{t('featuresTitle')}</h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>{t('featuresSubtitle')}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {features.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>

            <AdUnit
              monetagZoneId="7654321"
              className="mt-10 mb-2 max-w-full overflow-hidden"
              style={{ minHeight: 250 }}
              label="Square/Native Banner"
            />
          </section>

          {/* ── Why TokDown ─────────────────────────────────────── */}
          <section className="w-full max-w-2xl px-4 pb-12" aria-labelledby="why-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="why-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>{t('whyTitle')}</h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>{t('whySubtitle')}</p>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,45,85,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)', width: '55%' }}>{t('whyTableFeature')}</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: '#ff2d55' }}>{t('whyTableTokDown')}</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--t4)' }}>{t('whyTableOthers')}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(({ label }, i) => (
                    <tr key={label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="px-4 py-3" style={{ color: 'var(--t3)' }}>{label}</td>
                      <td className="px-4 py-3 text-center">{COMPARISONS[i].tokdown ? '✓' : '✗'}</td>
                      <td className="px-4 py-3 text-center" style={{ color: 'var(--t4)' }}>{COMPARISONS[i].others ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Guides ──────────────────────────────────────────── */}
          <section className="w-full max-w-2xl px-4 pb-12" aria-labelledby="guides-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="guides-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>{t('guidesTitle')}</h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>{t('guidesSubtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href={`${localePath}/guide/download-tiktok-without-watermark`} className="feature-card group no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1.5 group-hover:text-gradient" style={{ color: 'var(--t1)' }}>{t('guide1Title')}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{t('guide1Desc')}</p>
              </Link>
              <Link href={`${localePath}/guide/tiktok-to-mp3`} className="feature-card group no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1.5 group-hover:text-gradient" style={{ color: 'var(--t1)' }}>{t('guide2Title')}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{t('guide2Desc')}</p>
              </Link>
            </div>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────── */}
          <section className="w-full max-w-2xl px-4 pb-20" aria-labelledby="faq-h">
            <Separator className="mb-10" style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="text-center mb-8">
              <h2 id="faq-h" className="text-2xl font-bold mb-2" style={{ color: 'var(--t1)' }}>{t('faqTitle')}</h2>
              <p className="text-sm" style={{ color: 'var(--t4)' }}>{t('faqSubtitle')}</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {faq.map(({ q, a }) => (
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
                { href: `${localePath}/about`, label: tNav('about') },
                { href: `${localePath}/guide/download-tiktok-without-watermark`, label: tNav('downloadGuide') },
                { href: `${localePath}/guide/tiktok-to-mp3`, label: tNav('mp3Guide') },
                { href: '/privacy', label: tNav('privacy') },
                { href: '/terms', label: tNav('terms') },
                { href: '/dmca', label: tNav('dmca') },
                { href: '/disclaimer', label: tNav('disclaimer') },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-xs hover:underline transition-colors" style={{ color: 'var(--t4)' }}>
                  {label}
                </Link>
              ))}
            </nav>
            <p className="text-xs text-center max-w-md leading-relaxed" style={{ color: 'var(--t4)' }}>
              {tFooter('tagline')}
            </p>
            <p className="text-xs" style={{ color: 'var(--t4)', opacity: 0.6 }}>
              {tFooter('copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
