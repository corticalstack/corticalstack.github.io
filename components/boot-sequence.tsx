"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const BOOT_DURATION_MS = 5400;

/**
 * First-visit boot sequence. Skipped on return via localStorage.
 * Append `?boot=1` to the URL to force-show for development testing.
 *
 * Adapted from corticalstack/osiris (the splash overlay inside its
 * src/app/page.tsx): concentric rotating rings around a crosshair core +
 * radar sweep, letter-stagger title, typewriter subtitle, multi-stage
 * progress bar, corner brackets, decorative grid, CRT scanline drift -
 * all themed for Cortical Stack (cyan palette, cyber HUD copy).
 */
export function BootSequence() {
  // DIAGNOSTIC: gate removed; boot runs on every full page load while we
  // confirm it renders correctly for JP. Once verified, re-add the
  // `cs:boot-seen` localStorage gate + `?boot=1` force-override.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), BOOT_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          aria-hidden="true"
        >
          {/* Radial gradient backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.10 0.02 240) 0%, oklch(0.06 0.01 240) 70%)",
            }}
          />

          {/* Decorative grid lines */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(96, 220, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 220, 246, 0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
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

          {/* Logo: three concentric rings + crosshair core + radar sweep */}
          <div className="relative z-[2] mb-8 flex h-40 w-40 items-center justify-center">
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

          {/* Title - letter-by-letter stagger */}
          <div className="z-[2] mb-3 flex items-center gap-[2px]">
            {"CORTICAL STACK".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 1.0 + i * 0.12,
                  duration: 1.0,
                  ease: "easeOut",
                }}
                className="font-display text-3xl tracking-[0.4em] uppercase md:text-4xl"
                style={{ textShadow: "0 0 30px rgba(96, 220, 246, 0.2)" }}
              >
                {letter === " " ? " " : letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle - typewriter */}
          <div className="z-[2] mb-8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 2.6, duration: 1.6, ease: "easeInOut" }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="font-mono text-[10px] tracking-[0.5em] text-primary opacity-80 md:text-[11px]">
                CYBERWARE STORAGE UNIT
              </p>
            </motion.div>
          </div>

          {/* Progress bar + cycling status messages */}
          <div className="z-[2] w-64 md:w-80">
            <div className="relative h-px w-full overflow-hidden bg-primary/15">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "25%", "50%", "78%", "100%"] }}
                transition={{
                  duration: 4.4,
                  delay: 1.0,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-warning), var(--color-primary))",
                }}
              />
            </div>
            <div className="relative mt-3 flex h-4 items-center justify-center">
              {[
                { text: "INITIALIZING CORTICAL STACK...", delay: 1.0 },
                { text: "DECRYPTING ARCHIVES...", delay: 2.2 },
                { text: "ESTABLISHING TRANSMISSION LINK...", delay: 3.4 },
                { text: "SYSTEM ONLINE", delay: 4.4 },
              ].map((stage, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    delay: stage.delay,
                    duration: 1.2,
                    times: [0, 0.1, 0.7, 1],
                  }}
                  className="absolute font-mono text-[9px] tracking-[0.25em]"
                  style={{
                    color:
                      i === 3
                        ? "var(--color-primary)"
                        : "var(--color-muted-foreground)",
                  }}
                >
                  {stage.text}
                </motion.span>
              ))}
            </div>
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
