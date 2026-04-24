'use client'

import { useEffect, useRef } from 'react'

const PUB_ID = 'ca-pub-XXXXXXXXXXXXXXXX' // Replace with your AdSense ID
const IS_DEV = process.env.NODE_ENV === 'development'

interface Props {
  slot?: string          // For AdSense
  monetagZoneId?: string // For Monetag Banners
  format?: string
  style?: React.CSSProperties
  className?: string
  label?: string
}

export default function AdUnit({ slot, monetagZoneId, format = 'auto', style, className = '', label }: Props) {
  const ref = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current || !slot) return
    try {
      // @ts-expect-error global injected by AdSense
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch {
      // AdSense script not yet loaded
    }
  }, [slot])

  if (IS_DEV) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 border border-dashed rounded-lg text-[10px] font-mono ${className}`}
        style={{ background: 'rgba(255,45,85,0.04)', borderColor: 'rgba(255,45,85,0.2)', color: 'rgba(255,45,85,0.5)', minHeight: 60, ...style }}
      >
        <span>AD</span>
        {label && <span style={{ color: 'rgba(255,255,255,0.2)' }}>{label}</span>}
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>
          {monetagZoneId ? `Monetag Zone: ${monetagZoneId}` : `AdSense Slot: ${slot}`}
        </span>
      </div>
    )
  }

  // If Monetag Zone ID is provided, use Monetag logic
  if (monetagZoneId) {
    return (
      <div className={className} style={style}>
        <div id={`m-${monetagZoneId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (window.adsbygoogle = window.adsbygoogle || []).push({
                params: {
                  z: ${monetagZoneId}
                }
              });
            `,
          }}
        />
      </div>
    )
  }

  // Otherwise fallback to AdSense
  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client={PUB_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
