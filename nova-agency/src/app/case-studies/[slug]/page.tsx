import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { caseStudies } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return { title: "Not Found" };
  return {
    title: study.title,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="page-wrapper">
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
