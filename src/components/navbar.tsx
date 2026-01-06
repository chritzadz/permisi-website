"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Button from "../components/ui/button";
import { gsap } from "gsap";
import permisiLogo from "../../public/assets/permisi-logo.png";
import futsalOlym from "../../public/assets/futsal-olym.png";
import hikingPermisi from "../../public/assets/hiking-permisi.png";
import indoFest from "../../public/assets/indo-fest.png";
import welcomingFreshman from "../../public/assets/welcoming-freshman.png";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollYRef = useRef(0);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - lastScrollYRef.current;

            // Always show navbar when at the top of the page
            if (currentScrollY < 10) {
                setIsVisible(true);
            }
            // Hide navbar when scrolling down (only after scrolling past initial threshold)
            else if (scrollDifference > 0 && currentScrollY > 100) {
                setIsVisible(false);
                setIsMenuOpen(false); // Close mobile menu when hiding navbar
            }
            // Show navbar when scrolling up
            else if (scrollDifference < 0) {
                setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", controlNavbar, { passive: true });
        return () => window.removeEventListener("scroll", controlNavbar);
    }, []);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Events", href: "/events" },
        { name: "Resources", href: "/resources" },
    ];

    // Popover content for each navItem
    const popoverContent: Record<
        string,
        { image: StaticImageData; description: string }
    > = {
        Home: {
            image: welcomingFreshman,
            description:
                "Welcome to PERMISI HK - Your community hub for Indonesian students at CityU Hong Kong",
        },
        "About Us": {
            image: hikingPermisi,
            description:
                "Learn more about our mission to connect Indonesian culture with the international academic environment",
        },
        Events: {
            image: futsalOlym,
            description:
                "Join us for exciting events, sports competitions, cultural celebrations, and community gatherings",
        },
        Resources: {
            image: indoFest,
            description:
                "Access helpful resources, academic support, and information for Indonesian students",
        },
    };

    // Track mouse position for cursor following (horizontal only)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (popoverRef.current && hoveredItem) {
                const popover = popoverRef.current;
                const offsetX = 15;
                // Fixed vertical position - below navbar
                const fixedY = 100; // Adjust this value to position below navbar

                // Get viewport dimensions
                const viewportWidth = window.innerWidth;

                // Get popover dimensions
                const popoverRect = popover.getBoundingClientRect();
                const popoverWidth =
                    popoverRect.width > 0 ? popoverRect.width : 320; // w-80 = 320px fallback

                // Calculate desired horizontal position (default: right of cursor)
                let targetX = e.clientX + offsetX;

                // Adjust horizontal position if it would overflow right edge
                if (targetX + popoverWidth > viewportWidth) {
                    targetX = e.clientX - popoverWidth - offsetX; // Position to the left of cursor
                }

                // Ensure minimum padding from horizontal edges
                targetX = Math.max(
                    10,
                    Math.min(targetX, viewportWidth - popoverWidth - 10),
                );

                gsap.to(popoverRef.current, {
                    x: targetX,
                    y: fixedY,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [hoveredItem]);

    // Show/hide popover with animation
    useEffect(() => {
        if (popoverRef.current) {
            if (hoveredItem) {
                // Initialize position - fixed vertical level
                const fixedY = 100; // Same as in handleMouseMove
                gsap.set(popoverRef.current, {
                    x: 0,
                    y: fixedY,
                    opacity: 0,
                    scale: 0.8,
                });
                gsap.to(popoverRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out",
                });
            } else {
                gsap.to(popoverRef.current, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.15,
                    ease: "power2.in",
                });
            }
        }
    }, [hoveredItem]);

    return (
        <nav
            className={`w-full p-4 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-xl rounded-xl border border-normal-maroon/20 shadow-lg">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center h-12 w-12 md:h-14 md:w-14"
                    >
                        <Image
                            src={permisiLogo}
                            className="h-full w-full object-contain"
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
                                className="text-normal-maroon hover:text-normal-maroon px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-normal-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Cursor-following popover */}
                    <div
                        ref={popoverRef}
                        className="fixed pointer-events-none z-[60] opacity-0"
                        style={{
                            left: 0,
                            top: -30,
                            transform: "translate(0, 0)",
                        }}
                    >
                        {hoveredItem && popoverContent[hoveredItem] && (
                            <div className="bg-white/95 flex flex-col gap-y-3 backdrop-blur-xl rounded-xl border border-normal-maroon/20 shadow-2xl py-4 px-2 w-80">
                                <h3 className="text-sm px-2 font-bold text-normal-maroon">
                                    {hoveredItem}
                                </h3>
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={popoverContent[hoveredItem].image}
                                        alt={hoveredItem}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <p className="text-xs px-2 text-gray-600 leading-relaxed">
                                    {popoverContent[hoveredItem].description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Mobile Nav Button */}
                    <div className="md:hidden ">
                        <Button
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
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="pb-4 space-y-2">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-normal-maroon w-fit text-nowrap hover:text-normal-maroon block px-4 py-3 text-base font-medium transition-all duration-200 relative group transform ${
                                    isMenuOpen
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-4 opacity-0"
                                }`}
                                style={{
                                    transitionDelay: isMenuOpen
                                        ? `${index * 50}ms`
                                        : "0ms",
                                }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                                <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-normal-maroon transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
