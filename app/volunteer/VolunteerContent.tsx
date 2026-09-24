"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { pickLang, usePageCards } from "../lib/pageCards";
import { usePreviewScroll } from "../lib/usePreviewScroll";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const volunteerTracks = [
  {
    icon: "⚖️",
    title: "Pro-Bono Legal & Paralegal Support",
    desc: "Licensed attorneys, apprentice lawyers, and legal researchers assisting with emergency bail filings, police station visits, and fundamental rights petitions.",
  },
  {
    icon: "🩺",
    title: "Healthcare & Mental Wellness Ally",
    desc: "Sensitized doctors, nurses, counselors, and psychotherapists providing stigma-free health screenings and trauma-informed peer therapy.",
  },
  {
    icon: "🌐",
    title: "Trilingual Translation & Digital Media",
    desc: "Translating rights toolkits between Sinhala, Tamil, and English, content writing, video editing, and digital security support.",
  },
  {
    icon: "📦",
    title: "Emergency Shelter & Mutual Aid Logistics",
    desc: "Packing food rations, sorting hygiene dignity kits, assisting with artisan craft packaging, and supporting transitional safe houses.",
  },
];

export default function VolunteerContent() {
  const { t, getAsset, getAssetUrl, isPreview, locale } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;
  usePreviewScroll();
  const roleCards = usePageCards("volunteer_roles");
  const tracks = roleCards.length
    ? roleCards.map((card, idx) => ({
        icon: card.icon || volunteerTracks[idx]?.icon || "🤝",
        title: pickLang(card.title, locale, volunteerTracks[idx]?.title || ""),
        desc: pickLang(card.description, locale, volunteerTracks[idx]?.desc || ""),
        tag: pickLang(card.tag, locale),
      }))
    : [1, 2, 3, 4].map((idx) => {
        const fallback = volunteerTracks[idx - 1];
        return {
          icon: t(`v_youth_${idx}_icon`, fallback.icon),
          title: t(`v_youth_${idx}_title`, fallback.title),
          desc: t(`v_youth_${idx}_desc`, fallback.desc),
          tag: t(`v_youth_${idx}_tag`, ""),
        };
      });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [track, setTrack] = useState(volunteerTracks[0].title);

  useEffect(() => {
    if (tracks.length && !tracks.some((role) => role.title === track)) {
      setTrack(tracks[0].title);
    }
  }, [tracks, track]);
  const [availability, setAvailability] = useState("Flexible / On-Call");
  const [experience, setExperience] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/volunteers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          track,
          availability,
          experience,
        }),
      });

      if (!res.ok) throw new Error("Submission error");

      const data = await res.json();
      setReference(data.reference);
      setName("");
      setEmail("");
      setPhone("");
      setExperience("");
    } catch {
      setReference(null);
      alert("We could not send your volunteer application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 selection:bg-[#FBE8E3] selection:text-[#E84E2D] min-h-screen">
      
      {/* 1. HERO */}
      <section id="volunteer-hero" className="scroll-mt-28 py-16 md:py-24 px-6 bg-white border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={fadeInUp}>
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] px-4 py-1.5 bg-orange-100/80 rounded-full inline-block mb-4">
              {t("v_hero_label", "Community Solidarity • Join Our Ranks")}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] mb-5 tracking-tight leading-[1.12]">
              {t("v_hero_title1", "Stand With Us.")} <br />
              <span className="text-[#58214D] italic font-normal">{t("v_hero_title2", "Volunteer Your Skills.")}</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-6">
              {t(
                "v_hero_desc",
                "Frontline justice requires a dedicated network of allies. Whether you can offer legal expertise, medical care, digital design, or crisis mutual aid, your solidarity directly strengthens our survivor-led collective.",
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-wider">
              <a
                href="#volunteer-form"
                className="bg-[#58214D] hover:bg-[#45183c] text-white px-7 py-3.5 rounded-full transition-all shadow-sm"
              >
                {t("v_hero_btn1", "Apply As A Volunteer")}
              </a>
              <Link
                href="/contact"
                className="bg-white border border-gray-300 hover:border-gray-800 text-gray-800 px-7 py-3.5 rounded-full transition-all"
              >
                {t("v_hero_btn2", "Inquire via Contact Desk")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. VOLUNTEER TRACKS GRID */}
      <section id="volunteer-youth" className="scroll-mt-28 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
            {t("v_youth_label", "Where You Can Support")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141414]">
            {t("v_youth_title", "Volunteer Pathways & Roles")}
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            {t("v_youth_desc", "")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((role, idx) => (

            <motion.div
              key={idx}
              id={`volunteer-role-${idx + 1}`}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="scroll-mt-28 p-8 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#58214D] hover:shadow-md transition-all flex items-start gap-5"
            >
              <span className="text-3xl p-3 bg-[#FAF8F5] rounded-2xl border border-gray-100 flex-shrink-0">
                {role.icon}
              </span>
              <div>
                {role.tag ? (
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#E84E2D] mb-1">
                    {role.tag}
                  </p>
                ) : null}
                <h3 className="font-serif font-bold text-xl text-[#141414] mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {role.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. APPLICATION FORM */}
      <section id="volunteer-form" className="scroll-mt-28 py-16 px-6 max-w-4xl mx-auto pb-24">
        <div className="bg-white rounded-3xl md:rounded-[3rem] p-8 sm:p-12 md:p-16 shadow-xl border border-gray-200/80">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
              {t("v_form_tag", "Application Desk")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141414]">
              {t("v_form_title", "Volunteer Registry Form")}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              {t("v_form_desc", "All applications are kept strictly confidential and reviewed by our volunteer coordinator.")}
            </p>
          </div>

          {reference ? (
            <div className="p-8 bg-[#FAF8F5] rounded-3xl border border-orange-200 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-2xl mx-auto font-bold">
                ✓
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#141414]">Application Received!</h3>
              <p className="text-gray-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you for offering your solidarity. Your registration reference is{" "}
                <strong className="font-mono text-[#58214D]">{reference}</strong>. We will reach out when matching volunteer initiatives launch.
              </p>
              <button
                type="button"
                onClick={() => setReference(null)}
                className="bg-[#58214D] hover:bg-[#45183c] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest mt-2 cursor-pointer transition-all"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Select Pathway */}
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2 block">
                  Select Your Volunteer Track *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {tracks.map((role) => (
                    <button
                      type="button"
                      key={role.title}
                      onClick={() => setTrack(role.title)}
                      className={`p-3 rounded-xl text-xs text-left border transition-all truncate flex items-center gap-2 ${
                        track === role.title
                          ? "bg-[#58214D] text-white border-[#58214D] font-bold shadow-xs"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      <span>{role.icon}</span>
                      <span className="truncate">{role.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none text-sm bg-transparent"
                    placeholder="Your name"
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
                    className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none text-sm bg-transparent"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>

              {/* Phone & Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none text-sm bg-transparent"
                    placeholder="07X XXX XXXX"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                    Estimated Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none text-sm bg-transparent"
                  >
                    <option value="Flexible / On-Call">Flexible / On-Call</option>
                    <option value="1-3 Hours / Week">1-3 Hours / Week</option>
                    <option value="Weekends Only">Weekends Only</option>
                    <option value="Emergency Response Only">Emergency Response Only</option>
                  </select>
                </div>
              </div>

              {/* Skills and Background */}
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Relevant Skills, Background &amp; Motivation *
                </label>
                <textarea
                  rows={4}
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border-b-2 border-gray-200 py-3 focus:border-[#58214D] outline-none text-sm bg-transparent resize-none"
                  placeholder="Share a brief summary of your qualifications, language skills, or why you wish to stand with AWC..."
                ></textarea>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : t("v_form_btn", "Submit Volunteer Application")}
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

      {(t("v_footer_quote", "") || t("v_footer_cite", "")) && (
        <section id="volunteer-quote" className="scroll-mt-28 px-6 pb-20">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-2xl text-[#141414] italic">
              {t("v_footer_quote", "")}
            </p>
            {t("v_footer_cite", "") && (
              <cite className="block mt-4 text-sm text-gray-500 not-italic">
                {t("v_footer_cite", "")}
              </cite>
            )}
          </blockquote>
        </section>
      )}

    </div>
  );
}