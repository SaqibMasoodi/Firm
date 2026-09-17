import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function CompanySnapshot() {
  return (
    <div className="section-stat">
      <section className="stats-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="stats-component">
                <div className="stats-section-header">
                  <div className="max-width-large">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>About Nova</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h2 className="heading-style-h2 weight-medium">
                          Our company snapshot
                        </h2>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        Founded in Manchester in 2011, Nova is a cutting-edge
                        social media marketing agency that empowers brands with
                        tailored strategies, driving unparalleled engagement and
                        growth in the digital realm.
                      </p>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <div className="button-group">
                      <Link href="/contact" className="button">
                        <div className="button-text-item">Get in touch</div>
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal delay={0.2}>
                  <div className="stats-list">
                    {/* Item 1: Tall White Card (spans 2 rows) */}
                    <div className="stats-item is-tall">
                      <div className="margin-bottom margin-large">
                        <div className="stat-number">30</div>
                      </div>
                      <div className="stat-item-content">
                        <h3 className="heading-style-h6">Team members</h3>
                        <div className="margin-top margin-xxsmall">
                          <p className="text-size-regular">
                            Our dedicated team members have played a pivotal
                            role in transforming challenges into success
                            stories, employing their expertise and creativity to
                            craft bespoke solutions that drive real results for
                            our clients.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Skyline Meeting Image */}
                    <div className="stat-image-wrapper">
                      <Image
                        src="https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/663a3ea4795361db872d7652_ant-rozetsky-HXOllTSwrpM-unsplash%20(3).webp"
                        alt="City view office"
                        width={800}
                        height={533}
                        className="stat-image"
                        sizes="(max-width: 479px) 83vw, (max-width: 767px) 82vw, (max-width: 991px) 41vw, 27vw"
                      />
                    </div>

                    {/* Item 3: Dark Black Card */}
                    <div className="stats-item is-dark">
                      <div className="margin-bottom margin-large">
                        <div className="stat-number">98%</div>
                      </div>
                      <div className="stat-item-content">
                        <h3 className="heading-style-h6">Satisfaction rate</h3>
                        <div className="margin-top margin-xxsmall">
                          <p className="text-size-regular">
                            Nova boasts an impressive client satisfaction rate of
                            98%, reflecting our commitment to excellence and the
                            effectiveness of our strategies in meeting client
                            objectives.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 4: Lime Green Card */}
                    <div className="stats-item is-green">
                      <div className="margin-bottom margin-large">
                        <div className="stat-number">236+</div>
                      </div>
                      <div className="stat-item-content">
                        <h3 className="heading-style-h6">Happy clients</h3>
                        <div className="margin-top margin-xxsmall">
                          <p className="text-size-regular">
                            We&apos;ve had the privilege of partnering with a
                            diverse range of businesses, from startups to
                            established enterprises, each with their unique
                            challenges and aspirations.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Item 5: Whiteboard Meeting Image */}
                    <div className="stat-image-wrapper">
                      <Image
                        src="https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f7e_adrian-cuj-o_9YmCY0bag-unsplash-5.webp"
                        alt="Meeting room brainstorming"
                        width={800}
                        height={533}
                        className="stat-image"
                        sizes="(max-width: 479px) 83vw, (max-width: 767px) 82vw, (max-width: 991px) 41vw, 27vw"
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
