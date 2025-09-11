"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Home, Menu, MessageSquare, Package2, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import React, { useState } from "react";
import "../globals.css";
import LogoutButton from "./components/logout-button";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package2,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
  },
  {
    href: "/admin/reviews",
    label: "User Reviews",
    icon: Star,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className={`${poppins.variable} font-poppins antialiased`}>
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>

              <div>
                <h1 className="font-semibold text-lg text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Manage your business operations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LogoutButton />
            </div>
          </header>
          <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-60 lg:flex-col border border-r">
              <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetContent side="left" className="p-0 w-80">
                <Sidebar />
              </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Header */}

              <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                <div className="mx-auto max-w-7xl"><Toaster position="top-right" />{children}</div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

const Sidebar = ({ className = "" }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div
      className={cn("flex flex-col h-full bg-gray-50 text-black", className)}
    >
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "group flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-stone-600",
                isActive
                  ? "bg-stone-700 text-white"
                  : "text-gray-800 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive
                    ? "text-white"
                    : "text-gray-600 group-hover:text-white"
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-medium truncate",
                      isActive
                        ? "text-white"
                        : "text-gray-600 group-hover:text-white"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </nav>

      <Separator className="bg-gray-800" />
    </div>
  );
};
