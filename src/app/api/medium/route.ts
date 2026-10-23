import { NextResponse } from "next/server";
import mediumStories from "@/lib/medium-stories.json";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TAG_MAP: Record<string, string> = {
  "shopify-liquid": "Shopify Liquid",
  "shopify": "Shopify",
  "ecommerce": "Ecommerce",
  "javascript": "JavaScript",
  "typescript": "TypeScript",
  "web-development": "Web Development",
  "programming": "Programming",
  "developer": "Software Engineering",
  "generative-ai-tools": "AI Tools",
  "machine-learning": "Machine Learning",
  "ai": "AI & Tech",
  "github": "GitHub",
  "github-actions": "GitHub Actions",
  "git": "Git & Workflow",
  "clean-code": "Clean Code",
  "nextjs": "Next.js",
  "react": "React",
};

function priorityScore(raw: string): number {
  const norm = raw.toLowerCase().trim();
  if (norm === "shopify-liquid") return 100;
  if (norm === "shopify") return 90;
  if (norm === "ecommerce") return 85;
  if (norm.includes("shopify")) return 80;
  if (norm.includes("liquid")) return 75;
  if (norm === "nextjs" || norm === "next-js" || norm === "react" || norm === "reactjs") return 68;
  if (norm === "javascript" || norm === "js" || norm === "typescript") return 62;
  if (norm === "clean-code") return 58;
  if (norm === "git" || norm === "github") return 55;
  if (norm === "ai" || norm.includes("ai") || norm.includes("intelligence")) return 50;
  return 10;
}

function formatTag(raw: string): string {
  const norm = raw.toLowerCase().trim();
  if (TAG_MAP[norm]) return TAG_MAP[norm];
  return norm
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function processCategories(rawCats: string[]): string[] {
  if (!rawCats || rawCats.length === 0) return ["Shopify", "Ecommerce"];

  const sorted = [...rawCats].sort((a, b) => priorityScore(b) - priorityScore(a));
  const result: string[] = [];

  for (const raw of sorted) {
    const formatted = formatTag(raw);
    if (formatted === "Shopify" && result.includes("Shopify Liquid")) continue;
    if (formatted === "Shopify Liquid" && result.includes("Shopify")) {
      const idx = result.indexOf("Shopify");
      result[idx] = "Shopify Liquid";
      continue;
    }
    if (!result.includes(formatted)) {
      result.push(formatted);
    }
    if (result.length >= 2) break;
  }

  return result.length > 0 ? result : ["Technology"];
}

export async function GET() {
  try {
    const res = await fetch("https://medium.com/feed/@lokesh-prajapati", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(mediumStories, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      });
    }

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    const stories = items.slice(0, 6).map((it) => {
      const title = (
        it.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
        it.match(/<title>(.*?)<\/title>/)
      )?.[1]?.trim() || "";

      const rawLink = it.match(/<link>(.*?)<\/link>/)?.[1] || "";
      const link = rawLink.split("?")[0];

      const pubDateStr = it.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
      let pubDate = "";
      if (pubDateStr) {
        const d = new Date(pubDateStr);
        pubDate = `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })} ${d.getFullYear()}`;
      }

      const rawCategories = Array.from(
        it.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)
      ).map((m) => m[1]);

      const categories = processCategories(rawCategories);

      const content =
        it.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] || "";
      const snippet =
        content
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 160) + "...";

      return {
        title,
        link,
        pubDate,
        categories: categories.length > 0 ? categories : ["Technology"],
        snippet,
      };
    });

    return NextResponse.json(stories.length > 0 ? stories : mediumStories, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(mediumStories, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  }
}
