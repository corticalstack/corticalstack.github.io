import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "transmissions");

export interface TransmissionFrontmatter {
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  tags?: string[];
  classification?: string;
  readingTime?: string;
  source?: string;
}

export interface Transmission {
  slug: string;
  id: string; // e.g. 0x0004
  title: string;
  date: string; // ISO yyyy-mm-dd
  dateLabel: string; // e.g. 2025.03.12
  excerpt: string;
  tags: string[];
  classification: string;
  readingTime: string;
}

function computeReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} MIN`;
}

function readRaw(): Array<{
  slug: string;
  fm: TransmissionFrontmatter;
  content: string;
}> {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        fm: data as TransmissionFrontmatter,
        content,
      };
    });
}

/** All transmissions, newest first. Hex IDs are assigned chronologically
 *  (oldest = 0x0001) so the number is stable as the archive grows. */
export function getAllTransmissions(): Transmission[] {
  const oldestFirst = readRaw().sort((a, b) =>
    a.fm.date.localeCompare(b.fm.date),
  );

  return oldestFirst
    .map((item, index) => ({
      slug: item.slug,
      id: `0x${(index + 1).toString(16).toUpperCase().padStart(4, "0")}`,
      title: item.fm.title,
      date: item.fm.date,
      dateLabel: item.fm.date.replaceAll("-", "."),
      excerpt: item.fm.excerpt,
      tags: item.fm.tags ?? [],
      classification: (
        item.fm.classification ??
        item.fm.tags?.[0] ??
        "TRANSMISSION"
      ).toUpperCase(),
      readingTime: item.fm.readingTime ?? computeReadingTime(item.content),
    }))
    .reverse();
}

export function getTransmissionSlugs(): string[] {
  return readRaw().map((item) => item.slug);
}

/** Raw MDX body (frontmatter stripped) plus resolved metadata for one post. */
export function getTransmission(
  slug: string,
): { source: string; meta: Transmission } | null {
  const meta = getAllTransmissions().find((t) => t.slug === slug);
  if (!meta) return null;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  return { source: matter(raw).content, meta };
}
