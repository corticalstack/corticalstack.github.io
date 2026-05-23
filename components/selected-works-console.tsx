"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
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

/**
 * Console-style single-card carousel for Selected Works.
 *
 * - Full-width 16:9 video, autoplay + loop, no native controls.
 * - One project visible at a time; mute toggle pinned to the video frame
 *   so audio only ever comes from the displayed card.
 * - Prev/next buttons + dot indicators + ArrowLeft/ArrowRight keys.
 * - Starts muted (required by browser autoplay policy); after the user has
 *   interacted (any button click), unmuted state survives navigation.
 *
 * TODO(phase3): replace placeholder URLs with cdn.corticalstack.ai Bunny URLs.
 */
export function SelectedWorksConsole({ projects }: SelectedWorksConsoleProps) {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

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

  if (total === 0) return null;

  const project = projects[index];
  const position = `${(index + 1).toString().padStart(2, "0")} / ${total
    .toString()
    .padStart(2, "0")}`;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3 font-mono text-xs">
        <span className="text-primary">{`// OPERATION ${position}`}</span>
        <span className="hidden truncate text-muted-foreground md:block">
          {project.title.toUpperCase()}
        </span>
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
            muted={muted}
            loop
            playsInline
            preload="metadata"
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

        {project.video ? (
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="absolute right-4 bottom-4 z-20 inline-flex items-center gap-2 border border-border bg-background/80 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
            aria-label={muted ? "Unmute audio" : "Mute audio"}
            aria-pressed={!muted}
          >
            {muted ? (
              <VolumeX className="size-3.5" />
            ) : (
              <Volume2 className="size-3.5 text-primary" />
            )}
            <span>{muted ? "MUTED" : "AUDIO ON"}</span>
          </button>
        ) : null}
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
