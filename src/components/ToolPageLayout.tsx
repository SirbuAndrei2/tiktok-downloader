import type { ReactNode } from 'react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CtaBand from '@/components/CtaBand'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { buildFooterColumns } from '@/lib/nav'
import LinkToTool from '@/components/LinkToTool'
import AdsterraNative from '@/components/ads/AdsterraNative'

const BASE = 'https://tokdown.org'

/**
 * Shared shell for every tool page: hero with the tool, trust pills, 3 steps,
 * feature cards, FAQ accordion, CTA, header/footer and JSON-LD. Each page only
 * supplies its namespace, slug, the interactive tool element and an optional
 * extra section. Message namespace must provide: eyebrow, h1, h1Accent,
 * subtitle, heroNote, trust[], stepsTitle, stepsSubtitle, steps[{title,desc}],
 * featuresTitle, featuresSubtitle, features[{title,desc}], faqTitle,
 * faqSubtitle, faq[{q,a}], ctaTitle, ctaSubtitle, ctaButton, metaDescription.
 */
interface Props {
  locale: string
  namespace: string
  slug: string
  tool: ReactNode
  /** Anchor the CTA button scrolls to (the tool's main input). */
  anchor?: string
  /** Optional section rendered between the steps and the features. */
  extra?: ReactNode
  /** Whether the tool runs fully in the browser (adds the privacy pill). */
  local?: boolean
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

export default async function ToolPageLayout({ locale, namespace, slug, tool, anchor = '#tool', extra, local = false }: Props) {
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const tTools = await getTranslations({ locale, namespace: 'Tools' })

  const localePath = locale === 'en' ? '' : `/${locale}`
  const pageUrl = `${BASE}${localePath}${slug}`
  const trust = t.raw('trust') as string[]
  const steps = t.raw('steps') as { title: string; desc: string }[]
  const features = t.raw('features') as { title: string; desc: string }[]
  const faq = t.raw('faq') as { q: string; a: string }[]
  const details = (t.has('details') ? (t.raw('details') as string[]) : [])

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `${t('h1')} ${t('h1Accent')} — TokDown`,
      url: pageUrl,
      description: t('metaDescription'),
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      creator: { '@type': 'Organization', name: 'TokDown', url: BASE },
    },
    { '@context': 'https://schema.org', '@type': 'HowTo', name: `${t('h1')} ${t('h1Accent')}`, totalTime: 'PT1M', step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.desc })) },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'TokDown', item: `${BASE}${localePath || '/'}` }, { '@type': 'ListItem', position: 2, name: tNav('tools'), item: `${BASE}${localePath}/tools` }, { '@type': 'ListItem', position: 3, name: `${t('h1')} ${t('h1Accent')}`, item: pageUrl }] },
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="relative flex min-h-screen w-full flex-col overflow-x-clip">
        <SiteHeader path={slug} locale={locale} localePath={localePath} labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }} />

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
                <h1 id="hero-h" className="text-[2.6rem] sm:text-6xl lg:text-7xl">
                  {t('h1')}<br />
                  <span className="gradient-text">{t('h1Accent')}</span>
                </h1>
              </BlurFade>
              <BlurFade delay={0.2}>
                <p className="mx-auto max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
              </BlurFade>
              <BlurFade delay={0.28} className="w-full">
                <div id="tool" className="card card--float relative overflow-hidden rounded-3xl p-2.5 text-left sm:p-3 rtl:text-right" style={{ background: 'rgba(19,19,22,0.85)', backdropFilter: 'blur(12px)' }}>
                  <BorderBeam size={220} duration={9} colorFrom="#C8FF4D" colorTo="#5EEAD4" borderWidth={1.5} />
                  {tool}
                </div>
                <p className="mono mt-4 text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--t4)' }}>{t('heroNote')}</p>
              </BlurFade>
              <BlurFade delay={0.36}>
                <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
                  {local && (
                    <li className="pill pill--teal">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                      {tCommon('runsLocally')}
                    </li>
                  )}
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

          {/* ── Steps ──────────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pt-8" aria-labelledby="steps-h">
            <SectionIntro id="steps-h" eyebrow="01 — 03" title={t('stepsTitle')} subtitle={t('stepsSubtitle')} />
            <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
              {steps.map((s, i) => (
                <BlurFade key={s.title} inView delay={i * 0.1} className="flex">
                  <li className="card flex w-full flex-col gap-5 p-6">
                    <span className="numeral">0{i + 1}</span>
                    <h3 className="text-xl sm:text-2xl">{s.title}</h3>
                    <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: 'var(--t3)' }}>{s.desc}</p>
                  </li>
                </BlurFade>
              ))}
            </ol>
          </section>

          <div className="w-full max-w-6xl px-5 pt-16">
            <AdsterraNative />
          </div>

          {extra}

          {/* ── In depth (substantive copy for the page's topic) ── */}
          {details.length > 0 && (
            <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="depth-h">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <SectionIntro id="depth-h" eyebrow={tCommon('inDepth')} title={`${t('h1')} ${t('h1Accent')}`} subtitle={t('subtitle')} />
                </div>
                <div className="flex flex-col gap-5 lg:col-span-8">
                  {details.map((para) => (
                    <p key={para.slice(0, 40)} className="m-0 text-base leading-relaxed sm:text-[17px]" style={{ color: 'var(--t2)' }}>{para}</p>
                  ))}
                  <LinkToTool url={pageUrl} title={`${t('h1')} ${t('h1Accent')} – TokDown`} heading={tCommon('linkToTool')} hint={tCommon('linkToToolHint')} copyLabel={tCommon('copy')} copiedLabel={tCommon('copied')} />
                </div>
              </div>
            </section>
          )}

          {/* ── Features ───────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pt-24" aria-labelledby="features-h">
            <SectionIntro id="features-h" eyebrow={tNav('tools')} title={t('featuresTitle')} subtitle={t('featuresSubtitle')} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ title, desc }, i) => (
                <BlurFade key={title} inView delay={i * 0.06} className="flex">
                  <div className={`card card--hover flex w-full flex-col gap-3 p-6 ${i === 0 ? 'card--lime' : ''}`}>
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{desc}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────── */}
          <section className="w-full max-w-6xl px-5 pb-24 pt-24" aria-labelledby="faq-h">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionIntro id="faq-h" eyebrow="FAQ" title={t('faqTitle')} subtitle={t('faqSubtitle')} />
              </div>
              <BlurFade inView className="lg:col-span-8">
                <Accordion defaultValue={['faq-0']} className="gap-2.5">
                  {faq.map(({ q, a }, i) => (
                    <AccordionItem key={q} value={`faq-${i}`} className="card border-b-0 px-5 py-1 not-last:border-b-0">
                      <AccordionTrigger className="items-center py-4 text-left hover:no-underline">
                        <h3 className="m-0 pr-4 text-base font-medium sm:text-lg">{q}</h3>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-relaxed sm:text-[15px]" style={{ color: 'var(--t3)' }}>{a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </BlurFade>
            </div>
          </section>

          <CtaBand title={t('ctaTitle')} subtitle={t('ctaSubtitle')} button={t('ctaButton')} href={anchor} />
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
