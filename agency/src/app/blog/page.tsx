import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Technology. Design. Automation.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Insights — Northforge Labs",
    description: "Technology. Design. Automation.",
    url: "/blog",
    images: ["/images/og/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights — Northforge Labs",
    description: "Technology. Design. Automation.",
    images: ["/images/og/og-image.png"],
  },
};

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
      <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm34-118v48a6 6 0 0 1-12 0v-33.5l-45.8 45.7a5.9 5.9 0 0 1-8.4-8.4l45.7-45.8H108a6 6 0 0 1 0-12h48a6 6 0 0 1 6 6Z" />
    </svg>
  );
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
      <header className="section-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="header-component">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>Blogs</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h1 className="heading-style-h1 weight-medium">
                          Our latest news and trending topics
                        </h1>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">
                        Every brand has a story worth telling. Our blog is more
                        than just a collection of articles; it&apos;s a community
                        of forward-thinkers, dreamers, and doers ready to make
                        their mark on the digital world.
                      </p>
                    </ScrollReveal>
                    <div className="margin-top margin-medium">
                      <ScrollReveal delay={0.3}>
                        <div className="button-group is-center">
                          <Link href="/contact" className="button">
                            <div className="button-text-item">Get in touch</div>
                          </Link>
                          <Link href="/case-studies" className="button-secondary">
                            <div className="button-text-item">Case studies</div>
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

      <div className="section-blog">
        <section className="blog-component-wrapper">
          <div className="padding-global is-2rem">
            <div className="container-large">
              <div className="section-padding-large">
                <div className="blogs-component">
                  <div className="blogs-list">
                    {blogPosts.map((post, index) => (
                      <ScrollReveal key={post.id} delay={index * 0.1}>
                        <div className="blog-item">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="blog-item-link"
                          >
                            <div className="blog-image-wrapper">
                              <Image
                                src={post.image}
                                alt={post.title}
                                width={600}
                                height={375}
                                className="blog-image"
                                sizes="(max-width: 479px) 76vw, (max-width: 767px) 77vw, (max-width: 991px) 37vw, 22vw"
                              />
                            </div>
                            <div className="blog-title-wrapper">
                              <div className="blog-item-content-top">
                                <div className="margin-bottom margin-xxsmall">
                                  <h2 className="heading-style-h5">
                                    {post.title}
                                  </h2>
                                </div>
                                <div className="text-size-regular">
                                  {post.excerpt}
                                </div>
                              </div>
                              <div className="blog-button-wrapper">
                                <div className="button-link">
                                  <div className="button-text-item">
                                    View blog
                                  </div>
                                  <div className="button-arrow">
                                    <ArrowIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
