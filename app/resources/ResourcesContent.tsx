"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export interface PublicationItem {
  id: number;
  title: Record<string, string> | string;
  category?: Record<string, string> | string;
  cat?: Record<string, string> | string;
  languages?: string[] | string;
  fileSize?: string;
  file_size?: string;
  fileFormat?: string;
  file_format?: string;
  date?: string;
  // Flexible mappings for whatever field your admin panel uses
  downloadUrl?: string;
  download_url?: string;
  file?: string;
  file_path?: string;
  pdf?: string;
  pdf_url?: string;
  url?: string;
  desc?: Record<string, string> | string;
  description?: Record<string, string> | string;
}

const defaultPublications: PublicationItem[] = [
  {
    id: 1,
    title: { en: "Know Your Rights: Pocket Legal Guide for Sex Workers" },
    category: { en: "Legal Guides" },
    languages: ["සිංහල", "தமிழ்", "English"],
    fileSize: "2.4 MB",
    fileFormat: "PDF",
    date: "Updated Jan 2026",
    download_url: "/storage/resources/awc-pocket-legal-guide.pdf",
    desc: { en: "A pocket-sized constitutional rights reference explaining legal protections during police stops, unlawful detention, and bail procedures." },
  },
  {
    id: 2,
    title: { en: "Community Healthcare & Harm Reduction Field Handbook" },
    category: { en: "Health & Care" },
    languages: ["සිංහල", "தமிழ்", "English"],
    fileSize: "3.8 MB",
    fileFormat: "PDF",
    date: "Updated Dec 2025",
    download_url: "/storage/resources/awc-harm-reduction-manual.pdf",
    desc: { en: "A practical guide for peer navigators on safe sexual healthcare, STI/HIV prevention protocols, and trauma-informed mental care." },
  },
  {
    id: 3,
    title: { en: "Policy Whitepaper: Repealing Sri Lanka's 1841 Vagrants Ordinance" },
    category: { en: "Policy Papers" },
    languages: ["English"],
    fileSize: "1.9 MB",
    fileFormat: "PDF",
    date: "Published March 2026",
    download_url: "/storage/resources/awc-vagrancy-law-reform.pdf",
    desc: { en: "Official evidence-based submission presented to the Law Commission and parliamentary caucuses detailing custodial rights violations." },
  },
  {
    id: 4,
    title: { en: "Paralegal First-Responder Station Accompaniment Checklist" },
    category: { en: "Legal Guides" },
    languages: ["සිංහල", "English"],
    fileSize: "1.1 MB",
    fileFormat: "PDF",
    date: "Updated Feb 2026",
    download_url: "/storage/resources/awc-paralegal-checklist.pdf",
    desc: { en: "Checklist for certified peer paralegals handling midnight arrests, recording police station diary numbers, and bail bond logistics." },
  },
];

// Helper to generate a valid PDF blob in memory for testing before backend is linked
function createFallbackPdfBlob(title: string, category: string, desc: string): Blob {
  const safeTitle = title.replace(/[()\\]/g, "");
  const safeCategory = category.replace(/[()\\]/g, "");
  const safeDesc = desc.substring(0, 180).replace(/[()\\]/g, "");

  const streamText = `BT
/F1 18 Tf
50 720 Td
(ABHIMANI WOMEN'S COLLECTIVE - SRI LANKA) Tj
/F1 12 Tf
0 -30 Td
(Category: ${safeCategory}) Tj
/F1 14 Tf
0 -30 Td
(Title: ${safeTitle}) Tj
/F1 10 Tf
0 -30 Td
(${safeDesc}) Tj
0 -30 Td
(Official Human Rights Toolkit. Contact: info@awc.lk | Hotline: +94 77 123 4567) Tj
ET`;

  const pdfData = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>
endobj
4 0 obj
<< /Length ${streamText.length} >>
stream
${streamText}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000232 00000 n 
0000000315 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
390
%%EOF`;

  return new Blob([pdfData], { type: "application/pdf" });
}

export default function ResourcesPage() {
  const { locale } = useLanguage();
  const [publicationsList, setPublicationsList] = useState<PublicationItem[]>(defaultPublications);
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  // 1. Fetch live publications from the Admin API
  useEffect(() => {
    let isMounted = true;
    const loadResources = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/resources`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setPublicationsList(data);
          }
        }
      } catch (err) {
        console.warn("Using offline AWC resources defaults:", err);
      }
    };
    loadResources();
    return () => { isMounted = false; };
  }, []);

  const resolveText = (val: Record<string, string> | string | undefined, fallback = ""): string => {
    if (!val) return fallback;
    if (typeof val === "object") {
      return val[locale] || val["en"] || Object.values(val)[0] || fallback;
    }
    return String(val);
  };

  const resolveLanguages = (langs?: string[] | string): string[] => {
    if (!langs) return ["English"];
    if (Array.isArray(langs)) return langs;
    if (typeof langs === "string") {
      try {
        const parsed = JSON.parse(langs);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return langs.split(",").map((l) => l.trim());
      }
    }
    return [String(langs)];
  };

  // Resolves backend URLs, S3 links, or local storage paths
  const resolveTargetUrl = (pub: PublicationItem): string => {
    const raw =
      pub.download_url ||
      pub.downloadUrl ||
      pub.file ||
      pub.file_path ||
      pub.pdf ||
      pub.pdf_url ||
      pub.url ||
      "";

    if (!raw) return "";

    // 1. If it's already an absolute URL (e.g. S3, Cloudinary, or http://...)
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return raw;
    }

    // 2. If it's a backend storage path (e.g. /storage/... or storage/...)
    if (raw.includes("storage/")) {
      const cleanPath = raw.startsWith("/") ? raw : `/${raw}`;
      return `${API_BASE}${cleanPath}`;
    }

    // 3. Fallback relative path
    return raw.startsWith("/") ? raw : `/${raw}`;
  };

  // ACTION 1: View Online (Opens directly in browser viewer)
  const handleViewOnline = async (pub: PublicationItem) => {
    const title = resolveText(pub.title, "awc-publication");
    const category = resolveText(pub.category || pub.cat, "toolkit");
    const desc = resolveText(pub.desc || pub.description, "");
    const targetUrl = resolveTargetUrl(pub);

    if (targetUrl) {
      try {
        const check = await fetch(targetUrl, { method: "HEAD" });
        if (check.ok) {
          window.open(targetUrl, "_blank", "noopener,noreferrer");
          return;
        }
      } catch {
        // Fall back to in-memory PDF if backend is not up yet
      }
    }

    // In-memory view fallback
    const blob = createFallbackPdfBlob(title, category, desc);
    const blobUrl = window.URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  // ACTION 2: Download File (Forces save to disk)
  const handleDownload = async (pub: PublicationItem) => {
    setDownloadingId(pub.id);

    const title = resolveText(pub.title, "awc-publication");
    const category = resolveText(pub.category || pub.cat, "toolkit");
    const desc = resolveText(pub.desc || pub.description, "");
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
    const targetUrl = resolveTargetUrl(pub);

    try {
      if (targetUrl) {
        const res = await fetch(targetUrl);
        if (res.ok) {
          const blob = await res.blob();
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
          setDownloadingId(null);
          return;
        }
      }
      throw new Error("Physical backend file not yet linked");
    } catch {
      // In-memory download fallback so user never gets a 404
      const fallbackBlob = createFallbackPdfBlob(title, category, desc);
      const blobUrl = window.URL.createObjectURL(fallbackBlob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } finally {
      setTimeout(() => setDownloadingId(null), 500);
    }
  };

  const uniqueCategories = [
    "All",
    ...Array.from(
      new Set(
        publicationsList
          .map((p) => resolveText(p.category || p.cat, "General"))
          .filter(Boolean)
      )
    ),
  ];

  const filtered =
    selectedCat === "All"
      ? publicationsList
      : publicationsList.filter(
          (p) => resolveText(p.category || p.cat, "General") === selectedCat
        );

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-slate-800 pb-24 selection:bg-[#FBE8E3] selection:text-[#E84E2D]">
      
      {/* 1. HEADER */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] px-4 py-1.5 bg-orange-100/80 rounded-full inline-block mb-4">
            AWC Knowledge Hub • Open Access
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] mb-4">
            Toolkits &amp; <span className="text-[#58214D] italic font-normal">Publications</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Knowledge is defense. Access our free trilingual constitutional rights guides, empirical research briefs, and harm reduction field manuals.
          </p>

          {/* Category Filter Pills */}
          {/* <div className="flex flex-wrap justify-center gap-2 text-xs font-bold uppercase tracking-wider">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-[#58214D] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>
      </section>

      {/* 2. PUBLICATIONS LIST WITH BOTH "VIEW" AND "DOWNLOAD" OPTIONS */}
      <section className="py-14 px-6 max-w-5xl mx-auto space-y-6">
        {filtered.map((pub) => {
          const title = resolveText(pub.title, "Publication Document");
          const category = resolveText(pub.category || pub.cat, "Document");
          const desc = resolveText(pub.desc || pub.description, "");
          const fileFormat = pub.fileFormat || pub.file_format || "PDF";
          const fileSize = pub.fileSize || pub.file_size || "2.4 MB";
          const date = pub.date || "Recent";
          const languages = resolveLanguages(pub.languages);
          const isDownloading = downloadingId === pub.id;

          return (
            <motion.div
              key={pub.id}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-6 md:p-8 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#58214D] hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-orange-100 text-[#E84E2D]">
                    {category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">• {date}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#141414] mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {desc}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
                  <span>Available In:</span>
                  {languages.map((lang, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
                      {lang}
                    </span>
                  ))}
                  <span className="text-gray-400 font-normal">({fileFormat} • {fileSize})</span>
                </div>
              </div>

              {/* ACTION BUTTONS: VIEW ONLINE & DOWNLOAD */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto flex-shrink-0">
                
                {/* 1. View in Browser Tab */}
                <button
                  type="button"
                  onClick={() => handleViewOnline(pub)}
                  className="flex-1 sm:flex-none border border-gray-300 hover:border-[#58214D] text-gray-800 hover:text-[#58214D] text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs bg-white whitespace-nowrap active:scale-95"
                >
                  <span>View Online</span>
                  <span>↗</span>
                </button>

                {/* 2. Direct Download */}
                <button
                  type="button"
                  onClick={() => handleDownload(pub)}
                  disabled={isDownloading}
                  className="flex-1 sm:flex-none bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
                >
                  <span>{isDownloading ? "Downloading..." : `Download (${fileFormat})`}</span>
                  <span>{isDownloading ? "⏳" : "↓"}</span>
                </button>

              </div>
            </motion.div>
          );
        })}
      </section>

    </div>
  );
}