"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { playSfx } from "@/lib/sfx";

interface SfxLinkExtras {
  /**
   * Layer the `type` (typewriter tick) sound on top of the `hover` blip on
   * mouseenter, mirroring 2advanced's `.leftnav-btn` composite (hoverSfx +
   * ctaHoverSfx). Use for prime CTAs you want to feel weightier than a plain
   * nav-link hover.
   */
  prime?: boolean;
}

/**
 * `next/link` with default hover + click SFX. Caller handlers (if supplied)
 * fire after the SFX so behavior composes. Drop-in replacement for `<Link>`
 * anywhere you want both a hover blip and a press click.
 */
export function SfxLink({
  onMouseEnter: callerOnMouseEnter,
  onClick: callerOnClick,
  prime = false,
  ...rest
}: ComponentProps<typeof Link> & SfxLinkExtras) {
  return (
    <Link
      {...rest}
      onMouseEnter={(e) => {
        playSfx("hover");
        if (prime) playSfx("type");
        callerOnMouseEnter?.(e);
      }}
      onClick={(e) => {
        playSfx("press");
        callerOnClick?.(e);
      }}
    />
  );
}
