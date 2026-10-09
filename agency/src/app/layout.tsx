import ScrollJump from "@/components/ui/scroll-jump";
import PageScrollbar from "@/components/ui/page-scrollbar";
import { getSiteConfig } from "@/lib/content";
import { siteConfig } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/schemas";
import ClientInteractiveTools from "@/components/ui/client-interactive-tools";
import ClientSplashScreen from "@/components/ui/client-splash-screen";
import CookieBanner from "@/components/ui/cookie-banner";

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

const siteUrl = siteConfig.url.replace(/\/$/, "");

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        {/* "The iron never lies." Seek the subterranean halls of /agartha */}
        {/* Run while parsing the head, before the server-rendered splash can paint. */}
        <script
          id="splash-viewed-init"
          dangerouslySetInnerHTML={{
            __html: `var skipSplash=/Lighthouse|PageSpeed|Chrome-Lighthouse|PTST|Googlebot|HeadlessChrome/i.test(navigator.userAgent)||window.matchMedia("(prefers-reduced-motion: reduce)").matches;try{skipSplash=skipSplash||sessionStorage.getItem("northforge_splash_viewed")==="true";}catch(e){}if(skipSplash){document.documentElement.classList.add("splash-viewed");}`,
          }}
        />
        <noscript><style>{".splash-overlay { display: none !important; }"}</style></noscript>
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <ClientSplashScreen />
        <ClientInteractiveTools />
        <PageScrollbar enabled={config.draggableScrollbar} />
        <ScrollJump />
        <Navbar />
        <main id="main-content" style={{ flex: 1 }}>{children}</main>
        <Footer />
        <CookieBanner delaySeconds={config.cookieNoticeDelay} animate={config.cookieNoticeAnimation} />
      </body>
    </html>
  );
}
