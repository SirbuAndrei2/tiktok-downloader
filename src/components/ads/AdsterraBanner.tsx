'use client'

import { useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'

/**
 * Adsterra iframe banners. Their invoke script relies on `document.write`,
 * which cannot run inside a React tree, so each unit is rendered in its own
 * same-origin iframe via `srcDoc`. Reserved width/height = no layout shift.
 */
const ZONES = {
  '300x250': { key: '292be403728778f916725fa9010d1658', w: 300, h: 250 },
  '728x90': { key: '5c958d39a4052c107d90bf30e0fc7b3c', w: 728, h: 90 },
  '468x60': { key: '22739f48706138d2080cd5b594f3d03c', w: 468, h: 60 },
  '320x50': { key: 'cd476f2cece411ea37c324d4a21e4fb0', w: 320, h: 50 },
  // Side rails (SideRails.tsx): one zone per side.
  'rail-left': { key: 'ea09f0f7cedceda0fa119e3b19726d95', w: 160, h: 600 },
  'rail-right': { key: '41a06f0ccb408d91bae3418048d08c39', w: 160, h: 300 },
} as const
type Size = keyof typeof ZONES

const MQ = '(min-width: 768px)'
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(MQ)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
const isWide = () => window.matchMedia(MQ).matches

function srcDoc(key: string, w: number, h: number) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body><script>atOptions={key:'${key}',format:'iframe',height:${h},width:${w},params:{}}<\/script><script src="https://bauval.org/22/${key}"><\/script></body></html>`
}

interface Props {
  /**
   * Fixed size, `responsive` = 728×90 on ≥768px and 300×250 below, or `inline` = 468×60 on ≥768px
   * and 320×50 below. Only one unit is ever mounted.
   */
  size?: Size | 'responsive' | 'inline'
  /** Mount only on phones (<768px) or only on larger screens. Nothing is rendered server-side for these, so no hidden impressions. */
  only?: 'mobile' | 'desktop'
  className?: string
  lazy?: boolean
}

type Viewport = 'mobile' | 'desktop' | 'unknown'
const getViewport = (): Viewport => (isWide() ? 'desktop' : 'mobile')

export default function AdsterraBanner({ size = '300x250', only, className = '', lazy = true }: Props) {
  const t = useTranslations('Common')
  const viewport = useSyncExternalStore(subscribe, getViewport, (): Viewport => 'unknown')
  const wide = viewport === 'desktop'
  const resolved: Size = size === 'responsive' ? (wide ? '728x90' : '300x250') : size === 'inline' ? (wide ? '468x60' : '320x50') : size
  const { key, w, h } = ZONES[resolved]
  // `inline` reserves the taller of its two sizes so the slot never shifts, and waits for the viewport before requesting an ad.
  const reserve = size === 'inline' ? 60 : h
  const pending = size === 'inline' && viewport === 'unknown'
  const dev = process.env.NODE_ENV === 'development'
  if (!key) return null
  if (only && viewport !== only) return null

  return (
    <aside className={`ad-slot mx-auto w-full max-w-full ${className}`} style={{ maxWidth: Math.max(w, 300) + 2 }} aria-label={t('adLabel')}>
      <span className="ad-slot-label" aria-hidden>{t('adLabel')}</span>
      <div className="flex items-center justify-center p-2" style={{ minHeight: reserve + 16 }}>
        {pending ? null : dev ? (
          <span className="mono text-[10px]" style={{ color: 'var(--t4)' }}>Adsterra banner · {resolved}</span>
        ) : (
          <iframe
            key={key}
            title={t('adLabel')}
            srcDoc={srcDoc(key, w, h)}
            width={w}
            height={h}
            scrolling="no"
            loading={lazy ? 'lazy' : 'eager'}
            style={{ border: 0, display: 'block', maxWidth: '100%' }}
          />
        )}
      </div>
    </aside>
  )
}
