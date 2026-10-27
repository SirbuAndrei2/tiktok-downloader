import Script from 'next/script'

/**
 * Google Analytics 4 via gtag.js, once per page from the locale layout. Paste the measurement ID
 * (G-…) of tokdown.org's web data stream from GA → Admin → Data streams. Empty ID = nothing is rendered.
 * - Loads after hydration (next/script afterInteractive) and adds no server work, so the Worker
 *   CPU budget is untouched.
 * - Consent Mode v2: storage is denied by default for the EEA, UK and Switzerland (GA sends
 *   cookieless pings there) and granted elsewhere; "Accept" in CookieConsent grants it.
 */
const GA_ID = 'G-BXXHKDL1K5'
export const CONSENT_KEY = 'tokdown_cookie_consent'

const EEA_UK_CH = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH']
const GRANTED = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' }
const DENIED = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }

/** Called by CookieConsent. No-op when GA is not loaded. */
export function grantAnalyticsConsent() {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  w.gtag?.('consent', 'update', GRANTED)
}

export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production' || !GA_ID) return null
  const init = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', Object.assign(${JSON.stringify(DENIED)}, { region: ${JSON.stringify(EEA_UK_CH)} }));
gtag('consent', 'default', ${JSON.stringify(GRANTED)});
try { if (localStorage.getItem('${CONSENT_KEY}') === 'accepted') gtag('consent', 'update', ${JSON.stringify(GRANTED)}); } catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">{init}</Script>
      <Script id="ga-tag" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  )
}
