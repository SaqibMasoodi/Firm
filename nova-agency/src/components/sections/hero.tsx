import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function Hero() {
  return (
    <header className="section-hero-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="section-padding-large">
            <div className="header-component">
              <div className="margin-bottom margin-xxlarge">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Welcome to Nova!</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h1 className="heading-style-h1 weight-medium">
                          Connecting Your Brand to the World, One Click at a
                          Time.
                        </h1>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        We&apos;re not just a social media marketing agency—we&apos;re your
                        ticket to digital excellence and engagement growth. With a canvas as vast
                        as the internet, your business has limitless potential to connect with its
                        audience. And we&apos;re here to paint that picture of success.
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
              <ScrollReveal delay={0.4}>
                <div className="header-image-wrapper">
                  <Image
                    src="https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f79_adrian-cuj-o_9YmCY0bag-unsplash-2.webp"
                    alt="Office"
                    width={1920}
                    height={1080}
                    className="header-image"
                    priority
                    sizes="90vw"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
