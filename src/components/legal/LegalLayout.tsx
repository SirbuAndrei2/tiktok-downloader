import Link from 'next/link'

interface Section {
  title: string
  content: React.ReactNode
}

interface Props {
  title: string
  subtitle: string
  lastUpdated: string
  sections: Section[]
}

export default function LegalLayout({ title, subtitle, lastUpdated, sections }: Props) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

        {/* Back link */}
        <div className="w-full max-w-2xl mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to downloader
          </Link>
        </div>

        {/* Header */}
        <div className="w-full max-w-2xl mb-10 text-center">
          <h1 className="text-3xl font-black mb-2">{title}</h1>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
          <span
            className="inline-block text-xs px-3 py-1 rounded-full"
            style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            Last updated: {lastUpdated}
          </span>
        </div>

        {/* Content */}
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {sections.map(({ title: st, content }) => (
            <div key={st} className="faq-item">
              <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--brand-pink)' }}>
                {st}
              </h2>
              <div className="text-xs leading-relaxed space-y-2" style={{ color: 'var(--text-secondary)' }}>
                {content}
              </div>
            </div>
          ))}
        </div>

        {/* Legal nav */}
        <nav className="w-full max-w-2xl mt-12 pt-6 flex flex-wrap gap-4 justify-center"
          style={{ borderTop: '1px solid var(--border)' }}>
          {[
            { href: '/privacy',    label: 'Privacy Policy' },
            { href: '/terms',      label: 'Terms of Service' },
            { href: '/dmca',       label: 'DMCA' },
            { href: '/disclaimer', label: 'Disclaimer' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs transition-colors hover:underline"
              style={{ color: 'var(--text-muted)' }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </main>

      <footer
        className="relative z-10 border-t text-center py-6 px-4"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
      >
        <p className="text-xs">© {new Date().getFullYear()} TikTok Downloader. Not affiliated with TikTok or ByteDance.</p>
      </footer>
    </div>
  )
}
