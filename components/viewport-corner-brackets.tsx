/**
 * Four cyan L-shaped corner brackets pinned to the viewport - the same HUD
 * framing the boot overlay paints, applied site-wide. `fixed inset-0` so they
 * follow the viewport rather than the page; `pointer-events-none` so they
 * never intercept clicks. Lives at z-[60] - above the site header (z-50)
 * and below the boot overlay (z-[100]), so the brackets are visible on the
 * main pages but the boot's own brackets win during boot.
 */
const BRACKETS = [
  { className: "top-[10px] left-[10px]", borderWidth: "2px 0 0 2px" },
  { className: "top-[10px] right-[10px]", borderWidth: "2px 2px 0 0" },
  { className: "bottom-[10px] left-[10px]", borderWidth: "0 0 2px 2px" },
  { className: "bottom-[10px] right-[10px]", borderWidth: "0 2px 2px 0" },
];

export function ViewportCornerBrackets() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60]"
    >
      {BRACKETS.map((b, i) => (
        <div
          key={i}
          className={`absolute size-8 border-primary opacity-40 ${b.className}`}
          style={{ borderStyle: "solid", borderWidth: b.borderWidth }}
        />
      ))}
    </div>
  );
}
