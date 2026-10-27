import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ToolPageLayout from '@/components/ToolPageLayout'
import Downloader from '@/components/Downloader'

const SLUG = '/twitter-video-downloader'
const NS = 'TwitterDownloader'
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
  return <ToolPageLayout locale={locale} namespace={NS} slug={SLUG} anchor="#twitter-url" tool={<Downloader platform="twitter" />} />
}
