'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CONSENT_KEY, grantAnalyticsConsent } from '@/components/GoogleAnalytics'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      setShow(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    grantAnalyticsConsent()
    setShow(false)
  }

  if (!show) return null

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
        <p className="leading-relaxed text-center sm:text-left font-medium">
          We use cookies and third-party advertising partners to show ads and analyze traffic.{' '}
          <Link href="/privacy" className="underline font-bold">
            Learn more in our Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={acceptCookies}
            className="btn-brand h-11 rounded-full px-5 text-sm"
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </div>
  )
}
