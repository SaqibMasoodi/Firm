import type { Metadata } from "next";
import { BreadcrumbSchema, ArticleSchema } from "@/components/seo/schemas";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ReactMarkdown from "react-markdown";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
      const ogImage = post.image || "/images/og/og-image.png";
    return {
      title: post.title,
      description: post.excerpt,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: `${post.title} | Blog | Northforge Labs`,
        description: post.excerpt,
        url: `/blog/${slug}`,
        images: [
          {
            url: ogImage,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${post.title} | Blog | Northforge Labs`,
        description: post.excerpt,
        images: [ogImage],
      },
    };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${slug}` }]} />
      <ArticleSchema title={post.title} description={post.excerpt} image={post.image} datePublished={post.date} url={`/blog/${slug}`} />
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
                  className="blog-post-content prose"
                  style={{ paddingBottom: "5rem" }}
                >
                  <ReactMarkdown
                    components={{
                      h2: ({ ...props }) => (
                        <h2
                          className="heading-style-h3 weight-medium"
                          style={{ marginTop: "2.5rem", marginBottom: "1rem" }}
                          {...props}
                        />
                      ),
                      h3: ({ ...props }) => (
                        <h3
                          className="heading-style-h5 weight-medium"
                          style={{ marginTop: "2rem", marginBottom: "0.75rem" }}
                          {...props}
                        />
                      ),
                      p: ({ ...props }) => (
                        <p
                          className="text-size-medium"
                          style={{ marginBottom: "1.25rem", color: "var(--text-secondary)", lineHeight: 1.7 }}
                          {...props}
                        />
                      ),
                      ul: ({ ...props }) => (
                        <ul
                          style={{ marginBottom: "1.25rem", paddingLeft: "1.5rem", listStyleType: "disc", color: "var(--text-secondary)" }}
                          {...props}
                        />
                      ),
                      li: ({ ...props }) => (
                        <li style={{ marginBottom: "0.5rem" }} {...props} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>

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
