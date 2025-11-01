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
import { DisplayBebasNeue, MainInter, Cantonese } from "@/lib/font";

import EventCard from "@/components/eventCard";
import heroBackground from "@/../public/assets/hero-background.png";
import heroForeground from "@/../public/assets/hero-foreground.png";

export default function HomePage() {
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const titleTextRef = useRef<HTMLSpanElement>(null);
    const subtitleContainerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef(null);
    const backgroundImageRef = useRef<HTMLDivElement>(null);
    const foregroundImageRef = useRef<HTMLDivElement>(null);
    const whoAreWeRef = useRef(null);
    const whoAreWeTitleRef = useRef(null);
    const whoAreWeTextRef = useRef(null);
    const whoAreWeImageRef = useRef(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);

    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
    const subtitles = [
        {
            text: "Persatuan Mahasiswa Indonesian CityU Hong Kong",
            font: MainInter,
        },
        {
            text: "Indonesian Students' Association of City University of Hong Kong",
            font: MainInter,
        },
        {
            text: "香港城市大學印尼學生會",
            font: Cantonese,
        },
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

    // Initialize subtitle centering transform
    useEffect(() => {
        if (subtitleRef.current) {
            // Use GSAP to center the subtitle element
            gsap.set(subtitleRef.current, {
                xPercent: -50,
                yPercent: -50,
            });
        }
    }, []);

    // Cursor interactivity for title and subtitle with 3D warping effect
    // Only enabled on non-touch devices
    useEffect(() => {
        // Check if device supports hover (not a touch device)
        const isTouchDevice = window.matchMedia("(hover: none)").matches;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!titleTextRef.current || !subtitleRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize cursor position to -1 to 1 range
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            // 3D rotation values (in degrees) - subtle warping effect
            const titleRotateY = x * 3; // Horizontal rotation (left/right tilt)
            const titleRotateX = -y * 2; // Vertical rotation (up/down tilt)
            const subtitleRotateY = x * 2;
            const subtitleRotateX = -y * 1.5;

            // Subtle translation for depth effect
            const titleTranslateZ = Math.abs(x) * 3 + Math.abs(y) * 2;
            const subtitleTranslateZ = Math.abs(x) * 2 + Math.abs(y) * 1.5;

            // Parallax movement values (background moves slower, foreground moves faster)
            // Background: slower movement (behind title) - subtle
            const backgroundX = x * 5;
            const backgroundY = y * 3;
            // Foreground: faster movement (in front of title but behind subtitle) - subtle
            const foregroundX = x * 8;
            const foregroundY = y * 6;

            // Animate title with 3D transforms using GSAP
            gsap.to(titleTextRef.current, {
                rotateY: titleRotateY,
                rotateX: titleRotateX,
                z: titleTranslateZ,
                duration: 1,
                ease: "power2.out",
                transformPerspective: 1000,
            });

            // Animate subtitle with 3D transforms using GSAP
            // Preserve the centering transform (-50%, -50%) while applying 3D effects
            gsap.to(subtitleRef.current, {
                rotateY: subtitleRotateY,
                rotateX: subtitleRotateX,
                z: subtitleTranslateZ,
                xPercent: -50,
                yPercent: -50,
                duration: 1,
                ease: "power2.out",
                transformPerspective: 1000,
            });

            // Animate background image with parallax (slower movement)
            if (backgroundImageRef.current) {
                gsap.to(backgroundImageRef.current, {
                    x: backgroundX,
                    y: backgroundY,
                    duration: 1,
                    ease: "power2.out",
                });
            }

            // Animate foreground image with parallax (faster movement)
            if (foregroundImageRef.current) {
                gsap.to(foregroundImageRef.current, {
                    x: foregroundX,
                    y: foregroundY,
                    duration: 1,
                    ease: "power2.out",
                });
            }
        };

        const handleMouseLeave = () => {
            if (!titleTextRef.current || !subtitleRef.current) return;

            // Reset to center position smoothly
            gsap.to(titleTextRef.current, {
                rotateY: 0,
                rotateX: 0,
                z: 0,
                duration: 1,
                ease: "power2.out",
            });
            gsap.to(subtitleRef.current, {
                rotateY: 0,
                rotateX: 0,
                z: 0,
                xPercent: -50,
                yPercent: -50,
                duration: 1,
                ease: "power2.out",
            });

            // Reset background and foreground images to center
            if (backgroundImageRef.current) {
                gsap.to(backgroundImageRef.current, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                });
            }
            if (foregroundImageRef.current) {
                gsap.to(foregroundImageRef.current, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                });
            }
        };

        const heroSection = heroSectionRef.current;
        if (heroSection) {
            heroSection.addEventListener("mousemove", handleMouseMove);
            heroSection.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (heroSection) {
                heroSection.removeEventListener("mousemove", handleMouseMove);
                heroSection.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

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

        if (
            !titleRef.current ||
            !subtitleContainerRef.current ||
            !heroSectionRef.current
        )
            return;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let heroScrollTrigger: globalThis.ScrollTrigger;

        // Animate both title and subtitle container together
        // Use immediateRender: false to ensure proper initialization
        gsap.fromTo(
            [titleRef.current, subtitleContainerRef.current],
            { y: 0 },
            {
                y: "75vh",
                ease: "none",
                immediateRender: false,
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

        // Animate subtitle opacity fade out on scroll
        gsap.fromTo(
            subtitleContainerRef.current,
            { opacity: 1 },
            {
                opacity: 0,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                    trigger: heroSectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                    markers: false,
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
                className="hero-section min-h-screen h-screen overflow-hidden"
            >
                <div
                    ref={imageContainerRef}
                    className="absolute inset-0 w-full h-full overflow-hidden"
                >
                    <div
                        ref={backgroundImageRef}
                        className="absolute inset-0 w-[120%] h-[120%] z-0"
                        style={{ left: "-10%", top: "-10%" }}
                    >
                        <Image
                            src={heroBackground}
                            className="w-full h-full object-cover"
                            alt="bg-main-1"
                            fill
                            unoptimized
                        />
                    </div>

                    <div
                        ref={foregroundImageRef}
                        className="absolute inset-0 w-[120%] h-[120%] z-20 pointer-events-none"
                        style={{ left: "-10%", top: "-10%" }}
                    >
                        <Image
                            src={heroForeground}
                            className="w-full h-full object-cover"
                            alt="bg-main-1"
                            fill
                            unoptimized
                        />
                    </div>
                </div>

                <div
                    ref={titleRef}
                    className="w-full absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8"
                    style={{ perspective: "1000px" }}
                >
                    <div className="text-center flex relative flex-col items-center justify-center w-full">
                        <span
                            ref={titleTextRef}
                            className={`${DisplayBebasNeue.className} z-10 font-black text-normal-maroon tracking-tight leading-none`}
                            style={{
                                fontSize: "clamp(8rem, 30vw, 50rem)",
                                textShadow:
                                    "0 2px 10px rgba(131, 21, 21, 0.4), 0 0 20px rgba(131, 21, 21, 0.2)",
                                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            PERMISI
                        </span>
                    </div>
                </div>

                {/* Subtitle container - separate from title to appear above foreground */}
                <div
                    ref={subtitleContainerRef}
                    className="w-full absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-4 sm:px-6 md:px-8"
                    style={{ transform: "translateZ(0)" }}
                >
                    <span
                        ref={subtitleRef}
                        className={`${subtitles[currentSubtitleIndex].font.className} absolute font-bold text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed tracking-wide px-4 whitespace-nowrap`}
                        style={{
                            transformStyle: "preserve-3d",
                            left: "50%",
                            top: "50%",
                        }}
                    >
                        {subtitles[currentSubtitleIndex].text}
                    </span>
                </div>
            </div>

            <div
                id="definitionBox"
                className="min-h-screen w-full bg-white flex flex-col md:flex-row"
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
                <section className="w-full md:w-1/2 lg:w-1/2 min-h-screen items-center justify-center flex py-12 sm:py-16 md:py-0">
                    <div className="max-w-4xl lg:max-w-7xl mx-auto items-center flex justify-center px-4 py-10 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
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

            <section className="py-8 sm:py-12 md:py-16 lg:py-20 min-h-screen flex items-center justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h2
                            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12`}
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
