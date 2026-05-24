import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SfxLink } from "@/components/sfx-link";
import { getAllTransmissions } from "@/lib/transmissions";

export const metadata: Metadata = {
  title: "Transmissions // Cortical Stack",
  description:
    "Field notes, AI experiments, and dispatches from the edge of practical machine learning.",
};

export default function TransmissionsArchive() {
  const transmissions = getAllTransmissions();

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Container
        component="main"
        wrapperClassName="pt-28 pb-20"
        className="mx-auto max-w-7xl"
      >
        <div className="mb-12">
          <div className="mb-3 font-mono text-xs text-primary">// ARCHIVE</div>
          <h1 className="font-display text-5xl tracking-tighter md:text-7xl">
            TRANSMISSIONS
          </h1>
          <p className="mt-4 max-w-xl text-foreground/85">
            Full transmission log of dispatches and field notes.
          </p>
        </div>

        <div className="grid gap-8">
          {transmissions.map((post) => (
            <SfxLink
              href={`/transmissions/${post.slug}`}
              key={post.slug}
              className="group block border-b border-border pb-8 last:border-b-0"
            >
              <div className="mb-2 font-mono text-xs text-primary">
                {`> TRANSMISSION ${post.id} // ${post.dateLabel} // CLASSIFICATION: ${post.classification}`}
              </div>
              <div className="mb-2 grid items-baseline justify-between gap-4 md:grid-cols-[1fr_auto]">
                <h2 className="text-balance font-display text-2xl transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                  {post.readingTime}
                </span>
              </div>
              <p className="max-w-2xl leading-relaxed text-foreground/85">{post.excerpt}</p>
            </SfxLink>
          ))}
        </div>
      </Container>
      <SiteFooter />
    </div>
  );
}
