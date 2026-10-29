import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import TranslatedGuide, { guideMetadata } from '@/components/TranslatedGuide'

// Translated guide: rendered for every locale from the `GuidePc` namespace.
const SLUG = '/guide/download-tiktok-on-pc'
const NS = 'GuidePc'
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  return guideMetadata(locale, SLUG, NS)
}

export default async function DownloadTikTokOnPc({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <TranslatedGuide locale={locale} slug={SLUG} namespace={NS} related={['chrome', 'mp4', 'compressor', 'iphone', 'android', 'audio']} ctaPath={'/'} />
}
