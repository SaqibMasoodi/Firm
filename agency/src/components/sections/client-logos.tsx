import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getClientLogos } from "@/lib/content";

export default async function ClientLogos() {
  const clientLogos = await getClientLogos();
  return (
    <section className="section-client-logos">
      <div className="padding-global">
        <div className="container-large">
          <div className="margin-bottom margin-medium">
            <div className="text-align-center">
              <div className="max-width-large align-center">
                <ScrollReveal>
                  <h2 className="text-size-medium">Brands we work with</h2>
                </ScrollReveal>
              </div>
            </div>
          </div>
          <ScrollReveal delay={0.1}>
            <div className="logo-component">
              {clientLogos.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  width={240}
                  height={120}
                  className="client-logo"
                  unoptimized
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
