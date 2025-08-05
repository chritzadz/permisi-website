"use client";

import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import sunsetHikeBg from "../../../public/assets/sunset_hike_bg_cropped.png";
import sunsetHikeBgRemove from "../../../public/assets/sunset_hike_bg_cropped_remove.png"; //just for testing very ugly quality lah
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from '@gsap/react';

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

        let tween = gsap.to(titleRef.current, {
            y: window.innerHeight * 0.8,
            ease: "none",
            paused: true
        });

        let lastProgress = 0;
        let smoothProgress = 0;
        const smoothFactor = 1;
        
        ScrollTrigger.create({
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.1,
            pin: heroSectionRef.current,
            pinSpacing: true,
            markers: true,
            onUpdate: self => {
                smoothProgress += (self.progress - smoothProgress) * smoothFactor;
                
                tween.progress(smoothProgress);
                
                lastProgress = self.progress;
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (tween) tween.kill();
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
                    <div className={`${inter.className} font-bold relative text-[#82181A] text-9xl`}>
                        PERMISI
                    </div>
                    <div className={`${inter.className} font-bold relative text-white text-2xl mt-4`}>
                        Persaatuan Mahasiswa Indonesian CityU Hong Kong
                    </div>
                    <div className={`${inter.className} font-bold relative text-white text-2xl mt-2`}>
                        Indonesian Students' Association of City University of Hong Kong
                    </div>
                </div>
            </div>

            {/* temp content for test parallax scrolling */}
            <div className="h-screen bg-gray-100 flex items-center justify-center">
                <h2 className="text-4xl font-bold">Next Section</h2>
            </div>

            <div>
                <Footer />
            </div>
            
            <style jsx global>{styles}</style>
        </div>
    );
};

export default HomePage;