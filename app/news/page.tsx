import type { Metadata } from "next";
import NewsContent from "./NewsContent";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

interface ApiActivity {
  id: number;
  title: Record<string, string> | string;
  category?: string;
  date: string;
  location: Record<string, string> | string;
  excerpt: Record<string, string> | string;
  img?: string;
  image?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "News & Press Releases | Abhimani Women's Collective",
    description:
      "Official press releases, legal advocacy bulletins, policy submissions, and frontline field updates from Abhimani Women's Collective (AWC) in Sri Lanka.",
    keywords: [
      "AWC news and press releases",
      "Sex worker rights advocacy Sri Lanka",
      "Decriminalisation policy briefs Colombo",
      "Abhimani Women's Collective field reports",
      "Emergency bail and legal aid news Sri Lanka",
      "Human rights NGO press updates",
    ],
    openGraph: {
      title: "News & Press Releases | Abhimani Women's Collective",
      description:
        "Official press announcements, policy reform briefs, and frontline community updates across Sri Lanka.",
      url: "https://awc.lk/news",
      siteName: "Abhimani Women's Collective",
      images: [
        {
          url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "Abhimani Women's Collective Press Dispatches and Updates",
        },
      ],
      locale: "en_LK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "News & Bulletins | Abhimani Women's Collective",
      description:
        "Official press releases, constitutional submissions, and community field dispatches from Sri Lanka.",
      images: [
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    alternates: {
      canonical: "https://awc.lk/news",
    },
  };
}

export default async function Page() {
  let activities: ApiActivity[] = [];

  try {
    const res = await fetch(`${API_BASE}/api/activities`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      activities = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch activities for SEO schema:", err);
  }

  // Schema.org Blog / News Media Listing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AWC Press Desk & Field Updates",
    description:
      "Official press announcements, policy reform briefs, and grassroots interventions by Abhimani Women's Collective in Sri Lanka.",
    url: "https://awc.lk/news",
    publisher: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      url: "https://awc.lk",
      logo: "https://awc.lk/images/logo.jpeg",
    },
    blogPost: activities.map((act) => {
      const titleText =
        typeof act.title === "object" && act.title !== null
          ? act.title.en || Object.values(act.title)[0]
          : act.title;

      const excerptText =
        typeof act.excerpt === "object" && act.excerpt !== null
          ? act.excerpt.en || Object.values(act.excerpt)[0]
          : act.excerpt;

      return {
        "@type": "NewsArticle",
        headline: titleText || "AWC Press Release",
        description: excerptText || "",
        datePublished: act.date,
        author: {
          "@type": "NGO",
          name: "Abhimani Women's Collective",
          url: "https://awc.lk",
        },
        publisher: {
          "@type": "NGO",
          name: "Abhimani Women's Collective",
          url: "https://awc.lk",
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsContent />
    </>
  );
}