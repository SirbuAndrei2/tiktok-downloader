'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

/** Adsterra Native Banner zone. One instance per page (the container id must be unique). */
const ZONE = '825245e0a39307c41c2eb067c1cb8b0a'
const INVOKE_SRC = `https://bauval.org/21/${ZONE}`

interface Props {
  className?: string
  /** Reserved height so the unit never shifts the layout while it loads (CLS). */
  minHeight?: number
}

export default function AdsterraNative({ className = '', minHeight = 280 }: Props) {
  const t = useTranslations('Common')
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el || process.env.NODE_ENV === 'development') return
    // Adsterra's invoke script looks for #container-<zone> when it runs, so it is
    // injected after the container exists and re-injected on client navigation.
    const s = document.createElement('script')
    s.async = true
    s.setAttribute('data-cfasync', 'false')
    s.src = INVOKE_SRC
    el.appendChild(s)
    return () => {
      s.remove()
    }
  }, [])

  return (
    <aside className={`ad-slot w-full max-w-full ${className}`} aria-label={t('adLabel')}>
      <span className="ad-slot-label" aria-hidden>{t('adLabel')}</span>
      <div ref={host} style={{ minHeight }} className="flex items-center justify-center">
        {process.env.NODE_ENV === 'development' ? (
          <span className="mono text-[10px]" style={{ color: 'var(--t4)' }}>Adsterra native · {ZONE.slice(0, 8)}</span>
        ) : (
          <div id={`container-${ZONE}`} className="w-full" />
        )}
      </div>
    </aside>
  )
}
