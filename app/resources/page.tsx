import type { Metadata } from "next";
import ResourcesContent from "./ResourcesContent";

export const metadata: Metadata = {
  title: "Toolkits, Research & Legal Guides | Abhimani Women's Collective",
  description:
    "Free open-access downloads: pocket-sized constitutional rights guides, harm reduction field manuals, and evidence-based law reform papers for sex workers and advocates in Sri Lanka.",
  keywords: [
    "AWC toolkits Sri Lanka",
    "Sex worker legal guide Sri Lanka",
    "Know your rights manual Sinhala Tamil English",
    "Vagrancy Ordinance repeal policy brief",
    "Harm reduction field manual Sri Lanka",
    "Abhimani Women's Collective publications",
    "Paralegal station accompaniment checklist",
  ],
  openGraph: {
    title: "Toolkits, Research & Legal Guides | Abhimani Women's Collective",
    description:
      "Knowledge is frontline defense. Download free trilingual constitutional rights guides and harm reduction manuals published by AWC.",
    url: "https://awc.lk/resources",
    siteName: "Abhimani Women's Collective",
    images: [
      {
        url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "AWC Legal Rights Toolkits and Research Publications",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolkits & Publications | Abhimani Women's Collective",
    description:
      "Download free trilingual rights guides, harm reduction manuals, and legal reform briefs for Sri Lanka.",
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  alternates: {
    canonical: "https://awc.lk/resources",
  },
};

export default function Page() {
  // Schema.org CollectionPage & DigitalDocument catalog
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AWC Knowledge Hub & Publications",
    url: "https://awc.lk/resources",
    description:
      "Trilingual legal rights manuals, empirical health field guides, and constitutional reform research published by Abhimani Women's Collective in Sri Lanka.",
    publisher: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      url: "https://awc.lk",
      logo: "https://awc.lk/images/logo.jpeg",
    },
    hasPart: [
      {
        "@type": "DigitalDocument",
        name: "Know Your Rights: Pocket Legal Guide for Sex Workers",
        encodingFormat: "application/pdf",
        inLanguage: ["si", "ta", "en"],
        about: "Constitutional protections during police stops and bail procedures",
      },
      {
        "@type": "DigitalDocument",
        name: "Community Healthcare & Harm Reduction Field Handbook",
        encodingFormat: "application/pdf",
        inLanguage: ["si", "ta", "en"],
        about: "Sexual and reproductive health protocols and peer counseling",
      },
      {
        "@type": "DigitalDocument",
        name: "Policy Whitepaper: Repealing Sri Lanka's 1841 Vagrants Ordinance",
        encodingFormat: "application/pdf",
        inLanguage: ["en"],
        about: "Legislative submission on repealing colonial vagrancy laws",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResourcesContent />
    </>
  );
}