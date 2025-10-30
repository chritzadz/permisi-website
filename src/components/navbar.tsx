"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import permisiLogo from "../../public/assets/permisi-logo.png";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when at the top of the page
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Show navbar when scrolling up
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            // Hide navbar when scrolling down
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
                setIsMenuOpen(false); // Close mobile menu when hiding navbar
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", controlNavbar);
        return () => window.removeEventListener("scroll", controlNavbar);
    }, [lastScrollY]);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Resources", href: "/resources" },
    ];

    return (
        <nav
            className={`w-full p-4 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-xl rounded-full border border-normal-maroon/20 shadow-lg">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center w-18 space-x-2">
                        <Image
                            src={permisiLogo}
                            className="w-full"
                            alt="PERMISI HK Logo"
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-normal-maroon px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-normal-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Nav Button */}
                    <div className="md:hidden ">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navbar */}
                {isMenuOpen && (
                    <div className="md:hidden mt-2">
                        <div className="px-4 pt-4 pb-4 space-y-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-normal-maroon/10 shadow-lg">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-700 hover:text-normal-maroon hover:bg-normal-maroon/5 block px-4 py-3 text-base font-medium transition-colors duration-200 rounded-xl"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
