"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Pipette, ChevronsUpDown, X } from "lucide-react";

export const DEFAULT_BRAND_COLOR = "#CBFB45";

export const PRESET_SWATCHES = [
  // Row 1
  "#3B82F6", // Blue
  "#F97316", // Orange
  "#A855F7", // Purple
  "#8B5CF6", // Violet
  "#EF4444", // Red
  "#22C55E", // Green
  "#EAB308", // Yellow / Gold
  "#EC4899", // Pink
  // Row 2
  "#F59E0B", // Amber Orange
  "#0EA5E9", // Sky Blue
  "#14B8A6", // Teal
  "#CBFB45", // Northforge Lime ("Our Thing")
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#E11D48", // Crimson
  "#D946EF", // Magenta
];

// Color conversion helpers
function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function hexToRgb(hex: string): [number, number, number] | null {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return [Math.round(h), s, v];
}

interface AccentColorDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccentColorDropdown({ isOpen, onClose }: AccentColorDropdownProps) {
  const [hue, setHue] = useState(76);
  const [saturation, setSaturation] = useState(0.72);
  const [value, setValue] = useState(0.98);
  const [alpha, setAlpha] = useState(100);
  const [hexInput, setHexInput] = useState(DEFAULT_BRAND_COLOR);
  const [colorFormat, setColorFormat] = useState<"Hex" | "RGB" | "HSL">("Hex");

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const alphaSliderRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDraggingCanvas = useRef(false);
  const isDraggingHue = useRef(false);
  const isDraggingAlpha = useRef(false);

  // Detect mobile viewport and mounting
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 991);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sync with current document --green variable on open
  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;
    const frame = requestAnimationFrame(() => {
      const current = document.documentElement.style.getPropertyValue("--green").trim() || DEFAULT_BRAND_COLOR;
      const rgb = hexToRgb(current);
      if (rgb) {
        const [h, s, v] = rgbToHsv(...rgb);
        setHue(h);
        setSaturation(s);
        setValue(v);
        setHexInput(current.toUpperCase());
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // Update current color and apply to root CSS variable
  const applyColor = useCallback((h: number, s: number, v: number) => {
    const [r, g, b] = hsvToRgb(h, s, v);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--green", hex);
    }
  }, []);

  // Update from 2D Canvas click/drag
  const handleCanvasMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      const newS = x / rect.width;
      const newV = 1 - y / rect.height;
      setSaturation(newS);
      setValue(newV);
      applyColor(hue, newS, newV);
    },
    [hue, applyColor]
  );

  // Update from Hue Slider click/drag
  const handleHueMove = useCallback(
    (clientX: number) => {
      if (!hueSliderRef.current) return;
      const rect = hueSliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const newHue = Math.round((x / rect.width) * 360) % 360;
      setHue(newHue);
      applyColor(newHue, saturation, value);
    },
    [saturation, value, applyColor]
  );

  // Update from Alpha Slider click/drag
  const handleAlphaMove = useCallback((clientX: number) => {
    if (!alphaSliderRef.current) return;
    const rect = alphaSliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const newAlpha = Math.round((x / rect.width) * 100);
    setAlpha(newAlpha);
  }, []);

  // Global mouse/touch move and up listeners for continuous dragging
  useEffect(() => {
    if (!isOpen) return;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const isTouch = "touches" in e;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      if (isDraggingCanvas.current) {
        if (isTouch && e.cancelable) e.preventDefault();
        handleCanvasMove(clientX, clientY);
      } else if (isDraggingHue.current) {
        if (isTouch && e.cancelable) e.preventDefault();
        handleHueMove(clientX);
      } else if (isDraggingAlpha.current) {
        if (isTouch && e.cancelable) e.preventDefault();
        handleAlphaMove(clientX);
      }
    };

    const onPointerUp = () => {
      isDraggingCanvas.current = false;
      isDraggingHue.current = false;
      isDraggingAlpha.current = false;
    };

    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [isOpen, handleCanvasMove, handleHueMove, handleAlphaMove]);

  // Native EyeDropper API support
  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          const hex = result.sRGBHex.toUpperCase();
          const rgb = hexToRgb(hex);
          if (rgb) {
            const [h, s, v] = rgbToHsv(...rgb);
            setHue(h);
            setSaturation(s);
            setValue(v);
            setHexInput(hex);
            applyColor(h, s, v);
          }
        }
      } catch {
        // User cancelled eye dropper
      }
    }
  };

  // Preset swatch selection
  const selectPreset = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (rgb) {
      const [h, s, v] = rgbToHsv(...rgb);
      setHue(h);
      setSaturation(s);
      setValue(v);
      setHexInput(hex.toUpperCase());
      applyColor(h, s, v);
    }
  };

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (
          !target.closest(".navbar-accent-button") &&
          !target.closest(".navbar-menu-accent-btn")
        ) {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const [r, g, b] = hsvToRgb(hue, saturation, value);
  const currentColorHex = rgbToHex(r, g, b);

  // Common inner content of the color picker
  const pickerContent = (
    <>
      {/* Mobile Top Header */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "2px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: currentColorHex,
                boxShadow: "0 0 0 2px #FFFFFF, 0 0 0 3px rgba(0, 0, 0, 0.15)",
              }}
            />
            <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.03em", color: "#18181B" }}>
              CUSTOMIZE ACCENT
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close color picker"
            style={{
              background: "#F4F4F5",
              border: "none",
              color: "#52525B",
              cursor: "pointer",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.15s ease",
            }}
          >
            <X size={15} strokeWidth={2.4} />
          </button>
        </div>
      )}

      {/* 1. Large 2D Saturation / Value Gradient Canvas */}
      <div
        ref={canvasRef}
        onMouseDown={(e) => {
          isDraggingCanvas.current = true;
          handleCanvasMove(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          isDraggingCanvas.current = true;
          handleCanvasMove(e.touches[0].clientX, e.touches[0].clientY);
        }}
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? "140px" : "155px",
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "crosshair",
          touchAction: "none",
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
          backgroundImage:
            "linear-gradient(to top, #000000, transparent), linear-gradient(to right, #FFFFFF, transparent)",
        }}
      >
        {/* Circular Target Handle */}
        <div
          style={{
            position: "absolute",
            left: `${saturation * 100}%`,
            top: `${(1 - value) * 100}%`,
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: "3px solid #FFFFFF",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.4)",
            pointerEvents: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* 2. Controls Row: Eyedropper + Hue/Alpha Sliders */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Eyedropper Button */}
        <button
          type="button"
          onClick={handleEyeDropper}
          title="Pick color from screen"
          aria-label="Pick color from screen"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#52525B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Pipette size={18} strokeWidth={2.2} />
        </button>

        {/* Sliders Stack */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "9px" }}>
          {/* Hue Slider */}
          <div
            ref={hueSliderRef}
            onMouseDown={(e) => {
              isDraggingHue.current = true;
              handleHueMove(e.clientX);
            }}
            onTouchStart={(e) => {
              isDraggingHue.current = true;
              handleHueMove(e.touches[0].clientX);
            }}
            style={{
              position: "relative",
              height: "10px",
              borderRadius: "100px",
              touchAction: "none",
              background:
                "linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)",
              cursor: "pointer",
            }}
          >
            {/* Hue Thumb */}
            <div
              style={{
                position: "absolute",
                left: `${(hue / 360) * 100}%`,
                top: "50%",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2.5px solid #FFFFFF",
                backgroundColor: `hsl(${hue}, 100%, 50%)`,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Alpha/Opacity Slider */}
          <div
            ref={alphaSliderRef}
            onMouseDown={(e) => {
              isDraggingAlpha.current = true;
              handleAlphaMove(e.clientX);
            }}
            onTouchStart={(e) => {
              isDraggingAlpha.current = true;
              handleAlphaMove(e.touches[0].clientX);
            }}
            style={{
              position: "relative",
              height: "10px",
              borderRadius: "100px",
              touchAction: "none",
              backgroundImage:
                `linear-gradient(to right, rgba(${r},${g},${b}, 0), rgba(${r},${g},${b}, 1)), ` +
                "repeating-conic-gradient(#E4E4E7 0% 25%, #FFFFFF 0% 50%)",
              backgroundSize: "100% 100%, 8px 8px",
              cursor: "pointer",
            }}
          >
            {/* Alpha Thumb */}
            <div
              style={{
                position: "absolute",
                left: `${alpha}%`,
                top: "50%",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                border: "2.5px solid #FFFFFF",
                backgroundColor: currentColorHex,
                transform: "translate(-50%, -50%)",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Inputs Row: [Hex v]  [ #858585 ]  [ 100% ] */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Format Selector Pill */}
        <button
          type="button"
          onClick={() => setColorFormat((prev) => (prev === "Hex" ? "RGB" : "Hex"))}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            padding: "0 12px",
            height: "34px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E4E7",
            borderRadius: "100px",
            fontSize: "12px",
            fontWeight: 500,
            color: "#18181B",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
          }}
        >
          <span>{colorFormat}</span>
          <ChevronsUpDown size={12} color="#71717A" />
        </button>

        {/* Hex Value Pill */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "34px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E4E7",
            borderRadius: "100px",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
            padding: "0 10px",
          }}
        >
          <input
            type="text"
            value={hexInput}
            aria-label="Hex color code"
            onChange={(e) => {
              const val = e.target.value;
              setHexInput(val);
              const rgb = hexToRgb(val);
              if (rgb) {
                const [h, s, v] = rgbToHsv(...rgb);
                setHue(h);
                setSaturation(s);
                setValue(v);
                applyColor(h, s, v);
              }
            }}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              textAlign: "center",
              fontSize: "12px",
              fontWeight: 600,
              color: "#18181B",
              outline: "none",
              letterSpacing: "-0.01em",
            }}
          />
        </div>

        {/* Percentage Pill */}
        <div
          style={{
            width: "55px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "34px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E4E7",
            borderRadius: "100px",
            fontSize: "12px",
            fontWeight: 500,
            color: "#18181B",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
          }}
        >
          {alpha}%
        </div>
      </div>

      {/* 4. Swatches Heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "32px",
          backgroundColor: "#F9F9FB",
          border: "1px solid #E4E4E7",
          borderRadius: "100px",
          padding: "0 14px",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: "#52525B",
          cursor: "default",
        }}
      >
        <span>BRAND & PRESET PALETTES</span>
        <ChevronsUpDown size={12} color="#71717A" />
      </div>

      {/* 5. Two Rows of 8 Swatches */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "6px",
        }}
      >
        {PRESET_SWATCHES.map((colorHex, idx) => {
          const isSelected = currentColorHex.toLowerCase() === colorHex.toLowerCase();
          return (
            <button
              key={idx}
              type="button"
              onClick={() => selectPreset(colorHex)}
              title={colorHex}
              aria-label={`Select color ${colorHex}`}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "6px",
                backgroundColor: colorHex,
                border: isSelected ? "2px solid #18181B" : "1px solid rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                padding: 0,
                transform: isSelected ? "scale(1.12)" : "scale(1)",
                boxShadow: isSelected ? "0 2px 6px rgba(0, 0, 0, 0.3)" : "none",
                transition: "transform 0.12s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.transform = "scale(1)";
              }}
            />
          );
        })}
      </div>
    </>
  );

  // Mobile rendering via Portal
  if (isMobile && mounted) {
    return createPortal(
      <div
        className="navbar-accent-mobile-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Customize Accent Color"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <div
          className="navbar-accent-mobile-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={dropdownRef}
          role="region"
          aria-label="Accent Color Picker"
          className="navbar-accent-dropdown is-mobile-sheet"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "350px",
            backgroundColor: "#FFFFFF",
            borderRadius: "26px",
            padding: "16px",
            boxShadow: "0 24px 60px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            color: "#171717",
            fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            display: "flex",
            flexDirection: "column",
            gap: "13px",
            zIndex: 2,
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {pickerContent}
        </div>
      </div>,
      document.body
    );
  }

  // Desktop inline rendering
  return (
    <div
      ref={dropdownRef}
      role="region"
      aria-label="Accent Color Picker Dropdown"
      className="navbar-accent-dropdown"
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: "330px",
        maxWidth: "calc(100vw - 32px)",
        backgroundColor: "#FFFFFF",
        borderRadius: "26px",
        padding: "16px",
        boxShadow: "0 20px 48px -8px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.12)",
        color: "#171717",
        fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        userSelect: "none",
        WebkitUserSelect: "none",
        zIndex: 1000,
      }}
    >
      {pickerContent}
    </div>
  );
}
