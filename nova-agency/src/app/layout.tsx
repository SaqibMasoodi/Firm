import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Nova — Technology & Creative Agency",
    template: "%s | Nova",
  },
  description:
    "A technology and creative agency that helps businesses build digital products, grow their online presence, and automate their operations.",
  metadataBase: new URL("https://nova.agency"),
  openGraph: {
    title: "Nova — Technology & Creative Agency",
    description:
      "Build digital products, grow your online presence, and automate operations.",
    url: "https://nova.agency",
    siteName: "Nova",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova — Technology & Creative Agency",
    description:
      "Build digital products, grow your online presence, and automate operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
