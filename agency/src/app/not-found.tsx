import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrapper">
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content" style={{ alignItems: "center", textAlign: "center" }}>
                  <div className="tagline-pill">
                    <div>404 Error</div>
                  </div>
                  <div className="margin-bottom margin-small">
                    <h1
                      className="heading-style-h1"
                      style={{
                        fontSize: "clamp(5rem, 12vw, 8rem)",
                        color: "var(--green, #CBFB45)",
                        lineHeight: 1,
                        marginBottom: "0.5rem",
                      }}
                    >
                      404
                    </h1>
                    <h2 className="heading-style-h2">Page not found</h2>
                  </div>
                  <p className="text-size-medium max-width-small" style={{ marginBottom: "2.5rem" }}>
                    Sorry, the page you&apos;re looking for doesn&apos;t exist, has been moved,
                    or is hidden in the subterranean forge.
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
      </header>
    </div>
  );
}
