import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Northforge Labs - Technology & Creative Agency",
    short_name: "Northforge Labs",
    description:
      "A technology and creative agency that helps businesses build digital products, grow their online presence, and automate their operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0e",
    theme_color: "#cbfb45",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
