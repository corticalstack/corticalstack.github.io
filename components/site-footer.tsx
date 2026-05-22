import Link from "next/link";
import { Container } from "@/components/zippystarter/container";

const GITHUB_URL = "https://github.com/corticalstack";
const LINKEDIN_URL = "https://www.linkedin.com/in/jonpaulboyd/";
const REPO_URL = "https://github.com/corticalstack/corticalstack.github.io";

export function SiteFooter() {
  return (
    <Container
      component="footer"
      className="mx-auto max-w-7xl border-t border-border bg-background py-8 text-center"
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-xs text-muted-foreground">
          © 2026 JON-PAUL BOYD // build_v0.1.0
        </div>
        <div className="flex gap-6 font-mono text-xs text-muted-foreground">
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            GITHUB
          </Link>
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            LINKEDIN
          </Link>
          <Link
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            REPO
          </Link>
        </div>
        <div className="font-mono text-xs text-primary/70">
          // end of transmission_
        </div>
      </div>
    </Container>
  );
}
