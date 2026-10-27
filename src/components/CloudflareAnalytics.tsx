/**
 * Cloudflare Web Analytics beacon (free, cookieless, no consent banner needed,
 * includes Core Web Vitals). Paste the site token from
 * Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site → "JS snippet".
 * Empty token = nothing is rendered.
 */
const CF_BEACON_TOKEN = ''

export default function CloudflareAnalytics() {
  if (!CF_BEACON_TOKEN) return null
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  )
}
