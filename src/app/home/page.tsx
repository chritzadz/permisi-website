"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer";

import welcomingFreshman from "../../../public/assets/welcoming-freshman.png";
import futsalOlym from "../../../public/assets/futsal-olym.png";
import hikingPermisi from "../../../public/assets/hiking-permisi.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import { DisplayText } from "@/components/DisplayText";
import EventCard from "@/components/eventCard";
import heroBackground from "@/../public/assets/hero.jpg";
import heroForeground from "@/../public/assets/hero-foreground.png";

export default function HomePage() {
    const heroSectionRef = useRef(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef(null);
    const whoAreWeRef = useRef(null);
    const whoAreWeTitleRef = useRef(null);
    const whoAreWeTextRef = useRef(null);
    const whoAreWeImageRef = useRef(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);

    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
    const subtitles = [
        "Persatuan Mahasiswa Indonesian CityU Hong Kong",
        "Indonesian Students' Association of City University of Hong Kong",
        "香港城市大學印尼學生會",
    ];

    // Subtitle animation with GSAP
    useEffect(() => {
        const animateSubtitle = () => {
            if (!subtitleRef.current) return;

            // Animate current text up and fade out
            gsap.to(subtitleRef.current, {
                y: -30,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    // Change the text
                    setCurrentSubtitleIndex(
                        (prevIndex) => (prevIndex + 1) % subtitles.length,
                    );

                    // Reset position and animate new text in from below
                    gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
                    gsap.to(subtitleRef.current, {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                },
            });
        };

        const interval = setInterval(animateSubtitle, 3000);
        return () => clearInterval(interval);
    }, [subtitles.length]);

    //use effects for gsap animation
    //title beginning animation
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
            smoothTouch: 0.3,
        });

        if (!titleRef.current || !heroSectionRef.current) return;

        const tl = gsap.timeline();

        gsap.set(titleRef.current, { opacity: 0, y: 50 });
        gsap.set(titleRef.current.children[0], { opacity: 0, y: -300 });
        gsap.set(titleRef.current.children[1], { opacity: 0, x: -50 });
        gsap.set(titleRef.current.children[2], { opacity: 0, x: 50 });

        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
        })
            .to(
                titleRef.current.children[0],
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                },
                "-=0.3",
            )
            .to(
                titleRef.current.children[1],
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.5",
            )
            .to(
                titleRef.current.children[2],
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                },
                "-=0.6",
            );

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let heroScrollTrigger: globalThis.ScrollTrigger;

        gsap.fromTo(
            titleRef.current,
            { y: 0 },
            {
                y: "75vh",
                ease: "none",
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    pin: heroSectionRef.current,
                    pinSpacing: true,
                    markers: false,
                    onUpdate: (self) => {
                        heroScrollTrigger = self;
                    },
                },
            },
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    //who are we
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

    //the parallax image whoarewe
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
        <>
            <div
                ref={heroSectionRef}
                className="hero-section h-screen overflow-hidden"
            >
                <div
                    ref={imageContainerRef}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={heroBackground}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        alt="bg-main-1"
                    />
                    <Image
                        src={heroForeground}
                        className="absolute inset-0 w-full h-full object-cover z-20"
                        alt="bg-main-1"
                    />
                </div>

                <div
                    ref={titleRef}
                    className="pt-48 w-full absolute inset-0 flex flex-col items-start z-10 px-4"
                >
                    <div className="text-left space-y-8 max-w-6xl mx-16">
                        {/* Main PERMISI heading */}
                        <div className="relative">
                            <DisplayText
                                className={`font-black relative text-normal-maroon text-9xl lg:text-9xl xl:text-[10rem] tracking-tight leading-none`}
                                style={{
                                    textShadow:
                                        "0 2px 10px rgba(131, 21, 21, 0.4), 0 0 20px rgba(131, 21, 21, 0.2)",
                                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                                }}
                            >
                                PERMISI
                            </DisplayText>
                        </div>

                        {/* Dynamic Subtitle */}
                        <div
                            className="mt-8 overflow-hidden"
                            style={{ height: "3em" }}
                        >
                            <span
                                ref={subtitleRef}
                                className="font-bold text-left relative text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-wide flex items-start justify-start"
                                style={{
                                    textShadow:
                                        "0 1px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.2)",
                                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))",
                                }}
                            >
                                {subtitles[currentSubtitleIndex]}
                            </span>
                        </div>

                        {/* Call to action button */}
                        <div className="pt-4">
                            <button
                                className="group bg-normal-maroon hover:bg-dark-maroon text-white font-bold py-4 px-8 sm:py-5 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white/20"
                                style={{
                                    boxShadow:
                                        "0 6px 20px rgba(131, 21, 21, 0.3), 0 0 15px rgba(131, 21, 21, 0.1)",
                                }}
                            >
                                <span className="flex items-center space-x-3">
                                    <DisplayText className="text-lg sm:text-xl">
                                        Discover Our Community
                                    </DisplayText>
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="definitionBox"
                className="h-screen w-full bg-white flex flex-col md:flex-row"
                ref={whoAreWeRef}
            >
                <section className="hidden md:block md:w-1/2 lg:w-1/2 bg-blue-300 relative overflow-hidden">
                    <div
                        className="flex flex-col h-[300%]"
                        ref={whoAreWeImageRef}
                    >
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
                <section className="w-full md:w-1/2 lg:w-1/2 h-screen items-center justify-center flex">
                    <div className="max-w-7xl mx-auto items-center flex justify-center px-4 py-10 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2
                                className={`text-4xl font-bold text-gray-900 mb-8`}
                                ref={whoAreWeTitleRef}
                            >
                                {"Who are We?"}
                            </h2>
                            <div
                                className="max-w-7xl mx-auto"
                                ref={whoAreWeTextRef}
                            >
                                <p
                                    className={`text-lg text-gray-600 leading-relaxed mb-12`}
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

            <section className="py-5 h-screen flex items-center justify-center">
                <div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-16">
                        <h2
                            className={`text-4xl font-bold text-gray-900 mb-12`}
                        >
                            {"Latest Event"}
                        </h2>
                        <EventCard />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
