import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Editor - Edit, Merge, Split Pages",
  description:
    "Edit PDF pages freely with ModiPDF editor. Reorder, merge, and split pages with drag and drop.",
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
