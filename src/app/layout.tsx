import type { Metadata } from "next";
import Script from "next/script";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dafzentrum.uz"),
  title: {
    default: "DaF Zentrum – German Courses in Uzbekistan",
    template: "%s | DaF Zentrum",
  },
  description:
    "German language courses, exam prep, and resources in Uzbekistan. A1–B2 classes, experienced teachers, and practice materials.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://dafzentrum.uz",
    title: "DaF Zentrum",
    description: "German language courses and resources.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DaF Zentrum",
    description: "German language courses and resources.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={bricolage.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen [&_.hero-container]:px-0">
          {children}
        </main>
        <Footer />
        {/* Organization JSON-LD (can be overridden per-locale in future) */}
        <Script
          id="org-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DaF Zentrum",
              url: "https://dafzentrum.uz",
              logo: "https://dafzentrum.uz/logo.png",
              sameAs: ["https://t.me/your_channel_or_profile"],
            }),
          }}
        />
      </body>
    </html>
  );
}
