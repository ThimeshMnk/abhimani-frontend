import type { Metadata } from "next";
import ContactContent from "./ContactContent";

// 1. SEO Metadata tailored specifically for AWC Contact & 24/7 Crisis Desk
export const metadata: Metadata = {
  title: "Contact Us & 24/7 Crisis Hotline | Abhimani Women's Collective",
  description:
    "Get in touch with Abhimani Women's Collective (AWC). Access our 24/7 emergency crisis hotline for urgent legal bail accompaniment, safe shelter, media inquiries, or institutional partnerships in Sri Lanka.",
  keywords: [
    "Contact Abhimani Women's Collective",
    "AWC crisis hotline Sri Lanka",
    "Sex worker emergency legal aid Colombo",
    "AWC office address Sri Lanka",
    "Transgender crisis shelter hotline Sri Lanka",
    "24/7 legal accompaniment hotline",
  ],
  openGraph: {
    title: "Contact Us & 24/7 Crisis Hotline | Abhimani Women's Collective",
    description:
      "Whether seeking emergency legal bail assistance, safe shelter, or institutional partnership, our desk is ready with strict confidentiality.",
    url: "https://awc.lk/contact",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Abhimani Women's Collective Contact and Emergency Support Desk",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & 24/7 Hotline | Abhimani Women's Collective",
    description:
      "Access our 24/7 emergency legal accompaniment hotline, safe house coordination, and administrative desk.",
    images: [
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://awc.lk/contact",
  },
};

export default function Page() {
  // 2. Schema.org ContactPage & Emergency NGO Organization Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Abhimani Women's Collective",
    description:
      "Official communication channels and 24/7 rapid emergency legal response desk for Abhimani Women's Collective in Sri Lanka.",
    url: "https://awc.lk/contact",
    mainEntity: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      alternateName: "AWC Sri Lanka",
      url: "https://awc.lk",
      logo: "https://awc.lk/images/logo.jpeg",
      telephone: "+94-77-123-4567",
      email: "info@awc.lk",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+94-77-123-4567",
          contactType: "24/7 Emergency Bail & Crisis Support",
          areaServed: "LK",
          availableLanguage: ["English", "Sinhala", "Tamil"],
        },
        {
          "@type": "ContactPoint",
          email: "legal@awc.lk",
          contactType: "Paralegal Desk & Legal Counsel",
          areaServed: "LK",
          availableLanguage: ["English", "Sinhala", "Tamil"],
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
      <ContactContent />
    </>
  );
}