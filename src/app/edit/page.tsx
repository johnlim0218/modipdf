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
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (pages.length === 0) {
      router.push("/");
    } else if (!hasInitialized.current && selectedPageIds.size === 0) {
      selectPage(pages[0].id, false);
      hasInitialized.current = true;
    }
  }, [pages, router, selectedPageIds, selectPage]);

  if (pages.length === 0) {
    return null; // Or a loading spinner
  }

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
