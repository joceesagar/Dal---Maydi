import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { SiteFooterSection } from "./landing-page/sections/site-footer";
import { CartLink } from "./products/sections/cart-items";

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
        <div className="w-full min-h-screen">
          {/* Header Section */}
          <header className="w-full bg-[#feffef] border-b border-border py-6">
            <div className="mx-auto sm:px-6 lg:px-32">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="font-semibold text-[#bc8217] text-[25.2px]">
                    Dal - Maydi
                  </div>
                </div>

                {/* Navigation */}
                <Navigation />

                {/* Cart Button */}
                <CartLink />
              </div>
            </div>
          </header>

          <main>{children}</main>
        </div>
        <SiteFooterSection />
      </body>
    </html>
  );
}
