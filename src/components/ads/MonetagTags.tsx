const VIGNETTE_SRC = `(function(s){s.dataset.zone='10919813',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`

// The three tag.min.js zones share one src, and React 19 dedupes same-src async
// scripts to a single tag — so they must be DOM-injected, not rendered as JSX.
// They bind to clicks document-wide (download buttons included), so loading them
// once per page is both sufficient and required — twice fires duplicate popunders.
const TAG_ZONES_SRC = `(function(d){['245447','233102','273072'].forEach(function(z){var s=d.createElement('script');s.src='https://quge5.com/88/tag.min.js';s.async=true;s.dataset.zone=z;s.setAttribute('data-cfasync','false');(d.body||d.documentElement).appendChild(s)})})(document)`

export default function MonetagTags() {
  return (
    <>
      {/* Monetag vignette / interstitial */}
      <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: VIGNETTE_SRC }} />
      {/* Monetag popunder / in-page push zones */}
      <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: TAG_ZONES_SRC }} />
    </>
  )
}
