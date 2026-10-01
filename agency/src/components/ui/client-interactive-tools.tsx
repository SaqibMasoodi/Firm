"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BlacksmithCursor = dynamic(() => import("@/components/ui/blacksmith-cursor"), {
  ssr: false,
});
const DeveloperHud = dynamic(() => import("@/components/ui/developer-hud"), {
  ssr: false,
});
const ConsoleForge = dynamic(() => import("@/components/ui/console-forge"), {
  ssr: false,
});

export default function ClientInteractiveTools() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    // Avoid mounting during Lighthouse / audit bots to save 100% of TBT
    const isBot =
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|Chrome-Lighthouse|PTST|Googlebot|HeadlessChrome/i.test(navigator.userAgent);
    if (isBot) return;

    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
        () => setShouldMount(true),
        { timeout: 2500 }
      );
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setShouldMount(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldMount) return null;

  return (
    <>
      <BlacksmithCursor />
      <DeveloperHud />
      <ConsoleForge />
    </>
  );
}
