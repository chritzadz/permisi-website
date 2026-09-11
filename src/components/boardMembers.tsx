"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { UserRound } from "lucide-react";
import { Member } from "@/model/Member";
import { DisplayBebasNeue } from "@/lib/font";

interface DivisionSection {
    division: string;
    members: Member[];
}

export default function BoardMembers() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [divisions, setDivisions] = useState<DivisionSection[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch("/api/members");
                const data = await response.json();
                const members: Member[] = (data.data ?? []) as Member[];

                const grouped: DivisionSection[] = [];
                for (const member of members) {
                    const section = grouped.find(g => g.division === member.division);
                    if (section) {
                        section.members.push(member);
                    } else {
                        grouped.push({ division: member.division, members: [member] });
                    }
                }
                setDivisions(grouped);
            } catch (error) {
                console.error("Error loading board members:", error);
            }
        };

        fetchMembers();
    }, []);

    useGSAP(
        () => {
            const cards = cardsRef.current.filter(Boolean);
            if (cards.length === 0) return;

            gsap.fromTo(
                cards,
                { y: 30, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                },
            );
        },
        { scope: sectionRef, dependencies: [divisions.length] },
    );

    if (divisions.length === 0) {
        return null;
    }

    let cardIndex = 0;

    return (
        <section ref={sectionRef} className="py-24 bg-normal-creme">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        The People Behind{" "}
                        <span className="text-normal-maroon">PERMISI</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Meet the teammates working together to make PERMISI a
                        home away from home for every Indonesian student at
                        CityU.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {divisions.map(section => (
                        <div key={section.division}>
                            <div className="flex items-baseline gap-3 mb-6">
                                <h3 className={`${DisplayBebasNeue.className} text-2xl md:text-3xl tracking-wide text-normal-maroon leading-none`}>
                                    {section.division}
                                </h3>
                                <span className="text-xs text-gray-500 uppercase tracking-wider">
                                    {section.members.length} member{section.members.length === 1 ? "" : "s"}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
                                {section.members.map(member => {
                                    const refIndex = cardIndex++;
                                    return (
                                        <div
                                            key={`${section.division}-${member.name}-${member.role}`}
                                            ref={(el) => {
                                                cardsRef.current[refIndex] = el;
                                            }}
                                            className="flex flex-col items-center text-center"
                                        >
                                            {member.photo_url ? (
                                                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-normal-maroon/20 shadow-sm overflow-hidden">
                                                    <Image
                                                        src={member.photo_url}
                                                        alt={member.name}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-normal-maroon/20 shadow-sm flex items-center justify-center">
                                                    <UserRound
                                                        className="w-12 h-12 text-normal-maroon"
                                                        strokeWidth={1.5}
                                                    />
                                                </div>
                                            )}
                                            <p className="mt-4 font-semibold text-gray-900 leading-tight break-words">
                                                {member.name}
                                            </p>
                                            <p className="mt-1 text-[11px] text-gray-500 font-medium uppercase tracking-wider break-words">
                                                {member.role}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
