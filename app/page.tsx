import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AcademicArchive } from "@/components/academic-archive";
import { Dossier } from "@/components/dossier";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SelectedWorksConsole } from "@/components/selected-works-console";
import { VIDEO_CDN } from "@/lib/cdn";
import { getAllTransmissions } from "@/lib/transmissions";

const GITHUB_URL = "https://github.com/corticalstack";
const LINKEDIN_URL = "https://www.linkedin.com/in/jonpaulboyd/";

// Years since the first transmission (2017-09-14). Computed at build time.
const yearsOnline = Math.floor(
  (Date.now() - new Date("2017-09-14").getTime()) / 31_557_600_000,
);
const archivesCount = 9;

// Operations content sourced from tools-operations-source.md (1:1 with kling_1..kling_20).
// TODO(phase2): per-card poster images + real external links once they exist.
const projects = [
  {
    title: "Ontology Underwriting Agent",
    description:
      "Production OWL 2 ontology and LangGraph underwriting agent for a reinsurer. Five-stage extraction pipeline (rule-based JSON, GPT-4.1 HTML body, rdflib OWL, SHACL gate, GraphDB) collapses thousands of pages of impairment guidance into a 219-node knowledge graph queried over SPARQL through a FastAPI SSE chat UI.",
    tags: ["OWL 2", "LangGraph", "GraphDB", "SHACL", "GPT-4.1"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_1.mp4`,
  },
  {
    title: "Foundry Control Plane",
    description:
      "Microsoft AI Tour Zurich. Hosted the Foundry Control Plane booth, showing enterprises how to gain trust over a fleet of agents through one place for controls, observability, security, and governance.",
    tags: ["Azure AI Foundry", "Governance", "Agents", "Microsoft"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_2.mp4`,
  },
  {
    title: "Azure ML Field Workshop",
    description:
      "Hands-on Azure Machine Learning workshop for a global insurance customer covering the full ML lifecycle: data preparation, AutoML, model training, deployment, evaluation, and MLOps best practice.",
    tags: ["Azure ML", "AutoML", "MLOps", "Workshop"],
    image: "/project-placeholder-3.jpg",
    video: `${VIDEO_CDN}/kling_3.mp4`,
  },
  {
    title: "Pharma AI Upskill",
    description:
      "Comprehensive AI upskilling series for a global pharma customer. Sessions on GenAI fundamentals, RAG, prompt engineering, fine-tuning, SLMs, Document Intelligence, Content Understanding, Azure AI Search, and responsible AI.",
    tags: ["GenAI", "RAG", "Fine-Tuning", "Document Intelligence"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_4.mp4`,
  },
  {
    title: "Service Centre Copilot",
    description:
      "CEO-sponsored LangGraph orchestration powering a service centre Copilot. Lets 5,000+ engineers conversationally query 2M+ technical documents. Task parallelism and model optimization cut troubleshooting response time from 1 minute to ~20s.",
    tags: ["LangGraph", "Copilot", "Azure OpenAI", "Latency"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_5.mp4`,
  },
  {
    title: "Catalogue Matching Engine",
    description:
      "Proof of concept bringing competitor product mapping and price comparison in-house for a nationwide retailer. AI-enabled cleansing, enrichment, and classification orchestrated through Azure Machine Learning; comparable to specialist external vendors, fully automated.",
    tags: ["Azure ML", "NLP", "Classification", "Retail"],
    image: "/project-placeholder-3.jpg",
    video: `${VIDEO_CDN}/kling_6.mp4`,
  },
  {
    title: "Airline Avatar Assistant",
    description:
      "Conversational avatar assistant for a leading European airline. Demoed to Satya Nadella at the Microsoft AI Tour Berlin, October 2024. Function-calling into external systems for live organizational and customer data.",
    tags: ["GenAI", "Avatar", "Azure", "Function Calling"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_7.mp4`,
  },
  {
    title: "Feedback Funnelling NLP",
    description:
      "Intelligent feedback funneling service classifying customer signal into product-specific streams. Evaluated BERT embeddings, XGBoost, prompt engineering, and GPT causal + sequence classifiers to pick the right model per signal type.",
    tags: ["NLP", "BERT", "XGBoost", "GPT"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_8.mp4`,
  },
  {
    title: "Summarization Service",
    description:
      "Shared GPT-powered summarization service with pre-engineered prompt styles: extractive, abstractive, creative, formal, keyword-based, thematic, and time-series. Drop-in for diverse downstream workflows.",
    tags: ["GPT", "Summarization", "Prompt Engineering"],
    image: "/project-placeholder-3.jpg",
    video: `${VIDEO_CDN}/kling_9.mp4`,
  },
  {
    title: "Destination Recommender",
    description:
      "GPT-4 destination recommendation app, hosted as a containerized Azure App Service. Built-in dialogue and API call validation, token consumption tracking, and per-conversation cost calculation.",
    tags: ["GPT-4", "Azure App Service", "LLMOps"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_10.mp4`,
  },
  {
    title: "Constitutional Knowledge Base",
    description:
      "GPT-4 knowledge base of destination master data with LLM-as-judge oversight. A constitutional rubric continuously evaluates generated content for alignment with safety, accuracy, and bias values before it reaches a user.",
    tags: ["GPT-4", "LLM-as-Judge", "Constitutional AI", "Safety"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_11.mp4`,
  },
  {
    title: "Startup Accelerator",
    description:
      "Tailored AI and cloud expertise for participants in the Microsoft Startup Accelerator Program. Per-startup mentoring across architecture, scale, and AI adoption choices.",
    tags: ["Microsoft", "Mentoring", "Azure", "Startup"],
    image: "/project-placeholder-3.jpg",
    video: `${VIDEO_CDN}/kling_12.mp4`,
  },
  {
    title: "Startup Architecture Workshops",
    description:
      "Led multiple workshops guiding startups through product evolution on Microsoft Azure. Custom technical architecture blueprints with strategic design recommendations for innovation, scalability, and governance.",
    tags: ["Azure", "Architecture", "Workshop", "Startup"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_13.mp4`,
  },
  {
    title: "Managed AI Provisioning",
    description:
      "Concept and implementation for provisioning Azure managed AI services (Cognitive Services, Cognitive Search, Azure OpenAI) to multiple consumer teams. Covers deployment patterns, data privacy, secure access, usage tracking, compliance, and content moderation.",
    tags: ["Azure OpenAI", "Governance", "Multi-Tenant", "Compliance"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_14.mp4`,
  },
  {
    title: "Recommender FinOps Stack",
    description:
      "Cost-aware operational layer for the destination recommender. Telemetry hooks for dialogue validation, API call audit, token consumption, and per-conversation cost calculation, surfacing real LLM spend to product owners.",
    tags: ["FinOps", "Azure App Service", "Telemetry", "Cost"],
    image: "/project-placeholder-3.jpg",
    video: `${VIDEO_CDN}/kling_15.mp4`,
  },
  {
    title: "MLOps Reusable Stack",
    description:
      "MLOps concept lifting the quality, frequency, and efficiency of ML model changes to production. Implemented with Azure Machine Learning, Azure DevOps YAML CI/CD, and Azure ML Python and CLI SDK templates for reuse by data science teams. Delivered as workshops.",
    tags: ["MLOps", "Azure ML", "Azure DevOps", "CI/CD"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_16.mp4`,
  },
  {
    title: "Azure ML PaaS Rollout",
    description:
      "Outcome-based roadmap and Terraform IaC rollout of private, network-secured Azure Machine Learning PaaS for global data science teams. Least-privilege access into the data lake; reference notebooks across Python SDK v1 and v2 covering exploratory analysis through inference.",
    tags: ["Azure ML", "Terraform", "PaaS", "Least Privilege"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_17.mp4`,
  },
  {
    title: "Data Platform Observability",
    description:
      "SRE-guided operational monitoring of a European airline's central data platform. SLI/SLO definitions, Azure Log Analytics diagnostics provisioned via Terraform Azure Policy, Azure Monitor alerts, and KQL queries for root cause analysis.",
    tags: ["SRE", "Azure Monitor", "Terraform", "KQL"],
    image: "/project-placeholder-3.jpg",
    video: `${VIDEO_CDN}/kling_18.mp4`,
  },
  {
    title: "Neuroscience Knowledge Base",
    description:
      "Cleansed, digitized, and enriched 30K research articles into a knowledge base serving neuroscience analysts. Sub-second query response; over 10,000x faster than the legacy search it replaced.",
    tags: ["Knowledge Base", "Search", "Neuroscience", "Azure"],
    image: "/project-placeholder-1.jpg",
    video: `${VIDEO_CDN}/kling_19.mp4`,
  },
  {
    title: "Azure Foundations",
    description:
      "Hands-on best-practice build, cost, and compliance of Azure services: IaaS, code-free Logic Apps, Python durable Function Apps, containerized App Services, key vaults, event grid, storage. Application Insights telemetry, RBAC + MFA, managed identities, SAS-secured blob access, subscription cost management.",
    tags: ["Azure", "IaC", "Security", "Cost Management"],
    image: "/project-placeholder-2.jpg",
    video: `${VIDEO_CDN}/kling_20.mp4`,
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
      className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground"
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

          <p className="leading-relaxed text-muted-foreground md:text-xl">
            Cyberware storage unit for academic projects, AI experiments, and
            field notes from the edge of practical machine learning.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="#comms"
              className={cn(buttonVariants({ size: "lg" }), "font-mono")}
            >
              [ initiate contact ] <ArrowRight className="size-4" />
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
          <p className="max-w-sm text-left text-muted-foreground">
            Field-deployed systems and platforms at scale.
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
          <p className="max-w-sm text-left text-muted-foreground">
            Instruments of the trade. Applied machine learning, cloud
            platforms, and the data plumbing that makes them production-grade.
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
          <p className="max-w-sm text-left text-muted-foreground">
            Recent dispatches on applied AI, machine learning, and field operations.
          </p>
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
            <p className="max-w-sm text-left text-muted-foreground">
              Open a channel. For collaborations, AI engagements, or signal in the noise.
            </p>
          </div>

          <ContactForm />

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
