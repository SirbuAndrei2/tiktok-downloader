import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

const BASE = 'https://tokdown.org'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  const localePath = locale === 'en' ? '' : `/${locale}`
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${BASE}${localePath}/about`,
      languages: { 'en': `${BASE}/about`, 'de': `${BASE}/de/about` },
    },
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: `${BASE}${localePath}/about` },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'About' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const localePath = locale === 'en' ? '' : `/${locale}`

  const values = t.raw('values') as { icon: string; title: string; desc: string }[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TokDown',
    url: `${BASE}${localePath}/about`,
    description: t('metaDescription'),
    publisher: {
      '@type': 'Organization',
      name: 'TokDown',
      url: BASE,
      logo: `${BASE}/icon.png`,
      sameAs: ['https://twitter.com/tokdownorg'],
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@tokdown.org' },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          <div className="w-full max-w-2xl mb-8">
            <Link href={`${localePath}/`} className="inline-flex items-center gap-2 text-xs font-medium transition-colors" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              {tCommon('backToDownloader')}
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-black mb-4" style={{ color: 'var(--t1)' }}>
              {t('h1')} <span className="text-gradient-aurora">{t('h1Accent')}</span>
            </h1>
            <p className="text-base leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="story-h">
            <div className="faq-item">
              <h2 id="story-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('storyTitle')}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                <p>{t('story1')}</p>
                <p>{t('story2')}</p>
                <p>{t('story3')}</p>
              </div>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="values-h">
            <h2 id="values-h" className="text-lg font-bold mb-6 text-center" style={{ color: 'var(--t1)' }}>{t('valuesTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {values.map(({ icon, title, desc }) => (
                <div key={title} className="feature-card">
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--t4)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tech-h">
            <div className="faq-item">
              <h2 id="tech-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('howTitle')}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                <p>{t('how1')}</p>
                <p>{t('how2')}</p>
                <p>{t('how3')}</p>
              </div>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="legal-h">
            <div className="faq-item">
              <h2 id="legal-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('legalTitle')}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{t('legal')}</p>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-4" aria-labelledby="contact-h">
            <div className="faq-item">
              <h2 id="contact-h" className="text-lg font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('contactTitle')}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                {t('contact').split('support@tokdown.org')[0]}
                <a href="mailto:support@tokdown.org" className="text-gradient font-medium" style={{ textDecoration: 'underline' }}>support@tokdown.org</a>
                {t('contact').split('support@tokdown.org')[1]}
              </p>
            </div>
          </section>

          <nav className="w-full max-w-2xl mt-8 pt-6 flex flex-wrap gap-4 justify-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {[
              { href: `${localePath}/`, label: tNav('downloader') },
              { href: `${localePath}/guide/download-tiktok-without-watermark`, label: tNav('downloadGuide') },
              { href: `${localePath}/guide/tiktok-to-mp3`, label: tNav('mp3Guide') },
              { href: '/privacy', label: tNav('privacy') },
              { href: '/terms', label: tNav('terms') },
              { href: '/dmca', label: tNav('dmca') },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <p className="text-xs">{tFooter('notAffiliated', { year: new Date().getFullYear() })}</p>
        </footer>
      </div>
    </>
  )
}
