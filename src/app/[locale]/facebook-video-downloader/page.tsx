import type { Metadata } from 'next'
import { OG_IMAGE } from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ToolPageLayout from '@/components/ToolPageLayout'
import Downloader from '@/components/Downloader'

const BASE = 'https://tokdown.org'
const SLUG = '/facebook-video-downloader'
const NS = 'FacebookDownloader'
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: NS })
  const localePath = locale === 'en' ? '' : `/${locale}`
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${BASE}${localePath}${SLUG}`, languages: { 'en': `${BASE}${SLUG}`, 'de': `${BASE}/de${SLUG}`, 'ar': `${BASE}/ar${SLUG}`, 'x-default': `${BASE}${SLUG}` } },
    openGraph: { images: [OG_IMAGE], title: t('metaTitle'), description: t('metaDescription'), url: `${BASE}${localePath}${SLUG}` },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ToolPageLayout locale={locale} namespace={NS} slug={SLUG} anchor="#facebook-url" tool={<Downloader platform="facebook" />} />
}
