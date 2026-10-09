import Hero from "@/components/sections/hero";
import ClientLogos from "@/components/sections/client-logos";
import ServicesAccordion from "@/components/sections/services-accordion";
import Team from "@/components/sections/team";
import FAQ from "@/components/sections/faq";
import OurWorkPreview from "@/components/sections/our-work-preview";
import Testimonials from "@/components/sections/testimonials";
import { FAQPageSchema } from "@/components/seo/schemas";
import { getFeaturedWorkProjects, getServices, getSiteHeader, getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const [featuredStudies, services, homeHeader, testimonialsData] = await Promise.all([
    getFeaturedWorkProjects(),
    getServices(),
    getSiteHeader("home"),
    getTestimonials(),
  ]);

  return (
    <div className="page-wrapper">
      <FAQPageSchema />
      <Hero header={homeHeader} />
      <ClientLogos />
      <ServicesAccordion services={services} />
      <Team />
      <FAQ />
      <OurWorkPreview workProjects={featuredStudies} />
      <Testimonials data={testimonialsData} />
    </div>
  );
}
