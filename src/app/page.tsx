"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import InterstitialAd from "@/components/InterstitialAd";
import { useEditor } from "@/components/Editor/EditorContext";

export default function Home() {
  const { addFiles, pages } = useEditor();
  const router = useRouter();
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileSelect = async (files: File[]) => {
    if (files.length > 0) {
      setUploadedFileName(
        files.length === 1
          ? files[0].name
          : `${files[0].name} 외 ${files.length - 1}개`,
      );
      await addFiles(files);
      setShowInterstitial(true);
    }
  };

  const handleInterstitialComplete = () => {
    router.push("/edit");
  };

  // If we already have pages, redirect to edit
  useEffect(() => {
    if (pages.length > 0 && !showInterstitial) {
      router.push("/edit");
    }
  }, [pages, router, showInterstitial]);

  if (showInterstitial) {
    return (
      <InterstitialAd
        fileName={uploadedFileName}
        onComplete={handleInterstitialComplete}
      />
    );
  }

  return <LandingPage onFileSelect={handleFileSelect} />;
}
