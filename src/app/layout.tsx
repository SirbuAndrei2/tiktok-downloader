import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
// import AdSidebar from '@/components/ads/AdSidebar'
// import AdStickyBottom from '@/components/ads/AdStickyBottom'
import AdExitIntent from '@/components/ads/AdExitIntent'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist' })

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
    'tiktok no watermark', 'tiktok to mp3', 'save tiktok video', 'tiktok hd download',
    'tiktok downloader online', 'download tiktok video free', 'tiktok video saver',
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
  alternates: { canonical: BASE },
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
    availableLanguage: 'English',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />

        {/* Monetag MultiTag */}
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

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9408608842276737"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-black antialiased">
        {children}

        {/* ── Global Ad Units ─────────────────────────────────── */}
        {/* <AdSidebar /> */}
        {/* <AdStickyBottom /> */}
        {/* <AdExitIntent /> */}
        <Analytics />
      </body>
    </html>
  )
}
