import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { buildFooterColumns } from '@/lib/nav'

/**
 * Document shell for the root-level legal pages (/privacy, /terms, /dmca,
 * /disclaimer). They sit outside [locale] and are English-only, so this layout
 * mirrors the locale layout with the English strings.
 */
export const viewport: Viewport = { themeColor: '#09090B' }

export const metadata: Metadata = {
  metadataBase: new URL('https://tokdown.org'),
  title: { default: 'TokDown', template: '%s | TokDown' },
  robots: { index: true, follow: true },
}

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale('en')
  const tNav = await getTranslations({ locale: 'en', namespace: 'Nav' })
  const tFooter = await getTranslations({ locale: 'en', namespace: 'Footer' })
  const tTools = await getTranslations({ locale: 'en', namespace: 'Tools' })
  const tCommon = await getTranslations({ locale: 'en', namespace: 'Common' })
  // Client components in the shared header (locale-aware Link) need the intl context.
  const messages = await getMessages({ locale: 'en' })
  return (
    <html lang="en" dir="ltr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider locale="en" messages={messages}>
        <div className="relative flex min-h-screen w-full flex-col">
          <SiteHeader locale="en" localePath="" labels={{ tools: tNav('tools'), guides: tNav('guides'), about: tNav('about'), language: tCommon('language') }} />
          <main className="relative z-10 flex w-full flex-1 flex-col items-center">{children}</main>
          <SiteFooter
            sponsored={false}
            tagline={tFooter('tagline')}
            copyright={tFooter('notAffiliated', { year: new Date().getFullYear() })}
            feedback={tFooter('feedback')}
            columns={buildFooterColumns('', tNav, tFooter, tTools)}
          />
        </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
