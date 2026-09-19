"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function DeveloperHud() {
  const [isOpen, setIsOpen] = useState(false);
  const [fps, setFps] = useState(60);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [breakpoint, setBreakpoint] = useState("lg");
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [gsapActiveTweens, setGsapActiveTweens] = useState(0);

  // Global shortcut: Ctrl + Shift + D or ~ (tilde)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // ~ or ` (Backtick / Tilde)
      if (e.key === "~" || e.key === "`") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Expose toggle to window for console control
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__toggleDevHud = () => setIsOpen((prev) => !prev);
    }
  }, []);

  // Live Metrics Loop (only runs when HUD is open)
  useEffect(() => {
    if (!isOpen) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animFrameId: number;

    // 1. FPS Tracker
    const calculateFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 500) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(currentFps);
        frameCount = 0;
        lastTime = now;

        // Also update GSAP active count
        try {
          const count = gsap.globalTimeline.getChildren(true, true, false).length;
          setGsapActiveTweens(count);
        } catch {}
      }
      animFrameId = requestAnimationFrame(calculateFps);
    };

    animFrameId = requestAnimationFrame(calculateFps);

    // 2. Viewport & Breakpoints
    const updateDimensions = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setDimensions({ width: w, height: h });

      if (w < 640) setBreakpoint("xs");
      else if (w < 768) setBreakpoint("sm");
      else if (w < 1024) setBreakpoint("md");
      else if (w < 1280) setBreakpoint("lg");
      else if (w < 1536) setBreakpoint("xl");
      else setBreakpoint("2xl");
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // 3. Scroll Velocity
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let scrollTimeout: NodeJS.Timeout;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = currentTime - lastScrollTime;
      const dy = currentScrollY - lastScrollY;

      setScrollY(Math.round(currentScrollY));

      if (dt > 10) {
        const velocity = Math.round(Math.abs(dy / dt) * 1000);
        setScrollVelocity(velocity);
        lastScrollY = currentScrollY;
        lastScrollTime = currentTime;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Developer HUD"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "320px",
        backgroundColor: "rgba(18, 18, 18, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "14px",
        boxShadow: "0 20px 48px rgba(0, 0, 0, 0.6)",
        zIndex: 999999,
        fontFamily: "var(--font-inter), -apple-system, sans-serif",
        color: "#E4E4E7",
        fontSize: "12px",
        overflow: "hidden",
        animation: "fadeInUp 0.2s ease-out forwards",
      }}
    >
      {/* HUD Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--green, #CBFB45)",
              
            }}
          />
          <span style={{ fontWeight: 600, letterSpacing: "-0.01em", color: "#FFFFFF" }}>
            FOUNDRY // DEV HUD
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>
            [Ctrl+Shift+D / ~]
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close HUD"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(255, 255, 255, 0.6)",
              cursor: "pointer",
              fontSize: "14px",
              padding: "2px 4px",
              borderRadius: "4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* FPS & Scroll Velocity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: "8px",
              padding: "8px 10px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>FRAMERATE</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: fps >= 50 ? "var(--green, #CBFB45)" : "#FF5555" }}>
              {fps} <span style={{ fontSize: "11px", fontWeight: 400 }}>FPS</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: "8px",
              padding: "8px 10px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>SCROLL VELOCITY</div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#FFFFFF" }}>
              {scrollVelocity} <span style={{ fontSize: "11px", fontWeight: 400 }}>px/s</span>
            </div>
          </div>
        </div>

        {/* Viewport Breakpoint & ScrollY */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "8px",
            padding: "8px 10px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>BREAKPOINT</div>
            <div style={{ fontWeight: 600, color: "var(--green, #CBFB45)", fontSize: "13px" }}>
              {breakpoint.toUpperCase()}{" "}
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", fontWeight: 400 }}>
                ({dimensions.width} × {dimensions.height})
              </span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>SCROLL Y</div>
            <div style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "13px" }}>{scrollY}px</div>
          </div>
        </div>

        {/* GSAP & Animation Engine */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: "8px",
            padding: "8px 10px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>ANIMATION ENGINE</div>
            <div style={{ fontWeight: 600, color: "#FFFFFF", fontSize: "12px" }}>
              GSAP Core 3.15.0
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.4)" }}>ACTIVE TWEENS</div>
            <div style={{ fontWeight: 600, color: "var(--green, #CBFB45)", fontSize: "12px" }}>
              {gsapActiveTweens}
            </div>
          </div>
        </div>

        {/* Subterranean Agartha Link */}
        <div
          style={{
            paddingTop: "6px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.4)" }}>
            Classified Archives:
          </span>
          <Link
            href="/agartha"
            style={{
              color: "var(--green, #CBFB45)",
              fontSize: "11px",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Access /agartha →
          </Link>
        </div>
      </div>
    </aside>
  );
}
