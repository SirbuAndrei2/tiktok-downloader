import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { article, breadcrumbs } from '@/lib/schema'
import { pageDates } from '@/lib/content-dates'
import JsonLd from '@/components/JsonLd'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { Separator } from '@/components/ui/separator'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'GuideNoWatermark' })
  return pageMetadata({ locale, path: '/guide/download-tiktok-without-watermark', title: t('metaTitle'), description: t('metaDescription'), ogType: 'article' })
}

export default async function DownloadGuide({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'GuideNoWatermark' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const localePath = locale === 'en' ? '' : `/${locale}`

  const steps = t.raw('steps') as { title: string; body: string }[]
  const platforms = t.raw('platforms') as { platform: string; tip: string }[]
  const troubleshoot = t.raw('troubleshoot') as { problem: string; fix: string }[]

  const slug = '/guide/download-tiktok-without-watermark'
  const dates = pageDates('/guide/download-tiktok-without-watermark')
  const jsonLd = [
    article({ locale, path: '/guide/download-tiktok-without-watermark', headline: t('h1'), description: t('metaDescription'), datePublished: dates.published, dateModified: dates.modified }),
    breadcrumbs(locale, [{ name: tNav('guides'), path: '/guide' }, { name: t('h1'), path: '/guide/download-tiktok-without-watermark' }]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          <div className="w-full max-w-2xl mb-8">
            <Link href={localePath || '/'} className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              {tCommon('backToDownloader')}
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>{tCommon('guideUpdated')}</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>{t('h1')}</h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('stepsTitle')}</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {steps.map(({ title, body }, i) => (
                <li key={i} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: 'rgba(139,108,255,0.15)', color: 'var(--brand)', border: '1px solid rgba(139,108,255,0.3)' }}>
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

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>{t('ctaText')}</p>
            <Link href={localePath || '/'} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}>
              {t('ctaButton')}
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="platforms-h">
            <h2 id="platforms-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('platformsTitle')}</h2>
            <div className="flex flex-col gap-3">
              {platforms.map(({ platform, tip }) => (
                <div key={platform} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--brand)' }}>{platform}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{tip}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

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

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="why-h">
            <h2 id="why-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('whyTitle')}</h2>
            <div className="faq-item flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>{t('why1')}</p>
              <p>{t('why2')}</p>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="legal-h">
            <h2 id="legal-h" className="text-xl font-bold mb-4" style={{ color: 'var(--t1)' }}>{t('legalTitle')}</h2>
            <div className="faq-item text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
              <p>{t('legal')}</p>
            </div>
          </section>

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{tCommon('relatedGuides')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href={`${localePath}/guide/tiktok-to-mp3`} className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
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
          <div className="w-full max-w-2xl px-4 pb-12">
            <AdsterraBanner size="responsive" />
          </div>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'var(--line)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[
              { href: localePath || '/', label: tNav('downloader') },
              { href: `${localePath}/guide`, label: tNav('allGuides') },
              { href: `${localePath}/tools`, label: tNav('tools') },              { href: `${localePath}/about`, label: tNav('about') },
              { href: `${localePath}/guide/tiktok-to-mp3`, label: tNav('mp3Guide') },
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
