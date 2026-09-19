import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to transform your brand's digital presence? Get in touch with the team at Northforge Labs.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Northforge Labs",
    description: "Ready to build something extraordinary? Get in touch with Northforge Labs for project inquiries and partnerships.",
    url: "/contact",
    images: ["/images/og/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Northforge Labs",
    description: "Ready to build something extraordinary? Get in touch with Northforge Labs for project inquiries and partnerships.",
    images: ["/images/og/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
