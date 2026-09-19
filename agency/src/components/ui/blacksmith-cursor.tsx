"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const SEEYOS_SEQUENCE = ["s", "e", "e", "y", "o", "s"];

export default function BlacksmithCursor() {
  const [isActive, setIsActive] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hammerRef = useRef<HTMLDivElement>(null);
  const sparkLayerRef = useRef<HTMLDivElement>(null);
  const konamiIndexRef = useRef(0);
  const seeyosIndexRef = useRef(0);
  const isStrikingRef = useRef(false);

  // Keyboard listener to toggle Blacksmith Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes in form fields
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Exit on Escape if active
      if (e.key === "Escape" && isActive) {
        setIsActive(false);
        setShowToast(false);
        return;
      }

      // 1. Check Konami Code
      const expectedKonami = KONAMI_SEQUENCE[konamiIndexRef.current];
      if (e.key.toLowerCase() === expectedKonami.toLowerCase()) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === KONAMI_SEQUENCE.length) {
          konamiIndexRef.current = 0;
          setIsActive((prev) => !prev);
          setShowToast(true);
        }
      } else {
        konamiIndexRef.current = e.key.toLowerCase() === KONAMI_SEQUENCE[0].toLowerCase() ? 1 : 0;
      }

      // 2. Check SEEYOS
      const expectedSeeyos = SEEYOS_SEQUENCE[seeyosIndexRef.current];
      if (e.key.toLowerCase() === expectedSeeyos) {
        seeyosIndexRef.current += 1;
        if (seeyosIndexRef.current === SEEYOS_SEQUENCE.length) {
          seeyosIndexRef.current = 0;
          setIsActive((prev) => !prev);
          setShowToast(true);
        }
      } else {
        seeyosIndexRef.current = e.key.toLowerCase() === SEEYOS_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }
  }, [showToast, isActive]);

  // Cursor tracking & click effects
  useEffect(() => {
    if (!isActive) {
      document.body.classList.remove("blacksmith-active");
      return;
    }

    document.body.classList.add("blacksmith-active");

    const hammerEl = hammerRef.current;
    const sparkLayerEl = sparkLayerRef.current;

    let mouseX = -100;
    let mouseY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (hammerEl) {
        hammerEl.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 26}px, 0) rotate(${
          isStrikingRef.current ? "16deg" : "-15deg"
        })`;
      }
    };

    const spawnSparks = (x: number, y: number) => {
      if (!sparkLayerEl) return;
      const sparkCount = 5;
      const colors = ["var(--green, #CBFB45)", "var(--green, #CBFB45)", "#FFFFFF", "var(--green, #CBFB45)", "#FFFFFF"];

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("span");
        const color = colors[i % colors.length];
        const size = Math.random() * 2.5 + 2.5; // 2.5px to 5px

        spark.style.position = "absolute";
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.borderRadius = "50%";
        spark.style.backgroundColor = color;
        spark.style.boxShadow = `0 0 6px ${color}`;
        spark.style.pointerEvents = "none";
        spark.style.willChange = "transform, opacity";

        sparkLayerEl.appendChild(spark);

        const dx = (Math.random() - 0.5) * (Math.random() * 55 + 35);
        const upY = -(Math.random() * 25 + 16);
        const downY = Math.random() * 50 + 35;

        gsap.to(spark, {
          x: dx,
          keyframes: [
            { y: upY, duration: 0.16, ease: "sine.out" },
            { y: downY, opacity: 0, scale: 0.2, duration: 0.46, ease: "power2.in" },
          ],
          onComplete: () => {
            spark.remove();
          },
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isStrikingRef.current = true;
      if (hammerEl) {
        hammerEl.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 26}px, 0) rotate(16deg) scale(0.95)`;
      }
      spawnSparks(e.clientX, e.clientY);
    };

    const onMouseUp = (e: MouseEvent) => {
      isStrikingRef.current = false;
      if (hammerEl) {
        hammerEl.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 26}px, 0) rotate(-15deg)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.classList.remove("blacksmith-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isActive]);

  if (!isActive && !showToast) return null;

  return (
    <>
      {/* Dynamic Global CSS for custom cursor */}
      {isActive && (
        <style dangerouslySetInnerHTML={{
          __html: `
            body.blacksmith-active,
            body.blacksmith-active * {
              cursor: none !important;
            }
          `
        }} />
      )}

      {/* Floating Hammer Cursor */}
      {isActive && (
        <div
          ref={hammerRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "36px",
            height: "36px",
            pointerEvents: "none",
            zIndex: 9999999,
            transformOrigin: "28px 24px",
            transition: "transform 0.08s ease-out",
            willChange: "transform",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 50 40" fill="none">
            <rect x="2" y="14" width="28" height="4.5" rx="2.25" fill="var(--green, #CBFB45)" />
            <rect x="28" y="4" width="14" height="24" rx="2" fill="var(--green, #CBFB45)" />
            <rect x="27" y="25" width="16" height="3" rx="1" fill="var(--green, #CBFB45)" />
          </svg>
        </div>
      )}

      {/* Sparks Layer */}
      {isActive && (
        <div
          ref={sparkLayerRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 9999998,
            overflow: "hidden",
          }}
        />
      )}

      {/* Subtle Toast notification */}
      {showToast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#171717",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.6), 0 0 12px rgba(203, 251, 69, 0.2)",
            borderRadius: "100rem",
            padding: "8px 18px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "#FFFFFF",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            zIndex: 10000000,
            pointerEvents: "none",
            animation: "fadeInUp 0.25s ease-out forwards",
          }}
        >
          <span style={{ color: "var(--green, #CBFB45)", fontSize: "15px" }}>⚒</span>
          <span>
            {isActive ? "Blacksmith Cursor Engaged" : "Blacksmith Cursor Disengaged"}
          </span>
          {isActive && (
            <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "11px", marginLeft: "4px" }}>
              (Esc to exit)
            </span>
          )}
        </div>
      )}
    </>
  );
}
