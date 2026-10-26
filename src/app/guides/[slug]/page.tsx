import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPage from "@/components/site/ContentPage";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { guides, getGuide } from "../guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.related
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <ContentPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/guides" className="hover:text-indigo-600">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">{guide.title}</span>
      </nav>

      <article>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {guide.title}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Last updated:{" "}
          <time dateTime={guide.dateModified}>
            {new Date(guide.dateModified).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          {guide.summary}
        </p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {section.heading}
              </h2>
              {section.steps && (
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.paragraphs?.map((p) => (
                <p key={p} className="mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="p-6 bg-indigo-50/60 border border-indigo-100 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Tips</h2>
            <ul className="list-disc pl-6 space-y-2">
              {guide.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="p-6 bg-amber-50/60 border border-amber-100 rounded-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Common mistakes to avoid
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {guide.mistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </section>

          <section className="text-center py-8 border-y border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Try it in ModiPDF
            </h2>
            <p className="mb-5">
              Free to use, no account needed, and your files stay in your
              browser.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Open the editor
            </Link>
          </section>
        </div>
      </article>

      {related.length > 0 && (
        <aside className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Related guides
          </h2>
          <ul className="space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/guides/${r.slug}`}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  {r.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{r.summary}</p>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </ContentPage>
  );
}
