"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Pipette, ChevronsUpDown } from "lucide-react";

export const DEFAULT_BRAND_COLOR = "#CBFB45";

// 16 Presets matching the 2-row grid in the design (including our signature Northforge Lime)
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

interface AccentColorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccentColorModal({ isOpen, onClose }: AccentColorModalProps) {
  // HSV state for 2D canvas & hue slider
  const [hue, setHue] = useState(76); // ~76 for #CBFB45
  const [saturation, setSaturation] = useState(0.72);
  const [value, setValue] = useState(0.98);
  const [alpha, setAlpha] = useState(100);
  const [hexInput, setHexInput] = useState(DEFAULT_BRAND_COLOR);
  const [colorFormat, setColorFormat] = useState<"Hex" | "RGB" | "HSL">("Hex");

  const canvasRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLDivElement>(null);
  const alphaSliderRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const isDraggingCanvas = useRef(false);
  const isDraggingHue = useRef(false);
  const isDraggingAlpha = useRef(false);

  // Sync with current document --green variable on open
  useEffect(() => {
    if (typeof document !== "undefined" && isOpen) {
      const current = document.documentElement.style.getPropertyValue("--green").trim() || DEFAULT_BRAND_COLOR;
      const rgb = hexToRgb(current);
      if (rgb) {
        const [h, s, v] = rgbToHsv(...rgb);
        setHue(h);
        setSaturation(s);
        setValue(v);
        setHexInput(current.toUpperCase());
      }
    }
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
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDraggingCanvas.current) {
        handleCanvasMove(clientX, clientY);
      } else if (isDraggingHue.current) {
        handleHueMove(clientX);
      } else if (isDraggingAlpha.current) {
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
    window.addEventListener("touchmove", onPointerMove);
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

  // Close on Escape or outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const [r, g, b] = hsvToRgb(hue, saturation, value);
  const currentColorHex = rgbToHex(r, g, b);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Color Picker"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Exact UI Card from design */}
      <div
        ref={modalRef}
        style={{
          width: "100%",
          maxWidth: "340px",
          backgroundColor: "#FFFFFF",
          borderRadius: "28px",
          padding: "18px",
          boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)",
          color: "#171717",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
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
            height: "170px",
            borderRadius: "18px",
            overflow: "hidden",
            cursor: "crosshair",
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
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "3px solid #FFFFFF",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
              pointerEvents: "none",
              backgroundColor: "transparent",
            }}
          />
        </div>

        {/* 2. Controls Row: Eyedropper + Hue/Alpha Sliders */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Eyedropper Button */}
          <button
            type="button"
            onClick={handleEyeDropper}
            title="Pick color from screen"
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
            <Pipette size={20} strokeWidth={2.2} />
          </button>

          {/* Sliders Stack */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
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
                height: "12px",
                borderRadius: "100px",
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
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: "3px solid #FFFFFF",
                  backgroundColor: `hsl(${hue}, 100%, 50%)`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
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
                height: "12px",
                borderRadius: "100px",
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
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: "3px solid #FFFFFF",
                  backgroundColor: currentColorHex,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
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
              gap: "6px",
              padding: "0 14px",
              height: "36px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E4E4E7",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#18181B",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
            }}
          >
            <span>{colorFormat}</span>
            <ChevronsUpDown size={13} color="#71717A" />
          </button>

          {/* Hex Value Pill */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
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
                fontSize: "13px",
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
              width: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "36px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E4E4E7",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#18181B",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
            }}
          >
            {alpha}%
          </div>
        </div>

        {/* 4. Dropdown Pill: Last Colors */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "38px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E4E4E7",
            borderRadius: "100px",
            padding: "0 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#18181B",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
            cursor: "default",
          }}
        >
          <span>Last Colors</span>
          <ChevronsUpDown size={14} color="#71717A" />
        </div>

        {/* 5. Two Rows of 8 Swatches */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "8px",
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
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  borderRadius: "7px",
                  backgroundColor: colorHex,
                  border: isSelected ? "2px solid #18181B" : "1px solid rgba(0, 0, 0, 0.08)",
                  cursor: "pointer",
                  padding: 0,
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                  boxShadow: isSelected ? "0 2px 6px rgba(0, 0, 0, 0.2)" : "none",
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
      </div>
    </div>
  );
}
