import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
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
              src="/assets/img/jp_profile.jpg"
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
              NAME / ALIAS
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

          {/* TODO(JP): tighten / replace bio paragraphs to taste. */}
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Experienced Azure AI engineer and solution architect, currently
              with Microsoft Switzerland. Joined in early 2025 after leading
              Lufthansa&apos;s One Data Platform squad and driving GenAI engineering
              across the Lufthansa Group.
            </p>
            <p>
              Notable operations include a GPT-4 destination recommender with
              constitutional oversight, an avatar assistant for a major European
              airline (demoed to Satya Nadella at the Microsoft AI Tour Berlin),
              and feedback-funnelling NLP at customer scale. Earlier roles: SAP
              HANA technical architect at Nestle, and AC Immune&apos;s first
              cloud-hosted machine learning platform.
            </p>
            <p>
              Master of Intelligent Systems with distinction from De Montfort
              University, 2021. 90% average across modules and thesis. Off-grid:
              two kids, kiteboarding, a book a week.
            </p>
          </div>

          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
          >
            [ download full dossier → cv.pdf ]
          </Link>
        </div>
      </div>
    </Container>
  );
}
