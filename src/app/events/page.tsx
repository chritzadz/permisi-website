"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { Search, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/loadingSpinner";
import { useRouter } from "next/navigation";

interface Event {
    id: number;
    name: string;
    event_date: string;
}

interface PaginationData {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export default function EventsPage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<PaginationData>({
        total: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 10
    });
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true);
            try {
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: ITEMS_PER_PAGE.toString(),
                });
                
                if (searchQuery) {
                    params.append('search', searchQuery);
                }

                const response = await fetch(`/api/events?${params.toString()}`);
                const data = await response.json();
                
                setEvents(data.data || []);
                setPagination(data.pagination || {
                    total: 0,
                    totalPages: 1,
                    currentPage: 1,
                    limit: 10
                });
            } catch (error) {
                console.error('Error fetching events:', error);
                setEvents([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [currentPage, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEventClick = (eventId: number) => {
        router.push(`/events/${eventId}`);
    };

    const formatEventDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Events</h1>
                        
                        <section className="mb-10">
                            <h2 className="text-xl md:text-2xl font-semibold mb-4">Upcoming and Past Events</h2>
                            <p className="mb-6">Stay updated with all PERMISI events and activities happening throughout the year.</p>
                            
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="max-w-md mx-auto sm:mx-0">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search events..."
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-normal-maroon focus:border-normal-maroon"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Events List */}
                        <section className="mb-8">
                            {isLoading ? (
                                <div className="flex justify-center py-12">
                                    <LoadingSpinner size={24} />
                                </div>
                            ) : (
                                <>
                                    {events.length > 0 ? (
                                        <div className="grid gap-6">
                                            {events.map((event) => (
                                                <div
                                                    key={event.id}
                                                    onClick={() => handleEventClick(event.id)}
                                                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-normal-maroon/40"
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-normal-maroon">
                                                                {event.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">
                                                                📅 {formatEventDate(event.event_date)}
                                                            </p>
                                                        </div>
                                                        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2">
                                                            <ArrowRight className="w-4 h-4 text-gray-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-gray-500">
                                                <p className="text-lg font-medium">No events found</p>
                                                {searchQuery && (
                                                    <p className="text-sm mt-2">
                                                        Try adjusting your search terms or{' '}
                                                        <button
                                                            onClick={() => setSearchQuery('')}
                                                            className="text-normal-maroon underline hover:text-dark-maroon"
                                                        >
                                                            clear search
                                                        </button>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Pagination */}
                                    {pagination.totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-8">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 bg-normal-maroon text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-maroon transition-colors duration-300"
                                            >
                                                Previous
                                            </button>
                                            
                                            <div className="flex gap-1">
                                                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                                                    let page;
                                                    if (pagination.totalPages <= 5) {
                                                        page = i + 1;
                                                    } else if (currentPage <= 3) {
                                                        page = i + 1;
                                                    } else if (currentPage >= pagination.totalPages - 2) {
                                                        page = pagination.totalPages - 4 + i;
                                                    } else {
                                                        page = currentPage - 2 + i;
                                                    }
                                                    
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => handlePageChange(page)}
                                                            className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                                                                currentPage === page
                                                                    ? 'bg-normal-maroon text-white'
                                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                            }`}
                                                        >
                                                            {page}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            
                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === pagination.totalPages}
                                                className="px-4 py-2 bg-normal-maroon text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-maroon transition-colors duration-300"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}

                                    {/* Results Info */}
                                    {events.length > 0 && (
                                        <div className="text-center mt-4 text-sm text-gray-600">
                                            Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
                                            {Math.min(currentPage * ITEMS_PER_PAGE, pagination.total)} of{' '}
                                            {pagination.total} events
                                        </div>
                                    )}
                                </>
                            )}
                        </section>
                    </div>
                </section>
            </div>
            
            {/* Footer at bottom of page content */}
            <Footer />
        </>
    );
}