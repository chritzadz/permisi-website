"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "@/components/footer";
import LoadingSpinner from "@/components/loadingSpinner";
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react";

interface Event {
    id: number;
    name: string;
    event_date: string;
    description?: string;
    location?: string;
    registration_url?: string;
    form_link?: string;
    created_at?: string;
    updated_at?: string;
}

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const eventId = params.id as string;

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/events?id=${eventId}`);
                const data = await response.json();
                
                if (response.ok) {
                    setEvent(data.data);
                } else {
                    setError(data.error || 'Event not found');
                }
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Failed to load event details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const handleBack = () => {
        router.back();
    };

    const handleRegister = () => {
        const registrationLink = event?.form_link || event?.registration_url;
        if (registrationLink) {
            window.open(registrationLink, '_blank');
        }
    };

    if (isLoading) {
        return (
            <div className="relative min-h-screen">
                <div className="flex justify-center items-center py-20">
                    <LoadingSpinner size={24} />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="relative min-h-screen">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        <div className="text-center py-20">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                            <p className="text-gray-600 mb-8">{error}</p>
                            <button
                                onClick={handleBack}
                                className="inline-flex items-center px-4 py-2 bg-normal-maroon text-white rounded-lg hover:bg-dark-maroon transition-colors duration-300"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </button>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

    const { date, time } = formatEventDate(event.event_date);

    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center text-normal-maroon hover:text-dark-maroon mb-6 transition-colors duration-300"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Events
                        </button>

                        {/* Event Header */}
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-normal-maroon to-dark-maroon text-white p-8">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-5 h-5 mr-2" />
                                        <div>
                                            <p className="font-semibold">{date}</p>
                                            <p className="text-sm opacity-90">{time}</p>
                                        </div>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            <p>{event.location}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

            {/* Registration Button */}
            {(event.form_link || event.registration_url) && (
                <div className="p-6 bg-gray-50 border-b">
                    <button
                        onClick={handleRegister}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-normal-creme text-normal-maroon font-semibold rounded-lg hover:bg-dark-creme transition-colors duration-300"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {event.form_link ? 'Fill Registration Form' : 'Register for Event'}
                    </button>
                </div>
            )}

                            {/* Event Details */}
                            <div className="p-8">
                                {event.description ? (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Description</h2>
                                        <div className="prose max-w-none">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">Event details will be updated soon.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Event Information */}
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Information</h3>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                                    <dd className="text-sm text-gray-900">{date} at {time}</dd>
                                </div>
                                {event.location && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                                        <dd className="text-sm text-gray-900">{event.location}</dd>
                                    </div>
                                )}
                                {event.created_at && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Published</dt>
                                        <dd className="text-sm text-gray-900">
                                            {new Date(event.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Questions about this event? Contact us at{' '}
                                <a href="mailto:permisi.hk@gmail.com" className="text-normal-maroon hover:text-dark-maroon">
                                    permisi.hk@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            
            {/* Footer at bottom of page content */}
            <Footer />
        </>
    );
}