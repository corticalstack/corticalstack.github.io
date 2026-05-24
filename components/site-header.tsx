"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { SfxLink } from "@/components/sfx-link";
import { playSfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

const onHoverSfx = () => playSfx("hover");

const navLinks = [
  { href: "/#operations", label: "operations" },
  { href: "/#dossier", label: "dossier" },
  { href: "/#tech", label: "tech" },
  { href: "/#archives", label: "archives" },
  { href: "/#transmissions", label: "transmissions" },
  { href: "/#comms", label: "contact" },
];

export function SiteHeader() {
  return (
    <Container
      component="header"
      wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
      className="mx-auto flex h-16 max-w-7xl items-center justify-between"
    >
      <Link
        href="/"
        className="font-mono text-xl font-bold tracking-tighter"
        onMouseEnter={onHoverSfx}
      >
        corticalstack<span className="text-primary">_</span>
      </Link>
      <nav className="hidden gap-8 font-mono text-sm text-muted-foreground md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-primary"
            onMouseEnter={onHoverSfx}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <SfxLink
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        prime
        className={cn(
          buttonVariants({ variant: "outline" }),
          "border-primary/50 font-mono text-xs hover:border-primary hover:bg-primary/10 hover:text-primary",
        )}
      >
        cv.pdf
      </SfxLink>
    </Container>
  );
}
