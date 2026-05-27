"use client";

import { useEffect, useState } from "react";

// Same glyph pool as 2advanced's decrypt loop (their `DECRYPT_CHARS`).
const DECRYPT_CHARS =
  "!<>-_\\/[]{}=+*^?#%@&$ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

interface DecryptTextProps {
  text: string;
  className?: string;
  /** Per-character total time: cycling + settle. Default 70ms. */
  charMs?: number;
  /** How often the cycling glyph swaps during a char's cycling phase. Default 18ms. */
  tickMs?: number;
  /** Delay before the first character starts decoding. Default 0. */
  startDelayMs?: number;
  /**
   * Gate the animation on the boot sequence: wait for the
   * `cs:boot-dismissed` event before starting. If the boot is skipped on
   * mount (the pre-paint script sets `cs-no-boot` on `<html>` for return
   * visitors), the gate is treated as already open and decryption starts
   * immediately. Same pattern used by the Operations carousel video.
   */
  waitForBoot?: boolean;
}

/**
 * Sequential per-character decrypt animation, ported from the 2advanced
 * "THE KESEY SIGNAL" title decode. One glyph cycles through random
 * characters under the cursor, then settles to the real letter, then the
 * cursor advances to the next position.
 *
 * Renders the "typed" (already-settled) prefix plus a single cycling glyph
 * at the active position. Respects prefers-reduced-motion (snaps to full
 * text on mount).
 */
export function DecryptText({
  text,
  className,
  charMs = 70,
  tickMs = 18,
  startDelayMs = 0,
  waitForBoot = false,
}: DecryptTextProps) {
  const [typed, setTyped] = useState("");
  const [cycling, setCycling] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Reduced motion: snap straight to the final text, skip the decrypt.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTyped(text);
      setCycling("");
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let idx = 0;

    const pickRandom = () =>
      DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)];

    const advance = () => {
      if (cancelled) return;
      if (idx >= text.length) {
        setCycling("");
        return;
      }
      const realChar = text[idx];

      // Spaces don't cycle - appear instantly, then continue.
      if (realChar === " ") {
        setTyped(text.slice(0, idx + 1));
        setCycling("");
        idx++;
        timeoutId = setTimeout(advance, charMs / 2);
        return;
      }

      // Show first random glyph immediately, then keep swapping.
      setCycling(pickRandom());
      intervalId = setInterval(() => {
        setCycling(pickRandom());
      }, tickMs);

      // Settle: stop cycling, commit real char to typed, advance.
      timeoutId = setTimeout(() => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        setTyped(text.slice(0, idx + 1));
        idx++;
        advance();
      }, charMs);
    };

    const startAnimation = () => {
      timeoutId = setTimeout(advance, startDelayMs);
    };

    // If the caller wants the animation gated on boot dismissal AND the
    // boot will actually show on this load (i.e. the `cs-no-boot` class
    // isn't already on <html>), wait for the dismiss event before starting.
    if (
      waitForBoot &&
      typeof document !== "undefined" &&
      !document.documentElement.classList.contains("cs-no-boot")
    ) {
      const onDismiss = () => startAnimation();
      window.addEventListener("cs:boot-dismissed", onDismiss, { once: true });
      return () => {
        cancelled = true;
        if (timeoutId) clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
        window.removeEventListener("cs:boot-dismissed", onDismiss);
      };
    }

    startAnimation();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, charMs, tickMs, startDelayMs, waitForBoot]);

  return (
    <span className={className}>
      {typed}
      <span aria-hidden="true">{cycling}</span>
    </span>
  );
}
