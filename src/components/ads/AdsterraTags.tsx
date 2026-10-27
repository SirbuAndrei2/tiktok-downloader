// Adsterra Social Bar (dashboard unit SocialBar_1, id 31829133). Exactly one per
// page, loaded from the locale layout. The popunder is NOT loaded here: see
// AdsterraPopunder.tsx, which defers it until after a download result.
const SOCIAL_BAR = 'https://bauval.org/14/e153bd3dae7dee5cd78926588cb943e1'

export default function AdsterraTags() {
  return <script async data-cfasync="false" src={SOCIAL_BAR} />
}
