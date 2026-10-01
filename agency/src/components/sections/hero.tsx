import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { CrowdCanvas } from "@/components/ui/crowd-canvas";
import type { HeaderConfig } from "@/types";

interface HeroProps {
  header?: HeaderConfig;
}

export default function Hero({ header }: HeroProps) {
  const imageSrc = header?.image || "/images/hero/hero-main.jpg";
  const objectPosition = header?.objectPosition || "50% 50%";
  const imageAlt = header?.alt || "Northforge Labs Creative Office";

  return (
    <header className="section-subpage-hero-header">
      <div className="padding-global">
        <div className="container-large">
          <div className="section-padding-large">
            {/* Identical 2-Column Grid to About page */}
            <div className="subpage-header-component">
              {/* Left: Content */}
              <div className="header-content">
                <ScrollReveal priority>
                  <div className="tagline-pill">
                    <div>Welcome to Northforge Labs!</div>
                  </div>
                </ScrollReveal>
                <div className="margin-bottom margin-small">
                  <ScrollReveal priority delay={0.06}>
                    <h1 className="heading-style-h1 weight-medium">
                      Connecting Your Brand to the World, One Click at a Time.
                    </h1>
                  </ScrollReveal>
                </div>
                <ScrollReveal priority delay={0.12}>
                  <p className="text-size-medium" style={{ maxWidth: "32rem" }}>
                    We craft high-impact digital experiences, software, and growth strategies that help your brand connect and scale.
                  </p>
                </ScrollReveal>
                <div className="margin-top margin-medium">
                  <ScrollReveal priority delay={0.18}>
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

              {/* Right: Crowd Canvas Card (Desktop only, hidden on mobile) */}
              <ScrollReveal priority delay={0.18} className="hero-crowd-wrapper">
                <div className="subpage-header-image-wrapper hero-crowd-card">
                  <CrowdCanvas
                    src="/images/peeps/all-peeps.png"
                    rows={15}
                    cols={7}
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Full-Width Hero Image Below */}
            <ScrollReveal priority delay={0.24}>
              <div className="header-image-wrapper hero-banner-bottom">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1920}
                  height={1080}
                  className="header-image"
                  priority
                  quality={80}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1200px"
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