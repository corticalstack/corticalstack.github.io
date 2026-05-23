"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  video?: string;
}

interface SelectedWorksConsoleProps {
  projects: Project[];
}

const ROTATION_INTERVAL_MS = 10_000;

/**
 * Console-style single-card carousel for Selected Works.
 *
 * - Full-width 16:9 video, autoplay + loop, always muted - audio is the
 *   section bed (lives in layout via AudioBedProvider, persists across routes).
 * - One project visible at a time.
 * - Prev/next buttons + dot indicators + ArrowLeft/ArrowRight keys.
 * - Auto-rotates through cards every ROTATION_INTERVAL_MS, pauses while the
 *   user hovers the carousel, and can be toggled off via the AUTO pill.
 *   Manual nav (PREV/NEXT/dots/arrows) does not toggle rotation - the user
 *   is just skipping; rotation resumes from the new position when hover ends.
 */
export function SelectedWorksConsole({ projects }: SelectedWorksConsoleProps) {
  const [index, setIndex] = useState(0);
  const [rotating, setRotating] = useState(true);
  const [hovered, setHovered] = useState(false);

  const total = projects.length;

  useEffect(() => {
    if (total <= 1) return;
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((i) => (i - 1 + total) % total);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((i) => (i + 1) % total);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  useEffect(() => {
    if (!rotating || hovered || total <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(id);
  }, [rotating, hovered, total]);

  if (total === 0) return null;

  const project = projects[index];
  const position = `${(index + 1).toString().padStart(2, "0")} / ${total
    .toString()
    .padStart(2, "0")}`;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Status bar */}
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3 font-mono text-xs">
        <span className="text-primary">{`// OPERATION ${position}`}</span>
        {total > 1 ? (
          <button
            type="button"
            onClick={() => setRotating((r) => !r)}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label={rotating ? "Pause auto-rotation" : "Resume auto-rotation"}
            aria-pressed={rotating}
          >
            {rotating ? (
              <Pause className="size-3.5 text-primary" />
            ) : (
              <Play className="size-3.5" />
            )}
            <span>{rotating ? "// AUTO_ON" : "// AUTO_OFF"}</span>
          </button>
        ) : null}
      </div>

      {/* Video frame with HUD corner brackets */}
      <div className="relative aspect-video overflow-hidden border border-primary/40 bg-card">
        <div className="pointer-events-none absolute top-0 left-0 z-10 size-4 border-t-2 border-l-2 border-primary"></div>
        <div className="pointer-events-none absolute top-0 right-0 z-10 size-4 border-t-2 border-r-2 border-primary"></div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 size-4 border-b-2 border-l-2 border-primary"></div>
        <div className="pointer-events-none absolute right-0 bottom-0 z-10 size-4 border-r-2 border-b-2 border-primary"></div>

        {project.video ? (
          <video
            key={project.video}
            src={project.video}
            poster={project.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate noremoteplayback"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            aria-label={project.title}
            role="img"
          />
        )}
      </div>

      {/* Project metadata below the video */}
      <div className="grid items-start gap-x-8 gap-y-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="max-w-2xl text-muted-foreground">{project.description}</p>
        </div>
        <div className="self-start font-mono text-xs text-muted-foreground">
          // CASE FILE // LINKS PENDING
        </div>
      </div>

      {/* Nav controls */}
      <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={prev}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Previous project"
        >
          <ChevronLeft className="size-4" />
          PREV
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Project navigation">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 w-2 transition-colors",
                i === index
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
              aria-label={`Show project ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Next project"
        >
          NEXT
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
