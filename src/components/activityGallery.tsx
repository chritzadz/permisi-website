"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

import hikingImg from "@/../public/assets/hiking-permisi.png";
import futsalImg from "@/../public/assets/futsal-olym.png";
import indoFestImg from "@/../public/assets/indo-fest.png";
import welcomingImg from "@/../public/assets/welcoming-freshman.png";

const activities = [
    {
        id: 1,
        title: "Outdoor Adventures",
        category: "Recreation",
        image: hikingImg,
        colSpan: "md:col-span-2",
        rowSpan: "md:row-span-2",
    },
    {
        id: 2,
        title: "Sports Tournaments",
        category: "Competition",
        image: futsalImg,
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1",
    },
    {
        id: 3,
        title: "Cultural Festivals",
        category: "Culture",
        image: indoFestImg,
        colSpan: "md:col-span-1",
        rowSpan: "md:row-span-1",
    },
    {
        id: 4,
        title: "Welcoming Night",
        category: "Community",
        image: welcomingImg,
        colSpan: "md:col-span-2",
        rowSpan: "md:row-span-1",
    },
];

export default function ActivityGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const images = imagesRef.current.filter(Boolean);

            gsap.fromTo(
                images,
                { y: 30, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                },
            );
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Life @{" "}
                            <span className="text-normal-maroon">PERMISI</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            From hiking trails to cultural stages, we make every
                            moment count. Explore the vibrant activities that
                            define our community.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {activities.map((activity, index) => (
                        <div
                            key={activity.id}
                            ref={(el) => {
                                if (el) imagesRef.current[index] = el;
                            }}
                            className={`relative group overflow-hidden rounded-2xl ${activity.colSpan} ${activity.rowSpan}`}
                        >
                            <Image
                                src={activity.image}
                                alt={activity.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block px-3 py-1 bg-normal-maroon text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                    {activity.category}
                                </span>
                                <div className="flex justify-between items-end">
                                    <h3 className="text-2xl font-bold">
                                        {activity.title}
                                    </h3>
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ArrowUpRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
