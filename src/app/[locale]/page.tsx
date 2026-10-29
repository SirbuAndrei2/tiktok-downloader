import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { faqPage, webApplication } from '@/lib/schema'
import JsonLd from '@/components/JsonLd'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, AtSign, Ban, Check, Clapperboard, Film, ImageDown, Images, LockOpen, Minimize2, Music, Smartphone, X, Zap, type LucideIcon } from 'lucide-react'
import Downloader from '@/components/Downloader'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CtaBand from '@/components/CtaBand'
import { EN_GUIDES, buildFooterColumns } from '@/lib/nav'
import AdsterraNative from '@/components/ads/AdsterraNative'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Home' })
  return pageMetadata({ locale, path: '/', title: t('metaTitle'), description: t('metaDescription'), brandInTitle: true, keywords: t.raw('metaKeywords') as string[] })
}

// Same order as Home.features in the message files (icons live here — no emoji as icons)
const FEATURE_ICONS: LucideIcon[] = [Ban, Film, Music, Zap, LockOpen, Smartphone]
// Bento: first two cards wide, the rest a row of three
const BENTO_SPAN = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-6 lg:col-span-2']

const COMPARISONS = [
  { tokdown: true, others: true },
  { tokdown: true, others: true },
  { tokdown: true, others: true },
  { tokdown: true, others: false },
  { tokdown: true, others: true },
  { tokdown: true, others: true },
]

function YesNo({ yes }: { yes: boolean }) {
  return (
    <span
      className="inline-flex size-7 items-center justify-center rounded-full"
      style={yes ? { background: 'var(--lime-dim)', color: 'var(--lime)', border: '1px solid rgba(200,255,77,0.4)' } : { background: 'var(--surface-2)', color: 'var(--t4)', border: '1px solid var(--line)' }}
    >
      {yes ? <Check className="size-4" strokeWidth={2.5} aria-hidden /> : <X className="size-4" strokeWidth={2.5} aria-hidden />}
      <span className="sr-only">{yes ? '✓' : '✗'}</span>
    </span>
  )
}

function SectionIntro({ id, eyebrow, title, subtitle, align = 'left' }: { id: string; eyebrow: string; title: string; subtitle: string; align?: 'left' | 'center' }) {
  const center = align === 'center'
  return (
    <BlurFade inView className={`mb-10 flex flex-col gap-4 ${center ? 'items-center text-center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="max-w-xl text-base sm:text-lg" style={{ color: 'var(--t3)' }}>{subtitle}</p>
    </BlurFade>
  )
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Home' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const tTools = await getTranslations({ locale, namespace: 'Tools' })

  const features = t.raw('features') as { icon: string; title: string; desc: string }[]
  const comparisons = t.raw('comparisons') as { label: string }[]
  const faq = t.raw('faq') as { q: string; a: string }[]
  const facts = t.raw('facts') as { value: string; label: string }[]
  const steps = [
    { title: t('step1'), desc: t('step1Desc') },
    { title: t('step2'), desc: t('step2Desc') },
    { title: t('step3'), desc: t('step3Desc') },
  ]
  // Trust strings carry a leading "✓ " in the message files; we render a real icon instead.
  const trust = [t('trust1'), t('trust2'), t('trust3'), t('trust4')].map((s) => s.replace(/^✓\s*/, ''))

  const isDefault = locale === 'en'
  const localePath = isDefault ? '' : `/${locale}`

  const toolsPreview = [
    { Icon: Film, title: tTools('items.video.title'), desc: tTools('items.video.desc'), href: '#tiktok-url' },
    { Icon: Music, title: tTools('items.audio.title'), desc: tTools('items.audio.desc'), href: '#tiktok-url' },
    { Icon: Images, title: tTools('items.photo.title'), desc: tTools('items.photo.desc'), href: `${localePath}/photo-downloader` },
    { Icon: Clapperboard, title: tTools('items.facebook.title'), desc: tTools('items.facebook.desc'), href: `${localePath}/facebook-video-downloader` },
    { Icon: AtSign, title: tTools('items.twitter.title'), desc: tTools('items.twitter.desc'), href: `${localePath}/twitter-video-downloader` },
    { Icon: ImageDown, title: tTools('items.youtubeThumbnail.title'), desc: tTools('items.youtubeThumbnail.desc'), href: `${localePath}/youtube-thumbnail-downloader` },
    { Icon: Minimize2, title: tTools('items.compressor.title'), desc: tTools('items.compressor.desc'), href: `${localePath}/video-compressor` },
    { Icon: Smartphone, title: tTools('items.iphone.title'), desc: tTools('items.iphone.desc'), href: `${localePath}/guide/download-tiktok-on-iphone` },
  ]

  const schemas = [
    webApplication({ locale, path: '/', name: t('metaTitle').split(/ [–—|] /)[0], description: t('metaDescription'), features: trust }),
    faqPage(faq),
  ]

  return (
    <>
      <JsonLd data={schemas} />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
        <SiteHeader
          locale={locale}
          localePath={localePath}
          labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }}
        />

        <main className="relative z-10 flex w-full flex-col items-center">

          {/* ── Hero ───────────────────────────────────────────── */}
          <section className="relative w-full" aria-labelledby="hero-h">
            <div aria-hidden className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[640px]" />
            <span aria-hidden className="blob blob--peach blob--animate left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2" />
            <span aria-hidden className="blob blob--sky left-[8%] top-[260px] h-72 w-72" />
            <span aria-hidden className="blob blob--violet right-[6%] top-[200px] h-72 w-72" />

            <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-7 px-5 pb-16 pt-16 text-center sm:pt-24">
              <BlurFade delay={0.05}>
                <span className="pill pill--lime">
                  <span className="size-1.5 rounded-full" style={{ background: 'var(--lime)' }} aria-hidden />
                  {t('eyebrow')}
                </span>
              </BlurFade>
              <BlurFade delay={0.12}>
                <h1 id="hero-h" className="text-[2.9rem] sm:text-6xl lg:text-7xl">
                  {t('h1')}<br />
                  <span className="gradient-text">{t('h1Accent')}</span>
                </h1>
              </BlurFade>
              <BlurFade delay={0.2}>
                <p className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
              </BlurFade>

              <BlurFade delay={0.28} className="w-full">
                <div className="card card--float relative overflow-hidden rounded-3xl p-2.5 sm:p-3" style={{ background: 'rgba(19,19,22,0.85)', backdropFilter: 'blur(12px)' }}>
                  <BorderBeam size={220} duration={9} colorFrom="#C8FF4D" colorTo="#5EEAD4" borderWidth={1.5} />
                  <Downloader />
                </div>
                <p className="mono mt-4 text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--t4)' }}>{t('heroNote')}</p>
              </BlurFade>

              <BlurFade delay={0.36}>
                <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
                  {trust.map((item) => (
                    <li key={item} className="pill">
                      <Check className="size-3.5" style={{ color: 'var(--lime)' }} strokeWidth={2.5} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </BlurFade>
            </div>
          </section>

          <div className="w-full max-w-6xl px-5 pb-10">
            <AdsterraBanner size="responsive" lazy={false} />
          </div>

          {/* ── Facts strip ────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5" aria-label="Facts">
            <BlurFade inView>
              <dl className="m-0 grid grid-cols-2 overflow-hidden rounded-2xl md:grid-cols-4" style={{ border: '1px solid var(--line)', background: 'var(--surface)' }}>
                {facts.map(({ value, label }, i) => (
                  <div key={label} className="flex flex-col gap-1 px-6 py-6" style={{ borderLeft: i % 2 ? '1px solid var(--line)' : undefined, borderTop: i >= 2 ? '1px solid var(--line)' : undefined }}>
                    <dd className="m-0 text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: 'var(--t1)' }}>{value}</dd>
                    <dt className="mono text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--t4)' }}>{label}</dt>
                  </div>
                ))}
              </dl>
            </BlurFade>
          </section>

          {/* ── Bento features ─────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="features-h">
            <SectionIntro id="features-h" eyebrow={tNav('downloader')} title={t('featuresTitle')} subtitle={t('featuresSubtitle')} />
            <div className="grid gap-4 md:grid-cols-6">
              {features.map(({ title, desc }, i) => {
                const Icon = FEATURE_ICONS[i] ?? Zap
                const hero = i === 0
                return (
                  <BlurFade key={title} inView delay={i * 0.06} className={`flex ${BENTO_SPAN[i] ?? 'md:col-span-2'}`}>
                    <div className={`card card--hover relative flex w-full flex-col gap-5 overflow-hidden p-6 ${hero ? 'card--lime min-h-56' : ''}`}>
                      {hero && <span aria-hidden className="blob blob--peach -right-10 -top-16 h-48 w-48" />}
                      <span className="icon-tile relative"><Icon className="size-5" aria-hidden /></span>
                      <div className="relative mt-auto">
                        <h3 className="text-xl sm:text-2xl">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed sm:text-[15px]" style={{ color: 'var(--t3)' }}>{desc}</p>
                      </div>
                    </div>
                  </BlurFade>
                )
              })}
            </div>
          </section>

          {/* One native unit between content blocks, fixed height so it never shifts the layout. */}
          <div className="w-full max-w-6xl px-5 pt-16">
            <AdsterraNative />
          </div>

          {/* ── How it works ───────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="steps-h">
            <SectionIntro id="steps-h" eyebrow="01 — 03" title={t('stepsTitle')} subtitle={t('stepsSubtitle')} />
            <ol className="relative m-0 grid list-none gap-4 p-0 md:grid-cols-3">
              {steps.map((s, i) => (
                <BlurFade key={s.title} inView delay={i * 0.1} className="flex">
                  <li className="card relative flex w-full flex-col gap-5 p-6">
                    <div className="flex items-center justify-between">
                      <span className="numeral">0{i + 1}</span>
                      {i < steps.length - 1 && <ArrowRight className="hidden size-4 md:block rtl:rotate-180" style={{ color: 'var(--t4)' }} aria-hidden />}
                    </div>
                    <h3 className="text-xl sm:text-2xl">{s.title}</h3>
                    <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: 'var(--t3)' }}>{s.desc}</p>
                  </li>
                </BlurFade>
              ))}
            </ol>
          </section>

          <div className="w-full max-w-6xl px-5 pt-16">
            <AdsterraBanner size="inline" />
          </div>

          {/* ── Tools ──────────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="tools-h">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <SectionIntro id="tools-h" eyebrow={tNav('tools')} title={t('toolsTitle')} subtitle={t('toolsSubtitle')} />
              <Link href={`${localePath}/tools`} className="btn-ghost mb-10 inline-flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm no-underline">
                {t('toolsCta')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {toolsPreview.map(({ Icon, title, desc, href }, i) => (
                <BlurFade key={title} inView delay={i * 0.06} className="flex">
                  <Link href={href} className="card card--hover group flex w-full flex-col gap-4 p-6 no-underline">
                    <span className="icon-tile"><Icon className="size-5" aria-hidden /></span>
                    <span className="text-lg font-semibold tracking-tight" style={{ color: 'var(--t1)' }}>{title}</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{desc}</span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium transition-colors group-hover:text-[var(--lime)]" style={{ color: 'var(--t2)' }}>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" aria-hidden />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </section>

          {/* Phones only (desktop has the side rails): between the tools grid and the comparison table,
              halfway down the page instead of just before the FAQ. */}
          <div className="w-full max-w-6xl px-5 pt-16 md:hidden">
            <AdsterraBanner size="300x250" only="mobile" />
          </div>

          {/* ── Why TokDown ────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="why-h">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionIntro id="why-h" eyebrow="TokDown" title={t('whyTitle')} subtitle={t('whySubtitle')} />
              </div>
              <BlurFade inView className="lg:col-span-7">
                <div className="card overflow-hidden">
                  <table className="w-full border-collapse text-sm sm:text-[15px]">
                    <thead>
                      <tr style={{ background: 'var(--surface-2)' }}>
                        <th scope="col" className="mono px-5 py-3.5 text-left text-[11px] font-medium uppercase tracking-[0.16em] rtl:text-right" style={{ color: 'var(--t4)' }}>{t('whyTableFeature')}</th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold" style={{ color: 'var(--lime)' }}>{t('whyTableTokDown')}</th>
                        <th scope="col" className="mono px-3 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: 'var(--t4)' }}>{t('whyTableOthers')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map(({ label }, i) => (
                        <tr key={label} style={{ borderTop: '1px solid var(--line)' }}>
                          <td className="px-5 py-3.5" style={{ color: 'var(--t2)' }}>{label}</td>
                          <td className="px-3 py-3.5 text-center"><YesNo yes={COMPARISONS[i].tokdown} /></td>
                          <td className="px-3 py-3.5 text-center"><YesNo yes={COMPARISONS[i].others} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </BlurFade>
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pb-24 pt-24" aria-labelledby="faq-h">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionIntro id="faq-h" eyebrow="FAQ" title={t('faqTitle')} subtitle={t('faqSubtitle')} />
                {isDefault && (
                  <nav className="flex flex-wrap gap-2" aria-label="More guides">
                    {EN_GUIDES.map(({ key, path }) => (
                      <Link key={path} href={path} className="pill no-underline">{tTools(`items.${key}.title`)}</Link>
                    ))}
                  </nav>
                )}
              </div>
              <BlurFade inView className="lg:col-span-8">
                <Accordion defaultValue={['faq-0']} className="gap-2.5">
                  {faq.map(({ q, a }, i) => (
                    <AccordionItem key={q} value={`faq-${i}`} className="card border-b-0 px-5 py-1 not-last:border-b-0">
                      <AccordionTrigger className="items-center py-4 text-left hover:no-underline">
                        <h3 className="m-0 pr-4 text-base font-medium sm:text-lg">{q}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-relaxed sm:text-[15px]" style={{ color: 'var(--t3)' }}>
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
