import ScrollReveal from "@/components/ui/scroll-reveal";

const valuesData = [
  {
    title: "Creativity and Innovation",
    description:
      "We prioritize fresh, original ideas and pioneering strategies to ensure our clients' brands stand out in the ever-evolving digital landscape.",
    isGrey: false,
  },
  {
    title: "Transparency and Integrity",
    description:
      "Our commitment to honest communication and ethical practices builds trust and exceeds professional standards.",
    isGrey: true,
  },
  {
    title: "Data-Driven Decisions",
    description:
      "Our strategies are informed by analytics, ensuring actions are backed by evidence for maximum ROI.",
    isGrey: false,
  },
  {
    title: "Client-Centric Approach",
    description:
      "We tailor our services to meet each client's unique needs, acting as partners fully invested in their success.",
    isGrey: true,
  },
  {
    title: "Continuous Learning and Adaptation",
    description:
      "We embrace ongoing education and adapt quickly to changes, keeping our strategies on the cutting edge of social media trends.",
    isGrey: false,
  },
  {
    title: "Collaborative Teamwork",
    description:
      "Our team's diverse talents come together in unity, creating synergistic solutions that amplify our clients' social media presence.",
    isGrey: true,
  },
];

export default function CoreValues() {
  return (
    <section className="section-values">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-bottom padding-huge">
            <div className="values-component">
              <div className="margin-bottom margin-large">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Our values</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h2 className="heading-style-h2 weight-medium">
                          Values behind our work
                        </h2>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </div>

              <ScrollReveal delay={0.1}>
                <div className="values-list">
                  {valuesData.map((item, index) => (
                    <div
                      key={index}
                      className={`values-item ${item.isGrey ? "is-grey" : ""}`}
                    >
                      <h3 className="heading-style-h5 weight-medium">
                        {item.title}
                      </h3>
                      <div className="value-item-content">
                        <div className="margin-top margin-xxsmall">
                          <p className="text-size-regular">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
