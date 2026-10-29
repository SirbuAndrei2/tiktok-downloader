import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { Separator } from '@/components/ui/separator'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import JsonLd from '@/components/JsonLd'
import GuideFaq from '@/components/GuideFaq'
import { buildFooterColumns, guideCards, type LinkKey } from '@/lib/nav'
import { pageMetadata } from '@/lib/seo'
import { article, breadcrumbs, faqPage } from '@/lib/schema'
import { pageDates } from '@/lib/content-dates'

/**
 * Shared layout for the guides added on 2026-10-29 (PC/Mac, slideshow, missing
 * "Save video" option, drafts). Same look and ad slots as the older translated
 * guides (mobile 300×250 after the first section, responsive banner at the end),
 * plus the site header (language switcher) and footer.
 *
 * The message namespace must provide: metaTitle (≤ 50 chars), metaDescription,
 * eyebrow, h1, subtitle, answerTitle, answer, stepsTitle, steps[{title, body}],
 * ctaText, ctaButton, sections[{title, paragraphs[]}], tipsTitle, tips[{title, body}],
 * troubleshootTitle, troubleshoot[{problem, fix}], faqTitle, faq[{q, a}].
 * Empty arrays hide their section.
 */
type Props = {
  locale: string
  slug: string
  namespace: string
  /** Tool or guide keys for the "Related guides" cards (Tools.items.<key>). */
  related: LinkKey[]
  /** Where the CTA button points, without locale prefix ('/' = home downloader). */
  ctaPath?: string
}

export async function guideMetadata(locale: string, slug: string, namespace: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace })
  return pageMetadata({ locale, path: slug, title: t('metaTitle'), description: t('metaDescription'), ogType: 'article' })
}

const h2 = 'text-xl font-bold mb-6'

export default async function TranslatedGuide({ locale, slug, namespace, related, ctaPath = '/' }: Props) {
  const t = await getTranslations({ locale, namespace })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })
  const tTools = await getTranslations({ locale, namespace: 'Tools' })
  const localePath = locale === 'en' ? '' : `/${locale}`
  const ctaHref = ctaPath === '/' ? localePath || '/' : `${localePath}${ctaPath}`

  const steps = t.raw('steps') as { title: string; body: string }[]
  const sections = t.raw('sections') as { title: string; paragraphs: string[] }[]
  const tips = t.raw('tips') as { title: string; body: string }[]
  const troubleshoot = t.raw('troubleshoot') as { problem: string; fix: string }[]
  const faq = t.raw('faq') as { q: string; a: string }[]
  const cards = guideCards(related, locale, localePath)

  const dates = pageDates(slug)
  const jsonLd = [
    article({ locale, path: slug, headline: t('h1'), description: t('metaDescription'), datePublished: dates.published, dateModified: dates.modified }),
    ...(faq.length ? [faqPage(faq)] : []),
    breadcrumbs(locale, [{ name: tNav('guides'), path: '/guide' }, { name: t('h1'), path: slug }]),
  ]

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="relative flex min-h-screen w-full flex-col">
        <SiteHeader path={slug} locale={locale} localePath={localePath} labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }} />

        <main className="relative z-10 flex w-full flex-col items-center px-4 py-12">
          <div className="mb-8 w-full max-w-2xl">
            <Link href={`${localePath}/guide`} className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:rotate-180" aria-hidden><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              {tNav('allGuides')}
            </Link>
          </div>

          <header className="mb-10 w-full max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--brand)' }}>{t('eyebrow')}</p>
            <h1 className="mb-4 text-3xl font-black leading-tight sm:text-4xl" style={{ color: 'var(--t1)' }}>{t('h1')}</h1>
            <p className="mx-auto max-w-lg text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p>
          </header>

          <section className="mb-10 w-full max-w-2xl" aria-labelledby="answer-h">
            <div className="faq-item">
              <h2 id="answer-h" className="mb-2 text-sm font-bold" style={{ color: 'var(--t1)' }}>{t('answerTitle')}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--t2)' }}>{t('answer')}</p>
            </div>
          </section>

          <section className="mb-12 w-full max-w-2xl" aria-labelledby="steps-h">
            <h2 id="steps-h" className={h2} style={{ color: 'var(--t1)' }}>{t('stepsTitle')}</h2>
            <ol className="m-0 flex list-none flex-col gap-4 p-0">
              {steps.map(({ title, body }, i) => (
                <li key={title} className="faq-item flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-black" style={{ background: 'rgba(139,108,255,0.15)', color: 'var(--brand)', border: '1px solid rgba(139,108,255,0.3)' }}>{i + 1}</span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold" style={{ color: 'var(--t1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Phones only: first ad after the opening section instead of only at the end */}
          <div className="mb-12 w-full max-w-2xl md:hidden">
            <AdsterraBanner size="300x250" only="mobile" />
          </div>

          <Separator className="mb-10 w-full max-w-2xl" style={{ background: 'var(--line)' }} />

          <section className="mb-12 w-full max-w-2xl text-center">
            <p className="mb-4 text-sm" style={{ color: 'var(--t3)' }}>{t('ctaText')}</p>
            <Link href={ctaHref} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}>
              {t('ctaButton')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
          </section>

          {sections.map(({ title, paragraphs }, i) => (
            <section key={title} className="mb-12 w-full max-w-2xl" aria-labelledby={`s${i}-h`}>
              <h2 id={`s${i}-h`} className="mb-4 text-xl font-bold" style={{ color: 'var(--t1)' }}>{title}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>
                {paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
              </div>
            </section>
          ))}

          {tips.length > 0 && (
            <>
              <Separator className="mb-10 w-full max-w-2xl" style={{ background: 'var(--line)' }} />
              <section className="mb-12 w-full max-w-2xl" aria-labelledby="tips-h">
                <h2 id="tips-h" className={h2} style={{ color: 'var(--t1)' }}>{t('tipsTitle')}</h2>
                <div className="flex flex-col gap-3">
                  {tips.map(({ title, body }) => (
                    <div key={title} className="faq-item">
                      <h3 className="mb-1.5 text-sm font-bold" style={{ color: 'var(--brand)' }}>{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {troubleshoot.length > 0 && (
            <>
              <Separator className="mb-10 w-full max-w-2xl" style={{ background: 'var(--line)' }} />
              <section className="mb-12 w-full max-w-2xl" aria-labelledby="trouble-h">
                <h2 id="trouble-h" className={h2} style={{ color: 'var(--t1)' }}>{t('troubleshootTitle')}</h2>
                <div className="flex flex-col gap-3">
                  {troubleshoot.map(({ problem, fix }) => (
                    <div key={problem} className="faq-item">
                      <h3 className="mb-1.5 text-sm font-bold" style={{ color: 'var(--t1)' }}>{problem}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{fix}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {faq.length > 0 && (
            <>
              <Separator className="mb-10 w-full max-w-2xl" style={{ background: 'var(--line)' }} />
              <GuideFaq title={t('faqTitle')} faq={faq} />
            </>
          )}

          {cards.length > 0 && (
            <section className="mb-4 w-full max-w-2xl" aria-labelledby="related-h">
              <h2 id="related-h" className={h2} style={{ color: 'var(--t1)' }}>{tCommon('relatedGuides')}</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cards.map(({ key, href }) => (
                  <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                    <h3 className="mb-1 text-sm font-bold" style={{ color: 'var(--t1)' }}>{tTools(`items.${key}.title`)}</h3>
                    <p className="text-xs" style={{ color: 'var(--t4)' }}>{tTools(`items.${key}.desc`)}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          <div className="w-full max-w-2xl px-4 pb-12">
            <AdsterraBanner size="responsive" />
          </div>
        </main>

        <SiteFooter tagline={tFooter('tagline')} copyright={tFooter('notAffiliated', { year: new Date().getFullYear() })} feedback={tFooter('feedback')} columns={buildFooterColumns(localePath, tNav, tFooter, tTools)} />
      </div>
    </>
  )
}
