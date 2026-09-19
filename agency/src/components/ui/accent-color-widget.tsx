"use client";

import React, { useState, useEffect, useRef } from "react";
import { Palette, RotateCcw, X, Check } from "lucide-react";

const DEFAULT_COLOR = "#CBFB45";

const PRESET_COLORS = [
  { name: "Original Lime", hex: "#CBFB45", isDefault: true },
  { name: "Cyber Cyan", hex: "#00F0FF" },
  { name: "Neon Emerald", hex: "#10B981" },
  { name: "Electric Purple", hex: "#A855F7" },
  { name: "Hot Magenta", hex: "#F43F5E" },
  { name: "Sunset Amber", hex: "#F59E0B" },
  { name: "Hyper Blue", hex: "#3B82F6" },
  { name: "Vivid Coral", hex: "#FF5722" },
];

export default function AccentColorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(DEFAULT_COLOR);
  const [customInput, setCustomInput] = useState(DEFAULT_COLOR);
  const widgetRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Apply color to CSS variable
  const applyColor = (hex: string) => {
    setActiveColor(hex);
    setCustomInput(hex);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--green", hex);
    }
  };

  // Reset to original brand color
  const resetColor = () => {
    applyColor(DEFAULT_COLOR);
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-5 right-5 z-[9990] select-none font-sans"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9990,
      }}
      aria-label="Accent Color Switcher"
    >
      {/* Popover Panel */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 12px)",
            right: 0,
            width: "280px",
            backgroundColor: "rgba(23, 23, 23, 0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4)",
            padding: "16px",
            color: "#FFFFFF",
            animation: "widgetFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: activeColor,
                  boxShadow: `0 0 8px ${activeColor}`,
                }}
              />
              <span style={{ fontWeight: 600, fontSize: "14px", letterSpacing: "-0.01em" }}>
                Accent Color
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {activeColor.toLowerCase() !== DEFAULT_COLOR.toLowerCase() && (
                <button
                  type="button"
                  onClick={resetColor}
                  title="Reset to Original (#CBFB45)"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    color: "#A1A1AA",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#A1A1AA";
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                  }}
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close"
                style={{
                  background: "none",
                  border: "none",
                  color: "#A1A1AA",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A1A1AA")}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Color Wheel & Custom Hex Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
              padding: "8px 10px",
              backgroundColor: "rgba(0, 0, 0, 0.35)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Color Wheel Trigger */}
            <div
              style={{
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
              onClick={() => colorInputRef.current?.click()}
              title="Open Color Wheel"
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: activeColor,
                  border: "2px solid #171717",
                }}
              />
              <input
                ref={colorInputRef}
                type="color"
                value={activeColor.startsWith("#") && activeColor.length === 7 ? activeColor : DEFAULT_COLOR}
                onChange={(e) => applyColor(e.target.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Hex Input */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "10px", color: "#71717A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Color Wheel / Hex
              </span>
              <input
                type="text"
                value={customInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setCustomInput(val);
                  if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
                    applyColor(val);
                  }
                }}
                placeholder="#CBFB45"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  fontWeight: 600,
                  outline: "none",
                  width: "100%",
                }}
              />
            </div>
          </div>

          {/* Palette Grid (Table of Colors) */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#A1A1AA",
                marginBottom: "8px",
                fontWeight: 500,
              }}
            >
              Preset Palette
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
              }}
            >
              {PRESET_COLORS.map((color) => {
                const isSelected = activeColor.toLowerCase() === color.hex.toLowerCase();
                return (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => applyColor(color.hex)}
                    title={`${color.name} (${color.hex})`}
                    style={{
                      position: "relative",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: color.hex,
                      border: isSelected ? "2px solid #FFFFFF" : "1px solid rgba(0,0,0,0.2)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isSelected
                        ? `0 0 12px ${color.hex}, 0 2px 6px rgba(0,0,0,0.4)`
                        : "0 2px 4px rgba(0,0,0,0.2)",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                      transform: isSelected ? "scale(1.05)" : "scale(1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.transform = "scale(1.04)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {isSelected && (
                      <Check
                        size={16}
                        color={["#CBFB45", "#00F0FF", "#F59E0B"].includes(color.hex) ? "#171717" : "#FFFFFF"}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div
            style={{
              paddingTop: "8px",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              fontSize: "11px",
              color: "#71717A",
              textAlign: "center",
            }}
          >
            ⚡ Reverts to Northforge Lime on reload
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Custom Accent Color Picker"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          height: "44px",
          padding: "0 14px 0 10px",
          backgroundColor: "#171717",
          border: `1.5px solid ${activeColor}`,
          borderRadius: "100rem",
          color: "#FFFFFF",
          cursor: "pointer",
          boxShadow: `0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px ${activeColor}40`,
          transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = `0 6px 20px rgba(0, 0, 0, 0.6), 0 0 16px ${activeColor}80`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = `0 4px 16px rgba(0, 0, 0, 0.5), 0 0 10px ${activeColor}40`;
        }}
      >
        <span
          style={{
            position: "relative",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            backgroundColor: activeColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 8px ${activeColor}`,
          }}
        >
          <Palette size={13} color="#171717" strokeWidth={2.5} />
        </span>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
          }}
        >
          Accent
        </span>
      </button>
    </div>
  );
}
