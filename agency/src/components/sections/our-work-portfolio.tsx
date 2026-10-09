"use client";

import { useState, useRef, useEffect } from "react";
import type { OurWorkPageSettings } from "@/lib/schemas/our-work-page-settings";
import Image from "next/image";
import Link from "next/link";
import { Globe, Smartphone, Users, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import type { WorkProject } from "@/types";

function ProjectCard({ project }: { project: WorkProject }) {
  const detailUrl = `/our-work/${project.slug}`;
  const primaryUrl = detailUrl;
  const external = false;
  const externalUrl = project.category === "apps" ? project.playStoreUrl || project.appDownloadUrl : project.siteUrl;
  const externalLabel = project.category === "apps" ? (project.playStoreUrl ? "View on Play Store" : "Download Android APK") : project.category === "social-media" ? "Visit page" : "Visit website";
  return (
    <article className="work-project-item">
      <div className="work-project-item-link">
        <Link href={primaryUrl} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="our-work-image-link" aria-label={project.title}>
          <div className="work-project-image-wrapper">
            {project.image ? (
              <Image src={project.image} alt={project.title} width={720} height={450} className="work-project-image" sizes="(max-width: 639px) 42vw, (max-width: 991px) 42vw, 39vw" />
            ) : (
              <div className="our-work-image-fallback" aria-hidden="true">
                {project.category === "apps" ? <Smartphone size={64} /> : project.category === "social-media" ? <Users size={64} /> : <Globe size={64} />}
              </div>
            )}
          </div>
        </Link>
        <div className="work-project-title-wrapper">
          <div className="project-item-content-top">
            <div className="margin-bottom margin-xxsmall">
              <h3 className="heading-style-h5"><Link href={primaryUrl} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="our-work-title-link">{project.title}</Link></h3>
            </div>
            <p className="text-size-regular">{project.description}</p>
            {!!project.tags.length && <div className="project-tag-list">{project.tags.slice(0, 3).map(tag => <div key={tag} className="project-tag">{tag}</div>)}{project.tags.length > 3 && <div className="project-tag is-count">+{project.tags.length - 3}</div>}</div>}
          </div>
          <div className="project-button-wrapper">
            <Link href={detailUrl} className="button-link">View project</Link>
            {externalUrl && <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="button-link">{externalLabel}</a>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OurWorkPortfolio({ projects, settings }: { projects: WorkProject[]; settings: OurWorkPageSettings }) {
  const [selected, setSelected] = useState("all");
  const dropdown = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => { if (!dropdown.current?.contains(event.target as Node) && dropdown.current) dropdown.current.open = false; };
    const closeEscape = (event: KeyboardEvent) => { if (event.key === "Escape" && dropdown.current?.open) { dropdown.current.open = false; dropdown.current.querySelector("summary")?.focus(); } };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeEscape); };
  }, []);
  const visibleSections = Object.entries(settings.sections).filter(([, section]) => section.visible).map(([id, section]) => ({ id, ...section }));
  const activeSection = visibleSections.find(section => section.id === selected);
  const filter = activeSection ? activeSection.id : "all";
  const allLabel = settings.allWorkLabel || "All work";
  const choices = [{ id: "all", title: allLabel }, ...visibleSections];
  const items = projects.filter(project => [project.category, ...project.additionalCategories].some(category => settings.sections[category]?.visible && (filter === "all" || category === filter)));

  return (
    <div className="section-our-work our-work-portfolio">
      <div className="our-work-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="our-work-filter-bar">
                <div className="our-work-filter-label"><SlidersHorizontal size={17} aria-hidden="true" /><span>{settings.filterLabel || "Filter by:"}</span></div>
                <div className="our-work-filter-options" role="group" aria-label="Filter Our Work">
                  {choices.map(section => <button type="button" key={section.id} className="our-work-filter-pill" aria-pressed={filter === section.id} onClick={() => setSelected(section.id)}>{section.title}</button>)}
                </div>
                <details ref={dropdown} className="our-work-filter-dropdown">
                  <summary aria-label={`Filter Our Work: ${activeSection?.title || allLabel}`}><span>{activeSection?.title || allLabel}</span><ChevronDown size={18} aria-hidden="true" /></summary>
                  <div className="our-work-filter-menu" role="group" aria-label="Choose work category">
                    {choices.map(section => <button type="button" key={section.id} aria-pressed={filter === section.id} onClick={() => { setSelected(section.id); if (dropdown.current) dropdown.current.open = false; }}><span>{section.title}</span>{filter === section.id && <Check size={17} aria-hidden="true" />}</button>)}
                  </div>
                </details>
              </div>
              {activeSection?.description && <p className="our-work-filter-description text-size-regular">{activeSection.description}</p>}
              <span className="our-work-filter-status" role="status" aria-live="polite">{items.length} {items.length === 1 ? "project" : "projects"} shown</span>
              {items.length ? <div className="our-work-list">{items.map(project => <ProjectCard key={project.id} project={project} />)}</div> : <p className="our-work-empty">{activeSection?.emptyText || settings.allWorkEmptyText || "No projects to show yet."}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
