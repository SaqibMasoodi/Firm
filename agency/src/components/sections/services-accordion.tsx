"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";
import type { Service } from "@/types";

function PlusIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.3333 15.667V16.3336C25.3333 16.7018 25.0349 17.0003 24.6667 17.0003H17V24.667C17 25.0351 16.7015 25.3336 16.3333 25.3336H15.6667C15.2985 25.3336 15 25.0351 15 24.667V17.0003H7.3333C6.96511 17.0003 6.66663 16.7018 6.66663 16.3336V15.667C6.66663 15.2988 6.96511 15.0003 7.3333 15.0003H15V7.33365C15 6.96546 15.2985 6.66699 15.6667 6.66699H16.3333C16.7015 6.66699 17 6.96546 17 7.33365V15.0003H24.6667C25.0349 15.0003 25.3333 15.2988 25.3333 15.667Z" fill="currentColor"/>
    </svg>
  );
}

interface ServicesAccordionProps {
  services?: Service[];
}

export default function ServicesAccordion({
  services = [],
}: ServicesAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="section-services">
      <section className="services-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="margin-bottom margin-large">
                <div className="max-width-large">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>What we do</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h2 className="heading-style-h2 weight-medium">
                        Our Services
                      </h2>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.2}>
                    <p className="text-size-medium">
                      Propel Your Business with Proven Expertise
                    </p>
                  </ScrollReveal>
                </div>
              </div>
              <div className="services-component">
                <ScrollReveal delay={0.1}>
                  <div className="services-list">
                    {services.map((service, index) => (
                      <div key={service.id} className="service-accordion">
                        <div
                          className="service-name"
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              setOpenIndex(
                                openIndex === index ? null : index
                              );
                          }}
                        >
                          <div className="text-size-large weight-medium">
                            {service.title}
                          </div>
                          <div
                            className="accordion-icon-wrapper"
                            style={{
                              transform:
                                openIndex === index
                                  ? "rotate(45deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                            }}
                          >
                            <div className="accordion-icon">
                              <PlusIcon />
                            </div>
                          </div>
                        </div>
                        <AnimatePresence>
                          {openIndex === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="service-description">
                                <div className="service-component">
                                  <div className="service-image-wrapper">
                                    <Image
                                      src={service.image}
                                      alt={service.title}
                                      width={540}
                                      height={400}
                                      className="service-image"
                                      sizes="(max-width: 991px) 80vw, 40vw"
                                    />
                                  </div>
                                  <div className="service-content">
                                    <div className="margin-bottom margin-small">
                                      <h3 className="heading-style-h3">
                                        {service.title}
                                      </h3>
                                    </div>
                                    <p className="text-size-medium">
                                      {service.description}
                                    </p>
                                    <div className="margin-top margin-medium">
                                      <div className="button-group">
                                        <Link
                                          href={`/services#${service.slug}`}
                                          className="button"
                                        >
                                          <div className="button-text-item">Learn more</div>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
