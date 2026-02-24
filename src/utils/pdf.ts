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

export interface EditorElement {
  id: string;
  type: "text" | "image" | "rect" | "circle" | "sign";
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string; // For text or image URL
  style?: Record<string, any>;
  pageId: string;
  points?: { x: number; y: number }[][]; // For sign tool (array of strokes)
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

function hexToPdfRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? rgb(
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      )
    : rgb(0, 0, 0);
}

function parsePdfColor(colorStr: string | undefined): {
  color: ReturnType<typeof rgb>;
  opacity: number;
} {
  if (!colorStr) return { color: rgb(0, 0, 0), opacity: 1 };

  if (colorStr.startsWith("#")) {
    return { color: hexToPdfRgb(colorStr), opacity: 1 };
  }

  if (colorStr.startsWith("rgba")) {
    const match = colorStr.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (match) {
      return {
        color: rgb(
          parseInt(match[1]) / 255,
          parseInt(match[2]) / 255,
          parseInt(match[3]) / 255,
        ),
        opacity: parseFloat(match[4]),
      };
    }
  }

  if (colorStr.startsWith("rgb")) {
    const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return {
        color: rgb(
          parseInt(match[1]) / 255,
          parseInt(match[2]) / 255,
          parseInt(match[3]) / 255,
        ),
        opacity: 1,
      };
    }
  }

  return { color: rgb(0, 0, 0), opacity: 1 };
}

export async function mergePages(
  pages: PageItem[],
  elements?: Record<string, EditorElement[]>,
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

    const page = mergedPdf.addPage(copiedPage);

    // Draw annotations/elements
    if (elements && elements[pageItem.id]) {
      const { height: pageHeight } = page.getSize();

      for (const el of elements[pageItem.id]) {
        if (el.type === "text" && el.content) {
          const { color, opacity } = parsePdfColor(el.style?.color);
          page.drawText(el.content, {
            x: el.x,
            y: pageHeight - el.y - (el.style?.fontSize || 16), // Approx baseline
            size: el.style?.fontSize || 16,
            color,
            opacity,
          });
        } else if (el.type === "image" && el.content) {
          try {
            const imageBytes = await fetch(el.content).then((res) =>
              res.arrayBuffer(),
            );
            let image;
            if (
              el.content.includes("image/png") ||
              el.content.endsWith(".png")
            ) {
              image = await mergedPdf.embedPng(imageBytes);
            } else {
              image = await mergedPdf.embedJpg(imageBytes);
            }

            page.drawImage(image, {
              x: el.x,
              y: pageHeight - el.y - (el.height || 0),
              width: el.width || image.width,
              height: el.height || image.height,
            });
          } catch (e) {
            console.warn("Failed to embed annotation image", e);
          }
        } else if (el.type === "rect") {
          const { color: fill, opacity: fillOpacity } = parsePdfColor(
            el.style?.fill,
          );
          const { color: stroke, opacity: strokeOpacity } = parsePdfColor(
            el.style?.stroke,
          );

          page.drawRectangle({
            x: el.x,
            y: pageHeight - el.y - (el.height || 0),
            width: el.width || 0,
            height: el.height || 0,
            color: fill,
            opacity: fillOpacity,
            borderColor: stroke,
            borderOpacity: strokeOpacity,
            borderWidth: el.style?.strokeWidth || 0,
          });
        } else if (el.type === "circle") {
          const { color: fill, opacity: fillOpacity } = parsePdfColor(
            el.style?.fill,
          );
          const { color: stroke, opacity: strokeOpacity } = parsePdfColor(
            el.style?.stroke,
          );

          page.drawEllipse({
            x: el.x + (el.width || 0) / 2,
            y: pageHeight - el.y - (el.height || 0) / 2,
            xScale: (el.width || 0) / 2,
            yScale: (el.height || 0) / 2,
            color: fill,
            opacity: fillOpacity,
            borderColor: stroke,
            borderOpacity: strokeOpacity,
            borderWidth: el.style?.strokeWidth || 0,
          });
        } else if (el.type === "sign" && el.points) {
          const { color: stroke, opacity } = parsePdfColor(
            el.style?.strokeColor || "#1a1a2e",
          );

          for (const strokePoints of el.points) {
            if (strokePoints.length < 2) continue;

            for (let i = 0; i < strokePoints.length - 1; i++) {
              const p1 = strokePoints[i];
              const p2 = strokePoints[i + 1];

              page.drawLine({
                start: {
                  x: el.x + p1.x,
                  y: pageHeight - (el.y + p1.y),
                },
                end: {
                  x: el.x + p2.x,
                  y: pageHeight - (el.y + p2.y),
                },
                thickness: el.style?.strokeWidth || 2,
                color: stroke,
                opacity,
              });
            }
          }
        }
      }
    }
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
        color: rgb(0, 0, 0),
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
        color: rgb(0.8, 0.8, 0.8),
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
