import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { caseStudies } from "@/lib/constants";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
      <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm34-118v48a6 6 0 0 1-12 0v-33.5l-45.8 45.7a5.9 5.9 0 0 1-8.4-8.4l45.7-45.8H108a6 6 0 0 1 0-12h48a6 6 0 0 1 6 6Z" />
    </svg>
  );
}

export default function CaseStudiesPreview() {
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
                    Welcome to the spotlight, where Nova&apos;s magic touches
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
                  {homeCaseStudies.map((study, index) => (
                    <ScrollReveal key={study.id} delay={index * 0.1}>
                      <div className="project-item">
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="project-item-link"
                        >
                          <div className="project-image-wrapper">
                            <Image
                              src={study.image}
                              alt={study.title}
                              width={600}
                              height={450}
                              className="project-image"
                              sizes="(max-width: 479px) 83vw, (max-width: 767px) 86vw, (max-width: 991px) 40vw, 26vw"
                            />
                          </div>
                          <div className="project-title-wrapper">
                            <div className="project-item-content-top">
                              <div className="margin-bottom margin-xxsmall">
                                <h3 className="heading-style-h5">
                                  {study.title}
                                </h3>
                              </div>
                              <div className="text-size-regular">
                                {study.description}
                              </div>
                              <div className="project-tag-list">
                                {study.tags.map((tag) => (
                                  <div key={tag} className="project-tag">
                                    <div>{tag}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="project-button-wrapper">
                              <div className="button-link">
                                <div className="button-text-item">
                                  View project
                                </div>
                                <div className="button-arrow">
                                  <ArrowIcon />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
