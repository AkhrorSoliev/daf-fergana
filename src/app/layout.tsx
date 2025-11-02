import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

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
    <html lang="uz" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
  (function() {
    try {
      var storageKey = 'theme';
      var root = document.documentElement;
      var mql = window.matchMedia('(prefers-color-scheme: dark)');
      var saved = localStorage.getItem(storageKey);
      function apply(mode) {
        var dark = mode === 'dark' || (mode !== 'light' && mql.matches);
        root.classList.toggle('dark', dark);
        root.style.colorScheme = dark ? 'dark' : 'light';
      }
      var mode = saved || 'system';
      apply(mode);
      if (mode === 'system') {
        try { mql.addEventListener('change', function(){ apply('system'); }); } catch(e) { try { mql.addListener(function(){ apply('system'); }); } catch(_) {} }
      }
    } catch (e) {}
  })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <I18nProvider>
          <Navbar />
          <main className="min-h-screen [&_.hero-container]:px-0">
            <SmoothCursor />
            {children}
          </main>
          <Footer />
        </I18nProvider>
        {/* Organization JSON-LD (can be overridden per-locale in future) */}
        <Script
          id="org-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DaF Sprachzentrum Fergana",
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
