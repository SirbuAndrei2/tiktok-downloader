import { defineCloudflareConfig } from '@opennextjs/cloudflare'
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache'

// Every page is prerendered at build time (generateStaticParams + setRequestLocale),
// so serve those HTML/RSC payloads straight from Workers static assets instead of
// re-rendering them in the Worker on each request. No KV/R2 binding needed; ISR
// revalidation is intentionally not used.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
})
