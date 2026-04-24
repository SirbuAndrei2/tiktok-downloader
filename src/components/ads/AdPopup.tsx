'use client'

import { useEffect, useRef, useState } from 'react'
import AdUnit from './AdUnit'

const SESSION_KEY = 'ad_popup_shown'
const APPEAR_AFTER_MS  = 6000   // show popup after 6s
const CLOSE_UNLOCK_SEC = 5      // countdown before X is enabled

export default function AdPopup() {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(CLOSE_UNLOCK_SEC)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Don't show again in the same session
    if (sessionStorage.getItem(SESSION_KEY)) return

    const showTimer = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem(SESSION_KEY, '1')

      // Start countdown
      intervalRef.current = setInterval(() => {
        setCountdown((n) => {
          if (n <= 1) {
            clearInterval(intervalRef.current!)
            return 0
          }
          return n - 1
        })
      }, 1000)
    }, APPEAR_AFTER_MS)

    return () => {
      clearTimeout(showTimer)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  function close() {
    if (countdown > 0) return
    setOpen(false)
  }

  // Close on backdrop click only if countdown done
  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget && countdown === 0) close()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Advertisement"
    >
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl w-full max-w-md fade-up"
        style={{ background: 'var(--surface-1)', border: '1px solid var(--border)', maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Advertisement
          </span>

          {/* Close button — locked during countdown */}
          <button
            onClick={close}
            disabled={countdown > 0}
            className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 transition-all"
            style={{
              background: countdown > 0 ? 'var(--surface-3)' : 'var(--surface-2)',
              color: countdown > 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              cursor: countdown > 0 ? 'not-allowed' : 'pointer',
              opacity: countdown > 0 ? 0.7 : 1,
            }}
            aria-label={countdown > 0 ? `Close in ${countdown} seconds` : 'Close advertisement'}
          >
            {countdown > 0 ? (
              <>
                <span
                  className="inline-flex items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ width: 18, height: 18, background: 'var(--brand-pink)', color: 'white' }}
                >
                  {countdown}
                </span>
                Skip ad
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
                Close
              </>
            )}
          </button>
        </div>

        {/* Progress bar — shrinks over countdown */}
        <div style={{ height: 2, background: 'var(--surface-3)' }}>
          <div
            style={{
              height: '100%',
              background: 'var(--brand-pink)',
              width: `${(countdown / CLOSE_UNLOCK_SEC) * 100}%`,
              transition: 'width 1s linear',
            }}
          />
        </div>

        {/* Ad content */}
        <div className="p-4">
          <AdUnit
            slot="4444444444"
            format="rectangle"
            label="Popup 300×250"
            style={{ minHeight: 250 }}
            className="w-full"
          />
        </div>

        {/* Footer note */}
        <div className="px-4 pb-3 text-center">
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            Ads keep this tool free for everyone
          </span>
        </div>
      </div>
    </div>
  )
}
