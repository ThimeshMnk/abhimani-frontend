"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

interface NewsItem {
  id: number;
  title: Record<string, string> | string;
  category?: string;
  date: string;
  location: Record<string, string> | string;
  excerpt: Record<string, string> | string;
  fullStory?: Record<string, string> | string;
  full_story?: Record<string, string> | string;
  img?: string;
  image?: string;
}

const defaultNewsList: NewsItem[] = [
  {
    id: 1,
    category: "Policy Submission",
    date: "March 18, 2026",
    location: { en: "Colombo, Sri Lanka" },
    title: { en: "AWC Submits Landmark Recommendations on Decriminalisation to National Committee" },
    excerpt: { en: "Advocates presented lived-experience evidence urging repeal of colonial vagrancy ordinances and protections against arbitrary police harassment." },
    fullStory: { en: "In a formal submission to the Ministry of Justice and constitutional delegates, Abhimani Women's Collective outlined the human rights violations facilitated by the 1841 Vagrants Ordinance. The submission details recommendations for establishing labour rights, preventing arbitrary detention, and safeguarding bodily autonomy." },
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    category: "Crisis Rapid Response",
    date: "February 24, 2026",
    location: { en: "Island-Wide Desk" },
    title: { en: "Expansion of Our Colombo 24/7 Crisis Hotline & Legal Accompaniment Unit" },
    excerpt: { en: "Strengthened intake teams ready to provide instant bail coordination, attorney accompaniment, and safe shelter intake across 12 districts." },
    fullStory: { en: "With escalating economic pressures, AWC has expanded its rapid-response paralegal desk. Community members facing illegal arrests or eviction can now reach on-call duty officers 24/7. Pro-bono attorneys are stationed across Western, Central, and Southern provinces to attend police station lockups within hours." },
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    category: "Social Enterprise",
    date: "January 15, 2026",
    location: { en: "Kandy Cultural Center" },
    title: { en: "Community Social Enterprise Launches New Eco-Textile Collection" },
    excerpt: { en: "Showcasing handcrafted accessories, upcycled kimonos, and batik textiles created directly to support peer emergency relief funds." },
    fullStory: { en: "AWC's livelihood social enterprise officially introduced its 2026 eco-textile line. Created by survivors of systemic violence, all revenue generated directly supports our revolving emergency bail tin and transitional housing facilities." },
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80",
  },
];

// Detail Modal
function NewsDetailModal({
  news,
  onClose,
  resolveText,
}: {
  news: NewsItem;
  onClose: () => void;
  resolveText: (val: Record<string, string> | string | undefined, fallback?: string) => string;
}) {
  const { getAsset, getAssetUrl, isPreview } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const title = resolveText(news.title, "Press Release");
  const date = news.date || "Recent News";
  const location = resolveText(news.location, "Sri Lanka");
  const excerpt = resolveText(news.excerpt, "");
  const fullStory = resolveText(news.fullStory || news.full_story, excerpt);
  const imgUrl = resolveAsset(
    news.img || news.image,
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80"
  );

  const shareToWhatsApp = () => {
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/news?id=${news.id}`
      : "https://awc.lk/news";
    const msg = `*${title}*\n${excerpt}\nRead full dispatch: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Close Modal"
        >
          ✕
        </button>

        <div className="relative h-64 w-full bg-gray-900">
          <Image
            src={imgUrl}
            fill
            alt={title}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={isPreview}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E84E2D] text-white px-3 py-1 rounded-full shadow-sm inline-block mb-2">
              {news.category || "Press Release"}
            </span>
            <h2 className="font-serif text-2xl font-bold leading-tight">
              {title}
            </h2>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-orange-100 text-xs">
            <div className="font-bold text-[#58214D]">📅 {date}</div>
            <div className="font-bold text-[#58214D]">📍 {location}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#E84E2D] bg-orange-100/70 px-3 py-1 rounded-full">
              Official AWC Dispatch
            </div>
          </div>

          <div className="space-y-4 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {excerpt && <p className="font-semibold text-gray-900">{excerpt}</p>}
            <p>{fullStory}</p>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#58214D]">
              Share This Dispatch:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open("https://www.facebook.com/share/12G6Xq5jZ15/", "_blank")}
                className="px-4 py-2 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Facebook
              </button>
              <button
                onClick={shareToWhatsApp}
                className="px-4 py-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main Page
export default function NewsPage() {
  const { t, getAsset, getAssetUrl, locale, isPreview } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;
  const [newsList, setNewsList] = useState<NewsItem[]>(defaultNewsList);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/activities`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setNewsList(data);
          }
        }
      } catch (err) {
        console.warn("Using offline AWC news defaults:", err);
      }
    };

    loadNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const resolveText = (val: Record<string, string> | string | undefined, fallback = "") => {
    if (!val) return fallback;
    if (typeof val === "object") {
      return val[locale] || val["en"] || Object.values(val)[0] || fallback;
    }
    return String(val);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-slate-800 selection:bg-[#FBE8E3] selection:text-[#E84E2D] pb-24 scroll-smooth">
      
      {/* HEADER */}
      <section id="news-hero" className="scroll-mt-28 pt-16 pb-12 px-6 bg-white border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={fadeInUp}>
            <span className="text-[#E84E2D] font-bold text-[11px] tracking-[0.3em] uppercase mb-4 px-3.5 py-1.5 bg-orange-100/80 rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E84E2D] animate-pulse"></span>
              AWC PRESS DESK • ADVOCACY DISPATCHES
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] mb-4 tracking-tight">
              News &amp; <span className="text-[#58214D] italic font-normal">Press Releases</span>
            </h1>
            <p className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed">
              Official press announcements, policy reform briefs, and field updates documenting our collective movement across Sri Lanka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID */}
      <section id="news-grid" className="scroll-mt-28 pt-14 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {newsList.map((item, i) => {
            const title = resolveText(item.title, "Press Release");
            const location = resolveText(item.location, "Sri Lanka");
            const excerpt = resolveText(item.excerpt, "");
            const date = item.date || "Recent";
            const imgSrc = resolveAsset(
              item.img || item.image,
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80"
            );

            return (
              <motion.div
                key={item.id}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedNews(item)}
                className="scroll-mt-32 group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#58214D]/40 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={imgSrc}
                      fill
                      alt={title}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={isPreview}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-bold text-white bg-[#E84E2D] px-3 py-1 rounded-full shadow-xs">
                        {date}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 text-white text-xs font-semibold flex items-center gap-1.5 opacity-90">
                      <span>📍</span>
                      <span className="truncate">{location}</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#58214D] block mb-2">
                      {item.category || "Press Bulletin"}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#141414] mb-2.5 leading-snug group-hover:text-[#58214D] transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#58214D] group-hover:text-[#E84E2D] inline-flex items-center gap-1 transition-colors">
                    <span>Read Full Dispatch</span>
                    <span>→</span>
                  </span>
                  <span className="text-gray-400 text-[10px]">AWC Official</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedNews && (
          <NewsDetailModal
            key={selectedNews.id}
            news={selectedNews}
            onClose={() => setSelectedNews(null)}
            resolveText={resolveText}
          />
        )}
      </AnimatePresence>
    </div>
  );
}