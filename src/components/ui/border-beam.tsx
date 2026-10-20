import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * CSS-only border beam (replaces the motion-based Magic UI version so the
 * server never loads `motion`). A rotating conic gradient is masked to the
 * border ring of the parent, which must be `position: relative; overflow: hidden`
 * with a border-radius.
 */
interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  reverse?: boolean
}

export function BorderBeam({ className, duration = 8, delay = 0, borderWidth = 1.5, colorFrom = '#C8FF4D', colorTo = '#5EEAD4', reverse = false }: BorderBeamProps) {
  const style = {
    '--beam-w': `${borderWidth}px`,
    '--beam-from': colorFrom,
    '--beam-to': colorTo,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  } as CSSProperties
  return <span aria-hidden className={cn('border-beam pointer-events-none absolute inset-0 rounded-[inherit]', className)} style={style} />
}
