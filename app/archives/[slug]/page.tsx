import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SfxLink } from "@/components/sfx-link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getArchive, getArchiveSlugs } from "@/lib/archives";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArchiveSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getArchive(slug);
  if (!data) return {};
  return {
    title: `${data.meta.code} ${data.meta.title} // Cortical Stack`,
    description: data.meta.description,
  };
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getArchive(slug);
  if (!data) notFound();
  const { source, meta } = data;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Container
        component="main"
        wrapperClassName="pt-28 pb-20"
        className="mx-auto max-w-3xl"
      >
        <SfxLink
          href="/#archives"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          ← return to archives
        </SfxLink>

        <header className="mt-8 mb-10 border-b border-border pb-8">
          <div className="font-mono text-xs text-primary">
            {`> ARCHIVE // CLASSIFICATION: ${meta.classification} // ${meta.year} // GRADE ${meta.grade}`}
          </div>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-mono text-6xl font-bold tracking-tight text-primary md:text-7xl">
              {meta.code}
            </span>
            <h1 className="text-balance font-display text-3xl leading-tight tracking-tighter md:text-4xl">
              {meta.title}
            </h1>
          </div>
          <p className="mt-5 max-w-xl text-muted-foreground">
            {meta.description}
          </p>
        </header>

        <div className="transmission-body">
          <MDXRemote
            source={source}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    { theme: "github-dark-default", keepBackground: true },
                  ],
                ],
              },
            }}
          />
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <SfxLink
            href="/#archives"
            className="font-mono text-sm text-primary transition-opacity hover:opacity-80"
          >
            ← return to archives
          </SfxLink>
        </div>
      </Container>
      <SiteFooter />
    </div>
  );
}
