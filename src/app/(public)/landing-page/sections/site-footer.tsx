import React from "react";
import * as SimpleIcons from "simple-icons";
export const socialIcons = [
  {
    name: "Google",
    width: "w-[42px]",
    icon: SimpleIcons.siGoogle,
    href: "https://google.com",
  },
  {
    name: "Twitter",
    width: "w-[42px]",
    icon: SimpleIcons.siX,
    href: "https://twitter.com",
  },
  {
    name: "Instagram",
    width: "w-10",
    icon: SimpleIcons.siInstagram,
    href: "https://instagram.com",
  },
  {
    name: "LinkedIn",
    width: "w-10",
    icon: SimpleIcons.siMeta,
    href: "https://linkedin.com",
  },
];
export const SiteFooterSection = () => {
  const footerColumns = [
    {
      title: "Product",
      links: [
        "Landingpage",
        "Features",
        "Documentation",
        "Referral Program",
        "Pricing",
      ],
    },
    {
      title: "Services",
      links: ["Documentation", "Design", "Themes", "Illustrations", "UI Kit"],
    },
    {
      title: "Company",
      links: ["About", "Terms", "Privacy Policy", "Careers"],
    },
    {
      title: "More",
      links: ["Documentation", "License", "Changelog"],
    },
  ];

  return (
    <footer className="w-full bg-black relative">
      <div className="w-full px-32 mx-auto  py-[98px]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <h2 className="[font-family:'Poppins',Helvetica] font-bold text-white text-[28px] tracking-[0.20px] leading-9 mb-8">
              Dal - Maydi
            </h2>

            <div className="mb-8">
              <p className="[font-family:'Open_Sans',Helvetica] font-normal text-white text-base leading-7 mb-6">
                Build a modern and creative website with crealand
              </p>

              <div className="flex gap-3">
                {socialIcons.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.width} h-10 bg-[#ffffff1a] rounded-[2000px] overflow-hidden flex items-center justify-center cursor-pointer hover:bg-[#ffffff2a] transition-colors`}
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      style={{ color: "#ffffff" }}
                    >
                      <title>{social.name}</title>
                      <path d={social.icon.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {footerColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="lg:col-span-1">
              <h3 className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-lg mb-6">
                {column.title}
              </h3>
              <nav className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href="#"
                    className="block [font-family:'Open_Sans',Helvetica] font-normal text-white text-base hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
