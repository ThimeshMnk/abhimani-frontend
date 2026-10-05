import type { Metadata } from "next";
import ShopContent from "../shop/ShopContent";

export const metadata: Metadata = {
  title: "Social Enterprise | Abhimani Women's Collective",
  description:
    "AWC’s purpose-driven livelihood initiative: community-made products, the artisans behind them, and how income supports community care in Sri Lanka.",
  alternates: {
    canonical: "https://awc.lk/social-enterprise",
  },
  openGraph: {
    title: "Social Enterprise | Abhimani Women's Collective",
    description:
      "A livelihood initiative led by the community. See the products, the makers, and the community benefit.",
    url: "https://awc.lk/social-enterprise",
    siteName: "Abhimani Women's Collective",
    locale: "en_LK",
    type: "website",
  },
};

export default function Page() {
  return <ShopContent />;
}
