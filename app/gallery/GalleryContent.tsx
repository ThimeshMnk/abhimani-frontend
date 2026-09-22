"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
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

interface EventItem {
  id: number;
  title: Record<string, string> | string;
  cat?: Record<string, string> | string;
  date: string;
  location: Record<string, string> | string;
  excerpt: Record<string, string> | string;
  fullStory?: Record<string, string> | string;
  full_story?: Record<string, string> | string;
  img?: string;
  cover_image?: string;
  gallery?: string[];
  gallery_images?: string[];
}

const defaultEvents: EventItem[] = [
  {
    id: 1,
    cat: { en: "Advocacy & Policy" },
    date: "OCT 14, 2026",
    location: { en: "Colombo Public Library Hall" },
    title: { en: "Sisterhood in Action: National Decriminalisation Consultation" },
    excerpt: { en: "Over 180 female and transgender sex worker leaders gathered in Colombo to present law-reform papers demanding the repeal of colonial vagrancy statutes." },
    fullStory: { en: "Organized by Abhimani Women's Collective, this landmark national consultation united community organizers, constitutional attorneys, and public health delegates. Key tracks examined the systemic misuse of the 1841 Vagrants Ordinance, documentation of custodial violence, and actionable submissions presented directly to legal reform commissions." },
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    cat: { en: "Economic Liberation" },
    date: "SEP 28, 2026",
    location: { en: "Kandy Cultural Centre" },
    title: { en: "Hands of Resilience: Survivor Artisan Craft Showcase" },
    excerpt: { en: "Displaying handcrafted textiles, upcycled accessories, and lifestyle goods created by community members to fund emergency mutual-aid bail tins." },
    fullStory: { en: "As part of AWC's social enterprise initiative, this artisan exhibition showcased the creative entrepreneurship of community members. 100% of proceeds generated from sales were reinvested directly into regional emergency bail and nutritional support funds across provincial districts." },
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    cat: { en: "Legal Defense" },
    date: "AUG 19, 2026",
    location: { en: "Galle Community House" },
    title: { en: "Frontline Defense: Community Paralegal Certification" },
    excerpt: { en: "Training 35 peer focal points with rapid-response legal accompaniment protocols, station bail procedures, and human rights documentation." },
    fullStory: { en: "Conducted alongside human rights attorneys, this intensive workshop certified regional leaders to act as immediate first responders during police roundups. Participants learned constitutional rights under Articles 11 and 13, emergency legal intervention tactics, and secure evidence preservation." },
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    cat: { en: "Healthcare & Care" },
    date: "JUL 10, 2026",
    location: { en: "Negombo Outreach Hub" },
    title: { en: "Health With Dignity: Stigma-Free Mobile Screening Clinic" },
    excerpt: { en: "Delivering voluntary confidential health checkups, PrEP/PEP counseling, STI screening, and mental health decompression circles." },
    fullStory: { en: "In collaboration with sensitized medical practitioners, AWC hosted a confidential wellness clinic. Peer navigators facilitated stigma-free consultations, safe testing, and psycho-social trauma healing spaces for over 90 community members." },
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Event Detail Modal Component
function EventDetailModal({
  event,
  onClose,
  resolveText,
}: {
  event: EventItem;
  onClose: () => void;
  resolveText: (val: Record<string, string> | string | undefined, fallback?: string) => string;
}) {
  const { getAsset, getAssetUrl } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const title = resolveText(event.title, "Community Event");
  const category = resolveText(event.cat, "Advocacy");
  const date = event.date || "Recent Event";
  const location = resolveText(event.location, "Sri Lanka");
  const excerpt = resolveText(event.excerpt, "");
  const fullStory = resolveText(event.fullStory || event.full_story, excerpt);
  const mainImg = resolveAsset(
    event.img || event.cover_image,
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
  );

  const rawGallery = event.gallery || event.gallery_images || [];
  const galleryPhotos = rawGallery.map((g) => resolveAsset(g)).filter(Boolean);

  const handleShare = (platform: "facebook" | "whatsapp" | "copy") => {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/gallery?event=${event.id}` : "";
    const shareText = `${title} • Abhimani Women's Collective Sri Lanka`;

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        "_blank",
        "width=600,height=500"
      );
    } else if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-md font-bold text-sm cursor-pointer backdrop-blur-sm"
          aria-label="Close Event Modal"
        >
          ✕
        </button>

        {/* Cover Photo */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-gray-900">
          <Image
            src={mainImg}
            fill
            alt={title}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E84E2D] text-white px-3 py-1 rounded-full shadow-sm inline-block mb-2">
              {category}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[55vh] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-orange-100 text-xs">
            <div className="flex items-center gap-2 text-[#58214D] font-bold">
              <span>📅</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-[#58214D] font-bold">
              <span>📍</span>
              <span>{location}</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#E84E2D] bg-orange-100/70 px-3 py-1 rounded-full">
              AWC Archive
            </div>
          </div>

          <div className="space-y-3 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {excerpt && <p className="font-semibold text-gray-900">{excerpt}</p>}
            <p>{fullStory}</p>
          </div>

          {/* Photo Gallery Grid */}
          {galleryPhotos.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#58214D] block mb-3">
                Event Photo Gallery
              </span>
              <div className="grid grid-cols-2 gap-4">
                {galleryPhotos.map((gImg, gIdx) => (
                  <div key={gIdx} className="relative h-36 md:h-48 rounded-2xl overflow-hidden border border-gray-100">
                    <Image src={gImg} fill alt="Event Gallery" className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Bar */}
          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#58214D] mr-auto">
              Share Event:
            </span>

            <button
              onClick={() => handleShare("facebook")}
              className="px-4 py-2 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              Facebook
            </button>

            <button
              onClick={() => handleShare("whatsapp")}
              className="px-4 py-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              WhatsApp
            </button>

            <button
              onClick={() => handleShare("copy")}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all border border-gray-200 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? (
                <span className="text-[#E84E2D] font-bold">Link Copied! ✓</span>
              ) : (
                <span>🔗 Copy Link</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main Gallery Page
export default function GalleryPage() {
  const { t, getAsset, getAssetUrl, locale } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;
  const [eventsList, setEventsList] = useState<EventItem[]>(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setEventsList(data);
          }
        }
      } catch (err) {
        console.warn("Using offline AWC event defaults:", err);
      }
    };

    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen for admin messages / deep-linking
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === "AWC_RELOAD_COLLECTION" || event.data?.type === "TET_RELOAD_COLLECTION") {
        try {
          const res = await fetch(`${API_BASE}/api/events`);
          if (res.ok) {
            const data = await res.json();
            setEventsList(data);
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (event.data?.type === "AWC_OPEN_MODAL" || event.data?.type === "TET_OPEN_MODAL") {
        const ev = eventsList.find((e) => e.id === Number(event.data.id));
        if (ev) setSelectedEvent(ev);
      }

      if (event.data?.type === "AWC_CLOSE_MODAL" || event.data?.type === "TET_CLOSE_MODAL") {
        setSelectedEvent(null);
      }

      if (event.data?.type === "AWC_SCROLL_TO_SECTION" || event.data?.type === "TET_SCROLL_TO_SECTION") {
        const { sectionId, eventId } = event.data;
        const targetId = eventId ? `event-card-${eventId}` : sectionId;
        const target = document.getElementById(targetId);
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [eventsList]);

  const resolveText = (val: Record<string, string> | string | undefined, fallback: string = "") => {
    if (!val) return fallback;
    if (typeof val === "object") return val[locale] || val["en"] || Object.values(val)[0] || fallback;
    return String(val);
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 selection:bg-[#FBE8E3] selection:text-[#E84E2D] min-h-screen overflow-x-hidden scroll-smooth">
      
      {/* 1. HEADER SECTION */}
      <section id="gallery-hero" className="scroll-mt-28 py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#E84E2D] font-bold tracking-[0.3em] text-[11px] uppercase mb-4 px-4 py-1.5 bg-orange-100/80 rounded-full inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E84E2D] animate-pulse"></span>
              {t("gl_events_tag", "COMMUNITY ARCHIVE • GATHERINGS & MILESTONES")}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] mb-4 tracking-tight leading-[1.12]">
              {t("gl_gallery_title", "Moments of Resistance")} <br />
              <span className="text-[#58214D] italic font-normal">
                &amp; Collective Care
              </span>
            </h1>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {t(
                "gl_gallery_desc",
                "Explore our ongoing community gatherings, rights workshops, legal advocacy summits, and artisan collectives across Sri Lanka."
              )}
            </p>
          </motion.div>

          {/* 2. DYNAMIC EVENTS GRID */}
          <div id="gallery-events" className="scroll-mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {eventsList.map((event, i) => {
              const title = resolveText(event.title, "Community Event");
              const category = resolveText(event.cat, "Advocacy");
              const location = resolveText(event.location, "Sri Lanka");
              const excerpt = resolveText(event.excerpt);
              const date = event.date || "Upcoming";
              const imgSrc = resolveAsset(
                event.img || event.cover_image,
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              );

              return (
                <motion.div
                  key={event.id}
                  id={`event-card-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedEvent(event)}
                  className="scroll-mt-32 group bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#58214D]/40 transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={imgSrc}
                        fill
                        alt={title}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#58214D] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
                          {category}
                        </span>
                        <span className="text-[10px] font-bold text-white bg-[#E84E2D] px-3 py-1 rounded-full shadow-xs">
                          {date}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 text-white text-xs font-medium flex items-center gap-1.5 opacity-90">
                        <span>📍</span>
                        <span className="truncate">{location}</span>
                      </div>
                    </div>

                    <div className="p-6 md:p-7">
                      <h3 className="font-serif text-xl font-bold text-[#141414] mb-2.5 leading-snug group-hover:text-[#58214D] transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-gray-100 text-[11px] font-bold">
                    <span className="text-[#58214D] group-hover:text-[#E84E2D] group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                      <span>Read Details &amp; Gallery</span>
                      <span>→</span>
                    </span>
                    <span className="text-gray-400">AWC Archive</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EVENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal
            key={selectedEvent.id}
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            resolveText={resolveText}
          />
        )}
      </AnimatePresence>
    </div>
  );
}