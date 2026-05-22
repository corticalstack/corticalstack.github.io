import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#transmissions", label: "transmissions" },
  { href: "/#works", label: "works" },
  { href: "/#stack", label: "stack" },
  { href: "/#comms", label: "comms" },
];

export function SiteHeader() {
  return (
    <Container
      component="header"
      wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      className="mx-auto flex h-16 max-w-7xl items-center justify-between"
    >
      <Link href="/" className="font-mono text-xl font-bold tracking-tighter">
        corticalstack<span className="text-primary">_</span>
      </Link>
      <nav className="hidden gap-8 font-mono text-sm text-muted-foreground md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "border-primary/50 font-mono text-xs hover:border-primary hover:bg-primary/10 hover:text-primary",
        )}
      >
        cv.pdf
      </Link>
    </Container>
  );
}
