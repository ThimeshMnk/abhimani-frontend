import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

// 1. SEO Metadata tailored specifically for AWC Projects & Programs
export const metadata: Metadata = {
  title: "Frontline Programs & Strategic Advocacy | Abhimani Women's Collective",
  description:
    "Explore AWC's strategic initiatives driving decriminalisation, emergency legal bail defense, stigma-free healthcare, and transitional safe houses for sex workers across Sri Lanka.",
  keywords: [
    "AWC frontline programs Sri Lanka",
    "Emergency bail fund sex workers Sri Lanka",
    "Decriminalisation advocacy Sri Lanka",
    "Transgender healthcare harm reduction",
    "Transitional safe houses Colombo",
    "Abhimani Women's Collective initiatives",
  ],
  openGraph: {
    title: "Frontline Programs & Strategic Advocacy | Abhimani Women's Collective",
    description:
      "Frontline action and systemic liberation. Explore our emergency legal defense, peer healthcare, and policy reform initiatives.",
    url: "https://awc.lk/projects",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Abhimani Women's Collective Frontline Advocacy Programs",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work & Strategic Programs | Abhimani Women's Collective",
    description:
      "Emergency bail relief, peer health access, safe transitional housing, and decriminalisation advocacy across Sri Lanka.",
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://awc.lk/projects",
  },
};

export default function Page() {
  // 2. Collection / ItemList Schema mapping AWC's 4 Core Strategic Programs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Frontline Programs & Human Rights Initiatives",
    description:
      "Strategic legal defense, peer healthcare, transitional shelter, and systemic policy reform by Abhimani Women's Collective in Sri Lanka.",
    url: "https://awc.lk/projects",
    publisher: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      url: "https://awc.lk",
      logo: "https://awc.lk/images/logo.jpeg",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Emergency Bail & Legal Accompaniment Desk",
          description:
            "24/7 rapid response legal defense, court accompaniment, and bail funds preventing arbitrary detention under vagrancy laws.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Peer Healthcare & Harm Reduction Access",
          description:
            "Community-delivered sexual and reproductive health screenings, confidential HIV/STI prevention, and hormone therapy guidance.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Transitional Safe Houses & Emergency Relief",
          description:
            "Confidential shelters offering dignified living, nutritional mutual-aid rations, and crisis mental health triage.",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Decriminalisation & Constitutional Policy Reform",
          description:
            "Evidence-based legislative lobbying to repeal the 1841 Vagrants Ordinance and secure labour protections.",
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
      <ProjectsContent />
    </>
  );
}