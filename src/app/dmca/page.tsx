import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'DMCA Policy — TikTok Downloader',
  description: 'DMCA takedown policy for TikTok Downloader. Submit copyright infringement notices here.',
  robots: { index: true, follow: true },
}

const UPDATED = 'April 24, 2025'

export default function DmcaPage() {
  return (
    <LegalLayout
      title="DMCA Policy"
      subtitle="We respect intellectual property rights and respond promptly to valid takedown notices."
      lastUpdated={UPDATED}
      sections={[
        {
          title: '1. Our Position on Copyright',
          content: (
            <>
              <p>
                TikTok Downloader respects the intellectual property rights of content creators and
                complies with the Digital Millennium Copyright Act (DMCA) and equivalent copyright
                laws in other jurisdictions.
              </p>
              <p>
                <strong style={{ color: 'white' }}>Important technical clarification:</strong> This
                Service does not host, store, upload, or serve any video or audio content on its own
                servers. It acts solely as a technical intermediary that generates time-limited,
                direct links to publicly accessible content served from TikTok's own infrastructure.
                We have no control over what content TikTok makes publicly accessible.
              </p>
            </>
          ),
        },
        {
          title: '2. Reporting Copyright Infringement',
          content: (
            <>
              <p>
                If you are a copyright owner or authorized agent and believe this Service is being
                used to infringe your rights, you may submit a DMCA takedown notice to our designated
                agent.
              </p>
              <p>
                <strong style={{ color: 'white' }}>Contact:</strong>{' '}
                <a
                  href="mailto:dmca@yourdomain.com"
                  className="underline"
                  style={{ color: 'var(--brand-pink)' }}
                >
                  dmca@yourdomain.com
                </a>
              </p>
            </>
          ),
        },
        {
          title: '3. Required Information for a Valid Notice',
          content: (
            <>
              <p>
                To be valid under 17 U.S.C. § 512(c)(3), your written notice must include all of
                the following:
              </p>
              <ol className="list-decimal pl-4 space-y-2">
                <li>
                  <strong style={{ color: 'white' }}>Identification of the copyrighted work</strong> —
                  a description of the copyrighted work you claim has been infringed, or if multiple
                  works are covered by a single notification, a representative list.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Identification of the infringing material</strong> —
                  sufficient information to locate the material, including the TikTok video URL that
                  was used with our Service.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Your contact information</strong> — your full
                  legal name, mailing address, telephone number, and email address.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Good faith statement</strong> — a statement that
                  you have a good faith belief that the use of the material in the manner complained
                  of is not authorized by the copyright owner, its agent, or the law.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Accuracy statement</strong> — a statement that
                  the information in the notification is accurate, and under penalty of perjury, that
                  you are the copyright owner or authorized to act on behalf of the copyright owner.
                </li>
                <li>
                  <strong style={{ color: 'white' }}>Signature</strong> — a physical or electronic
                  signature of the copyright owner or authorized agent.
                </li>
              </ol>
            </>
          ),
        },
        {
          title: '4. Our Response Process',
          content: (
            <>
              <p>Upon receipt of a valid DMCA notice, we will:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Acknowledge receipt of your notice within <strong style={{ color: 'white' }}>48 business hours</strong>.</li>
                <li>Review the notice for completeness and validity.</li>
                <li>Take appropriate action, which may include blocking the specific URL from being processed by our Service.</li>
                <li>Notify you of the action taken.</li>
              </ul>
              <p>
                Because we do not host content, we cannot "remove" a video — the video exists on
                TikTok's servers and must be reported directly to TikTok at{' '}
                <a
                  href="https://www.tiktok.com/legal/report/Copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: 'var(--brand-pink)' }}
                >
                  tiktok.com/legal/report/Copyright
                </a>{' '}
                for removal from the source. We will block the URL from being used with our Service.
              </p>
            </>
          ),
        },
        {
          title: '5. Counter-Notification',
          content: (
            <p>
              If you believe material was wrongly blocked, you may submit a counter-notification
              under 17 U.S.C. § 512(g) to{' '}
              <a
                href="mailto:dmca@yourdomain.com"
                className="underline"
                style={{ color: 'var(--brand-pink)' }}
              >
                dmca@yourdomain.com
              </a>.
              The counter-notification must include your contact information, identification of the
              blocked URL, a statement under penalty of perjury that you have a good faith belief
              the material was blocked as a result of mistake or misidentification, and your
              consent to the jurisdiction of the relevant federal court.
            </p>
          ),
        },
        {
          title: '6. Repeat Infringers',
          content: (
            <p>
              In appropriate circumstances, we will terminate service access for users who are
              determined to be repeat infringers of intellectual property rights.
            </p>
          ),
        },
        {
          title: '7. Abuse of DMCA Process',
          content: (
            <p>
              Under 17 U.S.C. § 512(f), any person who knowingly materially misrepresents that
              material or activity is infringing may be subject to liability for damages, including
              costs and attorneys' fees incurred by the alleged infringer. Submitting false or
              misleading DMCA notices may have legal consequences.
            </p>
          ),
        },
      ]}
    />
  )
}
