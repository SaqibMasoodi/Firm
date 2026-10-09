import HomeCompanySnapshot from "@/components/sections/home-company-snapshot";
import CtaCard from "@/components/sections/cta-card";
import Hero from "@/components/sections/hero";
import ClientLogos from "@/components/sections/client-logos";
import ServicesAccordion from "@/components/sections/services-accordion";
import Team from "@/components/sections/team";
import FAQ from "@/components/sections/faq";
import OurWorkPreview from "@/components/sections/our-work-preview";
import Testimonials from "@/components/sections/testimonials";
import { FAQPageSchema } from "@/components/seo/schemas";
import { getFeaturedWorkProjects, getServices, getSiteHeader, getTestimonials, getHomePageSettings } from "@/lib/content";

export default async function HomePage() {
  const [featuredStudies, services, homeHeader, testimonialsData, homeSettings] = await Promise.all([
    getFeaturedWorkProjects(),
    getServices(),
    getSiteHeader("home"),
    getTestimonials(),
    getHomePageSettings(),
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
      {homeSettings.snapshotVisible && <HomeCompanySnapshot settings={homeSettings} />}
      {homeSettings.ctaVisible && <CtaCard heading={homeSettings.ctaTitle} description={homeSettings.ctaDescription} imageSrc={homeSettings.ctaImage} />}
    </div>
  );
}
