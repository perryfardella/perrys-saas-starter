import { appName, socialLinks } from "@/config/config";
import Link from "next/link";

// Footer configuration data
const footerData = {
  company: {
    name: appName,
    description:
      "Stop paying stupid amounts of money for other people's AI slop. Get your SaaS off the ground fast with my React SaaS Boilerplate for Next.js and Supabase.",
  },
  sections: [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Changelog", href: "#" },
        { name: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Partners", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Community", href: "#" },
        { name: "Status", href: "#" },
        { name: "Security", href: "#" },
        { name: "API", href: "#" },
      ],
    },
  ],
  legal: {
    copyright: "© 2025 Perry's SaaS Starter. All rights reserved.",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
};

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{footerData.company.name}</h3>
            <p className="text-sm text-muted-foreground">
              {footerData.company.description}
            </p>
            {socialLinks.length > 0 ? (
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.ariaLabel}
                    >
                      <IconComponent className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* Dynamic Link Sections */}
          {footerData.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            {footerData.legal.copyright}
          </p>
          <div className="flex flex-wrap gap-6">
            {footerData.legal.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
