import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
      <path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm34-118v48a6 6 0 0 1-12 0v-33.5l-45.8 45.7a5.9 5.9 0 0 1-8.4-8.4l45.7-45.8H108a6 6 0 0 1 0-12h48a6 6 0 0 1 6 6Z" />
    </svg>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Not Found" };
  const ogImage = study.image || "/images/og/og-image.png";
  return {
    title: study.title,
    description: study.description,
    alternates: {
      canonical: `/case-studies/${slug}`,
    },
    openGraph: {
      title: `${study.title} — Northforge Labs`,
      description: study.description,
      url: `/case-studies/${slug}`,
      images: [
        {
          url: ogImage,
          alt: study.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Northforge Labs`,
      description: study.description,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }, { name: study.title, href: `/case-studies/${slug}` }]} />
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>Case Study</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h1 className="heading-style-h1 weight-medium">
                        {study.title}
                      </h1>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <p className="text-size-medium">{study.description}</p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.3}>
                    <div className="project-tag-list" style={{ marginTop: "1.5rem" }}>
                      {study.tags.map((tag) => (
                        <div key={tag} className="project-tag">
                          <div>{tag}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollReveal>
                  {study.siteUrl && (
                    <ScrollReveal delay={0.4}>
                      <div className="project-button-wrapper" style={{ marginTop: "2rem" }}>
                        <a
                          href={study.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-link"
                        >
                          <div className="button-text-item">Visit site</div>
                          <div className="button-arrow">
                            <ArrowIcon />
                          </div>
                        </a>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
                <ScrollReveal delay={0.2}>
                  <div className="subpage-header-image-wrapper">
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={720}
                      height={540}
                      className="subpage-header-image"
                      priority
                      sizes="(max-width: 991px) 90vw, 42vw"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="padding-global">
          <div className="container-medium">
            <div style={{ paddingBottom: "5rem" }}>
              {/* Challenge */}
              <ScrollReveal>
                <div style={{ marginBottom: "3rem" }}>
                  <h2 className="heading-style-h2 weight-medium" style={{ marginBottom: "1rem" }}>
                    The Challenge
                  </h2>
                  <p className="text-size-medium">{study.challenge}</p>
                </div>
              </ScrollReveal>

              {/* Solution */}
              <ScrollReveal delay={0.1}>
                <div style={{ marginBottom: "3rem" }}>
                  <h2 className="heading-style-h2 weight-medium" style={{ marginBottom: "1rem" }}>
                    Our Solution
                  </h2>
                  <p className="text-size-medium">{study.solution}</p>
                </div>
              </ScrollReveal>

              {/* Results */}
              <ScrollReveal delay={0.2}>
                <div style={{ marginBottom: "3rem" }}>
                  <h2 className="heading-style-h2 weight-medium" style={{ marginBottom: "1.5rem" }}>
                    Results
                  </h2>
                  <div className="stats-list" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                    {study.results.map((result, index) => (
                      <div
                        key={index}
                        className={`stats-item is-${index % 2 === 0 ? "dark" : "green"}`}
                        style={{ padding: "1.5rem" }}
                      >
                        <p className="text-size-medium" style={{ color: "inherit", margin: 0 }}>
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="button-group">
                  <Link href="/case-studies" className="button-secondary">
                    ← Back to Case Studies
                  </Link>
                  <Link href="/contact" className="button">
                    Start your project
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
