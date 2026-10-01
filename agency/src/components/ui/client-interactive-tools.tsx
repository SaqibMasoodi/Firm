"use client";

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
  return (
    <>
      <BlacksmithCursor />
      <DeveloperHud />
      <ConsoleForge />
    </>
  );
}
