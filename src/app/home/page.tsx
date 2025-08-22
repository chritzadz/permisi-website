"use client";

import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg_cropped.png";
import sunsetHikeBgRemove from "../../../public/assets/sunset_hike_bg_cropped_remove.png"; //just for testing very ugly quality lah
import { gsap } from "gsap"
import welcomingFreshman from "../../../public/assets/welcoming-freshman.png";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

import { Roboto_Slab, Inter, Roboto_Mono, Saira } from "next/font/google";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

const inter = Inter({
    subsets: ["latin"],
});

const HomePage = () => {
    const heroSectionRef = useRef(null);
    const titleRef = useRef(null);
    const imageContainerRef = useRef(null);
    const navBarRef = useRef(null);


    //use effects for gsap animation
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const smoother = ScrollSmoother.create({
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
            ease: "power2.out"
        })
        .to(titleRef.current.children[0], {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .to(titleRef.current.children[1], {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
        .to(titleRef.current.children[2], {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6");

        let heroScrollTrigger: globalThis.ScrollTrigger;

        gsap.fromTo(titleRef.current,
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
                    markers: true,
                    onUpdate: (self) => {
                        heroScrollTrigger = self;
                    },
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        const showAnim = gsap.from(navBarRef.current, { 
            yPercent: -100,
            paused: true,
            duration: 0.3
        }).progress(1);

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            markers: true,
            onUpdate: (self) => {
                self.direction === -1 ? showAnim.play() : showAnim.reverse()
            }
        });
    }, [])
    

    return (
        <div id="smooth-wrapper">
            <div className="w-full absolute" ref={navBarRef}>
                <div className="w-full top-0 left-0 z-50" >
                    <Navbar />
                </div>
            </div>
            <div id="smooth-content" className='flex flex-col relative'>
                <div ref={heroSectionRef} className="hero-section relative h-screen overflow-hidden mt-18">
                    <div ref={imageContainerRef} className="absolute inset-0 w-full h-full">
                        <Image
                            src={sunsetHikeBg}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="bg-main-1"
                        />
                        <Image
                            src={sunsetHikeBgRemove}
                            className="absolute inset-0 w-full h-full object-cover z-60"
                            alt="bg-main-1"
                        />
                    </div>
                    
                    <div ref={titleRef} className='inset-0 flex flex-col items-center'>
                        <div className={`${inter.className} font-bold relative text-[#82181A] text-7xl lg:text-9xl md:text-7xl sm:text-7xl justify-center`}>
                            PERMISI
                        </div>
                        <div className={`${inter.className} font-bold relative text-white lg:text-2xl md:text-xl mt-2 justify-center`}>
                            Persatuan Mahasiswa Indonesian CityU Hong Kong
                        </div>
                        <div className={`${inter.className} font-bold relative text-white lg:text-2xl md:text-xl mt-2 justify-center`}>
                            Indonesian Students' Association of City University of Hong Kong
                        </div>
                    </div>
                </div>

                <div id="definitionBox" className="h-screen bg-white flex items-center justify-center p-20">
                    <section className="py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                        <h2
                            className={`text-4xl font-bold text-gray-900 mb-8`}
                        >
                            Who are We?
                        </h2>
                        <div className="max-w-7xl mx-auto">
                            <p
                            className={`text-lg text-gray-600 leading-relaxed mb-12`}
                            >
                            <span className={`font-extrabold`}>
                                PERMISI HK
                            </span>{" "}
                            is a vibrant community of Indonesian students studying at{" "}
                            <a
                                href="https://www.cityu.edu.hk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-bold text-red-800 hover:underline`}
                            >
                                City University of Hong Kong
                            </a>
                            . We serve as a bridge connecting Indonesian culture with the
                            international academic environment, fostering friendship,
                            academic excellence, and cultural exchange. Our association
                            provides support, networking opportunities, and a home away
                            from home for Indonesian students pursuing their dreams in
                            Hong Kong.
                            </p>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>

                <div>
                    <section className="py-5">
                    <div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
                        <div className="text-center mb-16">
                        <h2
                            className={`text-4xl font-bold text-gray-900 mb-12`}
                        >
                            Latest Event
                        </h2>
                        <Card className="max-w-4xl mx-auto">
                            <CardContent className="p-8">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="relative aspect-video w-full h-[250px]">
                                <Image
                                    src={welcomingFreshman}
                                    alt="Group activity"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                                </div>
                                <div className="text-left">
                                <div className="flex items-center mb-4">
                                    <Calendar className="h-5 w-5 text-red-800 mr-2" />
                                    <span
                                    className={`text-sm text-gray-900 font-medium`}
                                    >
                                    20 July 2025
                                    </span>
                                </div>
                                <h3
                                    className={`text-2xl font-bold text-gray-900 mb-4`}
                                >
                                    Welcoming Sessions Student in Jakarta
                                </h3>
                                <p
                                    className={`text-gray-600 mb-6`}
                                >
                                    Join us for an exciting welcoming session for new
                                    Indonesian students! This event will feature orientation
                                    activities, cultural performances, and networking
                                    opportunities to help new members integrate into our
                                    community.
                                </p>
                                <Button asChild className="bg-red-800 hover:bg-red-950">
                                    <Link href="/events">
                                    See Details <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                        </div>
                    </div>
                    </section>
                </div>

                <div>
                    <Footer />
                </div>
            </div>
        </div>
        
    );
};

export default HomePage;