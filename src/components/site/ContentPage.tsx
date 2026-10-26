import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export default function ContentPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <SiteHeader />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
