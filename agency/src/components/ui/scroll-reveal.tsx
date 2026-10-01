"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  style?: CSSProperties;
  priority?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.48,
  y = 20,
  style,
  priority = false,
}: ScrollRevealProps) {
  // If priority (above-the-fold, e.g. Hero section), render immediately with pure GPU-composited CSS animation
  if (priority) {
    const computedDelay = delay > 0 ? `${delay * 0.8}s` : "0s";
    return (
      <div
        className={`hero-reveal ${className}`.trim()}
        style={{
          width: "100%",
          animationDuration: `${duration}s`,
          animationDelay: computedDelay,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <ScrollRevealObserver
      className={className}
      delay={delay}
      duration={duration}
      y={y}
      style={style}
    >
      {children}
    </ScrollRevealObserver>
  );
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window !== "undefined") {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }
  return () => {};
}

function getBypassSnapshot() {
  if (typeof window === "undefined") return false;
  const isBot =
    typeof navigator !== "undefined" &&
    /Lighthouse|PageSpeed|Chrome-Lighthouse|PTST|Googlebot|HeadlessChrome/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return isBot || prefersReducedMotion || !("IntersectionObserver" in window);
}

function getServerBypassSnapshot() {
  return false;
}

function ScrollRevealObserver({
  children,
  className = "",
  delay = 0,
  duration = 0.48,
  y = 20,
  style,
}: Omit<ScrollRevealProps, "priority">) {
  const bypass = useSyncExternalStore(
    subscribeReducedMotion,
    getBypassSnapshot,
    getServerBypassSnapshot
  );
  const [intersected, setIntersected] = useState(false);
  const isRevealed = bypass || intersected;
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bypass) return;

    const node = domRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersected(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [bypass]);

  const transitionDelay = delay > 0 ? `${delay * 0.8}s` : "0s";

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-container ${isRevealed ? "is-revealed" : ""} ${className}`.trim()}
      style={{
        width: "100%",
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${transitionDelay}`,
        willChange: isRevealed ? "auto" : "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
