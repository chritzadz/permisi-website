"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import LoadingSpinner from "@/components/loadingSpinner";
import ScrollReveal from "@/components/scrollReveal";
import EventCard from "@/components/eventCard";
import { ChevronDown } from "lucide-react";
import { DisplayBebasNeue, MainInter } from "@/lib/font";

interface Event {
    id: number;
    name: string;
    event_date: string;
    description?: string | null;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events?page=1&limit=10');
                const data = await response.json();
                setEvents(data.data || []);
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen overflow-hidden">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        {/* Page header — full-screen intro part */}
                        <div className="min-h-[88vh] flex flex-col items-center justify-center text-center mb-4 sm:mb-8">
                            <ScrollReveal>
                                <p className={`${DisplayBebasNeue.className} text-lg tracking-[0.3em] text-normal-maroon/70`}>
                                    WHAT&apos;S HAPPENING
                                </p>
                                <h1
                                    className={`${DisplayBebasNeue.className} mt-2 text-6xl sm:text-8xl md:text-9xl font-bold text-normal-maroon tracking-wide leading-none`}
                                >
                                    Events
                                </h1>
                                <div className="mx-auto mt-6 h-1 w-16 bg-normal-maroon" />
                                <p
                                    className={`${MainInter.className} mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto`}
                                >
                                    Upcoming and past gatherings — sports,
                                    culture, adventures and everything that
                                    makes PERMISI a home away from home.
                                </p>
                            </ScrollReveal>
                            <div aria-hidden className="mt-12 animate-bounce text-normal-maroon/50">
                                <ChevronDown className="h-7 w-7" />
                            </div>
                        </div>

                        {/* Cards part */}
                        <div className="min-h-screen flex flex-col justify-center py-16 sm:py-24">
                            <ScrollReveal className="mb-10 sm:mb-14">
                                <h2 className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl md:text-6xl tracking-wide text-normal-maroon leading-none`}>
                                    The Latest, First
                                </h2>
                                <div className="mt-4 h-1 w-16 bg-normal-maroon" />
                            </ScrollReveal>

                            {isLoading ? (
                                <div className="flex justify-center py-24">
                                    <LoadingSpinner size={36} label="Loading events..." />
                                </div>
                            ) : events.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {events.map((event, index) => (
                                        <ScrollReveal key={event.id} delay={Math.min(index * 0.08, 0.4)}>
                                            <EventCard
                                                id={event.id}
                                                name={event.name}
                                                eventDate={event.event_date}
                                                description={event.description}
                                            />
                                        </ScrollReveal>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-center py-24">
                                    <p className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl tracking-wide text-normal-maroon/80 leading-none`}>
                                        No events yet
                                    </p>
                                    <div className="mt-4 h-1 w-12 bg-normal-maroon/40" />
                                    <p className="text-sm text-gray-500 mt-3 max-w-sm">
                                        Check back soon — the next PERMISI
                                        gathering is being planned.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer at bottom of page content */}
            <Footer />
        </>
    );
}
