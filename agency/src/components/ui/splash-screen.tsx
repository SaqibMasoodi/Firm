"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = ["BUILD", "INNOVATE", "AUTOMATE", "SCALE", "FORGE"];

export default function SplashScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hammerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Lock scroll during splash
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setIsComplete(true);
        },
      });

      const wordEls = wordsContainerRef.current?.querySelectorAll(".splash-word");

      // Initial states
      gsap.set(stageRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(hammerRef.current, { opacity: 0, y: -130, rotate: -45, transformOrigin: "20% 90%" });
      gsap.set(textRevealRef.current, { width: 0, opacity: 0 });
      gsap.set(pillRef.current, { width: "62px", padding: "0 18px" });

      // 1. Rapid Text Phrases transitioning upwards
      if (wordEls && wordEls.length > 0) {
        wordEls.forEach((el, index) => {
          const isLast = index === wordEls.length - 1;
          tl.fromTo(
            el,
            { y: 55, opacity: 0, filter: "blur(4px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: isLast ? 0.32 : 0.22,
              ease: "power2.out",
            }
          );
          tl.to(
            el,
            {
              y: isLast ? -75 : -55,
              opacity: 0,
              filter: "blur(4px)",
              duration: isLast ? 0.28 : 0.18,
              ease: "power2.in",
            },
            isLast ? "+=0.28" : "+=0.18"
          );
        });
      }

      // 2. Anvil icon appears in center as FORGE leaves
      tl.to(
        stageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.38,
          ease: "back.out(1.5)",
        },
        "-=0.1"
      );

      // 3. Hammer drops in from above
      tl.to(
        hammerRef.current,
        {
          opacity: 1,
          y: -80,
          rotate: -35,
          duration: 0.28,
          ease: "power2.out",
        },
        "+=0.06"
      );

      // 4. Hammer wind-up (anticipation)
      tl.to(hammerRef.current, {
        y: -105,
        rotate: -55,
        duration: 0.18,
        ease: "power1.inOut",
      });

      // 5. HAMMER STRIKE DOWN ONTO ANVIL! (High impact velocity)
      tl.to(hammerRef.current, {
        y: -14,
        rotate: 15,
        duration: 0.14,
        ease: "power4.in",
      });

      // 6. MOMENT OF IMPACT (Spark burst + Anvil squash + Hammer recoil)
      const sparkEls = sparksRef.current?.querySelectorAll(".splash-spark");
      if (sparkEls && sparkEls.length > 0) {
        tl.set(sparkEls, { opacity: 1, scale: 1 }, "<");
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
              duration: 0.35,
              ease: "power3.out",
            },
            "<"
          );
        });
      }

      // Anvil squash & spring
      tl.to(
        pillRef.current,
        {
          y: 7,
          scaleX: 1.16,
          scaleY: 0.86,
          duration: 0.08,
          ease: "power2.in",
        },
        "<"
      );
      tl.to(pillRef.current, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        ease: "elastic.out(1.2, 0.4)",
      });

      // Hammer recoils back upwards and vanishes
      tl.to(
        hammerRef.current,
        {
          y: -100,
          rotate: -20,
          opacity: 0,
          duration: 0.38,
          ease: "power3.out",
        },
        "<+=0.04"
      );

      // 7. Impact reveals "Northforge Labs." text by expanding the pill
      tl.to(
        pillRef.current,
        {
          width: "auto",
          padding: "0 24px",
          duration: 0.55,
          ease: "power3.out",
        },
        "<+=0.05"
      );

      tl.to(
        textRevealRef.current,
        {
          width: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

      // 8. Savor the brand mark (nonchalant pause)
      tl.to({}, { duration: 0.85 });

      // 9. Plain white canvas slides up smoothly to unveil website
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: "power3.inOut",
      });
    }, containerRef);

    return () => {
      document.body.style.overflow = originalOverflow;
      ctx.revert();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
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
      }}
    >
      {/* 1. Rapid Words Ticker */}
      <div
        ref={wordsContainerRef}
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "90px",
          overflow: "hidden",
        }}
      >
        {WORDS.map((word) => (
          <div
            key={word}
            className="splash-word"
            style={{
              position: "absolute",
              fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#171717",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              lineHeight: 1,
              opacity: 0,
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* 2. Anvil, Hammer & Reveal Stage */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Hammer */}
        <div
          ref={hammerRef}
          style={{
            position: "absolute",
            top: "-32px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <svg
            width="58"
            height="58"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" fill="#999999" stroke="#171717" />
            <path d="m18 15 4-4" />
            <path
              d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"
              fill="#171717"
            />
          </svg>
        </div>

        {/* Impact Sparks */}
        <div
          ref={sparksRef}
          style={{
            position: "absolute",
            top: "-10px",
            zIndex: 12,
            pointerEvents: "none",
          }}
        >
          {[
            { x: -38, y: -28, color: "#CBFB45" },
            { x: 38, y: -30, color: "#CBFB45" },
            { x: -48, y: -6, color: "#171717" },
            { x: 48, y: -8, color: "#171717" },
            { x: -22, y: -48, color: "#CBFB45" },
            { x: 22, y: -48, color: "#CBFB45" },
          ].map((s, idx) => (
            <div
              key={idx}
              className="splash-spark"
              data-x={s.x}
              data-y={s.y}
              style={{
                position: "absolute",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: s.color,
                opacity: 0,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        {/* Brand Pill with Anvil and Revealing Text */}
        <div
          ref={pillRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: "62px",
            backgroundColor: "#171717",
            borderRadius: "100rem",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflow: "hidden",
            cursor: "default",
          }}
        >
          {/* Anvil Icon inside pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: "28px",
              height: "28px",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CBFB45"
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
          </div>

          {/* Unvealed Text */}
          <div
            ref={textRevealRef}
            style={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              paddingLeft: "10px",
              fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: "1.28rem",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#CBFB45" }}>Northforge</span>
            <span style={{ color: "#FFFFFF" }}>&nbsp;Labs.</span>
          </div>
        </div>
      </div>
    </div>
  );
}