import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Northforge Labs — Technology & Creative Agency",
    short_name: "Northforge Labs",
    description:
      "A technology and creative agency that helps businesses build digital products, grow their online presence, and automate their operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#cbfb45",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
