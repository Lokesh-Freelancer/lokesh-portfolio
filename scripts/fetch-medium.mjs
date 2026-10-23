import { writeFileSync } from "fs";
import { resolve } from "path";

const FEED_URL = "https://medium.com/feed/@lokesh-prajapati";
const OUTPUT_FILE = resolve(process.cwd(), "src/lib/medium-stories.json");

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

      const categories = Array.from(
        it.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)
      )
        .map((m) => m[1])
        .slice(0, 2);

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
