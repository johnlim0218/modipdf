"use client";

import React, { useRef } from "react";
import { useEditor, EditorElement } from "./EditorContext";
import {
  FileText,
  Type,
  Maximize,
  RotateCw,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Trash2,
  Image as ImageIcon,
  Square,
  PenTool,
  RefreshCw,
} from "lucide-react";

// Reusable section title
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-sm font-medium text-gray-900 mb-2">{children}</h4>
);

// Color input with label
const ColorInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-600">{label}</span>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer p-1"
      />
      <span className="text-xs text-gray-400 font-mono w-16 uppercase">
        {value}
      </span>
    </div>
  </div>
);

// Number input with label
const NumberInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-600">{label}</span>
    <div className="flex items-center gap-1">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={min}
        max={max}
        step={step || 1}
        className="w-24 border border-gray-300 rounded-lg p-2 text-sm text-right focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
      />
      {unit && <span className="text-xs text-gray-400">{unit}</span>}
    </div>
  </div>
);

export default function PropertyPanel() {
  const {
    selectedPageIds,
    pages,
    rotatePages,
    activeElement,
    updateElement,
    removeElement,
    removePages,
  } = useEditor();
  const selectedCount = selectedPageIds.size;
  const imageReplaceRef = useRef<HTMLInputElement>(null);

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeElement) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateElement({ ...activeElement, content: reader.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // --- Case 1: No Selection ---
  if (!activeElement && selectedCount === 0) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Document Info
          </h3>
        </div>
        <div className="p-6 flex flex-col items-center text-center text-gray-500 space-y-4">
          <div className="p-4 bg-gray-50 rounded-full">
            <FileText size={32} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">No Selection</h4>
            <p className="text-xs mt-1">Select a page or element to edit.</p>
          </div>

          <div className="w-full pt-6 border-t border-gray-100 mt-4">
            <div className="flex justify-between text-sm py-2">
              <span>Total Pages</span>
              <span className="font-medium text-gray-900">{pages.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Case 2: Element Selected ---
  if (activeElement) {
    const elementTypeIcons: Record<string, React.ReactNode> = {
      text: <Type size={14} />,
      image: <ImageIcon size={14} />,
      rect: <Square size={14} />,
      sign: <PenTool size={14} />,
    };

    return (
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-indigo-50 rounded text-indigo-600">
              {elementTypeIcons[activeElement.type] || null}
            </div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {activeElement.type} Properties
            </h3>
          </div>
          <button
            onClick={() => removeElement(activeElement)}
            className="text-red-500 hover:bg-red-50 p-1.5 rounded transition"
            title="Delete element"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-8 overflow-y-auto">
          {/* Position & Size (all elements) */}
          <div>
            <SectionTitle>Position & Size</SectionTitle>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <NumberInput
                  label="X"
                  value={Math.round(activeElement.x)}
                  onChange={(v) => updateElement({ ...activeElement, x: v })}
                  unit="px"
                />
                <NumberInput
                  label="Y"
                  value={Math.round(activeElement.y)}
                  onChange={(v) => updateElement({ ...activeElement, y: v })}
                  unit="px"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <NumberInput
                  label="W"
                  value={Math.round(activeElement.width || 0)}
                  onChange={(v) =>
                    updateElement({ ...activeElement, width: v })
                  }
                  min={10}
                  unit="px"
                />
                <NumberInput
                  label="H"
                  value={Math.round(activeElement.height || 0)}
                  onChange={(v) =>
                    updateElement({ ...activeElement, height: v })
                  }
                  min={10}
                  unit="px"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* TEXT Properties */}
          {activeElement.type === "text" && (
            <>
              <div>
                <SectionTitle>Content</SectionTitle>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 transition"
                  rows={3}
                  value={activeElement.content}
                  onChange={(e) =>
                    updateElement({
                      ...activeElement,
                      content: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <SectionTitle>Typography</SectionTitle>
                <div className="space-y-3">
                  <NumberInput
                    label="Font Size"
                    value={activeElement.style?.fontSize || 16}
                    onChange={(v) =>
                      updateElement({
                        ...activeElement,
                        style: { ...activeElement.style, fontSize: v },
                      })
                    }
                    min={8}
                    max={200}
                    unit="px"
                  />
                  <ColorInput
                    label="Color"
                    value={activeElement.style?.color || "#000000"}
                    onChange={(v) =>
                      updateElement({
                        ...activeElement,
                        style: { ...activeElement.style, color: v },
                      })
                    }
                  />
                  {/* Bold / Italic */}
                  <div className="flex gap-1 bg-gray-100 p-1 rounded">
                    <button
                      onClick={() =>
                        updateElement({
                          ...activeElement,
                          style: {
                            ...activeElement.style,
                            bold: !activeElement.style?.bold,
                          },
                        })
                      }
                      className={`flex-1 p-1.5 rounded flex justify-center transition ${activeElement.style?.bold ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      onClick={() =>
                        updateElement({
                          ...activeElement,
                          style: {
                            ...activeElement.style,
                            italic: !activeElement.style?.italic,
                          },
                        })
                      }
                      className={`flex-1 p-1.5 rounded flex justify-center transition ${activeElement.style?.italic ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      <Italic size={16} />
                    </button>
                  </div>
                  {/* Text Align */}
                  <div className="flex gap-1 bg-gray-100 p-1 rounded">
                    {(["left", "center", "right"] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() =>
                          updateElement({
                            ...activeElement,
                            style: {
                              ...activeElement.style,
                              textAlign: align,
                            },
                          })
                        }
                        className={`flex-1 p-1.5 rounded flex justify-center transition ${
                          (activeElement.style?.textAlign || "left") === align
                            ? "bg-white shadow-sm text-indigo-600"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        {align === "left" && <AlignLeft size={16} />}
                        {align === "center" && <AlignCenter size={16} />}
                        {align === "right" && <AlignRight size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* IMAGE Properties */}
          {activeElement.type === "image" && (
            <div>
              <SectionTitle>Image</SectionTitle>
              <div className="space-y-3">
                {activeElement.content && (
                  <div className="w-full aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeElement.content}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <button
                  onClick={() => imageReplaceRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm text-gray-700"
                >
                  <RefreshCw size={14} />
                  Replace Image
                </button>
                <input
                  ref={imageReplaceRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleReplaceImage}
                />
              </div>
            </div>
          )}

          {/* SHAPE (Rect) Properties */}
          {activeElement.type === "rect" && (
            <div>
              <SectionTitle>Shape Style</SectionTitle>
              <div className="space-y-3">
                <ColorInput
                  label="Fill"
                  value={activeElement.style?.fill || "#6366f1"}
                  onChange={(v) =>
                    updateElement({
                      ...activeElement,
                      style: { ...activeElement.style, fill: v + "26" },
                    })
                  }
                />
                <ColorInput
                  label="Stroke"
                  value={activeElement.style?.stroke || "#6366f1"}
                  onChange={(v) =>
                    updateElement({
                      ...activeElement,
                      style: { ...activeElement.style, stroke: v },
                    })
                  }
                />
                <NumberInput
                  label="Border"
                  value={activeElement.style?.strokeWidth || 2}
                  onChange={(v) =>
                    updateElement({
                      ...activeElement,
                      style: { ...activeElement.style, strokeWidth: v },
                    })
                  }
                  min={0}
                  max={20}
                  unit="px"
                />
                <NumberInput
                  label="Radius"
                  value={activeElement.style?.borderRadius || 0}
                  onChange={(v) =>
                    updateElement({
                      ...activeElement,
                      style: { ...activeElement.style, borderRadius: v },
                    })
                  }
                  min={0}
                  max={100}
                  unit="px"
                />
              </div>
            </div>
          )}

          {/* SIGN Properties */}
          {activeElement.type === "sign" && (
            <div>
              <SectionTitle>Signature Style</SectionTitle>
              <div className="space-y-3">
                <ColorInput
                  label="Stroke Color"
                  value={activeElement.style?.strokeColor || "#1a1a2e"}
                  onChange={(v) =>
                    updateElement({
                      ...activeElement,
                      style: { ...activeElement.style, strokeColor: v },
                    })
                  }
                />
                <NumberInput
                  label="Stroke Width"
                  value={activeElement.style?.strokeWidth || 2}
                  onChange={(v) =>
                    updateElement({
                      ...activeElement,
                      style: { ...activeElement.style, strokeWidth: v },
                    })
                  }
                  min={1}
                  max={10}
                  unit="px"
                />
                {/* Preview */}
                {activeElement.points && (
                  <div className="w-full h-24 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                    <svg
                      viewBox={`0 0 ${activeElement.width || 100} ${activeElement.height || 100}`}
                      className="w-full h-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d={activeElement.points
                          .map((stroke) =>
                            stroke
                              .map((p, i) =>
                                i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`,
                              )
                              .join(" "),
                          )
                          .join(" ")}
                        fill="none"
                        stroke={activeElement.style?.strokeColor || "#1a1a2e"}
                        strokeWidth={activeElement.style?.strokeWidth || 2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- Case 3: Page Selected ---
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {selectedCount} Page{selectedCount > 1 ? "s" : ""} Selected
        </h3>
      </div>

      <div className="flex-1 p-4 space-y-6">
        {/* Page Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Page Actions
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => rotatePages(Array.from(selectedPageIds))}
              className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition"
            >
              <RotateCw size={20} className="mb-2 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Rotate</span>
            </button>
            <button
              onClick={() => removePages(Array.from(selectedPageIds))}
              className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition"
            >
              <Trash2
                size={20}
                className="mb-2 text-gray-400 group-hover:text-red-500"
              />
              <span className="text-xs font-medium text-gray-700">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
