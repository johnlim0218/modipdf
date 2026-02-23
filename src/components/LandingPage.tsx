"use client";

import React from "react";
import { Upload } from "lucide-react";

interface LandingPageProps {
  onFileSelect: (files: File[]) => void;
}

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
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            ModiPDF
          </span>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center pt-20 px-4 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            All PDF tools <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              in one place
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Professional PDF editing made easy. Merge, split, edit, and convert
            your documents in seconds.
          </p>
        </div>

        {/* Upload Card */}
        <div className="w-full max-w-4xl relative z-10">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>

          <div
            className="relative w-full bg-white rounded-2xl shadow-2xl p-12 md:p-20 text-center border border-gray-100 cursor-pointer hover:border-indigo-100 transition-all group"
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={onChange}
            />

            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Upload size={32} className="text-indigo-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Upload your PDF file
            </h3>
            <p className="text-gray-500 mb-8">
              Drag and drop here, or click to browse
            </p>

            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">
              Choose File
            </button>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl w-full">
          {[
            { label: "Merge PDF", icon: "M" },
            { label: "Split PDF", icon: "S" },
            { label: "Compress", icon: "C" },
            { label: "Convert", icon: "CV" },
          ].map((tool) => (
            <button
              key={tool.label}
              className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-indigo-100 transition gap-3 group"
            >
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                {tool.icon}
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">
                {tool.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-white -z-10"></div>
    </div>
  );
}
