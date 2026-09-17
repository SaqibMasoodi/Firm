"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/constants";

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`navbar-component ${isOpen ? "is-open" : ""}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo-link" onClick={() => setIsOpen(false)}>
          <Image
            src="https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f71_Nova_Logo.svg"
            alt={siteConfig.name}
            width={152}
            height={44}
            className="navbar-logo"
            priority
          />
        </Link>

        <nav className={`navbar-menu ${isOpen ? "is-open" : ""}`}>
          <div className="navbar-menu-link-wrapper">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar-link ${
                  pathname === link.href ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="navbar-button-wrapper">
              <Link
                href="/contact"
                className="button is-navbar"
                onClick={() => setIsOpen(false)}
              >
                <div className="button-text-item">Get in touch</div>
              </Link>
            </div>
          </div>
        </nav>

        <button
          className="navbar-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>
    </div>
  );
}
