'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface VideoData {
  id: string; title: string; cover: string; play: string; hdplay: string
  music: string; musicTitle: string
  author: { nickname: string; avatar: string; uniqueId: string }
  stats: { plays: number; likes: number; comments: number; shares: number }
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

function proxy(url: string, filename: string, type = 'video') {
  return `/api/proxy?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}&type=${type}`
}

export default function VideoResult({ data }: { data: VideoData }) {
  const base = (data.title.slice(0, 40).replace(/[^a-z0-9 ]/gi, '') || 'tiktok')
    .trim().replace(/\s+/g, '-').toLowerCase()

  return (
    <Card className="overflow-hidden glass border-0 p-0" role="region" aria-label="Download options">

      {/* ── Top: thumbnail + info ─────────────────────────────── */}
      <div className="flex gap-4 p-5">

        {/* Thumbnail */}
        <div
          className="relative flex-shrink-0 rounded-xl overflow-hidden"
          style={{ width: 108, height: 148, background: 'var(--s3)' }}
        >
          {data.cover
            ? <Image src={data.cover} alt={data.title || 'thumbnail'} fill sizes="108px" className="object-cover" unoptimized />
            : <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--s4)' }}><TkIcon /></div>
          }
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="white"><path d="M2 1.5l8 4.5-8 4.5V1.5z"/></svg>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">

          {/* Author */}
          <div className="flex items-center gap-2">
            {data.author.avatar && (
              <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ outline: '1px solid oklch(0.22 0.012 265)' }}>
                <Image src={data.author.avatar} alt={data.author.nickname} fill className="object-cover" unoptimized />
              </div>
            )}
            <span className="text-xs font-semibold truncate text-gradient">
              @{data.author.uniqueId || data.author.nickname}
            </span>
          </div>

          {/* Title */}
          {data.title && (
            <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'oklch(0.65 0.01 265)' }}>
              {data.title}
            </p>
          )}

          {/* Stats */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {[
              { icon: '▶', val: data.stats.plays,    label: 'plays' },
              { icon: '♥', val: data.stats.likes,    label: 'likes' },
              { icon: '💬', val: data.stats.comments, label: 'comments' },
              { icon: '↗', val: data.stats.shares,   label: 'shares' },
            ].map(({ icon, val, label }) => (
              <span key={label} className="stat-pill" aria-label={`${fmt(val)} ${label}`}>
                <span aria-hidden="true">{icon}</span> {fmt(val)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Separator style={{ background: 'oklch(0.2 0.01 265)' }} />

      {/* ── Download buttons ──────────────────────────────────── */}
      <div className="p-4 flex flex-col sm:flex-row gap-2.5">

        {/* HD — primary gradient */}
        <a href={proxy(data.hdplay || data.play, `${base}-hd.mp4`)} download className="dl-btn dl-btn-primary">
          <span className="flex-shrink-0 opacity-80"><VideoIcon /></span>
          <span className="flex flex-col min-w-0">
            <span className="font-bold text-xs truncate">HD · No Watermark</span>
            <span className="text-[10px] opacity-60">Best quality</span>
          </span>
          <span className="ml-auto opacity-50 flex-shrink-0"><DlIcon /></span>
        </a>

        {/* SD — ghost */}
        <a href={proxy(data.play, `${base}-sd.mp4`)} download className="dl-btn dl-btn-secondary">
          <span className="flex-shrink-0 opacity-70"><VideoIcon /></span>
          <span className="flex flex-col min-w-0">
            <span className="font-semibold text-xs truncate">SD · No Watermark</span>
            <span className="text-[10px] opacity-50">Smaller file</span>
          </span>
          <span className="ml-auto opacity-40 flex-shrink-0"><DlIcon /></span>
        </a>

        {/* Audio */}
        {data.music && (
          <a href={proxy(data.music, `${base}.mp3`, 'audio')} download className="dl-btn dl-btn-secondary">
            <span className="flex-shrink-0 opacity-70"><MusicIcon /></span>
            <span className="flex flex-col min-w-0">
              <span className="font-semibold text-xs truncate">Audio MP3</span>
              <span className="text-[10px] opacity-50">Music only</span>
            </span>
            <span className="ml-auto opacity-40 flex-shrink-0"><DlIcon /></span>
          </a>
        )}
      </div>

      {/* Format badges */}
      <div className="px-4 pb-4 flex gap-2 flex-wrap">
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5" style={{ background: 'var(--s3)', color: 'oklch(0.55 0.015 265)', border: '1px solid oklch(0.22 0.012 265)' }}>MP4</Badge>
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5" style={{ background: 'var(--s3)', color: 'oklch(0.55 0.015 265)', border: '1px solid oklch(0.22 0.012 265)' }}>MP3</Badge>
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5" style={{ background: 'var(--s3)', color: 'oklch(0.55 0.015 265)', border: '1px solid oklch(0.22 0.012 265)' }}>No Watermark</Badge>
        <Badge variant="secondary" className="text-[10px] px-2 py-0.5" style={{ background: 'var(--s3)', color: 'oklch(0.55 0.015 265)', border: '1px solid oklch(0.22 0.012 265)' }}>HD</Badge>
      </div>
    </Card>
  )
}

/* Icons */
function TkIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.02a8.18 8.18 0 004.78 1.54V7.11a4.85 4.85 0 01-1.01-.42z"/></svg>
}
function VideoIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
}
function MusicIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
}
function DlIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}
