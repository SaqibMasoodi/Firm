import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/schemas";
import SplashScreen from "@/components/ui/splash-screen";

export const viewport: Viewport = {
  width: 1280,
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
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <OrganizationSchema />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateViewport() {
                  var w = window.screen.width;
                  if (w < 1280) {
                    var scale = (w / 1280).toFixed(4);
                    var meta = document.querySelector('meta[name="viewport"]');
                    var content = 'width=1280, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=3.0, user-scalable=yes';
                    if (meta) {
                      meta.setAttribute('content', content);
                    } else {
                      var m = document.createElement('meta');
                      m.name = 'viewport';
                      m.content = content;
                      document.head.appendChild(m);
                    }
                  }
                }
                updateViewport();
                window.addEventListener('orientationchange', function() {
                  setTimeout(updateViewport, 100);
                });
              })();
            `,
          }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <SplashScreen />
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
