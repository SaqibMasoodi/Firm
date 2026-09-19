import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ClientLogos from "@/components/sections/client-logos";
import ServicesAccordion from "@/components/sections/services-accordion";
import CaseStudiesPreview from "@/components/sections/case-studies-preview";
import { stats } from "@/lib/constants";
import { getServices, getFeaturedCaseStudies, getSiteHeader } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive range of services including software development, UI/UX design, branding, digital marketing, and business automation.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services | Northforge Labs",
    description: "Explore our services across software engineering, product design, AI automation, branding, and digital strategy.",
    url: "/services",
    images: ["/images/og/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Northforge Labs",
    description: "Explore our services across software engineering, product design, AI automation, branding, and digital strategy.",
    images: ["/images/og/og-image.png"],
  },
};

export default async function ServicesPage() {
  const [services, featuredStudies, header] = await Promise.all([
    getServices(),
    getFeaturedCaseStudies(),
    getSiteHeader("services"),
  ]);
  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      {/* Subpage Hero */}
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>Our services</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h1 className="heading-style-h1 weight-medium">
                        We are a Technology & Creative Agency
                      </h1>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <p className="text-size-medium">
                      At Northforge Labs, we&apos;re not just about creating content;
                      we&apos;re about crafting a digital experience that
                      resonates with your audience and drives tangible results.
                      Our team of experts employs cutting-edge strategies and
                      creative prowess to enhance your online presence, engage
                      your community, and convert visitors into loyal customers.
                    </p>
                  </ScrollReveal>
                  <div className="margin-top margin-medium">
                    <ScrollReveal delay={0.3}>
                      <div className="button-group">
                        <Link href="/contact" className="button">
                          Get in touch
                        </Link>
                        <Link href="/contact" className="button-secondary">
                          Book a call
                        </Link>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
                <ScrollReveal delay={0.2}>
                  <div className="subpage-header-image-wrapper">
                    <Image
                      src={header.image || "/images/cta/cta-banner.webp"}
                      alt={header.alt || "Our services"}
                      width={720}
                      height={540}
                      className="subpage-header-image"
                      priority
                      sizes="(max-width: 991px) 90vw, 42vw"
                      style={{ objectPosition: header.objectPosition || "50% 50%" }}
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </header>

      <ClientLogos />
      <ServicesAccordion services={services} />

      {/* Case Studies */}
      <CaseStudiesPreview caseStudies={featuredStudies} />

      {/* Stats Section */}
      <div className="section-stats">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="stats-component">
                <div className="stats-section-header">
                  <div className="max-width-large">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Some stats</div>
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
                        Northforge Labs is a cutting-edge technology and creative agency
                        that empowers brands with tailored solutions, driving
                        unparalleled growth in the digital realm.
                      </p>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <div className="button-group">
                      <Link href="/contact" className="button">
                        Get in touch
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
                <ScrollReveal delay={0.1}>
                  <div className="stats-list">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className={`stats-item is-${stat.variant}`}
                      >
                        <div className="margin-bottom margin-large">
                          <div className="stat-number">{stat.value}</div>
                        </div>
                        <div className="stat-item-content">
                          <h3 className="heading-style-h6">{stat.label}</h3>
                          <div className="margin-top margin-xsmall">
                            <p className="text-size-regular">
                              {stat.description}
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
        </div>
      </div>
    </div>
  );
}
