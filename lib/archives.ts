import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "archives");

export interface ArchiveFrontmatter {
  title: string;
  code: string;
  slug: string;
  year: number;
  grade: string;
  classification: string;
  description: string;
  order: number;
}

export type Archive = ArchiveFrontmatter;

function readRaw(): Array<{
  slug: string;
  fm: ArchiveFrontmatter;
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
        fm: data as ArchiveFrontmatter,
        content,
      };
    });
}

/** All archives, ordered by the `order` frontmatter field (MT=1 ... RM=9). */
export function getAllArchives(): Archive[] {
  return readRaw()
    .map((item) => ({ ...item.fm, slug: item.slug }))
    .sort((a, b) => a.order - b.order);
}

export function getArchiveSlugs(): string[] {
  return readRaw().map((item) => item.slug);
}

export function getArchive(
  slug: string,
): { source: string; meta: Archive } | null {
  const meta = getAllArchives().find((a) => a.slug === slug);
  if (!meta) return null;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  return { source: matter(raw).content, meta };
}
