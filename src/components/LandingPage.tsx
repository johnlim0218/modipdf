"use client";

import React from "react";
import { Upload } from "lucide-react";

interface LandingPageProps {
  onFileSelect: (files: File[]) => void;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ModiPDF",
  url: "https://modipdf.vercel.app",
  description:
    "무료 온라인 PDF 편집기. PDF 병합, 분할, 페이지 편집을 브라우저에서 바로 수행하세요.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  featureList: [
    "PDF 병합",
    "PDF 분할",
    "PDF 페이지 편집",
    "드래그 앤 드롭 지원",
    "이미지 변환",
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
    <div className="flex flex-col min-h-screen bg-white font-sans">
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
        <section className="text-center mb-12 max-w-3xl" aria-label="소개">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            무료 온라인 PDF 편집기 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              ModiPDF
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            PDF 병합, 분할, 페이지 편집을 브라우저에서 바로. 설치 없이 빠르고
            안전하게 PDF를 편집하세요.
          </p>
        </section>

        {/* Upload Card */}
        <section
          className="w-full max-w-4xl relative z-10"
          aria-label="파일 업로드"
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
            aria-label="PDF 파일 업로드 영역"
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
              aria-label="PDF 파일 선택"
            />

            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Upload
                size={32}
                className="text-indigo-600"
                aria-hidden="true"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              PDF 파일을 업로드하세요
            </h2>
            <p className="text-gray-500 mb-8">
              여기에 파일을 드래그하거나 클릭하여 선택하세요
            </p>

            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
              파일 선택
            </button>
          </div>
        </section>

        {/* Quick Tools */}
        <section
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl w-full"
          aria-label="PDF 도구"
        >
          {[
            { label: "PDF 병합", icon: "M", desc: "여러 PDF를 하나로 합치기" },
            { label: "PDF 분할", icon: "S", desc: "PDF를 여러 파일로 나누기" },
            { label: "압축", icon: "C", desc: "PDF 파일 크기 줄이기" },
            { label: "변환", icon: "CV", desc: "이미지를 PDF로 변환" },
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
          © {new Date().getFullYear()} ModiPDF — 무료 온라인 PDF 편집기. 모든
          작업은 브라우저에서 안전하게 처리됩니다.
        </p>
      </footer>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-white -z-10"></div>
    </div>
  );
}
