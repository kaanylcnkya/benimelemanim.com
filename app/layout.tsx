import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import ScrollToTop from "@/components/layout/ScrollToTop";

const SITE_URL = "https://benimelemanim.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "BenimElemanım | Temizlikçi Bul ve Temizlik İşi Talepleri",
    template: "%s | BenimElemanım",
  },

  description:
    "BenimElemanım, temizlikçi arayanlarla temizlik işi yapmak isteyenleri buluşturan dijital temizlik platformudur. İl ve ilçeye göre temizlikçi bulun, temizlik talebi oluşturun.",

  keywords: [
    "temizlikçi bul",
    "ev temizliği",
    "ofis temizliği",
    "günlük temizlikçi",
    "temizlik personeli",
    "temizlik işi",
    "BenimElemanım",
  ],

  authors: [{ name: "BenimElemanım" }],
  creator: "BenimElemanım",
  publisher: "BenimElemanım",

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/brand/logo-icon.png",
    shortcut: "/brand/logo-icon.png",
    apple: "/brand/logo-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "BenimElemanım",
    title: "BenimElemanım | Temizlikçi Bul ve Temizlik İşi Talepleri",
    description:
      "Temizlikçi arayanlarla temizlik işi yapmak isteyenleri hızlı ve kolay şekilde buluşturan platform.",
    images: [
      {
        url: "/brand/logo-primary.png",
        width: 1200,
        height: 630,
        alt: "BenimElemanım",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BenimElemanım | Temizlikçi Bul",
    description:
      "İl ve ilçeye göre temizlikçi bulun, temizlik talebi oluşturun.",
    images: ["/brand/logo-primary.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BenimElemanım",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-icon.png`,
    description:
      "Temizlikçi arayanlarla temizlik işi yapmak isteyenleri buluşturan dijital temizlik platformu.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BenimElemanım",
    url: SITE_URL,
  };

  return (
    <html lang="tr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        <ScrollToTop />
        <Navbar />

        <div className="pt-[92px]">{children}</div>

        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}