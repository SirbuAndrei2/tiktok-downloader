import type { Metadata } from 'next'
import { BASE, pageMetadata } from '@/lib/seo'
import { breadcrumbs, itemList } from '@/lib/schema'
import JsonLd from '@/components/JsonLd'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowLeftRight, ArrowRight, AtSign, Clapperboard, Film, Globe, ImageDown, ImagePlay, Images, ListVideo, Lock, Minimize2, Music, Scale, Smartphone, Sparkles, TabletSmartphone, type LucideIcon } from 'lucide-react'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CtaBand from '@/components/CtaBand'
import AdsterraNative from '@/components/ads/AdsterraNative'
import { buildFooterColumns } from '@/lib/nav'
import { BlurFade } from '@/components/ui/blur-fade'

const SLUG = '/tools'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Tools' })
  return pageMetadata({ locale, path: SLUG, title: t('metaTitle'), description: t('metaDescription') })
}

type ToolKey = 'video' | 'photo' | 'facebook' | 'twitter' | 'youtubeThumbnail' | 'compressor' | 'mp4ToGif' | 'audio' | 'hd' | 'iphone' | 'android' | 'mp4' | 'gif' | 'chrome' | 'playlist' | 'private' | 'legal' | 'snaptik'

// `tool` = a translated tool page (every locale); `guide` = translated guide (every locale);
// `enGuide` = English-only guide (hidden on /de, /ar); none = the home downloader itself.
const TOOLS: { key: ToolKey; Icon: LucideIcon; tool?: string; guide?: string; enGuide?: string }[] = [
  { key: 'video', Icon: Film },
  { key: 'photo', Icon: Images, tool: '/photo-downloader' },
  { key: 'facebook', Icon: Clapperboard, tool: '/facebook-video-downloader' },
  { key: 'twitter', Icon: AtSign, tool: '/twitter-video-downloader' },
  { key: 'youtubeThumbnail', Icon: ImageDown, tool: '/youtube-thumbnail-downloader' },
  { key: 'compressor', Icon: Minimize2, tool: '/video-compressor' },
  { key: 'mp4ToGif', Icon: ImagePlay, tool: '/mp4-to-gif' },
  { key: 'audio', Icon: Music, guide: '/guide/tiktok-to-mp3' },
  { key: 'hd', Icon: Sparkles, guide: '/guide/download-tiktok-without-watermark' },
  { key: 'iphone', Icon: Smartphone, guide: '/guide/download-tiktok-on-iphone' },
  { key: 'android', Icon: TabletSmartphone, guide: '/guide/download-tiktok-on-android' },
  { key: 'mp4', Icon: Film, enGuide: '/guide/tiktok-to-mp4' },
  { key: 'gif', Icon: ImagePlay, enGuide: '/guide/tiktok-video-to-gif' },
  { key: 'chrome', Icon: Globe, enGuide: '/guide/tiktok-downloader-chrome' },
  { key: 'playlist', Icon: ListVideo, enGuide: '/guide/download-tiktok-playlist' },
  { key: 'private', Icon: Lock, enGuide: '/guide/download-tiktok-private-video' },
  { key: 'legal', Icon: Scale, enGuide: '/guide/is-it-legal-to-download-tiktok-videos' },
  { key: 'snaptik', Icon: ArrowLeftRight, enGuide: '/guide/snaptik-alternative' },
]

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'Tools' })
  const tHome = await getTranslations({ locale, namespace: 'Home' })
  const tNav = await getTranslations({ locale, namespace: 'Nav' })
  const tFooter = await getTranslations({ locale, namespace: 'Footer' })
  const tCommon = await getTranslations({ locale, namespace: 'Common' })

  const isDefault = locale === 'en'
  const localePath = isDefault ? '' : `/${locale}`
  const homeTool = `${localePath}/#tiktok-url`
  const tools = TOOLS.filter((tool) => isDefault || !tool.enGuide)

  const schema = [
    itemList(t('h1'), tools.map((tool) => ({
      name: t(`items.${tool.key}.title`),
      url: `${BASE}${tool.tool ? `${localePath}${tool.tool}` : tool.guide ? `${localePath}${tool.guide}` : tool.enGuide ?? (localePath || '/')}`,
    }))),
    breadcrumbs(locale, [{ name: tNav('tools'), path: SLUG }]),
  ]

  return (
    <>
      <JsonLd data={schema} />
      <div className="relative flex min-h-screen w-full flex-col">
        <SiteHeader path="/tools" locale={locale} localePath={localePath} labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }} />

        <main className="relative z-10 flex w-full flex-col items-center">
          <section className="relative w-full max-w-6xl px-5 pb-12 pt-14 sm:pt-20">
            <span aria-hidden className="blob blob--peach blob--animate -right-24 -top-10 h-72 w-72" />
            <span aria-hidden className="blob blob--sky -left-24 top-32 h-56 w-56" />
            <div className="relative max-w-3xl">
              <BlurFade><span className="pill pill--lime">{t('eyebrow')}</span></BlurFade>
              <BlurFade delay={0.08}><h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl">{t('h1')}</h1></BlurFade>
              <BlurFade delay={0.16}><p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--t3)' }}>{t('subtitle')}</p></BlurFade>
              <div className="mt-6 flex max-w-2xl flex-col gap-4">
                {(t.raw('intro') as string[]).map((para) => (
                  <p key={para.slice(0, 40)} className="m-0 text-base leading-relaxed" style={{ color: 'var(--t2)' }}>{para}</p>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full max-w-6xl px-5 pb-20" aria-label={t('eyebrow')}>
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map(({ key, Icon, tool, guide, enGuide }, i) => {
                const guideHref = guide ? `${localePath}${guide}` : enGuide
                const primaryHref = tool ? `${localePath}${tool}` : guideHref ?? homeTool
                const primaryLabel = guideHref ? t('readGuide') : t('useTool')
                const tint = i === 0 ? 'card--lime' : ''
                return (
                  <BlurFade key={key} inView delay={(i % 3) * 0.08} className="flex">
                    <li className={`card card--hover flex w-full flex-col gap-5 p-6 ${tint}`}>
                      <span className="icon-tile">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl sm:text-3xl">{t(`items.${key}.title`)}</h2>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{t(`items.${key}.desc`)}</p>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                        <Link href={primaryHref} className={`${i === 0 ? 'btn-brand' : 'btn-ghost'} inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm no-underline`}>
                          {primaryLabel} <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                        </Link>
                        {guideHref && (
                          <Link href={homeTool} className="text-sm font-medium no-underline hover:underline" style={{ color: 'var(--t2)', textUnderlineOffset: 4 }}>
                            {t('useTool')}
                          </Link>
                        )}
                      </div>
                    </li>
                  </BlurFade>
                )
              })}
            </ul>
          </section>

          <div className="w-full max-w-6xl px-5 pb-16">
            <AdsterraNative />
          </div>

          <CtaBand title={tHome('ctaTitle')} subtitle={tHome('ctaSubtitle')} button={tHome('ctaButton')} href={homeTool} />
        </main>

        <SiteFooter tagline={tFooter('tagline')} copyright={tFooter('notAffiliated', { year: new Date().getFullYear() })} feedback={tFooter('feedback')} columns={buildFooterColumns(localePath, tNav, tFooter, t)} />
      </div>
    </>
  )
}
