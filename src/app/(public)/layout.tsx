import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";


import { SiteFooterSection } from "./landing-page/sections/site-footer";
import { Header } from "../Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dal - Maydi | Premium Essential Oils",
  description:
    "Discover The Healing Power Of 100% Pure, Therapeutic Grade Essential Oils Sourced From The Finest Organic Farms Around The World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <div className="w-full min-h-screen overflow-x-hidden">
          {/* Header */}
          <Header />

          <main className="overflow-x-hidden">{children}</main>
        </div>
        <SiteFooterSection />
      </body>
    </html>
  );
}
