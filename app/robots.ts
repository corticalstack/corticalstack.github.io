import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Bots that crawl content for AI model training. Each line below is a UA that
// claims to honor robots.txt; bad actors that don't honor it aren't fixable
// here. Live-retrieval bots (ChatGPT-User, OAI-SearchBot, Applebot, etc.) are
// intentionally NOT blocked so the site stays cite-able in real-time answers.
const AI_TRAINING_BOTS = [
  "AI2Bot",
  "Ai2Bot-Dolma",
  "anthropic-ai",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "Claude-Web",
  "cohere-ai",
  "DataForSeoBot",
  "Diffbot",
  "DuckAssistBot",
  "FacebookBot",
  "FriendlyCrawler",
  "Google-Extended",
  "GPTBot",
  "ICC-Crawler",
  "ImagesiftBot",
  "img2dataset",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "omgili",
  "omgilibot",
  "PerplexityBot",
  "PetalBot",
  "Scrapy",
  "Sidetrade indexer bot",
  "Timpibot",
  "VelenPublicWebCrawler",
  "Webzio-Extended",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_TRAINING_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
