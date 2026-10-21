import { NextResponse } from "next/server";
import mediumStories from "@/lib/medium-stories.json";

export const revalidate = 1800; // Cache on Vercel CDN for 30 minutes

export async function GET() {
  try {
    const res = await fetch("https://medium.com/feed/@lokesh-prajapati", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json(mediumStories, {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
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
      const pubDate = pubDateStr
        ? new Date(pubDateStr).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "";

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

    return NextResponse.json(stories.length > 0 ? stories : mediumStories, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(mediumStories, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  }
}
