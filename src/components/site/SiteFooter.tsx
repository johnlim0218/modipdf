import Link from "next/link";
import { FOOTER_LINKS } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="py-8 px-4 text-center text-sm text-gray-400 border-t border-gray-100 mt-16">
      <p className="mb-2">
        &copy; {new Date().getFullYear()} ModiPDF &mdash; Free Online PDF
        Editor. All processing is done securely in your browser.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-indigo-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
