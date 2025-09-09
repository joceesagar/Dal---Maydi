"use client";

import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/products" },
  { label: "Contact Us", href: "/contact-us" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="flex items-center gap-8">
        {navigationItems.map((item, index) => {
          const isActive = pathname === item.href;

          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuLink
                href={item.href}
                className={`text-base whitespace-nowrap transition-colors ${
                  isActive
                    ? "font-semibold text-[#bd8318] underline"
                    : "font-medium text-[#92897e] hover:text-[#bd8318]"
                }`}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
