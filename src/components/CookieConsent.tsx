'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CONSENT_KEY, grantAnalyticsConsent } from '@/components/GoogleAnalytics'

// localStorage has no change events we care about here: read it once on the
// client, render nothing on the server (no hydration mismatch, no setState in an effect).
const noopSubscribe = () => () => {}
const needsConsentSnapshot = () => {
  try {
    return !localStorage.getItem(CONSENT_KEY)
  } catch {
    return false
  }
}

export default function CookieConsent() {
  const t = useTranslations('Cookie')
  const needsConsent = useSyncExternalStore(noopSubscribe, needsConsentSnapshot, () => false)
  const [dismissed, setDismissed] = useState(false)

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    grantAnalyticsConsent()
    setDismissed(true)
  }

  if (!needsConsent || dismissed) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 transition-all duration-300"
      style={{
        background: 'rgba(19,19,22,0.96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--line-strong)',
        color: 'var(--t2)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="leading-relaxed text-center sm:text-start font-medium">
          {t('text')}{' '}
          <Link href="/privacy" className="underline font-bold">
            {t('link')}
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={acceptCookies}
            className="btn-brand h-11 rounded-full px-5 text-sm"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
