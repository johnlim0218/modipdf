import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";

export default function SiteHeader() {
  return (
    <nav
      className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100"
      aria-label="Main navigation"
    >
      <Link href="/" className="flex items-center gap-2">
        <div
          className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold"
          aria-hidden="true"
        >
          M
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">
          ModiPDF
        </span>
      </Link>
      <div className="flex items-center gap-4 md:gap-6 text-sm text-gray-500">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-indigo-600 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
