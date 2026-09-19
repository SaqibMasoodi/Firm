import Link from "next/link";

export default function NotFound() {
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
                  fontSize: "clamp(6rem, 15vw, 9rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "var(--green, #cbfb45)",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.04em",
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
              <p
                className="text-size-medium"
                style={{
                  marginBottom: "2.5rem",
                  color: "var(--grey-text, #A3A3A3)",
                  maxWidth: "28rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Sorry, the page you&apos;re looking for doesn&apos;t exist or
                has been moved.
              </p>
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
