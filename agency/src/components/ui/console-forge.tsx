"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

export default function ConsoleForge() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Trigger sparks on page for forge.strike()
    const triggerPageSparks = () => {
      const sparkContainer = document.createElement("div");
      sparkContainer.style.position = "fixed";
      sparkContainer.style.inset = "0";
      sparkContainer.style.pointerEvents = "none";
      sparkContainer.style.zIndex = "99999999";
      sparkContainer.style.overflow = "hidden";
      document.body.appendChild(sparkContainer);

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const colors = ["var(--green, #CBFB45)", "#FFFFFF", "var(--green, #CBFB45)", "#FFFFFF"];

      for (let i = 0; i < 18; i++) {
        const spark = document.createElement("span");
        const color = colors[i % colors.length];
        const size = Math.random() * 3 + 2.5;

        spark.style.position = "absolute";
        spark.style.left = `${centerX}px`;
        spark.style.top = `${centerY}px`;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.borderRadius = "50%";
        spark.style.backgroundColor = color;
        spark.style.boxShadow = `0 0 8px ${color}`;
        spark.style.pointerEvents = "none";

        sparkContainer.appendChild(spark);

        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.4;
        const dist = Math.random() * 120 + 80;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;

        gsap.to(spark, {
          x: dx,
          y: dy + 30, // subtle gravity
          opacity: 0,
          scale: 0.1,
          duration: Math.random() * 0.3 + 0.45,
          ease: "power2.out",
        });
      }

      setTimeout(() => {
        sparkContainer.remove();
      }, 900);
    };

    // Attach forge API to window
    (window as any).forge = {
      strike: () => {
        triggerPageSparks();
        console.log(
          "%c[OK] Impact velocity: 120fps. System tempered.",
          "color: #CBFB45; font-weight: bold; font-family: monospace; font-size: 13px;"
        );
        return "⚡ Strike executed.";
      },
      status: () => {
        console.table({
          "System": "Northforge Core v4.2.0",
          "Forge Temp": "1,450°C",
          "Animation Engine": "GSAP Core 3.15.0",
          "Accent Color": document.documentElement.style.getPropertyValue("--green") || "#CBFB45",
          "Subterranean Link": window.location.origin + "/agartha",
          "Foundry Terminal": window.location.origin + "/the-foundry",
        });
        return "⚒ System operational.";
      },
      hud: () => {
        if (typeof (window as any).__toggleDevHud === "function") {
          (window as any).__toggleDevHud();
          return "HUD toggled.";
        }
        return "HUD ready.";
      },
      agartha: () => {
        window.location.href = "/agartha";
        return "Entering Agartha...";
      }
    };

    // Print DevTools Banner
    const greenStyle = "color: #CBFB45; font-weight: 900; font-size: 12px; font-family: monospace;";
    const titleStyle = "color: #FFFFFF; font-weight: 800; font-size: 14px; font-family: monospace;";
    const subStyle = "color: #A1A1AA; font-style: italic; font-size: 12px; font-family: monospace;";
    const hintStyle = "color: #CBFB45; font-weight: 600; font-size: 11px; font-family: monospace;";
    const secretStyle = "color: #71717A; font-size: 10px; font-family: monospace;";

    const ascii = `
  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  ████████████████████
  ████  ████████  ████
  ▀▀▀▀  ████████  ▀▀▀▀
        ████████
    ▄▄▄▄████████▄▄▄▄
    ████████████████`;

    console.log(`%c${ascii}`, greenStyle);
    console.log("%c⚒ NORTHFORGE LABS // FORGED IN SILICON & STEEL", titleStyle);
    console.log('%c"Looking for craftsmen who appreciate the details."', subStyle);
    console.log("%cType `forge.status()` or `forge.strike()` below.", hintStyle);
    console.log("%cSubterranean records: /agartha", secretStyle);
  }, []);

  return null;
}
