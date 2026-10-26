import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ModiPDF Privacy Policy. Learn how ModiPDF protects your data — all PDF processing happens locally in your browser.",
  alternates: { canonical: "/privacy" },
};

const linkClass = "text-indigo-600 hover:underline";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <SiteHeader />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Last updated: October 27, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Overview
            </h2>
            <p>
              ModiPDF (&quot;we&quot;, &quot;our&quot;, or &quot;the
              Service&quot;) is a free, browser-based PDF editing tool available
              at modipdf.vercel.app. We are committed to protecting your privacy.
              This Privacy Policy explains what information is collected when
              you use the Service, how it is used, and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. No File Uploads — Local Processing Only
            </h2>
            <p>
              ModiPDF processes all PDF and image files entirely within your web
              browser using client-side JavaScript libraries (pdf-lib for
              creating and modifying PDFs, and PDF.js for rendering page
              previews). Your files are <strong>never uploaded</strong> to our
              servers. Merging, reordering, rotating, and deleting pages, adding
              text, images, shapes, and signatures, and exporting the final PDF
              all happen locally on your device.
            </p>
            <p className="mt-3">
              This means we have <strong>no access</strong> to the content of
              your documents at any time. Once you close or refresh the browser
              tab, all file data is removed from your browser&apos;s memory.
              To display page previews, your browser downloads the PDF.js
              rendering script from a public content delivery network
              (unpkg.com); this request contains no document data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Information We Collect
            </h2>
            <p>
              We do not ask you to create an account or provide personal
              information, and we do not run our own analytics. However, some
              information is processed automatically:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Server and hosting logs:</strong> Like most websites,
                our hosting provider (Vercel) may automatically record standard
                technical information when your browser requests a page, such as
                your IP address, browser type, the page requested, and the time
                of the request. These logs are used for security and to keep
                the site running, and they never contain the contents of your
                files.
              </li>
              <li>
                <strong>Cookies and similar technologies:</strong> We do not set
                our own tracking cookies. Third-party advertising partners,
                including Google, may use cookies, web beacons, and similar
                technologies to serve and measure ads. See Section 4 for
                details.
              </li>
              <li>
                <strong>Information you send us:</strong> If you contact us by
                email, we receive your email address and the contents of your
                message, which we use only to respond to you.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Advertising and Cookies (Google AdSense)
            </h2>
            <p>
              ModiPDF uses Google AdSense to display advertisements, which keeps
              the Service free. In connection with these ads:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Third-party vendors, including Google, use cookies to serve ads
                based on a user&apos;s prior visits to this website or other
                websites.
              </li>
              <li>
                Google&apos;s use of advertising cookies, including the
                DoubleClick cookie, enables it and its partners to serve ads to
                you based on your visit to this site and/or other sites on the
                Internet.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>
                You can also opt out of some third-party vendors&apos; use of
                cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  www.aboutads.info/choices
                </a>{" "}
                or, if you are in Europe,{" "}
                <a
                  href="https://www.youronlinechoices.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  www.youronlinechoices.eu
                </a>
                .
              </li>
            </ul>
            <p className="mt-3">
              If you opt out of personalized advertising, you may still see ads,
              but they will not be based on your browsing history. For more
              information, see{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                How Google uses information from sites or apps that use our
                services
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Visitors in the EEA, UK, and Switzerland
            </h2>
            <p>
              If you visit ModiPDF from the European Economic Area, the United
              Kingdom, or Switzerland, we ask for your consent before cookies or
              local storage are used for personalized advertising, where
              required by law. This consent is requested through a
              Google-certified consent management platform (CMP). You can
              change or withdraw your consent at any time using the privacy
              settings made available by that consent message. If you do not
              consent, Google may still show non-personalized or limited ads,
              which use cookies only for purposes such as frequency capping,
              aggregated reporting, and combating fraud and abuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. How We Use Information
            </h2>
            <p>The limited information described above is used to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Operate, secure, and maintain ModiPDF</li>
              <li>Display advertising through Google AdSense</li>
              <li>Respond to messages you send us</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information, and we never have access
              to the documents you edit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Data Retention
            </h2>
            <p>
              Since your files are processed locally in your browser, we do not
              store any document data. Files exist only in your browser&apos;s
              memory during your session and are discarded when you close the
              tab or navigate away from the page. Hosting logs are retained by
              our hosting provider according to its own retention policies.
              Cookies set by advertising partners are governed by those
              partners&apos; policies. Emails you send us are kept only as long
              as needed to handle your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Data Security
            </h2>
            <p>
              Because ModiPDF edits documents entirely in your browser, your
              files never travel over the network to our servers, which removes
              the risk of server-side breaches involving your documents. The
              site is served over HTTPS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Children&apos;s Privacy
            </h2>
            <p>
              ModiPDF is not directed at children under the age of 13. We do not
              knowingly collect personal information from children. If you
              believe that a child has provided us with personal information,
              please contact us and we will take steps to delete such
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Your Choices and Rights
            </h2>
            <p>You can:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Opt out of personalized advertising via{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Google Ads Settings
                </a>
              </li>
              <li>
                Block or delete cookies through your browser settings at any
                time
              </li>
              <li>
                Depending on where you live, request access to or deletion of
                personal information we hold about you (for example, emails you
                have sent us)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will post the updated version on this page
              with a revised &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                {CONTACT_EMAIL}
              </a>{" "}
              or visit our{" "}
              <Link href="/contact" className={linkClass}>
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
