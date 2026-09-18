import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { CrowdCanvas } from "@/components/ui/crowd-canvas";
import type { HeaderConfig } from "@/types";

interface HeroProps {
  header?: HeaderConfig;
}

export default function Hero({ header }: HeroProps) {
  const imageSrc = header?.image || "/images/hero/hero-banner.jpg";
  const objectPosition = header?.objectPosition || "50% 50%";
  const imageAlt = header?.alt || "Nova Creative Office";

  return (
    <header className="section-hero-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="section-padding-large">
            {/* ── 2-Column Grid: Text Left + Crowd Canvas Right ── */}
            <div className="hero-split-component">
              {/* Left: Content */}
              <div className="hero-split-content">
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
                    <div className="button-group">
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

              {/* Right: Crowd Canvas Container */}
              <ScrollReveal delay={0.2}>
                <div className="hero-crowd-container">
                  <CrowdCanvas
                    src="/images/peeps/all-peeps.png"
                    rows={15}
                    cols={7}
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* ── Full-Width Hero Image Below ── */}
            <ScrollReveal delay={0.4}>
              <div className="header-image-wrapper">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1920}
                  height={1080}
                  className="header-image"
                  priority
                  sizes="90vw"
                  style={{ objectPosition }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </header>
  );
}
