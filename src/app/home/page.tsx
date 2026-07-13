"use client";

import React from "react";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import AboutUs from "@/components/aboutUs";
import EventCard from "@/components/eventCard";
import Values from "@/components/values";
import ActivityGallery from "@/components/activityGallery";
import JoinCTA from "@/components/joinCta";
import AboutUsV2 from "@/components/aboutUsV2";

export default function HomePage() {
    return (
        <>
            {/* Footer - fixed at bottom, behind content */}
            <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                    <Footer />
                </div>
            </div>

            {/* Content wrapper - overlays footer */}
            <div className="relative z-20 bg-white">
                <Hero />

                <AboutUs />
                <AboutUsV2 />

                <ActivityGallery />

                {/* Spacer to reveal footer - transparent margin at bottom */}
                {/* Adjust height based on footer size, or use a roughly adequate height */}
                <div className="h-[50vh] w-full bg-transparent pointer-events-none" />
            </div>
        </>
    );
}
