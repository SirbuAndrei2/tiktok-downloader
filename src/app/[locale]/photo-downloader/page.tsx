import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbs, faqPage, webApplication } from '@/lib/schema'
import JsonLd from '@/components/JsonLd'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Check, Film, Images, LayoutGrid, Music, type LucideIcon } from 'lucide-react'
import Downloader from '@/components/Downloader'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import AdsterraNative from '@/components/ads/AdsterraNative'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import CtaBand from '@/components/CtaBand'
import { buildFooterColumns, relatedLinks } from '@/lib/nav'
import { BlurFade } from '@/components/ui/blur-fade'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const SLUG = '/photo-downloader'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'PhotoDownloader' })
  return pageMetadata({ locale, path: SLUG, title: t('metaTitle'), description: t('metaDescription'), keywords: t.raw('metaKeywords') as string[] })
}

const FEATURE_ICONS: LucideIcon[] = [Images, LayoutGrid, Film, Music]

function SectionIntro({ id, eyebrow, title, subtitle }: { id: string; eyebrow: string; title: string; subtitle: string }) {
  return (
    <BlurFade inView className="mb-10 flex flex-col gap-4">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      <p className="max-w-xl text-base font-medium sm:text-lg" style={{ color: 'var(--t3)' }}>{subtitle}</p>
    </BlurFade>
  )
}

export default async function PhotoDownloaderPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'PhotoDownloader' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const tTools = await getTranslations({ locale, namespace: 'Tools' })

  const isDefault = locale === 'en'
  const localePath = isDefault ? '' : `/${locale}`

  const faq = t.raw('faq') as { q: string; a: string }[]
  const details = t.raw('details') as string[]
  const related = relatedLinks(SLUG, locale, localePath, tTools)
  const features = t.raw('features') as { title: string; desc: string }[]
  const steps = [
    { title: t('step1'), desc: t('step1Desc') },
    { title: t('step2'), desc: t('step2Desc') },
    { title: t('step3'), desc: t('step3Desc') },
  ]
  const trust = [t('trust1'), t('trust2'), t('trust3'), t('trust4')]

  const appName = t('metaTitle').split(/ [–—|] /)[0]
  const schemas = [
    webApplication({ locale, path: SLUG, name: appName, description: t('metaDescription'), features: trust }),
    faqPage(faq),
    breadcrumbs(locale, [{ name: tNav('tools'), path: '/tools' }, { name: appName, path: SLUG }]),
  ]

  return (
    <>
      <JsonLd data={schemas} />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
        <SiteHeader
          path="/photo-downloader"
          locale={locale}
          localePath={localePath}
          labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }}
        />

        <main className="relative z-10 flex w-full flex-col items-center">
          {/* ── Hero: copy left, the photo tool right. ── */}
          <section className="relative w-full max-w-6xl px-5 pb-16 pt-12 sm:pt-20" aria-labelledby="hero-h">
            <span aria-hidden className="blob blob--sky blob--animate -left-28 top-6 h-80 w-80 sm:-left-16" />
            <span aria-hidden className="blob blob--peach -right-20 top-40 h-64 w-64 lg:right-[38%] lg:top-[-40px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="flex flex-col items-start gap-6 lg:col-span-6">
                <BlurFade delay={0.05}>
                  <span className="pill pill--teal">{t('eyebrow')}</span>
                </BlurFade>
                <BlurFade delay={0.12}>
                  <h1 id="hero-h" className="text-[3.1rem] sm:text-7xl lg:text-[5.2rem]">
                    {t('h1')}<br />
                    <span className="highlight highlight--sky">{t('h1Accent')}</span>
                  </h1>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <p className="max-w-lg text-lg font-medium leading-relaxed" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
                </BlurFade>
                <BlurFade delay={0.28}>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {trust.map((item) => (
                      <li key={item} className="pill">
                        <Check className="size-3.5" style={{ color: 'var(--lime)' }} strokeWidth={2.5} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </BlurFade>
                <BlurFade delay={0.34}>
                  <Link href={localePath || '/'} className="link-ink inline-flex items-center gap-2 text-sm font-bold">
                    {t('videoLink')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                  </Link>
                </BlurFade>
              </div>

              <div className="relative lg:col-span-6">
                <span aria-hidden className="pill pill--lime mono absolute -top-4 right-4 z-20 hidden text-[11px] tracking-[0.14em] sm:inline-flex">JPG · MP4 · MP3</span>
                <BlurFade delay={0.15} direction="up">
                  <div className="card card--float relative overflow-hidden rounded-3xl p-2.5 sm:p-3">
                    <Downloader variant="photo" />
                  </div>
                </BlurFade>
                <p className="mt-5 text-center text-sm font-semibold" style={{ color: 'var(--t3)' }}>{t('heroNote')}</p>
              </div>
            </div>
          </section>

          {/* Phones only: a 300×250 under the hero, as on home and the tool pages (desktop layout unchanged) */}
          <div className="w-full max-w-6xl px-5 pt-4 md:hidden">
            <AdsterraBanner size="300x250" only="mobile" />
          </div>

          {/* ── How it works ───────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 py-20" aria-labelledby="steps-h">
            <SectionIntro id="steps-h" eyebrow={tNav('photoDownloader')} title={t('stepsTitle')} subtitle={t('stepsSubtitle')} />
            <ol className="relative m-0 grid list-none gap-6 p-0 md:grid-cols-3">
              <span aria-hidden className="absolute left-0 right-0 top-14 hidden border-t-2 border-dashed md:block" style={{ borderColor: 'var(--ink)' }} />
              {steps.map((s, i) => (
                <BlurFade key={s.title} inView delay={i * 0.1} className="flex">
                  <li className="cut-card cut-card--hover relative flex w-full flex-col gap-4 p-7" style={{ background: i === 1 ? 'var(--sky)' : 'var(--white)' }}>
                    <span className="numeral">0{i + 1}</span>
                    <h3 className="text-2xl sm:text-3xl">{s.title}</h3>
                    <p className="text-sm font-medium leading-relaxed sm:text-base" style={{ color: 'var(--t3)' }}>{s.desc}</p>
                  </li>
                </BlurFade>
              ))}
            </ol>
          </section>

          {/* ── What you get ───────────────────────────────────── */}
          <div className="w-full max-w-6xl px-5 pb-16">
            <AdsterraNative />
          </div>

          <section className="relative w-full overflow-hidden py-20" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }} aria-labelledby="features-h">
            <span aria-hidden className="blob blob--sky -left-20 bottom-0 h-72 w-72 opacity-90" />
            <div className="relative mx-auto w-full max-w-6xl px-5">
              <SectionIntro id="features-h" eyebrow={tNav('tools')} title={t('featuresTitle')} subtitle={t('featuresSubtitle')} />
              <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {features.map(({ title, desc }, i) => {
                  const Icon = FEATURE_ICONS[i] ?? Images
                  return (
                    <BlurFade key={title} inView delay={i * 0.08} className="flex">
                      <li className={`card card--hover flex w-full flex-col gap-4 p-6 ${i === 0 ? 'card--lime' : ''}`}>
                        <span className="icon-tile"><Icon className="size-5" aria-hidden /></span>
                        <span className="text-lg font-semibold tracking-tight">{title}</span>
                        <span className="text-sm font-medium leading-relaxed" style={{ color: 'var(--t3)' }}>{desc}</span>
                      </li>
                    </BlurFade>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* ── In depth: how slideshows work, limits, related tools ── */}
          <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="depth-h">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionIntro id="depth-h" eyebrow={tCommon('inDepth')} title={t('detailsTitle')} subtitle={t('detailsSubtitle')} />
              </div>
              <div className="flex flex-col gap-5 lg:col-span-8">
                {details.map((para) => (
                  <p key={para.slice(0, 40)} className="m-0 text-base leading-relaxed sm:text-[17px]" style={{ color: 'var(--t2)' }}>{para}</p>
                ))}
                <nav aria-label={tCommon('related')} className="flex flex-col gap-3">
                  <span className="eyebrow">{tCommon('related')}</span>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {related.map(({ href, label }) => (
                      <li key={href}><Link href={href} className="pill no-underline">{label}</Link></li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </section>

          <div className="w-full max-w-6xl px-5 pt-16">
            <AdsterraBanner size="inline" />
          </div>

          {/* ── FAQ ────────────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pb-24 pt-20" aria-labelledby="faq-h">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionIntro id="faq-h" eyebrow="FAQ" title={t('faqTitle')} subtitle={t('faqSubtitle')} />
              </div>
              <BlurFade inView className="lg:col-span-8">
                <Accordion defaultValue={['faq-0']} className="gap-3">
                  {faq.map(({ q, a }, i) => (
                    <AccordionItem key={q} value={`faq-${i}`} className="cut-card border-b-0 px-5 py-1 not-last:border-b-0">
                      <AccordionTrigger className="items-center py-4 text-left hover:no-underline">
                        <h3 className="m-0 pr-4 text-lg sm:text-xl">{q}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm font-medium leading-relaxed sm:text-base" style={{ color: 'var(--t3)' }}>
                        {a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </BlurFade>
            </div>
          </section>

          <CtaBand title={t('ctaTitle')} subtitle={t('ctaSubtitle')} button={t('ctaButton')} href="#tiktok-url" />
        </main>

        <SiteFooter
          tagline={tFooter('tagline')}
          copyright={tFooter('notAffiliated', { year: new Date().getFullYear() })}
          feedback={tFooter('feedback')}
          columns={buildFooterColumns(localePath, tNav, tFooter, tTools)}
        />
      </div>
    </>
  )
}
