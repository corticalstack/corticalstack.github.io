"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScrambleText } from "@/components/scramble-text";

interface CaseFileCardProps {
  code: string;
  slug: string;
  title: string;
  description: string;
  grade: string;
}

type StartViewTransition = (cb: () => void) => unknown;

const TYPE_INTERVAL_MS = 18;
const POST_TYPE_PAUSE_MS = 220;

export function CaseFileCard({
  code,
  slug,
  title,
  description,
  grade,
}: CaseFileCardProps) {
  const router = useRouter();
  const [hoverTrigger, setHoverTrigger] = useState(0);
  const [accessing, setAccessing] = useState(false);
  const [typedText, setTypedText] = useState("");
  const href = `/archives/${slug}/`;

  useEffect(() => {
    if (!accessing) return;
    const text = `> ACCESSING CASE FILE [${code}] // CLEARANCE GRANTED`;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTypedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          const startVT = (
            document as Document & {
              startViewTransition?: StartViewTransition;
            }
          ).startViewTransition;
          if (typeof startVT === "function") {
            startVT.call(document, () => router.push(href));
          } else {
            router.push(href);
          }
        }, POST_TYPE_PAUSE_MS);
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [accessing, code, href, router]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      accessing
    ) {
      return;
    }
    e.preventDefault();
    setAccessing(true);
  };

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={() => setHoverTrigger((t) => t + 1)}
        aria-disabled={accessing || undefined}
        className="group relative block border border-border bg-card/40 p-5 transition-colors hover:border-primary/70 hover:bg-card/70"
      >
        <div className="mb-3 flex items-baseline justify-between">
          <span
            className="font-mono text-3xl font-bold tracking-tight text-primary"
            // Only the clicked card claims the view-transition name. Otherwise
            // every code span (MT/ACI/CIO/...) becomes its own named pseudo
            // above the overlay during the transition - they briefly flash
            // visible while the dossier fades in. Naming just the active card
            // keeps the other eight under the root pseudo (covered by the
            // overlay).
            style={{
              viewTransitionName: accessing
                ? `archive-code-${slug}`
                : undefined,
            }}
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
          trigger={hoverTrigger}
          className="mt-2 block text-sm text-muted-foreground"
        />
        <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>// CASE FILE</span>
          <span className="text-primary transition-transform group-hover:translate-x-1">
            ↗
          </span>
        </div>
      </a>

      <AnimatePresence>
        {accessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background px-6"
            aria-hidden="true"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96, 220, 246, 0.5) 2px, rgba(96, 220, 246, 0.5) 3px)",
                animation: "cs-scanline-drift 8s linear infinite",
              }}
            />
            <div className="pointer-events-none absolute top-6 left-6 size-6 border-t-2 border-l-2 border-primary"></div>
            <div className="pointer-events-none absolute top-6 right-6 size-6 border-t-2 border-r-2 border-primary"></div>
            <div className="pointer-events-none absolute bottom-6 left-6 size-6 border-b-2 border-l-2 border-primary"></div>
            <div className="pointer-events-none absolute right-6 bottom-6 size-6 border-b-2 border-r-2 border-primary"></div>

            <div className="text-center font-mono text-sm break-words text-primary md:text-lg">
              {typedText}
              <span className="animate-pulse text-primary">_</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
