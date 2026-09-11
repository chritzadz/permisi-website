"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import EventCard from "@/components/eventCard";
import Values from "@/components/values";
import ActivityGallery from "@/components/activityGallery";
import BoardMembers from "@/components/boardMembers";
import JoinCTA from "@/components/joinCta";
import AboutUsV2 from "@/components/aboutUsV2";
import ScrollReveal from "@/components/scrollReveal";
import { DisplayBebasNeue } from "@/lib/font";

interface Event {
    id: number;
    name: string;
    event_date: string;
    description?: string | null;
}

export default function HomePage() {
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

    return (
        <>
            {/* Footer - fixed at bottom, behind content */}
            <div className="fixed bottom-0 left-0 right-0 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                    <Footer />
                </div>
            </div>

            {/* Content wrapper - overlays footer, with bottom padding for reveal */}
            <div className="relative z-20 min-h-screen">
                <Hero />

                <AboutUsV2 />

                <ActivityGallery />

                <BoardMembers />

                {/* Latest Events Section */}
                {latestEvents.length > 0 && (
                    <section className="min-h-screen flex flex-col justify-center py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                            <ScrollReveal className="mb-10 sm:mb-14">
                                <p className={`${DisplayBebasNeue.className} text-lg tracking-[0.3em] text-normal-maroon/70`}>
                                    WHAT&apos;S HAPPENING
                                </p>
                                <h2 className={`${DisplayBebasNeue.className} mt-2 text-5xl sm:text-6xl md:text-7xl tracking-wide text-normal-maroon leading-none`}>
                                    {latestEvents.length === 1 ? "Latest Event" : "Latest Events"}
                                </h2>
                                <div className="mt-4 h-1 w-16 bg-normal-maroon" />
                            </ScrollReveal>
                            <div className={`grid gap-6 ${latestEvents.length === 1 ? 'max-w-md mx-auto' : latestEvents.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                                {latestEvents.map((event, index) => (
                                    <ScrollReveal key={event.id} delay={Math.min(index * 0.1, 0.3)}>
                                        <EventCard
                                            id={event.id}
                                            name={event.name}
                                            eventDate={event.event_date}
                                            description={event.description}
                                        />
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Spacer to reveal footer - transparent margin at bottom */}
                <div className="h-[85vh] md:h-[45vh] w-full bg-transparent" />
            </div>
        </>
    );
}
