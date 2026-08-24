import type { Metadata } from "next";
import { Inter, Fraunces, Caveat, Alex_Brush } from "next/font/google";
import "./globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
  title: "N. Dhanani | Professional Family Counselor & Life Coach in Mumbai",
  description: "Guiding families through stress back to calm. 6+ years of evidence-based counseling for parenting overwhelm, marriage repair, corporate burnout, and life coaching.",
  keywords: [
    "Family Counselor Mumbai",
    "Parenting Coach",
    "Marriage Relationship Repair",
    "Stress Management",
    "Nikunj Dhanani",
    "Life Coaching Mumbai",
    "Counselor Near Me"
  ],
  authors: [{ name: "Nikunj Dhanani" }],
  openGraph: {
    title: "N. Dhanani | Family Counselor & Life Coach",
    description: "Guiding families through stress, back to calm. 6+ years experience, 80+ families & leaders across India.",
    url: "https://nikunj-portfolio-ten.vercel.app",
    siteName: "N. Dhanani Counseling",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <body className="flex flex-col min-h-screen bg-warm-linen text-ink-navy selection:bg-dusty-sky/30">
        <MainLayoutWrapper>{children}</MainLayoutWrapper>
      </body>
    </html>
  );
}
