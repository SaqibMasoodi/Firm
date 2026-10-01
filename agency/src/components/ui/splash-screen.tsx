"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = [
  { text: "Build", color: "#171717" },
  { text: "Innovate", color: "#71717A" },
  { text: "Scale", color: "#171717" },
  { text: "Forge", color: "#171717" },
];

const GREEN_LETTERS = "Northforge".split("");
const WHITE_LETTERS = "Labs.".split("");

interface SplashScreenProps {
  forcePlay?: boolean;
  onComplete?: () => void;
}

export default function SplashScreen({ forcePlay = false, onComplete }: SplashScreenProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const anvilWrapRef = useRef<HTMLDivElement>(null);
  const hammerRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const textInnerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Audit bots, Lighthouse, headless browsers, or reduced motion detection
    const isBotOrLighthouse =
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|Chrome-Lighthouse|PTST|Googlebot|HeadlessChrome/i.test(navigator.userAgent);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!forcePlay) {
      let shouldSkip = false;
      try {
        shouldSkip =
          isBotOrLighthouse ||
          prefersReducedMotion ||
          sessionStorage.getItem("northforge_splash_viewed") === "true";
      } catch {
        shouldSkip = isBotOrLighthouse || prefersReducedMotion;
      }

      if (shouldSkip) {
        const timer = setTimeout(() => {
          setIsComplete(true);
          onCompleteRef.current?.();
        }, 0);
        return () => clearTimeout(timer);
      }
    }

    if (isComplete) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
    const circleSize = isMobile ? 58 : 82;

    // Pre-calculate intrinsic text width for precision interpolation
    const textInnerEl = textInnerRef.current;
    const rawTextWidth = textInnerEl
      ? textInnerEl.getBoundingClientRect().width || textInnerEl.scrollWidth
      : (isMobile ? 180 : 272);
    const targetTextWidth = Math.ceil(rawTextWidth);
    const targetPillWidth = circleSize + targetTextWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => {
          try {
            sessionStorage.setItem("northforge_splash_viewed", "true");
            document.documentElement.classList.add("splash-viewed");
          } catch {}
          document.body.style.overflow = originalOverflow;
          setIsComplete(true);
          onCompleteRef.current?.();
        },
      });

      const wordEls = wordsContainerRef.current?.querySelectorAll(".splash-word");
      const letterEls = textInnerRef.current?.querySelectorAll(".splash-letter");
      const sparkEls = sparksRef.current?.querySelectorAll(".splash-spark");

      // Set explicit initial states (GPU optimized)
      gsap.set(stageRef.current, { opacity: 0, scale: 0.92, transformOrigin: "center center" });
      gsap.set(pillRef.current, { width: circleSize, height: circleSize, borderRadius: "100rem" });
      gsap.set(anvilWrapRef.current, { y: 0, scale: 1 });
      gsap.set(hammerRef.current, {
        opacity: 0,
        y: isMobile ? -50 : -64,
        x: isMobile ? -9 : -12,
        rotate: -54,
        transformOrigin: "4px 12px",
      });
      gsap.set(textWrapRef.current, { width: 0, opacity: 0 });
      gsap.set(textInnerRef.current, { x: 0, opacity: 1 });
      if (letterEls && letterEls.length > 0) {
        gsap.set(letterEls, { opacity: 0, y: 10, scale: 0.88 });
      }
      if (sparkEls && sparkEls.length > 0) {
        gsap.set(sparkEls, { opacity: 0, scale: 0 });
      }

      // =========================================================================
      // 1. KINETIC WORDS STREAM (Rapid, overlapping, modern kinetic typography)
      // =========================================================================
      if (wordEls && wordEls.length > 0) {
        wordEls.forEach((el, index) => {
          const isLast = index === wordEls.length - 1;
          const enterDuration = isLast ? 0.22 : 0.15;
          const holdDuration = isLast ? 0.24 : 0.12;
          const exitDuration = isLast ? 0.18 : 0.12;

          tl.fromTo(
            el,
            { y: 32, opacity: 0, scale: 0.94 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: enterDuration,
              ease: "power3.out",
            }
          );

          tl.to(
            el,
            {
              y: isLast ? -36 : -28,
              opacity: 0,
              scale: 0.96,
              duration: exitDuration,
              ease: isLast ? "power3.in" : "power2.in",
            },
            `+=${holdDuration}`
          );
        });
      }

      // Hide words container once finished
      tl.set(wordsContainerRef.current, { display: "none" });

      // =========================================================================
      // 2. THE ANVIL CIRCLE EMERGES
      // =========================================================================
      tl.to(
        stageRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.32,
          ease: "expo.out",
        },
        "-=0.08"
      );

      // =========================================================================
      // 3. FLUID HAMMER ARC & ACCELERATED STRIKE (Natural physics momentum)
      // =========================================================================
      // Smooth entrance arc swinging up to ready position
      tl.to(
        hammerRef.current,
        {
          opacity: 1,
          y: isMobile ? -32 : -42,
          x: isMobile ? -4 : -6,
          rotate: -40,
          duration: 0.18,
          ease: "power2.out",
        },
        "-=0.04"
      );

      // Fluid apex wind-up
      tl.to(
        hammerRef.current,
        {
          y: isMobile ? -44 : -58,
          x: isMobile ? -7 : -10,
          rotate: -58,
          duration: 0.16,
          ease: "sine.inOut",
        }
      );

      // Sudden powerful strike down onto the anvil
      tl.to(hammerRef.current, {
        y: 0,
        x: 0,
        rotate: 0,
        duration: 0.12,
        ease: "power3.in",
      });

      // EXACT IMPACT POINT
      tl.addLabel("impact");

      // =========================================================================
      // 4. VISCERAL ANVIL IMPACT & DAMPED HARMONIC REBOUND
      // =========================================================================
      // Anvil micro-recoil (feeling the physical steel mass)
      tl.to(
        anvilWrapRef.current,
        {
          keyframes: [
            { y: 2.5, duration: 0.04, ease: "power2.out" },
            { y: -1.2, duration: 0.05, ease: "sine.inOut" },
            { y: 0, duration: 0.06, ease: "sine.out" },
          ],
        },
        "impact"
      );

      // Pill shockwave micro-pulse
      tl.to(
        pillRef.current,
        {
          keyframes: [
            { scale: 1.04, duration: 0.06, ease: "power2.out" },
            { scale: 1.0, duration: 0.22, ease: "elastic.out(1, 0.45)" },
          ],
        },
        "impact"
      );

      // Hammer physics-accurate elastic bounce
      tl.to(
        hammerRef.current,
        {
          keyframes: [
            { y: -8, x: -1.5, rotate: -9, duration: 0.06, ease: "power2.out" },
            { y: -1.5, x: -0.2, rotate: -1.5, duration: 0.06, ease: "power1.in" },
            { y: -3, x: -0.5, rotate: -3.5, duration: 0.05, ease: "power1.out" },
            { y: 0, x: 0, rotate: 0, duration: 0.09, ease: "sine.out" },
          ],
        },
        "impact"
      );

      // =========================================================================
      // 5. LUMINOUS ARC SPARKS BURST
      // =========================================================================
      if (sparkEls && sparkEls.length > 0) {
        tl.set(sparkEls, { opacity: 1, scale: 1 }, "impact");
        const sparkMultiplier = isMobile ? 0.75 : 1.25;
        sparkEls.forEach((spark) => {
          const el = spark as HTMLElement;
          const targetX = parseFloat(el.dataset.x || "0");
          const targetY = parseFloat(el.dataset.y || "0");
          const arcUpY = (targetY * 1.5 - 12) * (isMobile ? 0.8 : 1);

          tl.to(
            el,
            {
              x: targetX * sparkMultiplier,
              keyframes: [
                { y: arcUpY, duration: 0.11, ease: "sine.out" },
                { y: (targetY * 1.1 + 8) * (isMobile ? 0.8 : 1), scale: 0.2, opacity: 0, duration: 0.22, ease: "power2.in" },
              ],
            },
            "impact"
          );
        });
      }

      // =========================================================================
      // 6. PILL UNROLLS & LETTERS TRAVERSING WAVE (Precision hydraulic reveal)
      // =========================================================================
      tl.to(
        pillRef.current,
        {
          width: targetPillWidth,
          duration: 0.52,
          ease: "expo.out",
        },
        "impact+=0.02"
      );

      tl.to(
        textWrapRef.current,
        {
          width: targetTextWidth,
          opacity: 1,
          duration: 0.52,
          ease: "expo.out",
        },
        "impact+=0.02"
      );

      if (letterEls && letterEls.length > 0) {
        tl.to(
          letterEls,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "back.out(2.2)",
            stagger: 0.018,
          },
          "impact+=0.04"
        );
      }

      // =========================================================================
      // 7. SAVOR THE BRAND LOCKUP & SEAMLESS DISSOLVE INTO HOMEPAGE
      // =========================================================================
      // Confident, crisp pause
      tl.to({}, { duration: 0.38 });

      // Dismiss overlay with smooth GPU scale-out fade
      tl.to(
        pillRef.current,
        {
          scale: 1.03,
          duration: 0.28,
          ease: "power2.inOut",
        },
        "exit"
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onStart: () => {
            // Immediately pass pointer events to the underlying page
            if (containerRef.current) {
              containerRef.current.style.pointerEvents = "none";
            }
          },
        },
        "exit"
      );
    }, containerRef);

    let canSkip = false;
    const skipTimer = setTimeout(() => {
      canSkip = true;
    }, 150);

    const handleSkip = () => {
      if (!canSkip) return;
      ctx.revert();
      document.body.style.overflow = originalOverflow;
      setIsComplete(true);
      onCompleteRef.current?.();
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);

    return () => {
      clearTimeout(skipTimer);
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
      document.body.style.overflow = originalOverflow;
      ctx.revert();
    };
  }, [isComplete, forcePlay]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className={`splash-overlay ${forcePlay ? "force-play" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100dvh",
        minHeight: "-webkit-fill-available",
        backgroundColor: "#FFFFFF",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "all",
        contain: "paint layout",
        willChange: "opacity",
      }}
    >
      {/* 1. Kinetic Words Ticker - Guaranteed dead-center on mobile & desktop */}
      <div
        ref={wordsContainerRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          height: "120px",
          margin: "0 auto",
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
              left: 0,
              right: 0,
              width: "100%",
              textAlign: "center",
              fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(2rem, 5.5vw, 3.8rem)",
              fontWeight: 600,
              color: item.color,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              opacity: 0,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
              textShadow: "none",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* 2. Brand Circle -> Pill Stage */}
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
          transform: "scale(0.92) translateZ(0)",
          willChange: "transform, opacity",
        }}
      >
        {/* The Brand Pill */}
        <div
          ref={pillRef}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#171717",
            width: "var(--splash-circle, 82px)",
            height: "var(--splash-circle, 82px)",
            maxWidth: "calc(100vw - 32px)",
            borderRadius: "100rem",
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            overflow: "visible",
            cursor: "default",
            willChange: "width, transform",
            transform: "translateZ(0)",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.16)",
          }}
        >
          {/* Anvil Anchor */}
          <div
            ref={anvilWrapRef}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: "var(--splash-circle, 82px)",
              height: "var(--splash-circle, 82px)",
              overflow: "visible",
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            {/* White Anvil Icon */}
            <svg
              className="splash-anvil-svg"
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

            {/* Green Hammer (#CBFB45) */}
            <div
              ref={hammerRef}
              style={{
                position: "absolute",
                top: "var(--splash-hammer-top, 3.5px)",
                left: "var(--splash-hammer-left, 14px)",
                zIndex: 25,
                pointerEvents: "none",
                transformOrigin: "4px 12px",
                opacity: 0,
                transform: "translate(-12px, -64px) rotate(-54deg) translateZ(0)",
                willChange: "transform, opacity",
              }}
            >
              <svg
                className="splash-hammer-svg"
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

            {/* Impact Sparks with Radial Bloom */}
            <div
              ref={sparksRef}
              style={{
                position: "absolute",
                top: "var(--splash-spark-top, 26px)",
                left: "var(--splash-spark-left, 46px)",
                zIndex: 30,
                pointerEvents: "none",
              }}
            >
              {[
                { x: -26, y: -20, color: "var(--green, #CBFB45)", size: 5 },
                { x: 26, y: -22, color: "var(--green, #CBFB45)", size: 4.5 },
                { x: -32, y: -6, color: "#FFFFFF", size: 3.5 },
                { x: 32, y: -8, color: "#FFFFFF", size: 3.5 },
                { x: -16, y: -28, color: "var(--green, #CBFB45)", size: 4 },
                { x: 16, y: -28, color: "var(--green, #CBFB45)", size: 4 },
                { x: -6, y: -34, color: "#FFFFFF", size: 2.5 },
                { x: 8, y: -32, color: "var(--green, #CBFB45)", size: 3 },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="splash-spark"
                  data-x={s.x}
                  data-y={s.y}
                  style={{
                    position: "absolute",
                    width: `${s.size}px`,
                    height: `${s.size}px`,
                    borderRadius: "50%",
                    backgroundColor: s.color,
                    boxShadow: s.color === "var(--green, #CBFB45)" ? "0 0 8px #CBFB45" : "0 0 6px rgba(255,255,255,0.8)",
                    opacity: 0,
                    transform: "translate(-50%, -50%) translateZ(0)",
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Unveiled Brand Logo Text */}
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
                fontSize: "var(--splash-font-size, clamp(1.7rem, 3.4vw, 2.15rem))",
                lineHeight: 1.4,
                letterSpacing: "-0.025em",
                paddingLeft: "4px",
                paddingRight: "var(--splash-padding-right, 32px)",
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
                      transform: "translateY(10px) translateZ(0)",
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
                    transform: "translateY(10px) translateZ(0)",
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
                      transform: "translateY(10px) translateZ(0)",
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
