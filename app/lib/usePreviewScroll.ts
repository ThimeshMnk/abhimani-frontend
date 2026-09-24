"use client";

import { useEffect } from "react";

function scrollToSection(id?: string | null, smooth = false) {
  if (!id) return false;
  const target = document.getElementById(id);
  if (!target) return false;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  return true;
}

export function usePreviewScroll() {
  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("section");
    const fromHash = window.location.hash.replace(/^#/, "");
    const initial = fromQuery || fromHash;

    const retry = (id: string | null, attempt = 0) => {
      if (!id) return;
      if (scrollToSection(id, attempt > 0)) return;
      if (attempt < 25) {
        window.setTimeout(() => retry(id, attempt + 1), 200);
      }
    };

    retry(initial);

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "AWC_SCROLL_TO_SECTION" || event.data?.type === "TET_SCROLL_TO_SECTION") {
        retry(event.data.sectionId);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);
}
