"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

interface LegalSection {
  id: number;
  title: Record<string, string> | string;
  content: Record<string, string> | string;
}

const defaultSections: LegalSection[] = [
  {
    id: 1,
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using this website (awc.lk), purchasing goods through our artisan shop, or contributing to our emergency bail fund, you agree to comply with and be bound by these Terms of Service and our Confidentiality Charter.",
  },
  {
    id: 2,
    title: "2. Nature of Legal Information & Publications",
    content:
      "The pocket manuals, toolkits, and research documents available on this site are distributed for educational, human rights literacy, and self-advocacy purposes. While prepared alongside legal practitioners, these materials do not substitute for formal legal representation in a court of law. In active criminal or custodial emergencies, contact our 24/7 hotline (+94 77 123 4567) for designated paralegal accompaniment.",
  },
  {
    id: 3,
    title: "3. Donations & Emergency Bail Fund Allocation",
    content:
      "All donations made to Abhimani Women's Collective are treated as voluntary charitable gifts supporting our mission. Contributions are directed toward revolving police bail bonds, legal court filings, emergency food rations, and safe shelter operations. Donations are non-refundable once allocated to emergency frontline aid.",
  },
  {
    id: 4,
    title: "4. Social Enterprise & Artisan Shop Purchases",
    content:
      "All crafts, textiles, and handmade products are crafted by community survivors. Prices are listed in Sri Lankan Rupees (LKR). While we strive for consistency, slight variations in color and weave are natural characteristics of authentic handmade items. Orders are fulfilled through trusted local courier services across Sri Lanka.",
  },
  {
    id: 5,
    title: "5. Community Safety & Code of Conduct",
    content:
      "Any attempt to harass, dox, extort, or endanger community members, staff, or volunteers through this platform will result in immediate termination of access and may be subject to legal action under applicable laws of Sri Lanka.",
  },
  {
    id: 6,
    title: "6. Intellectual Property & Open Knowledge",
    content:
      "Our rights toolkits and publications are published under open-access principles for community empowerment. You are encouraged to distribute, translate, and print these guides for educational and community defense purposes, provided credit is given to Abhimani Women's Collective.",
  },
];

export default function TermsContent() {
  const { t, locale, data } = useLanguage();
  const [sections, setSections] = useState<LegalSection[]>(defaultSections);
  const [lastUpdated, setLastUpdated] = useState<string>("March 2026");

  // 1. Fetch dynamic terms page content from backend
  useEffect(() => {
    let isMounted = true;
    const loadTerms = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/pages/terms`);
        if (res.ok) {
          const resData = await res.json();
          if (isMounted) {
            if (Array.isArray(resData.sections) && resData.sections.length > 0) {
              setSections(resData.sections);
            }
            if (resData.last_updated) {
              setLastUpdated(resData.last_updated);
            }
          }
        }
      } catch (err) {
        console.warn("Using offline terms defaults:", err);
      }
    };
    loadTerms();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Listen for Livewire Admin panel updates
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (
        event.data?.type === "AWC_RELOAD_TERMS" ||
        event.data?.type === "AWC_RELOAD_COLLECTION" ||
        event.data?.type === "TET_RELOAD_COLLECTION"
      ) {
        try {
          const res = await fetch(`${API_BASE}/api/pages/terms`);
          if (res.ok) {
            const resData = await res.json();
            if (Array.isArray(resData.sections) && resData.sections.length > 0) {
              setSections(resData.sections);
            }
            if (resData.last_updated) {
              setLastUpdated(resData.last_updated);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const resolveText = (val: Record<string, string> | string | undefined, fallback = "") => {
    if (!val) return fallback;
    if (typeof val === "object") {
      return val[locale] || val["en"] || Object.values(val)[0] || fallback;
    }
    return String(val);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen text-slate-800 pb-24 selection:bg-[#FBE8E3] selection:text-[#E84E2D]">
      
      {/* Header */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-gray-200/70">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] px-4 py-1.5 bg-orange-100/80 rounded-full inline-block mb-4">
            {t("terms_badge", "Legal & Governance")}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#141414] mb-4">
            {t("terms_title_1", "Terms of Service & ")}
            <span className="text-[#58214D] italic font-normal">
              {t("terms_title_2", "Community Charter")}
            </span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            {t("terms_meta", `Last Updated: ${lastUpdated} • Governing Law: Democratic Socialist Republic of Sri Lanka`)}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 px-6 max-w-4xl mx-auto">
        <div className="bg-white p-8 sm:p-12 md:p-16 rounded-3xl md:rounded-[2.5rem] border border-gray-200/80 shadow-xs space-y-10 text-gray-700 text-sm leading-relaxed">
          
          {sections.map((sec) => (
            <div key={sec.id}>
              <h2 className="font-serif text-2xl font-bold text-[#141414] mb-3">
                {resolveText(sec.title)}
              </h2>
              <p className="whitespace-pre-line">
                {resolveText(sec.content)}
              </p>
            </div>
          ))}

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-gray-500 text-xs">
              {t("terms_contact_text", "For governance inquiries: legal@awc.lk")}
            </span>
            <Link
              href="/contact"
              className="text-xs font-bold text-[#E84E2D] hover:text-[#58214D] uppercase tracking-wider transition-colors"
            >
              {t("terms_contact_link", "Contact Administrative Desk →")}
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}