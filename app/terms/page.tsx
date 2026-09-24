import type { Metadata } from "next";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service & Community Charter | Abhimani Women's Collective",
  description:
    "Terms and conditions governing the use of the AWC platform, donations, social enterprise shop purchases, and rights education toolkits.",
  keywords: [
    "AWC terms of service",
    "Abhimani Women's Collective terms",
    "Donation terms NGO Sri Lanka",
    "Social enterprise purchase terms",
  ],
  openGraph: {
    title: "Terms of Service & Community Charter | AWC Sri Lanka",
    description:
      "Guidelines for our website, legal toolkits, artisan shop orders, and donation support.",
    url: "https://awc.lk/terms",
    siteName: "Abhimani Women's Collective",
    locale: "en_LK",
    type: "website",
  },
  alternates: {
    canonical: "https://awc.lk/terms",
  },
};

export default function Page() {
  return <TermsContent />;
}