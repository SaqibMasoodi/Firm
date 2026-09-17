import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

interface CtaCardProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  imageSrc?: string;
}

export default function CtaCard({
  tagline = "Get in touch",
  heading = "Lets work together",
  description = "Ready to transform your brand's digital presence and unlock the full potential of social media marketing? Reach out today, and let's start crafting your success story together.",
  buttonText = "Get in touch",
  buttonHref = "/contact",
  secondaryButtonText = "Book a call",
  secondaryButtonHref = "/contact",
  imageSrc = "https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/663a26437b9503c0b4170be5_austin-distel-wawEfYdpkag-unsplash%20(1)%20(1).webp",
}: CtaCardProps) {
  return (
    <section className="section-cta">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-bottom padding-small">
            <div className="cta-component">
              <ScrollReveal>
                <div className="cta-card">
                  <div className="cta-card-conent">
                    <div className="tagline-pill">
                      <div>{tagline}</div>
                    </div>
                    <div className="cta-card-content-top">
                      <div className="margin-bottom margin-small">
                        <h2 className="heading-style-h2 weight-medium">
                          {heading}
                        </h2>
                      </div>
                      <p className="text-size-medium">{description}</p>
                    </div>
                    <div className="margin-top margin-medium">
                      <div className="button-group">
                        <Link href={buttonHref} className="button">
                          {buttonText}
                        </Link>
                        <Link
                          href={secondaryButtonHref}
                          className="button-secondary"
                        >
                          {secondaryButtonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="cta-image-wrapper">
                    <Image
                      src={imageSrc}
                      alt="Work together"
                      width={1440}
                      height={960}
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
  );
}
