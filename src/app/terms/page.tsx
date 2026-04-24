import type { Metadata } from 'next'
import LegalLayout from '@/components/legal/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Service — TikTok Downloader',
  description: 'Terms of Service for TikTok Downloader. Read the rules and conditions for using this service.',
  robots: { index: true, follow: true },
}

const UPDATED = 'April 24, 2025'

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Please read these terms carefully before using the Service."
      lastUpdated={UPDATED}
      sections={[
        {
          title: '1. Acceptance of Terms',
          content: (
            <p>
              By accessing or using TikTok Downloader ("Service"), you agree to be bound by these Terms
              of Service. If you do not agree to these terms, you must immediately stop using the Service.
              We reserve the right to modify these terms at any time. Continued use of the Service after
              any modification constitutes your acceptance of the new terms.
            </p>
          ),
        },
        {
          title: '2. Description of Service',
          content: (
            <>
              <p>
                TikTok Downloader is a web-based tool that allows users to retrieve publicly available
                TikTok video content via a URL provided by the user. The Service acts solely as a
                technical intermediary — it does not host, upload, store, or control any video or
                audio content.
              </p>
              <p>
                <strong style={{ color: 'white' }}>We do not store any video or audio files on our servers.</strong>{' '}
                All media is streamed directly from TikTok's infrastructure to the user's device.
              </p>
            </>
          ),
        },
        {
          title: '3. Permitted Use — Personal Use Only',
          content: (
            <>
              <p>
                You may only use this Service for <strong style={{ color: 'white' }}>lawful, personal,
                non-commercial purposes</strong>. Permitted uses include:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Downloading your own TikTok videos for personal backup.</li>
                <li>Downloading videos for which you have explicit permission from the copyright holder.</li>
                <li>Downloading videos that are licensed under Creative Commons or similar open licenses.</li>
              </ul>
            </>
          ),
        },
        {
          title: '4. Prohibited Use',
          content: (
            <>
              <p>You agree that you will <strong style={{ color: 'white' }}>not</strong>:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Download, reproduce, or distribute copyrighted content without the rights holder's permission.</li>
                <li>Use the Service for any commercial purpose, including reselling downloaded content.</li>
                <li>Use the Service to harass, defame, or infringe upon the rights of any third party.</li>
                <li>Attempt to circumvent, disable, or interfere with any security features of the Service.</li>
                <li>Use automated scripts, bots, or scrapers to access the Service.</li>
                <li>Use the Service in any manner that violates applicable local, national, or international law.</li>
                <li>Download private videos or content you do not have authorization to access.</li>
              </ul>
            </>
          ),
        },
        {
          title: '5. Intellectual Property & Copyright',
          content: (
            <>
              <p>
                All video and audio content accessible through this Service is owned by the original
                content creators and/or TikTok (ByteDance Ltd). We make no claim of ownership over
                any media content processed through the Service.
              </p>
              <p>
                <strong style={{ color: 'white' }}>You are solely responsible</strong> for ensuring
                you have the legal right to download and use any content retrieved via this Service.
                Downloading copyrighted content without authorization may violate copyright law,
                including the Digital Millennium Copyright Act (DMCA) in the United States and
                equivalent laws in other jurisdictions.
              </p>
            </>
          ),
        },
        {
          title: '6. No Affiliation with TikTok',
          content: (
            <p>
              This Service is an independent tool and is <strong style={{ color: 'white' }}>not
              affiliated with, endorsed by, or connected to TikTok, TikTok Ltd, or ByteDance Ltd</strong>{' '}
              in any way. "TikTok" is a trademark of ByteDance Ltd. Use of the trademark in
              this context is solely for descriptive identification purposes.
            </p>
          ),
        },
        {
          title: '7. Disclaimer of Warranties',
          content: (
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE
              WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.
            </p>
          ),
        },
        {
          title: '8. Limitation of Liability',
          content: (
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS
              OF PROFITS, DATA, OR GOODWILL, ARISING FROM OR IN CONNECTION WITH YOUR USE OF OR
              INABILITY TO USE THE SERVICE — EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY
              OF SUCH DAMAGES. OUR TOTAL CUMULATIVE LIABILITY SHALL NOT EXCEED USD $0, AS THE
              SERVICE IS PROVIDED FREE OF CHARGE.
            </p>
          ),
        },
        {
          title: '9. Indemnification',
          content: (
            <p>
              You agree to indemnify, defend, and hold harmless TikTok Downloader and its operators
              from and against any claims, liabilities, damages, judgments, awards, losses, costs,
              or expenses (including reasonable attorney's fees) arising out of or relating to your
              violation of these Terms or your use of the Service, including any content you download
              through the Service.
            </p>
          ),
        },
        {
          title: '10. Termination',
          content: (
            <p>
              We reserve the right to suspend or terminate access to the Service at any time, without
              notice, for any reason, including if we believe you have violated these Terms. Upon
              termination, your right to use the Service ceases immediately.
            </p>
          ),
        },
        {
          title: '11. Governing Law',
          content: (
            <p>
              These Terms shall be governed by and construed in accordance with applicable law.
              Any disputes arising under or in connection with these Terms shall be subject to
              the exclusive jurisdiction of the competent courts of the operator's jurisdiction.
            </p>
          ),
        },
        {
          title: '12. Contact',
          content: (
            <p>
              Questions about these Terms?{' '}
              <a
                href="mailto:legal@yourdomain.com"
                className="underline"
                style={{ color: 'var(--brand-pink)' }}
              >
                legal@yourdomain.com
              </a>
            </p>
          ),
        },
      ]}
    />
  )
}
