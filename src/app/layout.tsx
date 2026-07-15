import type { Metadata } from "next";
import { Inter, Outfit, Caveat, Alex_Brush } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "N. Dhanani | Professional Family Counselor & Public Speaker",
  description: "Experienced family counselor, stress consultant, parenting guide, and public speaker helping individuals and families resolve stress, build stronger relationships, and achieve self-improvement.",
  keywords: ["Family Counselor", "Stress Management", "Parenting Coach", "Self-Improvement", "Public Speaker", "N. Dhanani", "Counseling Sessions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${caveat.variable} ${alexBrush.variable} scroll-smooth`}>
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
