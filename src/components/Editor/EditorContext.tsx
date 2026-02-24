"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  PageItem,
  convertFileToPages,
  createBlankPage,
  EditorElement,
} from "@/utils/pdf";

export type ToolMode =
  | "hand"
  | "select"
  | "text"
  | "image"
  | "rect"
  | "circle"
  | "sign";

interface EditorState {
  pages: PageItem[];
  selectedPageIds: Set<string>;
  activeElement: EditorElement | null;
  toolMode: ToolMode;
  elements: Record<string, EditorElement[]>; // pageId -> elements
  scale: number;
  isProcessing: boolean;
  history: PageItem[][];
  future: PageItem[][];
}

interface EditorContextType extends EditorState {
  addFiles: (files: File[]) => Promise<void>;
  addBlankPage: () => void;
  removePages: (ids: string[]) => void;
  rotatePages: (ids: string[], rotation?: number) => void;
  duplicatePage: (id: string) => void;
  movePage: (activeId: string, overId: string) => void;
  selectPage: (id: string, multi: boolean) => void;
  selectElement: (element: EditorElement | null) => void;
  addElement: (pageId: string, element: EditorElement) => void;
  removeElement: (element: EditorElement) => void;
  updateElement: (element: EditorElement) => void;
  setToolMode: (mode: ToolMode) => void;
  clearSelection: () => void;
  setScale: (scale: number) => void;
  undo: () => void;
  redo: () => void;
  setPages: (pages: PageItem[]) => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [selectedPageIds, setSelectedPageIds] = useState<Set<string>>(
    new Set(),
  );
  const [activeElement, setActiveElement] = useState<EditorElement | null>(
    null,
  );
  const [toolMode, setToolMode] = useState<ToolMode>("hand");
  const [elements, setElements] = useState<Record<string, EditorElement[]>>({});
  const [scale, setScale] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<PageItem[][]>([]);
  const [future, setFuture] = useState<PageItem[][]>([]);

  // Element Management
  const addElement = useCallback((pageId: string, element: EditorElement) => {
    setElements((prev) => ({
      ...prev,
      [pageId]: [...(prev[pageId] || []), element],
    }));
    setActiveElement(element);
    setToolMode("select"); // Switch back to select after adding
  }, []);

  const removeElement = useCallback((element: EditorElement) => {
    setElements((prev) => ({
      ...prev,
      [element.pageId]: (prev[element.pageId] || []).filter(
        (el) => el.id !== element.id,
      ),
    }));
    setActiveElement(null);
  }, []);

  const updateElement = useCallback((updated: EditorElement) => {
    setElements((prev) => ({
      ...prev,
      [updated.pageId]: prev[updated.pageId].map((el) =>
        el.id === updated.id ? updated : el,
      ),
    }));
    setActiveElement(updated);
  }, []);

  const selectElement = useCallback((element: EditorElement | null) => {
    setActiveElement(element);
    if (element) {
      // If selecting an element, clear page selection mostly
      setSelectedPageIds(new Set());
    }
  }, []);

  // History Management
  const pushToHistory = useCallback((currentPages: PageItem[]) => {
    setHistory((prev) => [...prev, currentPages]);
    setFuture([]);
  }, []);

  const updatePages = useCallback(
    (newPages: PageItem[]) => {
      setPages((prev) => {
        pushToHistory(prev);
        return newPages;
      });
    },
    [pushToHistory],
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    const newHistory = history.slice(0, -1);
    setFuture((prev) => [pages, ...prev]);
    setHistory(newHistory);
    setPages(previous);
  }, [history, pages]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setHistory((prev) => [...prev, pages]);
    setFuture(newFuture);
    setPages(next);
  }, [future, pages]);

  // Actions
  const addFiles = useCallback(
    async (files: File[]) => {
      setIsProcessing(true);
      try {
        const newItems: PageItem[] = [];
        for (const file of files) {
          if (
            file.type === "application/pdf" ||
            file.type.startsWith("image/")
          ) {
            const filePages = await convertFileToPages(file);
            newItems.push(...filePages);
          }
        }
        updatePages([...pages, ...newItems]);
      } catch (error) {
        console.error("Error adding files:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [pages, updatePages],
  );

  const addBlankPageAction = useCallback(() => {
    const blank = createBlankPage();
    updatePages([...pages, blank]);
  }, [pages, updatePages]);

  const removePages = useCallback(
    (ids: string[]) => {
      updatePages(pages.filter((p) => !ids.includes(p.id)));
      setSelectedPageIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      });
    },
    [pages, updatePages],
  );

  const rotatePages = useCallback(
    (ids: string[], rotation?: number) => {
      updatePages(
        pages.map((p) => {
          if (ids.includes(p.id)) {
            // If rotation is provided, set it. Otherwise increment by 90.
            const newRotation =
              rotation !== undefined ? rotation : (p.rotation + 90) % 360;
            return { ...p, rotation: newRotation };
          }
          return p;
        }),
      );
    },
    [pages, updatePages],
  );

  const duplicatePage = useCallback(
    (id: string) => {
      const index = pages.findIndex((p) => p.id === id);
      if (index === -1) return;
      const item = pages[index];
      const newItem = { ...item, id: `${item.id}-copy-${Date.now()}` };
      const newPages = [...pages];
      newPages.splice(index + 1, 0, newItem);
      updatePages(newPages);
    },
    [pages, updatePages],
  );

  const movePage = useCallback(
    (activeId: string, overId: string) => {
      const oldIndex = pages.findIndex((p) => p.id === activeId);
      const newIndex = pages.findIndex((p) => p.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newPages = [...pages];
        const [moved] = newPages.splice(oldIndex, 1);
        newPages.splice(newIndex, 0, moved);
        updatePages(newPages);
      }
    },
    [pages, updatePages],
  );

  const selectPage = useCallback((id: string, multi: boolean) => {
    setSelectedPageIds((prev) => {
      const next = new Set(multi ? prev : []);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPageIds(new Set());
  }, []);

  return (
    <EditorContext.Provider
      value={{
        pages,
        selectedPageIds,
        activeElement,
        toolMode,
        elements,
        scale,
        isProcessing,
        history,
        future,
        addFiles,
        addBlankPage: addBlankPageAction,
        removePages,
        rotatePages,
        duplicatePage,
        movePage,
        selectPage,
        selectElement,
        addElement,
        removeElement,
        updateElement,
        setToolMode,
        clearSelection,
        setScale,
        undo,
        redo,
        setPages: updatePages,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
