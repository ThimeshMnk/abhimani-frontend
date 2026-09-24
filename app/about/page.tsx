import type { Metadata } from "next";
import AboutContent from "./AboutContent";

// 1. SEO Metadata tailored specifically for AWC About Us Page
export const metadata: Metadata = {
  title: "About Us | Who We Are, Story & Values | Abhimani Women's Collective",
  description:
    "Learn about Abhimani Women's Collective (AWC), our survivor-led history, vision, mission, and core values fighting for the rights, safety, and bodily autonomy of female and transgender sex workers across Sri Lanka.",
  keywords: [
    "About Abhimani Women's Collective",
    "AWC Sri Lanka",
    "Survivor-led sex worker advocacy",
    "AWC mission vision values",
    "Decriminalisation advocacy Sri Lanka",
    "Bodily autonomy human rights NGO",
    "Sex worker rights Colombo",
  ],
  openGraph: {
    title: "About Us | Abhimani Women's Collective Sri Lanka",
    description:
      "Rooted in sisterhood, governed by truth. Discover our grassroots origins, vision, mission, and survivor-led approach across Sri Lanka.",
    url: "https://awc.lk/about",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Abhimani Women's Collective Sisterhood and Leadership",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Abhimani Women's Collective",
    description:
      "Rooted in dignity and bodily autonomy. Learn about our survivor-led movement in Sri Lanka.",
    images: [
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://awc.lk/about",
  },
};

export default function Page() {
  // 2. Breadcrumb Structured Data for Search Engine Navigation
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://awc.lk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: "https://awc.lk/about",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}