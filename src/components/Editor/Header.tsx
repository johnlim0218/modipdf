import React, { useState } from "react";
import { Undo, Redo, Download, Share, User, Loader2 } from "lucide-react";
import { useEditor } from "./EditorContext";
import { mergePages } from "@/utils/pdf";

export default function Header() {
  const { undo, history, future, redo, pages } = useEditor();
  const [isExporting, setIsExporting] = useState(false);
  const [filename, setFilename] = useState("Untitled Document");

  const handleExport = async () => {
    if (pages.length === 0) return;
    setIsExporting(true);
    try {
      const mergedPdfBytes = await mergePages(pages);
      const blob = new Blob([mergedPdfBytes as BlobPart], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failed", e);
      alert("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center justify-between h-full px-6 bg-white border-b border-gray-100">
      {/* Left: Logo & Filename */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center font-bold">
            M
          </div>
          <span className="font-bold text-lg tracking-tight">ModiPDF</span>
        </div>
        <div className="h-6 w-px bg-gray-200"></div>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="text-sm font-medium text-gray-700 hover:bg-gray-50 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-colors"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 mr-4">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition disabled:opacity-30"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={redo}
            disabled={future.length === 0}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition disabled:opacity-30"
          >
            <Redo size={18} />
          </button>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting || pages.length === 0}
          className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
        >
          {isExporting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          Export
        </button>

        <div className="flex gap-2 ml-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
            <Share size={16} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-medium">
            G
          </button>
        </div>
      </div>
    </div>
  );
}
