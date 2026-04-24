import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import AdSidebar from '@/components/ads/AdSidebar'
import AdStickyBottom from '@/components/ads/AdStickyBottom'
import AdPopup from '@/components/ads/AdPopup'
import AdExitIntent from '@/components/ads/AdExitIntent'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist' })

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'TikTok Video Downloader — No Watermark, Free HD Download',
    template: '%s | TikTok Downloader',
  },
  description:
    'Download TikTok videos without watermark in HD quality — free, instant, no login required. Also save TikTok audio as MP3.',
  keywords: [
    'tiktok downloader', 'tiktok video downloader', 'download tiktok without watermark',
    'tiktok no watermark', 'tiktok to mp3', 'save tiktok video', 'tiktok hd download',
    'tiktok downloader online', 'download tiktok video free', 'tiktok video saver',
  ],
  authors: [{ name: 'TikTok Downloader' }],
  creator: 'TikTok Downloader',
  publisher: 'TikTok Downloader',
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
    siteName: 'TikTok Downloader',
    title: 'TikTok Video Downloader — No Watermark, Free HD',
    description: 'Download TikTok videos without watermark in HD quality. Free, instant, no login. Also extract audio as MP3.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'TikTok Downloader — No Watermark HD', type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Downloader — No Watermark, Free HD',
    description: 'Download TikTok videos without watermark in HD quality. Free, instant, no login.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  alternates: { canonical: BASE },
}

const jsonLdSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TikTok Downloader',
  url: BASE,
  description: 'Free online tool to download TikTok videos without watermark in HD quality.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/?url={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite) }} />

        {/* Monetag MultiTag - Replace ZONE_ID with your actual ID from Monetag */}
        {process.env.NODE_ENV === 'production' && (
          <script
            src="https://alwingulla.com/88/p.js?z=10919698"
            data-cfasync="false"
            async
          />
        )}

        {/* Google AdSense - Placeholder for later use */}
        {/*
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
        )}
        */}
      </head>
      <body className="min-h-screen bg-black antialiased">
        {children}

        {/* ── Global Ad Units ─────────────────────────────────── */}
        <AdSidebar />
        <AdStickyBottom />
        <AdPopup />
        <AdExitIntent />
        <Analytics />
      </body>
    </html>
  )
}
