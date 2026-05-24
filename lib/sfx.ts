/**
 * UI sound effects. Mirrors the keseysignal.2advanced.com pattern: tiny
 * preloaded clips, `currentTime = 0; play()` so rapid retriggers (e.g.,
 * mouse-raking over a nav) restart cleanly. Errors swallowed because
 * browser autoplay policy may block play() until the first user gesture.
 *
 * Usage:
 *   import { playSfx } from "@/lib/sfx";
 *   playSfx("hover", { throttleMs: 1500 });
 *   playSfx("deephit");
 *
 * SSR-safe (no-ops when called server-side).
 */

const SOURCES = {
  hover: { ogg: "/assets/sfx/hover1.ogg", mp3: "/assets/sfx/hover1.mp3" },
  press: {
    ogg: "/assets/sfx/buttonpress1.ogg",
    mp3: "/assets/sfx/buttonpress1.mp3",
  },
  deephit: {
    ogg: "/assets/sfx/deephit-withglitch.ogg",
    mp3: "/assets/sfx/deephit-withglitch.mp3",
  },
  type: {
    ogg: "/assets/sfx/typearrayloop.ogg",
    mp3: "/assets/sfx/typearrayloop.mp3",
  },
} as const;

export type SfxId = keyof typeof SOURCES;

interface PlayOpts {
  /** Skip play if the same id played within this many ms. */
  throttleMs?: number;
  /** 0..1, applied per call. */
  volume?: number;
}

const cache = new Map<SfxId, HTMLAudioElement>();
const lastPlayed = new Map<SfxId, number>();

function ensureAudio(id: SfxId): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const existing = cache.get(id);
  if (existing) return existing;
  const el = new Audio();
  // Prefer ogg (smaller, broadly supported); fall back to mp3 only if the
  // browser explicitly can't play vorbis (essentially never on modern browsers).
  const canOgg = el.canPlayType("audio/ogg; codecs=vorbis") !== "";
  el.src = canOgg ? SOURCES[id].ogg : SOURCES[id].mp3;
  el.preload = "auto";
  cache.set(id, el);
  return el;
}

export function playSfx(
  id: SfxId,
  opts: PlayOpts = {},
): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const now = Date.now();
  if (opts.throttleMs && opts.throttleMs > 0) {
    const last = lastPlayed.get(id) ?? 0;
    if (now - last < opts.throttleMs) return null;
  }
  lastPlayed.set(id, now);
  const audio = ensureAudio(id);
  if (!audio) return null;
  audio.currentTime = 0;
  if (typeof opts.volume === "number") audio.volume = opts.volume;
  audio.play().catch(() => {
    // Autoplay-with-sound blocked until first user gesture; silent fail.
  });
  return audio;
}
