import type { Metadata } from "next";
import VolunteerContent from "./VolunteerContent";

export const metadata: Metadata = {
  title: "Volunteer & Community Allyship | Abhimani Women's Collective",
  description:
    "Stand in solidarity with female and transgender sex workers in Sri Lanka. Lend your skills in pro-bono legal defense, healthcare navigation, digital storytelling, or community mutual aid.",
  keywords: [
    "Volunteer Sri Lanka NGO",
    "Abhimani Women's Collective volunteer",
    "Sex worker rights advocacy volunteer Colombo",
    "Pro-bono legal volunteer Sri Lanka",
    "Human rights volunteer opportunities Sri Lanka",
  ],
  openGraph: {
    title: "Volunteer & Community Allyship | Abhimani Women's Collective",
    description:
      "Join our grassroots network. Lend your skills, time, and solidarity to protect bodily autonomy and constitutional dignity in Sri Lanka.",
    url: "https://awc.lk/volunteer",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "AWC Community Solidarity & Volunteers",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer with AWC | Stand with Frontline Defenders",
    description:
      "Lend your voice, professional skills, and solidarity to empower community members across Sri Lanka.",
  },
  alternates: {
    canonical: "https://awc.lk/volunteer",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Volunteer Application Portal",
    description:
      "Application portal for legal, healthcare, media, and community volunteers supporting Abhimani Women's Collective in Sri Lanka.",
    url: "https://awc.lk/volunteer",
    provider: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      url: "https://awc.lk",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VolunteerContent />
    </>
  );
}