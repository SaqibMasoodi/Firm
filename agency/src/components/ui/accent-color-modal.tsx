"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, RotateCcw, Check } from "lucide-react";

export const DEFAULT_BRAND_COLOR = "#CBFB45";

export const PRESET_COLORS = [
  { name: "Northforge Lime", hex: "#CBFB45" },
  { name: "Cyber Cyan", hex: "#00F0FF" },
  { name: "Emerald Green", hex: "#10B981" },
  { name: "Electric Violet", hex: "#8B5CF6" },
  { name: "Hot Magenta", hex: "#F43F5E" },
  { name: "Sunset Amber", hex: "#F59E0B" },
  { name: "Sky Blue", hex: "#38BDF8" },
  { name: "Tangerine", hex: "#FB923C" },
];

interface AccentColorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccentColorModal({ isOpen, onClose }: AccentColorModalProps) {
  const [activeColor, setActiveColor] = useState(DEFAULT_BRAND_COLOR);
  const [customHex, setCustomHex] = useState(DEFAULT_BRAND_COLOR);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sync state on mount or when opening
  useEffect(() => {
    if (typeof document !== "undefined") {
      const current = document.documentElement.style.getPropertyValue("--green").trim();
      if (current) {
        setActiveColor(current);
        setCustomHex(current);
      }
    }
  }, [isOpen]);

  // Apply accent color to document (session only, never stored in localStorage)
  const applyColor = (hex: string) => {
    setActiveColor(hex);
    setCustomHex(hex);
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--green", hex);
    }
  };

  const resetToDefault = () => {
    applyColor(DEFAULT_BRAND_COLOR);
  };

  // Close on Escape or click outside
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

  const isDefault = activeColor.toLowerCase() === DEFAULT_BRAND_COLOR.toLowerCase();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accent-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: "100%",
          maxWidth: "380px",
          backgroundColor: "#171717",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "1.5rem",
          padding: "1.75rem",
          boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.5)",
          color: "#FFFFFF",
          fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <h2
              id="accent-modal-title"
              style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#FFFFFF",
              }}
            >
              Accent Color
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#A1A1AA",
                margin: "0.25rem 0 0 0",
              }}
            >
              Customize the theme accent for this session.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "transparent",
              border: "none",
              color: "#71717A",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#71717A")}
          >
            <X size={18} />
          </button>
        </div>

        {/* Custom Color Input Row */}
        <div style={{ marginBottom: "1.25rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#71717A",
              marginBottom: "0.5rem",
            }}
          >
            Custom Color / Wheel
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            {/* Native Color Wheel Trigger */}
            <button
              type="button"
              onClick={() => colorPickerRef.current?.click()}
              title="Open Color Wheel Picker"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: activeColor,
                border: "2px solid rgba(255, 255, 255, 0.2)",
                cursor: "pointer",
                padding: 0,
                position: "relative",
                flexShrink: 0,
              }}
            >
              <input
                ref={colorPickerRef}
                type="color"
                value={activeColor.startsWith("#") && activeColor.length === 7 ? activeColor : DEFAULT_BRAND_COLOR}
                onChange={(e) => applyColor(e.target.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                  pointerEvents: "none",
                }}
              />
            </button>

            {/* Hex Text Input */}
            <input
              type="text"
              value={customHex}
              onChange={(e) => {
                const val = e.target.value;
                setCustomHex(val);
                if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
                  applyColor(val);
                }
              }}
              placeholder="#CBFB45"
              style={{
                flex: 1,
                backgroundColor: "#262626",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "0.5rem",
                color: "#FFFFFF",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "0.55rem 0.75rem",
                outline: "none",
              }}
            />

            {/* Reset Button */}
            {!isDefault && (
              <button
                type="button"
                onClick={resetToDefault}
                title="Reset to default brand color"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  backgroundColor: "#262626",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "0.5rem",
                  color: "#E4E4E7",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  padding: "0.55rem 0.75rem",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#262626")}
              >
                <RotateCcw size={13} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Preset Palette (Table of Colors) */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#71717A",
              marginBottom: "0.5rem",
            }}
          >
            Presets
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.6rem",
            }}
          >
            {PRESET_COLORS.map((item) => {
              const isSelected = activeColor.toLowerCase() === item.hex.toLowerCase();
              return (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() => applyColor(item.hex)}
                  title={`${item.name} (${item.hex})`}
                  style={{
                    height: "40px",
                    borderRadius: "0.65rem",
                    backgroundColor: item.hex,
                    border: "1px solid rgba(0, 0, 0, 0.15)",
                    outline: isSelected ? "2px solid #FFFFFF" : "none",
                    outlineOffset: isSelected ? "2px" : "0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    transition: "transform 0.12s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {isSelected && (
                    <Check
                      size={16}
                      color={["#CBFB45", "#00F0FF", "#F59E0B"].includes(item.hex) ? "#171717" : "#FFFFFF"}
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notice */}
        <div
          style={{
            fontSize: "0.75rem",
            color: "#71717A",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          Reverts to Northforge Lime on reload.
        </div>

        {/* Done Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            width: "100%",
            height: "2.75rem",
            borderRadius: "100rem",
            backgroundColor: "#FFFFFF",
            color: "#171717",
            fontWeight: 600,
            fontSize: "0.875rem",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Done
        </button>
      </div>
    </div>
  );
}
