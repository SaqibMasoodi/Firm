import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with us.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Northforge Labs",
    description: "Start a project with us.",
    url: "/contact",
    images: ["/images/og/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Northforge Labs",
    description: "Start a project with us.",
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
