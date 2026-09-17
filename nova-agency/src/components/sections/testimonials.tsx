import ScrollReveal from "@/components/ui/scroll-reveal";
import { testimonials } from "@/lib/constants";

function StarIcon() {
  return (
    <svg width="100%" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.16379 0.551109C8.47316 -0.183704 9.52684 -0.183703 9.83621 0.551111L11.6621 4.88811C11.7926 5.19789 12.0875 5.40955 12.426 5.43636L17.1654 5.81173C17.9684 5.87533 18.294 6.86532 17.6822 7.38306L14.0713 10.4388C13.8134 10.6571 13.7007 10.9996 13.7795 11.3259L14.8827 15.8949C15.0696 16.669 14.2172 17.2809 13.5297 16.8661L9.47208 14.4176C9.18225 14.2427 8.81775 14.2427 8.52793 14.4176L4.47029 16.8661C3.7828 17.2809 2.93036 16.669 3.11727 15.8949L4.22048 11.3259C4.29928 10.9996 4.18664 10.6571 3.92873 10.4388L0.317756 7.38306C-0.294046 6.86532 0.0315611 5.87533 0.834562 5.81173L5.57402 5.43636C5.91255 5.40955 6.20744 5.19789 6.33786 4.88811L8.16379 0.551109Z" fill="currentColor"/>
    </svg>
  );
}

export default function Testimonials() {
  return (
    <div className="section-testimonials">
      <section className="testimonials-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-large">
            <div className="section-padding-large">
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
                          What our clients say
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
              <ScrollReveal delay={0.1}>
                <div className="testimonial-component">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-content">
                      <div className="testimonial-rating-wrapper">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <div key={i} className="testimonial-rating-icon">
                              <div className="testimonial-icon">
                                <StarIcon />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="margin-bottom margin-small">
                        <div className="text-size-medium" style={{ color: "var(--text-primary)" }}>
                          &quot;{testimonial.quote}&quot;
                        </div>
                      </div>
                      <div className="testimonial-client">
                        <div className="testimonial-client-info">
                          <p className="weight-semibold">
                            {testimonial.author}
                          </p>
                          <p className="text-size-regular">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
