import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intl = createMiddleware(routing)

// next.config `headers()` are not applied on the Cloudflare/OpenNext runtime,
// so the security headers are set here, on every matched response.
const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

export default function middleware(request: NextRequest) {
  const response = intl(request)
  // `set` (not `append`): local `wrangler dev` also applies next.config headers, which would duplicate HSTS.
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) if (!response.headers.has(k)) response.headers.set(k, v)
  return response
}

export const config = {
  // Exclude API routes, Next.js internals, static files, and legal pages (English-only)
  matcher: ['/((?!api|_next|_vercel|.*\\..*|privacy|terms|dmca|disclaimer).*)'],
}
