import type { ComponentPropsWithoutRef } from "react";

// Match downloadable assets we want to open out-of-tab: PDFs, slide decks,
// docs, spreadsheets, archives. Tail can be end-of-string, query, or fragment.
const NEW_TAB_FILE_EXTS = /\.(pdf|pptx?|docx?|xlsx?|zip)(?:$|\?|#)/i;
// Detect bare-hostname links missing the protocol, e.g. `github.com/foo` or
// `standoutsocks.co.uk`. The browser would otherwise treat these as relative
// paths and navigate within the site (then 404).
const BARE_HOST = /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[/?#]|$)/i;

/**
 * Anchor renderer for MDX content. Opens external links and downloadable
 * assets (PDF, PPTX, ...) in a new tab so the main page stays anchored; lets
 * same-origin route links navigate in place as usual. Bare-hostname links
 * (missing `https://`) get prefixed defensively.
 */
export function MdxLink({
  href,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <a {...rest}>{children}</a>;
  }
  const isExternal = /^https?:\/\//i.test(href);
  const isDownload = NEW_TAB_FILE_EXTS.test(href);
  const isBareHost = !isExternal && BARE_HOST.test(href);
  const newTab = isExternal || isDownload || isBareHost;
  const resolvedHref = isBareHost ? `https://${href}` : href;
  return (
    <a
      href={resolvedHref}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
