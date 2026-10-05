"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const RAW_API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8000"; 
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");

export type TrilingualTranslations = Record<string, string>;
export type SettingValue = string | TrilingualTranslations;
export type SettingsMap = Record<string, SettingValue | undefined>;

interface LanguageContextType {
  locale: string;
  setLocale: (lang: string) => void;
  data: SettingsMap;
  isPreview: boolean;
  t: (key: string, fallback?: string) => string;
  getAsset: (keyOrPath: SettingValue | null | undefined, fallback?: string) => string;
  getAssetUrl: (keyOrPath: SettingValue | null | undefined, fallback?: string) => string; 
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<string>("en");
  const [initialData, setInitialData] = useState<SettingsMap>({});
  const [previewData, setPreviewData] = useState<SettingsMap | null>(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadSettings = () => {
      fetch(`${API_BASE}/api/settings`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((json: SettingsMap | null) => {
          if (active && json && typeof json === "object") {
            setInitialData(json);
          }
        })
        .catch(() => {
          // The public pages keep their built-in copy when the CMS is offline.
        });
    };

    loadSettings();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "TET_LIVE_PREVIEW") {
        setPreviewData((prev) => ({
          ...(prev || {}),
          ...event.data.state,
        }));
      }

      if (event.data?.type === "TET_RELOAD_SETTINGS") {
        loadSettings();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      active = false;
      controller.abort();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const mergedData = useMemo<SettingsMap>(() => {
    return { ...initialData, ...(previewData || {}) };
  }, [initialData, previewData]);

  const t = useCallback(
    (key: string, fallback: string = ""): string => {
      const val = mergedData[key];
      if (val === undefined || val === null) return fallback;
      if (typeof val !== "object") {
        const text = String(val).trim();
        return text || fallback;
      }

      const current = String(val[locale] ?? "").trim();
      if (current) return current;
      const english = String(val.en ?? "").trim();
      if (english) return english;
      if ("en" in val || locale in val) return "";
      return fallback;
    },
    [mergedData, locale]
  );

  const getAsset = useCallback(
    (keyOrPath: SettingValue | null | undefined, fallback: string = ""): string => {
      if (!keyOrPath) return fallback;

      let target: SettingValue | undefined = keyOrPath;

      if (typeof keyOrPath === "string") {
        if (keyOrPath in mergedData) {
          target = mergedData[keyOrPath];
        } else if (!keyOrPath.includes("/") && !keyOrPath.includes(".")) {
          return fallback;
        }
      }

      if (!target) return fallback;

      let finalPath = "";
      if (typeof target === "object") {
        finalPath = target[locale] || target["en"] || Object.values(target)[0] || "";
      } else {
        finalPath = String(target).trim().replace(/^["']|["']$/g, "").replace(/\\/g, "/");
      }

      if (!finalPath) return fallback;

      if (
        finalPath.startsWith("http://") ||
        finalPath.startsWith("https://") ||
        finalPath.startsWith("blob:") ||
        finalPath.includes("livewire")
      ) {
        return finalPath;
      }

      const cleanPath = finalPath.replace(/^\/+/, "");
      const normalizedPath = cleanPath.startsWith("storage/")
        ? cleanPath.replace(/^storage\//, "")
        : cleanPath;

      return `${API_BASE}/storage/${normalizedPath}`;
    },
    [mergedData, locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        data: mergedData,
        isPreview: Boolean(previewData),
        t,
        getAsset,
        getAssetUrl: getAsset, 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};