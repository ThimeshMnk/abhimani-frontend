import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy & Confidentiality Charter | Abhimani Women's Collective",
  description:
    "Our commitment to protecting the anonymity, digital safety, and confidentiality of community members, donors, volunteers, and clients across Sri Lanka.",
  keywords: [
    "AWC privacy policy",
    "Abhimani Women's Collective confidentiality",
    "Data protection policy Sri Lanka NGO",
    "Donor privacy sex worker advocacy",
  ],
  openGraph: {
    title: "Privacy Policy & Confidentiality Charter | AWC Sri Lanka",
    description:
      "Strict confidentiality guarantees protecting the privacy, identity, and personal data of everyone who interacts with our collective.",
    url: "https://awc.lk/privacy",
    siteName: "Abhimani Women's Collective",
    locale: "en_LK",
    type: "website",
  },
  alternates: {
    canonical: "https://awc.lk/privacy",
  },
};

export default function Page() {
  return <PrivacyContent />;
}