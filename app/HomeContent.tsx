"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "./context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomeContent() {
  const { getAsset, isPreview, t } = useLanguage();

  return (
    <div className="w-full bg-white text-[#2c3e50] selection:bg-[#FBE8E3] selection:text-[#E84E2D] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1ST FOLD: HERO + WE BELIEVE RIBBON (COVERS 100% OF INITIAL VIEWPORT) */}
      {/* ========================================================================= */}
      <div className="w-full min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] lg:min-h-[640px] flex flex-col justify-between">
        
        {/* HERO SECTION */}
        <section className="relative w-full flex-1 flex items-center bg-[#FAF8F5] py-8 lg:py-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={getAsset("hero_bg_image", "/images/hero.jpeg")}
              alt="Standing with sex workers"
              fill
              priority
              className="object-cover object-[75%_25%] lg:object-[82%_25%]"
              unoptimized={isPreview}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-40% md:via-50% to-transparent" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.08] font-bold text-[#141414] tracking-tight mb-5"
              >
                Standing with <br />
                sex workers, <br />
                <span className="text-[#58214D]">every step of</span> <br />
                <span className="text-[#58214D]">the way.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
              >
                Abhimani Women&apos;s Collective is a survivor-led organisation advocating for the rights, safety and wellbeing of female and transgender sex workers across Sri Lanka.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/projects"
                  className="bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold px-7 py-3.5 rounded-lg shadow-md transition-all flex items-center gap-2 group"
                >
                  <span>Explore Our Work</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/about"
                  className="bg-white/90 hover:bg-white text-[#222222] border border-gray-400 hover:border-gray-900 text-xs font-bold px-7 py-3.5 rounded-lg transition-all shadow-xs"
                >
                  Read Our Story
                </Link>
              </motion.div>
            </div>

            <div className="hidden lg:flex flex-col items-start pr-8 xl:pr-20 select-none pointer-events-none">
              <div className="font-script text-white text-4xl xl:text-5xl leading-[1.35] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                <div>Rights</div>
                <div>Dignity</div>
                <div>Safety</div>
                <div className="relative inline-block">
                  Community
                  <svg
                    className="w-24 h-4 text-[#E84E2D] absolute -bottom-2 left-0"
                    viewBox="0 0 100 20"
                    fill="none"
                  >
                    <path d="M3 14C30 4 75 6 97 12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WE BELIEVE DARK RIBBON (DOCKED FLUSH TO THE BOTTOM OF THE 1ST FOLD) */}
        <section className="bg-[#181818] text-white py-5 lg:py-6 border-t border-black/40 w-full m-0 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 items-center">
              <div className="lg:pr-8 lg:border-r lg:border-white/15 flex items-center">
                <h2 className="font-serif italic font-normal text-3xl sm:text-4xl text-white tracking-wide">
                  We Believe
                </h2>
              </div>
              <div className="flex items-center gap-3.5 lg:px-6 lg:border-r lg:border-white/15">
                <div className="text-[#E84E2D] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-300 leading-snug">Every woman <br /> deserves dignity.</p>
              </div>
              <div className="flex items-center gap-3.5 lg:px-6 lg:border-r lg:border-white/15">
                <div className="text-[#E84E2D] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-300 leading-snug">Communities <br /> know what they need.</p>
              </div>
              <div className="flex items-center gap-3.5 lg:px-6 lg:border-r lg:border-white/15">
                <div className="text-[#E84E2D] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <p className="text-xs text-gray-300 leading-snug">Rights should never <br /> depend on identity.</p>
              </div>
              <div className="flex items-center gap-3.5 lg:pl-6">
                <div className="text-[#E84E2D] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-300 leading-snug">Change begins <br /> with collective action.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 3. ABOUT US (WHO WE ARE, VISION, MISSION, VALUES) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div variants={fadeInUp} className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src={getAsset(
                  "about_section_img",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                )}
                alt="About Abhimani Women's Collective"
                fill
                className="object-cover"
                unoptimized={isPreview}
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-orange-100/50">
                <span className="text-[#E84E2D] font-bold text-[10px] tracking-widest uppercase block mb-1">Survivor-Led Movement</span>
                <p className="text-xs text-gray-800 font-medium">Founded to protect autonomy, constitutional rights, and lived dignity.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-3">About Us</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] leading-tight mb-6">
                Rooted in Sisterhood, <br />
                <span className="text-[#58214D]">Driven by Self-Determination.</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Abhimani Women&apos;s Collective (AWC) is Sri Lanka&apos;s foremost community-rooted organisation led directly by sex workers for sex workers. We transform stigma into collective strength through direct legal defence, community health, and economic liberation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-[#58214D]">
                  <h4 className="font-serif font-bold text-sm text-[#141414] mb-1">Our Vision</h4>
                  <p className="text-xs text-gray-600">A Sri Lanka free from gendered oppression and criminalisation of bodily choices.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-[#E84E2D]">
                  <h4 className="font-serif font-bold text-sm text-[#141414] mb-1">Our Mission</h4>
                  <p className="text-xs text-gray-600">Equipping communities with legal knowledge, safe crisis houses, and healthcare access.</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#58214D] hover:text-[#E84E2D] uppercase tracking-widest transition-colors"
              >
                <span>Read Who We Are & Our Full Story</span>
                <span>→</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. OUR WORK / PROGRAMS */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF8F5] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">Our Work & Programs</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414]">
                Comprehensive Community Action
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-[#58214D] hover:text-[#E84E2D] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Explore All Programs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Legal Aid & Emergency Bail",
                tag: "Rights Defence",
                desc: "Rapid response legal aid, court accompaniment, and legal literacy protecting members from arbitrary arrests.",
                img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
                link: "/projects",
              },
              {
                title: "Holistic Health & Harm Reduction",
                tag: "Healthcare",
                desc: "Safe sexual reproductive healthcare, stigma-free counseling, HIV screening, and peer health education.",
                img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
                link: "/projects",
              },
              {
                title: "Safe Shelter & Crisis Relief",
                tag: "Protection",
                desc: "Confidential transitional shelters and mutual-aid food packages during economic emergencies and crackdowns.",
                img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
                link: "/projects",
              },
            ].map((prog, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={prog.img} alt={prog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#E84E2D] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {prog.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#141414] mb-2">{prog.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">{prog.desc}</p>
                  </div>
                  <Link href={prog.link} className="text-[#58214D] group-hover:text-[#E84E2D] text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors mt-auto">
                    <span>Learn More</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR PRODUCTS / SHOP (SOCIAL ENTERPRISE) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#58214D] text-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="p-8 sm:p-12 lg:p-16 lg:col-span-7">
              <span className="text-[#EFB9C5] font-bold text-xs uppercase tracking-[0.25em] block mb-3">Our Social Enterprise</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Artisan Crafts, Handmades & Sustainable Products.
              </h2>
              <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                Every handcrafted item, upcycled textile, and natural beauty product in our shop is created by community survivors. 100% of sales proceeds fund dignified livelihood stipends and emergency bail funds.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  Visit The Shop
                </Link>
                <Link
                  href="/shop#crafts"
                  className="border border-white/40 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all"
                >
                  View Product Catalog
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[350px]">
              <Image
                src={getAsset(
                  "shop_feature_img",
                  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
                )}
                alt="AWC Handmade Community Products"
                fill
                className="object-cover"
                unoptimized={isPreview}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STORIES / IMPACT VOICES */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-xl mb-14">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">Voices of Courage</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414]">
              Real Stories, Real Resilience
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <motion.div variants={fadeInUp} className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200/70 flex flex-col justify-between">
              <div>
                <span className="text-[#58214D] text-4xl font-serif leading-none block mb-4">“</span>
                <p className="font-serif italic text-lg sm:text-2xl text-[#141414] leading-relaxed mb-6">
                  When I was detained unfairly, AWC&apos;s paralegal arrived at the station within two hours. They secured my release and gave me back my voice, my dignity, and my safety.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#58214D] text-white flex items-center justify-center font-bold font-serif text-lg">
                    K
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Kumari P.</h4>
                    <p className="text-xs text-gray-500">Peer Educator & Survivor Leader • Colombo District</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">Read dozens of first-person narratives</span>
                <Link href="/stories" className="text-[#E84E2D] hover:text-[#58214D] font-bold text-xs uppercase tracking-wider transition-colors">
                  More Impact Stories →
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="lg:col-span-5 relative min-h-[320px] rounded-3xl overflow-hidden shadow-sm">
              <Image
                src={getAsset(
                  "impact_quote_img",
                  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=80"
                )}
                alt="Community solidarity"
                fill
                className="object-cover"
                unoptimized={isPreview}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-3xl font-serif font-bold mb-1">5,000+</span>
                <p className="text-xs text-gray-200">Lives positively safeguarded across Sri Lanka through direct legal aid and grassroots peer defense.</p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. GALLERY & COMMUNITY MOMENTS */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">Moments in Action</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414]">
                Community Gallery
              </h2>
            </div>
            <Link href="/gallery" className="text-[#58214D] hover:text-[#E84E2D] text-xs font-bold uppercase tracking-widest transition-colors">
              View Complete Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "National Advocacy Rally", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" },
              { title: "Health & Care Workshop", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" },
              { title: "Livelihood Craft Collective", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80" },
              { title: "Sisterhood Unity Circle", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
            ].map((photo, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-sm">
                <Image src={photo.img} alt={photo.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs font-bold">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. RESOURCES & PUBLICATIONS */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF8F5] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">Toolkits & Research</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] mb-6">
                Knowledge That Protects
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                We publish trilingual legal rights pocket manuals, healthcare guides, and policy reform research so community members and allies understand constitutional protections against harassment and unlawful arrest.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Know Your Rights: Pocket Legal Guide for Sex Workers (Sinhala / Tamil / English)",
                  "Harm Reduction and Peer Health Intervention Manual",
                  "Constitutional Reform Policy Brief: Decriminalisation in Sri Lanka",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200/70">
                    <span className="text-[#E84E2D] mt-0.5">📄</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/resources"
                className="bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold px-7 py-3.5 rounded-lg shadow-sm transition-all inline-block uppercase tracking-wider"
              >
                Browse & Download Resources
              </Link>
            </div>

            <div className="lg:col-span-5 relative aspect-square rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={getAsset(
                  "resources_feature_img",
                  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
                )}
                alt="AWC Legal Toolkits and Resources"
                fill
                className="object-cover"
                unoptimized={isPreview}
              />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. NEWS & UPDATES */}
      {/* ========================================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">Stay Informed</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414]">
                Latest News & Bulletins
              </h2>
            </div>
            <Link href="/news" className="text-[#58214D] hover:text-[#E84E2D] text-xs font-bold uppercase tracking-widest transition-colors">
              All News & Press Releases →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                date: "March 18, 2026",
                title: "AWC Submits Landmark Submissions on Decriminalisation to National Committee",
                desc: "Advocates presented lived-experience evidence urging repeal of colonial vagrancy ordinances.",
                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
                link: "/news/1",
              },
              {
                date: "February 24, 2026",
                title: "Expansion of Our Colombo 24/7 Crisis Hotline & Legal Accompaniment Unit",
                desc: "Strengthened intake teams ready to provide instant bail coordination and legal assistance.",
                img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
                link: "/news/2",
              },
              {
                date: "January 15, 2026",
                title: "Community Social Enterprise Launches New Eco-Textile Collection",
                desc: "Showcasing handcrafted accessories directly supporting peer survival stipends.",
                img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
                link: "/news/3",
              },
            ].map((news, i) => (
              <article key={i} className="flex flex-col group">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
                  <Image src={news.img} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <time className="text-[11px] font-bold text-[#E84E2D] uppercase tracking-wider mb-2">{news.date}</time>
                <h3 className="font-serif font-bold text-lg text-[#141414] group-hover:text-[#58214D] transition-colors mb-2 leading-snug">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">{news.desc}</p>
                <Link href={news.link} className="text-[#58214D] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  <span>Read Article</span>
                  <span>→</span>
                </Link>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. GET INVOLVED (SUPPORT OUR WORK, CORPORATE PARTNERSHIPS) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">Join The Movement</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] mb-4">
              Get Involved with AWC
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Dignity is built together. Whether you are an individual donor, legal professional, or corporate partner, your solidarity changes lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200/70 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-orange-100 text-[#E84E2D] flex items-center justify-center font-bold text-xl mb-6">
                  ❤️
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#141414] mb-3">Individual Giving & Volunteers</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Fund an emergency bail relief grant, sponsor medical dignity kits, or lend pro-bono legal and digital skills to support our grassroots campaigns.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/donate"
                  className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full shadow-sm transition-all"
                >
                  Donate Directly
                </Link>
                <Link
                  href="/get-involved"
                  className="border border-gray-300 hover:border-gray-800 text-gray-800 text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all"
                >
                  Volunteer With Us
                </Link>
              </div>
            </div>

            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-gray-200/70 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-purple-100 text-[#58214D] flex items-center justify-center font-bold text-xl mb-6">
                  🤝
                </span>
                <h3 className="font-serif font-bold text-2xl text-[#141414] mb-3">Corporate Partnerships & CSR</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Partner with AWC for ethical procurement from our artisan enterprise, workplace human rights workshops, and strategic institutional grants.
                </p>
              </div>
              <div>
                <Link
                  href="/get-involved#corporate"
                  className="bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-full shadow-sm transition-all inline-block"
                >
                  Partner With Us
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CONTACT US / SAFE REACH (DIRECTLY BEFORE FOOTER) */}
      {/* ========================================================================= */}
      <section className="bg-[#181818] text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-2">We Are Here For You</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
              Need Safe Advice or Urgent Crisis Support?
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-xl">
              All communications are strictly confidential. Reach out to our crisis coordination team or visit our Colombo drop-in centre.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full shadow-sm transition-all"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noreferrer"
              className="border border-white/40 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all flex items-center gap-2"
            >
              <span>WhatsApp Hotline</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}