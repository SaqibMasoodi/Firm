"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

interface ImageFocalScaleSelectorProps {
  image: string;
  alt?: string;
  title?: string;
  description?: string;
  tags?: string[];
  blobColor?: string;
  blobRadius?: string;
  position?: string;
  scale?: number;
  containerLabel?: string;
  onChange: (updates: { position?: string; scale?: number }) => void;
}

export function parsePositionString(posStr: string = "50% 50%") {
  const parts = posStr.trim().split(/\s+/);
  let x = 50;
  let y = 50;
  if (parts.length >= 1) {
    if (parts[0] === "left") x = 0;
    else if (parts[0] === "center") x = 50;
    else if (parts[0] === "right") x = 100;
    else {
      const parsedX = parseFloat(parts[0]);
      if (!isNaN(parsedX)) x = parsedX;
    }
  }
  if (parts.length >= 2) {
    if (parts[1] === "top") y = 0;
    else if (parts[1] === "center") y = 50;
    else if (parts[1] === "bottom") y = 100;
    else {
      const parsedY = parseFloat(parts[1]);
      if (!isNaN(parsedY)) y = parsedY;
    }
  }
  return {
    x: Math.max(0, Math.min(100, Math.round(x))),
    y: Math.max(0, Math.min(100, Math.round(y))),
  };
}

export default function ImageFocalScaleSelector({
  image,
  alt = "Portfolio image preview",
  title = "DASHit",
  description = "A hyperlocal quick-commerce website for ordering groceries and daily essentials across Anantnag, Kashmir.",
  tags = ["Mobile App", "Website"],
  blobColor = "#EDE9FE",
  blobRadius = "62% 38% 70% 30% / 45% 55% 45% 55%",
  position = "50% 50%",
  scale = 1,
  containerLabel = "LIVE CARD PREVIEW",
  onChange,
}: ImageFocalScaleSelectorProps) {
  const currentPos = useMemo(() => parsePositionString(position), [position]);
  const currentScale = typeof scale === "number" && !isNaN(scale) && scale > 0 ? scale : 1;
  const uniqueId = useId();

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    rectWidth: number;
    rectHeight: number;
  } | null>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Keep latest onChange in a ref so pointer listener never drops or re-attaches during active drag
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Active tags fallback (capped at max 2 pills)
  const displayTags = (tags && tags.length > 0 ? tags : ["Mobile App", "Website"]).slice(0, 2);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    e.preventDefault();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y,
      rectWidth: rect.width,
      rectHeight: rect.height,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { startX, startY, initialX, initialY, rectWidth, rectHeight } = dragRef.current;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Clean 1:1 cursor movement mapping: drag right = image translates right (+X), drag down = translates down (+Y)
      const percentX = (deltaX / rectWidth) * 100;
      const percentY = (deltaY / rectHeight) * 100;

      const nextX = Math.max(0, Math.min(100, Math.round(initialX + percentX)));
      const nextY = Math.max(0, Math.min(100, Math.round(initialY + percentY)));

      onChangeRef.current({ position: `${nextX}% ${nextY}%` });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging]);

  const handleXChange = (val: number) => {
    const clampedX = Math.max(0, Math.min(100, Math.round(val)));
    onChange({ position: `${clampedX}% ${currentPos.y}%` });
  };

  const handleYChange = (val: number) => {
    const clampedY = Math.max(0, Math.min(100, Math.round(val)));
    onChange({ position: `${currentPos.x}% ${clampedY}%` });
  };

  const handleScaleChange = (val: number) => {
    const clampedScale = Math.max(0.5, Math.min(2.5, Math.round(val * 100) / 100));
    onChange({ scale: clampedScale });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Header Info Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>Project Card Live Framing & Scale</span>
            <span style={{
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "0.15rem 0.6rem",
              borderRadius: "100rem",
              backgroundColor: "rgba(203, 251, 69, 0.35)",
              color: "#1f2937",
              border: "1px solid rgba(203, 251, 69, 0.8)",
            }}>
              {containerLabel}
            </span>
          </div>
          <div style={{ fontSize: "0.825rem", color: "#6b7280", marginTop: "0.2rem" }}>
            Click and drag the image around to adjust its position. Use sliders below to fine-tune.
          </div>
        </div>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          backgroundColor: "#f4f5f7",
          padding: "0.45rem 1rem",
          borderRadius: "100rem",
          fontSize: "0.825rem",
          color: "#374151",
          fontWeight: 600,
          border: "1px solid #e5e7eb",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--green, #cbfb45)" }} />
          <span>Position: {currentPos.x}%, {currentPos.y}%</span>
          <span style={{ color: "#d1d5db" }}>•</span>
          <span>Scale: {currentScale.toFixed(2)}x ({Math.round(currentScale * 100)}%)</span>
        </div>
      </div>

      {/* FULL REALISTIC PROJECT CARD CONTAINER */}
      <div
        className="portfolio-card"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius: "2rem",
          padding: "1.35rem 0.5rem 1.35rem 1.85rem",
          minHeight: "14.5rem",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          overflow: "hidden", // Outermost frame does all clipping naturally along 2rem border-radius
          boxShadow: "0 8px 30px -8px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Left Column: Project Info (Identical to live frontend card) */}
        <div
          className="portfolio-card-info"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: "0 1 48%",
            minWidth: 0,
            zIndex: 2,
            paddingRight: "1rem",
            boxSizing: "border-box",
          }}
        >
          <div className="portfolio-card-header" style={{ display: "flex", flexDirection: "column", paddingTop: "0.65rem" }}>
            <h3
              className="portfolio-card-title"
              style={{
                fontSize: "clamp(1.3rem, 1.5vw, 1.7rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                color: "var(--black, #171717)",
                margin: "0 0 0.45rem 0",
                wordBreak: "break-word",
              }}
            >
              {title || "Project Title"}
            </h3>

            <p
              className="portfolio-card-desc"
              style={{
                fontSize: "0.825rem",
                lineHeight: 1.45,
                color: "#4b5563",
                margin: "0 0 0.75rem 0",
                maxWidth: "100%",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description || "A hyperlocal quick-commerce website for ordering groceries and daily essentials across Anantnag, Kashmir."}
            </p>

            <div className="portfolio-card-tags" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="portfolio-tag-pill"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.22rem 0.7rem",
                    borderRadius: "100rem",
                    backgroundColor: "#f1f2f4",
                    color: "var(--black, #171717)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="portfolio-card-footer" style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
            <span
              className="portfolio-case-study-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                color: "var(--black, #171717)",
                fontSize: "0.825rem",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              View case study{" "}
              <span className="portfolio-arrow-icon" aria-hidden="true" style={{ fontSize: "0.95rem" }}>
                ↗
              </span>
            </span>
          </div>
        </div>

        {/* Right Column: Visual Preview Cutout with Simple Drag-Around */}
        <div
          ref={visualRef}
          className="portfolio-card-visual"
          onPointerDown={handlePointerDown}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "1 1 52%",
            minWidth: 0,
            height: "calc(100% + 2.7rem)",
            marginTop: "-1.35rem",
            marginBottom: "-1.35rem",
            marginRight: "-0.5rem",
            minHeight: "12rem",
            overflow: "visible",
            boxSizing: "border-box",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
          }}
        >
          {/* Subtle Background Blob */}
          <div
            className="portfolio-blob"
            style={{
              position: "absolute",
              width: "105%",
              height: "100%",
              right: "-5%",
              bottom: "-5%",
              backgroundColor: blobColor,
              borderRadius: blobRadius,
              opacity: 0.85,
              pointerEvents: "none",
              transition: "transform 0.3s ease",
            }}
            aria-hidden="true"
          />

          {/* The Scaled and Positioned Cutout Image (No focal reticle obstruction) */}
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={image}
              src={image}
              alt={alt}
              className="portfolio-cutout-img"
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "100%",
                height: "100%",
                maxHeight: "15rem",
                objectFit: "contain",
                transform: `translate(${currentPos.x - 50}%, ${currentPos.y - 50}%) scale(${currentScale})`,
                transformOrigin: "center",
                display: "block",
                pointerEvents: "none",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            />
          ) : (
            <div style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}>
              No image selected yet
            </div>
          )}

          {/* Clean Subtle Drag Hint Pill */}
          <div style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            zIndex: 10,
            backgroundColor: "rgba(23, 23, 23, 0.75)",
            backdropFilter: "blur(4px)",
            color: "#ffffff",
            fontSize: "0.7rem",
            fontWeight: 600,
            padding: "0.22rem 0.65rem",
            borderRadius: "100rem",
            pointerEvents: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            opacity: isDragging ? 0.3 : 0.85,
            transition: "opacity 0.2s ease",
          }}>
            {isDragging ? "Moving..." : "Drag image"}
          </div>
        </div>
      </div>

      {/* 3-Column Fine-Tuning Slider Controls */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        {/* Horizontal Position Slider */}
        <div style={{ backgroundColor: "#f9fafb", padding: "1.1rem 1.25rem", borderRadius: "18px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
            <label htmlFor={`${uniqueId}-pos-x`} style={{ fontSize: "0.825rem", fontWeight: 600, color: "#171717" }}>
              Horizontal (X Axis)
            </label>
            <span style={{ fontSize: "0.825rem", color: "#171717", fontWeight: 700 }}>
              {currentPos.x}% {currentPos.x < 35 ? "(Left)" : currentPos.x > 65 ? "(Right)" : "(Center)"}
            </span>
          </div>
          <input
            id={`${uniqueId}-pos-x`}
            type="range"
            min={0}
            max={100}
            step={1}
            value={currentPos.x}
            onChange={(e) => handleXChange(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#171717", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.3rem" }}>
            <span>0% (Left)</span>
            <span>50% (Center)</span>
            <span>100% (Right)</span>
          </div>
        </div>

        {/* Vertical Position Slider */}
        <div style={{ backgroundColor: "#f9fafb", padding: "1.1rem 1.25rem", borderRadius: "18px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
            <label htmlFor={`${uniqueId}-pos-y`} style={{ fontSize: "0.825rem", fontWeight: 600, color: "#171717" }}>
              Vertical (Y Axis)
            </label>
            <span style={{ fontSize: "0.825rem", color: "#171717", fontWeight: 700 }}>
              {currentPos.y}% {currentPos.y < 35 ? "(Top)" : currentPos.y > 65 ? "(Bottom)" : "(Center)"}
            </span>
          </div>
          <input
            id={`${uniqueId}-pos-y`}
            type="range"
            min={0}
            max={100}
            step={1}
            value={currentPos.y}
            onChange={(e) => handleYChange(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#171717", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.3rem" }}>
            <span>0% (Top)</span>
            <span>50% (Center)</span>
            <span>100% (Bottom)</span>
          </div>
        </div>

        {/* Scale / Zoom Slider */}
        <div style={{ backgroundColor: "#f9fafb", padding: "1.1rem 1.25rem", borderRadius: "18px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
            <label htmlFor={`${uniqueId}-scale`} style={{ fontSize: "0.825rem", fontWeight: 600, color: "#171717" }}>
              Scale / Zoom
            </label>
            <span style={{ fontSize: "0.825rem", color: "#171717", fontWeight: 700 }}>
              {currentScale.toFixed(2)}x ({Math.round(currentScale * 100)}%)
            </span>
          </div>
          <input
            id={`${uniqueId}-scale`}
            type="range"
            min={0.5}
            max={2.5}
            step={0.05}
            value={currentScale}
            onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#171717", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9ca3af", marginTop: "0.3rem" }}>
            <span>0.50x (50%)</span>
            <span>1.00x (100%)</span>
            <span>2.50x (250%)</span>
          </div>
        </div>
      </div>

      {/* Alignment Presets and Reset Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.8rem", color: "#6b7280", fontWeight: 600, marginRight: "0.2rem" }}>
            Presets:
          </span>
          {[
            { label: "Center", x: 50, y: 50 },
            { label: "Left Edge", x: 15, y: 50 },
            { label: "Right Edge", x: 85, y: 50 },
            { label: "Top", x: 50, y: 15 },
            { label: "Bottom", x: 50, y: 85 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange({ position: `${preset.x}% ${preset.y}%` })}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                color: "#374151",
                padding: "0.3rem 0.85rem",
                borderRadius: "100rem",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <button
            type="button"
            onClick={() => handleScaleChange(1)}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              color: "#374151",
              padding: "0.3rem 0.85rem",
              borderRadius: "100rem",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Reset Zoom (1.0x)
          </button>
          <button
            type="button"
            onClick={() => onChange({ position: "50% 50%", scale: 1 })}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              color: "#ef4444",
              padding: "0.3rem 0.85rem",
              borderRadius: "100rem",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
