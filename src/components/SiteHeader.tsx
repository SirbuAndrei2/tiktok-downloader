import Link from 'next/link'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'

const LOCALES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'ar', label: 'AR', name: 'العربية' },
] as const

interface Props {
  locale: string
  localePath: string
  labels: { tools: string; guides: string; about: string; language: string }
  /** Current route without the locale prefix (e.g. "/tools"); the language switcher keeps the visitor on it. */
  path?: string
}

export default function SiteHeader({ locale, localePath, labels, path = '/' }: Props) {
  const nav = [
    { href: `${localePath}/tools`, label: labels.tools },
    { href: `${localePath}/guide`, label: labels.guides },
    { href: `${localePath}/about`, label: labels.about },
  ]
  return (
    <header className="site-header w-full">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5">
        <Link href={localePath || '/'} className="flex items-center gap-2.5 no-underline" aria-label="TokDown">
          <Logo />
          <span className="text-[1.05rem] font-semibold tracking-tight" style={{ color: 'var(--t1)' }}>TokDown</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white" style={{ color: 'var(--t3)' }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <nav aria-label={labels.language} className="flex items-center gap-0.5 rounded-full p-1" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}>
          {LOCALES.map((l) => {
            const active = l.code === locale
            return (
              <Link
                key={l.code}
                // Canonical URL of this page in that locale (English has no /en prefix,
                // which would 307-redirect), so the switcher never links to a redirect.
                href={l.code === 'en' ? path : `/${l.code}${path === '/' ? '' : path}`}
                lang={l.code}
                hrefLang={l.code}
                title={l.name}
                aria-current={active ? 'page' : undefined}
                className={cn('mono inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 text-xs font-medium transition-colors', active ? '' : 'hover:text-white')}
                style={active ? { color: 'var(--lime-fg)', background: 'var(--lime)' } : { color: 'var(--t3)' }}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
