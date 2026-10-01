import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { CookieNoticeButton } from "@/components/ui/cookie-banner";
import { BreadcrumbSchema } from "@/components/seo/schemas";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Policies",
  description: "How Northforge Labs handles privacy, browser storage, and use of this website.",
  alternates: { canonical: "/policies" },
  openGraph: {
    title: "Policies — Northforge Labs",
    description: "Privacy, cookies, and website use, explained clearly.",
    url: "/policies",
  },
};

export default function PoliciesPage() {
  return (
    <div className="page-wrapper">
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Policies", href: "/policies" }]} />
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large policies-header">
              <ScrollReveal>
                <div className="tagline-pill"><div>Clear by design</div></div>
                <h1 className="heading-style-h1 weight-medium">Policies</h1>
                <p className="text-size-medium">A clear overview of your privacy, the storage this website uses, and how we work.</p>
                <p className="text-size-small">Last updated: <time dateTime="2026-10-01">1 October 2026</time></p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </header>

      <div className="padding-global">
        <div className="container-large policies-layout">
          <nav className="policies-index" aria-label="Policy sections">
            <span className="text-size-small weight-semibold">On this page</span>
            <Link href="#privacy">Privacy</Link>
            <Link href="#cookies">Cookies &amp; browser storage</Link>
            <Link href="#website-use">Website use</Link>
            <Link href="#project-terms">Project terms</Link>
            <Link href="#questions">Questions</Link>
          </nav>
          <div className="policies-content">
            <section id="privacy" className="policies-section" aria-labelledby="privacy-heading">
              <h2 id="privacy-heading" className="heading-style-h3 weight-medium">Privacy</h2>
              <p>When you use our contact form, you provide your name, email address, message, and any optional information you choose to include. Newsletter submissions include your email address. Please share only what is needed for your enquiry.</p>
              <p>Form submissions are processed by this website and may be recorded in server logs. Our hosting infrastructure may also process technical information such as IP addresses and request details to deliver and maintain the website.</p>
              <p>For questions about information you have submitted, or to request access, correction, deletion, or an end to newsletter communications, email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>
            </section>
            <section id="cookies" className="policies-section" aria-labelledby="cookies-heading">
              <h2 id="cookies-heading" className="heading-style-h3 weight-medium">Cookies &amp; browser storage</h2>
              <p>Cookies and browser storage help websites remember information on your device. This website currently uses browser storage for interface behavior; it does not load analytics or advertising trackers.</p>
              <ul>
                <li><strong>Intro animation:</strong> session storage remembers whether you have already seen the intro during the current browser session.</li>
                <li><strong>Cookie notice:</strong> local storage remembers that you acknowledged the notice, so it does not appear on every page or visit.</li>
              </ul>
              <p>You can clear this information through your browser&apos;s site-data settings. Clearing it will make the intro and notice appear again. If your browser blocks storage, you can still browse the site, but these choices may not be remembered.</p>
              <p>Links to external websites and social platforms take you to services with their own privacy and cookie practices.</p>
              <CookieNoticeButton />
            </section>
            <section id="website-use" className="policies-section" aria-labelledby="website-use-heading">
              <h2 id="website-use-heading" className="heading-style-h3 weight-medium">Website use</h2>
              <p>This website introduces Northforge Labs, our services, and selected work. Please use its forms and features responsibly, without submitting spam, attempting unauthorised access, or disrupting the service.</p>
              <p>Our work, writing, and brand assets are presented for information. Client names, logos, and other third-party materials belong to their respective owners. Contact us before reusing material from this website.</p>
            </section>
            <section id="project-terms" className="policies-section" aria-labelledby="project-terms-heading">
              <h2 id="project-terms-heading" className="heading-style-h3 weight-medium">Project terms</h2>
              <p>Browsing this website or sending an enquiry does not create a project agreement. Scope, deliverables, timelines, fees, payment schedules, revisions, ownership, support, and any cancellation or refund arrangements are set out in the proposal or agreement for your project.</p>
              <p>If you have a question about an existing engagement, refer to your project agreement and contact your Northforge Labs representative.</p>
            </section>
            <section id="questions" className="policies-section" aria-labelledby="questions-heading">
              <h2 id="questions-heading" className="heading-style-h3 weight-medium">Questions?</h2>
              <p>For questions about these policies, reach us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or through our contact page. We will update this page when the website&apos;s practices change.</p>
              <Link href="/contact" className="button">Get in touch</Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
