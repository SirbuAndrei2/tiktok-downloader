'use client'

import { useEffect, useRef } from 'react'

interface Props {
  slot?: string
  style?: React.CSSProperties
  className?: string
  label?: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

export default function AdUnit({ slot, style, className = '', format = 'auto' }: Props) {
  const ref = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      const adsbygoogle = window.adsbygoogle ?? []
      adsbygoogle.push({})
      pushed.current = true
    } catch {
      // AdSense script loading or dev mode
    }
  }, [])

  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 border border-dashed rounded-lg text-[10px] font-mono ${className}`}
        style={{
          background: 'rgba(255,45,85,0.04)',
          borderColor: 'rgba(255,45,85,0.2)',
          color: 'rgba(255,45,85,0.5)',
          minHeight: 90,
          ...style,
        }}
      >
        <span>Google AdSense Unit</span>
        {slot && <span style={{ color: 'rgba(255,255,255,0.2)' }}>Slot: {slot}</span>}
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: 90, ...style }}
        data-ad-client="ca-pub-9408608842276737"
        {...(slot ? { 'data-ad-slot': slot } : {})}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
