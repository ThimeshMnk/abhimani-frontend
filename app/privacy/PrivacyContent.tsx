"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

interface PrivacySection {
  id: number;
  title: Record<string, string> | string;
  content: Record<string, string> | string;
  bullets?: Array<Record<string, string> | string>;
}

const defaultPrivacySections: PrivacySection[] = [
  {
    id: 1,
    title: "1. Our Foundational Commitment: Absolute Confidentiality",
    content:
      "Abhimani Women's Collective (AWC) operates as a survivor-led support network in Sri Lanka. Given the stigma and criminalisation affecting female and transgender sex workers, protecting your personal identity, safety, and communications is our highest ethical priority.",
  },
  {
    id: 2,
    title: "2. Information We Collect",
    content: "We only collect data that is strictly necessary for frontline care, safety, and accounting transparency:",
    bullets: [
      "Emergency Helpline & Legal Inquiries: Any phone number, pseudonym, or location shared during a crisis call is used strictly for immediate station accompaniment or safe-house intake. We do not maintain unencrypted logs of caller identities.",
      "Donations: When you contribute via card or bank transfer, your transaction reference and email are used solely to issue tax/receipt confirmations. We support and respect 100% anonymous giving.",
      "Social Enterprise / Shop Orders: Names, delivery addresses, and phone numbers provided when purchasing artisan crafts are used solely to fulfill islandwide delivery and are never sold or shared.",
      "Volunteer Applications: Data submitted via our volunteer registry is accessed exclusively by designated AWC coordinators.",
    ],
  },
  {
    id: 3,
    title: "3. Non-Disclosure & Information Sharing",
    content:
      "AWC will never sell, rent, commercialize, or trade your personal data. We do not share community records or intake information with law enforcement, government bodies, or third parties unless mandated by a specific, lawful warrant issued by a competent court of law, after exhausting all legal challenges.",
  },
  {
    id: 4,
    title: "4. Data Security & Encryption",
    content:
      "All traffic between your browser and our platform is encrypted via industry-standard 256-bit SSL (Transport Layer Security). Contact form submissions and donor records are stored on secure, access-restricted servers.",
  },
  {
    id: 5,
    title: "5. Your Rights Over Your Data",
    content:
      "You have the right to request a summary of any personal data we hold about you, or request the immediate deletion or anonymization of your records at any time by contacting our desk.",
  },
];

export default function PrivacyContent() {
  const { t, locale } = useLanguage();
  const [sections, setSections] = useState<PrivacySection[]>(defaultPrivacySections);
  const [lastUpdated, setLastUpdated] = useState<string>("March 2026");

  // 1. Fetch dynamic privacy page content from backend
  useEffect(() => {
    let isMounted = true;
    const loadPrivacy = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/pages/privacy`);
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
        console.warn("Using offline privacy defaults:", err);
      }
    };
    loadPrivacy();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Listen for Livewire Admin panel updates
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (
        event.data?.type === "AWC_RELOAD_PRIVACY" ||
        event.data?.type === "AWC_RELOAD_COLLECTION" ||
        event.data?.type === "TET_RELOAD_COLLECTION"
      ) {
        try {
          const res = await fetch(`${API_BASE}/api/pages/privacy`);
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
            {t("privacy_badge", "Security & Trust")}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#141414] mb-4">
            {t("privacy_title_1", "Privacy Policy & ")}
            <span className="text-[#58214D] italic font-normal">
              {t("privacy_title_2", "Confidentiality Charter")}
            </span>
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            {t("privacy_meta", `Last Updated: ${lastUpdated} • Effective Date: January 1, 2026`)}
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
              <p className="whitespace-pre-line mb-3">
                {resolveText(sec.content)}
              </p>
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="list-disc pl-5 space-y-2">
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{resolveText(b)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="font-bold text-[#58214D] text-xs uppercase tracking-wider block">
                {t("privacy_contact_title", "Questions or Data Requests?")}
              </span>
              <p className="text-gray-500 text-xs">
                {t("privacy_contact_desc", "Reach out to our designated confidentiality liaison:")}
              </p>
            </div>
            <a
              href="mailto:info@awc.lk"
              className="bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
            >
              {t("privacy_contact_btn", "Email info@awc.lk")}
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}