import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Abhimani Women's Collective (AWC) | Sri Lanka",
  description:
    "A survivor-led organisation advocating for the rights, safety, bodily autonomy, and wellbeing of female and transgender sex workers across Sri Lanka.",
  keywords: [
    "Abhimani Women's Collective",
    "AWC Sri Lanka",
    "Sex worker rights Sri Lanka",
    "Transgender rights Sri Lanka",
    "Survivor-led advocacy Colombo",
    "Decriminalisation Sri Lanka",
    "Emergency legal bail fund",
    "Human rights NGO Sri Lanka",
  ],
  openGraph: {
    title: "Abhimani Women's Collective (AWC) | Sri Lanka",
    description:
      "Standing with sex workers, every step of the way. Frontline legal aid, safe transitional housing, and survivor-led advocacy across Sri Lanka.",
    url: "https://awc.lk",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "/images/Hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Abhimani Women's Collective Community Solidarity",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhimani Women's Collective (AWC) | Sri Lanka",
    description:
      "Standing with sex workers, every step of the way. Survivor-led frontline advocacy, emergency bail, and healthcare across Sri Lanka.",
    images: ["/images/Hero.jpeg"],
  },
  alternates: {
    canonical: "https://awc.lk",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Abhimani Women's Collective",
    alternateName: "AWC Sri Lanka",
    url: "https://awc.lk",
    logo: "https://awc.lk/images/logo.jpeg",
    description:
      "A survivor-led organisation advocating for the rights, safety, and wellbeing of female and transgender sex workers across Sri Lanka.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    telephone: "+94771234567",
    email: "info@awc.lk",
    sameAs: [
      "https://www.facebook.com/share/12G6Xq5jZ15/",
      "https://instagram.com",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}