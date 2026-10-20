// Monetag popunder — ONE zone only. Three zones of the same tag.min.js used to be
// loaded here (245447, 233102, 273072) plus a full-screen vignette; each extra zone
// fires its own popunder, so visitors were hit several times per visit. Removed on
// 2026-10-20 to make the site less hostile. The zone IDs above are kept in this
// comment in case one needs to be restored in the Monetag dashboard.
//
// Injected via DOM rather than JSX on purpose: React 19 dedupes same-src async
// scripts, and the tag binds click handlers document-wide (download buttons
// included), so it must load exactly once per page.
const TAG_ZONE_SRC = `(function(d){var s=d.createElement('script');s.src='https://quge5.com/88/tag.min.js';s.async=true;s.dataset.zone='245447';s.setAttribute('data-cfasync','false');(d.body||d.documentElement).appendChild(s)})(document)`

export default function MonetagTags() {
  return <script data-cfasync="false" dangerouslySetInnerHTML={{ __html: TAG_ZONE_SRC }} />
}
