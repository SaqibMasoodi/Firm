"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { navLinks } from "@/lib/constants";
import Logo from "@/components/ui/logo";

function AnimatedHamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="hamburger-icon-wrapper"
      aria-hidden="true"
      style={{
        width: "22px",
        height: "16px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          display: "block",
          height: "2px",
          width: "100%",
          backgroundColor: "var(--black, #171717)",
          borderRadius: "2px",
          transformOrigin: "center",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
        }}
      />
      <span
        style={{
          display: "block",
          height: "2px",
          width: "100%",
          backgroundColor: "var(--black, #171717)",
          borderRadius: "2px",
          transition: "opacity 0.2s ease, transform 0.25s ease",
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "scaleX(0)" : "scaleX(1)",
        }}
      />
      <span
        style={{
          display: "block",
          height: "2px",
          width: "100%",
          backgroundColor: "var(--black, #171717)",
          borderRadius: "2px",
          transformOrigin: "center",
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key & click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      // Lock body scroll on mobile when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Dimmed backdrop when mobile menu is open */}
      <div
        className={`navbar-backdrop ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div ref={navRef} className={`navbar-component ${isOpen ? "is-open" : ""}`}>
        <div className="navbar-container">
          <Link
            href="/"
            className="navbar-logo-link"
            onClick={() => setIsOpen(false)}
            aria-label="Northforge Labs Home"
          >
            <Logo variant="navbar" />
          </Link>

          <nav
            id="primary-navigation"
            className={`navbar-menu ${isOpen ? "is-open" : ""}`}
            aria-label="Primary Navigation"
          >
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
            aria-controls="primary-navigation"
          >
            <AnimatedHamburger isOpen={isOpen} />
          </button>
        </div>
      </div>
    </>
  );
}