import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'

const BASE = 'https://tokdown.org'

export const metadata: Metadata = {
  title: 'Disclaimer — TikTok Downloader',
  description: 'Disclaimer for TikTok Downloader. This tool is independent of TikTok and ByteDance. Read our limitations of liability, user responsibilities, and copyright notice.',
  alternates: { canonical: `${BASE}/disclaimer` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Disclaimer — TikTok Downloader',
    description: 'This service is independent of TikTok and ByteDance. Read our full disclaimer covering liability, user responsibility, and copyright.',
    url: `${BASE}/disclaimer`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Disclaimer — TikTok Downloader',
    description: 'This service is independent of TikTok and ByteDance. Read our full disclaimer.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'TikTok Downloader', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Disclaimer', item: `${BASE}/disclaimer` },
  ],
}

const UPDATED = 'April 24, 2025'

export default function DisclaimerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <LegalLayout
      title="Disclaimer"
      subtitle="Important information about the nature and limitations of this Service."
      lastUpdated={UPDATED}
      sections={[
        {
          title: '1. No Affiliation with TikTok',
          content: (
            <p>
              TikTok Downloader is an <strong style={{ color: 'white' }}>independent, privately operated
              web service</strong> and has absolutely no affiliation, association, authorization,
              endorsement, or connection with TikTok, TikTok Ltd, ByteDance Ltd, or any of their
              subsidiaries or affiliates. "TikTok" is a registered trademark of ByteDance Ltd.
              Any reference to "TikTok" on this site is solely for descriptive purposes to identify
              the platform whose publicly accessible content this tool is designed to work with.
            </p>
          ),
        },
        {
          title: '2. We Do Not Host Content',
          content: (
            <>
              <p>
                This Service <strong style={{ color: 'white' }}>does not store, host, upload, or
                redistribute</strong> any video or audio content. We do not operate a content
                delivery network for media files.
              </p>
              <p>
                The Service functions as a technical intermediary: it retrieves publicly accessible
                metadata and direct media URLs from TikTok's own servers, and streams that content
                directly from TikTok's infrastructure to the user's device at the user's request.
                No copy of any video or audio file is saved on our servers at any point.
              </p>
            </>
          ),
        },
        {
          title: '3. User Responsibility',
          content: (
            <>
              <p>
                <strong style={{ color: 'white' }}>You, the user, are solely and exclusively
                responsible</strong> for:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Ensuring you have the legal right to download any content you retrieve through this Service.</li>
                <li>How you use, store, share, or distribute any downloaded content.</li>
                <li>Compliance with TikTok's Terms of Service and Community Guidelines.</li>
                <li>Compliance with all applicable copyright laws in your jurisdiction.</li>
                <li>Obtaining permission from the original content creator before downloading their work.</li>
                <li>Any legal claims, damages, or liabilities that may arise from your use of downloaded content.</li>
              </ul>
              <p>
                We expressly disclaim any liability for how users choose to use content downloaded
                through this Service. The Service is intended for lawful personal use only.
              </p>
            </>
          ),
        },
        {
          title: '4. Copyright Notice',
          content: (
            <p>
              All video and audio content accessible via this Service is protected by copyright
              law and belongs to the original content creators and/or the platform (TikTok / ByteDance).
              Downloading copyrighted content without the permission of the copyright holder may
              constitute infringement under the Digital Millennium Copyright Act (DMCA),
              EU Directive 2001/29/EC on copyright, and equivalent legislation worldwide.
              We neither encourage nor condone copyright infringement.
            </p>
          ),
        },
        {
          title: '5. Service Availability',
          content: (
            <p>
              This Service depends on the continued public accessibility of TikTok's API and content
              delivery infrastructure. We make no guarantee that the Service will function at all
              times, or that it will continue to work if TikTok modifies its platform. The Service
              is provided "as is" with no uptime guarantee. We reserve the right to discontinue
              the Service at any time without prior notice.
            </p>
          ),
        },
        {
          title: '6. No Warranties',
          content: (
            <p>
              THIS SERVICE IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED. WE MAKE NO REPRESENTATIONS OR WARRANTIES REGARDING THE ACCURACY,
              COMPLETENESS, RELIABILITY, OR SUITABILITY OF THE SERVICE FOR ANY PURPOSE.
              YOUR USE OF THE SERVICE IS ENTIRELY AT YOUR OWN RISK.
            </p>
          ),
        },
        {
          title: '7. Limitation of Liability',
          content: (
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DIRECT,
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES OF ANY KIND
              ARISING FROM YOUR USE OF OR INABILITY TO USE THIS SERVICE, INCLUDING BUT NOT
              LIMITED TO DAMAGES FOR LOSS OF PROFITS, LOSS OF DATA, LEGAL COSTS, OR OTHER
              INTANGIBLE LOSSES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
          ),
        },
        {
          title: '8. Third-Party Links and Services',
          content: (
            <p>
              This Service may link to or interact with third-party services (including TikTok,
              Google AdSense). We have no control over the content, privacy policies, or practices
              of any third-party service and accept no responsibility for them. We encourage you
              to review the privacy policies of any third-party service you interact with.
            </p>
          ),
        },
        {
          title: '9. Changes to This Disclaimer',
          content: (
            <p>
              We reserve the right to update this Disclaimer at any time. Changes take effect
              immediately upon posting to this page. The "Last updated" date reflects the most
              recent revision. Continued use of the Service constitutes acceptance of the
              current Disclaimer.
            </p>
          ),
        },
        {
          title: '10. Contact',
          content: (
            <p>
              For any questions regarding this Disclaimer:{' '}
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
