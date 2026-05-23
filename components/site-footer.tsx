import { Container } from "@/components/zippystarter/container";

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
        <div className="font-mono text-xs text-primary/70">
          // end of transmission_
        </div>
      </div>
    </Container>
  );
}
