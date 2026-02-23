"use client";

import React, { useRef } from "react";
import {
  Type,
  Image as ImageIcon,
  Highlighter,
  Square,
  PenTool,
  MousePointer,
  Hand,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { useEditor, ToolMode, EditorElement } from "./EditorContext";

// Moved ToolButton definition outside of the Toolbar component to avoid re-creation on render.
// It now receives toolMode and setToolMode as props.
const ToolButton = ({
  mode,
  icon: Icon,
  label,
  toolMode,
  setToolMode,
}: {
  mode: ToolMode;
  icon: any;
  label: string;
  toolMode: ToolMode;
  setToolMode: (mode: ToolMode) => void;
}) => (
  <button
    onClick={() => setToolMode(mode)}
    className={`
      flex flex-col items-center gap-1 p-2 rounded-lg transition-all group min-w-[3rem]
      ${
        toolMode === mode
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }
    `}
    title={label}
  >
    <Icon size={20} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default function Toolbar() {
  const {
    toolMode,
    setToolMode,
    scale,
    setScale,
    addElement,
    selectedPageIds,
    pages,
  } = useEditor();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Determine target page
    const targetPageId =
      selectedPageIds.size > 0
        ? Array.from(selectedPageIds)[0]
        : pages.length > 0
          ? pages[0].id
          : null;

    if (!targetPageId) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        // Scale image to fit within page (max 400px wide)
        const maxWidth = 400;
        const ratio = Math.min(1, maxWidth / img.width);
        const newElement: EditorElement = {
          id: Math.random().toString(36).substr(2, 9),
          type: "image",
          x: 100,
          y: 100,
          width: img.width * ratio,
          height: img.height * ratio,
          content: dataUrl,
          pageId: targetPageId,
          style: {},
        };
        addElement(targetPageId, newElement);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    // Reset input so re-selecting same file works
    e.target.value = "";
  };

  return (
    <div className="flex items-center justify-between h-full px-4">
      {/* Mode Tools */}
      <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
        <button
          onClick={() => setToolMode("hand")}
          className={`p-1.5 rounded shadow-sm transition ${toolMode === "hand" ? "bg-white text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
          title="Hand Tool"
        >
          <Hand size={18} />
        </button>
        <button
          onClick={() => setToolMode("select")}
          className={`p-1.5 rounded shadow-sm transition ${toolMode === "select" ? "bg-white text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
          title="Select Tool"
        >
          <MousePointer size={18} />
        </button>
      </div>

      <div className="h-8 w-px bg-gray-200 mx-2"></div>

      {/* Insert Tools */}
      <div className="flex gap-2">
        <ToolButton
          mode="text"
          icon={Type}
          label="Text"
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
        <button
          onClick={() => imageInputRef.current?.click()}
          className={`
            flex flex-col items-center gap-1 p-2 rounded-lg transition-all group min-w-[3rem]
            ${
              toolMode === "image"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }
          `}
          title="Image"
        >
          <ImageIcon size={20} />
          <span className="text-[10px] font-medium">Image</span>
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
        <ToolButton
          mode="rect"
          icon={Square}
          label="Shape"
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
        <ToolButton
          mode="sign"
          icon={PenTool}
          label="Sign"
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
      </div>

      <div className="h-8 w-px bg-gray-200 mx-2"></div>

      {/* View Tools */}
      <div className="flex items-center gap-2 text-gray-600">
        <button
          onClick={() => setScale(Math.max(0.5, scale - 0.1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ZoomOut size={18} />
        </button>
        <span className="text-sm font-medium w-16 text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale(Math.min(3, scale + 0.1))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ZoomIn size={18} />
        </button>
      </div>
    </div>
  );
}
