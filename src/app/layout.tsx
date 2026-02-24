import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

const SITE_URL = "https://modipdf.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "JoeU0rjjSnf11I_Tq33w0gJK_8sv5pSLIZSiiqNwoBw",
  },
  title: {
    default: "ModiPDF - 무료 온라인 PDF 편집기 | 병합, 분할, 편집",
    template: "%s | ModiPDF",
  },
  description:
    "ModiPDF는 무료 온라인 PDF 편집 도구입니다. PDF 병합, 분할, 페이지 편집, 이미지 변환을 브라우저에서 바로 수행하세요. 설치 없이 빠르고 안전하게 PDF를 편집할 수 있습니다.",
  keywords: [
    "PDF 편집",
    "PDF 병합",
    "PDF 분할",
    "PDF 변환",
    "온라인 PDF 편집기",
    "무료 PDF 도구",
    "PDF merge",
    "PDF split",
    "PDF editor online",
    "ModiPDF",
  ],
  authors: [{ name: "ModiPDF" }],
  creator: "ModiPDF",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "ModiPDF",
    title: "ModiPDF - 무료 온라인 PDF 편집기",
    description:
      "PDF 병합, 분할, 페이지 편집을 브라우저에서 바로. 설치 없이 빠르고 안전한 PDF 편집 도구.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ModiPDF - 무료 온라인 PDF 편집기",
    description:
      "PDF 병합, 분할, 페이지 편집을 브라우저에서 바로. 설치 없이 빠르고 안전한 PDF 편집 도구.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
