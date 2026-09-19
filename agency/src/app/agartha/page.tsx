"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";

const SECRETS = [
  {
    id: "blacksmith-cursor",
    tag: "Interactive Cursor",
    title: "The Blacksmith Cursor",
    shortcuts: ["↑ ↑ ↓ ↓ ← → ← → B A", "'seeyos'"],
    description:
      "Transforms the mouse cursor into the brand hammer. Holding down click swings the hammer down from the bottom-right wrist pivot, and each strike disperses sparks that arc and gravitate downward.",
    actionType: "custom",
    actionLabel: "Toggle Cursor",
    onClick: () => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "y" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "o" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
      }
    },
  },
  {
    id: "dev-hud",
    tag: "Diagnostics",
    title: "Developer HUD",
    shortcuts: ["Ctrl + Shift + D", "~ (Tilde)"],
    description:
      "Summons a translucent telemetry HUD in the bottom-right corner tracking live framerate (FPS), scroll velocity, viewport breakpoints, and active GSAP animation tweens.",
    actionType: "custom",
    actionLabel: "Toggle Dev HUD",
    onClick: () => {
      if (typeof window !== "undefined" && typeof (window as any).__toggleDevHud === "function") {
        (window as any).__toggleDevHud();
      }
    },
  },
  {
    id: "console-forge",
    tag: "DevTools CLI",
    title: "DevTools Console Forge",
    shortcuts: ["F12", "Console Tab"],
    description:
      "Inspect browser DevTools to reveal the ASCII Anvil banner. Programmed with the window.forge API: type forge.status() for live diagnostics or forge.strike() to trigger a viewport spark burst.",
    actionType: "custom",
    actionLabel: "Test forge.strike()",
    onClick: () => {
      if (typeof window !== "undefined" && (window as any).forge) {
        (window as any).forge.strike();
      }
    },
  },
  {
    id: "the-foundry",
    tag: "Terminal OS",
    title: "The Foundry Retro Terminal",
    shortcuts: ["/the-foundry"],
    description:
      "A dedicated, fullscreen terminal providing command-line access to the Northforge engine. Supports 'help', 'status', 'strike', 'craft', and 'agartha' commands.",
    actionType: "link",
    actionLabel: "Enter The Foundry →",
    href: "/the-foundry",
  },
  {
    id: "logo-wave",
    tag: "Kinetic Brand",
    title: "Anvil Strike & Kinetic Letter Wave",
    shortcuts: ["Hover Navbar Logo"],
    description:
      "Hovering or tapping the brand pill in the navigation bar initiates a weighted hammer strike onto the anvil, sending a subtle, traversing kinetic wave across each letter of 'Northforge Labs.'",
    actionType: "info",
    actionLabel: "Hover the navbar logo to test",
  },
  {
    id: "color-engine",
    tag: "Theme Engine",
    title: "Dynamic Accent Palette Engine",
    shortcuts: ["Palette Icon (Navbar)"],
    description:
      "An anchored dropdown widget that dynamically re-tempers the site's accent color in real-time across the entire application — updating the hammer, sparks, splash screen, and UI accents.",
    actionType: "info",
    actionLabel: "Click palette icon in navbar",
  },
];

export default function AgarthaPage() {
  return (
    <div className="page-wrapper">
      {/* 1. Subpage Hero Header using standard design system */}
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>Subterranean Directory</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h1 className="heading-style-h1">Agartha</h1>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.15}>
                    <p className="text-size-medium max-width-small">
                      The unlisted registry of Northforge Labs. Here lies every hidden protocol,
                      kinetic easter egg, and developer tool engineered into the foundry.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Responsive Grid Container */}
      <section className="section-sitemap" style={{ paddingBottom: "6rem" }}>
        <div className="padding-global">
          <div className="container-large">
            <div className="sitemap-component-wrapper">
              <div className="sitemap-inner-padding">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 20rem), 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  {SECRETS.map((s, idx) => (
                    <ScrollReveal key={s.id} delay={0.05 * idx}>
                      <div
                        className="sitemap-card"
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          boxSizing: "border-box",
                          overflow: "hidden",
                          wordBreak: "break-word",
                        }}
                      >
                        <div>
                          <div
                            className="sitemap-card-header"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              flexWrap: "wrap",
                              gap: "0.75rem",
                              marginBottom: "1rem",
                              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                              paddingBottom: "1rem",
                            }}
                          >
                            <div style={{ minWidth: 0, flex: "1 1 12rem" }}>
                              <span
                                className="tagline-pill"
                                style={{
                                  marginBottom: "0.5rem",
                                  fontSize: "0.75rem",
                                  padding: "0.25rem 0.65rem",
                                }}
                              >
                                {s.tag}
                              </span>
                              <h2 className="heading-style-h4" style={{ margin: "0.25rem 0", wordBreak: "break-word" }}>
                                {s.title}
                              </h2>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.35rem",
                                justifyContent: "flex-end",
                                maxWidth: "100%",
                              }}
                            >
                              {s.shortcuts.map((shortcut, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="sitemap-card-badge"
                                  style={{
                                    fontFamily: "var(--font-inter), ui-monospace, monospace",
                                    fontSize: "0.75rem",
                                    whiteSpace: "normal",
                                    lineHeight: 1.3,
                                    padding: "0.35rem 0.65rem",
                                  }}
                                >
                                  {shortcut}
                                </span>
                              ))}
                            </div>
                          </div>

                          <p
                            className="text-size-regular"
                            style={{
                              marginTop: "0.5rem",
                              marginBottom: "1.5rem",
                              lineHeight: 1.6,
                            }}
                          >
                            {s.description}
                          </p>
                        </div>

                        <div style={{ paddingTop: "0.5rem" }}>
                          {s.actionType === "link" && s.href ? (
                            <Link href={s.href} className="button" style={{ textDecoration: "none" }}>
                              {s.actionLabel}
                            </Link>
                          ) : s.actionType === "custom" && s.onClick ? (
                            <button
                              onClick={s.onClick}
                              className="button-secondary"
                              style={{ cursor: "pointer" }}
                            >
                              {s.actionLabel}
                            </button>
                          ) : (
                            <span
                              style={{
                                fontSize: "0.875rem",
                                color: "var(--grey-text)",
                              }}
                            >
                              {s.actionLabel}
                            </span>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Tech Strip footer inside wrapper */}
                <div
                  className="sitemap-tech-strip"
                  style={{
                    marginTop: "2.5rem",
                    backgroundColor: "var(--black)",
                  }}
                >
                  <div className="sitemap-tech-content">
                    <span className="sitemap-tech-title">Subterranean Protocol</span>
                    <span
                      className="sitemap-tech-desc"
                      style={{ color: "var(--grey-text)", fontSize: "0.875rem" }}
                    >
                      Classified archive. Excluded from all search engines and public sitemaps.
                    </span>
                  </div>
                  <Link href="/" className="sitemap-tech-pill">
                    ← Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
