import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Northforge Studio — Local Content & Asset Manager",
  description: "Dev-only local content management dashboard for Northforge Labs.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <style>{`
        .navbar-component, .footer-component {
          display: none !important;
        }
      `}</style>
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "var(--light-grey, #f8f8f8)",
        color: "var(--black, #171717)",
        overflow: "hidden",
        fontFamily: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}>
        {children}
      </div>
    </>
  );
}
