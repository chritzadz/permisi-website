"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import hikingPermisi from "@/../public/assets/hiking-permisi.png";
import futsalOlym from "@/../public/assets/futsal-olym.png";
import welcomingFreshman from "@/../public/assets/welcoming-freshman.png";

export default function AboutUs() {
    const whoAreWeRef = useRef<HTMLDivElement>(null);
    const whoAreWeTitleRef = useRef<HTMLHeadingElement>(null);
    const whoAreWeTextRef = useRef<HTMLDivElement>(null);
    const whoAreWeImageRef = useRef<HTMLDivElement>(null);

    // Who are we fade-in animation
    useEffect(() => {
        if (whoAreWeTitleRef.current && whoAreWeTextRef.current) {
            gsap.set([whoAreWeTitleRef.current, whoAreWeTextRef.current], {
                opacity: 0,
                y: 50,
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: whoAreWeRef.current,
                    start: "top 40%",
                    end: "bottom 50%",
                    toggleActions: "play reverse play reverse",
                    markers: false,
                },
            })
                .to(whoAreWeTitleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                })
                .to(
                    whoAreWeTextRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.4",
                );
        }
    }, []);

    // Parallax image effect for who are we
    useGSAP(() => {
        if (whoAreWeImageRef.current) {
            gsap.to(whoAreWeImageRef.current, {
                yPercent: -33.33,
                ease: "none",
                scrollTrigger: {
                    trigger: whoAreWeRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    markers: false,
                },
            });
        }
    }, []);

    return (
        <div
            id="definitionBox"
            className="max-h-screen w-full bg-white flex flex-col md:flex-row"
            ref={whoAreWeRef}
        >
            <section className="hidden md:block md:w-1/2 lg:w-1/2 bg-blue-300 relative overflow-hidden">
                <div className="flex flex-col h-[300%]" ref={whoAreWeImageRef}>
                    <div className="h-1/6 w-full">
                        <Image
                            src={hikingPermisi}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer3"
                        />
                    </div>
                    <div className="h-1/6 w-full">
                        <Image
                            src={futsalOlym}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer1"
                        />
                    </div>
                    <div className="h-1/6 w-full">
                        <Image
                            src={welcomingFreshman}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer2"
                        />
                    </div>
                    <div className="h-1/6 w-full">
                        <Image
                            src={hikingPermisi}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer3"
                        />
                    </div>
                </div>
            </section>
            <section className="w-full md:w-1/2 lg:w-1/2 max-h-screen items-center justify-center flex py-12 sm:py-16 md:py-0">
                <div className="max-w-4xl lg:max-w-7xl mx-auto items-center flex justify-center px-4 py-10 sm:px-6 lg:px-8">
                    <div className="text-center justify-center">
                        <h2
                            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8`}
                            ref={whoAreWeTitleRef}
                        >
                            {"Who are We?"}
                        </h2>
                        <div
                            className="max-w-4xl lg:max-w-7xl mx-auto"
                            ref={whoAreWeTextRef}
                        >
                            <p
                                className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12`}
                            >
                                <span
                                    className={`font-extrabold text-normal-maroon`}
                                >
                                    {"PERMISI HK"}
                                </span>{" "}
                                {
                                    "is a vibrant community of Indonesian students studying at"
                                }{" "}
                                <a
                                    href="https://www.cityu.edu.hk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-bold text-normal-maroon hover:underline`}
                                >
                                    {"City University of Hong Kong"}
                                </a>
                                {
                                    ". We serve as a bridge connecting Indonesian culture with the international academic environment, fostering friendship,academic excellence, and cultural exchange. Our association provides support, networking opportunities, and a home away from home for Indonesian students pursuing their dreams in Hong Kong."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
