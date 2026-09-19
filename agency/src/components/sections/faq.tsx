"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { faqs } from "@/lib/constants";

function PlusIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.3333 15.667V16.3336C25.3333 16.7018 25.0349 17.0003 24.6667 17.0003H17V24.667C17 25.0351 16.7015 25.3336 16.3333 25.3336H15.6667C15.2985 25.3336 15 25.0351 15 24.667V17.0003H7.3333C6.96511 17.0003 6.66663 16.7018 6.66663 16.3336V15.667C6.66663 15.2988 6.96511 15.0003 7.3333 15.0003H15V7.33365C15 6.96546 15.2985 6.66699 15.6667 6.66699H16.3333C16.7015 6.66699 17 6.96546 17 7.33365V15.0003H24.6667C25.0349 15.0003 25.3333 15.2988 25.3333 15.667Z" fill="currentColor"/>
    </svg>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="section-faq">
      <section className="faq-component-wrapper">
        <div className="padding-global is-2rem">
          <div className="container-small">
            <div className="section-padding-large">
              <div className="margin-bottom margin-large">
                <div className="text-align-center">
                  <div className="max-width-large align-center">
                    <ScrollReveal>
                      <div className="tagline-pill">
                        <div>FAQs</div>
                      </div>
                    </ScrollReveal>
                    <div className="margin-bottom margin-small">
                      <ScrollReveal delay={0.1}>
                        <h2 className="heading-style-h2 weight-medium">
                          Frequently Asked Questions
                        </h2>
                      </ScrollReveal>
                    </div>
                    <ScrollReveal delay={0.2}>
                      <p className="text-size-medium">We are often asked...</p>
                    </ScrollReveal>
                  </div>
                </div>
              </div>
              <ScrollReveal delay={0.1}>
                <div className="faq-component">
                  <div className="faq-list">
                    {faqs.map((faq, index) => (
                      <div key={faq.id} className="faq-accordion">
                        <div
                          className="faq-question"
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
                            {faq.question}
                          </div>
                          <div
                            className="faq-icon-wrapper"
                            style={{
                              transform:
                                openIndex === index
                                  ? "rotate(45deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                          >
                            <div className="faq-icon">
                              <PlusIcon />
                            </div>
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {openIndex === index && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.22, ease: "easeOut" },
                              }}
                              style={{ overflow: "hidden", transformOrigin: "top" }}
                            >
                              <div className="faq-answer">
                                <div className="margin-bottom margin-small">
                                  <p className="text-size-medium">{faq.answer}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="faq-contact-wrapper">
                  <div className="text-align-center">
                    <div className="max-width-medium align-center">
                      <div className="margin-bottom margin-xsmall">
                        <h3 className="heading-style-h3 weight-medium">
                          Still have questions?
                        </h3>
                      </div>
                      <p className="text-size-medium" style={{ color: "var(--black)", opacity: 0.85 }}>
                        Contact one of our experts to find out how we can help
                        your business today.
                      </p>
                      <div className="margin-top margin-medium">
                        <div className="button-group is-center">
                          <Link href="/contact" className="button">
                            Get in touch
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
