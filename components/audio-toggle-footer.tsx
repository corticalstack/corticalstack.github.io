"use client";

import { useAudioBed } from "@/components/audio-bed-provider";
import { playSfx } from "@/lib/sfx";

/**
 * Persistent audio mute/unmute affordance for the footer. Mirrors the
 * `// replay boot_` styling and only renders when the audio bed exists.
 */
export function AudioToggleFooter() {
  const { available, audioOn, toggle } = useAudioBed();
  if (!available) return null;
  return (
    <button
      type="button"
      onClick={() => {
        playSfx("press");
        toggle();
      }}
      onMouseEnter={() => playSfx("hover")}
      className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
      aria-label={audioOn ? "Mute audio bed" : "Play audio bed"}
      aria-pressed={audioOn}
    >
      {audioOn ? "// audio_on" : "// audio_off"}
    </button>
  );
}
