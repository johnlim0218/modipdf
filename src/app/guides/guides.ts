export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  summary: string;
  datePublished: string;
  dateModified: string;
  sections: GuideSection[];
  tips: string[];
  mistakes: string[];
  related: string[];
}

export const guides: Guide[] = [
  {
    slug: "merge-pdf-files",
    title: "How to Merge PDF Files in Your Browser",
    description:
      "A step-by-step guide to combining several PDF files into one document with ModiPDF, including how to set the page order and check the result before sharing.",
    summary:
      "Combine several PDFs into a single file, arrange the pages in the right order, and export one clean document without uploading anything.",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    sections: [
      {
        heading: "When merging PDFs makes sense",
        paragraphs: [
          "Merging is useful whenever a single submission is expected but your material lives in several files: a job application that asks for a cover letter, CV and certificates in one upload, an expense report with a summary sheet followed by receipts, or a set of meeting notes that should be read in sequence. Sending one file instead of five makes life easier for the person on the other end, and it removes the risk that one attachment gets lost or opened in the wrong order.",
          "ModiPDF merges files directly in your browser tab. The files you choose are read from your device into the page's memory, and the combined PDF is generated on your own computer when you export. Nothing is sent to a server for processing, which also means you do not wait for uploads or downloads of large documents.",
        ],
      },
      {
        heading: "Step-by-step: merging two or more PDFs",
        steps: [
          "Open the ModiPDF home page and drop your first PDF onto the upload area, or click it to pick a file. You can select several files at once in the file picker if they are in the same folder.",
          "The editor opens and every page of the file appears as a thumbnail in the Pages panel on the left. The number next to the panel title shows the total page count.",
          "To add more documents, click the + button at the top of the Pages panel. You can choose additional PDFs, and you can also choose JPG or PNG images, which are added as their own pages.",
          "New pages are appended to the end of the list. Drag any thumbnail up or down to move it. Pages from different files can be mixed freely, so you can, for example, place a signed form between two sections of a report.",
          "Scroll through the main canvas to review the pages at full size. Use the zoom buttons in the toolbar if you need to check fine print.",
          "Type a name for the merged file in the name field at the top left of the editor (it starts as Untitled Document).",
          "Click Export. ModiPDF builds the combined document and your browser downloads it as a single PDF.",
        ],
      },
      {
        heading: "How the merge works behind the scenes",
        paragraphs: [
          "When you export, ModiPDF creates a brand-new PDF and copies each page into it in the order shown in the Pages panel. Pages copied from an existing PDF keep their original content, including text that can still be selected and searched, rather than being converted into pictures. Any rotation you applied is added on top of the page's existing rotation.",
          "Because a new document is created, document-level details from the source files, such as the original title or author fields, are generally not carried over. The visible page content is what gets merged.",
        ],
      },
      {
        heading: "Checking the merged file",
        paragraphs: [
          "Always open the exported PDF before you send it. Check the first and last pages, confirm the page count matches what you expected, and skim the transitions between the original documents, since that is where an out-of-order page is most likely to hide. If something is wrong, go back to the editor tab: your pages are still loaded as long as you have not closed or refreshed it, so you can fix the order and export again.",
        ],
      },
    ],
    tips: [
      "Decide on the final order before you start. Writing a quick list such as 'cover letter, CV, certificates' helps you drag pages into place quickly.",
      "Add files in the order you want them when possible. Since new pages are appended to the end, adding files in sequence means less dragging later.",
      "Use Undo and Redo in the header if you move or delete the wrong page. They cover page-level changes such as reordering, rotating, adding and deleting pages.",
      "Hold Ctrl (or Cmd on a Mac) while clicking thumbnails to select several pages, then use the Rotate or Delete buttons in the right-hand panel to act on all of them at once.",
      "Give the export a descriptive file name, such as the document type and date, so the recipient knows what it is without opening it.",
    ],
    mistakes: [
      "Closing or refreshing the tab before exporting. ModiPDF does not store your work on a server, so a refresh clears everything that was loaded.",
      "Merging password-protected PDFs. Encrypted files may fail to load; open them in a viewer that knows the password and save an unprotected copy first, if you are allowed to.",
      "Forgetting to check page orientation. A landscape page from one file next to portrait pages from another may need rotating so it reads correctly.",
      "Assuming the merged file will be smaller. ModiPDF does not compress files, so the result is roughly the size of the inputs combined.",
    ],
    related: [
      "reorder-delete-rotate-pdf-pages",
      "prepare-pdf-for-printing-and-sharing",
      "convert-images-to-pdf",
    ],
  },
  {
    slug: "reorder-delete-rotate-pdf-pages",
    title: "How to Reorder, Delete and Rotate PDF Pages",
    description:
      "Learn how to rearrange pages by drag and drop, remove pages you do not need, extract a subset of pages and fix sideways scans with ModiPDF.",
    summary:
      "Rearrange pages with drag and drop, delete or extract pages, and fix sideways or upside-down scans, all from the Pages panel.",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    sections: [
      {
        heading: "Why page organisation matters",
        paragraphs: [
          "Many PDF problems are not about content at all but about structure. A scanner feeds pages in the wrong order, a phone saves a photo sideways, or a long report contains appendices that the reader does not need. Fixing these issues makes a document easier to read and far more professional to share. ModiPDF's Pages panel is built for exactly this kind of work: every page is a thumbnail you can move, rotate or remove.",
        ],
      },
      {
        heading: "Reordering pages with drag and drop",
        steps: [
          "Open a PDF from the ModiPDF home page. The editor shows every page as a numbered thumbnail in the Pages panel on the left.",
          "Press and hold on a thumbnail, then drag it up or down. A small movement is needed before the drag starts, which prevents accidental moves when you only meant to click.",
          "Release the thumbnail where you want it. The page numbers update immediately, and the main canvas shows the new order.",
          "Repeat for any other pages. If you move something by mistake, click Undo in the header.",
        ],
      },
      {
        heading: "Deleting pages",
        paragraphs: [
          "There are two ways to remove pages. For a single page, hover over its thumbnail and click the trash icon that appears. For several pages at once, click the first thumbnail, then hold Ctrl (Cmd on a Mac) and click the others. The right-hand panel shows how many pages are selected and offers a Delete button that removes them all in one step.",
          "Deleting pages in the editor does not change your original file on disk. The change only applies to the new PDF you export.",
        ],
      },
      {
        heading: "Extracting a few pages from a long document",
        paragraphs: [
          "ModiPDF does not need a separate extract tool for this: you keep the pages you want and delete the rest. Suppose you need pages 12 to 18 of a 50-page report. Load the report, select the pages outside that range, delete them, and export. The result is a new PDF containing only the section you need, while the original report stays untouched on your computer.",
          "If you need several different extracts, export the first one, then use Undo to bring back the deleted pages and repeat the process with a different selection.",
        ],
      },
      {
        heading: "Rotating pages",
        steps: [
          "Hover over the thumbnail of the page that is sideways or upside down.",
          "Click the rotate icon. Each click turns the page 90 degrees clockwise, so click twice for an upside-down page and three times to turn a page 90 degrees counter-clockwise.",
          "To rotate several pages at once, select them with Ctrl or Cmd and click, then press Rotate in the right-hand panel.",
          "Export the document and open it to confirm each page now reads the right way up.",
        ],
        paragraphs: [
          "Rotation is stored as part of the page in the exported PDF, so it is preserved when the file is opened in other viewers or printed.",
        ],
      },
    ],
    tips: [
      "Zoom out in the toolbar to see more of the canvas when checking a long document's flow.",
      "Work from the end of the document backwards when deleting many scattered pages; the remaining page numbers stay predictable.",
      "Before deleting, glance at the page count shown at the top of the Pages panel so you can verify the final total afterwards.",
      "For double-sided scans where every second page is upside down, select all the affected pages with Ctrl or Cmd and click, then rotate them together.",
    ],
    mistakes: [
      "Clicking a thumbnail and expecting it to move. A short click selects a page; you need to drag a little to start moving it.",
      "Rotating too many times. Each click adds 90 degrees, so check the thumbnail after every click.",
      "Deleting pages and then refreshing the page to 'start over'. Use Undo instead; a refresh clears all loaded files and you will need to add them again.",
      "Not reviewing the exported file. Thumbnails are small, so confirm the final order in a full PDF viewer before sending.",
    ],
    related: [
      "merge-pdf-files",
      "prepare-pdf-for-printing-and-sharing",
      "add-text-images-signature-to-pdf",
    ],
  },
  {
    slug: "convert-images-to-pdf",
    title: "How to Convert JPG and PNG Images to PDF",
    description:
      "Turn photos, scans and screenshots in JPG or PNG format into a single PDF document with ModiPDF, and learn how page size and image quality affect the result.",
    summary:
      "Turn photos, scanned pages and screenshots into a PDF, combine them with existing PDFs, and understand how page size and file size are decided.",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    sections: [
      {
        heading: "Why convert images to PDF",
        paragraphs: [
          "Images are convenient to capture but awkward to share as a set. A folder of twelve receipt photos, a series of whiteboard pictures, or several screenshots documenting a bug are much easier to send, print and archive as one PDF with a fixed order. Many forms and portals also only accept PDF uploads, even for documents you photographed with your phone.",
          "ModiPDF can add JPG and PNG images as pages, either on their own or mixed with pages from existing PDFs. The conversion runs locally in your browser, so your photos are not uploaded anywhere.",
        ],
      },
      {
        heading: "Step-by-step: images to PDF",
        steps: [
          "Gather the images in one folder and, if possible, rename them so they sort in the order you want (for example 01-receipt.jpg, 02-receipt.jpg).",
          "On the ModiPDF home page, drop the images onto the upload area or click it and select them. Each image becomes one page.",
          "In the editor, check the order in the Pages panel and drag thumbnails to rearrange them if needed.",
          "If a photo appears sideways, hover over its thumbnail and click the rotate icon until it reads correctly.",
          "Use the + button in the Pages panel to add more images or existing PDF files to the same document.",
          "Enter a file name at the top left and click Export to download the PDF.",
        ],
      },
      {
        heading: "How page size is decided",
        paragraphs: [
          "Each image becomes a page whose dimensions match the image's pixel dimensions, and the image fills the page with no added margins. That keeps the full picture without cropping, but it also means pages from different images can have different sizes. A tall phone screenshot produces a tall, narrow page; a large camera photo produces a very large page.",
          "This is usually fine for reading on screen. When printing, most PDF viewers offer a 'fit to page' or 'shrink to fit' option that scales each page to the paper size. If you need uniform page sizes, crop or resize your images to the same proportions before adding them.",
        ],
      },
      {
        heading: "Image quality and file size",
        paragraphs: [
          "ModiPDF embeds your images as they are, without recompressing them. Quality is preserved, but the PDF will be about as large as the images combined. ModiPDF does not include a compression feature, so if the final file must stay under an upload limit, reduce the images before adding them: lower the resolution in your photo app, or save photos as JPG rather than PNG, which is usually much smaller for photographs.",
          "PNG remains the better choice for screenshots, diagrams and text-heavy images, because it keeps sharp edges without compression artefacts.",
        ],
      },
      {
        heading: "Supported formats",
        paragraphs: [
          "For reliable results, use JPG (JPEG) or PNG files. Other image formats, such as HEIC photos from some phones or WebP images saved from websites, may display in the editor but cannot be embedded in the exported PDF. Convert them to JPG or PNG first; most phones and operating systems can do this when exporting or sharing a photo.",
        ],
      },
    ],
    tips: [
      "Photograph documents in good, even light and fill the frame with the page; it improves readability far more than any later adjustment.",
      "Crop away table surfaces and backgrounds before converting so the page contains only the document.",
      "Keep related images together in one export rather than creating many single-page PDFs.",
      "If you want to add text or a signature on top of a photographed page, export the images to PDF first, then open that new PDF in ModiPDF and add your annotations. Annotations are saved onto pages that come from PDF files.",
    ],
    mistakes: [
      "Using unsupported formats such as HEIC or WebP and finding pages missing from the export.",
      "Adding very high-resolution photos and producing a file too large to email.",
      "Forgetting to check orientation. Phone photos sometimes carry orientation information that viewers interpret differently, so confirm each page in the exported file.",
      "Relying on the original file names for order without checking. Always review the Pages panel before exporting.",
    ],
    related: [
      "merge-pdf-files",
      "add-text-images-signature-to-pdf",
      "prepare-pdf-for-printing-and-sharing",
    ],
  },
  {
    slug: "add-text-images-signature-to-pdf",
    title: "How to Add Text, Images and a Signature to a PDF",
    description:
      "Fill in details, place a logo or photo, draw shapes and hand-draw your signature on PDF pages with ModiPDF's editing tools, then export a finished document.",
    summary:
      "Use the Text, Image, Shape and Sign tools to fill in details, place a logo, mark up pages and hand-draw a signature on a PDF.",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    sections: [
      {
        heading: "The editing tools at a glance",
        paragraphs: [
          "Once a PDF is open in ModiPDF, the toolbar above the page offers a Hand tool for moving around, a Select tool for picking and dragging items, and four insert tools: Text, Image, Shape and Sign. Whatever you select appears in the Properties panel on the right, where you can fine-tune its position, size and style. These additions sit on top of the original page content and are written into the PDF when you export.",
        ],
      },
      {
        heading: "Adding text",
        steps: [
          "Click Text in the toolbar, then click on the page where the text should start. A text box appears with placeholder text.",
          "Double-click the box to type directly, or edit the Content field in the Properties panel.",
          "Set the font size (8 to 200) and the colour in the Properties panel.",
          "Switch to the Select tool and drag the box into its exact position. For precise placement, type X and Y values in the panel.",
        ],
        paragraphs: [
          "The exported PDF uses a standard sans-serif font (Helvetica). Styling such as bold, italic or alignment that you see in the editor may not appear identically in the exported file, so always check the result. The standard font covers common Latin characters; if export fails after adding text, look for characters such as emoji or non-Latin scripts and remove them.",
        ],
      },
      {
        heading: "Adding an image or logo",
        steps: [
          "Select the page you want to place the image on by clicking it, then click Image in the toolbar.",
          "Choose a PNG or JPG file. It is placed near the top left of the page and scaled down if it is very wide.",
          "Drag it into position with the Select tool, and set exact width and height in the Properties panel.",
          "To swap it for a different picture, use Replace Image in the Properties panel.",
        ],
      },
      {
        heading: "Drawing shapes",
        paragraphs: [
          "The Shape tool places a rectangle where you click. In the Properties panel you can change its fill colour, outline colour and border width. Rectangles are handy for drawing attention to a section, framing a field you have filled in, or creating a simple box for a note. Shapes are a visual layer only; a filled rectangle placed over text hides it from view but does not remove the text underneath from the file.",
        ],
      },
      {
        heading: "Hand-drawing a signature",
        steps: [
          "Click Sign in the toolbar. The cursor changes to a crosshair.",
          "Press and hold the mouse button on the page and draw your signature. You can lift and continue drawing to add more strokes.",
          "Select the signature to adjust its stroke colour and stroke width in the Properties panel, and drag it to the signature line.",
          "Export the document and check that the signature sits where you intended.",
        ],
        paragraphs: [
          "A drawn signature is an image of your handwriting placed on the page. It is not a certificate-based digital signature, which uses cryptography to prove who signed and whether the file changed afterwards. For many informal agreements a drawn signature is accepted, but if a contract, bank or government office requires a certified digital signature, use a service that provides one.",
        ],
      },
    ],
    tips: [
      "Zoom in with the toolbar before drawing a signature; larger, slower strokes look smoother.",
      "Use a dark blue or black stroke colour for signatures so they look natural when printed.",
      "Add text and images to pages that come from PDF files. If you start from photos, convert them to a PDF first, then reopen that PDF to annotate it.",
      "Delete an unwanted item by selecting it and clicking the trash icon at the top of the Properties panel.",
    ],
    mistakes: [
      "Expecting Undo to revert text or image edits. Undo and Redo apply to page changes such as reordering, rotating and deleting pages; remove or adjust annotations directly instead.",
      "Using a black rectangle to 'redact' confidential information. The original text remains in the file and can often be copied out; use dedicated redaction software for that.",
      "Placing images in formats other than PNG or JPG, which may not be embedded on export.",
      "Not reviewing the exported PDF, especially text positions, before sending it.",
    ],
    related: [
      "edit-sensitive-pdfs-privately",
      "prepare-pdf-for-printing-and-sharing",
      "convert-images-to-pdf",
    ],
  },
  {
    slug: "edit-sensitive-pdfs-privately",
    title: "How to Keep Sensitive Documents Private When Editing PDFs Online",
    description:
      "Practical habits for editing contracts, IDs, medical and financial PDFs online, and an honest explanation of how ModiPDF processes files inside your browser.",
    summary:
      "What actually happens to your files in a browser-based editor, which habits protect sensitive documents, and the limits of visual edits.",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    sections: [
      {
        heading: "Why it matters where a PDF is processed",
        paragraphs: [
          "The PDFs people edit most often are also the most sensitive: tax forms, payslips, rental agreements, passport scans, medical letters. Many online PDF services work by uploading your file to their servers, processing it there and sending a result back. That can be perfectly legitimate, but it means a copy of your document exists, at least temporarily, on infrastructure you do not control, and you rely on the provider's retention and security practices.",
          "Browser-based processing takes a different approach. The web page downloads the program code, and the program then runs on your own device. Your document is read from your disk into the tab's memory and never needs to leave your computer.",
        ],
      },
      {
        heading: "How ModiPDF handles your files",
        paragraphs: [
          "ModiPDF uses two open-source JavaScript libraries that run in the browser: PDF.js to draw page previews and pdf-lib to build the exported document. When you add a file, it is read locally. When you click Export, the new PDF is generated in the tab and handed to your browser as a download. There is no upload step and no account, and ModiPDF does not keep copies of your documents.",
          "The page itself does make some network requests: it loads its own code, the PDF.js worker script from a public content delivery network, and advertising scripts from Google AdSense, which may use cookies as described in our Privacy Policy. These requests fetch program code and ads; they do not carry the contents of your files. Closing or refreshing the tab clears the loaded documents from memory.",
        ],
      },
      {
        heading: "How to verify it yourself",
        steps: [
          "Open ModiPDF and load the page fully.",
          "Open your browser's developer tools (F12 in most desktop browsers) and switch to the Network tab.",
          "Add a PDF, make an edit and export it.",
          "Look through the requests. You should see no request that sends your document's data to a server. Alternatively, disconnect from the internet after the editor has loaded and confirm that loading, editing and exporting still work.",
        ],
      },
      {
        heading: "Good habits for sensitive documents",
        bullets: [
          "Use a device you trust. A browser-based tool is only as private as the computer it runs on; avoid shared or public computers for confidential files.",
          "Close the tab when you are finished so the documents are cleared from memory.",
          "Check where your browser saves downloads, and delete working copies you no longer need, especially on synced folders.",
          "Share only what is necessary. Delete pages that the recipient does not need before exporting, rather than sending the whole document.",
          "Name files carefully. A file name like 'passport-john-smith.pdf' reveals information even before it is opened.",
        ],
      },
      {
        heading: "Know the limits of visual edits",
        paragraphs: [
          "Covering text with a filled shape hides it visually but does not delete it. The original text usually remains in the page data and can be selected, copied or extracted with other tools. ModiPDF is not a redaction tool, so if you must permanently remove information such as account numbers, use software with a true redaction feature, or remove the page entirely in ModiPDF if the whole page can go.",
          "Similarly, a hand-drawn signature is an image, not a cryptographic proof of identity. Treat it as you would a signature on paper that was scanned.",
          "Exporting creates a new PDF from your pages, so document-level properties from the original file, such as its title and author fields, are generally not carried over. Hidden content inside the pages themselves, such as text beneath an image, is copied along with the page.",
        ],
      },
    ],
    tips: [
      "For the most sensitive files, load the editor, then switch off your network connection while you work as an extra precaution.",
      "Keep the original file untouched and export edits under a new name so you always have an unaltered copy.",
      "Use your operating system's built-in file encryption or a password manager's secure notes for storing scanned IDs long-term.",
    ],
    mistakes: [
      "Assuming a black box over text is a redaction.",
      "Leaving exported copies of sensitive documents in a shared Downloads folder.",
      "Editing confidential files on a borrowed or public computer.",
      "Sending an entire document when only one or two pages were requested.",
    ],
    related: [
      "add-text-images-signature-to-pdf",
      "reorder-delete-rotate-pdf-pages",
      "prepare-pdf-for-printing-and-sharing",
    ],
  },
  {
    slug: "prepare-pdf-for-printing-and-sharing",
    title: "How to Prepare a PDF for Printing or Sharing",
    description:
      "A pre-flight checklist for PDFs: confirm page order and orientation, remove unneeded pages, choose a clear file name and check the exported file before you print or send it.",
    summary:
      "A practical checklist for page order, orientation, file naming and final checks before you print a PDF or send it to someone.",
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    sections: [
      {
        heading: "Why a final check is worth five minutes",
        paragraphs: [
          "Most document mistakes are discovered by the recipient: a missing page, a sideways scan, an attachment called 'scan0003.pdf', or a draft page left in by accident. A short, consistent check before printing or sending catches nearly all of them. The steps below use ModiPDF's page tools, but the checklist works whatever software you use.",
        ],
      },
      {
        heading: "Step 1: Get every page into one document",
        paragraphs: [
          "Open your main PDF in ModiPDF and use the + button in the Pages panel to add any supporting files, such as appendices, signed forms or photographed receipts in JPG or PNG format. One well-ordered file is easier to print and less likely to be misplaced than several attachments.",
        ],
      },
      {
        heading: "Step 2: Confirm order and orientation",
        steps: [
          "Scroll through the thumbnails in the Pages panel from top to bottom and compare them with your intended structure, for example cover, summary, body, appendices.",
          "Drag any page that is out of place to its correct position.",
          "Rotate sideways or upside-down pages with the rotate icon on the thumbnail. For printing, every page should read upright on screen.",
          "Check that the page count at the top of the Pages panel matches what you expect.",
        ],
      },
      {
        heading: "Step 3: Remove what does not belong",
        paragraphs: [
          "Delete blank scanner pages, duplicate pages and internal notes. For printing this saves paper; for sharing it keeps the document focused and avoids disclosing information the recipient does not need. Select multiple pages with Ctrl or Cmd and click, then delete them together from the right-hand panel.",
        ],
      },
      {
        heading: "Step 4: Name the file clearly",
        paragraphs: [
          "Type the file name in the field at the top left of the editor before exporting. A good name says what the document is, who or what it relates to and when, for example '2026-10-invoice-acme.pdf' or 'lease-agreement-signed-2026-10.pdf'. Avoid spaces and special characters if the file will be uploaded to a portal, since some systems handle them poorly. ModiPDF adds the .pdf extension automatically if you leave it out.",
        ],
      },
      {
        heading: "Step 5: Export and check the output",
        steps: [
          "Click Export and open the downloaded file in a regular PDF viewer.",
          "Page through the whole document once at normal size, not just the first page.",
          "Check the file size. If it is too large for an email or upload limit, the usual cause is high-resolution photos; reduce those images and rebuild the PDF, since ModiPDF does not compress files.",
          "For printing, use the print preview and choose 'fit to page' if the pages are not all the same size, which is common when images were converted to PDF.",
        ],
      },
      {
        heading: "Sharing through email and upload portals",
        paragraphs: [
          "Email providers and online forms often set attachment limits, commonly in the range of 10 to 25 MB, and some portals reject files with unusual characters in the name. Check the requirements before you export so you can plan the file name and decide whether any large images need to be reduced first.",
          "When a portal asks for separate files for separate items, such as one PDF for proof of address and another for identification, export each one on its own: build the first document, export it, then use Undo to restore the removed pages, or start again with the next set of files. Keeping each upload focused on a single item makes it easier for the person reviewing it.",
        ],
      },
    ],
    tips: [
      "Print a single test page before printing a long document, especially for double-sided jobs.",
      "If the recipient will print the file, keep all pages in the same orientation where possible.",
      "Keep the original source files until the recipient confirms they received a working document.",
      "Mention the page count in your email so the recipient can tell whether anything is missing.",
    ],
    mistakes: [
      "Sending the file without opening the exported version first.",
      "Leaving the default name 'Untitled Document' on the exported file.",
      "Mixing page sizes and forgetting to select 'fit to page' when printing, which can cut off edges.",
      "Including draft or internal pages because the thumbnails were not reviewed.",
    ],
    related: [
      "merge-pdf-files",
      "reorder-delete-rotate-pdf-pages",
      "convert-images-to-pdf",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
