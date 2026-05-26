"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { playSfx } from "@/lib/sfx";
import { useAudioBed } from "@/components/audio-bed-provider";

/**
 * First-visit boot sequence. Skipped on return via localStorage.
 * Append `?boot=1` to the URL to force-show for development testing.
 *
 * Adapted from corticalstack/osiris (the splash overlay inside its
 * src/app/page.tsx): concentric rotating rings around a crosshair core +
 * radar sweep, letter-stagger title, typewriter subtitle - all themed for
 * Cortical Stack (cyan palette, cyber HUD copy).
 *
 * The system-output section is keseysignal.2advanced.com style: each line
 * types out and stays on screen with a block cursor following the active
 * line; after the final line a `[ access the network ]` button appears and
 * the user must click it to dismiss the boot (no auto-dismiss).
 */
const STORAGE_KEY = "cs:boot-seen";

// Per-letter fade-in delay for the boot title + subtitle. Deterministic
// pseudo-random keyed off (group, index) so the server-rendered and
// client-rendered delays match (no hydration mismatch). 1.5s pre-roll (aligned
// to LINE_START_DELAY_MS so the first letter lands with the first character
// of "CONNECTING TO THE STACK"), then each letter lands at a random point
// within a 1.5s spread window. Combined with the per-letter 4.5s fade
// duration the last letter is fully visible at ~7.5s, aligned with the
// `[ access the network ]` button (which fully lands at ~7.0s).
function letterDelay(group: number, i: number): number {
  const x = Math.sin(i * 12.9898 + group * 78.233) * 43758.5453;
  return 1.5 + (x - Math.floor(x)) * 1.5;
}

// Each console line is an array of segments. The default color is the
// container's `text-primary`; segments can override (e.g. dimmer cyan for
// status tags like `[OK]` or pending markers like `[ AUTH REQUIRED ]`).
type ConsoleSegment = { text: string; className?: string };
type ConsoleLine = ConsoleSegment[];

const CONSOLE_LINES: ConsoleLine[] = [
  [{ text: "> CONNECTING TO THE STACK" }],
  [
    { text: "> ESTABLISHING TRANSMISSION LINK " },
    { text: "[OK]", className: "text-primary/60" },
  ],
  [
    { text: "> SYSTEM ONLINE " },
    { text: "[OK]", className: "text-primary/60" },
  ],
  [{ text: "[ AUTH REQUIRED ]", className: "text-primary/40" }],
];

const lineLength = (line: ConsoleLine) =>
  line.reduce((sum, seg) => sum + seg.text.length, 0);

const LINE_START_DELAY_MS = 1500;
const CHAR_INTERVAL_MS = 28;
const POST_LINE_PAUSE_MS = 450;
const ACCEPT_REVEAL_DELAY_MS = 500;

export function BootSequence() {
  // SSR + first paint render the overlay. The inline gate script in layout.tsx
  // hides it via CSS (.cs-no-boot) for return visitors before React mounts,
  // so there is no flash. The dismiss handler below persists the flag on
  // first-visit completion (click of the access button).
  const [visible, setVisible] = useState(true);
  // `linesShown` is the count of console lines that have begun rendering.
  // The last visible line is the "active" one with the typing cursor; lines
  // before it are fully typed and cursor-less.
  const [linesShown, setLinesShown] = useState(0);
  const [currentChars, setCurrentChars] = useState(0);
  const [accepting, setAccepting] = useState(false);

  // Orchestrate the typewriter chain: start after a delay, type each line
  // char-by-char, pause between lines, reveal the access button after the
  // final line. Async via chained setTimeouts; one timer in flight at a time.
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        timer = null;
        if (!cancelled) fn();
      }, ms);
    };

    const step = (idx: number, chars: number) => {
      if (idx >= CONSOLE_LINES.length) {
        schedule(() => setAccepting(true), ACCEPT_REVEAL_DELAY_MS);
        return;
      }
      const total = lineLength(CONSOLE_LINES[idx]);
      if (chars === 0) {
        setLinesShown(idx + 1);
        setCurrentChars(0);
      }
      if (chars >= total) {
        schedule(() => step(idx + 1, 0), POST_LINE_PAUSE_MS);
        return;
      }
      schedule(() => {
        setCurrentChars(chars + 1);
        // Per-character typewriter blip; very short and re-trigger-friendly.
        playSfx("type");
        step(idx, chars + 1);
      }, CHAR_INTERVAL_MS);
    };

    schedule(() => step(0, 0), LINE_START_DELAY_MS);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Flash-on-press state for the access button. Click flips `flashing` true
  // (snap-inverted style with transition: none); a double-rAF guarantees the
  // browser paints that frame, then we flip back to base which triggers the
  // 200ms CSS fade-back. After the fade, dismiss the overlay.
  const [flashing, setFlashing] = useState(false);
  // The access click is the user's first gesture; use it to unlock the music
  // bed so audio plays from page-1 instead of requiring a separate toggle.
  const { enable: enableAudioBed } = useAudioBed();

  const persistSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore - flag failing to persist just replays the boot next visit
    }
  };

  const dismiss = () => {
    setVisible(false);
    persistSeen();
    // Signal to downstream surfaces (e.g. the Operations carousel) that the
    // user is now seeing the page. The carousel uses this to release its
    // rotation gate so it doesn't auto-advance through cards while invisible
    // behind the boot overlay.
    window.dispatchEvent(new CustomEvent("cs:boot-dismissed"));
  };

  const handleAccess = () => {
    // Fire the gate sound. The press doubles as the user gesture that unlocks
    // audio for this document; after this, subsequent audio.play() calls (the
    // music bed) succeed even outside the click handler.
    const deephit = playSfx("deephit");

    // 1. Visual flash: short snap-and-fade (matches 2advanced's gate-btn press
    //    feel), independent of how long the deephit sound runs.
    setFlashing(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlashing(false);
      });
    });

    // 2. Dismiss + music start: wait for deephit to finish so the gate sound
    //    and the music bed never overlap. Safety timeout in case `ended`
    //    never fires (audio failed to load, etc.).
    const SAFETY_MS = 6700;
    let done = false;
    const finalize = () => {
      if (done) return;
      done = true;
      enableAudioBed();
      dismiss();
    };
    if (deephit) {
      deephit.addEventListener("ended", finalize, { once: true });
    }
    setTimeout(finalize, SAFETY_MS);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          data-boot-overlay
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          aria-hidden="true"
        >
          {/* Layered backdrop: cyberpunk 2advanced-style stack.
              Top to bottom in paint order:
                1. Dot grid (cyan tint, 22px tile)
                2. Hot cyan bloom rising from bottom edge
                3. Wider amber halo from below the viewport for warm/cool contrast
                4. Deep dark-blue base gradient
              All on one element; no JS, browser-rendered. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(circle, rgba(96, 220, 246, 0.15) 1px, transparent 1.4px) 0 0 / 22px 22px",
                "radial-gradient(ellipse 130% 95% at 50% 100%, rgba(96, 220, 246, 0.32) 0%, rgba(96, 220, 246, 0.18) 22%, rgba(96, 220, 246, 0.09) 42%, rgba(96, 220, 246, 0.03) 62%, transparent 80%)",
                "radial-gradient(ellipse 170% 115% at 50% 108%, rgba(255, 170, 60, 0.18) 0%, rgba(255, 170, 60, 0.10) 25%, rgba(255, 170, 60, 0.04) 50%, transparent 90%)",
                "linear-gradient(180deg, oklch(0.10 0.02 240) 0%, oklch(0.04 0.01 240) 100%)",
              ].join(", "),
            }}
          />

          {/* Version badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute top-6 left-6 z-[2] font-mono text-[10px] tracking-[0.3em] text-primary"
          >
            v0.1.0
          </motion.div>

          {/* Main composition: horizontal layout. Circle on the left;
              everything textual (title, subtitle, console, button) sits in
              a left-aligned column on the right. Stacks vertically on small
              screens. */}
          <div className="relative z-[2] flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">

          {/* LEFT: three concentric rings + crosshair core + radar sweep */}
          <div className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 0.8, ease: "easeOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-0 rounded-full border border-primary/30"
            >
              <div
                className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                style={{ boxShadow: "0 0 12px rgba(96, 220, 246, 0.7)" }}
              />
              <div className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/50" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -360 }}
              transition={{
                opacity: { duration: 0.6, delay: 0.15 },
                scale: { duration: 0.8, delay: 0.15, ease: "easeOut" },
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-[18px] rounded-full border border-primary/20"
            >
              <div className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/70" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{
                opacity: { duration: 0.6, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3, ease: "easeOut" },
                rotate: { duration: 7, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-[40px] rounded-full border border-primary/30"
            >
              <div
                className="absolute top-0 left-1/4 size-1.5 -translate-y-1/2 rounded-full bg-primary"
                style={{ boxShadow: "0 0 8px rgba(96, 220, 246, 0.6)" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative flex size-12 items-center justify-center rounded-full border-2 border-primary"
              style={{
                boxShadow:
                  "0 0 20px rgba(96, 220, 246, 0.15), inset 0 0 20px rgba(96, 220, 246, 0.05)",
              }}
            >
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="size-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(96, 220, 246, 0.4) 0%, rgba(96, 220, 246, 0.05) 70%)",
                }}
              />
              <div
                className="absolute h-full w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(96, 220, 246, 0.3), transparent)",
                }}
              />
              <div
                className="absolute h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(96, 220, 246, 0.3), transparent)",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.18, 0], rotate: [0, 360] }}
              transition={{
                opacity: { duration: 3, repeat: Infinity },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                delay: 0.6,
              }}
              className="absolute inset-[10px] rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(96, 220, 246, 0.18) 40deg, transparent 80deg)",
              }}
            />
          </div>

          {/* RIGHT: text column. Title, subtitle, console lines, and the
              access button all left-align to a single x. */}
          <div className="flex flex-col items-start gap-6">

          {/* Title - letter-by-letter stagger */}
          <div className="flex items-center gap-[2px]">
            {"CORTICAL STACK".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: letterDelay(0, i),
                  duration: 4.5,
                  ease: "easeOut",
                }}
                className="font-display text-3xl tracking-[0.4em] uppercase md:text-4xl"
                style={{ textShadow: "0 0 30px rgba(96, 220, 246, 0.2)" }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle - letter-by-letter stagger matching the title above:
              same delay formula, same easing, same opacity/y/blur transitions.
              Color drops `text-primary` so it inherits `text-foreground`
              from body, matching the title's color. */}
          <div className="flex items-center gap-[2px]">
            {"CYBERWARE STORAGE UNIT".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: letterDelay(1, i),
                  duration: 4.5,
                  ease: "easeOut",
                }}
                className="font-mono text-[10px] tracking-[0.5em] md:text-[11px]"
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>

          {/* Console output + gate button. Each system line types out and
              stays on screen with a block cursor on the active line. After
              the last line the access button fades in; the user must click
              to dismiss the boot.

              Every line slot is rendered (future lines are `invisible`) so
              the block's height is constant - the logo above never shifts
              as lines accumulate. A reserved-height container around the
              button keeps the layout stable before it appears too. */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex w-[28rem] max-w-[calc(100vw-2rem)] flex-col items-start gap-1.5 font-mono text-[11px] tracking-[0.15em] text-primary md:text-xs">
              {CONSOLE_LINES.map((line, i) => {
                const isActive = i === linesShown - 1;
                const isFuture = i >= linesShown;
                // Active line reveals `currentChars` so far; past + future
                // render their full content (future is wrapped in `invisible`
                // so it occupies layout space without painting).
                const revealCount = isActive ? currentChars : lineLength(line);
                let remaining = revealCount;
                return (
                  <div
                    key={i}
                    className={cn("min-h-[1.4em]", isFuture && "invisible")}
                  >
                    {line.map((seg, j) => {
                      if (remaining <= 0) return null;
                      const show = Math.min(remaining, seg.text.length);
                      remaining -= show;
                      return (
                        <span key={j} className={seg.className}>
                          {seg.text.slice(0, show)}
                        </span>
                      );
                    })}
                    {isActive ? (
                      <span className="cs-cursor-flash ml-1 inline-block">
                        █
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="min-h-[44px]">
              <AnimatePresence>
                {accepting ? (
                  <motion.button
                    type="button"
                    onClick={handleAccess}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      transition: flashing
                        ? "none"
                        : "background-color 200ms ease-out, color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out",
                    }}
                    className={cn(
                      "inline-flex cursor-pointer items-center border px-5 py-2.5 font-mono text-xs tracking-[0.25em] uppercase",
                      flashing
                        ? "border-white bg-white text-background shadow-[0_0_30px_rgba(255,255,255,0.8),0_0_60px_rgba(178,70,255,0.45)]"
                        : "border-primary text-primary hover:bg-primary hover:text-background",
                    )}
                  >
                    [ access the network ]
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
          {/* /text column */}
          </div>
          {/* /main composition */}
          </div>

          {/* Corner brackets */}
          {[
            { top: "10px", left: "10px", borderWidth: "2px 0 0 2px" },
            { top: "10px", right: "10px", borderWidth: "2px 2px 0 0" },
            { bottom: "10px", left: "10px", borderWidth: "0 0 2px 2px" },
            { bottom: "10px", right: "10px", borderWidth: "0 2px 2px 0" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              className="absolute z-[2] size-8 border-primary"
              style={{ ...pos, borderStyle: "solid" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
