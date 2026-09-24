"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 25 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutPage() {
  const { t, getAsset, getAssetUrl, isPreview } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;

  // Handles smooth hash scrolling from navbar or jump-links
  useEffect(() => {
    const handleScrollMessage = (event: MessageEvent) => {
      if (event.data?.type === "AWC_SCROLL_TO_SECTION" || event.data?.type === "TET_SCROLL_TO_SECTION") {
        const { sectionId } = event.data;
        if (sectionId) {
          const targetElement = document.getElementById(sectionId);
          if (targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
              top: rect.top + scrollTop - 90,
              behavior: "smooth",
            });
          }
        }
      }
    };

    window.addEventListener("message", handleScrollMessage);
    return () => window.removeEventListener("message", handleScrollMessage);
  }, []);

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 selection:bg-[#FBE8E3] selection:text-[#E84E2D] overflow-x-hidden scroll-smooth">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: EDITORIAL SPLIT-GRID WITH LAYERED IMAGERY */}
      {/* ========================================================================= */}
      <section 
        id="about-hero" 
        className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-20 lg:pb-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission Statement & Jump Links */}
          <motion.div 
            initial="initial" 
            whileInView="whileInView" 
            variants={fadeInUp} 
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-[#E84E2D] text-[11px] font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E84E2D] animate-pulse"></span>
              {t("about_hero_label", "About Abhimani Women's Collective")}
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-bold text-[#141414] leading-[1.08] tracking-tight mb-6">
              Built on Sisterhood. <br />
              <span className="text-[#58214D]">Governed by Truth.</span> <br />
              <span className="text-[#E84E2D] font-normal italic font-serif">Unapologetically Us.</span>
            </h1>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              We are Sri Lanka&apos;s leading grassroots collective founded and governed directly by female and transgender sex workers. We transform systemic isolation into organized resilience, frontline legal defence, and uncompromised dignity.
            </p>

            {/* Quick-Jump In-Page Navigator */}
            <div className="flex flex-wrap items-center gap-2 pt-2 pb-6 border-y border-gray-200/80 mb-8 text-[11px] font-bold uppercase tracking-wider text-gray-600">
              <span className="text-[#E84E2D] pr-1">Jump to:</span>
              <a href="#who-we-are" className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 hover:text-[#E84E2D] transition-colors border border-gray-200">
                Who We Are
              </a>
              <a href="#our-story" className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 hover:text-[#E84E2D] transition-colors border border-gray-200">
                Our Story
              </a>
              <a href="#vision-mission" className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 hover:text-[#E84E2D] transition-colors border border-gray-200">
                Vision &amp; Mission
              </a>
              <a href="#approach" className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 hover:text-[#E84E2D] transition-colors border border-gray-200">
                Approach
              </a>
              <a href="#values" className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 hover:text-[#E84E2D] transition-colors border border-gray-200">
                Values
              </a>
            </div>

            {/* Key Trust Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-serif font-bold text-[#58214D]">100%</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-1">Survivor Governed</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-[#E84E2D]">5,000+</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-1">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-gray-900">24/7</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-1">Crisis Accompaniment</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered Visual Composition */}
          <div className="lg:col-span-5 relative">
            
            {/* Primary Portrait / Cultural Saree Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src={resolveAsset(
                  "about_hero_primary", 
                  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                )}
                fill
                alt="AWC Community Sisterhood"
                className="object-cover object-center"
                priority
                unoptimized={isPreview}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E84E2D] block mb-1">
                  Safe Spaces • Direct Action
                </span>
                <p className="font-serif text-lg font-bold leading-snug">
                  Transforming vulnerability into collective courage.
                </p>
              </div>
            </motion.div>

            {/* Overlapping Floating Inset: Solidarity / Peer Care Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden sm:block absolute -bottom-8 -left-10 w-52 aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white"
            >
              <Image
                src={resolveAsset(
                  "about_hero_inset", 
                  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80"
                )}
                fill
                alt="Hands joined in mutual solidarity"
                className="object-cover"
                unoptimized={isPreview}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  Mutual Aid Circle
                </span>
              </div>
            </motion.div>

            {/* Floating Brand Stamp */}
            <div className="absolute -top-4 -right-4 bg-[#58214D] text-white p-4 rounded-2xl shadow-lg border-2 border-white flex flex-col items-center text-center">
              <span className="font-serif text-xl font-bold leading-none">AWC</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-pink-200 mt-1">Sri Lanka</span>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHO WE ARE */}
      {/* ========================================================================= */}
      <section 
        id="who-we-are" 
        className="scroll-mt-24 py-20 md:py-28 bg-white border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Image: Women working / meeting together */}
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-100"
            >
              <Image
                src={resolveAsset(
                  "about_who_we_are_img",
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80"
                )}
                alt="Who We Are - AWC Community Leadership"
                fill
                className="object-cover"
                unoptimized={isPreview}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                <span className="text-3xl font-serif font-bold text-[#E84E2D]">100%</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-200">Survivor Leadership</span>
                <p className="text-xs text-gray-300 mt-1">
                  Governed exclusively by female and transgender sex workers with direct lived experience.
                </p>
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
                {t("about_who_label", "Who We Are")}
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] leading-tight mb-6">
                A Unified Front for <br />
                <span className="text-[#58214D]">Rights, Safety &amp; Autonomy.</span>
              </h2>
              
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Abhimani Women&apos;s Collective (AWC) is Sri Lanka&apos;s foremost community-rooted movement fighting against the criminalisation, police violence, and societal exclusion faced by female and transgender sex workers.
              </p>
              
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Operating across urban districts and provincial towns, we provide immediate crisis intervention—including 24/7 emergency bail relief, legal accompaniment, and transitional safe houses—while organizing at national policy tables to advocate for the repeal of colonial vagrancy ordinances and the full recognition of bodily autonomy.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-[#58214D]">
                  <h4 className="font-serif font-bold text-sm text-[#141414] mb-1">Peer Governance</h4>
                  <p className="text-xs text-gray-600">No outside paternalism. Every priority is determined directly by community members.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-[#E84E2D]">
                  <h4 className="font-serif font-bold text-sm text-[#141414] mb-1">Holistic Protection</h4>
                  <p className="text-xs text-gray-600">From legal bail to reproductive health and dignified artisan livelihoods.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR STORY */}
      {/* ========================================================================= */}
      <section 
        id="our-story" 
        className="scroll-mt-24 py-20 md:py-28 bg-[#FAF8F5] border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
              {t("about_story_label", "Our Origins")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414]">
              Born Out of Collective Resistance
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Timeline Cards */}
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed"
            >
              <div className="p-6 rounded-2xl bg-white border-l-4 border-[#58214D] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#58214D] block mb-1">The Beginning</span>
                <h3 className="font-serif font-bold text-lg text-[#141414] mb-2">The Underground Bail Tin</h3>
                <p>
                  Before Abhimani became a registered collective, it was an informal telephone network and emergency mutual-aid circle. Community members pooled daily coins into shared tins to pay bail bonds for peers arbitrarily detained during midnight police raids.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border-l-4 border-[#E84E2D] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E84E2D] block mb-1">Breaking Silence</span>
                <h3 className="font-serif font-bold text-lg text-[#141414] mb-2">Refusing Extortion &amp; Injustice</h3>
                <p>
                  Tired of enduring extortion, unlawful detentions under the 1841 Vagrants Ordinance, and denial of emergency hospital care, survivor leaders united. We realized that while individual survival was precarious, organized collective action made us an unignorable force.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border-l-4 border-[#58214D] shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#58214D] block mb-1">Present Day</span>
                <h3 className="font-serif font-bold text-lg text-[#141414] mb-2">National Advocacy &amp; Sisterhood</h3>
                <p>
                  Today, Abhimani Women&apos;s Collective operates institutional safe spaces, publishes pioneering legal rights toolkits, coordinates peer medical care, and represents Sri Lankan sex workers at high-level constitutional consultations.
                </p>
              </div>
            </motion.div>

            {/* Story Image: Community Circle */}
            <motion.div 
              variants={fadeInUp} 
              initial="initial" 
              whileInView="whileInView" 
              viewport={{ once: true }}
              className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src={resolveAsset(
                  "about_story_img",
                  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80"
                )}
                alt="Community organizing meeting and discussion"
                fill
                className="object-cover"
                unoptimized={isPreview}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <p className="font-script text-3xl text-white leading-snug">
                  &ldquo;We pooled our coins to free our sisters from lockups. Today, we stand tall together.&rdquo;
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. VISION & MISSION */}
      {/* ========================================================================= */}
      <section 
        id="vision-mission" 
        className="scroll-mt-24 py-20 md:py-28 bg-white border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
              {t("about_vm_label", "Our Guiding Compass")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414]">
              Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* VISION CARD */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="p-10 md:p-14 rounded-3xl bg-[#FAF8F5] border border-orange-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#58214D] text-white flex items-center justify-center text-2xl mb-6 shadow-sm">
                  👁️
                </div>
                <span className="text-[#58214D] font-bold text-xs uppercase tracking-widest block mb-2">Our Vision</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141414] mb-4">
                  A Sri Lanka Free of Criminalisation &amp; Violence.
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We envision a democratic Sri Lankan society where sex work is decriminalised, bodily choices are respected, and all female and transgender sex workers live with uncompromised dignity, freedom, and equal protection under the law.
                </p>
              </div>
            </motion.div>

            {/* MISSION CARD */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="p-10 md:p-14 rounded-3xl bg-[#FAF8F5] border border-orange-200/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E84E2D] text-white flex items-center justify-center text-2xl mb-6 shadow-sm">
                  🎯
                </div>
                <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-widest block mb-2">Our Mission</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141414] mb-4">
                  Grassroots Empowerment &amp; Systemic Defence.
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  To protect community members through emergency bail and 24/7 paralegal support, provide stigma-free sexual reproductive healthcare, run safe transitional housing, foster sustainable social enterprises, and advocate for constitutional legislative reforms.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR APPROACH */}
      {/* ========================================================================= */}
      <section 
        id="approach" 
        className="scroll-mt-24 py-20 md:py-28 bg-[#FAF8F5] border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="max-w-3xl mb-16">
            <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] block mb-3">
              {t("about_approach_label", "Our Methodology")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] mb-4">
              Our Strategic Approach
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We bridge immediate frontline emergency rescue with long-term structural policy reform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Nothing About Us Without Us",
                desc: "Survivor leadership is non-negotiable. All campaigns, services, and shelters are managed by community peers.",
              },
              {
                num: "02",
                title: "Harm Reduction First",
                desc: "We provide judgment-free healthcare, testing, and psycho-social aid without moral conditions or forced rehabilitation.",
              },
              {
                num: "03",
                title: "Emergency Paralegal Aid",
                desc: "Rapid-response court accompaniment and attorney coordination to stop arbitrary police detention in its tracks.",
              },
              {
                num: "04",
                title: "Economic Liberation",
                desc: "Through our artisan enterprise, we provide dignified income alternatives and community-managed emergency relief funds.",
              },
            ].map((app, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-gray-200/70 shadow-xs flex flex-col justify-between hover:border-[#58214D] transition-colors"
              >
                <div>
                  <span className="font-serif font-bold text-3xl text-[#E84E2D] block mb-4">
                    {app.num}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#141414] mb-3">
                    {app.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OUR CORE VALUES */}
      {/* ========================================================================= */}
      <section 
        id="values" 
        className="scroll-mt-24 py-20 md:py-28 bg-white border-t border-gray-200/60"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          
          <span className="text-[#E84E2D] font-bold uppercase text-[10px] tracking-[0.25em] block mb-2">
            What Anchors Us
          </span>
        
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141414] mb-16">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Bodily Autonomy",
                desc: "The unalienable right of every woman and transgender individual to make independent choices regarding their body, labour, and safety.",
                icon: "🌿",
              },
              {
                title: "Uncompromising Dignity",
                desc: "No individual’s right to security, health, and fair legal treatment should ever depend on gender, occupation, or background.",
                icon: "⚖️",
              },
              {
                title: "Fierce Sisterhood",
                desc: "Unbreakable solidarity that protects each member against police intimidation, social isolation, and institutional violence.",
                icon: "🤝",
              },
              {
                title: "Radical Accountability",
                desc: "Transparent, survivor-centered stewardship of all resources, always remaining loyal first and foremost to our community.",
                icon: "🤍",
              },
            ].map((val, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="bg-[#FAF8F5] p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col items-center hover:border-[#E84E2D] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white text-2xl flex items-center justify-center mb-6 shadow-xs border border-gray-100">
                  {val.icon}
                </div>
                
                <h3 className="font-serif text-lg font-bold text-[#58214D] mb-3">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed max-w-[220px]">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

     
    </div>
  );
}