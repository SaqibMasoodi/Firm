import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { CaseStudy } from "@/types";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
      <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm34-118v48a6 6 0 0 1-12 0v-33.5l-45.8 45.7a5.9 5.9 0 0 1-8.4-8.4l45.7-45.8H108a6 6 0 0 1 0-12h48a6 6 0 0 1 6 6Z" />
    </svg>
  );
}

interface CaseStudiesPreviewProps {
  caseStudies?: CaseStudy[];
}

export default function CaseStudiesPreview({
  caseStudies = [],
}: CaseStudiesPreviewProps) {
  const homeCaseStudies = caseStudies.slice(0, 3);

  return (
    <section className="section-projects">
      <div className="padding-global">
        <div className="container-large">
          <div className="section-padding-large">
            <div className="project-section-header">
              <div className="max-width-large">
                <ScrollReveal>
                  <div className="tagline-pill">
                    <div>Case studies</div>
                  </div>
                </ScrollReveal>
                <div className="margin-bottom margin-small">
                  <ScrollReveal delay={0.1}>
                    <h2 className="heading-style-h2 weight-medium">
                      See our work
                    </h2>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.2}>
                  <p className="text-size-medium">
                    Welcome to the spotlight, where Northforge Labs&apos; magic touches
                    down, turning the ordinary into the extraordinary.
                  </p>
                </ScrollReveal>
              </div>
              <ScrollReveal delay={0.2}>
                <div className="button-group">
                  <Link href="/case-studies" className="button">
                    <div className="button-text-item">View all</div>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <div className="projects-component">
              <div className="project-list-wrapper">
                  <div className="project-list">
                    {homeCaseStudies.map((study, index) => {
                      const displayTags = study.tags.slice(0, 3);
                      const extraTags = study.tags.length - 3;
                      return (
                        <ScrollReveal
                          key={study.id}
                          delay={index * 0.1}
                          style={{ height: "100%", display: "flex", flexDirection: "column" }}
                        >
                          <div className="project-item">
                            <div className="project-item-link">
                              <Link
                                href={`/case-studies/${study.slug}`}
                                style={{ display: "block", textDecoration: "none", color: "inherit" }}
                              >
                                <div className="project-image-wrapper">
                                  <Image
                                    src={study.image || "/images/og/og-image.png"}
                                    alt={study.title}
                                    width={600}
                                    height={338}
                                    className="project-image"
                                    sizes="(max-width: 479px) 83vw, (max-width: 767px) 86vw, (max-width: 991px) 40vw, 26vw"
                                  />
                                </div>
                              </Link>
                              <div className="project-title-wrapper">
                                <div className="project-item-content-top">
                                  <div className="margin-bottom margin-xxsmall">
                                    <h3 className="heading-style-h5">
                                      <Link
                                        href={`/case-studies/${study.slug}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                      >
                                        {study.title}
                                      </Link>
                                    </h3>
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
      </div>
    </section>
  );
}
