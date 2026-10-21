import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-lokeshprajapat.vercel.app"),
  title: "Lokesh Prajapat | Senior Shopify Web Developer",
  description: "Custom Shopify themes, Liquid development, store migrations and performance optimization. Explore the work of Lokesh Prajapat, a Senior Shopify Web Developer in Indore, India.",
  openGraph: {
    title: "Lokesh Prajapat — Thoughtful code. Better commerce.",
    description: "Senior Shopify Web Developer. 4+ years of experience. 50+ Shopify stores delivered.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
