"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAudioBed } from "@/components/audio-bed-provider";
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
 * - Always-muted 16:9 video (audio is the section bed in AudioBedProvider).
 * - Two persistent <video> slots alternate: one is visible+playing, the other
 *   is hidden with `src` already pointed at the next clip and preloaded. On
 *   advance we just flip visibility - the new active slot starts instantly
 *   because the browser already has the bytes and a decoded first frame.
 *   No remount, no poster-flicker between cards.
 * - Rotation is event-driven via the active slot's `ended` event and toggled
 *   only by the explicit AUTO_ON/AUTO_OFF pill beneath the dots. No
 *   hover-to-pause - the cursor sitting on the carousel does not stop it.
 *   When AUTO is off the current clip restarts in place; when on, the next
 *   `ended` advances. Manual nav (PREV/NEXT/dots/arrow keys) flips the slots
 *   too but the destination clip won't always be pre-loaded (PREV especially),
 *   so manual nav can occasionally show a brief load.
 */
export function SelectedWorksConsole({ projects }: SelectedWorksConsoleProps) {
  const [index, setIndex] = useState(0);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [rotating, setRotating] = useState(true);
  const slotRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const {
    available: audioAvailable,
    audioOn,
    toggle: toggleAudio,
  } = useAudioBed();

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
        setActiveSlot((s) => (s === 0 ? 1 : 0));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((i) => (i + 1) % total);
        setActiveSlot((s) => (s === 0 ? 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  // Whenever the active slot changes, play the newly-active video from frame 0
  // and pause the other (it stays hidden, holding its preloaded src ready).
  useEffect(() => {
    slotRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      if (i === activeSlot) {
        el.currentTime = 0;
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
    // slotRefs identity is stable across renders; activeSlot drives the swap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlot, index]);

  if (total === 0) return null;

  /**
   * Map a slot to the project it should hold. The active slot shows the
   * current `index`; the inactive slot holds the next clip in the forward
   * direction so it's preloaded for the most common transition path.
   */
  const projectForSlot = (slot: 0 | 1) =>
    projects[slot === activeSlot ? index : (index + 1) % total];

  const advance = () => {
    setIndex((i) => (i + 1) % total);
    setActiveSlot((s) => (s === 0 ? 1 : 0));
  };

  const goPrev = () => {
    setIndex((i) => (i - 1 + total) % total);
    setActiveSlot((s) => (s === 0 ? 1 : 0));
  };

  const goNext = advance;

  const jumpTo = (target: number) => {
    if (target === index) return;
    setIndex(target);
    setActiveSlot((s) => (s === 0 ? 1 : 0));
  };

  const handleVideoEnded = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    if (rotating && total > 1) {
      advance();
      return;
    }
    // Rotation paused (or single-card carousel): restart the clip in place.
    const el = event.currentTarget;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const project = projects[index];
  const position = `${(index + 1).toString().padStart(2, "0")} / ${total
    .toString()
    .padStart(2, "0")}`;


  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3 font-mono text-xs">
        <span className="text-primary">{`// OPERATION ${position}`}</span>
        {audioAvailable ? (
          <button
            type="button"
            onClick={toggleAudio}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            aria-label={audioOn ? "Pause audio bed" : "Play audio bed"}
            aria-pressed={audioOn}
          >
            {audioOn ? (
              <Volume2 className="size-3.5 text-primary" />
            ) : (
              <VolumeX className="size-3.5" />
            )}
            <span>{audioOn ? "// AUDIO_ON" : "// AUDIO_OFF"}</span>
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
          ([0, 1] as const).map((slot) => {
            const p = projectForSlot(slot);
            const isActive = slot === activeSlot;
            return (
              <video
                key={slot}
                ref={slotRefs[slot]}
                src={p.video}
                poster={p.image}
                autoPlay={isActive}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate noremoteplayback"
                onEnded={isActive ? handleVideoEnded : undefined}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
            );
          })
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
            aria-label={project.title}
            role="img"
          />
        )}
      </div>

      {/* Project metadata below the video. Title + CASE FILE chip share a
          row; tags and description each get the full card width. */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {project.title}
          </h3>
          <div className="shrink-0 self-start font-mono text-xs whitespace-nowrap text-muted-foreground">
            // CASE FILE // LINKS PENDING
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground">{project.description}</p>
      </div>

      {/* Nav controls. items-start so PREV / AUTO / NEXT top-align even when
          the middle column carries the dots row beneath the AUTO button. */}
      <div className="flex items-start justify-between gap-4 border-t border-border pt-4">
        <button
          type="button"
          onClick={goPrev}
          className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label="Previous project"
        >
          <ChevronLeft className="size-4" />
          PREV
        </button>

        <div className="flex flex-col items-center gap-3">
          {total > 1 ? (
            <button
              type="button"
              onClick={() => setRotating((r) => !r)}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label={
                rotating ? "Pause auto-rotation" : "Resume auto-rotation"
              }
              aria-pressed={rotating}
            >
              {rotating ? (
                <Pause className="size-4 text-primary" />
              ) : (
                <Play className="size-4" />
              )}
              <span>{rotating ? "// AUTO_ON" : "// AUTO_OFF"}</span>
            </button>
          ) : null}
          <div className="flex gap-2" role="tablist" aria-label="Project navigation">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
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
        </div>

        <button
          type="button"
          onClick={goNext}
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
