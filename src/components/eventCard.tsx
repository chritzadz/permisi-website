"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { DisplayBebasNeue } from "@/lib/font";

interface EventCardProps {
    id: number;
    name: string;
    eventDate: string;
    description?: string | null;
}

export default function EventCard({ id, name, eventDate, description }: EventCardProps) {
    const router = useRouter();

    const d = new Date(eventDate);
    const valid = !Number.isNaN(d.getTime());
    const day = valid ? d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' }) : '--';
    const month = valid ? d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase() : '';
    const year = valid ? d.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' }) : '';
    const fullDate = valid
        ? d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
        : '';

    return (
        <div
            onClick={() => router.push(`/events/${id}`)}
            className="group h-full flex flex-col gap-4 bg-white rounded-xl border border-normal-maroon/15 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-6 sm:p-8"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="text-center shrink-0">
                    <p className={`${DisplayBebasNeue.className} text-6xl leading-none text-normal-maroon`}>
                        {day}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mt-1">
                        {month} {year}
                    </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-normal-maroon group-hover:translate-x-1 transition-all duration-300 mt-2" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-normal-maroon transition-colors duration-300">
                {name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                {description || "Tap to see the full event details."}
            </p>
            <div className="flex items-center justify-between border-t border-normal-maroon/10 pt-4">
                <span className="text-xs uppercase tracking-wider text-gray-500">
                    {fullDate}
                </span>
                <span className="text-normal-maroon text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                </span>
            </div>
        </div>
    );
}
