'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Lightweight scroll/mount reveal. Same call sites as Magic UI's BlurFade, but
 * CSS-only: no `motion` on the server (SSR CPU on Workers) and no extra client
 * bundle. Respects prefers-reduced-motion via the global CSS rule.
 */
interface BlurFadeProps {
  children: ReactNode
  className?: string
  /** seconds */
  delay?: number
  /** seconds */
  duration?: number
  /** Reveal when scrolled into view instead of on mount. */
  inView?: boolean
  inViewMargin?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
  blur?: string
}

export function BlurFade({ children, className, delay = 0, duration = 0.4, inView = false, inViewMargin = '-50px', direction = 'down', offset = 6, blur = '6px' }: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(!inView)

  useEffect(() => {
    if (!inView || shown) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: inViewMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, inViewMargin, shown])

  const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y'
  const sign = direction === 'right' || direction === 'down' ? -1 : 1
  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    filter: shown ? 'blur(0px)' : `blur(${blur})`,
    transform: shown ? 'none' : `translate${axis}(${sign * offset}px)`,
    transition: `opacity ${duration}s ease-out ${delay}s, filter ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    willChange: shown ? undefined : 'opacity, transform, filter',
  }
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
