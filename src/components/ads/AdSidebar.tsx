'use client'

import { useEffect, useState } from 'react'
import AdUnit from './AdUnit'

export default function AdSidebar() {
  const [visible, setVisible] = useState(false)

  // Only show after page is hydrated and scrolled slightly
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Left sidebar */}
      <aside
        className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col gap-4 z-30"
        aria-label="Advertisement"
        style={{ width: 160 }}
      >
        <div className="flex flex-col gap-2">
          <span className="text-center text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Advertisement
          </span>
          <AdUnit
            slot="1111111111"
            format="auto"
            label="Left sidebar"
            style={{ minHeight: 600, width: 160 }}
          />
        </div>
      </aside>

      {/* Right sidebar */}
      <aside
        className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col gap-4 z-30"
        aria-label="Advertisement"
        style={{ width: 160 }}
      >
        <div className="flex flex-col gap-2">
          <span className="text-center text-[9px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Advertisement
          </span>
          <AdUnit
            slot="2222222222"
            format="auto"
            label="Right sidebar"
            style={{ minHeight: 600, width: 160 }}
          />
        </div>
      </aside>
    </>
  )
}
