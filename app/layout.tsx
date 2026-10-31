import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Cursor, ScrollProgress } from "@/components/Fx";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cyrilwilliam.vercel.app"),
  title: {
    default: "Cyril William | Electrical Engineering, IoT & EV Technology",
    template: `%s · ${site.name}`,
  },
  description:
    "Explore Cyril William's electrical engineering projects, industrial panel testing experience, embedded systems, IoT development, and EV battery monitoring work.",
  keywords: [
    "Cyril William",
    "Electrical Engineering",
    "IoT",
    "EV Technology",
    "CRUX",
    "Embedded Systems",
    "Arduino",
    "ESP32",
    "Portfolio",
  ],
  authors: [{ name: "Cyril William" }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.webp", type: "image/webp" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Cyril William | Electrical Engineering, IoT & EV Technology",
    description:
      "Explore Cyril William's electrical engineering projects, industrial panel testing experience, embedded systems, IoT development, and EV battery monitoring work.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/og/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cyril William Portfolio - Electrical Engineering, IoT & EV Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyril William | Electrical Engineering, IoT & EV Technology",
    description:
      "Explore Cyril William's electrical engineering projects, industrial panel testing experience, embedded systems, IoT development, and EV battery monitoring work.",
    images: ["/images/og/opengraph-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{".rv{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <ScrollProgress />
        <Cursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
