"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { OurWorkPageSettings } from "@/lib/schemas/our-work-page-settings";
import type { WorkProject } from "@/types";

type ProjectCategory = "web-dev" | "mobile-apps" | "branding" | "social-media";

interface ConsolidatedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  image: string;
  coverImage: string;
  imagePosition?: string;
  imageScale?: number;
  categories: ProjectCategory[];
  blobColor: string;
  blobRadius: string;
  links: {
    caseStudy: string;
    siteUrl?: string;
    playStoreUrl?: string;
    appDownloadUrl?: string;
  };
}

function parsePosition(posStr: string = "50% 50%") {
  const parts = posStr.trim().split(/\s+/);
  let x = 50;
  let y = 50;
  if (parts.length >= 1) {
    const parsedX = parseFloat(parts[0]);
    if (!isNaN(parsedX)) x = parsedX;
  }
  if (parts.length >= 2) {
    const parsedY = parseFloat(parts[1]);
    if (!isNaN(parsedY)) y = parsedY;
  }
  return { x: Math.round(x), y: Math.round(y) };
}

function ProjectCutoutImage({
  src,
  alt,
  position = "50% 50%",
  scale = 1,
}: {
  src: string;
  alt: string;
  position?: string;
  scale?: number;
}) {
  const [hasError, setHasError] = useState(false);
  const pos = parsePosition(position);
  const normalizedScale = typeof scale === "number" && !isNaN(scale) && scale > 0 ? scale : 1;
  const displaySrc = hasError ? "/images/projects/placeholder.png" : src;

  return (
    <Image
      key={src}
      src={displaySrc}
      alt={alt}
      width={700}
      height={520}
      className="portfolio-cutout-img"
      style={{
        transform: `translate(${pos.x - 50}%, ${pos.y - 50}%) scale(${normalizedScale})`,
        transformOrigin: "center",
      }}
      onError={() => {
        setHasError(true);
      }}
      unoptimized
      sizes="(max-width: 639px) 90vw, (max-width: 900px) 90vw, 40vw"
    />
  );
}

function PortfolioCardItem({ project }: { project: ConsolidatedProject }) {
  const primaryUrl = project.links.caseStudy;

  return (
    <article className="portfolio-card">
      {/* Left Column: Project Info */}
      <div className="portfolio-card-info">
        <div className="portfolio-card-header">
          <h3 className="portfolio-card-title">
            <Link href={primaryUrl} className="portfolio-title-link">
              {project.title}
            </Link>
          </h3>
          <p className="portfolio-card-desc">{project.description}</p>
          <div className="portfolio-card-tags">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="portfolio-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="portfolio-card-footer">
          <Link href={primaryUrl} className="portfolio-case-study-btn">
            View case study{" "}
            <span className="portfolio-arrow-icon" aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Preview Cutout */}
      <div className="portfolio-card-visual">
        <div
          className="portfolio-blob"
          style={{
            backgroundColor: project.blobColor,
            borderRadius: project.blobRadius,
          }}
          aria-hidden="true"
        />
        <ProjectCutoutImage
          src={project.image}
          alt={`${project.title} preview`}
          position={project.imagePosition}
          scale={project.imageScale}
        />
      </div>
    </article>
  );
}

function MobileCardItem({ project }: { project: ConsolidatedProject }) {
  const primaryUrl = project.links.caseStudy;
  const cutoutImage = project.image || `/images/projects/${project.slug}.png`;

  return (
    <article className="work-project-item">
      <div className="work-project-item-link">
        <Link href={primaryUrl} className="our-work-image-link" aria-label={project.title}>
          <div className="work-project-image-wrapper mobile-card-cutout-wrapper">
            <Image
              key={cutoutImage}
              src={cutoutImage}
              alt={project.title}
              width={700}
              height={480}
              className="work-project-image mobile-card-cutout-img"
              sizes="(max-width: 767px) 50vw, 42vw"
              unoptimized
            />
          </div>
        </Link>
        <div className="work-project-title-wrapper">
          <div className="project-item-content-top">
            <div className="margin-bottom margin-xxsmall">
              <h3 className="heading-style-h5">
                <Link href={primaryUrl} className="our-work-title-link">
                  {project.title}
                </Link>
              </h3>
            </div>
            <p className="text-size-regular">
              {project.description}
            </p>
            {project.tags.length > 0 && (
              <div className="project-tag-list">
                {project.tags.slice(0, 2).map((tag) => (
                  <div key={tag} className="project-tag">
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="project-button-wrapper">
            <Link href={primaryUrl} className="portfolio-case-study-btn is-mobile">
              View case study{" "}
              <span className="portfolio-arrow-icon" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

interface OurWorkPortfolioProps {
  projects?: WorkProject[];
  settings?: OurWorkPageSettings;
}

export default function OurWorkPortfolio({ projects = [] }: OurWorkPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | ProjectCategory>("all");

  const consolidatedProjects = useMemo<ConsolidatedProject[]>(() => {
    // Lookup helpers from the actual content
    const findBySlug = (slug: string) => projects.find((p) => p.slug === slug);

    const dashit = findBySlug("dashit");
    const dreamcabs = findBySlug("dreamcabs");
    const pockethost = findBySlug("pockethost");
    const mersh = findBySlug("mersh-kashmir");
    const soulspeed = findBySlug("soulspeed-mc");
    const wolf = findBySlug("wolf-adventures-kashmir");
    const balam = findBySlug("balam-reserve");

    const items: ConsolidatedProject[] = [
      {
        id: "dashit",
        title: dashit?.title || "DASHit",
        description: dashit?.description || "Grocery delivery platform for fast and reliable shopping.",
        tags: dashit?.tags && dashit.tags.length > 0 ? dashit.tags : ["Mobile App", "Website"],
        slug: "dashit",
        image: dashit?.cutoutImage || "/images/projects/dashit.png",
        coverImage: dashit?.image || "/images/our-work/dashit/cover-optimized.webp",
        imagePosition: dashit?.imagePosition || "50% 50%",
        imageScale: dashit?.imageScale ?? 1,
        categories: ["web-dev", "mobile-apps", "branding"],
        blobColor: "#EDE9FE",
        blobRadius: "42% 58% 70% 30% / 45% 45% 55% 55%",
        links: {
          caseStudy: "/our-work/dashit",
          siteUrl: dashit?.siteUrl || undefined,
          appDownloadUrl: dashit?.appDownloadUrl || undefined,
        },
      },
      {
        id: "dreamcabs",
        title: dreamcabs?.title || "DreamCabs",
        description: dreamcabs?.description || "Ride-hailing platform for smarter travel.",
        tags: dreamcabs?.tags && dreamcabs.tags.length > 0 ? dreamcabs.tags : ["Mobile App", "Website"],
        slug: "dreamcabs",
        image: dreamcabs?.cutoutImage || "/images/projects/dreamcabs.png",
        coverImage: dreamcabs?.image || "/images/our-work/dreamcabs/cover-optimized.webp",
        imagePosition: dreamcabs?.imagePosition || "50% 50%",
        imageScale: dreamcabs?.imageScale ?? 1,
        categories: ["web-dev", "mobile-apps"],
        blobColor: "#E2E8F0",
        blobRadius: "50% 50% 50% 50%",
        links: {
          caseStudy: "/our-work/dreamcabs",
          siteUrl: dreamcabs?.siteUrl || undefined,
          playStoreUrl: dreamcabs?.playStoreUrl || undefined,
        },
      },
      {
        id: "pockethost",
        title: pockethost?.title || "PocketHost",
        description: pockethost?.description || "Modern hosting platform for developers and creators.",
        tags: pockethost?.tags && pockethost.tags.length > 0 ? pockethost.tags : ["Web Platform", "Dashboard"],
        slug: "pockethost",
        image: pockethost?.cutoutImage || "/images/projects/pockethost.png",
        coverImage: pockethost?.image || "/images/our-work/pockethost/cover-optimized.webp",
        imagePosition: pockethost?.imagePosition || "50% 50%",
        imageScale: pockethost?.imageScale ?? 1,
        categories: ["web-dev", "mobile-apps"],
        blobColor: "#EDE9FE",
        blobRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
        links: {
          caseStudy: "/our-work/pockethost",
          siteUrl: pockethost?.siteUrl || undefined,
          playStoreUrl: pockethost?.playStoreUrl || undefined,
        },
      },
      {
        id: "mersh-kashmir",
        title: mersh?.title || "Mersh Kashmir",
        description: mersh?.description || "A modern e-commerce catalog for authentic Kashmiri products.",
        tags: mersh?.tags && mersh.tags.length > 0 ? mersh.tags : ["E-commerce", "Branding"],
        slug: "mersh-kashmir",
        image: mersh?.cutoutImage || "/images/projects/mersh-kashmir.png",
        coverImage: mersh?.image || "/images/our-work/mersh-kashmir/cover-optimized.webp",
        imagePosition: mersh?.imagePosition || "50% 50%",
        imageScale: mersh?.imageScale ?? 1,
        categories: ["web-dev", "branding"],
        blobColor: "#E2E8F0",
        blobRadius: "55% 45% 60% 40% / 40% 60% 40% 60%",
        links: {
          caseStudy: "/our-work/mersh-kashmir",
          siteUrl: mersh?.siteUrl || undefined,
        },
      },
      {
        id: "soulspeed-mc",
        title: soulspeed?.title || "SoulSpeed MC",
        description: soulspeed?.description || "Social media management and Minecraft creator community with 40K+ followers.",
        tags: soulspeed?.tags && soulspeed.tags.length > 0 ? soulspeed.tags : ["Instagram", "Minecraft"],
        slug: "soulspeed-mc",
        image: soulspeed?.cutoutImage || "/images/projects/soulspeed.png",
        coverImage: soulspeed?.image || "/images/our-work/soulspeed-mc/cover-optimized.webp",
        imagePosition: soulspeed?.imagePosition || "50% 50%",
        imageScale: soulspeed?.imageScale ?? 1,
        categories: ["social-media", "branding"],
        blobColor: "#F1F5F9",
        blobRadius: "50% 50% 50% 50%",
        links: {
          caseStudy: "/our-work/soulspeed-mc",
          siteUrl: soulspeed?.siteUrl || undefined,
        },
      },
      {
        id: "wolf-adventures",
        title: wolf?.title || "Wolf Adventures Kashmir",
        description: wolf?.description || "Adventure travel platform for unforgettable journeys.",
        tags: wolf?.tags && wolf.tags.length > 0 ? wolf.tags : ["Travel Website", "Branding"],
        slug: "wolf-adventures-kashmir",
        image: wolf?.cutoutImage || "/images/projects/wolf-adventures.png",
        coverImage: wolf?.image || "/images/our-work/wolf-adventures-kashmir/cover-optimized.webp",
        imagePosition: wolf?.imagePosition || "50% 50%",
        imageScale: wolf?.imageScale ?? 1,
        categories: ["web-dev", "branding"],
        blobColor: "#EDE9FE",
        blobRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
        links: {
          caseStudy: "/our-work/wolf-adventures-kashmir",
          siteUrl: wolf?.siteUrl || undefined,
        },
      },
      {
        id: "balam-reserve",
        title: balam?.title || "The Balam Reserve",
        description: balam?.description || "A luxury Caribbean destination in northern Belize with hospitality, residences, and conservation.",
        tags: balam?.tags && balam.tags.length > 0 ? balam.tags : ["Website", "Masterplan"],
        slug: "balam-reserve",
        image: balam?.cutoutImage || "/images/projects/balam-reserve.png",
        coverImage: balam?.image || "/images/our-work/balam-reserve/cover.jpg",
        imagePosition: balam?.imagePosition || "50% 50%",
        imageScale: balam?.imageScale ?? 1,
        categories: ["web-dev", "branding"],
        blobColor: "#E2E8F0",
        blobRadius: "50% 50% 50% 50%",
        links: {
          caseStudy: "/our-work/balam-reserve",
          siteUrl: balam?.siteUrl || undefined,
        },
      },
    ];

    return items;
  }, [projects]);

  const filterTabs = useMemo(() => [
    { id: "all" as const, label: `All (${consolidatedProjects.length})` },
    { id: "web-dev" as const, label: "Web Development" },
    { id: "mobile-apps" as const, label: "Mobile Apps" },
    { id: "branding" as const, label: "Branding & Design" },
    { id: "social-media" as const, label: "Social Media" },
  ], [consolidatedProjects.length]);

  const displayedProjects = consolidatedProjects.filter((project) => {
    if (selectedCategory === "all") return true;
    return project.categories.includes(selectedCategory);
  });

  return (
    <section className="section-our-work our-work-portfolio">
      <div className="portfolio-section-container">
        {/* Filter Pills Bar */}
        <div className="portfolio-filters-bar" role="group" aria-label="Filter portfolio projects">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className={`portfolio-filter-pill ${isActive ? "is-active" : ""}`}
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        {displayedProjects.length > 0 ? (
          <>
            {/* Desktop Editorial Grid (>= 768px) */}
            <div className="portfolio-grid portfolio-desktop-cards">
              {displayedProjects.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.08}>
                  <PortfolioCardItem project={project} />
                </ScrollReveal>
              ))}
            </div>

            {/* Mobile Classic Card Stack (< 768px) */}
            <div className="portfolio-mobile-cards">
              {displayedProjects.map((project, index) => (
                <ScrollReveal key={`m-${project.id}`} delay={index * 0.08}>
                  <MobileCardItem project={project} />
                </ScrollReveal>
              ))}
            </div>
          </>
        ) : (
          <p className="our-work-empty">No projects found in this category.</p>
        )}
      </div>
    </section>
  );
}
