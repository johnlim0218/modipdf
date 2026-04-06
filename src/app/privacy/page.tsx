import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ModiPDF Privacy Policy. Learn how ModiPDF protects your data — all PDF processing happens locally in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            ModiPDF
          </span>
        </a>
      </nav>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Last updated: April 6, 2026
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
              This Privacy Policy explains what information we collect, how we
              use it, and your rights regarding your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. No File Uploads — Local Processing Only
            </h2>
            <p>
              ModiPDF processes all PDF files entirely within your web browser
              using client-side JavaScript and WebAssembly technology (PDF-lib).
              Your files are <strong>never uploaded</strong> to any server. All
              editing, merging, splitting, compressing, and converting operations
              happen locally on your device.
            </p>
            <p className="mt-3">
              This means we have <strong>no access</strong> to the content of
              your documents at any time. Once you close or refresh the browser
              tab, all file data is permanently removed from memory.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Information We Collect
            </h2>
            <p>While we do not collect your files, we may collect:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Usage analytics:</strong> Anonymous usage data such as
                page views, feature usage, and general interaction patterns to
                improve the Service. This data does not include any personally
                identifiable information.
              </li>
              <li>
                <strong>Device information:</strong> Basic technical information
                such as browser type, operating system, and screen resolution to
                ensure compatibility and optimize the user experience.
              </li>
              <li>
                <strong>Cookies:</strong> We use essential cookies to ensure the
                website functions properly. Third-party advertising partners
                (such as Google AdSense) may also use cookies to serve relevant
                ads. See Section 5 for details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. How We Use Your Information
            </h2>
            <p>The limited information we collect is used to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Maintain and improve the functionality of ModiPDF</li>
              <li>Analyze usage trends to prioritize new features</li>
              <li>Ensure the Service is compatible with popular browsers</li>
              <li>Display relevant advertising through Google AdSense</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Third-Party Advertising (Google AdSense)
            </h2>
            <p>
              ModiPDF uses Google AdSense to display advertisements. Google
              AdSense may use cookies and similar technologies to serve ads based
              on your prior visits to this website or other websites. Google uses
              advertising cookies to enable it and its partners to serve ads
              based on your visit to our site and/or other sites on the internet.
            </p>
            <p className="mt-3">
              You may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google Ads Settings
              </a>
              . For more information about how Google uses data, please visit{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google&apos;s Privacy &amp; Terms
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Data Retention
            </h2>
            <p>
              Since your files are processed locally in your browser, we do not
              store any document data. Files exist only in your browser&apos;s
              memory during your session and are automatically discarded when you
              close the tab or navigate away from the page.
            </p>
            <p className="mt-3">
              Anonymous analytics data may be retained for up to 26 months to
              help us understand long-term usage trends.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Data Security
            </h2>
            <p>
              Because ModiPDF operates entirely in your browser, your documents
              benefit from the security of your own device and browser
              environment. No file data travels over the network, which
              eliminates the risk of interception or server-side data breaches
              related to your documents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Children&apos;s Privacy
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
              9. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Opt out of personalized advertising via Google Ads Settings
              </li>
              <li>
                Disable cookies through your browser settings at any time
              </li>
              <li>
                Request information about any data we may have collected
              </li>
              <li>
                Request deletion of any analytics data associated with your
                usage
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Changes to This Privacy Policy
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
              11. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please reach out to us through our website at modipdf.vercel.app.
            </p>
          </section>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100">
        <p>
          &copy; {new Date().getFullYear()} ModiPDF &mdash; Free Online PDF
          Editor
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a
            href="/privacy"
            className="hover:text-indigo-600 transition-colors"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-indigo-600 transition-colors">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
