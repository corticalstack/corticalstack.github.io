#!/usr/bin/env node
/**
 * One-shot migration: Jekyll _posts/*.md  ->  content/transmissions/*.mdx
 *
 * Idempotent: skips slugs that already exist in content/transmissions/.
 * Run with: pnpm node tools/migrate-posts.mjs
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const POSTS_DIR = path.join(ROOT, "_posts");
const OUT_DIR = path.join(ROOT, "content", "transmissions");
const LEGACY_IMG_DIR = path.join(ROOT, "assets", "img");
const PUBLIC_IMG_DIR = path.join(ROOT, "public", "assets", "img");

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

// Use the first tag uppercased (matches the 4 existing migrated posts), or TRANSMISSION if no tags.
const classify = (tags) => {
  if (tags && tags.length) return String(tags[0]).trim().toUpperCase();
  return "TRANSMISSION";
};

const parseFilename = (fname) => {
  const m = fname.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  if (!m) return null;
  return { date: m[1], slug: m[2].toLowerCase() };
};

const sanitizeBody = (raw) => {
  let body = raw;
  let source = null;

  // Promote <!-- Original LinkedIn post: URL --> to source frontmatter, strip the comment.
  const linkedinRe = /<!--\s*Original LinkedIn post:\s*(\S+)\s*-->\s*/i;
  const lm = body.match(linkedinRe);
  if (lm) {
    source = lm[1];
    body = body.replace(linkedinRe, "");
  }

  // Strip any remaining HTML comments (none expected, but be safe).
  body = body.replace(/<!--[\s\S]*?-->/g, "");

  // Replace the one known <iframe>-wrapped YouTube embed with a plain link.
  body = body.replace(
    /<div class="embed-responsive[^"]*">\s*<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>\s*<\/div>/g,
    (_m, src) => {
      // Extract video id and emit a markdown link.
      const idMatch = src.match(/embed\/([\w-]+)/);
      const watchUrl = idMatch
        ? `https://www.youtube.com/watch?v=${idMatch[1]}`
        : src;
      return `[Watch on YouTube](${watchUrl})`;
    },
  );

  // Fix case-mismatch for the one legacy image with a .PNG extension on disk as .png.
  body = body.replace(/\/assets\/img\/Azure_GenAI_unleashed\.PNG/g, "/assets/img/Azure_GenAI_unleashed.png");

  // Self-close void HTML elements so MDX (JSX-strict) accepts them.
  body = body.replace(/<(br|hr|img)([^/>]*)>/gi, "<$1$2 />");

  // Normalize relative image paths to absolute and percent-encode spaces inside ![](...).
  body = body.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, src) => {
    let s = src.trim();
    s = s.replace(/^\.\.\/assets\/img\//, "/assets/img/");
    // Percent-encode spaces in the path component (only inside /assets/img/).
    if (s.startsWith("/assets/img/")) {
      s = "/assets/img/" + s.slice("/assets/img/".length).replace(/ /g, "%20");
    }
    return `![${alt}](${s})`;
  });

  return { body: body.trimStart(), source };
};

const deriveExcerpt = (subtitle, body) => {
  if (subtitle && subtitle.trim()) {
    return collapseWhitespace(subtitle).slice(0, 240);
  }
  // First non-empty, non-heading, non-image, non-code line.
  const lines = body.split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#")) continue;
    if (line.startsWith("!")) continue;
    if (line.startsWith("```")) continue;
    if (line.startsWith("<")) continue;
    if (line.startsWith("[")) continue;
    // Strip markdown emphasis/links lightly.
    const plain = line
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "");
    return collapseWhitespace(plain).slice(0, 240);
  }
  return "";
};

const collapseWhitespace = (s) => s.replace(/\s+/g, " ").trim();

const yamlEscape = (s) =>
  String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const renderFrontmatter = ({ title, date, excerpt, tags, classification, source }) => {
  const lines = ["---"];
  lines.push(`title: "${yamlEscape(title)}"`);
  lines.push(`date: "${date}"`);
  lines.push(`excerpt: "${yamlEscape(excerpt)}"`);
  if (tags && tags.length) {
    const tagList = tags.map((t) => String(t).trim()).filter(Boolean);
    lines.push(`tags: [${tagList.join(", ")}]`);
  }
  lines.push(`classification: "${classification}"`);
  if (source) lines.push(`source: "${source}"`);
  lines.push("---");
  return lines.join("\n");
};

// Copy referenced images into public/assets/img with case-fix.
const copyReferencedImages = (allPostsRaw) => {
  const refs = new Set();
  for (const text of allPostsRaw) {
    // Match inside ![alt](src) — filenames may include spaces in the source files.
    const mdImgRe = /!\[[^\]]*\]\((?:\.\.)?\/assets\/img\/([^)]+)\)/g;
    for (const m of text.matchAll(mdImgRe)) refs.add(m[1].trim());
    // Also pick up bare /assets/img/<name.ext> refs (no spaces).
    const bareRe = /(?<!\()\/assets\/img\/([A-Za-z0-9_.-]+\.[A-Za-z0-9]+)/g;
    for (const m of text.matchAll(bareRe)) refs.add(m[1]);
  }
  let copied = 0;
  let missing = [];
  for (const name of refs) {
    const wantedName = name.replace(/\.PNG$/i, ".png");
    const src = path.join(LEGACY_IMG_DIR, name);
    const dst = path.join(PUBLIC_IMG_DIR, wantedName);
    if (fs.existsSync(dst)) continue;
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dst);
      copied += 1;
    } else {
      // Try a case-insensitive scan as a last resort.
      const dirEntries = fs.readdirSync(LEGACY_IMG_DIR);
      const ci = dirEntries.find((f) => f.toLowerCase() === name.toLowerCase());
      if (ci) {
        fs.copyFileSync(path.join(LEGACY_IMG_DIR, ci), dst);
        copied += 1;
      } else {
        missing.push(name);
      }
    }
  }
  return { copied, missing };
};

// MAIN.
const existingSlugs = new Set(
  fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, "")),
);

const allPostFiles = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => !f.includes(" copy")) // drop the orphan duplicate
  .sort();

const allPostBodies = allPostFiles.map((f) =>
  fs.readFileSync(path.join(POSTS_DIR, f), "utf8"),
);

const imgResult = copyReferencedImages(allPostBodies);
console.log(`[images] copied ${imgResult.copied}, missing ${imgResult.missing.length}`);
if (imgResult.missing.length) {
  console.log("[images] missing:", imgResult.missing.join(", "));
}

let written = 0;
let skipped = 0;
const report = [];

for (const fname of allPostFiles) {
  const meta = parseFilename(fname);
  if (!meta) {
    console.warn(`[skip] unparseable filename: ${fname}`);
    continue;
  }
  if (existingSlugs.has(meta.slug)) {
    skipped += 1;
    continue;
  }
  const raw = fs.readFileSync(path.join(POSTS_DIR, fname), "utf8");
  const parsed = matter(raw);
  const fm = parsed.data || {};
  const { body, source } = sanitizeBody(parsed.content);

  const title = String(fm.title || meta.slug).trim();
  const subtitle = fm.subtitle ? String(fm.subtitle).trim() : "";
  const tags = Array.isArray(fm.tags) ? fm.tags : [];
  const excerpt = deriveExcerpt(subtitle, body);
  const classification = classify(tags);

  const out = renderFrontmatter({
    title,
    date: meta.date,
    excerpt,
    tags,
    classification,
    source,
  });

  const final = `${out}\n\n${body.trim()}\n`;
  fs.writeFileSync(path.join(OUT_DIR, `${meta.slug}.mdx`), final);
  written += 1;
  report.push({ slug: meta.slug, classification, source: !!source });
}

console.log(`[migrate] wrote ${written}, skipped ${skipped} (already migrated)`);
console.log(`[migrate] by classification:`);
const byClass = report.reduce((acc, r) => {
  acc[r.classification] = (acc[r.classification] || 0) + 1;
  return acc;
}, {});
for (const [k, v] of Object.entries(byClass).sort()) {
  console.log(`  ${k}: ${v}`);
}
