import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getWorkProjects, getOurWorkPageSettings, getSiteHeader } from "@/lib/content";
import CtaCard from "@/components/sections/cta-card";
import OurWorkPortfolio from "@/components/sections/our-work-portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getOurWorkPageSettings();
  return {
  title: settings.title,
  description: settings.description,
  alternates: {
    canonical: "/our-work",
  },
  openGraph: {
    title: `${settings.title} — Northforge Labs`,
    description: settings.description,
    url: "/our-work",
    images: ["/images/og/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${settings.title} — Northforge Labs`,
    description: settings.description,
    images: ["/images/og/og-image.png"],
  },
  };
}

export default async function OurWorkPage() {
  const [workProjects, settings, header] = await Promise.all([getWorkProjects(), getOurWorkPageSettings(), getSiteHeader("our-work")]);
  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Our Work", href: "/our-work" }]} />
      {/* Hero Header */}
      <header className="section-subpage-hero-header balanced-hero">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Our Work</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h1 className="heading-style-h1 weight-medium">
                          {settings.title}
                        </h1>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        {settings.description}
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
                <ScrollReveal delay={0.2}>
                  <div className="subpage-header-image-wrapper">
                    <Image src={header.image || "/images/headers/our-work-main.webp"} alt={header.alt || "Our Work"} width={720} height={540} className="subpage-header-image" priority sizes="(max-width: 991px) 90vw, 42vw" style={{ objectPosition: header.objectPosition || "50% 50%" }} />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </header>

      <OurWorkPortfolio projects={workProjects} settings={settings} />

      <CtaCard heading={settings.ctaTitle} description={settings.ctaDescription} />
    </div>
  );
}
