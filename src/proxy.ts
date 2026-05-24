import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Exclude API routes, Next.js internals, static files, and legal pages (English-only)
  matcher: ['/((?!api|_next|_vercel|.*\\...*|privacy|terms|dmca|disclaimer).*)'],
}
