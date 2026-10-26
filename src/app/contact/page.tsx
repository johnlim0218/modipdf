import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/site/ContentPage";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the developer of ModiPDF to report a bug, ask a question or suggest a feature, and learn what details make a bug report useful.",
  alternates: { canonical: "/contact" },
};

const h2 = "text-xl font-bold text-gray-900 mb-3";

export default function ContactPage() {
  return (
    <ContentPage>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        Contact {SITE_NAME}
      </h1>
      <p className="text-sm text-gray-400 mb-10">
        Questions, bug reports and suggestions
      </p>

      <div className="space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className={h2}>Email</h2>
          <p>
            The best way to reach us is by email. {SITE_NAME} is maintained by
            an independent developer, and every message is read personally.
          </p>
          <p className="mt-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block px-5 py-3 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-4">
            Please do not attach confidential documents. If a specific file
            causes a problem, describe it, or create a version that contains no
            personal information and still shows the issue.
          </p>
        </section>

        <section>
          <h2 className={h2}>Reporting a bug</h2>
          <p>
            A good bug report makes it much more likely that a problem can be
            reproduced and fixed. Where possible, please include:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li>
              Your browser and its version (for example, Chrome 130 on Windows
              11 or Safari on macOS).
            </li>
            <li>
              What you were trying to do, such as merging files, rotating pages,
              adding text or exporting.
            </li>
            <li>
              The steps you followed, in order, and what happened compared with
              what you expected.
            </li>
            <li>
              Details about the file: roughly how many pages, its approximate
              size, and whether it was a PDF or a JPG/PNG image.
            </li>
            <li>
              Any error message shown on screen. If you are comfortable using
              developer tools, messages from the browser console are very
              helpful.
            </li>
            <li>A screenshot, if it helps show the problem.</li>
          </ul>
        </section>

        <section>
          <h2 className={h2}>Feature requests and feedback</h2>
          <p>
            Suggestions are welcome, whether it is a missing tool, a confusing
            step or a small improvement. Telling us what task you were trying to
            finish helps more than naming a specific feature, because it shows
            the real need behind the request.
          </p>
        </section>

        <section>
          <h2 className={h2}>What to expect</h2>
          <p>
            Because this is a one-person project, replies are not instant. We
            aim to answer within a few days, though it can occasionally take
            longer. We cannot promise to build every suggestion, but each one is
            considered.
          </p>
        </section>

        <section>
          <h2 className={h2}>Looking for a quick answer?</h2>
          <p>
            Many common questions, such as which file types are supported or
            whether files are uploaded, are answered in the{" "}
            <Link href="/faq" className="text-indigo-600 hover:underline">
              FAQ
            </Link>
            . The{" "}
            <Link href="/guides" className="text-indigo-600 hover:underline">
              guides
            </Link>{" "}
            walk through each task step by step.
          </p>
        </section>
      </div>
    </ContentPage>
  );
}
