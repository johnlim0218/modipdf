import React, { useEffect, useState, useRef, useCallback } from "react";
import { useEditor, EditorElement } from "./EditorContext";
import { renderPage } from "@/utils/pdf";

export default function Canvas() {
  const {
    pages,
    scale,
    selectedPageIds,
    selectPage,
    toolMode,
    addElement,
    updateElement,
    elements,
    selectElement,
    activeElement,
    setToolMode,
  } = useEditor();
  const [pageImages, setPageImages] = useState<Record<string, string>>({});
  const lastScaleRef = useRef(scale);
  const isRenderingRef = useRef(false);

  // Sign drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStrokes, setCurrentStrokes] = useState<
    { x: number; y: number }[][]
  >([]);
  const [currentStroke, setCurrentStroke] = useState<
    { x: number; y: number }[]
  >([]);
  const drawingPageIdRef = useRef<string | null>(null);

  // Text editing state
  const [editingElementId, setEditingElementId] = useState<string | null>(null);

  // Element dragging state
  const [dragging, setDragging] = useState<{
    element: EditorElement;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const visiblePages =
    selectedPageIds.size > 0
      ? pages.filter((page) => selectedPageIds.has(page.id))
      : pages;

  // --- Sign Tool Handlers ---
  const getRelativePos = (
    e: React.MouseEvent,
    pageEl: HTMLElement,
  ): { x: number; y: number } => {
    const rect = pageEl.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  };

  const handleSignMouseDown = (
    e: React.MouseEvent,
    pageId: string,
    pageEl: HTMLElement,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const pos = getRelativePos(e, pageEl);
    setIsDrawing(true);
    setCurrentStroke([pos]);
    drawingPageIdRef.current = pageId;
  };

  const handleSignMouseMove = (e: React.MouseEvent, pageEl: HTMLElement) => {
    if (!isDrawing) return;
    const pos = getRelativePos(e, pageEl);
    setCurrentStroke((prev) => [...prev, pos]);
  };

  const handleSignMouseUp = () => {
    if (!isDrawing || !drawingPageIdRef.current) return;
    setIsDrawing(false);

    const allStrokes = [...currentStrokes, currentStroke];

    if (currentStroke.length > 1) {
      // Calculate bounding box
      const allPoints = allStrokes.flat();
      const xs = allPoints.map((p) => p.x);
      const ys = allPoints.map((p) => p.y);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);

      const newElement: EditorElement = {
        id: Math.random().toString(36).substr(2, 9),
        type: "sign",
        x: minX,
        y: minY,
        width: maxX - minX + 4,
        height: maxY - minY + 4,
        pageId: drawingPageIdRef.current,
        points: allStrokes.map((stroke) =>
          stroke.map((p) => ({ x: p.x - minX, y: p.y - minY })),
        ),
        style: { strokeColor: "#1a1a2e", strokeWidth: 2 },
      };

      addElement(drawingPageIdRef.current, newElement);
    }

    setCurrentStrokes([]);
    setCurrentStroke([]);
    drawingPageIdRef.current = null;
  };

  // --- Page Click Handler ---
  const handlePageClick = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();

    if (toolMode === "sign") return; // handled by sign mouse handlers

    // If we have a tool selected (Text, Shape), add element
    if (["text", "rect", "circle"].includes(toolMode)) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      const newElement: EditorElement = {
        id: Math.random().toString(36).substr(2, 9),
        type: toolMode as EditorElement["type"],
        x,
        y,
        pageId,
        width: toolMode === "text" ? 200 : 150,
        height: toolMode === "text" ? 40 : 100,
        style:
          toolMode === "text"
            ? { fontSize: 16, color: "#000000", fontFamily: "Inter" }
            : {
                fill: "rgba(99, 102, 241, 0.15)",
                stroke: "#6366f1",
                strokeWidth: 2,
                borderRadius: 4,
              },
      };

      if (toolMode === "text") {
        newElement.content = "Double click to edit";
      }

      addElement(pageId, newElement);
      return;
    }

    // Default: Select Page
    selectPage(pageId, e.metaKey || e.ctrlKey);
    selectElement(null);
    setEditingElementId(null);
  };

  // --- Element Interaction ---
  const handleElementClick = (e: React.MouseEvent, element: EditorElement) => {
    e.stopPropagation();
    selectElement(element);
  };

  const handleElementDoubleClick = (
    e: React.MouseEvent,
    element: EditorElement,
  ) => {
    e.stopPropagation();
    if (element.type === "text") {
      setEditingElementId(element.id);
    }
  };

  const handleTextBlur = (element: EditorElement, newContent: string) => {
    setEditingElementId(null);
    if (newContent !== element.content) {
      updateElement({ ...element, content: newContent });
    }
  };

  // --- Element Drag ---
  const handleDragStart = (e: React.MouseEvent, element: EditorElement) => {
    if (toolMode !== "select" || editingElementId === element.id) return;
    e.preventDefault();
    e.stopPropagation();
    setDragging({
      element,
      startX: e.clientX,
      startY: e.clientY,
      origX: element.x,
      origY: element.y,
    });
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const dx = (e.clientX - dragging.startX) / scale;
      const dy = (e.clientY - dragging.startY) / scale;
      updateElement({
        ...dragging.element,
        x: dragging.origX + dx,
        y: dragging.origY + dy,
      });
    };
    const handleMouseUp = () => setDragging(null);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, scale, updateElement]);

  // --- Render Pages ---
  const renderAllPages = useCallback(
    async (targetScale: number, cancelled: { current: boolean }) => {
      while (isRenderingRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        if (cancelled.current) return;
      }
      isRenderingRef.current = true;

      try {
        const dpr =
          typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        const renderScale = targetScale * dpr;

        for (const page of pages) {
          if (cancelled.current) break;
          try {
            const url = await renderPage(
              page.file,
              page.pageIndex,
              renderScale,
            );
            if (!cancelled.current) {
              setPageImages((prev) => ({ ...prev, [page.id]: url }));
            }
          } catch (e) {
            console.error(`Failed to render page ${page.id}`, e);
          }
        }
      } finally {
        isRenderingRef.current = false;
      }
    },
    [pages],
  );

  useEffect(() => {
    const cancelled = { current: false };
    renderAllPages(scale, cancelled);
    return () => {
      cancelled.current = true;
    };
  }, [pages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Math.abs(lastScaleRef.current - scale) < 0.001) return;
    lastScaleRef.current = scale;

    const cancelled = { current: false };
    const timeoutId = setTimeout(() => {
      renderAllPages(scale, cancelled);
    }, 100);

    return () => {
      cancelled.current = true;
      clearTimeout(timeoutId);
    };
  }, [scale, renderAllPages]);

  // --- Build SVG path from points ---
  const buildSvgPath = (strokes: { x: number; y: number }[][]): string => {
    return strokes
      .map((stroke) => {
        if (stroke.length < 2) return "";
        return stroke
          .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
          .join(" ");
      })
      .join(" ");
  };

  // --- Render Element ---
  const renderElement = (element: EditorElement) => {
    const isActive = activeElement?.id === element.id;
    const isEditing = editingElementId === element.id;

    const commonStyle: React.CSSProperties = {
      left: `${element.x * scale}px`,
      top: `${element.y * scale}px`,
      width: element.width ? `${element.width * scale}px` : "auto",
      height: element.height ? `${element.height * scale}px` : "auto",
    };

    return (
      <div
        key={element.id}
        onClick={(e) => handleElementClick(e, element)}
        onDoubleClick={(e) => handleElementDoubleClick(e, element)}
        onMouseDown={(e) => handleDragStart(e, element)}
        className={`absolute ${toolMode === "select" ? "cursor-move" : "cursor-default"} border-2 transition-colors ${
          isActive
            ? "border-indigo-600 shadow-lg shadow-indigo-200/50"
            : "border-transparent hover:border-indigo-300"
        }`}
        style={commonStyle}
      >
        {/* Text Element */}
        {element.type === "text" && !isEditing && (
          <div
            className="w-full h-full flex items-start p-1 select-none"
            style={{
              fontSize: `${(element.style?.fontSize || 16) * scale}px`,
              color: element.style?.color || "#000",
              fontFamily: element.style?.fontFamily || "Inter",
              fontWeight: element.style?.bold ? "bold" : "normal",
              fontStyle: element.style?.italic ? "italic" : "normal",
              textAlign: element.style?.textAlign || "left",
            }}
          >
            {element.content}
          </div>
        )}
        {element.type === "text" && isEditing && (
          <textarea
            autoFocus
            defaultValue={element.content || ""}
            onBlur={(e) => handleTextBlur(element, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                (e.target as HTMLTextAreaElement).blur();
              }
            }}
            className="w-full h-full resize-none border-none outline-none bg-white/80 p-1"
            style={{
              fontSize: `${(element.style?.fontSize || 16) * scale}px`,
              color: element.style?.color || "#000",
              fontFamily: element.style?.fontFamily || "Inter",
            }}
          />
        )}

        {/* Image Element */}
        {element.type === "image" && element.content && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={element.content}
            alt="inserted"
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
          />
        )}

        {/* Shape (Rect) Element */}
        {element.type === "rect" && (
          <div
            className="w-full h-full"
            style={{
              backgroundColor:
                element.style?.fill || "rgba(99, 102, 241, 0.15)",
              border: `${element.style?.strokeWidth || 2}px solid ${element.style?.stroke || "#6366f1"}`,
              borderRadius: `${element.style?.borderRadius || 0}px`,
            }}
          />
        )}

        {/* Sign Element */}
        {element.type === "sign" && element.points && (
          <svg
            className="w-full h-full pointer-events-none"
            viewBox={`0 0 ${element.width || 100} ${element.height || 100}`}
            preserveAspectRatio="none"
          >
            <path
              d={buildSvgPath(element.points)}
              fill="none"
              stroke={element.style?.strokeColor || "#1a1a2e"}
              strokeWidth={element.style?.strokeWidth || 2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    );
  };

  // Determine cursor based on tool mode
  const getCursorClass = () => {
    switch (toolMode) {
      case "hand":
        return "cursor-grab";
      case "sign":
        return "cursor-crosshair";
      case "text":
      case "rect":
      case "circle":
        return "cursor-crosshair";
      default:
        return "cursor-default";
    }
  };

  return (
    <div
      className={`min-w-full w-fit min-h-full flex flex-col items-center p-8 bg-gray-200/50 gap-8 ${getCursorClass()}`}
    >
      {pages.length === 0 && (
        <div className="text-gray-400 mt-20">No pages selected</div>
      )}

      {visiblePages.map((page) => {
        const originalIndex = pages.findIndex((p) => p.id === page.id);
        return (
          <div
            key={page.id}
            className={`relative group transition-all duration-200 shadow-xl ${
              selectedPageIds.has(page.id)
                ? "ring-4 ring-indigo-500/50"
                : "hover:ring-2 hover:ring-indigo-300"
            }`}
            onClick={(e) => handlePageClick(e, page.id)}
            onMouseDown={(e) => {
              if (toolMode === "sign") {
                handleSignMouseDown(e, page.id, e.currentTarget);
              }
            }}
            onMouseMove={(e) => {
              if (toolMode === "sign" && isDrawing) {
                handleSignMouseMove(e, e.currentTarget);
              }
            }}
            onMouseUp={() => {
              if (toolMode === "sign") {
                handleSignMouseUp();
              }
            }}
            onMouseLeave={() => {
              if (toolMode === "sign" && isDrawing) {
                handleSignMouseUp();
              }
            }}
            style={{
              width: `${595 * scale}px`,
              height: `${842 * scale}px`,
              transform: `rotate(${page.rotation}deg)`,
            }}
          >
            {/* Paper Background */}
            <div className="absolute inset-0 bg-white" />

            {/* Page Image */}
            {pageImages[page.id] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pageImages[page.id]}
                alt={`Page ${originalIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            )}

            {/* Elements Overlay */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              {(elements[page.id] || []).map((element) =>
                renderElement(element),
              )}
            </div>

            {/* Live Sign Drawing Overlay */}
            {toolMode === "sign" &&
              isDrawing &&
              drawingPageIdRef.current === page.id &&
              currentStroke.length > 1 && (
                <svg
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    width: `${595 * scale}px`,
                    height: `${842 * scale}px`,
                  }}
                  viewBox={`0 0 ${595} ${842}`}
                  preserveAspectRatio="none"
                >
                  <path
                    d={buildSvgPath([...currentStrokes, currentStroke])}
                    fill="none"
                    stroke="#1a1a2e"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

            {/* Page Number Overlay */}
            <div className="absolute -left-12 top-0 text-xs font-bold text-gray-400">
              Page {originalIndex + 1}
            </div>
          </div>
        );
      })}

      {/* Spacer for bottom scroll */}
      <div className="h-24"></div>
    </div>
  );
}
