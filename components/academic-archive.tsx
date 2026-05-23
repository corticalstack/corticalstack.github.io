import Link from "next/link";
import { Container } from "@/components/zippystarter/container";

interface CaseFile {
  code: string;
  slug: string;
  title: string;
  description: string;
  grade: string;
}

// Detail pages currently live on the (still-live) Jekyll site at
// corticalstack.ai/<slug>/. TODO(post-cutover): migrate those pages into
// the rebuild, or refresh these links.
const cases: CaseFile[] = [
  {
    code: "MT",
    slug: "mt",
    title: "Masters Thesis",
    description:
      "COVID-LEAP: Azure-hosted knowledge base with BERT semantic search across 4.7M coronavirus research paragraphs and 500K clinical trials.",
    grade: "90%",
  },
  {
    code: "ACI",
    slug: "aci",
    title: "Applied Computational Intelligence",
    description:
      "Predicting customer churn, appetency, and up-selling for KDD Cup 2009. Gradient boosting placed 34/89.",
    grade: "88%",
  },
  {
    code: "CIO",
    slug: "cio",
    title: "Computational Intelligence Optimisation",
    description:
      "HOP: Python hyper/meta-heuristic platform (SA, GA, PSO, DEA, ES) on the flow-shop scheduling problem and continuous benchmarks.",
    grade: "100%",
  },
  {
    code: "ANN",
    slug: "ann",
    title: "Artificial Neural Networks",
    description:
      "Neural-network intrusion detection on the DARPA/MIT Lincoln dataset, plus NDVI-based crop prediction with ANNs.",
    grade: "80%",
  },
  {
    code: "AIP",
    slug: "aip",
    title: "Artificial Intelligence Programming",
    description:
      "Natural-language movie-database querying with NLTK + WordNet generating SQL, plus a Prolog/NLP state-of-the-art review.",
    grade: "81%",
  },
  {
    code: "DM",
    slug: "dm",
    title: "Data Mining",
    description:
      "Cardiovascular-mortality risk classifiers on the Framingham Heart Study (SAS Enterprise Miner): decision trees, neural networks, gradient boosting.",
    grade: "94%",
  },
  {
    code: "FL",
    slug: "fl",
    title: "Fuzzy Logic",
    description:
      "Python fuzzy inference system for breast-cancer tumour classification on the Wisconsin dataset. Beat neural nets, decision trees, and random forests.",
    grade: "98%",
  },
  {
    code: "MR",
    slug: "mr",
    title: "Mobile Robots",
    description:
      "V-REP simulated robot with ultrasonic sensors learning to wall-follow. PI/PID controller plugin cut navigation error by up to 55.8%.",
    grade: "92%",
  },
  {
    code: "RM",
    slug: "rm",
    title: "Research Methods",
    description:
      "Critical evaluation of an immersive-VR analytics paper, and a PhD proposal for augmented analytic knowledge discovery.",
    grade: "96%",
  },
];

export function AcademicArchive() {
  return (
    <Container
      id="archives"
      component="section"
      wrapperClassName="py-24 border-t border-border"
      className="mx-auto max-w-7xl flex-1"
    >
      <div className="mb-16 grid items-end justify-between gap-4">
        <div>
          <div className="mb-3 font-mono text-xs text-primary">// ARCHIVE</div>
          <h2 className="mb-4 font-display text-4xl tracking-tighter md:text-6xl">
            ACADEMIC
            <br />
            ARCHIVES
          </h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>
        <p className="max-w-sm text-left text-muted-foreground">
          Nine declassified case files from the Master of Intelligent Systems
          program. De Montfort University, 2019-2021. Graduated with
          distinction.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <Link
            key={c.code}
            href={`https://corticalstack.ai/${c.slug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block border border-border bg-card/40 p-5 transition-colors hover:border-primary/70 hover:bg-card/70"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <span className="font-mono text-3xl font-bold tracking-tight text-primary">
                {c.code}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                GRADE {c.grade}
              </span>
            </div>
            <div className="mb-3 h-px w-10 bg-primary/40"></div>
            <h3 className="font-display text-lg leading-tight">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {c.description}
            </p>
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>// CASE FILE</span>
              <span className="text-primary transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
