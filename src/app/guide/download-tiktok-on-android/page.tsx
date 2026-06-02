import type { Metadata } from 'next'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'How to Download TikTok Videos on Android — No Watermark (2026)',
  description: 'Save any TikTok video to your Android phone without watermark. Easy Chrome guide — no app required, free, works on Samsung, Pixel and all Android devices.',
  alternates: { canonical: `${BASE}/guide/download-tiktok-on-android` },
  openGraph: {
    title: 'How to Download TikTok Videos on Android — No Watermark (2026)',
    description: 'Download TikTok videos to your Android gallery in HD without the watermark. Step-by-step Chrome guide, free, no login.',
    url: `${BASE}/guide/download-tiktok-on-android`,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Download TikTok Videos on Android Without Watermark (2026)',
    description: 'Complete guide for saving TikTok videos without watermark to an Android phone using Chrome — no app required.',
    url: `${BASE}/guide/download-tiktok-on-android`,
    datePublished: '2026-06-01',
    dateModified: '2026-06-01',
    author: { '@type': 'Organization', name: 'TokDown', url: BASE },
    publisher: {
      '@type': 'Organization',
      name: 'TokDown',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/guide/download-tiktok-on-android` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to download a TikTok video on Android without watermark',
    description: 'Save any public TikTok video to your Android phone in HD without the TikTok watermark using Chrome and TokDown.',
    totalTime: 'PT1M',
    tool: [{ '@type': 'HowToTool', name: 'Android phone with Chrome browser' }, { '@type': 'HowToTool', name: 'TokDown (tokdown.org)' }],
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Open TikTok and copy the video link', text: 'Open the TikTok app on your Android phone. Find the video, tap the Share icon, and tap "Copy link".' },
      { '@type': 'HowToStep', position: 2, name: 'Open Chrome and go to TokDown', text: 'Open Chrome on your Android phone and navigate to tokdown.org.' },
      { '@type': 'HowToStep', position: 3, name: 'Paste the link and tap Download', text: 'Tap the input field and paste the TikTok link. Tap the Download button and wait for the options to load.' },
      { '@type': 'HowToStep', position: 4, name: 'Tap HD No Watermark to save', text: 'Tap "HD · No Watermark". The video downloads directly to your Android Downloads folder.' },
      { '@type': 'HowToStep', position: 5, name: 'Open the video in your Gallery', text: 'Open your phone\'s Gallery or Files app. Navigate to Downloads to find and play the saved video.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How do I save a TikTok video to my Android gallery?', acceptedAnswer: { '@type': 'Answer', text: 'Use TokDown in Chrome: copy the TikTok link, paste it on tokdown.org, tap Download, then "HD · No Watermark". The file saves to your Downloads folder and appears in your Gallery automatically.' } },
      { '@type': 'Question', name: 'Does TokDown work on Samsung phones?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TokDown works on all Android phones including Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, and others — as long as Chrome or another modern browser is installed.' } },
      { '@type': 'Question', name: 'Where do downloaded TikTok videos go on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Downloads go to your internal storage Downloads folder. You can find them in the Files app (or My Files on Samsung), and they should also appear in your Gallery or Photos app under "Downloads".' } },
      { '@type': 'Question', name: 'Do I need to install an app to download TikTok on Android?', acceptedAnswer: { '@type': 'Answer', text: 'No. TokDown is a web app. You just need Chrome (or any modern Android browser) — no installation required, and no permissions needed.' } },
      { '@type': 'Question', name: 'Can I download TikTok videos without the watermark on Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. TokDown fetches the original video file from TikTok\'s servers, which does not have the watermark applied. The "HD · No Watermark" download option gives you the clean version.' } },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE}/guide` },
      { '@type': 'ListItem', position: 3, name: 'Download TikTok on Android', item: `${BASE}/guide/download-tiktok-on-android` },
    ],
  },
]

const STEPS = [
  {
    n: 1,
    title: 'Open TikTok and copy the video link',
    body: 'Open the TikTok app on your Android phone. Find the video you want to save, then tap the Share icon (arrow) on the right side. In the share sheet, tap "Copy link".',
  },
  {
    n: 2,
    title: 'Open Chrome and go to TokDown',
    body: 'Open Google Chrome on your Android phone (or any browser except the TikTok in-app browser). Type tokdown.org in the address bar and load the page.',
  },
  {
    n: 3,
    title: 'Paste the link and tap Download',
    body: 'Tap the input field on TokDown. Long-press and tap Paste to insert the TikTok URL. Tap the red Download button.',
  },
  {
    n: 4,
    title: 'Choose HD · No Watermark',
    body: 'Wait a few seconds while TokDown fetches the video. When the download options appear, tap "HD · No Watermark" to save the clean, high-definition video.',
  },
  {
    n: 5,
    title: 'Find it in your Gallery',
    body: 'The file downloads to your Android Downloads folder. Open the Files app or your Gallery app — look under Downloads or Recent photos. The video is ready to watch and share.',
  },
]

const TIPS = [
  {
    title: 'Use Chrome, not TikTok\'s in-app browser',
    body: 'When you open a link inside TikTok, it uses a built-in browser that blocks file downloads. Always open tokdown.org in Chrome or Firefox separately.',
  },
  {
    title: 'Grant storage permission if asked',
    body: 'The first time you download a file in Chrome on some older Android versions, you may be asked to allow storage access. Tap "Allow" to proceed. On Android 11+ this is automatic.',
  },
  {
    title: 'Chrome Downloads shortcut',
    body: 'In Chrome, tap the three-dot menu → Downloads to see all files you have downloaded. This is a fast way to find the video after saving.',
  },
  {
    title: 'Moving videos to Google Photos',
    body: 'Downloaded TikTok videos appear in Google Photos automatically if you have backup enabled, or you can find them in the Downloads album in the Gallery app.',
  },
]

const TROUBLESHOOT = [
  {
    problem: 'Video does not appear in Gallery after downloading',
    fix: 'Open the Files app and navigate to Internal Storage → Downloads. The video is there. To add it to the Gallery, some phones need you to open the media scanner. The easiest way: rename the file slightly (add a space) and rename it back — this triggers a media scan.',
  },
  {
    problem: 'Download starts but fails partway through',
    fix: 'A weak signal can interrupt downloads. Move closer to your Wi-Fi router or switch from mobile data to Wi-Fi. Also check that you have enough free storage space.',
  },
  {
    problem: '"Download failed" message in Chrome',
    fix: 'Go to Chrome Settings → Site Settings → tokdown.org → make sure "Automatic downloads" is allowed, and "Notifications" and "Storage" are not blocked.',
  },
  {
    problem: 'Video downloads with no watermark but has no audio',
    fix: 'This is a rare Chrome Android issue with certain video files. Long-press the download button and tap "Save link as" to force a clean download. Alternatively, try the SD version.',
  },
]

export default function DownloadTikTokOnAndroid() {
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="relative flex flex-col min-h-screen w-full">
        <main className="relative z-10 flex flex-col items-center w-full px-4 py-12">

          <div className="w-full max-w-2xl mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--t4)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to downloader
            </Link>
          </div>

          <header className="w-full max-w-2xl mb-10 text-center">
            <p className="text-xs font-semibold mb-3 tracking-widest uppercase" style={{ color: '#ff2d55' }}>Android Guide · Updated June 2026</p>
            <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: 'var(--t1)' }}>
              How to Download TikTok Videos on Android
            </h1>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--t3)' }}>
              Save any TikTok video directly to your Android gallery in HD — without the watermark and without installing any app. Works on Chrome with every Android device.
            </p>
          </header>

          <section className="w-full max-w-2xl mb-12" aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Step-by-step: save TikTok to Android gallery
            </h2>
            <ol className="flex flex-col gap-4 list-none p-0 m-0">
              {STEPS.map(({ n, title, body }) => (
                <li key={n} className="faq-item flex gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: 'rgba(255,45,85,0.15)', color: '#ff2d55', border: '1px solid rgba(255,45,85,0.3)' }}
                  >
                    {n}
                  </span>
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
            <p className="text-sm mb-4" style={{ color: 'var(--t3)' }}>Ready? Paste your TikTok link and get the clean HD video.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #ff2d55 0%, #ff8c42 100%)' }}
            >
              Download a TikTok video →
            </Link>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="tips-h">
            <h2 id="tips-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Android tips
            </h2>
            <div className="flex flex-col gap-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: '#ff2d55' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{body}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-12" aria-labelledby="trouble-h">
            <h2 id="trouble-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Troubleshooting on Android
            </h2>
            <div className="flex flex-col gap-3">
              {TROUBLESHOOT.map(({ problem, fix }) => (
                <div key={problem} className="faq-item">
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>Problem: {problem}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}><strong style={{ color: 'var(--t2)' }}>Fix:</strong> {fix}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="mb-10 max-w-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <section className="w-full max-w-2xl mb-4" aria-labelledby="related-h">
            <h2 id="related-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>
              Related guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/guide/download-tiktok-on-iphone" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📱</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Download TikTok on iPhone</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Save TikTok videos to your iPhone Camera Roll.</p>
              </Link>
              <Link href="/guide/download-tiktok-without-watermark" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>📖</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>Full No-Watermark Guide</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Complete walkthrough for all devices including PC and Mac.</p>
              </Link>
              <Link href="/guide/tiktok-to-mp3" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎵</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP3</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Extract and save just the audio from any TikTok video.</p>
              </Link>
              <Link href="/guide/tiktok-to-mp4" className="feature-card no-underline" style={{ display: 'block' }}>
                <span className="text-2xl mb-3 block" aria-hidden>🎬</span>
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--t1)' }}>TikTok to MP4</h3>
                <p className="text-xs" style={{ color: 'var(--t4)' }}>Download any TikTok as an MP4 file for editing or sharing.</p>
              </Link>
            </div>
          </section>
        </main>

        <footer className="relative z-10 border-t text-center py-6 px-4" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'var(--t4)' }}>
          <nav className="flex flex-wrap justify-center gap-5 mb-3">
            {[
              { href: '/', label: 'Downloader' },
              { href: '/about', label: 'About' },
              { href: '/guide/download-tiktok-without-watermark', label: 'No Watermark Guide' },
              { href: '/guide/tiktok-to-mp3', label: 'TikTok to MP3' },
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs hover:underline" style={{ color: 'var(--t4)' }}>{label}</Link>
            ))}
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} TokDown. Not affiliated with TikTok or ByteDance.</p>
        </footer>
      </div>
    </>
  )
}
