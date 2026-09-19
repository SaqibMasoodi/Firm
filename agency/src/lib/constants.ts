// Static exports sourced directly from content/site/ JSON files
// Provides safe, zero-latency synchronous imports for Client and Server components.
import type {
  TeamMember,
  FAQ,
  Testimonial,
  TestimonialsSectionData,
  Stat,
  WorkflowStep,
  ClientLogo,
  SiteConfig,
  NavLink,
  FeaturedWork,
} from "@/types";

// Site Configurations
import siteConfigData from "../../content/site/config.json";
import navLinksData from "../../content/site/navigation.json";
import teamMembersData from "../../content/site/team.json";
import faqsData from "../../content/site/faqs.json";
import testimonialsData from "../../content/site/testimonials.json";
import statsData from "../../content/site/stats.json";
import workflowStepsData from "../../content/site/workflow.json";
import clientLogosData from "../../content/site/client-logos.json";
import featuredWorkData from "../../content/site/featured-work.json";

export const siteConfig: SiteConfig = siteConfigData as SiteConfig;
export const navLinks: NavLink[] = navLinksData as NavLink[];
export const teamMembers: TeamMember[] = teamMembersData as TeamMember[];
export const faqs: FAQ[] = faqsData as FAQ[];
export const testimonialsSection: TestimonialsSectionData = (
  Array.isArray(testimonialsData)
    ? { image: "/images/testimonials/featured.webp", testimonials: testimonialsData }
    : testimonialsData
) as unknown as TestimonialsSectionData;
export const testimonials: Testimonial[] = (
  Array.isArray(testimonialsData)
    ? testimonialsData
    : (testimonialsData as { testimonials: Testimonial[] }).testimonials
) as unknown as Testimonial[];
export const stats: Stat[] = statsData as Stat[];
export const workflowSteps: WorkflowStep[] = workflowStepsData as WorkflowStep[];
export const clientLogos: ClientLogo[] = clientLogosData as ClientLogo[];
export const featuredWork: FeaturedWork = featuredWorkData as FeaturedWork;
