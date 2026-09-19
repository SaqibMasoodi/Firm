import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to transform your brand's digital presence? Get in touch with the team at Northforge Labs.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
