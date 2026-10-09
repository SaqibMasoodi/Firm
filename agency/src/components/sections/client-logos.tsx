import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getClientLogos } from "@/lib/content";

export default async function ClientLogos() {
  const clientLogos = await getClientLogos();
  return (
    <section className="section-client-logos">
      <div className="padding-global">
        <div className="container-large">
          <div className="client-logos-header">
            <ScrollReveal>
              <div className="tagline-pill">
                <div>Trusted Partners</div>
              </div>
            </ScrollReveal>
            <div className="margin-bottom margin-xsmall">
              <ScrollReveal delay={0.06}>
                <h2 className="heading-style-h2 weight-medium">Brands we work with</h2>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.12}>
              <p className="text-size-medium text-color-muted" style={{ maxWidth: "44rem" }}>
                We’ve had the privilege of working with innovative organizations across government, education, and the private sector.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.16}>
            <div className="logo-component">
              {clientLogos.map((logo, index) => (
                <div key={index} className="client-logo-card">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={280}
                    height={140}
                    className="client-logo"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
