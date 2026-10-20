'use client'

import { useSyncExternalStore } from 'react'
import AdsterraBanner from '@/components/ads/AdsterraBanner'

/**
 * A fixed 160×600 (left) and 160×300 (right) banner left and right of the 1152px content column.
 * Mounted only on viewports ≥ 1536px (there is no room below that), so no
 * hidden impressions and no layout shift. Renders nothing until both Adsterra
 * zones exist in `AdsterraBanner`'s ZONES ('rail-left' / 'rail-right').
 */
const MQ = '(min-width: 1536px)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(MQ)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export default function SideRails() {
  const wide = useSyncExternalStore(subscribe, () => window.matchMedia(MQ).matches, () => false)
  if (!wide) return null
  const rail = 'pointer-events-auto fixed top-24 z-30 hidden 2xl:block'
  const offset = 'calc((100vw - 1152px) / 2 - 176px)'
  return (
    <>
      <div className={rail} style={{ left: offset }}>
        <AdsterraBanner size="rail-left" />
      </div>
      <div className={rail} style={{ right: offset }}>
        <AdsterraBanner size="rail-right" />
      </div>
    </>
  )
}
