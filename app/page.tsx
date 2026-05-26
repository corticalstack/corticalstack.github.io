import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AcademicArchive } from "@/components/academic-archive";
import { Dossier } from "@/components/dossier";
import { cn } from "@/lib/utils";
import { SelectedWorksConsole } from "@/components/selected-works-console";
import { SfxLink } from "@/components/sfx-link";
import { ScrambleOnHover } from "@/components/scramble-on-hover";
import { VIDEO_CDN } from "@/lib/cdn";
import operationsSource from "@/tools-operations-source.json";
import { getAllTransmissions } from "@/lib/transmissions";

const GITHUB_URL = "https://github.com/corticalstack";
const LINKEDIN_URL = "https://www.linkedin.com/in/jonpaulboyd/";

// Years since the first transmission (2017-09-14). Computed at build time.
const yearsOnline = Math.floor(
  (Date.now() - new Date("2017-09-14").getTime()) / 31_557_600_000,
);
const archivesCount = 9;

// Operations cards are sourced from `tools-operations-source.json`. Edit the
// JSON to add/remove/reorder/rename cards; the page picks it up at build time
// (and during `pnpm dev` via Turbopack hot reload). `caseFileLink` is surfaced
// through to the carousel but not yet rendered as a link.
const PROJECT_PLACEHOLDERS = [
  "/project-placeholder-1.jpg",
  "/project-placeholder-2.jpg",
  "/project-placeholder-3.jpg",
];
const projects = operationsSource.map((op, i) => ({
  title: op.title,
  description: op.description,
  tags: op.tags,
  image: PROJECT_PLACEHOLDERS[i % PROJECT_PLACEHOLDERS.length],
  video: `${VIDEO_CDN}/${op.klingFile}`,
  caseFileLink: op.caseFileLink,
}));

const skills = [
  {
    category: "AI / ML",
    items: ["Python", "LangGraph", "Agents", "RAG", "Fine-Tuning", "LLMs", "Foundry SDK", "MLOps", "GenAIOps", "Prompt Engineering", "Agentic Engineering", "Responsible AI", "LLM-As-A-Judge", "Multi-Modal"],
  },
  {
    category: "Cloud",
    items: ["Azure", "Bicep", "Terraform", "APIM", "Docker", "CI/CD", "Security"],
  },
  {
    category: "Data",
    items: ["Ontologies", "OWL 2", "Knowledge Graphs", "SPARQL", "Azure ML", "Vector Search", "SQL", "Pandas"],
  },
  {
    category: "Tooling",
    items: ["Claude Code", "Copilot CLI", "Bash", "Jupyter Notebooks", "VS Code", "Git", "GitHub Actions"],
  },
];

export default function Home() {
  const transmissions = getAllTransmissions();
  const transmissionsCount = transmissions.length;

  const telemetry = [
    { label: "// NEURAL LINK", value: "ENGAGED" },
    { label: "// UPTIME", value: `${yearsOnline}Y` },
    {
      label: "// TRANSMISSIONS",
      value: String(transmissionsCount).padStart(3, "0"),
    },
    { label: "// ARCHIVES", value: String(archivesCount).padStart(2, "0") },
  ];

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground"
    >
      <SiteHeader />

      {/* Hero Section */}
      <Container
        wrapperClassName="pt-32 pb-24"
        className="mx-auto max-w-7xl"
      >
        <div className="space-y-8">
          {/* Top status bar - one wide row of pills */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              // SYSTEM ONLINE
            </div>
            {telemetry.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-muted-foreground"
              >
                {t.label}: <span className="text-primary">{t.value}</span>
              </span>
            ))}
          </div>

          <h1 className="font-display text-6xl leading-[0.9] tracking-tighter md:text-8xl">
            CORTICAL
            <br />
            <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              STACK
            </span>
            <span className="animate-pulse text-primary">_</span>
          </h1>

          <p className="leading-relaxed text-foreground/85 md:text-xl">
            Cyberware storage unit for experiments and field notes, pushing
            boundaries at the intersection of human creativity, machine
            intelligence, and agentic systems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <SfxLink
              href="#comms"
              prime
              className={cn(buttonVariants({ size: "lg" }), "font-mono")}
            >
              <ScrambleOnHover text="[ initiate contact ]" />{" "}
              <ArrowRight className="size-4" />
            </SfxLink>
            <div className="flex gap-2">
              <SfxLink
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              >
                <GithubIcon className="h-5 w-5" />
              </SfxLink>
              <SfxLink
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              >
                <LinkedinIcon className="h-5 w-5" />
              </SfxLink>
              <SfxLink
                href="#comms"
                aria-label="Contact"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              >
                <Mail className="h-5 w-5" />
              </SfxLink>
            </div>
          </div>
        </div>
      </Container>

      {/* Selected Works */}
      <Container
        id="operations"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="mb-16 grid items-end justify-between gap-4">
          <div>
            <div className="mb-3 font-mono text-xs text-primary">// DEPLOYMENTS</div>
            <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
              OPERATIONS
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="max-w-sm text-left text-foreground/85">
            Field-deployed apps, systems and platforms at scale.
          </p>
        </div>

        <SelectedWorksConsole projects={projects} />
      </Container>

      <Dossier />

      {/* Tech Stack */}
      <Container
        id="tech"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="mb-16 grid items-end justify-between gap-4">
          <div>
            <div className="mb-3 font-mono text-xs text-primary">// LOADOUT</div>
            <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
              TECH
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="max-w-sm text-left text-foreground/85">
            Tools of the trade.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="inline-block border-b border-primary/30 pb-2 font-display text-xl">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((skill, sIdx) => (
                    <li
                      key={sIdx}
                      className="group flex items-center justify-between"
                    >
                      <span className="font-mono text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                        {skill}
                      </span>
                      <div className="h-[2px] w-12 bg-secondary transition-colors group-hover:bg-primary"></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>

      <AcademicArchive />

      {/* Transmissions */}
      <Container
        id="transmissions"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl"
      >
        <div className="mb-16 grid items-end justify-between gap-4">
          <div>
            <div className="mb-3 font-mono text-xs text-primary">// FIELD NOTES</div>
            <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
              TRANSMISSIONS
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="max-w-sm text-left text-foreground/85">
            Recent operational dispatches from the field on machine learning, GenAI, and software engineering.
          </p>
        </div>

        <div className="grid gap-8">
          {transmissions.slice(0, 4).map((post) => (
            <SfxLink
              href={`/transmissions/${post.slug}`}
              key={post.slug}
              className="group block"
            >
              <div className="mb-2 font-mono text-xs text-primary">
                {`> TRANSMISSION ${post.id} // ${post.dateLabel} // CLASSIFICATION: ${post.classification}`}
              </div>
              <div className="mb-2 grid items-baseline justify-between gap-4 md:grid-cols-[1fr_auto]">
                <h3 className="text-balance font-display text-2xl transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <span className="font-mono text-xs whitespace-nowrap text-muted-foreground">
                  {post.readingTime}
                </span>
              </div>
              <p className="mb-4 max-w-2xl leading-relaxed text-foreground/85">
                {post.excerpt}
              </p>
              <div className="h-px w-full bg-border transition-colors group-hover:bg-primary/50"></div>
            </SfxLink>
          ))}
        </div>

        <div className="mt-12 text-center">
          <SfxLink
            href="/transmissions"
            prime
            className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
          >
            <ScrambleOnHover text="[ view all transmissions -> ]" />
          </SfxLink>
        </div>
      </Container>

      {/* Initiate Contact */}
      <Container
        id="comms"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl"
      >
        <div>
          <div className="mb-16 grid items-end justify-between gap-4">
            <div>
              <div className="mb-3 font-mono text-xs text-primary">// COMMS</div>
              <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
                CONTACT
              </h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div>
            <p className="max-w-sm text-left text-foreground/85">
              Open a channel. For collaborations, AI engagements, or signal in the noise.
            </p>
          </div>

          <ContactForm />

          <div className="mt-10 flex items-center justify-center gap-6 font-mono text-xs text-muted-foreground">
            <SfxLink
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" /> GITHUB
            </SfxLink>
            <SfxLink
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <LinkedinIcon className="size-4" /> LINKEDIN
            </SfxLink>
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  );
}
