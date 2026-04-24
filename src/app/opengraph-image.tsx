import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: '#12122a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: -100, left: '50%',
          transform: 'translateX(-50%)',
          width: 800, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,45,85,0.25) 0%, transparent 70%)',
        }} />

        {/* Logo */}
        <div style={{
          width: 100, height: 100,
          borderRadius: 28,
          background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          boxShadow: '0 0 60px rgba(255,45,85,0.6)',
        }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.18 8.18 0 004.78 1.54V7.11a4.85 4.85 0 01-1.01-.42z"/>
          </svg>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 72,
          fontWeight: 900,
          letterSpacing: '-2px',
          lineHeight: 1.05,
          textAlign: 'center',
          marginBottom: 20,
          display: 'flex',
          gap: 16,
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #ff2d55 0%, #c084fc 50%, #00e5ff 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}>TikTok</span>
          <span style={{ color: '#ffffff' }}>Downloader</span>
        </div>

        {/* Subtitle */}
        <p style={{
          fontSize: 28,
          color: '#b0b0d8',
          textAlign: 'center',
          marginBottom: 40,
          maxWidth: 700,
        }}>
          Download videos <strong style={{ color: '#ffffff' }}>without watermark</strong> in HD — Free &amp; Instant
        </p>

        {/* Pills */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['✓ No Watermark', '✓ HD Quality', '✓ MP3 Audio', '✓ Free'].map((t) => (
            <div key={t} style={{
              background: 'rgba(255,45,85,0.15)',
              border: '1px solid rgba(255,45,85,0.4)',
              borderRadius: 999,
              padding: '10px 22px',
              fontSize: 18,
              color: '#ff99b0',
              fontWeight: 600,
            }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
