import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SfxLink } from "@/components/sfx-link";
import { cn } from "@/lib/utils";

export function Dossier() {
  return (
    <Container
      id="dossier"
      component="section"
      wrapperClassName="py-24 border-t border-border"
      className="mx-auto max-w-7xl"
    >
      <div className="mb-12">
        <div className="mb-3 font-mono text-xs text-primary">
          // CLASSIFIED PERSONNEL FILE
        </div>
        <h2 className="font-display text-4xl tracking-tighter md:text-6xl">
          DOSSIER
        </h2>
        <div className="mt-4 h-1 w-24 bg-primary"></div>
      </div>

      <div className="grid items-start gap-12 md:grid-cols-[auto_1fr]">
        {/* Avatar (HUD-framed). TODO(JP): optional cyberpunk grayscale/cyan tint. */}
        <div>
          <div className="relative aspect-square w-48 overflow-hidden border border-primary/40 bg-card md:w-56">
            <div className="absolute top-0 left-0 z-10 size-3 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 z-10 size-3 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 z-10 size-3 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute right-0 bottom-0 z-10 size-3 border-r-2 border-b-2 border-primary"></div>
            <Image
              src="/assets/img/jp_avatar.jpg"
              alt="Jon-Paul Boyd"
              fill
              sizes="(min-width: 768px) 224px, 192px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 font-mono text-xs text-muted-foreground">
            OPERATIVE.0001
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          <div>
            <div className="mb-1 font-mono text-xs text-muted-foreground">
              NAME / CALLSIGN
            </div>
            <div className="font-display text-3xl tracking-tight">
              JON-PAUL BOYD{" "}
              <span className="font-mono text-base text-primary/70">// JP</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="font-mono text-xs text-muted-foreground">
                CURRENT POSITION
              </div>
              <div className="font-mono text-sm">
                AI Engineer · Microsoft Switzerland
              </div>
            </div>
            <div>
              <div className="font-mono text-xs text-muted-foreground">
                LOCATION
              </div>
              <div className="font-mono text-sm">Switzerland</div>
            </div>
          </div>

          <div className="space-y-4 leading-relaxed text-foreground/85">
            <p>
              Field-deployed AI Engineer for over 6 years. Previous tours
              included Lufthansa Group, leading the One Data Platform AI squad
              and driving ML, MLOps, and GenAI engineering across the Group.
            </p>
            <p>
              Earlier postings: SAP HANA technical architect at Nestlé, then
              engineered AC Immune&apos;s first cloud-hosted Azure ML platform.
              Foundations laid in data engineering, ML, and applied research
              before the GenAI wave.
            </p>
            <p>
              Master of Intelligent Systems with distinction from De Montfort
              University, 2021. 90% average across modules and thesis. Off-grid:
              two beautiful daughters, kiteboarding, a book a week.
            </p>
          </div>

          <SfxLink
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            prime
            className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
          >
            [ download full dossier → cv.pdf ]
          </SfxLink>
        </div>
      </div>
    </Container>
  );
}
