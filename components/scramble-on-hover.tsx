"use client";

import { useEffect, useRef, useState } from "react";

// Same scramble glyph set as ScrambleText. Latin-only keeps glyph widths
// close to the body text so layout barely shifts during the animation.
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#%&01;:.,~";

interface ScrambleOnHoverProps {
  text: string;
  className?: string;
  durationMs?: number;
}

/**
 * Inline span whose text content scrambles + settles back each time its
 * nearest interactive ancestor (button or anchor) is hovered. Drop inside
 * a button/anchor; icons and brackets that should not scramble can sit
 * alongside it untouched. Respects prefers-reduced-motion.
 */
export function ScrambleOnHover({
  text,
  className,
  durationMs = 760,
}: ScrambleOnHoverProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [trigger, setTrigger] = useState(0);
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  // Attach mouseenter to the closest interactive ancestor so the scramble
  // fires on hovering the whole button, not only the text span.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.closest("button, a") as HTMLElement | null;
    if (!host) return;
    const onEnter = () => setTrigger((t) => t + 1);
    host.addEventListener("mouseenter", onEnter);
    return () => host.removeEventListener("mouseenter", onEnter);
  }, []);

  // Keep displayed text in sync if the source text changes between hovers
  // (e.g. the contact form button toggling between TRANSMITTING and
  // SEND TRANSMISSION). Without this, the button could keep rendering the
  // pre-change scrambled value after the prop updates.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (trigger === 0) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Reduced motion: snap display to the final text and skip the scramble.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(text);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const lockUpTo = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < lockUpTo || ch === " " || ch === "\n") {
          out += ch;
        } else {
          out +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(out);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        rafRef.current = null;
      }
    };
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
