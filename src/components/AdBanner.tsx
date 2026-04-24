'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal'
  className?: string
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
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
      // AdSense not loaded (dev mode)
    }
  }, [])

  // Show placeholder in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`flex items-center justify-center bg-gray-800 border border-dashed border-gray-600 text-gray-500 text-xs rounded-lg ${className}`}
        style={{ minHeight: 90 }}
      >
        Ad Placeholder — slot: {slot}
      </div>
    )
  }

  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  )
}
