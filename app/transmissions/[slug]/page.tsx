import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SfxLink } from "@/components/sfx-link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { MdxLink } from "@/components/mdx-link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getTransmission, getTransmissionSlugs } from "@/lib/transmissions";

export const dynamicParams = false;

export function generateStaticParams() {
  return getTransmissionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getTransmission(slug);
  if (!data) return {};
  return {
    title: `${data.meta.title} // Cortical Stack`,
    description: data.meta.excerpt,
  };
}

export default async function TransmissionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getTransmission(slug);
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
          href="/transmissions"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          ← return to transmissions
        </SfxLink>

        <header className="mt-8 mb-10 border-b border-border pb-8">
          <div className="font-mono text-xs text-primary">
            {`> TRANSMISSION ${meta.id} // ${meta.dateLabel} // CLASSIFICATION: ${meta.classification}`}
          </div>
          <h1 className="mt-4 text-balance font-display text-4xl leading-tight tracking-tighter md:text-5xl">
            {meta.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              {meta.readingTime}
            </span>
            <span className="text-muted-foreground/40">/</span>
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-mono text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </header>

        <div className="transmission-body">
          <MDXRemote
            source={source}
            components={{ a: MdxLink }}
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
            href="/transmissions"
            className="font-mono text-sm text-primary transition-opacity hover:opacity-80"
          >
            ← return to transmissions
          </SfxLink>
        </div>
      </Container>
      <SiteFooter />
    </div>
  );
}
