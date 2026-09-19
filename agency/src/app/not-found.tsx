import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div
            className="section-padding-large"
            style={{ textAlign: "center" }}
          >
            <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
              <div
                style={{
                  fontSize: "8rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "var(--accent)",
                  marginBottom: "1rem",
                }}
              >
                404
              </div>
              <h1
                className="heading-style-h2 weight-medium"
                style={{ marginBottom: "1rem" }}
              >
                Page not found
              </h1>
              <p className="text-size-medium" style={{ marginBottom: "2rem" }}>
                Sorry, the page you&apos;re looking for doesn&apos;t exist or
                has been moved.
              </p>
              <div className="button-group is-center">
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
