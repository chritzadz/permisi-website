"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { DisplayBebasNeue, MainInter, Cantonese } from "@/lib/font";
import heroBackground from "@/../public/assets/hero-background.png";
import heroForeground from "@/../public/assets/hero-foreground.png";

export default function Hero() {
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const titleTextRef = useRef<HTMLSpanElement>(null);
    const subtitleContainerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const backgroundImageRef = useRef<HTMLDivElement>(null);
    const foregroundImageRef = useRef<HTMLDivElement>(null);
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

    // GSAP scroll animations
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

    return (
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
                    className={`${subtitles[currentSubtitleIndex].font.className} absolute font-light text-white/90 text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase whitespace-nowrap`}
                    style={{
                        transformStyle: "preserve-3d",
                        left: "50%",
                        top: "50%",
                        textShadow:
                            "0 4px 12px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.8)",
                    }}
                >
                    {subtitles[currentSubtitleIndex].text}
                </span>
            </div>
        </div>
    );
}
