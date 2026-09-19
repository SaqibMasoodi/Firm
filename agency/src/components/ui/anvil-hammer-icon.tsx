import React from "react";

interface AnvilHammerIconProps {
  size?: number;
  className?: string;
}

export default function AnvilHammerIcon({
  size = 26,
  className = "",
}: AnvilHammerIconProps) {
  const anvilWidth = Math.round(size * 0.69); // ~18px at 26
  const anvilHeight = Math.round(size * 0.69);
  const hammerWidth = Math.round(size * 0.65); // ~17px at 26
  const hammerHeight = Math.round(size * 0.52); // ~13.5px at 26

  return (
    <div
      className={`relative flex items-center justify-center ${className}`.trim()}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {/* White Anvil Base */}
      <svg
        width={anvilWidth}
        height={anvilHeight}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block", marginTop: "3px" }}
      >
        <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
        <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
        <path d="M9 12v5" />
        <path d="M15 12v5" />
        <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
      </svg>

      {/* Lime Green Hammer (#CBFB45) resting flat on the anvil top */}
      <div
        style={{
          position: "absolute",
          top: "1px",
          left: "4px",
          display: "block",
          pointerEvents: "none",
        }}
      >
        <svg
          width={hammerWidth}
          height={hammerHeight}
          viewBox="0 0 50 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="12" width="30" height="4.5" rx="2.25" fill="#CBFB45" />
          <rect x="30" y="2" width="14" height="24" rx="2" fill="#CBFB45" />
          <rect x="29" y="23" width="16" height="3" rx="1" fill="#CBFB45" />
        </svg>
      </div>
    </div>
  );
}
