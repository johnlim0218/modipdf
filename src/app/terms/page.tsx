import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "ModiPDF Terms of Service. Read about the terms and conditions for using our free online PDF editor.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-gray-400 mb-10">
          Last updated: April 6, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using ModiPDF (&quot;the Service&quot;) at
              modipdf.vercel.app, you agree to be bound by these Terms of
              Service (&quot;Terms&quot;). If you do not agree with any part of
              these Terms, you may not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Description of Service
            </h2>
            <p>
              ModiPDF is a free, browser-based PDF editing tool that allows you
              to merge, split, compress, rearrange, and convert PDF documents
              and images. All file processing is performed locally in your web
              browser — no files are uploaded to our servers.
            </p>
            <p className="mt-3">Key characteristics of the Service:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Client-side processing:</strong> All PDF operations use
                WebAssembly and JavaScript libraries running in your browser.
              </li>
              <li>
                <strong>No account required:</strong> You can use ModiPDF
                without creating an account or providing personal information.
              </li>
              <li>
                <strong>Free of charge:</strong> The Service is provided at no
                cost. We sustain operations through advertising.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Use of the Service
            </h2>
            <p>You agree to use ModiPDF only for lawful purposes. You may not:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Use the Service to process documents that you do not have the
                legal right to edit or distribute.
              </li>
              <li>
                Attempt to interfere with, disrupt, or reverse-engineer the
                Service or its underlying technologies.
              </li>
              <li>
                Use automated scripts, bots, or other tools to access the
                Service in a manner that impacts performance for other users.
              </li>
              <li>
                Remove, alter, or obscure any copyright, trademark, or other
                proprietary notices included in the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Intellectual Property
            </h2>
            <p>
              The ModiPDF name, logo, website design, and original code are the
              intellectual property of ModiPDF. You may not reproduce,
              distribute, or create derivative works from any part of the
              Service without our express written permission.
            </p>
            <p className="mt-3">
              You retain full ownership of all documents you process using
              ModiPDF. We make no claim to any content you create, edit, or
              download through the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Advertising
            </h2>
            <p>
              ModiPDF displays advertisements provided by third-party networks,
              including Google AdSense. These ads help support the continued
              availability of the Service at no cost to users. Ad content is
              determined by third-party providers and is not endorsed by
              ModiPDF.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Disclaimer of Warranties
            </h2>
            <p>
              ModiPDF is provided &quot;as is&quot; and &quot;as available&quot;
              without warranties of any kind, either express or implied. We do
              not guarantee that:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>The Service will be uninterrupted, error-free, or secure.</li>
              <li>
                Output files will be free of defects or suitable for any
                particular purpose.
              </li>
              <li>
                The Service will be compatible with all browsers, devices, or
                file types.
              </li>
            </ul>
            <p className="mt-3">
              You are responsible for verifying the accuracy and completeness of
              any output files before using them for important purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, ModiPDF and its
              operators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or
              related to your use of the Service. This includes but is not
              limited to loss of data, loss of profits, or damages resulting
              from errors in processed documents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Third-Party Links and Services
            </h2>
            <p>
              The Service may contain links to third-party websites or services.
              We are not responsible for the content, privacy policies, or
              practices of any third-party websites or services. Your
              interactions with third-party services are governed by their own
              terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Modifications to the Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part
              of the Service at any time without prior notice. We are not liable
              for any modification, suspension, or discontinuation of the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Changes to These Terms
            </h2>
            <p>
              We may revise these Terms from time to time. The most current
              version will always be available on this page with an updated
              &quot;Last updated&quot; date. By continuing to use the Service
              after changes are posted, you accept the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us
              through our website at modipdf.vercel.app.
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
