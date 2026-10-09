import type { OurWorkPageSettings } from "@/lib/schemas/our-work-page-settings";
import Image from "next/image";
import Link from "next/link";
import { Globe, Smartphone, Users } from "lucide-react";
import type { WorkProject } from "@/types";

const sections = [
  { id: "websites", title: "Websites", description: "Websites and web platforms we've designed and built.", Icon: Globe },
  { id: "apps", title: "Apps", description: "Mobile apps built for everyday use.", Icon: Smartphone },
  { id: "social-media", title: "Social Media Management", description: "The social media pages we manage.", Icon: Users },
] as const;

function ProjectCard({ project }: { project: WorkProject }) {
  const detailUrl = `/our-work/${project.slug}`;
  const hasDetails = Boolean(project.challenge || project.solution || project.results.length);
  const primaryUrl = hasDetails ? detailUrl : project.playStoreUrl || project.siteUrl || detailUrl;
  const external = primaryUrl.startsWith("https://") || primaryUrl.startsWith("http://");
  return (
    <article className="work-project-item">
      <div className="work-project-item-link">
        <Link href={primaryUrl} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="our-work-image-link" aria-label={project.title}>
          <div className="work-project-image-wrapper">
            {project.image ? (
              <Image src={project.image} alt={project.title} width={720} height={450} className="work-project-image" sizes="(max-width: 639px) 90vw, (max-width: 991px) 42vw, 39vw" />
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
            {hasDetails && <Link href={detailUrl} className="button-link">View project</Link>}
            {project.playStoreUrl && <a href={project.playStoreUrl} target="_blank" rel="noopener noreferrer" className="button-link">View on Play Store</a>}
            {project.siteUrl && <a href={project.siteUrl} target="_blank" rel="noopener noreferrer" className="button-link">{project.category === "social-media" ? "Visit page" : "Visit website"}</a>}
            {!hasDetails && !project.playStoreUrl && !project.siteUrl && <Link href={detailUrl} className="button-link">View project</Link>}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OurWorkPortfolio({ projects, settings }: { projects: WorkProject[]; settings: OurWorkPageSettings }) {
  const visibleSections = sections.filter(section => settings.sections[section.id].visible).map(section => ({ ...section, ...settings.sections[section.id] }));
  return (
    <div className="section-our-work our-work-portfolio">
      <div className="our-work-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-large">
            <div className="section-padding-large">
              <nav className="our-work-shortcuts" aria-label="Our Work categories">
                {visibleSections.map(({id, title, Icon}) => <a href={`#${id}`} key={id} className="our-work-shortcut"><Icon size={20} aria-hidden="true" />{title}</a>)}
              </nav>
              {visibleSections.map(({id, title, description, emptyText}) => {
                const items = projects.filter(project => project.category === id);
                return (
                  <section id={id} key={id} className="our-work-category" aria-labelledby={`${id}-title`}>
                    <div className="our-work-category-heading">
                      <h2 id={`${id}-title`} className="heading-style-h3 weight-medium">{title}</h2>
                      <p className="text-size-regular">{description}</p>
                    </div>
                    {items.length ? <div className="our-work-list">{items.map(project => <ProjectCard key={project.id} project={project} />)}</div> : <p className="our-work-empty">{emptyText}</p>}
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
