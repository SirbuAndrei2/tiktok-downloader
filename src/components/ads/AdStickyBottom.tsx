'use client'

import { useEffect, useState } from 'react'
import AdUnit from './AdUnit'

export default function AdStickyBottom() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show sticky after 3s so it doesn't block immediate interaction
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!visible || dismissed) return null

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 flex flex-col items-center"
      style={{ background: 'rgba(10,10,15,0.95)', borderTop: '1px solid var(--border)', backdropFilter: 'blur(12px)' }}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Label + close row */}
      <div className="flex items-center justify-between w-full max-w-3xl px-3 pt-1.5">
        <span className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          Advertisement
        </span>
        <button
          onClick={() => setDismissed(true)}
          className="flex items-center gap-1 text-[10px] rounded-full px-2 py-0.5 transition-colors"
          style={{ color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          aria-label="Close advertisement"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          Close
        </button>
      </div>

      {/* Ad unit */}
      <div className="w-full max-w-3xl px-2 pb-2">
        <AdUnit
          slot="3333333333"
          format="horizontal"
          label="Sticky bottom 728×90"
          style={{ minHeight: 60 }}
          className="w-full"
        />
      </div>
    </div>
  )
}
