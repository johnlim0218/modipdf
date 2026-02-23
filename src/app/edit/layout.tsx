import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF 편집기 - 페이지 편집, 병합, 분할",
  description:
    "ModiPDF 편집기로 PDF 페이지를 자유롭게 편집하세요. 드래그 앤 드롭으로 페이지 순서 변경, 병합, 분할이 가능합니다.",
};

export default function EditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
