"use client";

import { useCallback, useEffect, useState } from "react";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

export type PageCardGroup =
  | "home_programs"
  | "home_involve"
  | "about_values"
  | "contact_info"
  | "donate_impact"
  | "volunteer_roles";

export type Trilingual = { en?: string; si?: string; ta?: string } | string | null | undefined;

export type PageCard = {
  id: number;
  group: string;
  title: Trilingual;
  tag: Trilingual;
  description: Trilingual;
  value: Trilingual;
  icon: string | null;
  image: string | null;
  link: string | null;
  extra: Record<string, unknown>;
};

export function pickLang(value: Trilingual, locale: string, fallback = ""): string {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "string") return value || fallback;
  return value[locale as "en" | "si" | "ta"] || value.en || fallback;
}

export function extraText(
  extra: Record<string, unknown> | undefined,
  key: string,
  locale: string,
  fallback = "",
): string {
  const raw = extra?.[key];
  if (raw === undefined || raw === null || raw === "") return fallback;
  if (typeof raw === "string") return raw || fallback;
  if (typeof raw === "object") {
    const obj = raw as Record<string, string>;
    return obj[locale] || obj.en || fallback;
  }
  return fallback;
}

export function usePageCards(group: PageCardGroup): PageCard[] {
  const [cards, setCards] = useState<PageCard[]>([]);

  const load = useCallback(() => {
    fetch(`${API_BASE}/api/cards?group=${group}&t=${Date.now()}`, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setCards(data);
      })
      .catch(() => {});
  }, [group]);

  useEffect(() => {
    load();

    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === "TET_RELOAD_SETTINGS") {
        load();
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [load]);

  return cards;
}
