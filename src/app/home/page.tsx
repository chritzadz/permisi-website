"use client";

import React from "react";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import AboutUs from "@/components/aboutUs";
import EventCard from "@/components/eventCard";

export default function HomePage() {
    return (
        <>
            {/* Footer - fixed at bottom, behind content */}
            <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                    <Footer />
                </div>
            </div>

            {/* Content wrapper - overlays footer, with bottom padding for reveal */}
            <div className="relative z-20  min-h-screen">
                <Hero />

                <AboutUs />

                <section className="py-8 sm:py-12 md:py-16 lg:py-20 max-h-screen flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        <div className="text-center mb-8 sm:mb-12 md:mb-16">
                            <h2
                                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12`}
                            >
                                {"Latest Event"}
                            </h2>
                            <EventCard />
                        </div>
                    </div>
                </section>

                {/* Spacer to reveal footer - transparent margin at bottom */}
                <div className="h-[45vh] w-full bg-transparent" />
            </div>
        </>
    );
}
