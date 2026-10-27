import Link from 'next/link'
import Logo from '@/components/Logo'

type LinkItem = { href: string; label: string }

interface Props {
  tagline: string
  copyright: string
  feedback: string
  columns: { heading: string; links: LinkItem[] }[]
  /** Adsterra smart link, labelled "Sponsored". Off on the ad-free legal pages. */
  sponsored?: boolean
}

const SMART_LINK = 'https://araplhn.org/4/94149869a124fba970663a0e963f16ad'

export default function SiteFooter({ tagline, copyright, feedback, columns, sponsored = true }: Props) {
  return (
    <footer className="relative z-10 w-full" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold tracking-tight">TokDown</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{tagline}</p>
          <p className="mt-4 text-sm" style={{ color: 'var(--t3)' }}>
            {feedback} <a href="mailto:support@tokdown.org" className="link-ink">support@tokdown.org</a>
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="md:col-span-2">
            <h4 className="eyebrow mb-4">{col.heading}</h4>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--t2)' }}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--line)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
          <p className="mono m-0 text-xs" style={{ color: 'var(--t4)' }}>{copyright}</p>
          {sponsored && (
            <a href={SMART_LINK} target="_blank" rel="sponsored nofollow noopener" className="mono text-xs transition-colors hover:text-white" style={{ color: 'var(--t4)' }}>Sponsored</a>
          )}
        </div>
      </div>
    </footer>
  )
}
