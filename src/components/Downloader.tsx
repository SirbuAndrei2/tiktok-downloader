'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import VideoResult from './VideoResult'
import AdUnit from './ads/AdUnit'

interface VideoData {
  id: string
  title: string
  cover: string
  play: string
  hdplay: string
  music: string
  musicTitle: string
  author: { nickname: string; avatar: string; uniqueId: string }
  stats: { plays: number; likes: number; comments: number; shares: number }
}

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: VideoData }
  | { status: 'error'; message: string }

export default function Downloader() {
  const [url, setUrl] = useState('')
  const [state, setState] = useState<State>({ status: 'idle' })
  const inputRef = useRef<HTMLInputElement>(null)

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text.trim())
      inputRef.current?.focus()
    } catch { /* clipboard denied */ }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return
    setState({ status: 'loading' })
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      })
      const json = await res.json()
      if (!res.ok) { setState({ status: 'error', message: json.error ?? 'Something went wrong.' }); return }
      setState({ status: 'success', data: json })
    } catch {
      setState({ status: 'error', message: 'Network error. Please try again.' })
    }
  }

  function reset() {
    setUrl('')
    setState({ status: 'idle' })
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const isLoading = state.status === 'loading'

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top ad */}
      <AdUnit slot="1234567890" format="horizontal" label="Top inline 728×90" style={{ minHeight: 90 }} className="w-full rounded-xl overflow-hidden" />

      {/* Input card */}
      <Card className="p-5 flex flex-col gap-4 glass border-0 shadow-none">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* URL row */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              {/* Link icon */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'oklch(0.45 0.015 265)' }}>
                <LinkIcon />
              </span>
              <Input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.tiktok.com/@user/video/..."
                className="pl-9 pr-9 h-11 text-sm glow-border"
                style={{ background: 'var(--s2)', borderColor: 'oklch(0.22 0.012 265)', color: '#fff' }}
                disabled={isLoading}
                autoComplete="off"
                spellCheck={false}
              />
              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'oklch(0.45 0.015 265)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.45 0.015 265)')}
                  aria-label="Clear"
                >
                  <XIcon />
                </button>
              )}
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={handlePaste}
              disabled={isLoading}
              className="h-11 px-4 gap-1.5 btn-ghost border-0 text-sm"
            >
              <ClipboardIcon />
              <span className="hidden sm:inline">Paste</span>
            </Button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="h-12 text-sm font-bold gap-2 btn-brand border-0 rounded-xl"
          >
            {isLoading ? (
              <>
                <svg className="spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
                Fetching video…
              </>
            ) : (
              <>
                <DownArrowIcon />
                Download Video
              </>
            )}
          </Button>
        </form>

        {/* Skeleton loader */}
        {isLoading && (
          <div className="flex gap-4 pt-1 fade-up" aria-live="polite">
            <div className="shimmer flex-shrink-0" style={{ width: 108, height: 148 }} />
            <div className="flex flex-col gap-2.5 flex-1 pt-1">
              <div className="shimmer h-3 w-3/4" />
              <div className="shimmer h-3 w-1/2" />
              <div className="shimmer h-3 w-2/3" />
              <div className="mt-auto shimmer h-3 w-1/3" />
            </div>
          </div>
        )}
      </Card>

      {/* Error */}
      {state.status === 'error' && (
        <div
          role="alert"
          className="fade-up glass rounded-2xl p-4 flex items-start gap-3"
          style={{ borderColor: 'rgba(255,45,85,0.3)', border: '1px solid rgba(255,45,85,0.3)' }}
        >
          <span className="flex-shrink-0 mt-0.5" style={{ color: '#ff6b6b' }}><AlertIcon /></span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium" style={{ color: '#ffaaaa' }}>{state.message}</p>
            <button onClick={reset} className="mt-1 text-xs underline" style={{ color: 'rgba(255,100,100,0.6)' }}>
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {state.status === 'success' && (
        <div className="flex flex-col gap-4 fade-up">
          <VideoResult data={state.data} />
          <AdUnit slot="0987654321" format="rectangle" label="Post-download 300×250" style={{ minHeight: 250 }} className="w-full rounded-xl overflow-hidden" />
          <button
            onClick={reset}
            className="text-xs text-center transition-colors"
            style={{ color: 'oklch(0.45 0.015 265)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'oklch(0.45 0.015 265)')}
          >
            ← Download another video
          </button>
        </div>
      )}
    </div>
  )
}

/* Icons */
const svg = (d: string, w = 16) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

function LinkIcon() { return svg('M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71') }
function XIcon() { return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>) }
function ClipboardIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>) }
function DownArrowIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>) }
function AlertIcon() { return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>) }
