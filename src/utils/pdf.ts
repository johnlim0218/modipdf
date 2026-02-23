import { PDFDocument, degrees, rgb } from "pdf-lib";
import JSZip from "jszip";

// Helper to load pdfjs-dist only on client
async function getPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined" && "Worker" in window) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }
  return pdfjs;
}

export interface PageItem {
  id: string;
  file?: File;
  pageIndex: number;
  thumbnail: string; // Data URL
  rotation: number; // 0, 90, 180, 270
}

export function createBlankPage(): PageItem {
  const canvas = document.createElement("canvas");
  canvas.width = 150;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Blank Page", canvas.width / 2, canvas.height / 2);
  }

  return {
    id: `blank-${Date.now()}-${Math.random()}`,
    pageIndex: -1,
    thumbnail: canvas.toDataURL(),
    rotation: 0,
  };
}

export async function convertFileToPages(file: File): Promise<PageItem[]> {
  const isImage = file.type.startsWith("image/");

  if (isImage) {
    // For images, create a single page item
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    // Scale down for thumbnail
    const scale = Math.min(1, 200 / bitmap.width);
    canvas.width = bitmap.width * scale;
    canvas.height = bitmap.height * scale;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    }

    return [
      {
        id: `${file.name}-${Date.now()}`,
        file,
        pageIndex: 0, // 0 for images (single page)
        thumbnail: canvas.toDataURL(),
        rotation: 0,
      },
    ];
  }

  const pdfjs = await getPdfJs();
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
    } as any).promise;

    pages.push({
      id: `${file.name}-${i}-${Date.now()}`,
      file,
      pageIndex: i - 1, // 0-indexed for pdf-lib
      thumbnail: canvas.toDataURL(),
      rotation: 0,
    });
  }

  return pages;
}

export async function renderPage(
  file: File | undefined,
  pageIndex: number,
  scale = 2,
): Promise<string> {
  if (!file) {
    const canvas = document.createElement("canvas");
    canvas.width = 595 * scale; // A4 approximately
    canvas.height = 842 * scale;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    return canvas.toDataURL();
  }

  if (file.type.startsWith("image/")) {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(bitmap, 0, 0);
    }
    return canvas.toDataURL();
  }

  const pdfjs = await getPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(pageIndex + 1); // 1-based index for pdfjs

  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Canvas context not found");

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: context,
    viewport: viewport,
  } as any).promise;

  return canvas.toDataURL();
}

export interface PdfMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  pageNumbers?: boolean;
  watermark?: string;
}

export async function mergePages(
  pages: PageItem[],
  metadata?: PdfMetadata,
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  if (metadata) {
    if (metadata.title) mergedPdf.setTitle(metadata.title);
    if (metadata.author) mergedPdf.setAuthor(metadata.author);
    if (metadata.subject) mergedPdf.setSubject(metadata.subject);
    if (metadata.keywords) mergedPdf.setKeywords(metadata.keywords);
  }

  // Group pages by file to minimize loading
  const uniqueFiles = Array.from(
    new Set(pages.map((p) => p.file).filter((f): f is File => !!f)),
  );
  const sourcePdfs = new Map<File, PDFDocument>();

  for (const file of uniqueFiles) {
    // Only load PDF documents
    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      sourcePdfs.set(file, pdf);
    }
  }

  for (const pageItem of pages) {
    if (!pageItem.file) {
      mergedPdf.addPage();
      continue;
    }

    if (pageItem.file.type.startsWith("image/")) {
      const imageBytes = await pageItem.file.arrayBuffer();
      let image;
      try {
        if (pageItem.file.type === "image/png") {
          image = await mergedPdf.embedPng(imageBytes);
        } else {
          image = await mergedPdf.embedJpg(imageBytes);
        }
      } catch (e) {
        // Fallback if embed fails (e.g. unknown format), try treating as PNG or skip
        console.warn("Image embed failed, possibly unsupported format", e);
        continue;
      }

      const page = mergedPdf.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });

      if (pageItem.rotation !== 0) {
        page.setRotation(degrees(pageItem.rotation));
      }
      continue;
    }

    const sourcePdf = sourcePdfs.get(pageItem.file);
    if (!sourcePdf) continue;

    const [copiedPage] = await mergedPdf.copyPages(sourcePdf, [
      pageItem.pageIndex,
    ]);

    // Check if the page has rotation and apply it relative to existing rotation
    if (pageItem.rotation !== 0) {
      const existingRotation = copiedPage.getRotation().angle;
      copiedPage.setRotation(degrees(existingRotation + pageItem.rotation));
    }

    mergedPdf.addPage(copiedPage);
  }

  // Apply Page Numbers and Watermark
  const pagesCount = mergedPdf.getPageCount();
  const font = await mergedPdf.embedFont("Helvetica");

  for (let i = 0; i < pagesCount; i++) {
    const page = mergedPdf.getPage(i);
    const { width, height } = page.getSize();

    // Page Numbers
    if (metadata?.pageNumbers) {
      const fontSize = 12;
      const text = `${i + 1} / ${pagesCount}`;
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: 20,
        size: fontSize,
        font,
        color: { type: "RGB", red: 0, green: 0, blue: 0 },
      });
    }

    // Watermark
    if (metadata?.watermark) {
      const fontSize = 60;
      const text = metadata.watermark;
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const textHeight = font.heightAtSize(fontSize);

      page.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - textHeight / 2,
        size: fontSize,
        font,
        color: { type: "RGB", red: 0.8, green: 0.8, blue: 0.8 },
        opacity: 0.5,
        rotate: degrees(45),
      });
    }
  }

  return await mergedPdf.save();
}

export const extractPages = mergePages;

export async function splitPdfToZip(pages: PageItem[]): Promise<Blob> {
  const zip = new JSZip();

  // Use a map to track filenames and ensure uniqueness
  const filenameCounts = new Map<string, number>();

  for (let i = 0; i < pages.length; i++) {
    const pageItem = pages[i];

    // Create a new PDF for this single page
    const singlePdf = await PDFDocument.create();

    if (pageItem.file) {
      if (pageItem.file.type.startsWith("image/")) {
        // Handle Image
        const imageBytes = await pageItem.file.arrayBuffer();
        let image;
        try {
          if (pageItem.file.type === "image/png") {
            image = await singlePdf.embedPng(imageBytes);
          } else {
            image = await singlePdf.embedJpg(imageBytes);
          }
        } catch (e) {
          console.warn("Image embed failed", e);
          continue;
        }

        const page = singlePdf.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });

        if (pageItem.rotation !== 0) {
          page.setRotation(degrees(pageItem.rotation));
        }
      } else {
        // Handle PDF Page
        const arrayBuffer = await pageItem.file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(arrayBuffer);
        const [copiedPage] = await singlePdf.copyPages(sourcePdf, [
          pageItem.pageIndex,
        ]);

        if (pageItem.rotation !== 0) {
          const existingRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation(degrees(existingRotation + pageItem.rotation));
        }

        singlePdf.addPage(copiedPage);
      }
    } else {
      // Handle Blank Page
      singlePdf.addPage();
    }

    const pdfBytes = await singlePdf.save();

    // Determine unique filename
    let baseName = pageItem.file?.name.replace(/\.[^/.]+$/, "") || "page";
    if (pageItem.pageIndex === -1 && !pageItem.file) baseName = "blank-page";

    let fileName = `${baseName}.pdf`;
    const count = filenameCounts.get(baseName) || 0;
    if (count > 0) {
      fileName = `${baseName}-${count}.pdf`;
    }
    filenameCounts.set(baseName, count + 1);

    zip.file(fileName, pdfBytes);
  }

  return await zip.generateAsync({ type: "blob" });
}
