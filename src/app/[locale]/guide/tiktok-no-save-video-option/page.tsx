import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import TranslatedGuide, { guideMetadata } from '@/components/TranslatedGuide'

// Translated guide: rendered for every locale from the `GuideNoSave` namespace.
const SLUG = '/guide/tiktok-no-save-video-option'
const NS = 'GuideNoSave'
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  return guideMetadata(locale, SLUG, NS)
}

export default async function TikTokNoSaveVideoOption({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <TranslatedGuide locale={locale} slug={SLUG} namespace={NS} related={['legal', 'hd', 'private', 'draft', 'iphone', 'android']} ctaPath={'/'} />
}
