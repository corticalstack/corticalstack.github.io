"use client";

import { useEffect, useRef, useState } from "react";

// Latin-only scramble set keeps glyph widths close to body text so layout
// barely shifts during the effect.
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#%&01;:.,~";

interface ScrambleTextProps {
  text: string;
  trigger: number;
  className?: string;
  durationMs?: number;
}

export function ScrambleText({
  text,
  trigger,
  className,
  durationMs = 380,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // display stays at the final text; no animation
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

  return <span className={className}>{display}</span>;
}
