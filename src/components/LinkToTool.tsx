'use client'

import { useState } from 'react'
import { Check, Copy, Link as LinkIcon } from 'lucide-react'

interface Props { url: string; title: string; heading: string; hint: string; copyLabel: string; copiedLabel: string }

/** Small "link to this tool" box: a ready-made HTML snippet people can paste into posts and docs. */
export default function LinkToTool({ url, title, heading, hint, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false)
  const snippet = `<a href="${url}">${title}</a>`
  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* clipboard denied */ }
  }
  return (
    <div className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="icon-tile shrink-0"><LinkIcon className="size-5" aria-hidden /></span>
        <div className="min-w-0">
          <p className="m-0 text-sm font-semibold" style={{ color: 'var(--t1)' }}>{heading}</p>
          <p className="m-0 mt-1 text-xs leading-relaxed" style={{ color: 'var(--t3)' }}>{hint}</p>
          <code className="mono mt-2 block truncate rounded-lg px-3 py-2 text-xs" style={{ background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--t2)' }}>{snippet}</code>
        </div>
      </div>
      <button type="button" onClick={copy} className="btn-ghost inline-flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 text-sm">
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  )
}
