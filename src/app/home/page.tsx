"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Roboto_Slab, Inter, Roboto_Mono, Saira } from "next/font/google";
import Typewriter from "@/components/text-animation/typewritter";
import ppiOlympic from "../../../public/assets/ppi-olym.png";
import indoFest from "../../../public/assets/indo-fest.png";
import hikingPermisi from "../../../public/assets/hiking-permisi.png";
import welcomingFreshman from "../../../public/assets/welcoming-freshman.png";
import permisiTemp from "../../../public/assets/permisi-exco-temp.png";
import FutsalOlym from "../../../public/assets/futsal-olym.png";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const robotoSlab = Roboto_Slab({
    subsets: ["latin"],
    weight: "700",
});

const fontInter = Inter({
    subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
});

const fontSaira = Saira({
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
    const permisiText = "PERMISI";

    const animatedLetters = permisiText.split("").map((letter, index) => (
        <span
        key={index}
        className="bounce-letter"
        style={{ animationDelay: `${index * 0.1}s` }}
        >
        {letter === " " ? "\u00A0" : letter}
        </span>
    ));

    return (
        <>
            <div className="w-full relative">
                <div className="fixed w-full top-0 left-0 z-50" >
                    <Navbar />
                </div>
            </div>
            <div className="min-h-screen">
                <section className="mt-16 sm:mt-20 py-12 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Headings */}
                        <Typewriter
                            text={["Hi there!", "Welcome to"]}
                            speed={100}
                            className={`text-2xl sm:text-4xl md:text-6xl font-bold mb-3 text-gray-800 ${fontInter.className}`}
                            waitTime={1500}
                            deleteSpeed={40}
                            cursorChar={"_"}
                        />
                        <style>{styles}</style>
                        <h2
                            className={`text-4xl sm:text-6xl md:text-8xl font-bold text-red-700 mb-4 sm:mb-6 ${robotoSlab.className}`}
                        >
                        {animatedLetters}
                        </h2>
                        <p className={`text-base sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-4xl mx-auto px-2 ${robotoSlab.className}`}>
                            Indonesian Students Association in City University of Hong Kong
                        </p>

                        {/* Photo Gallery - Responsive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                            <div className="relative aspect-[4/3] sm:aspect-video w-full">
                                <Image
                                src={ppiOlympic}
                                alt="PPI Olympic event"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className="relative aspect-[4/3] sm:aspect-video w-full">
                                <Image
                                src={indoFest}
                                alt="Indonesian Festival"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className="relative aspect-[4/3] sm:aspect-video w-full">
                                <Image
                                src={welcomingFreshman}
                                alt="Welcoming freshman event"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className="relative aspect-[4/3] sm:aspect-video w-full">
                                <Image
                                src={hikingPermisi}
                                alt="PERMISI hiking activity"
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* PERMISI description */}
                <section className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-10">
                    <h2
                        className={`text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 ${robotoMono.className}`}
                    >
                        Who are We?
                    </h2>
                    <div className="max-w-7xl mx-auto">
                        <p
                        className={`text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-12 px-2 ${fontSaira.className}`}
                        >
                        <span className={`font-extrabold ${robotoSlab.className}`}>
                            PERMISI HK
                        </span>{" "}
                        is a vibrant community of Indonesian students studying at{" "}
                        <a
                            href="https://www.cityu.edu.hk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-bold text-red-800 hover:underline ${robotoSlab.className}`}
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

                        {/* Photo Gallery - Mobile Responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
                        <div className="relative aspect-[4/3] sm:aspect-video w-full">
                            <Image
                            src={permisiTemp}
                            alt="PERMISI executive committee"
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            />
                        </div>
                        <div className="relative aspect-[4/3] sm:aspect-video w-full">
                            <Image
                            src={FutsalOlym}
                            alt="Futsal Olympic event"
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                {/* Latest Event */}
                <section className="py-8 sm:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                    <h2 className={`text-2xl sm:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 ${robotoMono.className}`}>
                        Latest Event
                    </h2>
                    <Card className="max-w-4xl mx-auto">
                        <CardContent className="p-4 sm:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
                                <div className="relative aspect-[4/3] sm:aspect-video w-full order-1 md:order-1">
                                <Image
                                    src={welcomingFreshman}
                                    alt="Welcoming freshman event"
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                </div>
                                <div className="text-left order-2 md:order-2">
                                <div className="flex items-center mb-4">
                                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-red-800 mr-2" />
                                    <span className={`text-sm text-gray-900 ${fontInter.className} font-medium`}>
                                    20 July 2025
                                    </span>
                                </div>
                                <h3 className={`text-lg sm:text-2xl font-bold text-gray-900 mb-4 ${robotoMono.className}`}>
                                    Welcoming Sessions Student in Jakarta
                                </h3>
                                    <p className={`text-sm sm:text-base text-gray-600 mb-6 ${fontSaira.className}`}>
                                        Join us for an exciting welcoming session for new
                                        Indonesian students! This event will feature orientation
                                        activities, cultural performances, and networking
                                        opportunities to help new members integrate into our
                                        community.
                                    </p>
                                    <Button asChild className="bg-red-800 hover:bg-red-950 w-full sm:w-auto">
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

                {/* Curious Section */}
                <section className="py-8 sm:py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className={`text-2xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 ${robotoMono.className}`}>
                            Curious about What We Do?
                        </h2>
                        <p className={`text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-2 ${fontSaira.className}`}>
                            Discover our wide range of activities, from cultural celebrations
                            and academic support to networking events and community service.
                            Learn how PERMISI HK creates meaningful experiences for Indonesian
                            students in Hong Kong.
                        </p>
                        <Button size="lg" asChild className="bg-red-800 hover:bg-red-950 w-full sm:w-auto">
                            <Link href="/about">
                                Learn More <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;