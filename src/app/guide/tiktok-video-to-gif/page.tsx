import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'
const SLUG = '/guide/tiktok-video-to-gif'

export const metadata: Metadata = {
  title: 'TikTok to GIF — Convert TikTok Videos to GIF Free (2026)',
  description: 'How to convert a TikTok video to a GIF — step by step. Download the MP4 with TokDown first, then convert to GIF with free tools. Works on iPhone, Android, PC.',
  alternates: { canonical: `${BASE}${SLUG}` },
  openGraph: {
    title: 'TikTok to GIF — Convert TikTok Videos to GIF Free (2026)',
    description: 'Step-by-step guide to turning any TikTok video into a GIF. Download the video first, then use a free GIF converter. Works on all devices.',
    url: `${BASE}${SLUG}`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Convert a TikTok Video to GIF (2026)',
    description: 'A two-step guide to turning any TikTok video into a GIF: download the MP4 with TokDown, then convert it to GIF using a free tool.',
    url: `${BASE}${SLUG}`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-10',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: { '@type': 'Organization', name: 'TokDown', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}${SLUG}` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to convert a TikTok video to GIF',
    totalTime: 'PT3M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Download the TikTok video as MP4', text: 'Copy the TikTok link, paste it into TokDown, and download the HD MP4 version without watermark.' },
      { '@type': 'HowToStep', position: 2, name: 'Open a free GIF converter', text: 'Use a free online tool such as Ezgif.com or GIPHY to convert your MP4 to GIF.' },
      { '@type': 'HowToStep', position: 3, name: 'Upload the MP4 and set options', text: 'Upload the downloaded MP4 file. Set the start time, end time (GIFs work best at 3–6 seconds), and frame rate.' },
      { '@type': 'HowToStep', position: 4, name: 'Generate and download the GIF', text: 'Click Convert and download the resulting GIF file. It is ready to share on any platform.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Can I convert TikTok to GIF directly?', acceptedAnswer: { '@type': 'Answer', text: 'TokDown does not output GIF files directly — it downloads MP4. To get a GIF, download the MP4 first and then use a free online converter like Ezgif.com. The two-step process takes about 2 minutes total.' } },
      { '@type': 'Question', name: 'What is the best free TikTok to GIF converter?', acceptedAnswer: { '@type': 'Answer', text: 'Ezgif.com is the most reliable free option — it supports MP4 uploads, lets you trim the clip, control frame rate, and resize before converting. GIPHY also supports MP4 uploads and hosts the GIF for sharing.' } },
      { '@type': 'Question', name: 'Why is my TikTok GIF low quality?', acceptedAnswer: { '@type': 'Answer', text: 'GIFs are inherently lower quality than MP4 because they are limited to 256 colors and no audio. For best results: use the HD MP4 from TokDown as the source, keep the GIF under 6 seconds, and set a frame rate of 15–20fps. Longer GIFs will also be very large in file size.' } },
      { '@type': 'Question', name: 'Can I make a GIF from TikTok on iPhone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Download the TikTok MP4 using TokDown in Safari on iPhone, then use the Shortcuts app or a GIF-maker app to convert it. Alternatively, upload the MP4 to Ezgif.com in Mobile Safari and convert it in-browser — no app download needed.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'TikTok to GIF', item: `${BASE}${SLUG}` },
    ],
  },
]

const STEPS = [
  { n: 1, title: 'Download the TikTok video as MP4', body: 'Copy the TikTok share link, paste it into TokDown, and click "HD · No Watermark" to download the clean MP4. This is your GIF source file — HD gives you the best output.' },
  { n: 2, title: 'Open Ezgif.com in your browser', body: 'Go to ezgif.com/video-to-gif in any browser. This free tool requires no account, has no watermark on output, and works on all devices.' },
  { n: 3, title: 'Upload the MP4 and trim the clip', body: 'Click "Choose File" and select your downloaded TikTok MP4. Set the start and end time to isolate the clip you want — GIFs work best at 3–6 seconds. Longer clips result in massive file sizes.' },
  { n: 4, title: 'Set frame rate and size', body: 'A frame rate of 15fps is a good balance between smoothness and file size. You can also resize the GIF (320px wide is standard for messaging apps). Click "Convert to GIF".' },
  { n: 5, title: 'Download and share the GIF', body: 'Click the "Save" button to download the GIF. It is ready to share on Twitter, Discord, Reddit, WhatsApp (as a video/GIF), or anywhere else that accepts GIFs.' },
]

const TOOLS = [
  { name: 'Ezgif.com', platform: 'Web (all devices)', pros: 'Free, no watermark, trim + resize controls', cons: 'Upload limit 100MB' },
  { name: 'GIPHY', platform: 'Web + iOS/Android app', pros: 'Hosts GIF for easy sharing link', cons: 'GIF is public on GIPHY by default' },
  { name: 'CapCut', platform: 'iOS + Android', pros: 'Edit first, then export as GIF', cons: 'App install required' },
  { name: 'Shortcuts (iPhone)', platform: 'iOS only', pros: 'Fully offline, saves to Photos', cons: 'Requires setup of a shortcut workflow' },
]

export default function TikTokToGif() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">
          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              TikTok to GIF — Free Conversion
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Convert any TikTok video into a shareable GIF in two steps — download the clean MP4 first, then convert it with a free tool. No watermark, no account needed.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>How to convert TikTok to GIF</h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="faq-item flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black" style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)' }}>{n}</span>
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12 text-center">
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Step 1 starts here — download the clean TikTok MP4 first.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90" style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}>
              Download TikTok as MP4 →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tools-h">
            <h2 id="tools-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Best free TikTok to GIF tools</h2>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,45,85,0.08)' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Tool</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Platform</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Pros</th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--t2)' }}>Cons</th>
                  </tr>
                </thead>
                <tbody>
                  {TOOLS.map(({ name, platform, pros, cons }, i) => (
                    <tr key={name} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: i === 0 ? '#ff2d55' : 'var(--t2)' }}>{name}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t3)' }}>{platform}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t3)' }}>{pros}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--t4)' }}>{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>Related guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/guide/tiktok-to-mp4', icon: '🎬', title: 'TikTok to MP4', desc: 'Download TikTok videos as MP4 files in HD quality.' },
                { href: '/guide/tiktok-to-mp3', icon: '🎵', title: 'TikTok to MP3', desc: 'Extract the audio from any TikTok video as an MP3.' },
                { href: '/guide/download-tiktok-without-watermark', icon: '🚫', title: 'No Watermark Guide', desc: 'Full guide for all devices including PC and Mac.' },
                { href: '/guide/tiktok-downloader-chrome', icon: '🌐', title: 'Download in Chrome', desc: 'How to download TikTok videos in Google Chrome.' },
              ].map(({ href, icon, title, desc }) => (
                <Link key={href} href={href} className="feature-card no-underline" style={{ display: 'block' }}>
                  <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>{title}</h3>
                  <p className="text-xs" style={{ color: 'var(--t4)' }}>{desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[{ href: '/', label: 'Downloader' }, { href: '/about', label: 'About' }, { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' }, { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' }, { href: '/privacy', label: 'Privacy' }, { href: '/terms', label: 'Terms' }].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
