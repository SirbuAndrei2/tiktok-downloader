'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('tokdown_cookie_consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('tokdown_cookie_consent', 'accepted')
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 transition-all duration-300"
      style={{
        background: 'rgba(15, 15, 20, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p className="text-gray-300 leading-relaxed text-center sm:text-left">
          We use cookies and Google AdSense to personalize content, ads, and analyze traffic in compliance with Google&apos;s Privacy &amp; Consent policies.{' '}
          <Link href="/privacy" className="underline text-pink-400 hover:text-pink-300">
            Learn more in our Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={acceptCookies}
            className="px-5 py-2 rounded-full font-semibold text-white transition-all transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)',
              boxShadow: '0 0 12px rgba(255, 45, 85, 0.4)',
            }}
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </div>
  )
}
