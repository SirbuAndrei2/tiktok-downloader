import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import TranslatedGuide, { guideMetadata } from '@/components/TranslatedGuide'

// Translated guide: rendered for every locale from the `GuideSlideshow` namespace.
const SLUG = '/guide/download-tiktok-slideshow'
const NS = 'GuideSlideshow'
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  return guideMetadata(locale, SLUG, NS)
}

export default async function DownloadTikTokSlideshow({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <TranslatedGuide locale={locale} slug={SLUG} namespace={NS} related={['photo', 'audio', 'pc', 'android', 'iphone', 'hd']} ctaPath={'/photo-downloader'} />
}
