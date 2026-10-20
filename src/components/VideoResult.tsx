'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Download, Film, Heart, Images, LoaderCircle, MessageCircle, Music, Play, Share2, Video } from 'lucide-react'

export interface VideoData {
  id: string; title: string; cover: string; play: string; hdplay: string
  /** Source network; TikTok is the default for older payloads. */
  platform?: 'tiktok' | 'facebook' | 'twitter' | 'instagram'
  watermarked?: boolean
  cookie?: string
  music: string; musicTitle: string
  /** Photo/slideshow posts: full-size image URLs in slide order. Empty for videos. */
  images?: string[]
  isPhoto?: boolean
  author: { nickname: string; avatar: string; uniqueId: string }
  stats: { plays: number; likes: number; comments: number; shares: number }
}

function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

function proxyUrl(url: string, filename: string, type: string, cookie?: string) {
  return `/api/proxy?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}&type=${type}${cookie ? `&ck=${encodeURIComponent(cookie)}` : ''}`
}

/** TikTok serves slides as .jpeg or .webp — keep the real extension so the saved file opens everywhere. */
function imageExt(url: string) {
  const m = /\.(jpe?g|png|webp|heic)(?:[?~]|$)/i.exec(url)
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
}

export default function VideoResult({ data }: { data: VideoData }) {
  const t = useTranslations('VideoResult')
  const [savingAll, setSavingAll] = useState(false)
  const platform = data.platform ?? 'tiktok'
  const generic = platform !== 'tiktok'
  const watermarked = data.watermarked === true
  const proxy = (url: string, filename: string, type = 'video') => proxyUrl(url, filename, type, data.cookie)
  const base = (data.title.slice(0, 40).replace(/[^a-z0-9 ]/gi, '') || platform)
    .trim().replace(/\s+/g, '-').toLowerCase()

  const images = data.images ?? []
  const isPhoto = images.length > 0

  const stats = [
    { Icon: Play, val: data.stats.plays, label: 'plays' },
    { Icon: Heart, val: data.stats.likes, label: 'likes' },
    { Icon: MessageCircle, val: data.stats.comments, label: 'comments' },
    { Icon: Share2, val: data.stats.shares, label: 'shares' },
  ].filter((s) => s.val > 0)
  const handle = data.author.uniqueId || data.author.nickname

  const imageHref = (url: string, i: number) => proxy(url, `${base}-${i + 1}.${imageExt(url)}`, 'image')

  // Browsers allow one download per user gesture, so trigger them one by one with a short gap.
  // Chrome asks once to allow multiple downloads; Safari saves each file in turn.
  async function downloadAll() {
    if (savingAll) return
    setSavingAll(true)
    try {
      for (let i = 0; i < images.length; i++) {
        const a = document.createElement('a')
        a.href = imageHref(images[i], i)
        a.download = ''
        a.rel = 'noopener'
        document.body.appendChild(a)
        a.click()
        a.remove()
        await new Promise((r) => setTimeout(r, 700))
      }
    } finally {
      setSavingAll(false)
    }
  }

  return (
    <section className="cut-card overflow-hidden text-left rtl:text-right" aria-label={t('downloadOptions')}>
      {/* ── Preview ───────────────────────────────────────────── */}
      <div className="flex gap-4 p-4">
        <div className="relative shrink-0 overflow-hidden rounded-xl" style={{ width: 96, height: 128, background: 'var(--surface-2)', border: '1px solid var(--line-strong)' }}>
          {data.cover || images[0] ? (
            <Image src={data.cover || images[0]} alt="" fill sizes="96px" className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full w-full items-center justify-center" style={{ color: 'var(--t4)' }}>
              {isPhoto ? <Images className="size-7" aria-hidden /> : <Video className="size-7" aria-hidden />}
            </div>
          )}
          {isPhoto && (
            <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold rtl:left-auto rtl:right-1.5" style={{ background: 'var(--ink)', color: '#fff' }}>
              <Images className="size-3" aria-hidden />
              {images.length}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            {data.author.avatar && (
              <span className="relative size-7 shrink-0 overflow-hidden rounded-full" style={{ outline: '1px solid var(--line-strong)' }}>
                <Image src={data.author.avatar} alt="" fill sizes="28px" className="object-cover" unoptimized />
              </span>
            )}
            <span className="truncate text-sm font-semibold" style={{ color: 'var(--lime)' }}>
              {handle ? `${data.author.uniqueId ? '@' : ''}${handle}` : t('sourceLabel')}
            </span>
          </div>

          {data.title && (
            <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{data.title}</p>
          )}

          <ul className="mt-auto flex flex-wrap gap-1.5 p-0 m-0 list-none">
            {stats.map(({ Icon, val, label }) => (
              <li key={label} className="stat-pill" aria-label={`${fmt(val)} ${label}`}>
                <Icon className="size-3.5" aria-hidden />
                {fmt(val)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {watermarked && (
        <p className="m-0 px-4 py-2 text-xs" style={{ borderTop: '1px solid var(--line)', background: 'var(--lime-dim)', color: 'var(--t2)' }}>{t('fallbackNote')}</p>
      )}

      {isPhoto ? (
        <>
          {/* ── Photo gallery ─────────────────────────────────── */}
          <div className="border-t p-3" style={{ borderColor: 'var(--line)' }}>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="m-0 text-base font-semibold" style={{ color: 'var(--t1)' }}>
                {t('photosTitle', { count: images.length })}
              </h3>
              <button
                type="button"
                onClick={downloadAll}
                disabled={savingAll}
                className="dl-btn dl-btn-primary h-10 gap-2 rounded-lg px-3.5 py-0 text-sm"
              >
                {savingAll ? <LoaderCircle className="spin size-4" aria-hidden /> : <Download className="size-4" aria-hidden />}
                <span className="font-bold">{savingAll ? t('downloadingAll') : t('downloadAll')}</span>
              </button>
            </div>

            <ul className="m-0 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-4">
              {images.map((src, i) => (
                <li key={src} className="group relative aspect-[3/4] overflow-hidden rounded-xl" style={{ background: 'var(--s3)' }}>
                  <Image src={src} alt={t('photoAlt', { n: i + 1 })} fill sizes="(max-width: 640px) 33vw, 160px" className="object-cover" unoptimized />
                  <a
                    href={imageHref(src, i)}
                    download
                    className="absolute inset-0 flex items-end justify-between p-2 no-underline"
                    style={{ background: 'linear-gradient(to top, rgba(18,26,58,0.75), transparent 55%)', color: '#fff' }}
                    aria-label={t('downloadPhoto', { n: i + 1 })}
                  >
                    <span className="text-xs font-semibold">{i + 1}</span>
                    <span className="inline-flex size-8 items-center justify-center rounded-full transition-transform group-hover:scale-110" style={{ background: 'var(--cobalt)' }}>
                      <Download className="size-4" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Slideshow video + sound ───────────────────────── */}
          {(data.play || data.music) && (
            <div className="grid gap-3 p-3 sm:grid-cols-2" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
              {data.play && (
                <a href={proxy(data.hdplay || data.play, `${base}-slideshow.mp4`)} download className="dl-btn dl-btn-secondary">
                  <Film className="size-5 shrink-0 opacity-80" aria-hidden />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold">{t('slideshowTitle')}</span>
                    <span className="text-xs" style={{ color: 'var(--t4)' }}>{t('slideshowDesc')} · MP4</span>
                  </span>
                  <Download className="ms-auto size-4 shrink-0 opacity-60" aria-hidden />
                </a>
              )}
              {data.music && (
                <a href={proxy(data.music, `${base}.mp3`, 'audio')} download className="dl-btn dl-btn-secondary">
                  <Music className="size-5 shrink-0 opacity-80" aria-hidden />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold">{t('audioTitle')}</span>
                    <span className="text-xs" style={{ color: 'var(--t4)' }}>{t('audioDesc')} · MP3</span>
                  </span>
                  <Download className="ms-auto size-4 shrink-0 opacity-60" aria-hidden />
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        /* ── Video downloads ─────────────────────────────────── */
        <div className="grid gap-3 p-3 sm:grid-cols-2" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
          <a href={proxy(data.hdplay || data.play, `${base}-hd.mp4`)} download className="dl-btn dl-btn-primary sm:col-span-2">
            <Film className="size-5 shrink-0" aria-hidden />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-bold">{watermarked ? t('hdWatermarked') : generic ? t('hdGeneric') : t('hdTitle')}</span>
              <span className="text-xs opacity-75">{t('hdDesc')} · MP4</span>
            </span>
            <Download className="ms-auto size-4 shrink-0 opacity-70" aria-hidden />
          </a>

          {data.play && data.play !== data.hdplay && (
          <a href={proxy(data.play, `${base}-sd.mp4`)} download className="dl-btn dl-btn-secondary">
            <Video className="size-5 shrink-0 opacity-80" aria-hidden />
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold">{watermarked ? t('sdWatermarked') : generic ? t('sdGeneric') : t('sdTitle')}</span>
              <span className="text-xs" style={{ color: 'var(--t4)' }}>{t('sdDesc')} · MP4</span>
            </span>
            <Download className="ms-auto size-4 shrink-0 opacity-60" aria-hidden />
          </a>
          )}

          {data.music && (
            <a href={proxy(data.music, `${base}.mp3`, 'audio')} download className="dl-btn dl-btn-secondary">
              <Music className="size-5 shrink-0 opacity-80" aria-hidden />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-semibold">{t('audioTitle')}</span>
                <span className="text-xs" style={{ color: 'var(--t4)' }}>{t('audioDesc')} · MP3</span>
              </span>
              <Download className="ms-auto size-4 shrink-0 opacity-60" aria-hidden />
            </a>
          )}
        </div>
      )}
    </section>
  )
}
