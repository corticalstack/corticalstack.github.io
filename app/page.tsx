import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Brain,
  Cloud,
  Database,
  Terminal,
} from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectImage } from "@/components/project-image";
import { getAllTransmissions } from "@/lib/transmissions";

const GITHUB_URL = "https://github.com/corticalstack";
const LINKEDIN_URL = "https://www.linkedin.com/in/jonpaulboyd/";

// Years since the first transmission (2017-09-14). Computed at build time.
const yearsOnline = Math.floor(
  (Date.now() - new Date("2017-09-14").getTime()) / 31_557_600_000,
);
const archivesCount = 9;

// TODO(phase2): replace with JP's canonical project list + real links.
const projects = [
  {
    title: "GenAI Destination Recommender",
    description:
      "GPT-4 powered destination recommendation system with constitutional oversight for content alignment, built for the Lufthansa group.",
    tags: ["GPT-4", "Azure", "RAG", "LLMOps"],
    image: "/project-placeholder-1.jpg",
  },
  {
    title: "Airline Avatar Assistant",
    description:
      "Conversational avatar assistant for a leading European airline. Demoed to Satya Nadella at the Microsoft AI Tour, Berlin.",
    tags: ["GenAI", "Azure", "Avatar"],
    image: "/project-placeholder-2.jpg",
  },
  {
    title: "Feedback Funnelling NLP",
    description:
      "NLP service that classifies and routes high-volume customer feedback into actionable streams.",
    tags: ["NLP", "Classification", "Azure"],
    image: "/project-placeholder-3.jpg",
  },
  {
    title: "COVID-LEAP",
    description:
      "Cloud-hosted knowledge base with BERT semantic search across 4.7M coronavirus research paragraphs. Master's thesis, graded distinction.",
    tags: ["BERT", "Azure", "Info Retrieval", "NLP"],
    image: "/project-placeholder-1.jpg",
  },
];

// TODO(phase2): confirm canonical stack with JP.
const skills = [
  {
    category: "AI / ML",
    items: ["Python", "PyTorch", "LangChain", "RAG", "LLMs", "AutoGen"],
  },
  {
    category: "Cloud",
    items: ["Azure", "AWS", "Kubernetes", "Terraform", "Docker"],
  },
  { category: "Data", items: ["SQL", "Spark", "dbt", "Pipelines"] },
  { category: "Tooling", items: ["GitHub", "VS Code", "Cline", "Claude Code"] },
];

const stackPillars = [
  { icon: Brain, label: "AI_ML" },
  { icon: Cloud, label: "CLOUD" },
  { icon: Database, label: "DATA" },
  { icon: Terminal, label: "TOOLING" },
];

export default function Home() {
  const transmissions = getAllTransmissions();
  const transmissionsCount = transmissions.length;

  const telemetry = [
    { label: "SYS.STATUS", value: "NORMAL" },
    { label: "UPTIME", value: `${yearsOnline}Y` },
    {
      label: "TRANSMISSIONS",
      value: String(transmissionsCount).padStart(3, "0"),
    },
    { label: "ARCHIVES", value: String(archivesCount).padStart(2, "0") },
  ];

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
    >
      <SiteHeader />

      {/* Hero Section */}
      <Container
        wrapperClassName="relative min-h-screen flex items-center pt-16 overflow-hidden"
        className="mx-auto max-w-7xl flex-1"
      >
        {/* Ambient background. Phase 3 swaps in a low-opacity hero video here;
            static gradient + image is the fallback. */}
        <div className="absolute inset-0 z-0">
          <div className="relative h-screen w-screen overflow-hidden bg-background">
            <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-primary before:mix-blend-color-dodge dark:before:mix-blend-color" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                // SYSTEM ONLINE
              </div>
              <div className="inline-flex items-center rounded-full border border-border bg-card/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                // STATUS: ENGAGED
              </div>
            </div>

            <h1 className="font-display text-6xl leading-[0.9] tracking-tighter md:text-8xl">
              CORTICAL
              <br />
              <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                STACK
              </span>
              <span className="animate-pulse text-primary">_</span>
            </h1>

            <p className="max-w-md leading-relaxed text-muted-foreground md:text-xl">
              Cyberware storage unit for academic projects, AI experiments, and
              field notes from the edge of practical machine learning.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#transmissions"
                className={cn(buttonVariants({ size: "lg" }), "font-mono")}
              >
                [ view transmissions ] <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#comms"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "font-mono",
                )}
              >
                [ initiate contact ]
              </Link>
              <div className="flex gap-2">
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="#comms"
                  aria-label="Contact"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Telemetry chips */}
            <div className="flex flex-wrap gap-2 pt-2 font-mono text-[10px] sm:text-xs">
              {telemetry.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 border border-border bg-card/40 px-2 py-1 text-muted-foreground"
                >
                  {t.label}: <span className="text-primary">{t.value}</span>
                </span>
              ))}
            </div>
          </div>

          {/* HUD telemetry panel */}
          <div className="relative hidden h-[500px] w-full border border-border/30 bg-card/10 p-8 backdrop-blur-sm md:block">
            <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute right-0 bottom-0 size-4 border-r-2 border-b-2 border-primary"></div>

            <div className="flex h-full w-full flex-col justify-between font-mono text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>SYS.STATUS: NORMAL</span>
                <span>UPTIME: {yearsOnline}Y</span>
              </div>
              <div className="space-y-2">
                <div className="h-1 w-full overflow-hidden bg-secondary">
                  <div className="h-full w-[92%] bg-primary"></div>
                </div>
                <div className="flex justify-between">
                  <span>SIGNAL</span>
                  <span>92%</span>
                </div>
                <div className="h-1 w-full overflow-hidden bg-secondary">
                  <div className="h-full w-full bg-primary"></div>
                </div>
                <div className="flex justify-between">
                  <span>NEURAL_LINK</span>
                  <span>STABLE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-right">
                <div>
                  <span className="block text-4xl font-bold text-foreground">
                    {String(transmissionsCount).padStart(3, "0")}
                  </span>
                  <span>TRANSMISSIONS</span>
                </div>
                <div>
                  <span className="block text-4xl font-bold text-foreground">
                    {String(archivesCount).padStart(2, "0")}
                  </span>
                  <span>ARCHIVES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Selected Works */}
      <Container
        id="works"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="mb-16 grid items-end justify-between gap-4">
          <div>
            <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
              SELECTED
              <br />
              WORKS
            </h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <p className="max-w-sm text-left text-muted-foreground">
            Selected operations from the field: applied GenAI, ML platforms, and
            information retrieval at enterprise scale.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] grid-rows-[repeat(3,auto)] gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group grid grid-rows-subgrid row-span-3 content-start items-start overflow-hidden rounded-none border-border bg-card pt-0 transition-all duration-300 hover:border-primary/50"
            >
              <ProjectImage src={project.image} alt={project.title} />
              <div className="grid gap-4">
                <CardHeader className="grid gap-4">
                  <CardTitle className="font-display text-2xl transition-colors group-hover:text-primary">
                    {project.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </div>
              <CardFooter className="pt-0">
                <span className="font-mono text-xs text-muted-foreground">
                  // CASE FILE // LINKS PENDING
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>

      {/* Tech Stack */}
      <Container
        id="stack"
        component="section"
        wrapperClassName="py-24 bg-secondary/20 border-t border-border"
        className="mx-auto max-w-7xl flex-1"
      >
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="mb-6 font-display text-4xl tracking-tighter">
              TECH_STACK
            </h2>
            <p className="mb-8 text-muted-foreground">
              Instruments of the trade. Applied machine learning, cloud
              platforms, and the data plumbing that makes them production-grade.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stackPillars.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex aspect-square flex-col items-center justify-center border border-border bg-background p-4 transition-colors hover:border-primary"
                >
                  <Icon className="mb-2 h-8 w-8 text-primary" />
                  <span className="font-mono text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-8 lg:grid-cols-4">
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
                      <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                        {skill}
                      </span>
                      <div className="h-[2px] w-12 bg-secondary transition-colors group-hover:bg-primary"></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Transmissions */}
      <Container
        id="transmissions"
        component="section"
        wrapperClassName="py-24 border-t border-border"
        className="mx-auto max-w-7xl"
      >
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl uppercase">Transmissions</h2>
          <span className="font-mono text-xs text-muted-foreground">
            {`// ${String(transmissionsCount).padStart(3, "0")} ARCHIVED`}
          </span>
        </div>

        <div className="grid gap-8">
          {transmissions.slice(0, 4).map((post) => (
            <Link
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
              <p className="mb-4 max-w-2xl text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="h-px w-full bg-border transition-colors group-hover:bg-primary/50"></div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/transmissions"
            className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
          >
            [ view all transmissions -&gt; ]
          </Link>
        </div>
      </Container>

      {/* Initiate Contact */}
      <Container
        id="comms"
        component="section"
        wrapperClassName="py-24 bg-card border-t border-border"
        className="mx-auto max-w-7xl"
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-4xl">INITIATE_CONTACT</h2>
            <p className="text-muted-foreground">
              Open a channel. For collaborations, AI engagements, or signal in
              the noise.
            </p>
          </div>

          {/* TODO(phase2): wire to Formspree (action + method="POST"). Inert for now. */}
          <form className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs text-muted-foreground"
                >
                  NAME
                </label>
                <Input id="name" name="name" placeholder="operative name" />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs text-muted-foreground"
                >
                  EMAIL
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@domain.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="font-mono text-xs text-muted-foreground"
              >
                MESSAGE
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Compose transmission..."
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full font-mono" size="lg">
              SEND TRANSMISSION
            </Button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-6 font-mono text-xs text-muted-foreground">
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Github className="size-4" /> GITHUB
            </Link>
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Linkedin className="size-4" /> LINKEDIN
            </Link>
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  );
}
