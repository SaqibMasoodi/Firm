"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical root error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#171717",
          color: "#FFFFFF",
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem", padding: "2rem", boxSizing: "border-box" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.4rem 1rem",
              borderRadius: "100rem",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "#cbfb45",
              marginBottom: "1.5rem",
              letterSpacing: "0.04em",
            }}
          >
            CRITICAL SYSTEM EXCEPTION
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "#FFFFFF",
              margin: "0 0 1rem 0",
            }}
          >
            Root Layout Interrupted
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#818181",
              margin: "0 0 2rem 0",
            }}
          >
            A critical exception occurred in the primary application layout.
          </p>
          {error.digest && (
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.8125rem",
                color: "#818181",
                marginBottom: "2rem",
              }}
            >
              Reference: <code>{error.digest}</code>
            </div>
          )}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: "0.85rem 1.8rem",
                borderRadius: "100rem",
                backgroundColor: "#cbfb45",
                color: "#171717",
                border: "none",
                fontWeight: 600,
                fontSize: "0.9375rem",
                cursor: "pointer",
              }}
            >
              Reload Application
            </button>
            <Link
              href="/"
              style={{
                padding: "0.85rem 1.8rem",
                borderRadius: "100rem",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Return to Surface
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
