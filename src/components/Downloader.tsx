'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { AlertCircle, ClipboardPaste, Download, Link2, LoaderCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import VideoResult, { type VideoData } from './VideoResult'
import AdsterraBanner from '@/components/ads/AdsterraBanner'

/** `photo` tunes the copy for the slideshow downloader page; the API and result card are shared. */
type Variant = 'video' | 'photo'
/** Which network the page is about — only changes copy and the input id; the API detects the platform from the URL. */
type Platform = 'tiktok' | 'facebook' | 'twitter'

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: VideoData }
  | { status: 'error'; message: string }

const subscribeNoop = () => () => {}
const getCanPaste = () => typeof navigator.clipboard?.readText === 'function'

export default function Downloader({ variant = 'video', platform = 'tiktok' }: { variant?: Variant; platform?: Platform }) {
  const t = useTranslations('Downloader')
  const v = (key: string) => (platform !== 'tiktok' ? t(`platforms.${platform}.${key}`) : variant === 'photo' ? t(`photo.${key}`) : t(key))
  const inputId = platform === 'tiktok' ? 'tiktok-url' : `${platform}-url`
  const [url, setUrl] = useState('')
  const [state, setState] = useState<State>({ status: 'idle' })
  const inputRef = useRef<HTMLInputElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Clipboard read is not available everywhere (Firefox, insecure contexts) — only offer it when it is.
  // Server snapshot is `false` so SSR and the first client render match.
  const canPaste = useSyncExternalStore(subscribeNoop, getCanPaste, () => false)

  // Bring the result into view on small screens without fighting reduced-motion users.
  useEffect(() => {
    if (state.status !== 'success' || !resultRef.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resultRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' })
  }, [state.status])

  async function handlePaste() {
    try {
      const text = (await navigator.clipboard.readText()).trim()
      if (text) setUrl(text)
      inputRef.current?.focus()
    } catch {
      /* clipboard permission denied */
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await submit(url)
  }

  async function submit(raw: string, fillInput = false) {
    const trimmed = raw.trim()
    if (!trimmed) {
      inputRef.current?.focus()
      return
    }
    if (fillInput) setUrl(trimmed)
    setState({ status: 'loading' })
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })
      const json = await res.json()
      if (!res.ok) {
        setState({ status: 'error', message: json.error ?? t('errorNetwork') })
        return
      }
      setState({ status: 'success', data: json })
      // Lets lazily-loaded ad scripts (PopunderLoader) know the visitor got what they came for.
      window.dispatchEvent(new CustomEvent('tokdown:result'))
    } catch {
      setState({ status: 'error', message: t('errorNetwork') })
    }
  }

  // Android share target (manifest.json) and the WebSite SearchAction land here with ?url= or ?text=.
  // Runs once on mount; the work is deferred a tick so no state is set synchronously inside the effect.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const shared = params.get('url') || params.get('text') || params.get('title') || ''
    const match = /https?:\/\/\S+/.exec(shared)
    if (!match) return
    const link = match[0]
    window.history.replaceState(null, '', window.location.pathname)
    const id = window.setTimeout(() => { void submit(link, true) }, 0)
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  function reset() {
    setUrl('')
    setState({ status: 'idle' })
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const isLoading = state.status === 'loading'

  return (
    <div className="flex w-full flex-col gap-4">
      {/* ── Input ─────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row" aria-busy={isLoading}>
        <label htmlFor={inputId} className="sr-only">{v('placeholder')}</label>

        <div className="relative flex-1">
          <Link2 aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 rtl:left-auto rtl:right-4" style={{ color: 'var(--t4)' }} />
          <Input
            ref={inputRef}
            id={inputId}
            name="url"
            type="url"
            inputMode="url"
            enterKeyHint="go"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={v('placeholder')}
            className="h-14 rounded-2xl border pl-11 pr-24 text-base shadow-none focus-visible:border-[var(--lime)] focus-visible:ring-0 rtl:pl-24 rtl:pr-11 md:text-base"
            style={{ color: 'var(--t1)', borderColor: 'var(--line-strong)', background: 'var(--bg)' }}
            disabled={isLoading}
            autoComplete="off"
            spellCheck={false}
          />

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center rtl:left-2 rtl:right-auto">
            {url ? (
              <button
                type="button"
                onClick={() => { setUrl(''); inputRef.current?.focus() }}
                className="inline-flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                style={{ color: 'var(--t3)' }}
                aria-label={t('clear')}
              >
                <X className="size-4" aria-hidden />
              </button>
            ) : canPaste ? (
              <button
                type="button"
                onClick={handlePaste}
                disabled={isLoading}
                className="btn-ghost inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold"
              >
                <ClipboardPaste className="size-4" aria-hidden />
                {t('paste')}
              </button>
            ) : null}
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="btn-brand h-14 rounded-2xl px-6 text-base sm:min-w-44">
          {isLoading ? (
            <>
              <LoaderCircle className="spin size-5" aria-hidden />
              {v('fetching')}
            </>
          ) : (
            <>
              <Download className="size-5" aria-hidden />
              {v('download')}
            </>
          )}
        </Button>
      </form>

      {/* ── Status region ─────────────────────────────────────── */}
      <div aria-live="polite" className="flex flex-col gap-4">
        {isLoading && (
          <div className="cut-card fade-up flex gap-4 p-4">
            <div className="shimmer shrink-0" style={{ width: 96, height: 128, borderRadius: 12 }} />
            <div className="flex flex-1 flex-col gap-3 pt-1">
              <div className="shimmer h-3 w-1/3" />
              <div className="shimmer h-3 w-3/4" />
              <div className="shimmer h-3 w-2/3" />
              <div className="shimmer mt-auto h-10 w-full" />
            </div>
          </div>
        )}

        {state.status === 'error' && (
          <div role="alert" className="cut-card cut-card--pink fade-up flex items-start gap-3 p-4">
            <AlertCircle className="mt-0.5 size-5 shrink-0" style={{ color: 'var(--destructive)' }} aria-hidden />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-sm font-medium" style={{ color: 'var(--t1)' }}>{state.message}</p>
              <button onClick={reset} className="btn-ghost inline-flex h-10 w-fit items-center rounded-lg px-3 text-xs font-semibold">
                {t('tryAgain')}
              </button>
            </div>
          </div>
        )}

        {state.status === 'success' && (
          <div ref={resultRef} className="fade-up flex flex-col gap-4 scroll-mt-20">
            <VideoResult data={state.data} />
            <AdsterraBanner size="300x250" lazy={false} />
            <button onClick={reset} className="btn-ghost inline-flex h-12 items-center justify-center rounded-full px-5 text-sm">
              {v('downloadAnother')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
