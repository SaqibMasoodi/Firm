"use client";

import React, { useState, useEffect } from "react";
import AnvilHammerIcon from "./anvil-hammer-icon";

interface LogoProps {
  variant?: "navbar" | "footer" | "admin" | "default";
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);

  useEffect(() => {
    if (variant !== "navbar") return;

    // Check if splash screen is actively running
    const isSplashActive = () => {
      try {
        return (
          sessionStorage.getItem("northforge_splash_viewed") !== "true" &&
          !document.documentElement.classList.contains("splash-viewed")
        );
      } catch {
        return false;
      }
    };

    // If splash screen is running on first load, wait until splash finishes + display plain text once
    const delay = isSplashActive() ? 3200 : 1500;

    const timer = setTimeout(() => {
      setIsMobileCollapsed(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [variant]);

  const variantClass =
    variant === "navbar"
      ? "is-navbar"
      : variant === "footer"
      ? "is-footer"
      : variant === "admin"
      ? "is-admin"
      : "";

  const collapseClass =
    variant === "navbar"
      ? isMobileCollapsed
        ? "is-mobile-collapsed"
        : "is-mobile-expanded"
      : "";

  return (
    <span
      className={`brand-logo-pill ${variantClass} ${collapseClass} ${className}`.trim()}
      title="Northforge Labs"
    >
      {variant === "navbar" && (
        <span className="brand-logo-icon-wrap" aria-hidden="true">
          <AnvilHammerIcon size={26} />
        </span>
      )}
      <span className="brand-logo-text-wrap">
        <span className="brand-logo-green">Northforge</span>
        <span className="brand-logo-white">&nbsp;Labs.</span>
      </span>
    </span>
  );
}
