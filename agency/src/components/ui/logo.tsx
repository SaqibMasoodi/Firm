"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface LogoProps {
  variant?: "navbar" | "footer" | "admin" | "default";
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const hammerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const sparksRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  const handleHover = () => {
    if (variant !== "navbar") return;
    if (isAnimatingRef.current) return;
    if (!hammerRef.current || !textRef.current) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // 1. Hammer winds up (lifts up and angles back)
    tl.to(hammerRef.current, {
      y: -7,
      x: -3,
      rotate: -32,
      duration: 0.14,
      ease: "power2.out",
      force3D: true,
    });

    // 2. Hammer strikes down onto the anvil!
    tl.to(hammerRef.current, {
      y: 0,
      x: 0,
      rotate: 0,
      duration: 0.09,
      ease: "power4.in",
      force3D: true,
    });

    tl.addLabel("impact");

    // 3. Impact sparks burst
    const sparkEls = sparksRef.current?.querySelectorAll(".logo-spark");
    if (sparkEls && sparkEls.length > 0) {
      tl.set(sparkEls, { opacity: 1, scale: 1 }, "impact");
      sparkEls.forEach((spark) => {
        const el = spark as HTMLElement;
        const targetX = parseFloat(el.dataset.x || "0");
        const targetY = parseFloat(el.dataset.y || "0");
        tl.to(
          el,
          {
            x: targetX,
            y: targetY,
            scale: 0,
            opacity: 0,
            duration: 0.22,
            ease: "power3.out",
            force3D: true,
          },
          "impact"
        );
      });
    }

    // 4. Hammer rebound & settle
    tl.to(
      hammerRef.current,
      {
        y: -2.5,
        x: -0.8,
        rotate: -5,
        duration: 0.07,
        ease: "power2.out",
        force3D: true,
      },
      "impact"
    );

    tl.to(hammerRef.current, {
      y: 0,
      x: 0,
      rotate: 0,
      duration: 0.09,
      ease: "power1.inOut",
      force3D: true,
    });

    // 5. Text wiggles on impact!
    tl.to(
      textRef.current,
      {
        x: 2.5,
        rotate: 0.7,
        duration: 0.04,
        ease: "power2.out",
        force3D: true,
      },
      "impact"
    );
    tl.to(textRef.current, {
      x: -2,
      rotate: -0.5,
      duration: 0.04,
      ease: "power2.inOut",
      force3D: true,
    });
    tl.to(textRef.current, {
      x: 1.2,
      rotate: 0.3,
      duration: 0.03,
      ease: "power2.inOut",
      force3D: true,
    });
    tl.to(textRef.current, {
      x: -0.6,
      rotate: -0.1,
      duration: 0.03,
      ease: "power2.inOut",
      force3D: true,
    });
    tl.to(textRef.current, {
      x: 0,
      rotate: 0,
      duration: 0.04,
      ease: "power2.out",
      force3D: true,
    });
  };

  const isNavbar = variant === "navbar";
  const variantClass = isNavbar
    ? "is-navbar"
    : variant === "footer"
    ? "is-footer"
    : variant === "admin"
    ? "is-admin"
    : "";

  return (
    <span
      className={`brand-logo-pill ${variantClass} ${className}`.trim()}
      title="Northforge Labs"
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
    >
      {isNavbar && (
        <span className="navbar-brand-icon-anchor" aria-hidden="true">
          {/* White Anvil */}
          <svg
            className="navbar-anvil-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
            <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
            <path d="M9 12v5" />
            <path d="M15 12v5" />
            <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
          </svg>

          {/* Lime Green Hammer (#CBFB45) */}
          <div ref={hammerRef} className="navbar-hammer-anchor">
            <svg
              className="navbar-hammer-svg"
              viewBox="0 0 50 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="12" width="30" height="4.5" rx="2.25" fill="#CBFB45" />
              <rect x="30" y="2" width="14" height="24" rx="2" fill="#CBFB45" />
              <rect x="29" y="23" width="16" height="3" rx="1" fill="#CBFB45" />
            </svg>
          </div>

          {/* Sparks at impact point */}
          <span ref={sparksRef} className="navbar-sparks-anchor">
            {[
              { x: -7, y: -9, color: "#CBFB45", size: 2.5 },
              { x: 8, y: -8, color: "#FFFFFF", size: 2 },
              { x: 3, y: -11, color: "#CBFB45", size: 2 },
              { x: -5, y: -4, color: "#FFFFFF", size: 1.5 },
            ].map((s, idx) => (
              <span
                key={idx}
                className="logo-spark"
                data-x={s.x}
                data-y={s.y}
                style={{
                  position: "absolute",
                  top: "2px",
                  left: "14px",
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  borderRadius: "50%",
                  backgroundColor: s.color,
                  opacity: 0,
                  pointerEvents: "none",
                  boxShadow: `0 0 4px ${s.color}`,
                }}
              />
            ))}
          </span>
        </span>
      )}

      {/* Brand Text */}
      <span ref={textRef} className="brand-logo-text-wrap">
        <span className="brand-logo-green">Northforge</span>
        <span className="brand-logo-white">&nbsp;Labs.</span>
      </span>
    </span>
  );
}
