import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Locale-aware Link/redirect/usePathname/useRouter. `Link` with a `locale` prop
// also writes the NEXT_LOCALE cookie on click, so switching back to the default
// locale (`/`) is not undone by the middleware's cookie-based redirect.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
