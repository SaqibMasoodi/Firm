import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/schemas";

export const viewport: Viewport = {
  width: 1280,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Northforge Labs — Technology & Creative Agency",
    template: "%s | Northforge Labs",
  },
  description:
    "A technology and creative agency that helps businesses build digital products, grow their online presence, and automate their operations.",
  metadataBase: new URL("https://northforgelabs.com"),
  openGraph: {
    title: "Northforge Labs — Technology & Creative Agency",
    description:
      "Build digital products, grow your online presence, and automate operations.",
    url: "https://northforgelabs.com",
    siteName: "Northforge Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero/hero-banner.webp",
        width: 1920,
        height: 1080,
        alt: "Northforge Labs - Technology & Creative Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northforge Labs — Technology & Creative Agency",
    description:
      "Build digital products, grow your online presence, and automate operations.",
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
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
