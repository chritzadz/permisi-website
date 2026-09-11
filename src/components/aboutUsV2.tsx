"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DisplayBebasNeue } from "@/lib/font";
import hikingPermisi from "@/../public/assets/hiking-permisi.png";
import futsalOlym from "@/../public/assets/futsal-olym.png";
import welcomingFreshman from "@/../public/assets/welcoming-freshman.png";

export default function AboutUsV2() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);

    // Fade-in animation for content
    useEffect(() => {
        if (titleRef.current && textRef.current) {
            gsap.set([titleRef.current, textRef.current], {
                opacity: 0,
                y: 30,
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    toggleActions: "play reverse play reverse",
                },
            })
                .to(titleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .to(
                    textRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.5",
                );
        }
    }, []);

    // Parallax scrolling for the image strip
    useGSAP(() => {
        if (imagesRef.current && sectionRef.current) {
            gsap.to(imagesRef.current, {
                yPercent: -33.33,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            });
        }
    }, []);

    return (
        <div
            id="definitionBox"
            className="w-full bg-white flex flex-col md:flex-row md:h-screen"
            ref={sectionRef}
        >
            <section className="hidden md:block md:w-1/2 lg:w-1/2 relative overflow-hidden bg-white">
                {/* Subtle overlay to make images feel more integrated */}
                <div className="absolute inset-0 z-10 bg-black/5 pointer-events-none" />

                <div className="flex flex-col h-[300%]" ref={imagesRef}>
                    <div className="h-1/6 w-full relative">
                        <Image
                            src={hikingPermisi}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer3"
                        />
                    </div>
                    <div className="h-1/6 w-full relative">
                        <Image
                            src={futsalOlym}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer1"
                        />
                    </div>
                    <div className="h-1/6 w-full relative">
                        <Image
                            src={welcomingFreshman}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer2"
                        />
                    </div>
                    <div className="h-1/6 w-full relative">
                        <Image
                            src={hikingPermisi}
                            className="w-full h-full object-cover"
                            alt="permisiPhotos-layer3"
                        />
                    </div>
                </div>
            </section>

            <section className="w-full md:w-1/2 lg:w-1/2 items-center justify-center flex py-12 sm:py-16 md:py-0 bg-white">
                <div className="max-w-4xl lg:max-w-3xl mx-auto items-center flex justify-center px-6 sm:px-10 lg:px-16">
                    <div className="text-left md:text-center lg:text-left">
                        <h2
                            className={`${DisplayBebasNeue.className} text-5xl sm:text-6xl md:text-7xl tracking-wide text-normal-maroon leading-none mb-2`}
                            ref={titleRef}
                        >
                            Who Are We?
                        </h2>
                        <div className="mb-8 h-1 w-16 bg-normal-maroon md:mx-auto lg:mx-0" aria-hidden />

                        <div className="max-w-4xl mx-auto" ref={textRef}>
                            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed md:leading-loose">
                                <span className="font-bold text-normal-maroon text-xl sm:text-2xl tracking-wide">
                                    PERMISI HK
                                </span>{" "}
                                is a vibrant community of Indonesian students
                                studying at{" "}
                                <a
                                    href="https://www.cityu.edu.hk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-normal-maroon hover:text-dark-maroon transition-colors duration-300 border-b-2 border-normal-maroon/20 hover:border-normal-maroon"
                                >
                                    City University of Hong Kong
                                </a>
                                . We serve as a bridge connecting Indonesian
                                culture with the international academic
                                environment, fostering friendship, academic
                                excellence, and cultural exchange. Our
                                association provides support, networking
                                opportunities, and a home away from home for
                                Indonesian students pursuing their dreams in
                                Hong Kong.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
