import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GuideMp3' })
  const localePath = locale === 'en' ? '' : `/${locale}`
  const slug = '/guide/tiktok-to-mp3'
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${BASE}${localePath}${slug}`,
      languages: { 'en': `${BASE}${slug}`, 'de': `${BASE}/de${slug}`, 'ar': `${BASE}/ar${slug}` },
    },
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: `${BASE}${localePath}${slug}` },
  }
}

export default async function TikTokToMp3({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GuideMp3' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const localePath = locale === 'en' ? '' : `/${locale}`

  const steps = t.raw('steps') as { title: string; body: string }[]
  const useCases = t.raw('useCases') as { icon: string; title: string; desc: string }[]
  const troubleshoot = t.raw('troubleshoot') as { problem: string; fix: string }[]

  const slug = '/guide/tiktok-to-mp3'
  const jsonLd = [
    {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: t('h1'),
      description: t('metaDescription'),
      url: `${BASE}${localePath}${slug}`,
      datePublished: '2025-04-01', dateModified: '2026-05-01',
      author: { '@type': 'Organization', name: 'TokDown', url: BASE },
      publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    },
    {
      '@context': 'https://schema.org', '@type': 'HowTo',
      name: t('h1'), totalTime: 'PT1M',
      tool: [{ '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
      step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}${localePath}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}${localePath}/guide` },
        { '@type': 'ListItem', position: 3, name: t('h1'), item: `${BASE}${localePath}${slug}` },
      ],
    },
  ]

  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          <div className="w-full max-w-2xl mb-8">
            <Link href={`${localePath}/`} className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              {tCommon('backToDownloader')}
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>{tCommon('guideUpdated')}</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>{t('h1')}</h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('stepsTitle')}</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {steps.map(({ title, body }, i) => (
                <li key={i} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)' }}>
                    {i + 1}
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
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>{t('ctaText')}</p>
            <Link href={`${localePath}/`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}>
              {t('ctaButton')}
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="uses-h">
            <h2 id="uses-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('useCasesTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {useCases.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="quality-h">
            <h2 id="quality-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('qualityTitle')}</h2>
            <div className="faq-item text-sm leading-relaxed flex flex-col gap-3" style={{ color: 'var(--t3)' }}>
              <p>{t('quality1')}</p>
              <p>{t('quality2')}</p>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="copyright-h">
            <h2 id="copyright-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('copyrightTitle')}</h2>
            <div className="faq-item text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>{t('copyright')}</p>
              <p className="mt-2">{t('copyright2')}</p>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="trouble-h">
            <h2 id="trouble-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('troubleshootTitle')}</h2>
            <div className="flex flex-col gap-3">
              {troubleshoot.map(({ problem, fix }) => (
                <div key={problem} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{t('problemLabel')} {problem}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}><strong style={{ color: 'var(--t2)' }}>{t('fixLabel')}</strong> {fix}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{tCommon('relatedGuides')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href={`${localePath}/guide/download-tiktok-without-watermark`} className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{t('relatedGuide1Title')}</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>{t('relatedGuide1Desc')}</p>
              </Link>
              <Link href={`${localePath}/about`} className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>ℹ️</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{t('relatedGuide2Title')}</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>{t('relatedGuide2Desc')}</p>
              </Link>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[
              { href: `${localePath}/`, label: tNav('downloader') },
              { href: `${localePath}/about`, label: tNav('about') },
              { href: `${localePath}/guide/download-tiktok-without-watermark`, label: tNav('noWatermarkGuide') },
              { href: '/privacy', label: tNav('privacy') },
              { href: '/terms', label: tNav('terms') },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">{tFooter('notAffiliated', { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </>
  )
}
