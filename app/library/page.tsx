import type { Metadata } from "next";
import ResourcesContent from "../resources/ResourcesContent";

export const metadata: Metadata = {
  title: "Library | Abhimani Women's Collective",
  description:
    "Reports, publications, research, toolkits, guidelines, advocacy materials, and other downloads from Abhimani Women's Collective.",
  alternates: {
    canonical: "https://awc.lk/library",
  },
  openGraph: {
    title: "Library | Abhimani Women's Collective",
    description:
      "Open-access reports, research, toolkits, guidelines, and advocacy materials.",
    url: "https://awc.lk/library",
    siteName: "Abhimani Women's Collective",
    locale: "en_LK",
    type: "website",
  },
};

export default function Page() {
  return <ResourcesContent />;
}
