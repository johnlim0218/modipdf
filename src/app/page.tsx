"use client";

import { useState, useCallback } from "react";
import { Upload, X, Download } from "lucide-react";
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
import { convertFileToPages, mergePages, PageItem } from "@/utils/pdf";

function SortableItem({
  item,
  onRemove,
}: {
  item: PageItem;
  onRemove: (id: string) => void;
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.thumbnail}
          alt={`Page ${item.pageIndex + 1}`}
          className="page-thumbnail"
        />
        <button
          className="remove-page-btn"
          onPointerDown={(e) => {
            // Prevent drag start
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
        >
          <X size={16} />
        </button>
      </div>
      <div className="page-info">
        <span className="page-number">P. {item.pageIndex + 1}</span>
        <span className="file-name" title={item.file.name}>
          {item.file.name}
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    try {
      const newItems: PageItem[] = [];
      for (const file of files) {
        if (file.type === "application/pdf") {
          const pages = await convertFileToPages(file);
          newItems.push(...pages);
        }
      }
      setItems((prev) => [...prev, ...newItems]);
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing PDF files.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const removePage = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
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
      const mergedPdfBytes = await mergePages(items);
      const filename = `merged-${Date.now()}.pdf`;
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      downloadFile(blob, filename);
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs. Please try again.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <main className="container">
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
          accept=".pdf"
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
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
      </div>

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
        .remove-page-btn {
          position: absolute;
          top: 4px;
          right: 4px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: red;
        }
        .remove-page-btn:hover {
          background: #ffebeb;
        }
      `}</style>
    </main>
  );
}
