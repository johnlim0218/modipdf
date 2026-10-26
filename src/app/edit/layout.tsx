import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Editor - Edit, Merge, Split Pages",
  description:
    "Edit PDF pages freely with ModiPDF editor. Reorder, merge, and split pages with drag and drop.",
  // The editor is an empty app shell until a file is loaded, so keep it out of the index
  robots: {
    index: false,
    follow: true,
  },
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
