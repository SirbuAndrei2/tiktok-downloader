'use client'

import { useEffect } from 'react'

/**
 * Adsterra Popunder (dashboard unit Popunder_1, id 31828936; the only unit left once
 * /22/ banners, /21/ native and /14/ Social Bar are accounted for). The script binds a
 * document-wide click handler, so loading it on page load hijacked the first
 * click on Paste / Download. It is injected only after the visitor has received
 * a download result (`tokdown:result` event from Downloader), once per browser
 * session. Pages without a downloader never load it.
 *
 * To load it on every page instead (maximum revenue, worse UX), render
 * <script data-cfasync="false" src={SRC} /> in the locale layout and drop this component.
 */
const SRC = 'https://abscloud.org/1/3009c7abc63085b40060631065b8690e'
const SESSION_KEY = 'tokdown_pu'
export const RESULT_EVENT = 'tokdown:result'

export default function AdsterraPopunder() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return
    let shown = false
    try { shown = sessionStorage.getItem(SESSION_KEY) === '1' } catch { /* storage blocked */ }
    if (shown) return

    const load = () => {
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch { /* ignore */ }
      if (document.querySelector(`script[src="${SRC}"]`)) return
      const s = document.createElement('script')
      s.src = SRC
      s.async = true
      s.setAttribute('data-cfasync', 'false')
      ;(document.body || document.documentElement).appendChild(s)
    }
    window.addEventListener(RESULT_EVENT, load, { once: true })
    return () => window.removeEventListener(RESULT_EVENT, load)
  }, [])
  return null
}
