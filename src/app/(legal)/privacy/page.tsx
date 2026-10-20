import type { Metadata } from 'next'
import { OG_IMAGE } from '@/lib/seo'
import LegalLayout from '@/components/legal/LegalLayout'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for TikTok Downloader. We do not store your videos or personal data. Learn exactly what we collect, how we use it, and your GDPR rights.',
  alternates: { canonical: `${BASE}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Privacy Policy | TokDown',
    description: 'We do not store videos or personal data. Read our full privacy policy, data retention practices, and your rights under GDPR.',
    url: `${BASE}/privacy`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | TokDown',
    description: 'We do not store videos or personal data. Read our full privacy policy and your rights.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'TikTok Downloader', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${BASE}/privacy` },
  ],
}

const UPDATED = 'April 24, 2026'

export default function PrivacyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LegalLayout
      title="Privacy Policy"
      subtitle="We believe in full transparency about how this service handles your data."
      lastUpdated={UPDATED}
      sections={[
        {
          title: '1. Overview',
          content: (
            <>
              <p>
                This Privacy Policy applies to the TikTok Downloader web service ("Service", "we", "us", "our").
                By using the Service you agree to the practices described below.
              </p>
              <p>
                <strong style={{ color: 'white' }}>We do not store, cache, or retain any video files, audio files,
                or media content</strong> processed through this Service. All downloads are streamed directly from
                TikTok's content delivery network to your device. No copy is saved on our servers.
              </p>
            </>
          ),
        },
        {
          title: '2. Data We Collect',
          content: (
            <>
              <p><strong style={{ color: 'white' }}>Data you provide:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li>The TikTok video URL you paste into the input field. This URL is used solely to fetch video metadata and generate a download link. It is not stored after the request completes.</li>
              </ul>
              <p className="mt-2"><strong style={{ color: 'white' }}>Data collected automatically:</strong></p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong style={{ color: 'white' }}>Server logs</strong> — standard web server logs may include your IP address, browser user-agent, referrer URL, and timestamp. Logs are retained for up to 30 days for security and abuse prevention, then automatically deleted.</li>
                <li><strong style={{ color: 'white' }}>Cookies</strong> — we do not set first-party cookies. Third-party advertising partners (Google AdSense) may set cookies on your device as described in Section 5.</li>
              </ul>
            </>
          ),
        },
        {
          title: '3. How We Use Data',
          content: (
            <ul className="list-disc pl-4 space-y-1">
              <li>To process your download request and return video/audio links.</li>
              <li>To detect and prevent abuse, spam, or automated misuse of the Service.</li>
              <li>To monitor service performance and fix technical issues.</li>
              <li>We do <strong style={{ color: 'white' }}>not</strong> sell, rent, or trade any personal data to third parties.</li>
            </ul>
          ),
        },
        {
          title: '4. Data Retention',
          content: (
            <>
              <p>
                Video URLs submitted through the Service are held in server memory only for the duration of
                processing the request (typically under 5 seconds) and are never written to disk or a database.
              </p>
              <p>
                Server access logs (IP, user-agent, timestamp) are retained for a maximum of <strong style={{ color: 'white' }}>30 days</strong> and
                then permanently deleted.
              </p>
            </>
          ),
        },
        {
          title: '5. Third-Party Advertising & Cookies (Google AdSense)',
          content: (
            <>
              <p>
                This Service uses Google AdSense to serve advertisements. Google AdSense is operated by Google LLC and is subject to Google&apos;s Privacy Policy at{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: 'var(--brand-pink)' }}
                >
                  policies.google.com/privacy
                </a>.
              </p>
              <p>
                <strong style={{ color: 'white' }}>Google AdSense Disclosures &amp; Cookie Policy:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.</li>
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.</li>
                <li>
                  Users may opt out of personalized advertising by visiting Google Ads Settings at{' '}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: 'var(--brand-pink)' }}
                  >
                    adssettings.google.com
                  </a>
                  . Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    style={{ color: 'var(--brand-pink)' }}
                  >
                    www.aboutads.info/choices/
                  </a>.
                </li>
              </ul>
              <p className="mt-2">
                We also comply with Google&apos;s EU User Consent policy and the IAB Transparency and Consent Framework (TCF) where applicable.
              </p>
            </>
          ),
        },
        {
          title: '6. Children\'s Privacy',
          content: (
            <p>
              This Service is not directed to children under the age of 13. We do not knowingly collect
              personal information from children. If you believe a child has provided us with personal
              information, please contact us and we will delete it promptly.
            </p>
          ),
        },
        {
          title: '7. Your Rights',
          content: (
            <>
              <p>Depending on your jurisdiction you may have the right to:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction or deletion of your personal data.</li>
                <li>Object to or restrict processing of your personal data.</li>
                <li>Lodge a complaint with your local data protection authority.</li>
              </ul>
              <p>
                Because we do not store personal data beyond server logs (max 30 days), most requests can
                be fulfilled by simply waiting for the automatic deletion cycle.
              </p>
            </>
          ),
        },
        {
          title: '8. Changes to This Policy',
          content: (
            <p>
              We may update this Privacy Policy from time to time. The "Last updated" date at the top of
              this page will reflect any changes. Continued use of the Service after changes constitutes
              acceptance of the updated policy.
            </p>
          ),
        },
        {
          title: '9. Contact',
          content: (
            <p>
              For any privacy-related questions or requests, please contact us at:{' '}
              <a
                href="mailto:blastsky00@gmail.com"
                className="underline"
                style={{ color: 'var(--brand-pink)' }}
              >
                blastsky00@gmail.com
              </a>
            </p>
          ),
        },
      ]}
    />
    </>
  )
}
