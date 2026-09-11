"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import EventCard from "@/components/eventCard";
import Values from "@/components/values";
import ActivityGallery from "@/components/activityGallery";
import BoardMembers from "@/components/boardMembers";
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

            {/* Content wrapper - overlays footer, with bottom padding for reveal */}
            <div className="relative z-20 min-h-screen">
                <Hero />

                <AboutUsV2 />

                <ActivityGallery />

                <BoardMembers />

                {/* Latest Events Section */}
                {latestEvents.length > 0 && (
                    <section className="py-8 sm:py-12 md:py-16 lg:py-20 max-h-screen flex items-center justify-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                            <div className="text-center mb-8 sm:mb-12 md:mb-16">
                                <h2
                                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12`}
                                >
                                    {latestEvents.length === 1 ? "Latest Event" : "Latest Events"}
                                </h2>
                                <div className={`grid gap-6 ${latestEvents.length === 1 ? 'max-w-md mx-auto' : latestEvents.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                                    {latestEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            onClick={() => handleEventClick(event.id)}
                                            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-normal-maroon/40 transform hover:-translate-y-1"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                                                {event.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">
                                                📅 {formatEventDate(event.event_date)}
                                            </p>
                                            <div className="flex items-center justify-center">
                                                <span className="text-normal-maroon text-sm font-medium hover:text-dark-maroon">
                                                    View Details →
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                    </section>
                )}

                {/* Spacer to reveal footer - transparent margin at bottom */}
                <div className="h-[45vh] w-full bg-transparent" />
            </div>
        </>
    );
}
