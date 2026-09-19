"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div
      className="page-wrapper"
      style={{
        minHeight: "calc(100vh - 180px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="padding-global" style={{ width: "100%" }}>
        <div className="container-large">
          <div
            style={{
              textAlign: "center",
              paddingTop: "clamp(11rem, 22vh, 17rem)",
              paddingBottom: "clamp(6rem, 14vh, 10rem)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ maxWidth: "34rem", margin: "0 auto", textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.4rem 1.1rem",
                  borderRadius: "100rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--green, #cbfb45)",
                  marginBottom: "1.5rem",
                  letterSpacing: "0.04em",
                }}
              >
                SYSTEM EXCEPTION
              </div>
              <h1
                className="heading-style-h2 weight-medium"
                style={{ marginBottom: "1rem" }}
              >
                Something went wrong
              </h1>
              <p
                className="text-size-medium"
                style={{
                  marginBottom: error.digest ? "1rem" : "2.5rem",
                  color: "var(--grey-text, #818181)",
                  maxWidth: "28rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                The application encountered an unhandled exception while
                rendering this view.
              </p>
              {error.digest && (
                <div
                  style={{
                    fontFamily: "var(--font-inter), monospace",
                    fontSize: "0.8125rem",
                    color: "var(--grey-text, #818181)",
                    marginBottom: "2.5rem",
                  }}
                >
                  Reference: <code>{error.digest}</code>
                </div>
              )}
              <div
                className="button-group is-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={() => reset()}
                  className="button"
                >
                  Try Again
                </button>
                <Link href="/" className="button-secondary">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
