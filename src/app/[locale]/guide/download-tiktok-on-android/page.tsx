import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'
const SLUG = '/guide/download-tiktok-on-android'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GuideAndroid' })
  const localePath = locale === 'en' ? '' : `/${locale}`
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${BASE}${localePath}${SLUG}`,
      languages: { 'en': `${BASE}${SLUG}`, 'de': `${BASE}/de${SLUG}`, 'ar': `${BASE}/ar${SLUG}` },
    },
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: `${BASE}${localePath}${SLUG}` },
  }
}

export default async function DownloadTikTokOnAndroid({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'GuideAndroid' })
  const localePath = locale === 'en' ? '' : `/${locale}`

  const steps = t.raw('steps') as { title: string; body: string }[]
  const tips = t.raw('tips') as { title: string; body: string }[]
  const troubleshoot = t.raw('troubleshoot') as { problem: string; fix: string }[]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: t('metaTitle'),
      description: t('metaDescription'),
      url: `${BASE}${localePath}${SLUG}`,
      datePublished: '2026-06-01',
      dateModified: '2026-06-10',
      author: { '@type': 'Organization', name: 'TokDown', url: BASE },
      publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
      inLanguage: locale,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: t('h1'),
      totalTime: 'PT1M',
      tool: [{ '@type': 'HowToTool', name: 'Android phone with Chrome' }, { '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
      step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'TokDown', item: `${BASE}${localePath}/` },
        { '@type': 'ListItem', position: 2, name: t('h1'), item: `${BASE}${localePath}${SLUG}` },
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
              {locale === 'ar' ? 'العودة إلى المحمّل' : locale === 'de' ? 'Zurück zum Downloader' : 'Back to downloader'}
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>
              {locale === 'ar' ? 'دليل أندرويد · يونيو 2026' : locale === 'de' ? 'Android-Anleitung · Juni 2026' : 'Android Guide · June 2026'}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>{t('h1')}</h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('stepsTitle')}</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {steps.map((step, i) => (
                <li key={i} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)' }}>{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>{t('ctaText')}</p>
            <Link href={`${localePath}/`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}>
              {t('ctaButton')}
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tips-h">
            <h2 id="tips-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('tipsTitle')}</h2>
            <div className="flex flex-col gap-3">
              {tips.map((tip, i) => (
                <div key={i} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: '#ff2d55' }}>{tip.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{tip.body}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="trouble-h">
            <h2 id="trouble-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{t('troubleshootTitle')}</h2>
            <div className="flex flex-col gap-3">
              {troubleshoot.map((item, i) => (
                <div key={i} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{item.problem}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              {locale === 'ar' ? 'أدلة ذات صلة' : locale === 'de' ? 'Ähnliche Anleitungen' : 'Related guides'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: `${localePath}/guide/download-tiktok-on-iphone`, icon: '📱', en: 'Download on iPhone', de: 'TikTok auf iPhone', ar: 'تنزيل على آيفون', desc_en: 'Save TikTok videos to your iPhone Camera Roll.', desc_de: 'TikTok-Videos in iPhone-Kamerarolle speichern.', desc_ar: 'احفظ فيديوهات تيك توك في مكتبة صور آيفون.' },
                { href: `${localePath}/guide/download-tiktok-without-watermark`, icon: '🚫', en: 'No Watermark Guide', de: 'Kein Wasserzeichen', ar: 'دليل بدون علامة مائية', desc_en: 'Full guide for all devices.', desc_de: 'Komplette Anleitung für alle Geräte.', desc_ar: 'الدليل الكامل لجميع الأجهزة.' },
                { href: `${localePath}/guide/tiktok-to-mp3`, icon: '🎵', en: 'TikTok to MP3', de: 'TikTok zu MP3', ar: 'تيك توك إلى MP3', desc_en: 'Extract audio from any TikTok video.', desc_de: 'Audio aus TikTok-Videos extrahieren.', desc_ar: 'استخرج الصوت من أي فيديو تيك توك.' },
                { href: `${localePath}/guide/tiktok-to-mp4`, icon: '🎬', en: 'TikTok to MP4', de: 'TikTok zu MP4', ar: 'تيك توك إلى MP4', desc_en: 'Download TikTok as an MP4 file.', desc_de: 'TikTok als MP4-Datei herunterladen.', desc_ar: 'نزّل تيك توك كملف MP4.' },
              ].map(({ href, icon, en, de, ar, desc_en, desc_de, desc_ar }) => (
                <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{locale === 'ar' ? ar : locale === 'de' ? de : en}</h3>
                  <p className="text-xs" style={{ color: 'var(--t4)' }}>{locale === 'ar' ? desc_ar : locale === 'de' ? desc_de : desc_en}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: `${localePath}/`, label: locale === 'ar' ? 'المحمّل' : locale === 'de' ? 'Downloader' : 'Downloader' }, { href: `${localePath}/about`, label: locale === 'ar' ? 'عن التطبيق' : locale === 'de' ? 'Über uns' : 'About' }, { href: '/privacy', label: locale === 'ar' ? 'الخصوصية' : locale === 'de' ? 'Datenschutz' : 'Privacy' }, { href: '/terms', label: locale === 'ar' ? 'الشروط' : locale === 'de' ? 'Nutzungsbedingungen' : 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. {locale === 'ar' ? 'غير تابع لتيك توك أو بايت دانس.' : locale === 'de' ? 'Nicht mit TikTok oder ByteDance verbunden.' : 'Not affiliated with TikTok or ByteDance.'}</p>
        </footer>
      </div>
    </>
  )
}
