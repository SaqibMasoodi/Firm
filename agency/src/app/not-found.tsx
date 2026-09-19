import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="page-wrapper"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="padding-global">
        <div className="container-large">
          <div
            className="section-padding-large"
            style={{
              textAlign: "center",
              paddingTop: "clamp(8rem, 16vh, 12rem)",
              paddingBottom: "clamp(4rem, 8vh, 6rem)",
            }}
          >
            <div style={{ maxWidth: "36rem", margin: "0 auto" }}>
              <div
                style={{
                  fontSize: "clamp(6rem, 14vw, 9rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "var(--green, #CBFB45)",
                  letterSpacing: "-0.04em",
                  marginBottom: "1rem",
                }}
              >
                404
              </div>
              <h1
                className="heading-style-h2 weight-medium"
                style={{ marginBottom: "1rem", letterSpacing: "-0.02em" }}
              >
                Page not found
              </h1>
              <p
                className="text-size-medium"
                style={{
                  marginBottom: "2.5rem",
                  color: "#71717A",
                  maxWidth: "28rem",
                  marginInline: "auto",
                  lineHeight: 1.6,
                }}
              >
                Sorry, the page you&apos;re looking for doesn&apos;t exist, has been moved,
                or is hidden in the subterranean forge.
              </p>
              <div
                className="button-group is-center"
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/" className="button">
                  Back to Home
                </Link>
                <Link href="/contact" className="button-secondary">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
