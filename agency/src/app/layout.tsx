import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/schemas";
import SplashScreen from "@/components/ui/splash-screen";
import BlacksmithCursor from "@/components/ui/blacksmith-cursor";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://northforgelabs.com";

export const metadata: Metadata = {
  title: {
    default: "Northforge Labs",
    template: "%s — Northforge Labs",
  },
  description: "Software. Design. AI.",
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Northforge Labs",
    description: "Software. Design. AI.",
    url: siteUrl,
    siteName: "Northforge Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og/og-image.png",
        secureUrl: "/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Northforge Labs",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northforge Labs",
    description: "Software. Design. AI.",
    images: ["/images/og/og-image.png"],
  },
  alternates: {
    canonical: "/",
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
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("northforge_splash_viewed")==="true"){document.documentElement.classList.add("splash-viewed");}}catch(e){}})();`,
          }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <SplashScreen />
        <BlacksmithCursor />
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
