"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Upload,
  X,
  Download,
  RotateCw,
  ZoomIn,
  Plus,
  Check,
  Trash2,
  Settings,
  Undo,
  Redo,
  Copy,
  Sun,
  Moon,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  convertFileToPages,
  mergePages,
  PageItem,
  renderPage,
  createBlankPage,
  extractPages,
  splitPdfToZip,
} from "@/utils/pdf";

function SortableItem({
  item,
  onRemove,
  onRotate,
  onZoom,
  isSelected,
  onToggleSelect,
}: {
  item: PageItem;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  onZoom: (item: PageItem) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onDuplicate: (item: PageItem) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="page-item-card"
    >
      <div className="page-thumbnail-container">
        <div
          className={`selection-overlay ${isSelected ? "selected" : ""}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(item.id);
          }}
        >
          {isSelected && <Check size={14} strokeWidth={3} />}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.thumbnail}
          alt={`Page ${item.pageIndex + 1}`}
          className="page-thumbnail"
          style={{ transform: `rotate(${item.rotation}deg)` }}
        />
        <div className="card-actions">
          <button
            className="action-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onZoom(item);
            }}
            title="Zoom Preview"
          >
            <ZoomIn size={14} color="#666" />
          </button>
          <button
            className="action-btn rotate-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRotate(item.id);
            }}
            title="Rotate Clockwise"
          >
            <RotateCw size={14} />
          </button>
          <button
            className="action-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate(item);
            }}
            title="Duplicate Page"
          >
            <Copy size={14} />
          </button>
          <button
            className="action-btn remove-btn"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }}
            title="Remove Page"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="page-info">
        <span className="page-number">
          {item.pageIndex === -1 ? "Blank Page" : `P. ${item.pageIndex + 1}`}
        </span>
        <span className="file-name" title={item.file?.name || "Blank Page"}>
          {item.file?.name || "-"}
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState<PageItem[]>([]);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [previewItem, setPreviewItem] = useState<PageItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [history, setHistory] = useState<PageItem[][]>([]);
  const [future, setFuture] = useState<PageItem[][]>([]);

  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check system preference on mount
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Wrap setItems to push to history
  const updateItems = (
    newItems: PageItem[] | ((prev: PageItem[]) => PageItem[]),
  ) => {
    setItems((prev) => {
      const next = typeof newItems === "function" ? newItems(prev) : newItems;
      setHistory((prevHistory) => [...prevHistory, prev]);
      setFuture([]); // Clear future on new action
      return next;
    });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setFuture((prev) => [items, ...prev]);
    setHistory(newHistory);
    setItems(previous);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setHistory((prev) => [...prev, items]);
    setFuture(newFuture);
    setItems(next);
  };
  const [metadata, setMetadata] = useState({
    filename: "",
    title: "",
    author: "",
    pageNumbers: false,
    watermark: "",
  });
  const [showMetadata, setShowMetadata] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (previewItem) {
      setPreviewUrl(null); // Reset while loading
      renderPage(previewItem.file, previewItem.pageIndex, 1.5)
        .then((url) => {
          setPreviewUrl(url);
        })
        .catch((err) => {
          console.error("Error rendering preview:", err);
        });
    } else {
      setPreviewUrl(null);
    }
  }, [previewItem]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      updateItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const processFiles = useCallback(async (files: File[]) => {
    setIsProcessing(true);
    try {
      const newItems: PageItem[] = [];
      for (const file of files) {
        if (file.type === "application/pdf" || file.type.startsWith("image/")) {
          const pages = await convertFileToPages(file);
          newItems.push(...pages);
        }
      }
      updateItems((prev) => [...prev, ...newItems]);
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const addBlankPage = () => {
    const blankPage = createBlankPage();
    updateItems((prev) => [...prev, blankPage]);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const handleBatchRemove = () => {
    setItems((items) => items.filter((item) => !selectedIds.has(item.id)));
    clearSelection();
  };

  const handleBatchRotate = () => {
    setItems((items) =>
      items.map((item) => {
        if (selectedIds.has(item.id)) {
          return { ...item, rotation: (item.rotation + 90) % 360 };
        }
        return item;
      }),
    );
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingFile(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    },
    [processFiles],
  );

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
      }
    },
    [processFiles],
  );

  const duplicatePage = (item: PageItem) => {
    updateItems((items) => {
      const index = items.findIndex((i) => i.id === item.id);
      if (index === -1) return items;

      const newItem: PageItem = {
        ...item,
        id: `${item.id}-copy-${Date.now()}`,
      };

      const newItems = [...items];
      newItems.splice(index + 1, 0, newItem);
      return newItems;
    });
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Delete / Backspace: Remove selected
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedIds.size > 0
      ) {
        handleBatchRemove();
      }

      // Cmd+A / Ctrl+A: Select All
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        const allIds = new Set(items.map((i) => i.id));
        setSelectedIds(allIds);
      }

      // Cmd+Z / Ctrl+Z: Undo
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        handleUndo();
      }

      // Cmd+Shift+Z / Ctrl+Shift+Z: Redo
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "z") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIds, items, handleUndo, handleRedo, handleBatchRemove]);

  const removePage = (id: string) => {
    updateItems((items) => items.filter((item) => item.id !== id));
  };

  const rotatePage = (id: string) => {
    updateItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, rotation: (item.rotation + 90) % 360 };
        }
        return item;
      }),
    );
  };

  const downloadFile = (blob: Blob, filename: string) => {
    if ((window.navigator as any)?.msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(blob, filename);
      return;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleMerge = async () => {
    if (items.length === 0) return;

    setIsMerging(true);
    try {
      const mergedPdfBytes = await mergePages(items, {
        title: metadata.title,
        author: metadata.author,
        pageNumbers: metadata.pageNumbers,
        watermark: metadata.watermark,
      });
      const filename = metadata.filename.trim()
        ? metadata.filename.endsWith(".pdf")
          ? metadata.filename
          : `${metadata.filename}.pdf`
        : `merged-${Date.now()}.pdf`;

      const blob = new Blob([mergedPdfBytes as any], {
        type: "application/pdf",
      });
      downloadFile(blob, filename);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs. Please try again.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <main className="container" style={{ position: "relative" }}>
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        title="Toggle Theme"
      >
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        PDF Page Mixer
      </h1>

      <div
        className={`dropzone ${isDraggingFile ? "active" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          accept=".pdf, .jpg, .jpeg, .png"
          onChange={onFileSelect}
          style={{ display: "none" }}
        />
        <Upload
          size={48}
          color="var(--primary)"
          style={{ marginBottom: "1rem" }}
        />
        <p>Drag & drop PDF files here to extract pages</p>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button onClick={addBlankPage} className="btn-secondary">
          <Plus size={16} style={{ marginRight: "0.5rem" }} />
          Add Blank Page
        </button>
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="btn-secondary"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={handleRedo}
          disabled={future.length === 0}
          className="btn-secondary"
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>

      {isProcessing && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>Processing...</p>
      )}

      {items.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <div className="page-grid">
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    item={item}
                    onRemove={removePage}
                    onRotate={rotatePage}
                    onZoom={setPreviewItem}
                    isSelected={selectedIds.has(item.id)}
                    onToggleSelect={toggleSelection}
                    onDuplicate={duplicatePage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {items.length > 0 && (
        <div
          style={{ marginTop: "2rem", maxWidth: "600px", margin: "2rem auto" }}
        >
          <button
            onClick={() => setShowMetadata(!showMetadata)}
            className="btn-secondary"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <Settings size={16} style={{ marginRight: "0.5rem" }} />
            {showMetadata
              ? "Hide Output Settings"
              : "Show Output Settings (Filename, Metadata)"}
          </button>

          {showMetadata && (
            <div className="metadata-form">
              <div className="form-group full-width">
                <label>Filename</label>
                <input
                  type="text"
                  placeholder="merged-document.pdf"
                  value={metadata.filename}
                  onChange={(e) =>
                    setMetadata({ ...metadata, filename: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Document Title"
                  value={metadata.title}
                  onChange={(e) =>
                    setMetadata({ ...metadata, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  placeholder="Author Name"
                  value={metadata.author}
                  onChange={(e) =>
                    setMetadata({ ...metadata, author: e.target.value })
                  }
                />
              </div>
              <div className="form-group checkbox-group">
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    marginBottom: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={metadata.pageNumbers}
                    onChange={(e) =>
                      setMetadata({
                        ...metadata,
                        pageNumbers: e.target.checked,
                      })
                    }
                    style={{ width: "auto", marginRight: "0.5rem" }}
                  />
                  Add Page Numbers (Bottom Center)
                </label>
              </div>

              <div className="form-group">
                <label>Watermark (Text)</label>
                <input
                  type="text"
                  placeholder="e.g. Confidential"
                  value={metadata.watermark}
                  onChange={(e) =>
                    setMetadata({ ...metadata, watermark: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={handleMerge}
          disabled={items.length === 0 || isMerging || isProcessing}
          className="btn btn-primary"
        >
          {isMerging ? (
            "Merging..."
          ) : (
            <>
              <Download size={20} style={{ marginRight: "0.5rem" }} />
              Merge {items.length} Pages
            </>
          )}
        </button>

        <button
          onClick={async () => {
            if (items.length === 0) return;
            setIsMerging(true);
            try {
              const zipBlob = await splitPdfToZip(items);
              downloadFile(zipBlob, `split-pages-${Date.now()}.zip`);
            } catch (error) {
              console.error(error);
              alert("Failed to split PDF.");
            } finally {
              setIsMerging(false);
            }
          }}
          disabled={items.length === 0 || isMerging || isProcessing}
          className="btn-secondary"
          style={{ marginLeft: "1rem" }}
        >
          Split to ZIP
        </button>
      </div>

      {selectedIds.size > 0 && (
        <div className="batch-toolbar">
          <div className="batch-info">
            {selectedIds.size} item{selectedIds.size > 1 ? "s" : ""} selected
          </div>
          <div className="batch-actions">
            <button
              onClick={handleBatchRotate}
              className="batch-btn"
              title="Rotate Selected"
            >
              <RotateCw size={18} />
              <span>Rotate</span>
            </button>
            <button
              onClick={handleBatchRemove}
              className="batch-btn delete"
              title="Remove Selected"
            >
              <Trash2 size={18} />
              <span>Remove</span>
            </button>
            <button
              onClick={clearSelection}
              className="batch-btn"
              title="Clear Selection"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {previewItem && (
        <div className="preview-modal" onClick={() => setPreviewItem(null)}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-preview"
              onClick={() => setPreviewItem(null)}
            >
              <X size={24} />
            </button>
            <div className="preview-image-wrapper">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    transform: `rotate(${previewItem.rotation}deg)`,
                    transition: "transform 0.3s ease",
                  }}
                />
              ) : (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  Loading High-Res Preview...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .page-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
        .page-item-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 0.5rem;
          cursor: grab;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .page-item-card:active {
          cursor: grabbing;
        }
        .page-thumbnail-container {
          position: relative;
          width: 100%;
          border: 1px solid #eee;
          background: #f9f9f9;
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .page-thumbnail {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 0.3s ease;
        }
        .page-info {
          margin-top: 0.5rem;
          text-align: center;
          width: 100%;
        }
        .page-number {
          font-weight: bold;
          font-size: 0.9rem;
          display: block;
        }
        .file-name {
          font-size: 0.75rem;
          color: #666;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          max-width: 100%;
        }
        .card-actions {
          position: absolute;
          top: 4px;
          right: 4px;
          display: flex;
          gap: 4px;
        }
        .action-btn {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .action-btn:hover {
          background-color: #f0f0f0;
        }
        .remove-btn {
          color: #ef4444;
        }
        .remove-btn:hover {
          background-color: #fee2e2;
        }
        .rotate-btn {
          color: #3b82f6;
        }
        .rotate-btn:hover {
          background-color: #dbeafe;
        }

        .preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview-content {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
        }
        .close-preview {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #333;
          z-index: 10;
        }
        .preview-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-width: 300px;
          min-height: 200px;
        }

        .selection-overlay {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 20px;
          height: 20px;
          border: 2px solid #ccc;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.8);
          z-index: 10;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .selection-overlay:hover {
          border-color: #3b82f6;
        }

        .selection-overlay.selected {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .selection-check {
          display: flex;
        }

        .batch-toolbar {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 1px solid #ddd;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          z-index: 100;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, 100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }

        .batch-info {
          font-weight: bold;
          color: #333;
        }

        .batch-actions {
          display: flex;
          gap: 0.5rem;
        }

        .batch-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          color: #555;
          transition: background 0.2s;
        }

        .batch-btn:hover {
          background: #f0f0f0;
        }

        .batch-btn.delete {
          color: #ef4444;
        }

        .batch-btn.delete:hover {
          background: #fee2e2;
        }

        .metadata-form {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #eee;
          text-align: left;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
          color: #555;
        }

        .form-group input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .form-group input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          margin: 0 auto;
        }
        .btn-secondary:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </main>
  );
}
