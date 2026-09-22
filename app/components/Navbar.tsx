"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: "en", label: "EN" },
    { code: "si", label: "සිං" },
    { code: "ta", label: "தமி" },
  ];

const navLinks = [
    { name: t("nav_about", "ABOUT US"), href: "/about" },
    { name: t("nav_work", "OUR WORK"), href: "/projects" },
    { name: t("nav_impact", "OUR IMPACT"), href: "/gallery" },
    { name: t("nav_contact", "CONTACT US"), href: "/contact" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 1. AWC LOGO */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 mr-8 lg:mr-12">
            {/* Terracotta Icon */}
            <div className="w-8 h-10 relative flex items-center justify-center">
              <svg viewBox="0 0 36 44" fill="none" className="w-full h-full">
                <path
                  d="M18 2C10 2 4 8 4 17C4 27 18 42 18 42C18 42 32 27 32 17C32 8 26 2 18 2Z"
                  fill="#D45B34"
                  opacity="0.9"
                />
                <path
                  d="M10 14H26M8 20H28M12 26H24"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* AWC Typography */}
            <span className="text-3xl font-black tracking-tight text-[#1F1F1F]">
              AWC
            </span>

            {/* Divider */}
            <span className="h-7 w-[1px] bg-gray-300 ml-1"></span>

            {/* Stacked Subtext */}
            <div className="flex flex-col text-[10px] font-extrabold uppercase leading-[1.1] tracking-wider text-gray-800">
              <span>ABHIMANI</span>
              <span>WOMEN&apos;S</span>
              <span>COLLECTIVE</span>
            </div>
          </Link>

          {/* 2. DIRECT DESKTOP LINKS (No Dropdowns) */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[13px] font-bold uppercase tracking-wider text-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#E84E2D] transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* 3. RIGHT ACTIONS: DONATE + SOCIALS + LANGUAGE SWITCHER */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {/* Donate Pill Button */}
            <Link
              href="/donate"
              className="bg-[#E84E2D] hover:bg-[#d13d1d] text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              DONATE
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-2 text-gray-700">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E84E2D] transition-colors p-1"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E84E2D] transition-colors p-1"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full text-[10px] font-bold">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code)}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    locale === lang.code ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. MOBILE HAMBURGER TOGGLE */}
          <button
            className="md:hidden p-2 text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 5. MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden shadow-lg"
          >
            <div className="p-6 space-y-4 text-xs font-bold uppercase tracking-wider text-gray-800">
              
              {/* Language Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-[11px] text-gray-500 font-semibold">Language</span>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-full">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        locale === lang.code ? "bg-white text-gray-900 shadow-xs" : "text-gray-600"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 hover:text-[#E84E2D] border-b border-gray-50 last:border-none transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-2">
                <Link
                  href="/donate"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-[#E84E2D] text-white py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-sm"
                >
                  DONATE
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}