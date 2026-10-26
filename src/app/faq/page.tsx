import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/site/ContentPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about ModiPDF: privacy and local processing, supported file types, merging, rotating pages, signatures, exporting and known limitations.",
  alternates: { canonical: "/faq" },
};

interface Faq {
  q: string;
  a: string;
  guide?: { slug: string; label: string };
}

const faqs: Faq[] = [
  {
    q: "Is ModiPDF free to use?",
    a: "Yes. ModiPDF is free and does not require an account. The site shows advertising to cover its running costs.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "No. Your files are read and processed inside your browser tab using the open-source libraries PDF.js and pdf-lib, and the exported PDF is created on your device. The website loads its own code, a PDF.js worker script and advertising over the network, but those requests do not contain your documents.",
    guide: {
      slug: "edit-sensitive-pdfs-privately",
      label: "Keeping sensitive documents private",
    },
  },
  {
    q: "Which file types can I open?",
    a: "You can open PDF files and JPG or PNG images. Each image becomes one page in your document. Other image formats, such as HEIC or WebP, may not be included in the exported PDF, so convert them to JPG or PNG first.",
    guide: { slug: "convert-images-to-pdf", label: "Converting images to PDF" },
  },
  {
    q: "How do I merge several PDFs into one?",
    a: "Open the first PDF, then click the + button at the top of the Pages panel to add more files. Drag the page thumbnails into the order you want and click Export. All pages are saved into one new PDF.",
    guide: { slug: "merge-pdf-files", label: "How to merge PDF files" },
  },
  {
    q: "How do I reorder, rotate or delete pages?",
    a: "Drag thumbnails in the Pages panel to reorder them. Hover over a thumbnail to reveal the rotate and delete icons. To act on several pages at once, hold Ctrl (Cmd on a Mac) while clicking thumbnails, then use the Rotate or Delete buttons in the right-hand panel.",
    guide: {
      slug: "reorder-delete-rotate-pdf-pages",
      label: "Reordering, deleting and rotating pages",
    },
  },
  {
    q: "Can I extract just some pages from a PDF?",
    a: "Yes. Open the PDF, delete the pages you do not need, and export. The new file contains only the remaining pages, and your original file is not changed.",
  },
  {
    q: "Can I add text, images or a signature?",
    a: "Yes. The toolbar has Text, Image, Shape and Sign tools. Text and rectangles are placed where you click, images are chosen from your device, and the Sign tool lets you draw a signature with your mouse or trackpad. Use the Properties panel to adjust size, position and colour.",
    guide: {
      slug: "add-text-images-signature-to-pdf",
      label: "Adding text, images and a signature",
    },
  },
  {
    q: "Is a signature drawn in ModiPDF legally binding?",
    a: "A drawn signature is an image of your handwriting, similar to signing paper and scanning it. It is not a certificate-based digital signature. Whether it is accepted depends on the recipient and on local law, so check with them if you are unsure.",
  },
  {
    q: "Can I redact or permanently remove text?",
    a: "No. ModiPDF does not have a redaction tool. Drawing a filled rectangle over text hides it visually, but the text usually remains in the file and can be copied. Delete the whole page if possible, or use dedicated redaction software.",
  },
  {
    q: "Can ModiPDF compress or reduce the size of a PDF?",
    a: "No, ModiPDF does not compress files. The exported PDF is roughly the size of the pages and images you put into it. If you need a smaller file, reduce the resolution of large photos before adding them.",
  },
  {
    q: "Can I edit the existing text in a PDF?",
    a: "ModiPDF does not change the original text of a page. You can add new text, images and shapes on top of a page, and reorganise, rotate or remove pages.",
  },
  {
    q: "Why did my export fail or leave something out?",
    a: "Common causes are characters the standard export font cannot represent (such as emoji or non-Latin scripts in added text), images in formats other than JPG or PNG, and password-protected PDFs. Also note that added text, images, shapes and signatures are currently saved onto pages that come from PDF files; to annotate a photo, convert it to a PDF first and reopen that PDF.",
  },
  {
    q: "Is there a file size or page limit?",
    a: "There is no fixed limit set by ModiPDF. Because processing happens on your device, the practical limit depends on your browser and available memory. Very large documents may take longer to load and export, especially on phones and older computers.",
  },
  {
    q: "What happens if I close or refresh the tab?",
    a: "Your loaded files and edits are cleared, because nothing is stored on a server. Export your document before closing the tab. Within a session, Undo and Redo in the header reverse page changes such as reordering, rotating and deleting.",
  },
  {
    q: "Does ModiPDF work offline or on mobile?",
    a: "The editor needs a connection to load the page, but once it has loaded, the editing and export steps themselves run on your device. The interface is designed mainly for desktop browsers; it may work on tablets and phones, but drawing signatures and precise placement are easier with a mouse or trackpad.",
  },
];

const h2 = "text-xl font-bold text-gray-900";

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <ContentPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Straight answers about how ModiPDF works, what it can do, and what it
        cannot do yet.
      </p>

      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group border border-gray-100 rounded-xl open:bg-gray-50/60"
          >
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none">
              <h2 className={`${h2} text-base`}>{f.q}</h2>
              <span
                aria-hidden="true"
                className="text-gray-400 transition-transform group-open:rotate-45 text-xl leading-none"
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 text-gray-600 leading-relaxed">
              <p>{f.a}</p>
              {f.guide && (
                <p className="mt-3 text-sm">
                  Related guide:{" "}
                  <Link
                    href={`/guides/${f.guide.slug}`}
                    className="text-indigo-600 hover:underline"
                  >
                    {f.guide.label}
                  </Link>
                </p>
              )}
            </div>
          </details>
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed mt-12">
        Still have a question? Read the{" "}
        <Link href="/guides" className="text-indigo-600 hover:underline">
          step-by-step guides
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-indigo-600 hover:underline">
          contact us
        </Link>
        .
      </p>
    </ContentPage>
  );
}
