import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'

const geist = GeistSans

const BASE = 'https://tokdown.org'

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
    title: 'TokDown — Download TikTok Videos Without Watermark, Free & HD',
    description: 'The simplest TikTok downloader: no watermark, HD quality, MP3 audio. Free, instant, no account needed.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tokdownorg',
    title: 'TokDown — Download TikTok Without Watermark, Free & HD',
    description: 'Save any TikTok video without watermark in HD, or extract audio as MP3. Free, instant, works on any device.',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: BASE,
    languages: {
      'en': BASE,
      'de': `${BASE}/de`,
      'ar': `${BASE}/ar`,
    },
  },
  verification: { google: 'xnV1VhvvNYeWQ0Z4MLJ-EXoqJnNYQ1lssV64wTaiti0' },
}

const jsonLdSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TokDown',
  alternateName: 'TikTok Downloader',
  url: BASE,
  description: 'Free online TikTok downloader — save videos without watermark in HD or extract audio as MP3. Works on iPhone, Android, PC and Mac.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?url={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TokDown',
  alternateName: 'TikTok Downloader',
  url: BASE,
  logo: `${BASE}/icon.png`,
  sameAs: [
    'https://twitter.com/tokdownorg',
    'https://www.reddit.com/r/tokdown',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@tokdown.org',
    availableLanguage: ['English', 'German', 'Arabic'],
  },
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

  const messages = await getMessages()

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} className={geist.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />

        {/* Monetag MultiTag zone 233102 */}
        {process.env.NODE_ENV === 'production' && (
          <script
            src="https://quge5.com/88/tag.min.js"
            data-zone="233102"
            data-cfasync="false"
            async
          />
        )}

        {/* Monetag Vignette */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(s){s.dataset.zone='10919813',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
            }}
          />
        )}

      </head>
      <body className="min-h-screen bg-black antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
