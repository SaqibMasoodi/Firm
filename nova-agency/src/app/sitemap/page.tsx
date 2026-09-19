import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getCaseStudies, getBlogPosts, getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Complete directory of all pages, case studies, services, and articles across Northforge Labs.",
};

function ArrowDiagonalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H7M17 7V17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function SitemapPage() {
  const [caseStudies, blogPosts, services] = await Promise.all([
    getCaseStudies(),
    getBlogPosts(),
    getServices(),
  ]);

  const corePages = [
    { title: "Home", href: "/", desc: "Homepage & hero introduction" },
    { title: "About Us", href: "/about", desc: "Our team, vision, and agency story" },
    { title: "Services", href: "/services", desc: "Full-service digital capabilities" },
    { title: "Case Studies", href: "/case-studies", desc: "Client work & transformations" },
    { title: "Blog", href: "/blog", desc: "Insights, industry trends & news" },
    { title: "Contact", href: "/contact", desc: "Inquiries & project kick-offs" },
    { title: "Admin CMS", href: "/admin", desc: "Site management dashboard" },
  ];

  return (
    <div className="page-wrapper">
      {/* 1. Subpage Hero Header */}
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>Directory</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h1 className="heading-style-h1 weight-medium">
                        Sitemap
                      </h1>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <p className="text-size-medium" style={{ maxWidth: "42rem" }}>
                      A complete, accessible overview of all pages, case studies,
                      services, and resources across Northforge Labs.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Sitemap Content Grid */}
      <section className="section-sitemap">
        <div className="padding-global">
          <div className="container-large">
            <div className="sitemap-component-wrapper">
              <div className="sitemap-inner-padding">
                <div className="sitemap-grid">
                  {/* Card 1: Core Pages */}
                  <ScrollReveal delay={0.1}>
                    <div className="sitemap-card">
                      <div className="sitemap-card-header">
                        <div>
                          <h2 className="sitemap-card-title">Main Pages</h2>
                          <div className="sitemap-card-subtitle">
                            Primary site navigation
                          </div>
                        </div>
                        <span className="sitemap-card-badge">
                          {corePages.length} pages
                        </span>
                      </div>
                      <div className="sitemap-list">
                        {corePages.map((page) => (
                          <Link
                            key={page.href}
                            href={page.href}
                            className="sitemap-link-item"
                          >
                            <div className="sitemap-link-info">
                              <span className="sitemap-link-title">
                                {page.title}
                              </span>
                              <span className="sitemap-link-url">
                                {page.href}
                              </span>
                            </div>
                            <div className="sitemap-link-arrow">
                              <ArrowDiagonalIcon />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Card 2: Case Studies */}
                  <ScrollReveal delay={0.15}>
                    <div className="sitemap-card">
                      <div className="sitemap-card-header">
                        <div>
                          <h2 className="sitemap-card-title">Case Studies</h2>
                          <div className="sitemap-card-subtitle">
                            Client projects &amp; results
                          </div>
                        </div>
                        <span className="sitemap-card-badge">
                          {caseStudies.length} projects
                        </span>
                      </div>
                      <div className="sitemap-list">
                        {caseStudies.map((study) => (
                          <Link
                            key={study.slug}
                            href={`/case-studies/${study.slug}`}
                            className="sitemap-link-item"
                          >
                            <div className="sitemap-link-info">
                              <span className="sitemap-link-title">
                                {study.title}
                              </span>
                              <span className="sitemap-link-url">
                                /case-studies/{study.slug}
                              </span>
                            </div>
                            <div className="sitemap-link-arrow">
                              <ArrowDiagonalIcon />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Card 3: Services */}
                  <ScrollReveal delay={0.2}>
                    <div className="sitemap-card">
                      <div className="sitemap-card-header">
                        <div>
                          <h2 className="sitemap-card-title">Services</h2>
                          <div className="sitemap-card-subtitle">
                            Capabilities &amp; specializations
                          </div>
                        </div>
                        <span className="sitemap-card-badge">
                          {services.length} services
                        </span>
                      </div>
                      <div className="sitemap-list">
                        {services.map((service) => (
                          <Link
                            key={service.slug || service.title}
                            href="/services"
                            className="sitemap-link-item"
                          >
                            <div className="sitemap-link-info">
                              <span className="sitemap-link-title">
                                {service.title}
                              </span>
                              <span className="sitemap-link-url">
                                /services · {service.features?.[0] || "Specialized capability"}
                              </span>
                            </div>
                            <div className="sitemap-link-arrow">
                              <ArrowDiagonalIcon />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Card 4: Blog Posts */}
                  <ScrollReveal delay={0.25}>
                    <div className="sitemap-card">
                      <div className="sitemap-card-header">
                        <div>
                          <h2 className="sitemap-card-title">Blog &amp; Insights</h2>
                          <div className="sitemap-card-subtitle">
                            Published articles &amp; perspectives
                          </div>
                        </div>
                        <span className="sitemap-card-badge">
                          {blogPosts.length} articles
                        </span>
                      </div>
                      <div className="sitemap-list">
                        {blogPosts.map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="sitemap-link-item"
                          >
                            <div className="sitemap-link-info">
                              <span className="sitemap-link-title">
                                {post.title}
                              </span>
                              <span className="sitemap-link-url">
                                /blog/{post.slug} · {post.date}
                              </span>
                            </div>
                            <div className="sitemap-link-arrow">
                              <ArrowDiagonalIcon />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Technical Feeds Strip */}
                <ScrollReveal delay={0.3}>
                  <div className="sitemap-tech-strip">
                    <div className="sitemap-tech-content">
                      <div className="sitemap-tech-title">
                        Machine-Readable &amp; Technical Feeds
                      </div>
                      <div className="sitemap-tech-desc">
                        Raw XML sitemaps and crawler directive files configured for search engines.
                      </div>
                    </div>
                    <div className="sitemap-tech-links">
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sitemap-tech-pill"
                      >
                        <span>XML Sitemap</span>
                        <ArrowDiagonalIcon />
                      </a>
                      <a
                        href="/robots.txt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sitemap-tech-pill"
                      >
                        <span>Robots.txt</span>
                        <ArrowDiagonalIcon />
                      </a>
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
