import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { testimonialsSection as defaultSection } from "@/lib/constants";
import type { Testimonial, TestimonialsSectionData } from "@/types";

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? "0" : "1.2"}
      />
    </svg>
  );
}

function ArrowDiagonalIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getInitials(name: string): string {
  if (!name) return "CL";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

interface TestimonialsProps {
  data?: TestimonialsSectionData;
  testimonials?: Testimonial[];
}

export default function Testimonials({
  data,
  testimonials,
}: TestimonialsProps) {
  const activeImage = data?.image || defaultSection.image || "/images/testimonials/client-showcase.webp";
  const allTestimonials = data?.testimonials || testimonials || defaultSection.testimonials || [];
  const displayTestimonials = allTestimonials.slice(0, 3);

  return (
    <div className="section-testimonials">
      <section className="testimonials-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-large">
            <div className="section-padding-large">
              {/* Section Header */}
              <div className="margin-bottom margin-large">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Testimonials</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h2 className="heading-style-h2 weight-medium">
                          Hear what our clients say
                        </h2>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        Don&apos;t just take our word for it, see what the
                        awesome people we work with have to say.
                      </p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>

              {/* 2-Column Grid */}
              <div className="testimonials-grid-container">
                {/* Left: Featured Hero Image Card */}
                <ScrollReveal delay={0.15} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div className="testimonials-featured-card">
                    <div className="testimonials-featured-image-wrapper">
                      <Image
                        src={activeImage}
                        alt="Client success highlight"
                        fill
                        className="testimonials-featured-image"
                        sizes="(max-width: 991px) 90vw, 45vw"
                        priority={false}
                      />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Right: 3 Equal-Height Testimonial Cards */}
                <div className="testimonials-cards-stack">
                  {displayTestimonials.map((testimonial, idx) => (
                    <ScrollReveal
                      key={testimonial.id || idx}
                      delay={0.1 + idx * 0.1}
                      style={{ flex: "1 1 0%", height: "100%", display: "flex", flexDirection: "column" }}
                    >
                      <div className={`testimonial-stack-card ${idx === 0 ? "is-accent-card" : ""}`}>
                        <div>
                          {/* Star Rating - always 5 stars with empty stars for compensation */}
                          <div className="testimonial-card-rating">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const isFilled = i < (testimonial.rating ?? 5);
                              return (
                                <div
                                  key={i}
                                  className={`testimonial-card-star ${isFilled ? "is-filled" : "is-empty"}`}
                                >
                                  <StarIcon filled={isFilled} />
                                </div>
                              );
                            })}
                          </div>

                          {/* Quote */}
                          <div className="testimonial-card-quote">
                            &quot;{testimonial.quote}&quot;
                          </div>
                        </div>

                        {/* Author & Action Footer */}
                        <div className="testimonial-card-footer">
                          <div className="testimonial-card-author-row">
                            <div className="testimonial-avatar-initials">
                              {getInitials(testimonial.author)}
                            </div>
                            <div>
                              <div className="testimonial-author-name">
                                {testimonial.author}
                              </div>
                              <div className="testimonial-author-role">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>

                          <div className="testimonial-card-action" title="Client Feedback">
                            <ArrowDiagonalIcon />
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Full-Width Bottom CTA Strip */}
              <ScrollReveal delay={0.3}>
                <div className="testimonials-cta-strip">
                  <h3 className="testimonials-cta-heading">
                    Are you the next one?
                  </h3>
                  <Link href="/contact" className="testimonials-cta-button">
                    <span>Get in touch</span>
                    <span style={{ width: "1rem", height: "1rem", display: "inline-flex" }}>
                      <ArrowDiagonalIcon />
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
