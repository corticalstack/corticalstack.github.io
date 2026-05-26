import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllTransmissions } from "@/lib/transmissions";
import { getAllArchives } from "@/lib/archives";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const transmissions = getAllTransmissions();
  const archives = getAllArchives();
  const latestTransmission = transmissions[0]?.date
    ? new Date(transmissions[0].date)
    : new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: latestTransmission,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/transmissions/`,
      lastModified: latestTransmission,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...transmissions.map((t) => ({
      url: `${SITE_URL}/transmissions/${t.slug}/`,
      lastModified: new Date(t.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...archives.map((a) => ({
      url: `${SITE_URL}/archives/${a.slug}/`,
      lastModified: new Date(`${a.year}-01-01`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
