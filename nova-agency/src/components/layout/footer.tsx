"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/lib/constants";

function FacebookIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z" fill="currentColor"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z" fill="currentColor"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM8.52076 7.00272C8.52639 7.95897 7.81061 8.54819 6.96123 8.54397C6.16107 8.53975 5.46357 7.90272 5.46779 7.00413C5.47201 6.15897 6.13998 5.47975 7.00764 5.49944C7.88795 5.51913 8.52639 6.1646 8.52076 7.00272ZM12.2797 9.76176H9.75971H9.7583V18.3216H12.4217V18.1219C12.4217 17.742 12.4214 17.362 12.4211 16.9819V16.9818V16.9816V16.9815V16.9812C12.4203 15.9674 12.4194 14.9532 12.4246 13.9397C12.426 13.6936 12.4372 13.4377 12.5005 13.2028C12.7381 12.3253 13.5271 11.7586 14.4074 11.8979C14.9727 11.9864 15.3467 12.3141 15.5042 12.8471C15.6013 13.1803 15.6449 13.5389 15.6491 13.8863C15.6605 14.9339 15.6589 15.9815 15.6573 17.0292V17.0294C15.6567 17.3992 15.6561 17.769 15.6561 18.1388V18.3202H18.328V18.1149C18.328 17.6629 18.3278 17.211 18.3275 16.7591V16.759V16.7588C18.327 15.6293 18.3264 14.5001 18.3294 13.3702C18.3308 12.8597 18.276 12.3563 18.1508 11.8627C17.9638 11.1286 17.5771 10.5211 16.9485 10.0824C16.5027 9.77019 16.0133 9.5691 15.4663 9.5466C15.404 9.54401 15.3412 9.54062 15.2781 9.53721L15.2781 9.53721L15.2781 9.53721C14.9984 9.52209 14.7141 9.50673 14.4467 9.56066C13.6817 9.71394 13.0096 10.0641 12.5019 10.6814C12.4429 10.7522 12.3852 10.8241 12.2991 10.9314L12.2991 10.9315L12.2797 10.9557V9.76176ZM5.68164 18.3244H8.33242V9.76733H5.68164V18.3244Z" fill="currentColor"/>
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    } catch {
      // Handle error silently
    }
  };

  return (
    <footer className="footer-component">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-top padding-xxlarge">
            <div className="padding-bottom padding-large">
              <div className="w-layout-grid footer-top-wrapper">
                <div className="footer-left-wrapper">
                  <div className="margin-bottom margin-small">
                    <Link href="/" className="footer-logo-link">
                      <Image
                        src="https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f71_Nova_Logo.svg"
                        alt={siteConfig.name}
                        width={120}
                        height={34}
                        className="footer-logo"
                      />
                    </Link>
                  </div>
                  <div className="newsletter-footer-wrapper">
                    <div className="margin-bottom margin-small">
                      <div className="text-size-regular" style={{ fontWeight: 500, color: "var(--black)" }}>
                        Join our newsletter to stay up to date.
                      </div>
                    </div>
                    {!subscribed ? (
                      <form onSubmit={handleSubscribe} className="footer-form">
                        <input
                          className="input-form"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button type="submit" className="button">
                          Subscribe
                        </button>
                      </form>
                    ) : (
                      <div style={{ color: "var(--black)", fontWeight: 600, fontSize: "0.875rem", padding: "0.5rem 0" }}>
                        Thank you! Your submission has been received!
                      </div>
                    )}
                    <div className="text-size-tiny" style={{ color: "var(--black)", opacity: 0.8, marginTop: "0.5rem" }}>
                      By subscribing you agree to with our Privacy Policy and provide
                      consent to receive updates from our company.
                    </div>
                  </div>
                </div>

                <div className="w-layout-grid footer-menu-wrapper">
                  <div className="footer-link-list">
                    <div className="footer-links-list-title">
                      <div className="weight-semibold">Quick Links</div>
                    </div>
                    <Link href="/about" className="footer-link">About us</Link>
                    <Link href="/services" className="footer-link">Services</Link>
                    <Link href="/case-studies" className="footer-link">Case studies</Link>
                    <Link href="/case-studies/glowessence-skincare" className="footer-link">Case studies CMS</Link>
                    <Link href="/blog" className="footer-link">Blog</Link>
                    <Link href="/blog/social-commerce" className="footer-link">Blog post CMS</Link>
                    <Link href="/contact" className="footer-link">Contact</Link>
                  </div>

                  <div className="footer-link-list">
                    <div className="footer-links-list-title">
                      <div className="weight-semibold">Contact</div>
                    </div>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="footer-link">
                      {siteConfig.phone}
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="footer-link">
                      {siteConfig.email}
                    </a>
                    <div className="footer-address">
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                      <br />
                      {siteConfig.address.city}
                    </div>
                  </div>

                  <div className="footer-link-list">
                    <div className="margin-bottom margin-xsmall">
                      <div className="weight-semibold">Follow us</div>
                    </div>
                    <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      <div className="social-icon"><FacebookIcon /></div>
                      <span className="text-size-small">Facebook</span>
                    </a>
                    <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      <div className="social-icon"><InstagramIcon /></div>
                      <span className="text-size-small">Instagram</span>
                    </a>
                    <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      <div className="social-icon"><XIcon /></div>
                      <span className="text-size-small">X</span>
                    </a>
                    <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                      <div className="social-icon"><LinkedInIcon /></div>
                      <span className="text-size-small">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-line-divider" />
            <div className="padding-vertical padding-medium">
              <div className="footer-bottom">
                <div className="footer-credit-text">
                  © 2024 Nova X - <Link href="/contact">Licensing</Link>
                </div>
                <div className="footer-credit-text">
                  Designed by <a href="https://www.influxdigital.com/" target="_blank" rel="noopener noreferrer">Influx®</a> - Powered by <a href="https://webflow.com/" target="_blank" rel="noopener noreferrer">Webflow</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
