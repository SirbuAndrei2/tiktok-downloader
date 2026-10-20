'use client'

import { useEffect } from 'react'

/**
 * Monetag popunder, loaded lazily. The tag binds a document-wide click handler,
 * so instead of loading it on every page load (which hijacked the first click
 * on Paste / Download) it is injected only after the visitor has received a
 * download result (`tokdown:result` event from Downloader), once per browser
 * session. Pages without a downloader never load it. Frequency per 24h is
 * additionally capped in the Monetag dashboard.
 */
const ZONE = '245447'
const SRC = 'https://quge5.com/88/tag.min.js'
const SESSION_KEY = 'tokdown_pu'
export const RESULT_EVENT = 'tokdown:result'

export default function PopunderLoader() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return
    let shown = false
    try { shown = sessionStorage.getItem(SESSION_KEY) === '1' } catch { /* storage blocked */ }
    if (shown) return

    const load = () => {
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
      if (document.querySelector(`script[data-zone="${ZONE}"]`)) return
      const s = document.createElement('script')
      s.src = SRC
      s.async = true
      s.dataset.zone = ZONE
      s.setAttribute('data-cfasync', 'false')
      ;(document.body || document.documentElement).appendChild(s)
    }
    window.addEventListener(RESULT_EVENT, load, { once: true })
    return () => window.removeEventListener(RESULT_EVENT, load)
  }, [])
  return null
}
