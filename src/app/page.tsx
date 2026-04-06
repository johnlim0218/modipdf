"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { useEditor } from "@/components/Editor/EditorContext";

export default function Home() {
  const { addFiles, pages } = useEditor();
  const router = useRouter();

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      await addFiles(files);
      router.push("/edit");
    }
  };

  // If we already have pages, redirect to edit
  useEffect(() => {
    if (pages.length > 0) {
      router.push("/edit");
    }
  }, [pages, router]);

  return <LandingPage onFileSelect={handleFileSelect} />;
}
