"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = [
  { text: "Build", color: "#171717" },
  { text: "Innovate", color: "#CBFB45" },
  { text: "Automate", color: "#71717A" },
  { text: "Scale", color: "#171717" },
  { text: "Forge", color: "#CBFB45" },
];

const GREEN_LETTERS = "Northforge".split("");
const WHITE_LETTERS = "Labs.".split("");

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const anvilWrapRef = useRef<HTMLDivElement>(null);
  const hammerRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);

  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return sessionStorage.getItem("northforge_splash_viewed") === "true";
      } catch {}
    }
    return false;
  });

  useEffect(() => {
    if (isComplete) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pre-calculate intrinsic text width for continuous, pixel-perfect GSAP interpolation
    const textInnerEl = textInnerRef.current;
    const rawTextWidth = textInnerEl ? textInnerEl.getBoundingClientRect().width || textInnerEl.scrollWidth : 270;
    const targetTextWidth = Math.ceil(rawTextWidth);
    const targetPillWidth = 82 + targetTextWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem("northforge_splash_viewed", "true");
            document.documentElement.classList.add("splash-viewed");
          } catch {}
          document.body.style.overflow = originalOverflow;
          setIsComplete(true);
        },
      });

      const wordEls = wordsContainerRef.current?.querySelectorAll(".splash-word");

      // Initial States: ensure GSAP is explicitly aligned with initial CSS
      gsap.set(stageRef.current, { opacity: 0, scale: 0.95, force3D: true });
      gsap.set(pillRef.current, { width: 82, height: 82, borderRadius: "100rem", force3D: true });
      gsap.set(hammerRef.current, {
        opacity: 0,
        y: -70,
        x: -8,
        rotate: -45,
        transformOrigin: "4px 12px",
        force3D: true,
      });
      gsap.set(textWrapRef.current, { width: 0, opacity: 0, force3D: true });
      gsap.set(textInnerRef.current, { x: 0, opacity: 1, force3D: true });

      const letterEls = textInnerRef.current?.querySelectorAll(".splash-letter");
      if (letterEls && letterEls.length > 0) {
        gsap.set(letterEls, { opacity: 0, y: 6, force3D: true });
      }

      // 1. Rapid Text Phrases transitioning upwards
      if (wordEls && wordEls.length > 0) {
        wordEls.forEach((el, index) => {
          const isLast = index === wordEls.length - 1;
          tl.fromTo(
            el,
            { y: 25, opacity: 0, scale: 0.96, force3D: true },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: isLast ? 0.16 : 0.12,
              ease: "power2.out",
              force3D: true,
            }
          );
          tl.to(
            el,
            {
              y: isLast ? -35 : -25,
              opacity: 0,
              scale: 0.97,
              duration: isLast ? 0.14 : 0.1,
              ease: "power2.in",
              force3D: true,
            },
            isLast ? "+=0.12" : "+=0.08"
          );
        });
      }

      // Hide words container once finished to free memory
      tl.set(wordsContainerRef.current, { display: "none" });

      // 2. Dark Circle with White Anvil emerges smoothly in center
      tl.to(
        stageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.28,
          ease: "back.out(1.4)",
          force3D: true,
        },
        "-=0.06"
      );

      // 3. Green Hammer comes in smoothly from outside the pill
      tl.to(
        hammerRef.current,
        {
          opacity: 1,
          y: -35,
          x: -4,
          rotate: -32,
          duration: 0.22,
          ease: "power2.out",
          force3D: true,
        },
        "+=0.04"
      );

      // 4. Hammer wind-up anticipation (eased, fluid, deliberate arc)
      tl.to(hammerRef.current, {
        y: -52,
        x: -7,
        rotate: -50,
        duration: 0.2,
        ease: "sine.inOut",
        force3D: true,
      });

      // 5. STRIKE! Smoothly accelerated strike onto the anvil (natural easing)
      tl.to(hammerRef.current, {
        y: 0,
        x: 0,
        rotate: 0,
        duration: 0.14,
        ease: "power2.in",
        force3D: true,
      });

      // Exactly at the impact moment:
      tl.addLabel("impact");

      // 6. Impact moment:
      // - Tiny crisp lime & white sparks burst
      const sparkEls = sparksRef.current?.querySelectorAll(".splash-spark");
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
              duration: 0.28,
              ease: "power3.out",
              force3D: true,
            },
            "impact"
          );
        });
      }

      // - Hammer soft rebound and steady settle
      tl.to(
        hammerRef.current,
        {
          y: -5,
          x: -1,
          rotate: -6,
          duration: 0.08,
          ease: "power1.out",
          force3D: true,
        },
        "impact"
      );
      tl.to(hammerRef.current, {
        y: 0,
        x: 0,
        rotate: 0,
        duration: 0.12,
        ease: "sine.inOut",
        force3D: true,
      });

      // 7. Pill expands smoothly on impact as letters appear
      tl.to(
        pillRef.current,
        {
          width: targetPillWidth,
          duration: 0.6,
          ease: "power3.out",
          force3D: true,
        },
        "impact"
      );

      tl.to(
        textWrapRef.current,
        {
          width: targetTextWidth,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          force3D: true,
        },
        "impact"
      );

      // 8. Traversing wave across letters appearing on strike!
      if (letterEls && letterEls.length > 0) {
        tl.to(
          letterEls,
          {
            keyframes: [
              { opacity: 1, y: -5, duration: 0.13, ease: "sine.out" },
              { y: 0, duration: 0.13, ease: "sine.inOut" },
            ],
            stagger: 0.024,
            force3D: true,
          },
          "impact+=0.03"
        );
      }

      // 9. Savor the brand lockup (calm, confident pause)
      tl.to({}, { duration: 0.48 });

      // 10. Transition out: Smooth quick fade directly into homepage
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        force3D: true,
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = originalOverflow;
      ctx.revert();
    };
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="splash-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
        pointerEvents: "all",
        contain: "paint layout",
        willChange: "opacity",
      }}
    >
      {/* 1. Rapid Words Ticker - Cycling through brand colors */}
      <div
        ref={wordsContainerRef}
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          height: "100px",
          overflow: "hidden",
          zIndex: 5,
          pointerEvents: "none",
          contain: "layout paint",
        }}
      >
        {WORDS.map((item) => (
          <div
            key={item.text}
            className="splash-word"
            style={{
              position: "absolute",
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 600,
              color: item.color,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              opacity: 0,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              textShadow: item.color === "#CBFB45" ? "0 1px 2px rgba(23, 23, 23, 0.08)" : "none",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* 2. Brand Circle -> Pill Stage: Starts hidden (opacity: 0) to prevent initial render flash */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          overflow: "visible",
          opacity: 0,
          transform: "scale(0.95) translateZ(0)",
          willChange: "transform, opacity",
        }}
      >
        {/* The Brand Pill: Starts as an 82px circle, expands smoothly on strike */}
        <div
          ref={pillRef}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#171717",
            width: "82px",
            height: "82px",
            borderRadius: "100rem",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflow: "visible",
            cursor: "default",
            willChange: "width",
            transform: "translateZ(0)",
          }}
        >
          {/* Anvil Anchor: 82px x 82px, dead-centers the ANVIL on the circle/pill */}
          <div
            ref={anvilWrapRef}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: "82px",
              height: "82px",
              overflow: "visible",
              transform: "translateZ(0)",
            }}
          >
            {/* White Anvil Icon centered dead in the middle of the 82px circle */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "block" }}
            >
              <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
              <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
              <path d="M9 12v5" />
              <path d="M15 12v5" />
              <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
            </svg>

            {/* Green Hammer (#CBFB45): starts hidden outside the pill */}
            <div
              ref={hammerRef}
              style={{
                position: "absolute",
                top: "3.5px",
                left: "14px",
                zIndex: 25,
                pointerEvents: "none",
                transformOrigin: "4px 12px",
                opacity: 0,
                transform: "translate(-8px, -70px) rotate(-45deg) translateZ(0)",
                willChange: "transform, opacity",
              }}
            >
              <svg
                width="44"
                height="35"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="12" width="30" height="4.5" rx="2.25" fill="var(--green, #CBFB45)" />
                <rect x="30" y="2" width="14" height="24" rx="2" fill="var(--green, #CBFB45)" />
                <rect x="29" y="23" width="16" height="3" rx="1" fill="var(--green, #CBFB45)" />
              </svg>
            </div>

            {/* Impact Sparks */}
            <div
              ref={sparksRef}
              style={{
                position: "absolute",
                top: "26px",
                left: "46px",
                zIndex: 30,
                pointerEvents: "none",
              }}
            >
              {[
                { x: -22, y: -16, color: "var(--green, #CBFB45)" },
                { x: 22, y: -18, color: "var(--green, #CBFB45)" },
                { x: -28, y: -4, color: "#FFFFFF" },
                { x: 28, y: -6, color: "#FFFFFF" },
                { x: -14, y: -24, color: "var(--green, #CBFB45)" },
                { x: 14, y: -24, color: "var(--green, #CBFB45)" },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="splash-spark"
                  data-x={s.x}
                  data-y={s.y}
                  style={{
                    position: "absolute",
                    width: "4.5px",
                    height: "4.5px",
                    borderRadius: "50%",
                    backgroundColor: s.color,
                    opacity: 0,
                    transform: "translate(-50%, -50%)",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Unveiled Brand Logo Text: starts with width: 0 and opacity: 0 */}
          <div
            ref={textWrapRef}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              borderRadius: "0 100rem 100rem 0",
              width: 0,
              opacity: 0,
              willChange: "width, opacity",
              transform: "translateZ(0)",
            }}
          >
            <div
              ref={textInnerRef}
              style={{
                fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.7rem, 3.4vw, 2.15rem)",
                lineHeight: 1.4,
                letterSpacing: "-0.025em",
                paddingLeft: "4px",
                paddingRight: "32px",
                boxSizing: "border-box",
                display: "inline-flex",
                alignItems: "center",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              <span style={{ color: "var(--green, #CBFB45)" }}>
                {GREEN_LETTERS.map((char, i) => (
                  <span
                    key={`g-${i}`}
                    className="splash-letter"
                    style={{
                      display: "inline-block",
                      opacity: 0,
                      transform: "translateY(6px) translateZ(0)",
                      willChange: "transform, opacity",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span style={{ color: "#FFFFFF" }}>
                <span
                  className="splash-letter"
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transform: "translateY(6px) translateZ(0)",
                    willChange: "transform, opacity",
                  }}
                >
                  &nbsp;
                </span>
                {WHITE_LETTERS.map((char, i) => (
                  <span
                    key={`w-${i}`}
                    className="splash-letter"
                    style={{
                      display: "inline-block",
                      opacity: 0,
                      transform: "translateY(6px) translateZ(0)",
                      willChange: "transform, opacity",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
