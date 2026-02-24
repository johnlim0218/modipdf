"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import EditorLayout from "@/components/Editor/Layout";
import Header from "@/components/Editor/Header";
import Toolbar from "@/components/Editor/Toolbar";
import NavigationPanel from "@/components/Editor/NavigationPanel";
import Canvas from "@/components/Editor/Canvas";
import PropertyPanel from "@/components/Editor/PropertyPanel";
import { useEditor } from "@/components/Editor/EditorContext";

export default function EditorPage() {
  const { pages, selectedPageIds, selectPage } = useEditor();
  const router = useRouter();
  // We use a ref to track if we've ever had pages.
  // This allows us to stay in the editor if we undo to an empty state.
  const isInitialized = useRef(pages.length > 0);

  useEffect(() => {
    if (pages.length > 0) {
      isInitialized.current = true;

      // Handle initial auto-selection if needed
      if (selectedPageIds.size === 0) {
        selectPage(pages[0].id, false);
      }
    } else if (!isInitialized.current) {
      // Direct access to /edit without any pages, redirect to landing
      router.push("/");
    }
  }, [pages, selectedPageIds, selectPage, router]);

  return (
    <EditorLayout
      header={<Header />}
      toolbar={<Toolbar />}
      navigationPanel={<NavigationPanel />}
      canvas={<Canvas />}
      propertyPanel={<PropertyPanel />}
    />
  );
}
