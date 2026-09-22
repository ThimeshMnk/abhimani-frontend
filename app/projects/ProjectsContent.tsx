"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface ProgramItem {
  id: number;
  cat: string;
  title1: string;
  title2: string;
  desc: string;
  longDesc: string;
  status: string;
  statsLabel: string;
  statsVal: string;
  images: string[];
}

const defaultPrograms: ProgramItem[] = [
  {
    id: 1,
    cat: "24/7 Crisis Intervention",
    title1: "Emergency Bail &",
    title2: "Legal Accompaniment",
    desc: "Rapid-response legal defense, court accompaniment, and a revolving bail fund preventing prolonged, arbitrary detention of sex workers across Sri Lanka.",
    longDesc:
      "Archaic colonial statutes—particularly the 1841 Vagrants Ordinance—are weaponized to arbitrarily detain female and transgender sex workers. AWC maintains a 24/7 emergency response hotline. When an arrest occurs, our on-call paralegals and pro-bono attorneys arrive at police stations within hours to secure release, pay bail bonds, document violations, and halt custodial extortion.\n\nOver the past 5 years, this survivor-led initiative has secured over 3,200 emergency releases and provided legal literacy training to over 5,000 community members across 12 districts.",
    status: "24/7 Active Hotline",
    statsLabel: "Emergency Releases",
    statsVal: "3,200+",
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    id: 2,
    cat: "Healthcare & Harm Reduction",
    title1: "Peer Healthcare &",
    title2: "Harm Reduction Access",
    desc: "Community-delivered sexual and reproductive health screenings, confidential HIV/STI prevention, hormone guidance, and non-judgmental counseling.",
    longDesc:
      "Fear of stigma and moral policing prevents many sex workers from seeking medical care at public hospitals. AWC bridges this divide through trained peer health workers. We run mobile screening drives, distribute barrier contraception, coordinate pre- and post-exposure prophylaxis (PrEP/PEP), and connect transgender peers to sensitized healthcare professionals.\n\nAll services are provided with absolute confidentiality and without moral conditions or forced rehabilitation.",
    status: "Island-Wide Outreach",
    statsLabel: "Health Checkups",
    statsVal: "10,000+",
    images: [
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    id: 3,
    cat: "Protection & Safe Shelter",
    title1: "Transitional Safe Houses &",
    title2: "Crisis Relief",
    desc: "Confidential safe shelters offering dignified transitional living, daily nutrition, and mutual-aid supplies for individuals escaping raids or sudden eviction.",
    longDesc:
      "Sudden evictions, landlord harassment, and targeted crackdowns frequently leave workers homeless overnight. AWC operates confidential, peer-managed safe houses in key metropolitan areas. Residents receive secure accommodation, daily nutrition, mental wellness support, and assistance in replacing identity documents so they can regain independence on their own terms.\n\nDuring economic crises, our safe houses double as community distribution hubs delivering essential food rations and hygiene kits.",
    status: "Confidential Sanctuaries",
    statsLabel: "Nights of Shelter",
    statsVal: "8,500+",
    images: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1000&q=80",
    ],
  },
  {
    id: 4,
    cat: "Systemic Law Reform",
    title1: "Decriminalisation &",
    title2: "Policy Reform",
    desc: "Direct advocacy with parliamentary caucuses, national human rights commissions, and judicial benches to repeal colonial-era vagrancy ordinances.",
    longDesc:
      "True protection requires abolishing punitive laws. AWC leads national consultations advocating for the repeal of the 1841 Vagrants Ordinance and the Brothels Ordinance of 1889. We bring lived-experience documentation directly into high-level policy spaces, training police superintendents on human rights, and advising legislators on decriminalisation models that prioritize worker safety, health, and legal protections.",
    status: "Policy Action",
    statsLabel: "Submissions Drafted",
    statsVal: "14 Briefs",
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    ],
  },
];

// Interactive Program Card with Multi-Image Thumbnail Switcher
function ProgramCard({
  program,
  onOpenDetails,
}: {
  program: ProgramItem;
  onOpenDetails: (p: ProgramItem) => void;
}) {
  const { isPreview } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <motion.div
      id={`program-card-${program.id}`}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="scroll-mt-32 bg-white rounded-3xl md:rounded-[2.5rem] border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#58214D]/40 transition-all flex flex-col overflow-hidden group"
    >
      {/* Image Viewer */}
      <div className="p-4 pb-0">
        <div className="relative h-64 sm:h-72 w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full"
            >
              <Image
                src={program.images[activeImageIndex] || program.images[0]}
                fill
                alt={program.title1}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={isPreview}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#58214D] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xs">
              {program.cat}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 right-4">
            <span className="text-[10px] font-bold text-white bg-[#E84E2D] px-3 py-1 rounded-full shadow-sm">
              {program.status}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex items-center gap-2 pt-3 pb-1 px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1">
            Gallery:
          </span>
          {program.images.map((imgSrc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex(idx);
              }}
              className={`relative h-11 w-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? "border-[#E84E2D] scale-105 shadow-sm"
                  : "border-gray-200 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={imgSrc}
                fill
                alt={`Thumb ${idx + 1}`}
                className="object-cover"
                unoptimized={isPreview}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#141414] mb-3 leading-snug">
            {program.title1}{" "}
            <span className="text-[#58214D] italic font-normal">
              {program.title2}
            </span>
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
            {program.desc}
          </p>
        </div>

        {/* Footer Bar */}
        <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-lg font-serif font-bold text-[#E84E2D] block leading-none">
              {program.statsVal}
            </span>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              {program.statsLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenDetails(program)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#58214D] hover:text-[#E84E2D] transition-colors uppercase tracking-wider group-hover:translate-x-1 cursor-pointer"
          >
            <span>Case Study</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Case Study Detail Modal
function ProgramDetailModal({
  program,
  onClose,
}: {
  program: ProgramItem;
  onClose: () => void;
}) {
  const { isPreview } = useLanguage();
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm"
        >
          ✕
        </button>

        {/* Gallery Hero Header */}
        <div className="relative h-72 sm:h-96 w-full bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={modalImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full"
            >
              <Image
                src={program.images[modalImageIndex] || program.images[0]}
                fill
                alt={program.title1}
                className="object-cover"
                unoptimized={isPreview}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          {/* Badges */}
          <div className="absolute top-5 left-5 flex gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#58214D] bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md">
              {program.cat}
            </span>
            <span className="text-[11px] font-bold text-white bg-[#E84E2D] px-4 py-1.5 rounded-full">
              {program.status}
            </span>
          </div>

          {/* Modal Thumbnails */}
          <div className="absolute bottom-4 left-5 right-5 flex items-center gap-2">
            {program.images.map((imgSrc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setModalImageIndex(idx)}
                className={`relative h-12 w-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  modalImageIndex === idx
                    ? "border-[#E84E2D] scale-105 shadow-md"
                    : "border-white/60 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={imgSrc}
                  fill
                  alt="Thumbnail"
                  className="object-cover"
                  unoptimized={isPreview}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Modal Story Content */}
        <div className="p-8 sm:p-12 overflow-y-auto max-h-[50vh]">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141414] mb-3 leading-tight">
            {program.title1}{" "}
            <span className="text-[#58214D] italic font-normal">
              {program.title2}
            </span>
          </h2>

          <div className="w-12 h-1 bg-[#E84E2D] rounded-full mb-6"></div>

          <h4 className="text-xs font-bold uppercase tracking-widest text-[#58214D] mb-3">
            Program Impact &amp; Field Methodology
          </h4>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8">
            {program.longDesc}
          </p>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#58214D] block">
                Abhimani Women&apos;s Collective
              </span>
              <span className="text-xs text-gray-600 font-medium">
                Documented Human Rights Initiative • Sri Lanka
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#58214D] hover:bg-[#45183c] text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Our Work Page
export default function WorkPage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 selection:bg-[#FBE8E3] selection:text-[#E84E2D] overflow-x-hidden scroll-smooth">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section 
        id="work-hero" 
        className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center"
      >
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <span className="text-[#E84E2D] font-bold tracking-[0.3em] text-[11px] uppercase mb-4 px-4 py-1.5 bg-orange-100/80 rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E84E2D] animate-pulse"></span>
            OUR WORK &amp; PROGRAMS • SRI LANKA
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-[#141414] mb-6 tracking-tight leading-[1.1]">
            Frontline Action. <br />
            <span className="text-[#58214D] italic font-normal">Systemic Liberation.</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            From midnight police station lockups to high-level parliamentary reform delegations, Abhimani Women&apos;s Collective operates a multi-tiered defense and support system for female and transgender sex workers across Sri Lanka.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-700">
            <a href="#legal" className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-[#E84E2D] hover:text-[#E84E2D] transition-colors">
              Emergency Legal Aid
            </a>
            <a href="#health" className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-[#E84E2D] hover:text-[#E84E2D] transition-colors">
              Peer Healthcare
            </a>
            <a href="#shelter" className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-[#E84E2D] hover:text-[#E84E2D] transition-colors">
              Safe Shelters
            </a>
            <a href="#shop-enterprise" className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-[#E84E2D] hover:text-[#E84E2D] transition-colors">
              Social Enterprise
            </a>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROGRAM CARDS GRID */}
      {/* ========================================================================= */}
      <section 
        id="programs-grid" 
        className="scroll-mt-28 pb-24 max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {defaultPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onOpenDetails={(p) => setSelectedProgram(p)}
            />
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SOCIAL ENTERPRISE / ARTISAN SHOP FEATURE */}
      {/* ========================================================================= */}
      <section 
        id="shop-enterprise" 
        className="scroll-mt-28 py-20 bg-white border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#58214D] text-white rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7">
              <span className="text-[#EFB9C5] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
                Livelihood Autonomy • Social Enterprise
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Economic Liberation Through Artisan Craftsmanship.
              </h2>
              <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                True freedom requires economic choices. Our survivor-run social enterprise trains community members in upcycled textiles, traditional hand-weaving, and sustainable lifestyle goods. 100% of proceeds fund emergency bail relief and survivor survival stipends.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  Visit The Artisan Shop
                </Link>
                <Link
                  href="/shop#catalog"
                  className="border border-white/40 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all"
                >
                  View Products Catalog
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-80 lg:h-full min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
                alt="AWC Artisan Crafts & Ethical Merchandise"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TOOLKITS & RESOURCES PREVIEW */}
      {/* ========================================================================= */}
      <section 
        id="resources-preview" 
        className="py-20 bg-[#FAF8F5] border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">
                Knowledge That Shields
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141414] mb-4">
                Toolkits, Research &amp; Rights Guides
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Knowledge is frontline protection. We publish practical pocket manuals in Sinhala, Tamil, and English outlining constitutional rights during police stops, legal defense protocols, and peer health guidelines.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Pocket Guide: Constitutional Rights During Police Arrests (Trilingual)",
                  "Community Healthcare & Harm Reduction Field Handbook",
                  "Law Reform Submission: Repealing Sri Lanka's 1841 Vagrants Ordinance",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200/70">
                    <span className="text-[#E84E2D] text-sm">📄</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#58214D] hover:text-[#E84E2D] uppercase tracking-widest transition-colors"
              >
                <span>Browse All Downloads &amp; Publications</span>
                <span>→</span>
              </Link>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80"
                alt="Legal rights publications"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CALL TO ACTION: GET INVOLVED & PARTNERSHIPS */}
      {/* ========================================================================= */}
      <section 
        id="work-cta" 
        className="py-20 bg-[#181818] text-white border-t border-gray-800"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
            Stand With Frontline Defenders
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Partner With Our Initiatives in Sri Lanka
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Whether you are an attorney offering pro-bono bail defense, an institution seeking ethical corporate procurement, or an individual donor supporting crisis safe houses—your solidarity powers our autonomy.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/donate"
              className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Donate to the Bail Fund
            </Link>
            <Link
              href="/get-involved"
              className="border border-white/40 hover:bg-white/10 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              Explore Partnerships
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              Contact Program Leads
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MODAL DETAIL VIEW */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramDetailModal
            key={selectedProgram.id}
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}