import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/site/ContentPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ModiPDF",
  description:
    "What ModiPDF is, why it was built, and how it edits PDFs entirely inside your browser using PDF.js and pdf-lib without uploading your files.",
  alternates: { canonical: "/about" },
};

const h2 = "text-xl font-bold text-gray-900 mb-3";

export default function AboutPage() {
  return (
    <ContentPage>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        About {SITE_NAME}
      </h1>
      <p className="text-sm text-gray-400 mb-10">
        A free PDF editor that runs in your browser
      </p>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className={h2}>What ModiPDF is</h2>
          <p>
            {SITE_NAME} is a free, web-based tool for the everyday PDF jobs that
            come up at work, at school and at home. You can combine several PDFs
            into one, drag pages into a new order, rotate or delete pages, turn
            JPG and PNG images into PDF pages, and place text, images, rectangles
            and a hand-drawn signature on a page. When you are done, you export
            a new PDF and your browser downloads it.
          </p>
          <p className="mt-3">
            There is no account to create and nothing to install. It works in
            current versions of desktop browsers such as Chrome, Edge, Firefox
            and Safari.
          </p>
        </section>

        <section>
          <h2 className={h2}>Why it was built</h2>
          <p>
            Small PDF tasks, like putting a signed form in front of a report or
            removing two blank pages from a scan, often lead people to tools
            that ask them to upload personal documents, sign up for an account,
            or pay a subscription for a two-minute job. {SITE_NAME} was built to
            offer a simpler option: open a page, do the task, download the
            file, and keep your documents on your own device the whole time.
          </p>
        </section>

        <section>
          <h2 className={h2}>How it works</h2>
          <p>
            {SITE_NAME} is a web application whose processing happens on the
            client side, meaning in your browser rather than on a server. It
            relies on two well-established open-source libraries:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              <strong>PDF.js</strong>, originally developed by Mozilla, which
              reads PDF files and draws the page thumbnails and previews you see
              in the editor.
            </li>
            <li>
              <strong>pdf-lib</strong>, which builds the exported document: it
              copies the pages you kept in the order you chose, applies
              rotation, embeds images and draws your text, shapes and signature
              on the pages.
            </li>
          </ul>
          <p className="mt-3">
            When you add a file, the browser reads it from your disk into the
            tab&apos;s memory. When you click Export, the new PDF is created in
            that same tab and offered to you as a download. Closing or
            refreshing the tab clears the loaded files.
          </p>
        </section>

        <section>
          <h2 className={h2}>Our approach to privacy</h2>
          <p>
            Because the editing happens locally, your documents are not uploaded
            to us and we have no copy of them. The website still needs the
            network to load its own code and the PDF.js worker script, and it
            displays advertising from Google AdSense, which helps keep the tool
            free. Those requests do not include the contents of your files. The
            details, including how advertising cookies are used, are in the{" "}
            <Link href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-3">
            We also try to be honest about limits. A shape drawn over text hides
            it visually but does not remove it from the file, and a drawn
            signature is not a certified digital signature. Our{" "}
            <Link
              href="/guides/edit-sensitive-pdfs-privately"
              className="text-indigo-600 hover:underline"
            >
              privacy guide
            </Link>{" "}
            explains these points in more detail.
          </p>
        </section>

        <section>
          <h2 className={h2}>Who runs ModiPDF</h2>
          <p>
            {SITE_NAME} is built and maintained by an independent developer.
            It is a small project, not a large company, and it improves through
            feedback from the people who use it. Bug reports and feature
            suggestions are genuinely welcome.
          </p>
        </section>

        <section>
          <h2 className={h2}>Get in touch</h2>
          <p>
            Found a problem, or have an idea that would make {SITE_NAME} more
            useful? Visit the{" "}
            <Link href="/contact" className="text-indigo-600 hover:underline">
              contact page
            </Link>
            . For quick answers, see the{" "}
            <Link href="/faq" className="text-indigo-600 hover:underline">
              FAQ
            </Link>{" "}
            or browse the{" "}
            <Link href="/guides" className="text-indigo-600 hover:underline">
              step-by-step guides
            </Link>
            .
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
