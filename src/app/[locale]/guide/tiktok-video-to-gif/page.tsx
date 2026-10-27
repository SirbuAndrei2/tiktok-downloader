import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/seo'
import { article, breadcrumbs, faqPage } from '@/lib/schema'
import { pageDates } from '@/lib/content-dates'
import JsonLd from '@/components/JsonLd'
import GuideFaq from '@/components/GuideFaq'
import Link from 'next/link'
import AdsterraBanner from '@/components/ads/AdsterraBanner'
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

// English-only guide: no /de or /ar translation exists, so those URLs must 404.
type Props = { params: Promise<{ locale: string }> }
const SLUG = '/guide/tiktok-video-to-gif'

export const metadata: Metadata = pageMetadata({
  locale: 'en',
  path: SLUG,
  title: 'TikTok to GIF Converter – Free, No Upload',
  description: 'Turn a TikTok into a GIF in two steps: download the clean MP4, then convert it with the in-browser MP4 to GIF converter. Free, and nothing is uploaded.',
  translated: false,
  ogType: 'article',
})

// Rendered visibly by <GuideFaq> and mirrored in FAQPage JSON-LD.
const FAQ = [
  { q: 'Can I convert TikTok to GIF directly?', a: 'Not in one click: a TikTok link gives you a video. Download the MP4 with TokDown, then open it in the MP4 to GIF converter at tokdown.org/mp4-to-gif. Both steps run in your browser and take about a minute.' },
  { q: 'What is the best free TikTok to GIF converter?', a: 'If privacy matters, use a converter that runs in your browser, such as TokDown\'s MP4 to GIF tool: the video never leaves your device. Ezgif offers more editing options but uploads your file to its server, and GIPHY is handy when you want a hosted link to share.' },
  { q: 'Why is my TikTok GIF low quality or huge?', a: 'GIF is limited to 256 colours and has no audio, and every frame is stored almost in full. Start from the HD MP4, keep the clip to 3–6 seconds, and use 12–15 fps at 480 px wide. TokDown builds a custom palette for each clip, which keeps text and gradients clean at a smaller size.' },
  { q: 'Can I make a GIF from TikTok on iPhone?', a: 'Yes. Download the MP4 in Safari, then open tokdown.org/mp4-to-gif in Safari, pick the file from the Files app and convert it. The GIF is saved to Files, from where you can share it or save it to Photos.' },
]

const dates = pageDates(SLUG)
const jsonLd = [
  article({ locale: 'en', path: SLUG, headline: 'How to Convert a TikTok Video to GIF', description: 'A two-step guide to turning any TikTok video into a GIF: download the MP4 with TokDown, then convert it in the browser with the MP4 to GIF converter.', datePublished: dates.published, dateModified: dates.modified }),
  faqPage(FAQ),
  breadcrumbs('en', [{ name: 'Guides', path: '/guide' }, { name: 'TikTok to GIF', path: SLUG }]),
]

const STEPS = [
  { n: 1, title: 'Download the TikTok video as MP4', body: 'Copy the TikTok share link, paste it into TokDown and download the HD MP4. This is your GIF source file, and a sharper source gives a sharper GIF.' },
  { n: 2, title: 'Open the MP4 to GIF converter', body: 'Go to tokdown.org/mp4-to-gif and choose the MP4 you just saved. The converter runs in your browser with WebAssembly, so the video is never uploaded anywhere.' },
  { n: 3, title: 'Pick the part you want', body: 'Set the start time and the length. A GIF can be up to 15 seconds long, but 3–6 seconds is the sweet spot: long GIFs get very large very quickly.' },
  { n: 4, title: 'Choose frame rate and width', body: '15 fps at 480 px wide is a good default for chats and Discord. For a README or a slide, 12 fps at 640 px stays crisp and small.' },
  { n: 5, title: 'Convert and save the GIF', body: 'Press Convert. The converter analyses the clip, builds a colour palette for it and renders the GIF; then save it and share it anywhere that accepts GIFs.' },
]

const TOOLS = [
  { name: 'TokDown MP4 to GIF', platform: 'Web (all devices)', pros: 'Runs in your browser, nothing uploaded, palette-optimised output', cons: 'Up to 15 seconds per GIF' },
  { name: 'Ezgif', platform: 'Web', pros: 'Many editing options (crop, speed, effects)', cons: 'Your file is uploaded to their server' },
  { name: 'GIPHY', platform: 'Web + iOS/Android app', pros: 'Hosts the GIF and gives you a link to share', cons: 'GIFs are public by default' },
  { name: 'Shortcuts (iPhone)', platform: 'iOS only', pros: 'Works offline, saves to Photos', cons: 'You have to build or install a shortcut first' },
]

export default async function TikTokToGif({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  if (locale !== 'en') notFound()

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">
          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: 'var(--brand)' }}>Guide · Updated October 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              TikTok to GIF Converter: Free, No Upload
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Convert any TikTok video into a shareable GIF in two steps: download the clean MP4, then turn it into a GIF with the in-browser MP4 to GIF converter. No watermark, no upload, no account.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>How to convert TikTok to GIF</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: 'rgba(139,108,255,0.15)', color: 'var(--brand)', border: '1px solid rgba(139,108,255,0.3)' }}>{n}</span>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Step 1 starts here — download the clean TikTok MP4 first.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}>
              Download TikTok as MP4 →
            </Link>
            <p className="text-sm mt-6 mb-4" style={{ color: 'var(--t3)' }}>Already have the MP4? Go straight to step 2.</p>
            <Link href="/mp4-to-gif" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)' }}>
              Open the MP4 to GIF converter →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tools-h">
            <h2 id="tools-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Ways to turn a TikTok into a GIF</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(139,108,255,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Tool</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Platform</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Pros</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Cons</th>
                  </tr>
                </thead>
                <tbody>
                  {TOOLS.map(({ name, platform, pros, cons }, i) => (
                    <tr key={name} style={{ background: i % 2 === 0 ? 'var(--line)' : 'transparent', borderTop: '1px solid var(--line)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: i === 0 ? 'var(--brand)' : 'var(--t2)' }}>{name}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t3)' }}>{platform}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t3)' }}>{pros}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t4)' }}>{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <GuideFaq title="Frequently asked questions" faq={FAQ} />

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'var(--line)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/guide/tiktok-to-mp4', icon: '🎬', title: 'TikTok to MP4', desc: 'Download TikTok videos as MP4 files in HD quality.' },
                { href: '/guide/tiktok-to-mp3', icon: '🎵', title: 'TikTok to MP3', desc: 'Extract the audio from any TikTok video as an MP3.' },
                { href: '/guide/download-tiktok-without-watermark', icon: '🚫', title: 'No Watermark Guide', desc: 'Full guide for all devices including PC and Mac.' },
                { href: '/video-compressor', icon: '🗜️', title: 'Video compressor', desc: 'Shrink the MP4 for Discord or WhatsApp, in your browser.' },
              ].map(({ href, icon, title, desc }) => (
                <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs" style={{ color: 'var(--t4)' }}>{desc}</p>
                </Link>
              ))}
            </div>
          </section>
          <div className="w-full max-w-2xl px-4 pb-12">
            <AdsterraBanner size="responsive" />
          </div>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'var(--line)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: '/', label: 'Downloader' }, { href: '/tools', label: 'All tools' }, { href: '/guide', label: 'All guides' }, { href: '/about', label: 'About' }, { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' }, { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
