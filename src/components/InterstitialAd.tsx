"use client";

import React, { useEffect, useState, useCallback } from "react";
import AdSlot from "./AdSlot";

interface InterstitialAdProps {
  fileName: string;
  onComplete: () => void;
  duration?: number; // seconds
}

export default function InterstitialAd({
  fileName,
  onComplete,
  duration = 5,
}: InterstitialAdProps) {
  const [remaining, setRemaining] = useState(duration);
  const [progress, setProgress] = useState(0);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
      setProgress((prev) => Math.min(prev + 100 / duration, 100));
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="interstitial-overlay">
      <div className="interstitial-content">
        {/* Loading indicator */}
        <div className="interstitial-spinner" />

        <h2 className="interstitial-title">PDF를 준비하고 있어요...</h2>
        <p className="interstitial-filename">{fileName}</p>

        {/* Progress bar */}
        <div className="interstitial-progress-track">
          <div
            className="interstitial-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Ad slot */}
        <div className="interstitial-ad-area">
          <AdSlot slot="interstitial" format="rectangle" />
        </div>

        {/* Skip / auto-move button */}
        <button onClick={handleSkip} className="interstitial-skip-btn">
          {remaining > 0 ? `편집기로 이동 (${remaining}초)` : "편집기로 이동"}
        </button>
        <p className="interstitial-skip-note">
          준비 완료 후 자동으로 이동합니다
        </p>
      </div>
    </div>
  );
}
