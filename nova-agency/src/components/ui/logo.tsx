import React from "react";

interface LogoProps {
  variant?: "navbar" | "footer" | "admin" | "default";
  className?: string;
}

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const variantClass =
    variant === "navbar"
      ? "is-navbar"
      : variant === "footer"
      ? "is-footer"
      : variant === "admin"
      ? "is-admin"
      : "";

  return (
    <span className={`brand-logo-pill ${variantClass} ${className}`.trim()}>
      <span className="brand-logo-green">Northforge</span>
      <span className="brand-logo-white">&nbsp;Labs.</span>
    </span>
  );
}
