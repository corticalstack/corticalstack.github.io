"use client";

import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { ScrambleText } from "@/components/scramble-text";

interface CaseFileCardProps {
  code: string;
  slug: string;
  title: string;
  description: string;
  grade: string;
}

type StartViewTransition = (cb: () => void) => unknown;

export function CaseFileCard({
  code,
  slug,
  title,
  description,
  grade,
}: CaseFileCardProps) {
  const router = useRouter();
  const [trigger, setTrigger] = useState(0);
  const href = `/archives/${slug}/`;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, etc.) behave normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    const startVT = (
      document as Document & { startViewTransition?: StartViewTransition }
    ).startViewTransition;
    if (typeof startVT !== "function") return;
    e.preventDefault();
    startVT.call(document, () => {
      router.push(href);
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setTrigger((t) => t + 1)}
      className="group relative block border border-border bg-card/40 p-5 transition-colors hover:border-primary/70 hover:bg-card/70"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <span
          className="font-mono text-3xl font-bold tracking-tight text-primary"
          style={{ viewTransitionName: `archive-code-${slug}` }}
        >
          {code}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          GRADE {grade}
        </span>
      </div>
      <div className="mb-3 h-px w-10 bg-primary/40"></div>
      <h3 className="font-display text-lg leading-tight">{title}</h3>
      <ScrambleText
        text={description}
        trigger={trigger}
        className="mt-2 block text-sm text-muted-foreground"
      />
      <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>// CASE FILE</span>
        <span className="text-primary transition-transform group-hover:translate-x-1">
          ↗
        </span>
      </div>
    </a>
  );
}
