import Link from "next/link";
import { Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/permisi.hk/",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/@permisicityu8030",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/permisi-hk/",
    },
  ];

  return (
    <footer className="bg-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-100 text-black rounded-lg flex items-center justify-center hover:bg-red-900 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <a
              href="mailto:permisi.hk@gmail.com"
              className="text-gray-300 hover:text-white hover:font-medium transition-colors duration-200"
            >
              permisi.hk@gmail.com
            </a>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 PERMISI HK. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
