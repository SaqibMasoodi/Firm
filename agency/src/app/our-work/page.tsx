import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getWorkProjects, getOurWorkPageSettings } from "@/lib/content";
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
  const [workProjects, settings] = await Promise.all([getWorkProjects(), getOurWorkPageSettings()]);
  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Our Work", href: "/our-work" }]} />
      {/* Hero Header */}
      <header className="section-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="header-component">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
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
            </div>
          </div>
        </div>
      </header>

      <OurWorkPortfolio projects={workProjects} settings={settings} />

      {/* Bottom CTA Card Banner */}
      <section className="section-cta">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-bottom padding-small">
              <div className="cta-component">
                <ScrollReveal>
                  <div className="cta-card">
                    <div className="cta-card-conent">
                      <div className="tagline-pill">
                        <div>Get in touch</div>
                      </div>
                      <div className="cta-card-content-top">
                        <div className="margin-bottom margin-small">
                          <h2 className="heading-style-h2 weight-medium">
                            {settings.ctaTitle}
                          </h2>
                        </div>
                        <p className="text-size-medium">
                          {settings.ctaDescription}
                        </p>
                      </div>
                      <div className="margin-top margin-medium">
                        <div className="button-group">
                          <Link href="/contact" className="button">
                            <div className="button-text-item">Get in touch</div>
                          </Link>
                          <Link href="/contact" className="button-secondary">
                            <div className="button-text-item">Book a call</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="cta-image-wrapper">
                      <Image
                        src="/images/placeholder.svg"
                        alt="Collaboration"
                        width={700}
                        height={500}
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
    </div>
  );
}
