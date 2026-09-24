import type { Metadata } from "next";
import ShopContent from "./ShopContent";

export const metadata: Metadata = {
  title: "Artisan Social Enterprise & Shop | Abhimani Women's Collective",
  description:
    "Shop ethical, survivor-crafted textiles, batiks, and organic wellness products. 100% of proceeds fund emergency legal bail relief and community stipends across Sri Lanka.",
  keywords: [
    "AWC Social Enterprise",
    "Ethical shopping Sri Lanka",
    "Handmade batik tote Colombo",
    "Survivor crafted artisan crafts",
    "Sri Lanka handmade gifts NGO",
    "Eco friendly textiles Sri Lanka",
    "Abhimani Women's Collective shop",
  ],
  openGraph: {
    title: "Artisan Social Enterprise & Shop | Abhimani Women's Collective",
    description:
      "Every purchase directly funds community legal defense and emergency safe houses. Explore handcrafted textiles, jewellery, and herbal wellness items.",
    url: "https://awc.lk/shop",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "AWC Artisan Social Enterprise Products",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisan Shop | Abhimani Women's Collective",
    description:
      "Support economic liberation. 100% of proceeds fund emergency bail and community stipends in Sri Lanka.",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://awc.lk/shop",
  },
};

export default function Page() {
  // Schema.org eCommerce / Store entity
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "AWC Artisan Social Enterprise",
    url: "https://awc.lk/shop",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    description:
      "Ethical social enterprise selling handmade textiles, wellness products, and artisan crafts supporting sex worker empowerment in Sri Lanka.",
    priceRange: "LKR 1,500 - LKR 10,000",
    parentOrganization: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      url: "https://awc.lk",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Survivor-Crafted Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Hand-woven Batik Sisterhood Tote",
            price: "3500",
            priceCurrency: "LKR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Upcycled Eco-Textile Kimono Wrap",
            price: "6500",
            priceCurrency: "LKR",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Ayurvedic Herbal Infused Body Oil",
            price: "2200",
            priceCurrency: "LKR",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopContent />
    </>
  );
}