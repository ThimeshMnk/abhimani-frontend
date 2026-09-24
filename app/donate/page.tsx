import type { Metadata } from "next";
import DonateContent from "./DonateContent";

// 1. SEO Metadata tailored specifically for AWC Donations & Bail Fund
export const metadata: Metadata = {
  title: "Donate to Emergency Bail & Legal Defense | Abhimani Women's Collective",
  description:
    "Power freedom and defend bodily dignity. 100% of your contribution fuels our emergency bail relief fund, safe transitional shelters, and 24/7 paralegal defense for sex workers across Sri Lanka.",
  keywords: [
    "Donate to sex worker rights Sri Lanka",
    "Emergency bail fund Sri Lanka NGO",
    "Support Abhimani Women's Collective",
    "AWC donation desk Colombo",
    "Human rights legal defense fund Sri Lanka",
    "Secure NGO donation LKR",
  ],
  openGraph: {
    title: "Donate to Abhimani Women's Collective | Support the Emergency Bail Fund",
    description:
      "Your financial contribution directly enables 24/7 police station accompaniment, emergency bail release, and crisis safe houses across Sri Lanka.",
    url: "https://awc.lk/donate",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Support Abhimani Women's Collective Emergency Bail Fund",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate to Bail Relief | Abhimani Women's Collective",
    description:
      "Support frontline legal defense, safe transitional shelters, and stigma-free healthcare for sex workers in Sri Lanka.",
    images: [
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://awc.lk/donate",
  },
};

export default function Page() {
  // 2. Schema.org WebPage & NGO Donation Entity
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AWC Emergency Solidarity & Bail Fund",
    description:
      "Secure contribution desk funding 24/7 emergency legal bail accompaniment, transitional safe houses, and healthcare access for female and transgender sex workers in Sri Lanka.",
    url: "https://awc.lk/donate",
    mainEntity: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      alternateName: "AWC Sri Lanka",
      url: "https://awc.lk",
      logo: "https://awc.lk/images/logo.jpeg",
      email: "finance@awc.lk",
      telephone: "+94771234567",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DonateContent />
    </>
  );
}