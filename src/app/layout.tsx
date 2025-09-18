import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "DaF Fergana - Nemis tili o'qitish markazi",
  description:
    "DaF Sprachzentrum M.CH.J — nemis tilini o'qitishga ixtisoslashgan til markazi. O'zbekiston bo'ylab 8 ta filial.",
  keywords:
    "nemis tili, o'qish, til markazi, Farg'ona, DaF, Goethe, sertifikat",
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
      </body>
    </html>
  );
}
