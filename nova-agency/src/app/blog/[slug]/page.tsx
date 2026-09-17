import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { blogPosts } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <article>
        <header>
          <div className="padding-global">
            <div className="container-medium">
              <div className="section-padding-large">
                <div style={{ textAlign: "center", maxWidth: "48rem", margin: "0 auto" }}>
                  <ScrollReveal>
                    <div className="blog-meta" style={{ justifyContent: "center", marginBottom: "1rem" }}>
                      <span className="blog-category">{post.category}</span>
                      <span>{post.readTime}</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.1}>
                    <h1 className="heading-style-h1 weight-medium">
                      {post.title}
                    </h1>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <p className="text-size-medium" style={{ marginTop: "1rem" }}>
                      By {post.author}
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </header>

        <ScrollReveal>
          <div className="padding-global">
            <div className="container-medium">
              <div style={{ borderRadius: "1rem", overflow: "hidden", marginBottom: "3rem" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={675}
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="padding-global">
          <div className="container-small">
            <ScrollReveal>
              <div
                className="blog-post-content"
                style={{ paddingBottom: "5rem" }}
              >
                {post.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="heading-style-h3 weight-medium"
                        style={{ marginTop: "2.5rem", marginBottom: "1rem" }}
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="heading-style-h5 weight-medium"
                        style={{ marginTop: "2rem", marginBottom: "0.75rem" }}
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-size-medium"
                      style={{ marginBottom: "1.25rem", color: "var(--text-secondary)" }}
                    >
                      {paragraph}
                    </p>
                  );
                })}

                <div style={{ marginTop: "3rem" }} className="button-group">
                  <Link href="/blog" className="button-secondary">
                    ← Back to Blog
                  </Link>
                  <Link href="/contact" className="button">
                    Get in touch
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>
    </div>
  );
}
