'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Check, Copy, Download, ImageDown, Link2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SIZES = [
  { key: 'maxresdefault', w: 1280, h: 720 },
  { key: 'sddefault', w: 640, h: 480 },
  { key: 'hqdefault', w: 480, h: 360 },
  { key: 'mqdefault', w: 320, h: 180 },
  { key: 'default', w: 120, h: 90 },
] as const

/** Accepts watch, youtu.be, shorts, embed, live URLs or a bare 11-character id. */
export function parseYouTubeId(input: string): string | null {
  const s = input.trim()
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s
  try {
    const u = new URL(s.startsWith('http') ? s : `https://${s}`)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    if (host === 'youtu.be') return u.pathname.slice(1, 12) || null
    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const v = u.searchParams.get('v')
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v
      const m = /\/(?:shorts|embed|live|v)\/([A-Za-z0-9_-]{11})/.exec(u.pathname)
      if (m) return m[1]
    }
  } catch {
    /* not a URL */
  }
  return null
}

export default function YoutubeThumbnail() {
  const t = useTranslations('YoutubeThumbnail.tool')
  const [value, setValue] = useState('')
  const [id, setId] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [missing, setMissing] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = parseYouTubeId(value)
    setError(!parsed)
    setMissing({})
    setId(parsed)
  }

  async function copy(url: string, key: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* clipboard denied */
    }
  }

  const proxied = (url: string, name: string) => `/api/proxy?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(name)}&type=image`

  return (
    <div className="flex w-full flex-col gap-4">
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="youtube-url" className="sr-only">{t('placeholder')}</label>
        <div className="relative flex-1">
          <Link2 aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 rtl:left-auto rtl:right-4" style={{ color: 'var(--t4)' }} />
          <Input
            id="youtube-url"
            type="text"
            inputMode="url"
            enterKeyHint="go"
            required
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder={t('placeholder')}
            aria-invalid={error || undefined}
            className="h-14 rounded-2xl border pl-11 pr-12 text-base shadow-none focus-visible:border-[var(--lime)] focus-visible:ring-0 rtl:pl-12 rtl:pr-11 md:text-base"
            style={{ color: 'var(--t1)', borderColor: error ? 'var(--danger)' : 'var(--line-strong)', background: 'var(--bg)' }}
            autoComplete="off"
            spellCheck={false}
          />
          {value && (
            <button type="button" onClick={() => { setValue(''); setId(null); setError(false) }} className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-white/10 rtl:left-2 rtl:right-auto" style={{ color: 'var(--t3)' }} aria-label={t('clear')}>
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
        <Button type="submit" className="btn-brand h-14 rounded-2xl px-6 text-base sm:min-w-44">
          <ImageDown className="size-5" aria-hidden />
          {t('button')}
        </Button>
      </form>

      <div aria-live="polite" className="flex flex-col gap-3">
        {error && (
          <p role="alert" className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{t('invalid')}</p>
        )}
        {id && (
          <ul className="fade-up m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
            {SIZES.filter((s) => !missing[s.key]).map((s, i) => {
              const url = `https://i.ytimg.com/vi/${id}/${s.key}.jpg`
              return (
                <li key={s.key} className={`flex flex-col gap-3 overflow-hidden rounded-2xl ${i === 0 ? 'sm:col-span-2' : ''}`} style={{ border: '1px solid var(--line)', background: 'var(--surface-2)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote preview; size varies and may 404 (handled) */}
                  <img
                    src={url}
                    alt={`${t('previewAlt')} ${s.w}×${s.h}`}
                    width={s.w}
                    height={s.h}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="aspect-video w-full object-cover"
                    style={{ background: 'var(--surface-3)' }}
                    onLoad={(e) => {
                      // YouTube answers a 120×90 placeholder instead of 404 for missing maxres images.
                      if (s.key === 'maxresdefault' && e.currentTarget.naturalWidth <= 120) setMissing((m) => ({ ...m, [s.key]: true }))
                    }}
                    onError={() => setMissing((m) => ({ ...m, [s.key]: true }))}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-3">
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>{t(`sizes.${s.key}`)}</span>
                      <span className="mono text-[11px]" style={{ color: 'var(--t4)' }}>{s.w} × {s.h} · JPG</span>
                    </span>
                    <span className="flex gap-2">
                      <button type="button" onClick={() => copy(url, s.key)} className="btn-ghost inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs">
                        {copied === s.key ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                        {copied === s.key ? t('copied') : t('copy')}
                      </button>
                      <a href={proxied(url, `youtube-${id}-${s.w}x${s.h}.jpg`)} download className={`${i === 0 ? 'btn-brand' : 'btn-ghost'} inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs no-underline`}>
                        <Download className="size-4" aria-hidden />
                        {t('download')}
                      </a>
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
