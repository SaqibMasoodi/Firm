"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ScrollReveal from "@/components/ui/scroll-reveal";
import FAQ from "@/components/sections/faq";
import { siteConfig } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function EmailIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z" fill="currentColor"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.707 12.293C17.6142 12.2 17.504 12.1263 17.3827 12.076C17.2614 12.0257 17.1313 11.9998 17 11.9998C16.8687 11.9998 16.7386 12.0257 16.6173 12.076C16.496 12.1263 16.3858 12.2 16.293 12.293L14.699 13.887C13.96 13.667 12.581 13.167 11.707 12.293C10.833 11.419 10.333 10.04 10.113 9.30096L11.707 7.70696C11.7999 7.61417 11.8737 7.50397 11.924 7.38265C11.9743 7.26134 12.0002 7.13129 12.0002 6.99996C12.0002 6.86862 11.9743 6.73858 11.924 6.61726C11.8737 6.49595 11.7999 6.38575 11.707 6.29296L7.707 2.29296C7.61421 2.20001 7.50401 2.12627 7.38269 2.07596C7.26138 2.02565 7.13133 1.99976 7 1.99976C6.86866 1.99976 6.73862 2.02565 6.6173 2.07596C6.49599 2.12627 6.38579 2.20001 6.293 2.29296L3.581 5.00496C3.201 5.38496 2.987 5.90696 2.995 6.43996C3.018 7.86396 3.395 12.81 7.293 16.708C11.191 20.606 16.137 20.982 17.562 21.006H17.59C18.118 21.006 18.617 20.798 18.995 20.42L21.707 17.708C21.7999 17.6152 21.8737 17.505 21.924 17.3837C21.9743 17.2623 22.0002 17.1323 22.0002 17.001C22.0002 16.8696 21.9743 16.7396 21.924 16.6183C21.8737 16.4969 21.7999 16.3867 21.707 16.294L17.707 12.293ZM17.58 19.005C16.332 18.984 12.062 18.649 8.707 15.293C5.341 11.927 5.015 7.64196 4.995 6.41896L7 4.41396L9.586 6.99996L8.293 8.29296C8.17546 8.41041 8.08904 8.55529 8.04155 8.71453C7.99406 8.87376 7.987 9.04231 8.021 9.20496C8.045 9.31996 8.632 12.047 10.292 13.707C11.952 15.367 14.679 15.954 14.794 15.978C14.9565 16.0129 15.1253 16.0064 15.2846 15.9591C15.444 15.9117 15.5889 15.825 15.706 15.707L17 14.414L19.586 17L17.58 19.005V19.005Z" fill="currentColor"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14C14.206 14 16 12.206 16 10C16 7.794 14.206 6 12 6C9.794 6 8 7.794 8 10C8 12.206 9.794 14 12 14ZM12 8C13.103 8 14 8.897 14 10C14 11.103 13.103 12 12 12C10.897 12 10 11.103 10 10C10 8.897 10.897 8 12 8Z" fill="currentColor"/>
      <path d="M11.42 21.814C11.5892 21.9349 11.792 21.9998 12 21.9998C12.208 21.9998 12.4107 21.9349 12.58 21.814C12.884 21.599 20.029 16.44 20 10C20 5.589 16.411 2 12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.116 21.599 11.42 21.814ZM12 4C15.309 4 18 6.691 18 10.005C18.021 14.443 13.612 18.428 12 19.735C10.389 18.427 5.979 14.441 6 10C6 6.691 8.691 4 12 4Z" fill="currentColor"/>
    </svg>
  );
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
        reset();
      }
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="section-contact">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="contact-component">
                <div className="contact-content">
                  <div className="margin-bottom margin-medium">
                    <div className="contact-heading-wrapper">
                      <ScrollReveal>
                        <div className="tagline-pill">
                          <div>Get in touch</div>
                        </div>
                      </ScrollReveal>
                      <div className="margin-bottom margin-xsmall">
                        <ScrollReveal delay={0.1}>
                          <h1 className="heading-style-h1 weight-medium">
                            Contact us
                          </h1>
                        </ScrollReveal>
                      </div>
                      <ScrollReveal delay={0.2}>
                        <p className="text-size-medium" style={{ maxWidth: "28rem" }}>
                          Ready to transform your brand&apos;s digital presence
                          and unlock the full potential of social media
                          marketing? Reach out today, and let&apos;s start
                          crafting your success story together.
                        </p>
                      </ScrollReveal>
                    </div>
                  </div>
                  <ScrollReveal delay={0.3}>
                    <div className="contact-list">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="contact-item"
                      >
                        <div className="contact-icon">
                          <EmailIcon />
                        </div>
                        <div className="text-size-regular">
                          {siteConfig.email}
                        </div>
                      </a>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                        className="contact-item"
                      >
                        <div className="contact-icon">
                          <PhoneIcon />
                        </div>
                        <div className="text-size-regular">
                          {siteConfig.phone}
                        </div>
                      </a>
                      <div className="contact-item">
                        <div className="contact-icon">
                          <LocationIcon />
                        </div>
                        <div className="text-size-regular">
                          {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.city}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal delay={0.2}>
                  <div className="contact-form-block">
                    {isSuccess ? (
                      <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--black)" }}>
                        <div className="tagline-pill" style={{ backgroundColor: "var(--black)", color: "var(--white)", marginBottom: "1rem" }}>
                          <div>Message Received!</div>
                        </div>
                        <h3 className="heading-style-h3 weight-medium" style={{ color: "var(--black)" }}>
                          Thank you for reaching out!
                        </h3>
                        <p className="text-size-medium" style={{ color: "var(--black)", opacity: 0.85, marginTop: "0.5rem" }}>
                          We have received your message and one of our experts will get back to you shortly.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="contact-form"
                      >
                        <div className="form-field-2col">
                          <div className="form-field-wrapper">
                            <label htmlFor="name" className="form-field-label">Name</label>
                            <input
                              id="name"
                              type="text"
                              className="input-form"
                              placeholder="Enter your name"
                              {...register("name")}
                            />
                            {errors.name && (
                              <span style={{ color: "#d32f2f", fontSize: "0.75rem" }}>
                                {errors.name.message}
                              </span>
                            )}
                          </div>
                          <div className="form-field-wrapper">
                            <label htmlFor="email" className="form-field-label">Email</label>
                            <input
                              id="email"
                              type="email"
                              className="input-form"
                              placeholder="Enter your email"
                              {...register("email")}
                            />
                            {errors.email && (
                              <span style={{ color: "#d32f2f", fontSize: "0.75rem" }}>
                                {errors.email.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="form-field-2col">
                          <div className="form-field-wrapper">
                            <label htmlFor="phone" className="form-field-label">Phone</label>
                            <input
                              id="phone"
                              type="tel"
                              className="input-form"
                              placeholder="Enter your phone number"
                              {...register("phone")}
                            />
                          </div>
                          <div className="form-field-wrapper">
                            <label htmlFor="subject" className="form-field-label">Subject</label>
                            <input
                              id="subject"
                              type="text"
                              className="input-form"
                              placeholder="Enter subject"
                              {...register("subject")}
                            />
                          </div>
                        </div>

                        <div className="form-field-wrapper">
                          <label htmlFor="message" className="form-field-label">Message</label>
                          <textarea
                            id="message"
                            className="input-form is-text-area"
                            placeholder="Type your message..."
                            {...register("message")}
                          />
                          {errors.message && (
                            <span style={{ color: "#d32f2f", fontSize: "0.75rem" }}>
                              {errors.message.message}
                            </span>
                          )}
                        </div>

                        <div className="form-button-wrapper">
                          <button
                            type="submit"
                            className="button is-form"
                            disabled={isSubmitting}
                            style={{ opacity: isSubmitting ? 0.7 : 1 }}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Component on Contact Page */}
      <FAQ />
    </div>
  );
}
