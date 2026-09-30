/** Turn CMS links into real site paths. A stored "\/donate" becomes "//donate" in the browser. */
export function siteHref(value: string | null | undefined, fallback = "/"): string {
  const cleaned = String(value ?? "")
    .trim()
    .replace(/\\/g, "");

  if (!cleaned) return fallback;
  if (/^(https?:|mailto:|tel:|#|\/)/i.test(cleaned)) return cleaned;
  return `/${cleaned.replace(/^\/+/, "")}`;
}
