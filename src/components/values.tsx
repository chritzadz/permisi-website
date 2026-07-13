"use client";

import React, { useRef } from "react";
import { Users, Globe, GraduationCap } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
    {
        title: "Community",
        description:
            "Building a home away from home. We foster close-knit relationships among Indonesian students, creating a support system that lasts a lifetime.",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-100",
    },
    {
        title: "Culture",
        description:
            "Celebrating our heritage. We actively promote and share the richness of Indonesian culture with the international community at CityU.",
        icon: Globe,
        color: "text-red-600",
        bg: "bg-red-100",
    },
    {
        title: "Excellence",
        description:
            "Striving for greatness. We encourage academic success and personal growth, helping members unlock their full potential.",
        icon: GraduationCap,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
    },
];

export default function Values() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(
        () => {
            const cards = cardsRef.current.filter(Boolean);

            gsap.fromTo(
                cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Core Values
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Driven by purpose, united by heritage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={value.title}
                                ref={(el) => {
                                    if (el) cardsRef.current[index] = el;
                                }}
                            >
                                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                                    <CardContent className="p-8 flex flex-col items-center text-center">
                                        <div
                                            className={`w-16 h-16 rounded-full ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <Icon
                                                className={`w-8 h-8 ${value.color}`}
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
