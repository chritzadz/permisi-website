"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import EventCard from "@/components/eventCard";
import Values from "@/components/values";
import ActivityGallery from "@/components/activityGallery";
import JoinCTA from "@/components/joinCta";
import AboutUsV2 from "@/components/aboutUsV2";

interface Event {
    id: number;
    name: string;
    event_date: string;
}

export default function HomePage() {
    const router = useRouter();
    const [latestEvents, setLatestEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchLatestEvents = async () => {
            try {
                const response = await fetch('/api/events?page=1&limit=3');
                const data = await response.json();
                setLatestEvents(data.data || []);
            } catch (error) {
                console.error('Error fetching latest events:', error);
                setLatestEvents([]);
            }
        };

        fetchLatestEvents();
    }, []);

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEventClick = (eventId: number) => {
        router.push(`/events/${eventId}`);
    };
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

                <AboutUsV2 />

                <ActivityGallery />

                {/* Spacer to reveal footer - transparent margin at bottom */}
                {/* Adjust height based on footer size, or use a roughly adequate height */}
                <div className="h-[50vh] w-full bg-transparent pointer-events-none" />
            </div>
        </>
    );
}
