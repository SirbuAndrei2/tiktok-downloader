'use client'

const IS_DEV = process.env.NODE_ENV === 'development'

interface Props {
  monetagZoneId: string
  style?: React.CSSProperties
  className?: string
  label?: string
}

export default function AdUnit({ monetagZoneId, style, className = '', label }: Props) {
  if (IS_DEV) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 border border-dashed rounded-lg text-[10px] font-mono ${className}`}
        style={{ background: 'rgba(255,45,85,0.04)', borderColor: 'rgba(255,45,85,0.2)', color: 'rgba(255,45,85,0.5)', minHeight: 60, ...style }}
      >
        <span>AD</span>
        {label && <span style={{ color: 'rgba(255,255,255,0.2)' }}>{label}</span>}
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>Monetag Zone: {monetagZoneId}</span>
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      <div id={`m-${monetagZoneId}`} />
    </div>
  )
}
