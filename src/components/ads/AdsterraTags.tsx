// Adsterra site-wide tag (the "/1/" format: Social Bar / in-page unit).
// Exactly one per page, loaded from the locale layout. The Monetag popunder is
// the only other site-wide ad script; do not add a second popunder network.
const SITE_TAG = 'https://abscloud.org/1/3009c7abc63085b40060631065b8690e'

export default function AdsterraTags() {
  return <script async data-cfasync="false" src={SITE_TAG} />
}
