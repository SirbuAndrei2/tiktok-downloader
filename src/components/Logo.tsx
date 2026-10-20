export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-[10px]"
      style={{ width: size, height: size, background: 'var(--lime)', boxShadow: '0 0 0 1px rgba(200,255,77,0.35), 0 8px 20px -10px rgba(200,255,77,0.7)' }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none" stroke="#0B0F03" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v11" />
        <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
        <path d="M5 20h14" />
      </svg>
    </span>
  )
}
