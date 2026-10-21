import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lokesh Prajapat | Senior Shopify Web Developer",
    short_name: "Lokesh Prajapat",
    description:
      "Senior Shopify Web Developer specializing in custom themes, Liquid development, store migrations, and high-performance commerce experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#101622",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
