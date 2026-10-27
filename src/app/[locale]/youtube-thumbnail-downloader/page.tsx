import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ToolPageLayout from '@/components/ToolPageLayout'
import YoutubeThumbnail from '@/components/tools/YoutubeThumbnail'

const SLUG = '/youtube-thumbnail-downloader'
const NS = 'YoutubeThumbnail'
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: NS })
  return pageMetadata({ locale, path: SLUG, title: t('metaTitle'), description: t('metaDescription') })
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ToolPageLayout category="UtilitiesApplication" locale={locale} namespace={NS} slug={SLUG} anchor="#youtube-url" tool={<YoutubeThumbnail />} />
}
