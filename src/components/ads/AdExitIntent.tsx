'use client'

import { useEffect, useRef, useState } from 'react'
import AdUnit from './AdUnit'

const SESSION_KEY    = 'ad_exit_shown'
const CLOSE_UNLOCK_SEC = 4

export default function AdExitIntent() {
  const [open, setOpen] = useState(false)
  const [countdown, setCountdown] = useState(CLOSE_UNLOCK_SEC)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    function handleMouseLeave(e: MouseEvent) {
      // Only fire when cursor exits through the top (toward browser bar)
      if (e.clientY > 20 || triggeredRef.current) return
      triggeredRef.current = true
      sessionStorage.setItem(SESSION_KEY, '1')
      setOpen(true)

      intervalRef.current = setInterval(() => {
        setCountdown((n) => {
          if (n <= 1) { clearInterval(intervalRef.current!); return 0 }
          return n - 1
        })
      }, 1000)

      document.removeEventListener('mouseleave', handleMouseLeave)
    }

    // Small delay so it doesn't fire immediately on page load
    const setup = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 4000)

    return () => {
      clearTimeout(setup)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  function close() {
    if (countdown > 0) return
    setOpen(false)
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget && countdown === 0) close()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Before you go"
    >
      <div
        className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl w-full fade-up"
        style={{
          background: 'var(--surface-1)',
          border: '1px solid rgba(255,45,85,0.25)',
          maxWidth: 480,
          boxShadow: '0 0 60px rgba(255,45,85,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Wait — before you go!</p>
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>This tool is free thanks to our sponsors.</p>
          </div>

          <button
            onClick={close}
            disabled={countdown > 0}
            className="flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 transition-all flex-shrink-0"
            style={{
              background: 'var(--surface-2)',
              color: countdown > 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
              cursor: countdown > 0 ? 'not-allowed' : 'pointer',
            }}
            aria-label={countdown > 0 ? `Close in ${countdown}s` : 'Close'}
          >
            {countdown > 0 ? (
              <>
                <span
                  className="inline-flex items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ width: 18, height: 18, background: 'var(--brand-pink)', color: 'white' }}
                >
                  {countdown}
                </span>
                Skip
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

        {/* Progress bar */}
        <div style={{ height: 2, background: 'var(--surface-3)' }}>
          <div
            style={{
              height: '100%',
              background: 'var(--gradient-brand)',
              width: `${(countdown / CLOSE_UNLOCK_SEC) * 100}%`,
              transition: 'width 1s linear',
            }}
          />
        </div>

        {/* Ad */}
        <div className="p-4">
          <AdUnit
            slot="5555555555"
            format="rectangle"
            label="Exit intent 300×250"
            style={{ minHeight: 250 }}
            className="w-full"
          />
        </div>

        <div className="px-4 pb-3 flex items-center justify-center gap-2">
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            Ads keep this tool free
          </span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <button
            onClick={close}
            disabled={countdown > 0}
            className="text-[10px] underline transition-colors"
            style={{ color: countdown > 0 ? 'var(--text-muted)' : 'var(--brand-pink)', cursor: countdown > 0 ? 'not-allowed' : 'pointer' }}
          >
            {countdown > 0 ? `Continue in ${countdown}s` : 'Continue to site'}
          </button>
        </div>
      </div>
    </div>
  )
}
