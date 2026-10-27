import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// Security headers come from next.config.ts `headers()`, which the OpenNext/Cloudflare
// runtime does apply (verified on prod 2026-10-20). Setting them here too duplicated them.
export default createMiddleware(routing)

export const config = {
  // Exclude API routes, Next.js internals, static files, and legal pages (English-only)
  matcher: ['/((?!api|_next|.*\\..*|privacy|terms|dmca|disclaimer).*)'],
}
