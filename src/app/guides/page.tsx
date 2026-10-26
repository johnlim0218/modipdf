import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/site/ContentPage";
import { guides } from "./guides";

export const metadata: Metadata = {
  title: "PDF Guides",
  description:
    "Step-by-step guides for merging PDFs, reordering and rotating pages, converting images to PDF, adding signatures and keeping documents private with ModiPDF.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <ContentPage>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        PDF Guides
      </h1>
      <p className="text-gray-600 leading-relaxed mb-10">
        Practical, step-by-step walkthroughs for everyday PDF tasks. Each guide
        explains how to do the job in ModiPDF, what to watch out for, and how to
        check the result before you share it.
      </p>

      <ul className="space-y-6">
        {guides.map((guide) => (
          <li
            key={guide.slug}
            className="p-6 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <Link
                href={`/guides/${guide.slug}`}
                className="hover:text-indigo-600"
              >
                {guide.title}
              </Link>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              {guide.summary}
            </p>
            <Link
              href={`/guides/${guide.slug}`}
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              Read the guide
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-gray-600 leading-relaxed mt-12">
        Have a question that is not covered here? See the{" "}
        <Link href="/faq" className="text-indigo-600 hover:underline">
          FAQ
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="text-indigo-600 hover:underline">
          get in touch
        </Link>
        .
      </p>
    </ContentPage>
  );
}
