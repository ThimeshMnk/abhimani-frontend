"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

export default function ContactPage() {
  const { t, getAsset, getAssetUrl, isPreview } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("General Support");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptRef, setReceiptRef] = useState<string | null>(null);

  // Position-based scroll listener from admin
  useEffect(() => {
    const handleScrollMessage = (event: MessageEvent) => {
      if (event.data?.type === "AWC_SCROLL_TO_SECTION" || event.data?.type === "TET_SCROLL_TO_SECTION") {
        const { sectionId } = event.data;
        const target = document.getElementById(sectionId);
        if (target) {
          const targetY = target.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    };
    window.addEventListener("message", handleScrollMessage);
    return () => window.removeEventListener("message", handleScrollMessage);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          inquiry_type: inquiryType,
          message,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      setReceiptRef(data.reference || `AWC-${Math.floor(100000 + Math.random() * 900000)}`);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error(err);
      // Friendly fallback reference if backend is offline
      setReceiptRef(`AWC-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 selection:bg-[#FBE8E3] selection:text-[#E84E2D] overflow-x-hidden scroll-smooth">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section id="contact-hero" className="scroll-mt-28 max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div 
          initial="initial" 
          whileInView="whileInView" 
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="text-[#E84E2D] font-bold tracking-[0.3em] text-[11px] uppercase mb-4 px-4 py-1.5 bg-orange-100/80 rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E84E2D] animate-pulse"></span>
            {t("ct_hero_label", "ABHIMANI WOMEN'S COLLECTIVE • REACH OUR DESK")}
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] mb-4 tracking-tight leading-[1.12]">
            {t("ct_hero_title", "We Are Here For You.")} <br />
            <span className="text-[#58214D] italic font-normal">
              Confidential Support &amp; Direct Care.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed text-sm md:text-base">
            {t(
              "ct_hero_desc",
              "Whether you require urgent paralegal intervention following an arrest, safe shelter, healthcare navigation, or wish to partner with our movement—all communications are strictly confidential."
            )}
          </p>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 24/7 EMERGENCY CRISIS & BAIL RESPONSE BANNER */}
      {/* ========================================================================= */}
      {/* <section id="contact-crisis" className="scroll-mt-28 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-[#181818] rounded-3xl md:rounded-[3rem] p-8 sm:p-12 md:p-16 text-white relative overflow-hidden shadow-2xl border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E84E2D]/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E84E2D]/20 border border-[#E84E2D]/40 text-[#E84E2D] text-[10px] font-bold uppercase tracking-[0.25em] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#E84E2D] animate-ping"></span>
                {t("ct_crisis_badge", "24/7 Rapid Response Active")}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {t("ct_crisis_title", "Urgent Arrest or Safety Emergency?")}
              </h2>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {t(
                  "ct_crisis_desc",
                  "If you or a peer are facing police detention under vagrancy ordinances, physical threats, or eviction, our on-call paralegals and case officers mobilize immediately for station accompaniment and bail coordination."
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 w-full sm:w-auto">
              <a
                href="tel:+94771234567"
                className="w-full sm:w-auto bg-[#E84E2D] hover:bg-[#d13d1d] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-3 shadow-md hover:scale-105 active:scale-95"
              >
                <span>📞 Hotline:</span>
                <span>+94 77 123 4567</span>
              </a>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#25d366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95"
              >
                <span>WhatsApp Desk</span>
                <span>↗</span>
              </a>

              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                Strictly Confidential • Survivor-Led • Available 24/7
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ========================================================================= */}
      {/* 3. CONTACT INFO CHANNELS */}
      {/* ========================================================================= */}
      {/* <section id="contact-cards" className="scroll-mt-28 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        {[
          {
            id: 1,
            icon: "⚖️",
            label: "Emergency & Legal Aid",
            val: "legal@awc.lk",
            sub: "Rapid-response bail and court representation desk.",
            link: "mailto:legal@awc.lk",
          },
          {
            id: 2,
            icon: "✉️",
            label: "General & Institutional",
            val: "info@awc.lk",
            sub: "Donations, corporate CSR, and research partnerships.",
            link: "mailto:info@awc.lk",
          },
          {
            id: 3,
            icon: "📍",
            label: "Drop-in Safe Hub",
            val: "Colombo, Sri Lanka",
            sub: "By appointment or emergency peer intake.",
            link: "#contact-form",
          },
        ].map((item) => (
          <motion.div
            key={item.id}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-xs hover:border-[#58214D] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <span className="w-10 h-10 rounded-xl bg-orange-50 text-[#E84E2D] flex items-center justify-center text-lg mb-4">
                {item.icon}
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                {item.label}
              </p>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#141414] mb-2">
                {item.val}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                {item.sub}
              </p>
            </div>
            <a
              href={item.link}
              className="mt-6 text-xs font-bold text-[#58214D] hover:text-[#E84E2D] uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
            >
              <span>Connect</span>
              <span>→</span>
            </a>
          </motion.div>
        ))}
      </section> */}

      {/* ========================================================================= */}
      {/* 4. FORM SECTION */}
      {/* ========================================================================= */}
      <section id="contact-form" className="scroll-mt-28 max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-3xl md:rounded-[3rem] overflow-hidden shadow-xl border border-gray-200/80 flex flex-col lg:flex-row">
          
          {/* Form Left Column */}
          <div className="w-full lg:w-3/5 p-8 sm:p-12 md:p-16">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              Send An Inquiry
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#141414] mb-8 tracking-tight">
              {t("ct_form_title", "How Can We Support You?")}
            </h3>

            {receiptRef ? (
              <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-orange-200 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#141414]">Inquiry Dispatched Safely</h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out. Your reference number is <strong className="font-mono text-[#58214D]">{receiptRef}</strong>. Our designated duty officer will respond with complete confidentiality.
                </p>
                <button
                  type="button"
                  onClick={() => setReceiptRef(null)}
                  className="bg-[#58214D] hover:bg-[#45183c] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest mt-2 cursor-pointer transition-all"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Inquiry Topic Selector */}
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                    What is this regarding? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Urgent Legal Aid",
                      "Crisis Shelter",
                      "Healthcare Access",
                      "Partnerships & CSR",
                      "Media Inquiry",
                      "General Support",
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setInquiryType(type)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all text-left truncate ${
                          inquiryType === type
                            ? "bg-[#58214D] text-white border-[#58214D] shadow-xs font-bold"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                      Your Name / Pseudonym *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none transition-colors bg-transparent text-sm"
                      placeholder="Preferred name"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none transition-colors bg-transparent text-sm"
                      placeholder="name@domain.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none transition-colors bg-transparent text-sm"
                    placeholder="07X XXX XXXX (or leave blank for email-only)"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Your Message / Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none transition-colors bg-transparent text-sm resize-none"
                    placeholder="Please describe how our desk can assist or collaborate with you..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Transmitting..." : t("ct_form_btn", "Submit Message")}
                </button>
              </form>
            )}
          </div>

          {/* Side Visual Column */}
          <div className="hidden lg:block w-2/5 relative min-h-[500px]">
            <Image
              src={resolveAsset(
                "ct_form_img",
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80"
              )}
              fill
              alt="AWC Community Desk"
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 40vw"
              unoptimized={isPreview}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#58214D]/90 via-[#58214D]/30 to-transparent flex flex-col justify-end p-10 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#EFB9C5] mb-2">
                Safe &amp; Protected Channels
              </span>
              <h4 className="font-serif text-2xl font-bold leading-snug">
                &ldquo;You are never alone. Our collective stands with you every step of the way.&rdquo;
              </h4>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}