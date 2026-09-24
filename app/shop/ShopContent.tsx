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

export interface ProductItem {
  id: number;
  name?: Record<string, string> | string;
  title?: Record<string, string> | string;
  category?: Record<string, string> | string;
  cat?: Record<string, string> | string;
  price: number | string;
  image?: string;
  img?: string;
  cover_image?: string;
  artisan?: Record<string, string> | string;
  desc?: Record<string, string> | string;
  description?: Record<string, string> | string;
  inStock?: boolean;
  in_stock?: boolean;
}

const defaultProducts: ProductItem[] = [
  {
    id: 1,
    name: "Hand-woven Batik Sisterhood Tote",
    category: "Textiles",
    price: 3500,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    artisan: "Crafted by Colombo Peer Collective",
    desc: "100% organic cotton tote bag featuring traditional Sri Lankan hand-waxed batik motifs. Durable, washable, and spacious.",
    inStock: true,
  },
  {
    id: 2,
    name: "Upcycled Eco-Textile Kimono Wrap",
    category: "Textiles",
    price: 6500,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    artisan: "Crafted by Kandy Safe-House Residents",
    desc: "Lightweight, breathable kimono tailored from reclaimed factory surplus fabric. Each piece is unique and supports survivor stipends.",
    inStock: true,
  },
  {
    id: 3,
    name: "Ayurvedic Herbal Infused Body Oil (150ml)",
    category: "Wellness",
    price: 2200,
   image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    artisan: "Hand-blended by Galle Peer Herbalists",
    desc: "Cold-pressed coconut base infused with gotukola, blue lotus, and sandalwood. Non-toxic, soothing, and cruelty-free.",
    inStock: true,
  },
  {
    id: 4,
    name: "Handmade Terracotta Clay Pendant",
    category: "Handmades",
    price: 1800,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    artisan: "Crafted by Negombo Artisan Collective",
    desc: "Kiln-fired earthenware pendant sculpted by community artisans on adjustable braided thread.",
    inStock: true,
  },
  {
    id: 5,
    name: "Handmade Botanical Palm Leaf Journal",
    category: "Handmades",
    price: 2500,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    artisan: "Crafted by Matara Livelihood Guild",
    desc: "Hardcover notebook bound with sustainable palm leaves and acid-free handmade paper.",
    inStock: true,
  },
  {
    id: 6,
    name: "Pure Beeswax & Cinnamon Votive Candles",
    category: "Wellness",
    price: 1950,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80",
    artisan: "Crafted by Colombo Safe Haven",
    desc: "Natural beeswax candles infused with pure Sri Lankan Ceylon cinnamon bark oil. Clean burning for 30+ hours.",
    inStock: true,
  },
];

export default function ShopPage() {
  const { isPreview, locale, getAsset, getAssetUrl } = useLanguage();
  const resolveAsset = getAsset || getAssetUrl;

  const [productsList, setProductsList] = useState<ProductItem[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // 1. Fetch live products from backend API
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setProductsList(data);
          }
        }
      } catch (err) {
        console.warn("Using offline AWC product defaults:", err);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Admin panel & Livewire event listeners for instant reload / modal control
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (
        event.data?.type === "AWC_RELOAD_COLLECTION" ||
        event.data?.type === "TET_RELOAD_COLLECTION" ||
        event.data?.type === "AWC_RELOAD_PRODUCTS"
      ) {
        try {
          const res = await fetch(`${API_BASE}/api/products`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              setProductsList(data);
            }
          }
        } catch (err) {
          console.error("Products reload error:", err);
        }
      }

      if (event.data?.type === "AWC_OPEN_MODAL" || event.data?.type === "TET_OPEN_MODAL") {
        const prod = productsList.find((p) => p.id === Number(event.data.id));
        if (prod) {
          setActiveProduct(prod);
          setOrderSuccess(false);
        }
      }

      if (event.data?.type === "AWC_CLOSE_MODAL" || event.data?.type === "TET_CLOSE_MODAL") {
        setActiveProduct(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [productsList]);

  // Multilingual text resolver
  const resolveText = (val: Record<string, string> | string | undefined, fallback = ""): string => {
    if (!val) return fallback;
    if (typeof val === "object") {
      return val[locale] || val["en"] || Object.values(val)[0] || fallback;
    }
    return String(val);
  };

  // Extract unique categories dynamically from products
  const uniqueCategories = [
    "All",
    ...Array.from(
      new Set(
        productsList
          .map((p) => resolveText(p.category || p.cat, "Handmades"))
          .filter(Boolean)
      )
    ),
  ];

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? productsList
      : productsList.filter(
          (p) => resolveText(p.category || p.cat, "Handmades") === selectedCategory
        );

  // Quick WhatsApp Order generator
  const handleWhatsAppOrder = (product: ProductItem) => {
    const prodName = resolveText(product.name || product.title, "Artisan Craft");
    const prodPrice = Number(product.price || 0).toLocaleString();
    const msg = `Hello AWC Shop! I would like to order: "${prodName}" (LKR ${prodPrice}). Please let me know how to proceed with payment and delivery.`;
    window.open(`https://wa.me/94771234567?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-slate-800 min-h-screen selection:bg-[#FBE8E3] selection:text-[#E84E2D]">
      
      {/* 1. HERO */}
      <section className="py-16 md:py-24 px-6 border-b border-gray-200/70 bg-white">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <span className="text-[#E84E2D] font-bold text-xs uppercase tracking-[0.25em] px-4 py-1.5 bg-orange-100/80 rounded-full inline-block mb-4">
            AWC Social Enterprise • Livelihood Autonomy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#141414] mb-5 tracking-tight leading-[1.12]">
            Survivor-Crafted. <br />
            <span className="text-[#58214D] italic font-normal">Ethical &amp; Empowering.</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Every handmade textile, botanical product, and craft in our shop is created by community survivors. 
            <strong> 100% of profits</strong> fund dignified livelihood stipends and emergency legal bail relief.
          </p>

          {/* Dynamic Category Filter Pills */}
          {/* <div className="flex flex-wrap justify-center gap-2 text-xs font-bold uppercase tracking-wider">
            {uniqueCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#58214D] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>
      </section>

      {/* 2. PRODUCT CATALOG GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => {
            const prodName = resolveText(product.name || product.title, "Artisan Craft");
            const prodCat = resolveText(product.category || product.cat, "Handmades");
            const prodArtisan = resolveText(product.artisan, "AWC Community Collective");
            const prodDesc = resolveText(product.desc || product.description, "");
            const prodPrice = Number(product.price || 0);
            const prodImg = resolveAsset(
              product.image || product.img || product.cover_image,
              "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
            );

            return (
              <motion.div
                key={product.id}
                id={`product-card-${product.id}`}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-[#E84E2D]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={prodImg}
                      alt={prodName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized={isPreview}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#58214D] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      {prodCat}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E84E2D] block mb-1">
                      {prodArtisan}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#141414] mb-2 leading-snug group-hover:text-[#58214D] transition-colors">
                      {prodName}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4">
                      {prodDesc}
                    </p>
                    <div className="text-2xl font-serif font-bold text-[#58214D]">
                      LKR {prodPrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProduct(product);
                      setOrderSuccess(false);
                    }}
                    className="flex-1 bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer"
                  >
                    View Details &amp; Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppOrder(product)}
                    title="Buy via WhatsApp"
                    className="px-4 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. PRODUCT DETAIL & BUY MODAL */}
      <AnimatePresence>
        {activeProduct && (
          <div
            onClick={() => setActiveProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden my-auto"
            >
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer backdrop-blur-sm"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative aspect-square sm:h-full bg-gray-100 min-h-[300px]">
                  <Image
                    src={resolveAsset(
                      activeProduct.image || activeProduct.img || activeProduct.cover_image,
                      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                    )}
                    fill
                    alt={resolveText(activeProduct.name || activeProduct.title, "Artisan Craft")}
                    className="object-cover"
                    unoptimized={isPreview}
                  />
                </div>

                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E84E2D] block mb-1">
                      {resolveText(activeProduct.artisan, "AWC Community Collective")}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-[#141414] mb-3 leading-snug">
                      {resolveText(activeProduct.name || activeProduct.title, "Artisan Craft")}
                    </h2>
                    <div className="text-2xl font-serif font-bold text-[#58214D] mb-4">
                      LKR {Number(activeProduct.price || 0).toLocaleString()}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-6">
                      {resolveText(activeProduct.desc || activeProduct.description, "Survivor-crafted ethical product supporting community livelihoods.")}
                    </p>
                  </div>

                  {orderSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                      <span className="text-emerald-700 font-bold text-sm block">Order Request Sent! ✓</span>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Our shop manager will contact you shortly to confirm islandwide delivery.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => handleWhatsAppOrder(activeProduct)}
                        className="w-full bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <span>Order Directly on WhatsApp</span>
                        <span>↗</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderSuccess(true)}
                        className="w-full bg-[#58214D] hover:bg-[#45183c] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer"
                      >
                        Request Islandwide Delivery
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}