import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

import { Navigation } from "@/components/navigation";
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
        <div className="w-full min-h-screen overflow-x-hidden">
          {/* Header Section */}
          <header className="w-full bg-[#feffef] border-b border-border py-4 md:py-6">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className="font-semibold text-[#bc8217] text-lg sm:text-xl md:text-[25.2px]">
                    Dal - Maydi
                  </div>
                </div>

                {/* Navigation */}
                <div className="hidden md:block">
                  <Navigation />
                </div>

                {/* Cart Button */}
                <CartLink />
              </div>
            </div>
          </header>

          <main className="overflow-x-hidden">
            {children}
          </main>
        </div>
        <SiteFooterSection />
      </body>
    </html>
  );
}