import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import CloudflareAnalytics from '@/components/CloudflareAnalytics'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import '../globals.css'
import { BASE, HTML_LANG, OG_IMAGE, RTL_LOCALES } from '@/lib/seo'
import { siteGraph } from '@/lib/schema'
import JsonLd from '@/components/JsonLd'

import CookieConsent from '@/components/CookieConsent'
import SideRails from '@/components/ads/SideRails'
import AdsterraTags from '@/components/ads/AdsterraTags'
import AdsterraPopunder from '@/components/ads/AdsterraPopunder'


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = { themeColor: '#09090B' }

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'TokDown — Download TikTok Videos Without Watermark, Free & HD',
    template: '%s | TokDown',
  },
  description:
    'The simplest TikTok downloader: save any video without watermark in HD, extract audio as MP3, works on iPhone, Android and PC. Free, instant, no account needed.',
  keywords: [
    'tiktok downloader', 'tiktok video downloader', 'download tiktok without watermark',
    'tiktok no watermark', 'tiktok to mp3', 'tiktok to mp4', 'save tiktok video',
    'tiktok hd download', 'tiktok downloader online', 'download tiktok video free',
    'tiktok video saver', 'download tiktok on iphone', 'download tiktok on android',
    'save tiktok to camera roll', 'tiktok downloader no watermark', 'snaptik alternative',
    'ssstiktok alternative', 'free tiktok downloader', 'tiktok mp4 download',
  ],
  authors: [{ name: 'TokDown Team', url: `${BASE}/about` }],
  creator: 'TokDown',
  publisher: 'TokDown',
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE,
    siteName: 'TokDown',
    images: [OG_IMAGE],
    title: 'TokDown — Download TikTok Videos Without Watermark, Free & HD',
    description: 'The simplest TikTok downloader: no watermark, HD quality, MP3 audio. Free, instant, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE.url],
    title: 'TokDown — Download TikTok Without Watermark, Free & HD',
    description: 'Save any TikTok video without watermark in HD, or extract audio as MP3. Free, instant, works on any device.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '1024x1024' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  // No layout-level canonical/hreflang: every page sets its own via pageMetadata(),
  // so a page that forgets cannot silently inherit the home canonical.
  verification: { google: 'xnV1VhvvNYeWQ0Z4MLJ-EXoqJnNYQ1lssV64wTaiti0' },
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }
  // Enables static rendering for every locale (see generateStaticParams).
  setRequestLocale(locale)

  const messages = await getMessages()

  const dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr'

  return (
    <html lang={HTML_LANG[locale] ?? locale} dir={dir} className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <JsonLd data={siteGraph()} />

        {/* Adsterra Social Bar */}
        <AdsterraTags />
      </head>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
          <AdsterraPopunder />
          <SideRails />
        </NextIntlClientProvider>
        <CloudflareAnalytics />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
