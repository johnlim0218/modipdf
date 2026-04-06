"use client";

import React from "react";
import { Upload } from "lucide-react";
import AdSlot from "@/components/AdSlot";

interface LandingPageProps {
  onFileSelect: (files: File[]) => void;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ModiPDF",
  url: "https://modipdf.vercel.app",
  description:
    "Free online PDF editor. Merge, split, and edit PDF pages right in your browser.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "PDF Merge",
    "PDF Split",
    "PDF Page Editing",
    "Drag & Drop Support",
    "Image Conversion",
  ],
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  softwareVersion: "1.0",
  author: {
    "@type": "Organization",
    name: "ModiPDF",
  },
};

const features = [
  {
    icon: "🔀",
    title: "Merge PDF Files",
    desc: "Combine multiple PDF documents into a single file in seconds. Simply upload your PDFs, arrange them in the order you need, and download the merged result. Perfect for combining reports, contracts, and presentations.",
  },
  {
    icon: "✂️",
    title: "Split PDF Pages",
    desc: "Extract specific pages or split a large PDF into smaller files. Select the exact pages you need and create separate documents instantly — no software installation required.",
  },
  {
    icon: "🗜️",
    title: "Compress PDF",
    desc: "Reduce PDF file size without sacrificing quality. Our compression tool optimizes images and removes unnecessary data to make your PDFs smaller for easy sharing via email or cloud storage.",
  },
  {
    icon: "🖼️",
    title: "Convert Images to PDF",
    desc: "Turn JPG, PNG, and other image formats into PDF documents with a single click. Great for scanning documents, creating photo albums, or archiving images in a universally compatible format.",
  },
  {
    icon: "🔒",
    title: "100% Private & Secure",
    desc: "All PDF processing happens entirely in your browser using WebAssembly technology. Your files are never uploaded to any server — your documents stay private on your device at all times.",
  },
  {
    icon: "⚡",
    title: "Fast & Free",
    desc: "No registration, no subscription, and no hidden fees. ModiPDF is completely free to use. Processing happens locally in your browser, making it fast even for large documents.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload Your PDF",
    desc: "Click the upload area or drag and drop your PDF files directly onto the page. You can upload multiple files at once.",
  },
  {
    step: "2",
    title: "Edit & Arrange",
    desc: "Use the intuitive editor to reorder pages, delete unwanted pages, merge files, or split documents. Everything is visual and drag-and-drop friendly.",
  },
  {
    step: "3",
    title: "Download Your Result",
    desc: "When you're satisfied with your edits, click Download to save the final PDF directly to your device. No account needed.",
  },
];

const useCases = [
  {
    title: "For Students & Academics",
    desc: "Combine lecture notes, research papers, and assignments into a single organized PDF. Split lengthy textbooks into chapter-level files for easier study sessions. Convert scanned handwritten notes into clean PDF documents.",
    audience: "Students, researchers, educators",
  },
  {
    title: "For Business Professionals",
    desc: "Merge contracts, proposals, and invoices into consolidated files for clients. Split large reports into department-specific sections for targeted distribution. Compress presentations before emailing to keep file sizes manageable.",
    audience: "Managers, accountants, HR teams",
  },
  {
    title: "For Freelancers & Creatives",
    desc: "Combine portfolio pieces into a single PDF showcase. Rearrange pages to create the perfect project presentation order. Convert design mockups from images into professional PDF format for client review.",
    audience: "Designers, writers, consultants",
  },
  {
    title: "For Everyday Use",
    desc: "Merge scanned receipts and documents for tax filing. Split a multi-page form to fill out and return only the pages you need. Compress large photo albums converted to PDF for easy sharing with family and friends.",
    audience: "Anyone working with PDFs",
  },
];

const comparisons = [
  {
    feature: "Price",
    modipdf: "100% Free",
    others: "Subscription required ($12–20/mo)",
  },
  {
    feature: "File Privacy",
    modipdf: "Files stay on your device",
    others: "Files uploaded to cloud servers",
  },
  {
    feature: "Account Required",
    modipdf: "No account needed",
    others: "Registration required",
  },
  {
    feature: "Processing Speed",
    modipdf: "Instant (local processing)",
    others: "Depends on upload/download speed",
  },
  {
    feature: "File Size Limit",
    modipdf: "Limited only by your device",
    others: "Typically 25–100 MB per file",
  },
  {
    feature: "Internet Needed",
    modipdf: "Only to load the page",
    others: "Required for all operations",
  },
];

const faqs = [
  {
    q: "Is ModiPDF really free?",
    a: "Yes, ModiPDF is completely free to use. There are no hidden costs, no subscription fees, and no limits on the number of files you can process.",
  },
  {
    q: "Do my files get uploaded to a server?",
    a: "No. All PDF processing is done locally in your web browser using WebAssembly (PDF-lib). Your files never leave your device, so your documents remain completely private.",
  },
  {
    q: "What file formats does ModiPDF support?",
    a: "ModiPDF supports PDF files as the primary format. You can also upload JPG and PNG images to convert them into PDF documents.",
  },
  {
    q: "Is there a file size limit?",
    a: "Since processing happens in your browser, the practical limit depends on your device's memory. Most modern computers handle PDFs up to several hundred megabytes without any issues.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account or registration is required. Simply visit the site, upload your files, make your edits, and download the result.",
  },
  {
    q: "Which browsers are supported?",
    a: "ModiPDF works on all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari. We recommend using the latest version for the best experience.",
  },
];

export default function LandingPage({ onFileSelect }: LandingPageProps) {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      onFileSelect(Array.from(e.dataTransfer.files));
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(Array.from(e.target.files));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold"
            aria-hidden="true"
          >
            M
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            ModiPDF
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <a
            href="#features"
            className="hover:text-indigo-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-indigo-600 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#use-cases"
            className="hover:text-indigo-600 transition-colors"
          >
            Use Cases
          </a>
          <a
            href="#comparison"
            className="hover:text-indigo-600 transition-colors"
          >
            Compare
          </a>
          <a href="#faq" className="hover:text-indigo-600 transition-colors">
            FAQ
          </a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center px-4 pb-20">
        {/* Hero Section */}
        <section
          className="text-center mb-12 max-w-3xl pt-20"
          aria-label="Introduction"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Free Online PDF Editor <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              ModiPDF
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Merge, split, compress, and edit PDF pages right in your browser.
            Fast, secure, and 100% free — no installation or account required.
          </p>
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400">
            <span className="flex items-center gap-1">🔒 No file upload</span>
            <span className="flex items-center gap-1">⚡ Works instantly</span>
            <span className="flex items-center gap-1">💳 No credit card</span>
            <span className="flex items-center gap-1">
              🌐 Works in all browsers
            </span>
          </div>
        </section>

        {/* Upload Card */}
        <section
          className="w-full max-w-4xl relative z-10"
          aria-label="File upload"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>

          <div
            className="relative w-full bg-white rounded-2xl shadow-2xl p-12 md:p-20 text-center border border-gray-100 cursor-pointer hover:border-indigo-100 transition-all group"
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
            role="button"
            tabIndex={0}
            aria-label="PDF file upload area"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                document.getElementById("file-upload")?.click();
              }
            }}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={onChange}
              aria-label="Select PDF files"
            />

            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Upload
                size={32}
                className="text-indigo-600"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Upload your PDF files
            </h2>
            <p className="text-gray-500 mb-8">
              Drag &amp; drop files here or click to browse
            </p>

            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
              Choose Files
            </button>
            <p className="text-xs text-gray-400 mt-4">
              Supports PDF, JPG, PNG · All processing done locally in your
              browser
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full max-w-5xl mt-24"
          aria-label="Features"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Everything You Need to Work with PDFs
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              ModiPDF provides all essential PDF tools in one place — completely
              free and running entirely in your browser with no data ever sent
              to a server.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-indigo-100 transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full max-w-4xl mt-24"
          aria-label="How to use ModiPDF"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              How to Edit Your PDF in 3 Simple Steps
            </h2>
            <p className="text-gray-500">
              No sign-up, no waiting — just fast, browser-based PDF editing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div
                key={s.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-extrabold mb-4 shadow-lg shadow-indigo-200">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Ad Slot: Between content sections */}
        <div className="w-full max-w-4xl mt-16">
          <AdSlot slot="landing-mid-content" format="horizontal" />
        </div>

        {/* Use Cases Section */}
        <section
          id="use-cases"
          className="w-full max-w-5xl mt-24"
          aria-label="Use cases"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Who Uses ModiPDF?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From students to business professionals, ModiPDF helps thousands
              of people work with PDFs every day — completely free and private.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <article
                key={uc.title}
                className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:border-indigo-100 transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {uc.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  {uc.desc}
                </p>
                <span className="inline-block text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium">
                  {uc.audience}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section
          id="comparison"
          className="w-full max-w-4xl mt-24"
          aria-label="Comparison with other PDF tools"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Why Choose ModiPDF Over Other PDF Tools?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Unlike traditional PDF editors that require subscriptions and
              upload your files to the cloud, ModiPDF keeps your data private
              and costs nothing.
            </p>
          </div>
          <div className="overflow-hidden border border-gray-100 rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-indigo-600">
                    ModiPDF
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-400">
                    Other PDF Tools
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                  >
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3 text-indigo-600 font-medium">
                      {row.modipdf}
                    </td>
                    <td className="px-6 py-3 text-gray-400">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* In-Depth Guide Section */}
        <section
          className="w-full max-w-4xl mt-24"
          aria-label="PDF editing guide"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              The Complete Guide to PDF Editing in Your Browser
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Learn how to get the most out of ModiPDF with these detailed
              guides for common PDF tasks.
            </p>
          </div>

          <div className="space-y-8">
            <article className="p-8 bg-white border border-gray-100 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How to Merge Multiple PDF Files into One
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Merging PDFs is one of the most common document tasks, whether
                you need to combine invoices for accounting, compile research
                papers for a literature review, or assemble a multi-section
                report for a client presentation.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                With ModiPDF, merging is simple: upload all the PDF files you
                want to combine by dragging them into the upload area. The
                editor will display thumbnails of every page from each file.
                You can then drag and drop individual pages or entire documents
                to rearrange them in any order. Once satisfied, click Download
                to save the combined PDF.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Unlike cloud-based tools, ModiPDF performs the merge operation
                entirely in your browser. This means there are no file size
                limits imposed by a server, no waiting for uploads and
                downloads, and no risk of your confidential documents being
                stored on a third-party server.
              </p>
            </article>

            <article className="p-8 bg-white border border-gray-100 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How to Split a PDF into Separate Files
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Sometimes you receive a large PDF that contains more
                information than you need. Perhaps it is a 50-page report but
                you only need pages 12 through 18, or a scanned document where
                only certain sections are relevant.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                ModiPDF makes it easy to extract the exact pages you need.
                Upload your PDF, then select the specific pages in the
                navigation panel — you can click individual pages or
                shift-click to select a range. Delete the pages you do not
                need, and the remaining pages will form your new document.
                Download the result and you have a clean, trimmed PDF.
              </p>
              <p className="text-gray-500 leading-relaxed">
                This approach is especially useful for legal documents,
                academic papers, and government forms where you often need to
                submit or share only specific sections rather than the entire
                file.
              </p>
            </article>

            <article className="p-8 bg-white border border-gray-100 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How to Convert Images to PDF
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Need to convert photos of receipts, whiteboard notes, or
                design mockups into a PDF? ModiPDF supports JPG and PNG image
                formats. Simply drag your images into the upload area and they
                will be automatically converted into PDF pages.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                You can combine images with existing PDF files, rearrange
                pages freely, and download a single unified document. This is
                perfect for creating portfolios, archiving scanned documents,
                or preparing image-based reports.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Because everything happens locally in your browser, even large
                batches of high-resolution images can be processed quickly
                without any upload wait times.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full max-w-3xl mt-24"
          aria-label="Frequently Asked Questions"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500">
              Everything you need to know about ModiPDF.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border border-gray-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  {faq.q}
                  <span className="text-indigo-500 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
                    +
                  </span>
                </summary>
                <div className="px-6 py-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 bg-gray-50">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Ad */}
        <div className="w-full max-w-4xl mt-16">
          <AdSlot slot="landing-bottom" format="horizontal" />
        </div>

        {/* CTA Section */}
        <section
          className="w-full max-w-3xl mt-16 text-center"
          aria-label="Call to action"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-extrabold mb-4">
              Ready to Edit Your PDF?
            </h2>
            <p className="text-indigo-100 mb-8">
              Start editing for free right now — no account, no limits, no cost.
            </p>
            <button
              className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Get Started — It&apos;s Free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100 mt-16">
        <p className="mb-2">
          © {new Date().getFullYear()} ModiPDF — Free Online PDF Editor. All
          processing is done securely in your browser.
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

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-white -z-10"></div>
    </div>
  );
}
