import { PDFDocument } from "pdf-lib";
import * as pdfjs from "pdfjs-dist";

// Configure worker
if (typeof window !== "undefined" && "Worker" in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export interface PageItem {
  id: string;
  file: File;
  pageIndex: number;
  thumbnail: string; // Data URL
}

export async function convertFileToPages(file: File): Promise<PageItem[]> {
  const arrayBuffer = await file.arrayBuffer();
  // Use a copy of the array buffer because pdfjs might detach it
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
  const pdf = await loadingTask.promise;
  const pages: PageItem[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 0.5 }); // Thumbnail scale
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) continue;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    pages.push({
      id: `${file.name}-${i}-${Date.now()}`,
      file,
      pageIndex: i - 1, // 0-indexed for pdf-lib
      thumbnail: canvas.toDataURL(),
    });
  }

  return pages;
}

export async function mergePages(pages: PageItem[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  // Group pages by file to minimize loading
  const fileMap = new Map<File, number[]>();

  // Create a map of file -> pages to copy
  // But we need to maintain order.
  // pdf-lib's copyPages is efficient, but we need to insert them in the correct order.
  // Strategy:
  // 1. Identify all unique files.
  // 2. Load all unique files into PDFDocuments.
  // 3. For each page in the input array, copy the specific page from the loaded source PDF.

  const uniqueFiles = Array.from(new Set(pages.map((p) => p.file)));
  const sourcePdfs = new Map<File, PDFDocument>();

  for (const file of uniqueFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    sourcePdfs.set(file, pdf);
  }

  for (const pageItem of pages) {
    const sourcePdf = sourcePdfs.get(pageItem.file);
    if (!sourcePdf) continue;

    const [copiedPage] = await mergedPdf.copyPages(sourcePdf, [
      pageItem.pageIndex,
    ]);
    mergedPdf.addPage(copiedPage);
  }

  return await mergedPdf.save();
}
