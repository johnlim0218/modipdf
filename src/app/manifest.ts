import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ModiPDF - 무료 온라인 PDF 편집기",
    short_name: "ModiPDF",
    description:
      "PDF 병합, 분할, 페이지 편집을 브라우저에서 바로. 설치 없이 빠르고 안전한 PDF 편집 도구.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
