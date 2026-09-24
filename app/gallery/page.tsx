import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");

// Define type for dynamic events fetched from Laravel
interface ApiEvent {
  id: number;
  title: Record<string, string> | string;
  date: string;
  location: Record<string, string> | string;
  excerpt?: Record<string, string> | string;
  cover_image?: string;
  img?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Community Events & Impact Gallery | Abhimani Women's Collective",
    description:
      "Explore photo archives of national decriminalisation consultations, community paralegal clinics, artisan exhibitions, and sisterhood gatherings hosted by Abhimani Women's Collective in Sri Lanka.",
    keywords: [
      "AWC events gallery",
      "Sex worker rights consultations Sri Lanka",
      "Community paralegal workshops Colombo",
      "Abhimani photo gallery",
      "Survivor solidarity gatherings Sri Lanka",
      "Human rights field milestones",
    ],
    openGraph: {
      title: "Community Events & Impact Gallery | Abhimani Women's Collective",
      description:
        "Visual storytelling and photo documentation of national forums, rallies, and frontline milestones across Sri Lanka.",
      url: "https://awc.lk/gallery",
      siteName: "Abhimani Women's Collective",
      images: [
        {
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "Abhimani Women's Collective Community Gallery and Events",
        },
      ],
      locale: "en_LK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Community Events & Gallery | Abhimani Women's Collective",
      description:
        "Explore photo archives documenting our survivor-led movement, legal summits, and community care across Sri Lanka.",
      images: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    alternates: {
      canonical: "https://awc.lk/gallery",
    },
  };
}

export default async function Page() {
  let events: ApiEvent[] = [];

  try {
    const res = await fetch(`${API_BASE}/api/events`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      events = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch events for SEO schema:", err);
  }

  // Schema.org Event Collection & Gallery Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AWC Community Events & Visual Archive",
    description:
      "Visual storytelling and photo documentation of grassroots consultations, paralegal workshops, and advocacy summits by Abhimani Women's Collective in Sri Lanka.",
    url: "https://awc.lk/gallery",
    publisher: {
      "@type": "NGO",
      name: "Abhimani Women's Collective",
      url: "https://awc.lk",
      logo: "https://awc.lk/images/logo.jpeg",
    },
    hasPart: events.map((ev) => {
      const titleText =
        typeof ev.title === "object" && ev.title !== null
          ? ev.title.en || Object.values(ev.title)[0]
          : ev.title;

      const locationText =
        typeof ev.location === "object" && ev.location !== null
          ? ev.location.en || Object.values(ev.location)[0]
          : ev.location;

      return {
        "@type": "Event",
        name: titleText || "AWC Community Gathering",
        startDate: ev.date,
        location: {
          "@type": "Place",
          name: locationText || "Colombo, Sri Lanka",
        },
        organizer: {
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
      <GalleryContent />
    </>
  );
}