"use client";

import React from "react";
import Link from "next/link";

const SECRETS = [
  {
    id: "blacksmith-cursor",
    tag: "INTERACTIVE CURSOR",
    title: "The Blacksmith Cursor",
    shortcut: "↑ ↑ ↓ ↓ ← → ← → B A  /  'seeyos'",
    description:
      "Transforms your mouse cursor into the Northforge lime hammer. Holding down click swings the hammer down from its bottom-right wrist pivot, and every strike disperses 5 sparks that arc upward and gravitate downward.",
    actionType: "custom",
    actionLabel: "Toggle Blacksmith Cursor",
    onClick: () => {
      if (typeof window !== "undefined") {
        // Dispatch 'seeyos' keydown simulation or toggle body class
        const event = new KeyboardEvent("keydown", { key: "s" });
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
    tag: "DIAGNOSTICS",
    title: "Developer HUD",
    shortcut: "Ctrl + Shift + D  /  ~ (Tilde)",
    description:
      "Summons a translucent, glassmorphic telemetry HUD in the bottom-right corner. Streams real-time framerate (FPS), live scroll velocity, viewport breakpoints, and active GSAP animation tweens.",
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
    tag: "DEVTOOLS CLI",
    title: "DevTools Console Forge",
    shortcut: "F12  /  Ctrl + Shift + I (Console Tab)",
    description:
      "Inspect browser DevTools to reveal a custom ASCII Anvil & Hammer recruitment banner. Programmed with the window.forge API: type forge.status() for live diagnostics or forge.strike() to trigger a viewport spark burst.",
    actionType: "custom",
    actionLabel: "Trigger forge.strike()",
    onClick: () => {
      if (typeof window !== "undefined" && (window as any).forge) {
        (window as any).forge.strike();
      }
    },
  },
  {
    id: "the-foundry",
    tag: "TERMINAL OS",
    title: "The Foundry Retro Terminal",
    shortcut: "URL: /the-foundry",
    description:
      "A dedicated, fullscreen retro CRT terminal providing command-line access to the Northforge engine. Supports 'help', 'status', 'strike', 'craft', and 'agartha' commands.",
    actionType: "link",
    actionLabel: "Enter The Foundry →",
    href: "/the-foundry",
  },
  {
    id: "logo-wave",
    tag: "KINETIC BRAND",
    title: "Anvil Strike & Kinetic Letter Wave",
    shortcut: "Hover / Tap Navbar Brand Logo",
    description:
      "Hovering or tapping the brand pill in the navigation bar initiates a weighted hammer strike onto the anvil, sending a subtle, traversing kinetic wave across each letter of 'Northforge Labs.'",
    actionType: "info",
    actionLabel: "Hover the navbar logo to test",
  },
  {
    id: "color-engine",
    tag: "THEME ENGINE",
    title: "Dynamic Accent Palette Engine",
    shortcut: "Palette Icon (Navbar, left of CTA)",
    description:
      "An anchored dropdown widget that dynamically re-tempers the site's accent color in real-time across the entire application — updating the hammer, sparks, splash screen, and glow accents without page reloads.",
    actionType: "info",
    actionLabel: "Click the palette icon in navbar",
  },
];

export default function AgarthaPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0D0D0D",
        color: "#FFFFFF",
        fontFamily: "var(--font-inter), -apple-system, sans-serif",
        padding: "clamp(40px, 8vw, 100px) clamp(20px, 6vw, 80px)",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Background ambient forge glow */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          backgroundColor: "var(--green, #CBFB45)",
          opacity: 0.04,
          filter: "blur(140px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top Breadcrumb & Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "20px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              textDecoration: "none",
              fontSize: "13px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "color 0.15s",
            }}
          >
            ← Return to Surface (Home)
          </Link>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(203, 251, 69, 0.08)",
              border: "1px solid rgba(203, 251, 69, 0.25)",
              padding: "4px 12px",
              borderRadius: "100rem",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--green, #CBFB45)",
              letterSpacing: "0.05em",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--green, #CBFB45)",
                boxShadow: "0 0 6px var(--green, #CBFB45)",
              }}
            />
            CONFIDENTIAL // LEVEL 4 ARCHIVE
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--green, #CBFB45)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Subterranean Archives
          </div>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "18px",
            }}
          >
            AGARTHA
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.6,
              maxWidth: "680px",
              margin: 0,
            }}
          >
            The unlisted registry of Northforge Labs. Here lies every hidden protocol, kinetic easter egg, and developer tool engineered into the foundry.
          </p>
        </div>

        {/* Secrets Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
            gap: "24px",
          }}
        >
          {SECRETS.map((s) => (
            <div
              key={s.id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s, transform 0.2s",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--green, #CBFB45)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.tag}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      color: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    {s.shortcut}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    margin: 0,
                    marginBottom: "12px",
                    color: "#FFFFFF",
                  }}
                >
                  {s.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.65)",
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: "24px",
                  }}
                >
                  {s.description}
                </p>
              </div>

              <div>
                {s.actionType === "link" && s.href ? (
                  <Link
                    href={s.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "var(--green, #CBFB45)",
                      color: "#121212",
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "10px 18px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "opacity 0.15s",
                    }}
                  >
                    {s.actionLabel}
                  </Link>
                ) : s.actionType === "custom" && s.onClick ? (
                  <button
                    onClick={s.onClick}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "var(--green, #CBFB45)",
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "10px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "background-color 0.15s",
                    }}
                  >
                    {s.actionLabel}
                  </button>
                ) : (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.4)",
                      fontStyle: "italic",
                    }}
                  >
                    {s.actionLabel}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div
          style={{
            marginTop: "60px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.4)",
          }}
        >
          Northforge Labs // Subterranean Agartha Archive // Excluded from all search indices & public sitemaps.
        </div>
      </div>
    </div>
  );
}
