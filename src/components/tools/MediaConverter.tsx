'use client'

import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Download, FileVideo, LoaderCircle, RotateCcw, Upload, Wand2 } from 'lucide-react'
import type { FFmpeg } from '@ffmpeg/ffmpeg'

type Mode = 'compress' | 'gif'
type Preset = 'small' | 'balanced' | 'quality'

const CORE = 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd'
const FFMPEG_UMD = 'https://unpkg.com/@ffmpeg/ffmpeg@0.12.15/dist/umd'
const MAX_BYTES = 500 * 1024 * 1024

const PRESETS: Record<Preset, { maxW: number; crf: string; audio: string }> = {
  small: { maxW: 854, crf: '32', audio: '64k' },
  balanced: { maxW: 1280, crf: '28', audio: '96k' },
  quality: { maxW: 1920, crf: '23', audio: '128k' },
}

function fmtBytes(n: number) {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`
  if (n >= 1024) return `${Math.round(n / 1024)} KB`
  return `${n} B`
}

let enginePromise: Promise<FFmpeg> | null = null
/** Loads ffmpeg.wasm once per page (single-thread core: no COOP/COEP headers needed). */
async function getEngine(onProgress: (ratio: number) => void): Promise<FFmpeg> {
  if (!enginePromise) {
    enginePromise = (async () => {
      const [{ FFmpeg }, { toBlobURL }] = await Promise.all([import('@ffmpeg/ffmpeg'), import('@ffmpeg/util')])
      const ffmpeg = new FFmpeg()
      await ffmpeg.load({
        coreURL: await toBlobURL(`${CORE}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${CORE}/ffmpeg-core.wasm`, 'application/wasm'),
        classWorkerURL: await toBlobURL(`${FFMPEG_UMD}/814.ffmpeg.js`, 'text/javascript'),
      })
      return ffmpeg
    })().catch((e) => {
      enginePromise = null
      throw e
    })
  }
  const ffmpeg = await enginePromise
  ffmpeg.on('progress', ({ progress }) => onProgress(Math.max(0, Math.min(1, progress))))
  return ffmpeg
}

/**
 * Browser-only video compressor / MP4→GIF converter on ffmpeg.wasm.
 * Files never leave the device. One component, two modes, so the pages stay thin.
 */
export default function MediaConverter({ mode }: { mode: Mode }) {
  const t = useTranslations(mode === 'compress' ? 'VideoCompressor.tool' : 'Mp4ToGif.tool')
  const [file, setFile] = useState<File | null>(null)
  const [preset, setPreset] = useState<Preset>('balanced')
  const [start, setStart] = useState(0)
  const [duration, setDuration] = useState(5)
  const [fps, setFps] = useState(15)
  const [width, setWidth] = useState(480)
  const [phase, setPhase] = useState<'idle' | 'loading' | 'working' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [output, setOutput] = useState<{ url: string; size: number; name: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragging = useRef(false)

  function pickFile(f: File | null | undefined) {
    if (!f) return
    if (f.size > MAX_BYTES) { setError(t('tooLarge', { max: fmtBytes(MAX_BYTES) })); setPhase('error'); return }
    if (output) URL.revokeObjectURL(output.url)
    setOutput(null); setError(''); setPhase('idle'); setProgress(0); setFile(f)
  }

  async function run() {
    if (!file) return
    setError('')
    setPhase('loading')
    try {
      const ffmpeg = await getEngine(setProgress)
      const { fetchFile } = await import('@ffmpeg/util')
      setPhase('working')
      setProgress(0)
      const ext = (file.name.split('.').pop() || 'mp4').toLowerCase()
      const inName = `input.${ext}`
      await ffmpeg.writeFile(inName, await fetchFile(file))
      let outName: string
      let args: string[]
      if (mode === 'compress') {
        const p = PRESETS[preset]
        outName = 'output.mp4'
        args = ['-i', inName, '-vf', `scale='min(${p.maxW},iw)':-2`, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', p.crf, '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', p.audio, '-movflags', '+faststart', outName]
      } else {
        outName = 'output.gif'
        const filters = `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`
        args = ['-ss', String(start), '-t', String(duration), '-i', inName, '-vf', filters, '-loop', '0', outName]
      }
      await ffmpeg.exec(args)
      const data = (await ffmpeg.readFile(outName)) as Uint8Array
      await ffmpeg.deleteFile(inName).catch(() => {})
      await ffmpeg.deleteFile(outName).catch(() => {})
      const blob = new Blob([data.buffer as ArrayBuffer], { type: mode === 'compress' ? 'video/mp4' : 'image/gif' })
      const base = file.name.replace(/\.[^.]+$/, '')
      setOutput({ url: URL.createObjectURL(blob), size: blob.size, name: mode === 'compress' ? `${base}-compressed.mp4` : `${base}.gif` })
      setPhase('done')
    } catch (e) {
      setError(phase === 'loading' ? t('errorEngine') : t('errorRun'))
      setPhase('error')
      console.error(e)
    }
  }

  function reset() {
    if (output) URL.revokeObjectURL(output.url)
    setOutput(null); setFile(null); setPhase('idle'); setProgress(0); setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const busy = phase === 'loading' || phase === 'working'
  const selectCls = 'h-11 rounded-xl border px-3 text-sm'
  const selectStyle = { background: 'var(--bg)', borderColor: 'var(--line-strong)', color: 'var(--t1)' }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Drop zone */}
      <label
        htmlFor="media-file"
        onDragOver={(e) => { e.preventDefault(); dragging.current = true }}
        onDrop={(e) => { e.preventDefault(); dragging.current = false; pickFile(e.dataTransfer.files?.[0]) }}
        className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-6 text-center transition-colors hover:bg-white/[0.03]"
        style={{ borderColor: file ? 'rgba(200,255,77,0.5)' : 'var(--line-strong)', background: 'var(--bg)' }}
      >
        <input ref={inputRef} id="media-file" type="file" accept="video/*" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} disabled={busy} />
        {file ? (
          <>
            <FileVideo className="size-6" style={{ color: 'var(--lime)' }} aria-hidden />
            <span className="max-w-full truncate text-sm font-semibold" style={{ color: 'var(--t1)' }}>{file.name}</span>
            <span className="mono text-xs" style={{ color: 'var(--t4)' }}>{fmtBytes(file.size)}</span>
          </>
        ) : (
          <>
            <Upload className="size-6" style={{ color: 'var(--t3)' }} aria-hidden />
            <span className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>{t('drop')}</span>
            <span className="text-xs" style={{ color: 'var(--t4)' }}>{t('hint')}</span>
          </>
        )}
      </label>

      {/* Options */}
      {mode === 'compress' ? (
        <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={t('presetLabel')}>
          {(Object.keys(PRESETS) as Preset[]).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={preset === p}
              onClick={() => setPreset(p)}
              disabled={busy}
              className="flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-colors"
              style={{ borderColor: preset === p ? 'var(--lime)' : 'var(--line-strong)', background: preset === p ? 'var(--lime-dim)' : 'var(--bg)' }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>{t(`presets.${p}.title`)}</span>
              <span className="text-xs" style={{ color: 'var(--t4)' }}>{t(`presets.${p}.desc`)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <label className="flex flex-col gap-1 text-xs font-medium" style={{ color: 'var(--t3)' }}>
            {t('start')}
            <input type="number" min={0} step={0.5} value={start} onChange={(e) => setStart(Math.max(0, Number(e.target.value)))} disabled={busy} className={selectCls} style={selectStyle} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium" style={{ color: 'var(--t3)' }}>
            {t('duration')}
            <input type="number" min={1} max={15} step={0.5} value={duration} onChange={(e) => setDuration(Math.min(15, Math.max(1, Number(e.target.value))))} disabled={busy} className={selectCls} style={selectStyle} />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium" style={{ color: 'var(--t3)' }}>
            {t('fps')}
            <select value={fps} onChange={(e) => setFps(Number(e.target.value))} disabled={busy} className={selectCls} style={selectStyle}>
              {[10, 12, 15, 20, 24].map((v) => <option key={v} value={v}>{v} fps</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium" style={{ color: 'var(--t3)' }}>
            {t('width')}
            <select value={width} onChange={(e) => setWidth(Number(e.target.value))} disabled={busy} className={selectCls} style={selectStyle}>
              {[240, 320, 480, 640, 800].map((v) => <option key={v} value={v}>{v} px</option>)}
            </select>
          </label>
        </div>
      )}

      {/* Action */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={run} disabled={!file || busy} className="btn-brand inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl px-6 text-base">
          {busy ? <LoaderCircle className="spin size-5" aria-hidden /> : <Wand2 className="size-5" aria-hidden />}
          {phase === 'loading' ? t('loadingEngine') : phase === 'working' ? t('processing', { pct: Math.round(progress * 100) }) : t('run')}
        </button>
        {(file || output) && (
          <button type="button" onClick={reset} disabled={busy} className="btn-ghost inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-5 text-sm">
            <RotateCcw className="size-4" aria-hidden />
            {t('reset')}
          </button>
        )}
      </div>

      {busy && (
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-3)' }} aria-hidden>
          <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${phase === 'loading' ? 8 : Math.max(4, progress * 100)}%`, background: 'var(--lime)' }} />
        </div>
      )}

      <div aria-live="polite">
        {phase === 'error' && <p role="alert" className="text-sm font-medium" style={{ color: 'var(--danger)' }}>{error}</p>}
        {phase === 'done' && output && file && (
          <div className="fade-up flex flex-col gap-3 rounded-2xl p-4" style={{ border: '1px solid rgba(200,255,77,0.35)', background: 'var(--lime-dim)' }}>
            {mode === 'gif' && (
              // eslint-disable-next-line @next/next/no-img-element -- local blob preview
              <img src={output.url} alt={t('previewAlt')} className="mx-auto max-h-64 rounded-xl" />
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex flex-col">
                <span className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>{t('done')}</span>
                <span className="mono text-xs" style={{ color: 'var(--t3)' }}>
                  {fmtBytes(file.size)} → {fmtBytes(output.size)}{mode === 'compress' && output.size < file.size ? ` · −${Math.round((1 - output.size / file.size) * 100)}%` : ''}
                </span>
              </span>
              <a href={output.url} download={output.name} className="btn-brand inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm no-underline">
                <Download className="size-4" aria-hidden />
                {t('download')}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
