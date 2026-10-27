import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowLeftRight, ArrowRight, Film, Globe, ImagePlay, ListVideo, Lock, Music, Scale, Smartphone, Sparkles, TabletSmartphone, type LucideIcon } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CtaBand from '@/components/CtaBand'
import JsonLd from '@/components/JsonLd'
import { BlurFade } from '@/components/ui/blur-fade'
import { EN_GUIDES, TRANSLATED_GUIDES, buildFooterColumns } from '@/lib/nav'
import { localeUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbs, itemList } from '@/lib/schema'

const SLUG = '/guide'
type Props = { params: Promise<{ locale: string }> }

const ICONS: Record<string, LucideIcon> = {
  hd: Sparkles, audio: Music, iphone: Smartphone, android: TabletSmartphone,
  legal: Scale, mp4: Film, gif: ImagePlay, chrome: Globe, playlist: ListVideo, private: Lock, snaptik: ArrowLeftRight,
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'GuideHub' })
  return pageMetadata({ locale, path: SLUG, title: t('metaTitle'), description: t('metaDescription') })
}

export default async function GuideHub({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'GuideHub' })
  const tTools = await getTranslations({ locale, namespace: 'Tools' })
  const tHome = await getTranslations({ locale, namespace: 'Home' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })

  const localePath = locale === 'en' ? '' : `/${locale}`
  const intro = t.raw('intro') as string[]

  // Translated guides keep the locale prefix; English-only guides are linked
  // from every locale (as English pages) so none of them is orphaned.
  const translated = TRANSLATED_GUIDES.map((g) => ({ ...g, href: `${localePath}${g.path}` }))
  const english = EN_GUIDES.map((g) => ({ ...g, href: g.path }))

  const schema = [
    itemList(t('h1'), [
      ...translated.map((g) => ({ name: tTools(`items.${g.key}.title`), url: localeUrl(locale, g.path) })),
      ...english.map((g) => ({ name: tTools(`items.${g.key}.title`), url: localeUrl('en', g.path) })),
    ]),
    breadcrumbs(locale, [{ name: tNav('guides'), path: SLUG }]),
  ]

  const card = ({ key, href }: { key: string; href: string }, i: number, highlight: boolean, hrefLang?: string) => {
    const Icon = ICONS[key] ?? Sparkles
    return (
      <BlurFade key={href} inView delay={(i % 3) * 0.08} className="flex">
        <li className={`card card--hover flex w-full flex-col gap-5 p-6 ${highlight ? 'card--lime' : ''}`}>
          <span className="icon-tile"><Icon className="size-5" aria-hidden /></span>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl sm:text-2xl">{tTools(`items.${key}.title`)}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{tTools(`items.${key}.desc`)}</p>
          </div>
          <div className="mt-auto pt-2">
            <Link href={href} hrefLang={hrefLang} className={`${highlight ? 'btn-brand' : 'btn-ghost'} inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm no-underline`}>
              {tTools('readGuide')} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </li>
      </BlurFade>
    )
  }

  return (
    <>
      <JsonLd data={schema} />
      <div className="relative flex min-h-screen w-full flex-col">
        <SiteHeader path={SLUG} locale={locale} localePath={localePath} labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }} />

        <main className="relative z-10 flex w-full flex-col items-center">
          <section className="relative w-full max-w-6xl px-5 pb-12 pt-14 sm:pt-20">
            <span aria-hidden className="blob blob--peach blob--animate -right-24 -top-10 h-72 w-72" />
            <span aria-hidden className="blob blob--sky -left-24 top-32 h-56 w-56" />
            <div className="relative max-w-3xl">
              <BlurFade><span className="pill pill--lime">{t('eyebrow')}</span></BlurFade>
              <BlurFade delay={0.08}><h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl">{t('h1')}</h1></BlurFade>
              <BlurFade delay={0.16}><p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p></BlurFade>
              <div className="mt-6 flex max-w-2xl flex-col gap-4">
                {intro.map((para) => (
                  <p key={para.slice(0, 40)} className="m-0 text-base leading-relaxed" style={{ color: 'var(--t2)' }}>{para}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full max-w-6xl px-5 pb-16" aria-labelledby="main-guides-h">
            <h2 id="main-guides-h" className="mb-8 text-3xl sm:text-4xl">{t('translatedTitle')}</h2>
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {translated.map((g, i) => card(g, i, i === 0))}
            </ul>
          </section>

          <section className="w-full max-w-6xl px-5 pb-20" aria-labelledby="en-guides-h">
            <h2 id="en-guides-h" className="mb-3 text-3xl sm:text-4xl">{t('englishTitle')}</h2>
            {locale !== 'en' && <p className="mb-8 max-w-2xl text-base" style={{ color: 'var(--t3)' }}>{t('englishNote')}</p>}
            <ul className={`m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 ${locale === 'en' ? 'mt-8' : ''}`}>
              {english.map((g, i) => card(g, i, false, locale === 'en' ? undefined : 'en'))}
            </ul>
          </section>

          <CtaBand title={tHome('ctaTitle')} subtitle={tHome('ctaSubtitle')} button={tHome('ctaButton')} href={`${localePath}/#tiktok-url`} />
        </main>

        <SiteFooter tagline={tFooter('tagline')} copyright={tFooter('notAffiliated', { year: new Date().getFullYear() })} feedback={tFooter('feedback')} columns={buildFooterColumns(localePath, tNav, tFooter, tTools)} />
      </div>
    </>
  )
}
