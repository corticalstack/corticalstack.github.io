import { Container } from "@/components/layout/container";
import { ReplayBoot } from "@/components/replay-boot";
import { AudioToggleFooter } from "@/components/audio-toggle-footer";

export function SiteFooter() {
  return (
    <Container
      component="footer"
      className="mx-auto max-w-7xl border-t border-border/60 py-8 text-center"
    >
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="font-mono text-xs text-muted-foreground">
          © 2026 JON-PAUL BOYD // build_v0.1.0
        </div>
        <div className="flex items-center gap-4 font-mono text-xs">
          <AudioToggleFooter />
          <ReplayBoot />
          <span className="text-primary/70">// end of transmission_</span>
        </div>
      </div>
    </Container>
  );
}
