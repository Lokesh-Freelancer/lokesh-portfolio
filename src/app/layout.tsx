import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { email, linkedin, medium } from "@/lib/content";

const siteUrl = "https://dev-lokeshprajapat.vercel.app";

export const viewport: Viewport = {
  themeColor: "#101622",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lokesh Prajapat | Senior Shopify Web Developer",
    template: "%s | Lokesh Prajapat",
  },
  description:
    "Senior Shopify Web Developer with 5+ years of experience and 50+ stores delivered globally. Specializing in custom Liquid themes, store migrations, performance optimization, and bespoke ecommerce storefronts.",
  keywords: [
    "Shopify Developer",
    "Senior Shopify Developer",
    "Shopify Liquid Developer",
    "Shopify Theme Customization",
    "Shopify Freelancer India",
    "Shopify Expert Indore",
    "Ecommerce Web Developer",
    "Shopify Migration Specialist",
    "Shopify Speed Optimization",
    "Custom Liquid Themes",
    "WordPress to Shopify Migration",
    "DTC Ecommerce Developer",
    "Lokesh Prajapat",
  ],
  authors: [{ name: "Lokesh Prajapat", url: siteUrl }],
  creator: "Lokesh Prajapat",
  publisher: "Lokesh Prajapat",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Lokesh Prajapat Portfolio",
    title: "Lokesh Prajapat — Thoughtful code. Better commerce.",
    description:
      "Senior Shopify Web Developer · 5+ years experience · 50+ stores delivered. Custom Liquid themes, seamless migrations, and high-performance ecommerce.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokesh Prajapat — Senior Shopify Web Developer",
    description:
      "5+ years experience · 50+ Shopify stores delivered · Custom Liquid themes & performance optimization.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Lokesh Prajapat",
        url: siteUrl,
        jobTitle: "Senior Shopify Web Developer",
        image: `${siteUrl}/opengraph-image`,
        sameAs: [linkedin, medium],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        email: `mailto:${email}`,
        telephone: "+918120805721",
        description:
          "Senior Shopify Web Developer with 5+ years of experience delivering 50+ ecommerce storefronts. Expert in Shopify Liquid, theme development, and speed optimization.",
        knowsAbout: [
          "Shopify",
          "Shopify Theme Development",
          "Shopify Liquid",
          "Ecommerce Optimization",
          "Next.js",
          "WordPress to Shopify Migration",
          "Frontend Web Development",
          "Responsive Design",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Lokesh Prajapat | Senior Shopify Web Developer",
        description:
          "Portfolio of Lokesh Prajapat, Senior Shopify Web Developer building high-converting stores and custom Liquid themes.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

