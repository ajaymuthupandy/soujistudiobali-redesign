import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soujistudiobali.com"),
  alternates: { canonical: "/" },
  title: "Souji Studio Bali | Yoga, Pilates & Muay Thai",
  description:
    "Yoga, Pilates and Muay Thai in Bali with certified instructors. Your first class is free.",
  openGraph: {
    title: "Souji Studio Bali",
    description: "Keeping your mind in best condition. Your first class is free.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
