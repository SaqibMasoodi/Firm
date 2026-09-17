import Hero from "@/components/sections/hero";
import ClientLogos from "@/components/sections/client-logos";
import ServicesAccordion from "@/components/sections/services-accordion";
import Team from "@/components/sections/team";
import FAQ from "@/components/sections/faq";
import CaseStudiesPreview from "@/components/sections/case-studies-preview";
import Testimonials from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Hero />
      <ClientLogos />
      <ServicesAccordion />
      <Team />
      <FAQ />
      <CaseStudiesPreview />
      <Testimonials />
    </div>
  );
}
