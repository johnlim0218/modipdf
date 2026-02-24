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
    default: "ModiPDF - Free Online PDF Editor | Merge, Split, Edit",
    template: "%s | ModiPDF",
  },
  description:
    "ModiPDF is a free online PDF editing tool. Merge, split, edit pages, and convert images to PDF right in your browser. Fast and secure PDF editing with no installation required.",
  keywords: [
    "PDF editor",
    "PDF merge",
    "PDF split",
    "PDF convert",
    "online PDF editor",
    "free PDF tools",
    "free PDF editor",
    "PDF combiner",
    "PDF compressor",
    "edit PDF online",
    "merge PDF files",
    "split PDF pages",
    "PDF page editor",
    "PDF editor online",
    "ModiPDF",
  ],
  authors: [{ name: "ModiPDF" }],
  creator: "ModiPDF",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ModiPDF",
    title: "ModiPDF - Free Online PDF Editor",
    description:
      "Merge, split, and edit PDF pages right in your browser. Fast and secure PDF editing tool — no installation required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ModiPDF - Free Online PDF Editor",
    description:
      "Merge, split, and edit PDF pages right in your browser. Fast and secure PDF editing tool — no installation required.",
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
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4184045152834193"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
