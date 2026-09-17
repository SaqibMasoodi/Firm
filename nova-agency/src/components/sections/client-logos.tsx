import Image from "next/image";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { clientLogos } from "@/lib/constants";

export default function ClientLogos() {
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
                  width={120}
                  height={32}
                  className="client-logo"
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
