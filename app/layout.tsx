import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

export const metadata: Metadata = {
  title: "BenimElemanım | Temizlikçi Bulmanın Kolay Yolu",
  description:
    "Ev, ofis ve günlük temizlik ihtiyaçlarınız için bölgenizdeki temizlikçilerle hızlıca eşleşin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <div className="pt-[92px]">{children}</div>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}