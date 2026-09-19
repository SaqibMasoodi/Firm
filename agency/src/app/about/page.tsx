import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ClientLogos from "@/components/sections/client-logos";
import CompanySnapshot from "@/components/sections/company-snapshot";
import Team from "@/components/sections/team";
import CoreValues from "@/components/sections/core-values";
import CtaCard from "@/components/sections/cta-card";

import { getSiteHeader } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We're not just a social media marketing agency—we're your ticket to digital excellence and engagement growth.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const header = await getSiteHeader("about");

  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      {/* 1. Subpage Hero */}
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>About us</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h1 className="heading-style-h1 weight-medium">
                        Connecting Your Brand to the World, One Click at a Time.
                      </h1>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <p className="text-size-medium">
                      We&apos;re not just a social media marketing agency—we&apos;re
                      your ticket to digital excellence and engagement growth.
                      With a canvas as vast as the internet, your business has
                      limitless potential to connect with its audience. And
                      we&apos;re here to paint that picture of success.
                    </p>
                  </ScrollReveal>
                  <div className="margin-top margin-medium">
                    <ScrollReveal delay={0.3}>
                      <div className="button-group">
                        <Link href="/contact" className="button">
                          <div className="button-text-item">Get in touch</div>
                        </Link>
                        <Link
                          href="/contact"
                          className="button-secondary"
                        >
                          <div className="button-text-item">Book a call</div>
                        </Link>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>

                <ScrollReveal delay={0.2}>
                  <div className="subpage-header-image-wrapper">
                    <Image
                      src={header.image || "/images/about/team-culture.webp"}
                      alt={header.alt || "Modern office lobby"}
                      width={1440}
                      height={960}
                      className="subpage-header-image"
                      priority
                      sizes="(max-width: 991px) 90vw, 45vw"
                      style={{ objectPosition: header.objectPosition || "50% 50%" }}
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Brands we work with */}
      <ClientLogos />

      {/* 3. Company Snapshot (Bento Grid) */}
      <CompanySnapshot />

      {/* 4. Our Team */}
      <div id="team">
        <Team />
      </div>

      {/* 5. Values Behind Our Work */}
      <CoreValues />

      {/* 6. Let's Work Together CTA */}
      <CtaCard />
    </div>
  );
}
