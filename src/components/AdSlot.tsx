"use client";

import React, { useEffect, useRef } from "react";

type AdFormat = "horizontal" | "rectangle" | "vertical";

interface AdSlotProps {
  slot: string;
  format: AdFormat;
  className?: string;
}

const formatConfig: Record<
  AdFormat,
  { width: string; height: string; label: string }
> = {
  horizontal: { width: "728px", height: "90px", label: "728 × 90" },
  rectangle: { width: "300px", height: "250px", label: "300 × 250" },
  vertical: { width: "160px", height: "600px", label: "160 × 600" },
};

const ADSENSE_CLIENT_ID = "ca-pub-4184045152834193";

export default function AdSlot({ slot, format, className = "" }: AdSlotProps) {
  const config = formatConfig[format];
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    // AdSense script expects (window.adsbygoogle = window.adsbygoogle || []).push({}); for each ad unit
    if (typeof window !== "undefined" && adRef.current && !isLoaded.current) {
      try {
        // @ts-expect-error: window.adsbygoogle is injected by AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div
      id={`ad-slot-${slot}`}
      className={`ad-slot ad-slot--${format} ${className}`}
      style={{
        width: "100%",
        maxWidth: config.width,
        minHeight: config.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-hidden="true"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: config.width,
          height: config.height,
        }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />

      {/* 개발 환경에서만 보이는 가이드 (승인 전 확인용) */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "absolute",
            width: config.width,
            height: config.height,
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            backgroundColor: "rgba(249, 250, 251, 0.7)",
            color: "#9ca3af",
            fontSize: "12px",
            fontWeight: 600,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <span>애드센스 광고 영역 ({config.label})</span>
          <span style={{ fontSize: "10px" }}>ID: {ADSENSE_CLIENT_ID}</span>
        </div>
      )}
    </div>
  );
}
