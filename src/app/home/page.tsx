"use client";

import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg_cropped.png";
import sunsetHikeBgRemove from "../../../public/assets/sunset_hike_bg_cropped_remove.png"; //just for testing very ugly quality lah
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Roboto_Slab, Inter, Roboto_Mono, Saira } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
});

const styles = `
    @keyframes bounce {
        0%, 100% {
        transform: translateY(0);
        }
        50% {
        transform: translateY(-10px);
        }
    }
    .bounce-letter {
        display: inline-block;
        animation: bounce 1.5s ease infinite;
    }
`;

const HomePage = () => {
    const heroSectionRef = useRef(null);
    const titleRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
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
                        //later
                    }
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className='flex flex-col'>
            <div className="w-full relative">
                <div className="fixed w-full top-0 left-0 z-50">
                    <Navbar />
                </div>
            </div>
            
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
                
                <div ref={titleRef} className='absolute inset-0 flex flex-col items-center mt-20'>
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

            {/* temp content for test parallax scrolling */}
            <div className="h-screen bg-gray-100 flex items-center justify-center">
                <section className="py-20 bg-white">
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

                        {/* Photo Gallery */}
                        <div className="flex justify-center gap-8">
                        {/* <div className="relative aspect-video w-full h-auto min-h-[200px]">
                            <Image
                            src={}
                            alt="Group activity"
                            fill
                            className="object-cover rounded-lg"
                            />
                        </div>
                        <div className="relative aspect-video w-full h-auto min-h-[200px]">
                            <Image
                            src={FutsalOlym}
                            alt="Group activity"
                            fill
                            className="object-cover rounded-lg"
                            />
                        </div> */}
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>

            <div>
                <Footer />
            </div>
            
            <style jsx global>{styles}</style>
        </div>
    );
};

export default HomePage;