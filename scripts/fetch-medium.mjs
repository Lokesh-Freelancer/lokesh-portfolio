import { writeFileSync } from "fs";
import { resolve } from "path";

const FEED_URL = "https://medium.com/feed/@lokesh-prajapati";
const OUTPUT_FILE = resolve(process.cwd(), "src/lib/medium-stories.json");

const TAG_MAP = {
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

function priorityScore(raw) {
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

function formatTag(raw) {
  const norm = raw.toLowerCase().trim();
  if (TAG_MAP[norm]) return TAG_MAP[norm];
  return norm
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function processCategories(rawCats) {
  if (!rawCats || rawCats.length === 0) return ["Shopify", "Ecommerce"];

  const sorted = [...rawCats].sort((a, b) => priorityScore(b) - priorityScore(a));
  const result = [];

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

async function fetchMediumStories() {
  console.log("Fetching live RSS feed from Medium:", FEED_URL);
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      throw new Error(`Medium returned status ${res.status}`);
    }

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    console.log(`Found ${items.length} stories in feed.`);

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

    writeFileSync(OUTPUT_FILE, JSON.stringify(stories, null, 2), "utf-8");
    console.log(`Successfully saved ${stories.length} stories to src/lib/medium-stories.json`);
  } catch (err) {
    console.error("Failed to fetch Medium feed:", err.message);
  }
}

fetchMediumStories();
