import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { ToastProvider } from "@/components/ui/toast";
import { LeadProvider } from "@/components/LeadProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://dafzentrum.uz"),
  title: {
    default: "DaF Zentrum – O'zbekistonda nemis tili kurslari",
    template: "%s | DaF Zentrum",
  },
  description:
    "O'zbekistonda nemis tili kurslari, imtihonlarga tayyorgarlik va materiallar. A1–B2 darslar, tajribali o'qituvchilar va amaliy materiallar.",
  keywords: [
    "nemis tili",
    "nemis tili kurslari",
    "o'zbekistan",
    "goethe",
    "testdaf",
    "imtihon",
    "ta'lim",
    "daf zentrum",
    "fergana",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://dafzentrum.uz",
    title: "DaF Zentrum – O'zbekistonda nemis tili kurslari",
    description:
      "O'zbekistonda nemis tili kurslari, imtihonlarga tayyorgarlik va materiallar. A1–B2 darslar, tajribali o'qituvchilar va amaliy materiallar.",
    locale: "uz_UZ",
    siteName: "DaF Zentrum",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DaF Zentrum – O'zbekistonda nemis tili kurslari",
    description:
      "O'zbekistonda nemis tili kurslari, imtihonlarga tayyorgarlik va materiallar. A1–B2 darslar, tajribali o'qituvchilar va amaliy materiallar.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/assets/graduation-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="font-sans antialiased">
        <I18nProvider>
          <ToastProvider>
          <LeadProvider>
          <Navbar />
          <main className="min-h-screen [&_.hero-container]:px-0">
            {children}
          </main>
          <Footer />
          </LeadProvider>
          </ToastProvider>
        </I18nProvider>
        {/* Organization JSON-LD (can be overridden per-locale in future) */}
        <Script
          id="org-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DaF Sprachzentrum",
              url: "https://dafzentrum.uz",
              logo: "https://dafzentrum.uz/assets/daf-logo-black.png",
              description:
                "O'zbekistonda nemis tili kurslari, imtihonlarga tayyorgarlik va materiallar.",
              sameAs: [
                "https://t.me/daffergana",
                "https://www.instagram.com/daf_fergana/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
