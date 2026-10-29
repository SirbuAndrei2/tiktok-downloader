import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import TranslatedGuide, { guideMetadata } from '@/components/TranslatedGuide'

// Translated guide: rendered for every locale from the `GuideDraft` namespace.
const SLUG = '/guide/save-tiktok-draft'
const NS = 'GuideDraft'
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  return guideMetadata(locale, SLUG, NS)
}

export default async function SaveTikTokDraft({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <TranslatedGuide locale={locale} slug={SLUG} namespace={NS} related={['noSave', 'hd', 'compressor', 'iphone', 'android', 'private']} ctaPath={'/'} />
}
