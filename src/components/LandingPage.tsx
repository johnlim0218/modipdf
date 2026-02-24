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
      {/* Sidebar Ads (desktop xl+ only) */}
      <div className="hidden xl:block fixed left-4 top-1/2 -translate-y-1/2 z-10">
        <AdSlot slot="landing-sidebar-left" format="vertical" />
      </div>
      <div className="hidden xl:block fixed right-4 top-1/2 -translate-y-1/2 z-10">
        <AdSlot slot="landing-sidebar-right" format="vertical" />
      </div>
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
      </nav>

      <main className="flex-1 flex flex-col items-center pt-20 px-4 pb-20">
        {/* Hero Section */}
        <section
          className="text-center mb-12 max-w-3xl"
          aria-label="Introduction"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Free Online PDF Editor <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              ModiPDF
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Merge, split, and edit PDF pages right in your browser. Fast and
            secure — no installation required.
          </p>
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
              Drag & drop files here or click to browse
            </p>

            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
              Choose Files
            </button>
          </div>
        </section>

        {/* Ad Slot: Below Upload Card */}
        <div className="w-full max-w-4xl mt-10">
          <AdSlot slot="landing-below-upload" format="horizontal" />
        </div>

        {/* Quick Tools */}
        <section
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl w-full"
          aria-label="PDF Tools"
        >
          {[
            {
              label: "Merge PDF",
              icon: "M",
              desc: "Combine multiple PDFs into one",
            },
            {
              label: "Split PDF",
              icon: "S",
              desc: "Split a PDF into multiple files",
            },
            { label: "Compress", icon: "C", desc: "Reduce PDF file size" },
            { label: "Convert", icon: "CV", desc: "Convert images to PDF" },
          ].map((tool) => (
            <button
              key={tool.label}
              className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-indigo-100 transition gap-3 group"
              title={tool.desc}
            >
              <div
                className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition"
                aria-hidden="true"
              >
                {tool.icon}
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                {tool.label}
              </span>
            </button>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-100">
        <p>
          © {new Date().getFullYear()} ModiPDF — Free Online PDF Editor. All
          processing is done securely in your browser.
        </p>
      </footer>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-white -z-10"></div>
    </div>
  );
}
