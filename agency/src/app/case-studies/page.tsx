import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore our portfolio of successful projects. See how we bring brands to life with cutting-edge digital strategies.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies & Client Work | Northforge Labs",
    description: "Explore our portfolio of digital products, web platforms, and automated solutions built for growing businesses.",
    url: "/case-studies",
    images: ["/images/og/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Client Work | Northforge Labs",
    description: "Explore our portfolio of digital products, web platforms, and automated solutions built for growing businesses.",
    images: ["/images/og/og-image.png"],
  },
};

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
      <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm34-118v48a6 6 0 0 1-12 0v-33.5l-45.8 45.7a5.9 5.9 0 0 1-8.4-8.4l45.7-45.8H108a6 6 0 0 1 0-12h48a6 6 0 0 1 6 6Z" />
    </svg>
  );
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }]} />
      {/* Hero Header */}
      <header className="section-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="header-component">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Case studies</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h1 className="heading-style-h1 weight-medium">
                          See how we bring brands to life
                        </h1>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        Welcome to the spotlight, where Northforge Labs&apos; magic touches
                        down, turning the ordinary into the extraordinary.
                      </p>
                    </ScrollReveal>
                    <div className="margin-top margin-medium">
                      <ScrollReveal delay={0.3}>
                        <div className="button-group is-center">
                          <Link href="/contact" className="button">
                            <div className="button-text-item">Get in touch</div>
                          </Link>
                          <Link href="/contact" className="button-secondary">
                            <div className="button-text-item">Book a call</div>
                          </Link>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Case Studies 2-Col Grid inside Rounded Grey Wrapper */}
      <div className="section-case-studies">
        <section className="case-studies-component-wrapper">
          <div className="padding-global is-2rem">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="projects-component">
                  <div className="case-studies-list">
                    {caseStudies.map((study, index) => {
                      const displayTags = study.tags.slice(0, 3);
                      const extraTags = study.tags.length - 3;
                      return (
                        <ScrollReveal
                          key={study.id}
                          delay={index * 0.1}
                          style={{ height: "100%", display: "flex", flexDirection: "column" }}
                        >
                          <div className="case-study-item">
                            <div className="case-study-item-link">
                              <Link
                                href={`/case-studies/${study.slug}`}
                                style={{ display: "block", textDecoration: "none", color: "inherit" }}
                              >
                                <div className="case-study-image-wrapper">
                                  <Image
                                    src={study.image}
                                    alt={study.title}
                                    width={720}
                                    height={450}
                                    className="case-study-image"
                                    sizes="(max-width: 479px) 76vw, (max-width: 767px) 77vw, (max-width: 991px) 37vw, 39vw"
                                  />
                                </div>
                              </Link>
                              <div className="case-study-title-wrapper">
                                <div className="project-item-content-top">
                                  <div className="margin-bottom margin-xxsmall">
                                    <h2 className="heading-style-h5">
                                      <Link
                                        href={`/case-studies/${study.slug}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                      >
                                        {study.title}
                                      </Link>
                                    </h2>
                                  </div>
                                  <div className="text-size-regular">
                                    {study.description}
                                  </div>
                                  <div className="project-tag-list">
                                    {displayTags.map((tag) => (
                                      <div key={tag} className="project-tag">
                                        <div>{tag}</div>
                                      </div>
                                    ))}
                                    {extraTags > 0 && (
                                      <div className="project-tag is-count">
                                        <div>+{extraTags}</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="project-button-wrapper" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "1rem" }}>
                                  <Link href={`/case-studies/${study.slug}`} className="button-link">
                                    <div className="button-text-item">
                                      View case study
                                    </div>
                                    <div className="button-arrow">
                                      <ArrowIcon />
                                    </div>
                                  </Link>
                                  {study.siteUrl && (
                                    <a
                                      href={study.siteUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="button-link"
                                    >
                                      <div className="button-text-item">
                                        Visit site
                                      </div>
                                      <div className="button-arrow">
                                        <ArrowIcon />
                                      </div>
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA Card Banner */}
      <section className="section-cta">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-bottom padding-small">
              <div className="cta-component">
                <ScrollReveal>
                  <div className="cta-card">
                    <div className="cta-card-conent">
                      <div className="tagline-pill">
                        <div>Get in touch</div>
                      </div>
                      <div className="cta-card-content-top">
                        <div className="margin-bottom margin-small">
                          <h2 className="heading-style-h2 weight-medium">
                            Let&apos;s work together
                          </h2>
                        </div>
                        <p className="text-size-medium">
                          Ready to transform your brand&apos;s digital presence
                          and unlock the full potential of social media marketing?
                          Reach out today, and let&apos;s start crafting your
                          success story together.
                        </p>
                      </div>
                      <div className="margin-top margin-medium">
                        <div className="button-group">
                          <Link href="/contact" className="button">
                            <div className="button-text-item">Get in touch</div>
                          </Link>
                          <Link href="/contact" className="button-secondary">
                            <div className="button-text-item">Book a call</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="cta-image-wrapper">
                      <Image
                        src="/images/cta/cta-banner.webp"
                        alt="Collaboration"
                        width={700}
                        height={500}
                        className="cta-image"
                        sizes="(max-width: 479px) 80vw, (max-width: 767px) 82vw, (max-width: 991px) 84vw, 44vw"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
