"use client";

import dynamic from "next/dynamic";
import type { CrowdCanvasProps } from "@/components/v1/skiper39";

export const CrowdCanvas = dynamic<CrowdCanvasProps>(
  () => import("@/components/v1/skiper39").then((mod) => mod.CrowdCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#171717",
          borderRadius: "inherit",
        }}
      />
    ),
  }
);

export const Skiper39 = CrowdCanvas;
export type { CrowdCanvasProps };
export default CrowdCanvas;
