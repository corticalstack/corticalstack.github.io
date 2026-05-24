"use client";

import { playSfx } from "@/lib/sfx";

const STORAGE_KEY = "cs:boot-seen";

export function ReplayBoot() {
  const replay = () => {
    playSfx("press");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore - we'll still navigate with ?boot=1 which force-shows
    }
    window.location.assign(`${window.location.pathname}?boot=1`);
  };

  return (
    <button
      type="button"
      onClick={replay}
      onMouseEnter={() => playSfx("hover")}
      className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
    >
      // replay boot_
    </button>
  );
}
