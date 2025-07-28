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
                <div className="fixed w-full top-0 left-0 z-200" >
                    <Navbar />
                </div>
            </div>
            <div className="min-h-screen">
                <section className="mt-20 py-20 bg-white">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
                        {/* Headings */}
                        <Typewriter
                            text={["Hi there!", "Welcome to"]}
                            speed={100}
                            className={`text-4xl md:text-6xl font-bold mb-3 text-gray-800 ${fontInter.className}`}
                            waitTime={1500}
                            deleteSpeed={40}
                            cursorChar={"_"}
                        />
                        <style>{styles}</style>
                        <h2
                            className={`text-6xl md:text-8xl font-bold text-red-700 mb-6 ${robotoSlab.className}`}
                        >
                        {animatedLetters}
                        </h2>
                        <p className={`text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto ${robotoSlab.className}`}>
                            Indonesian Students Association in City University of Hong Kong
                        </p>

                        {/* Photo Gallery */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                            <div className="relative aspect-video w-full h-auto min-h-[200px]">
                                <Image
                                src={ppiOlympic}
                                alt="Group activity"
                                fill
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="relative aspect-video w-full h-auto min-h-[200px]">
                                <Image
                                src={indoFest}
                                alt="Group activity"
                                fill
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="relative aspect-video w-full h-auto min-h-[200px]">
                                <Image
                                src={welcomingFreshman}
                                alt="Group activity"
                                fill
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="relative aspect-video w-full h-auto min-h-[200px]">
                                <Image
                                src={hikingPermisi}
                                alt="Group activity"
                                fill
                                className="object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* PERMISI description */}
                <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                    <h2
                        className={`text-4xl font-bold text-gray-900 mb-8 ${robotoMono.className}`}
                    >
                        Who are We?
                    </h2>
                    <div className="max-w-7xl mx-auto">
                        <p
                        className={`text-lg text-gray-600 leading-relaxed mb-12 ${fontSaira.className}`}
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

                        {/* Photo Gallery */}
                        <div className="flex justify-center gap-8">
                        <div className="relative aspect-video w-full h-auto min-h-[200px]">
                            <Image
                            src={permisiTemp}
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
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                {/* Latest Event */}
                <section className="py-10">
                <div className="max-w-7xlmx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-16">
                    <h2 className={`text-4xl font-bold text-gray-900 mb-12 ${robotoMono.className}`}>
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
                                    <span className={`text-sm text-gray-900 ${fontInter.className} font-medium`}>
                                    20 July 2025
                                    </span>
                                </div>
                                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${robotoMono.className}`}>
                                    Welcoming Sessions Student in Jakarta
                                </h3>
                                    <p className={`text-gray-600 mb-6 ${fontSaira.className}`}>
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

                {/* Curious Section */}
                <section className="py-10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className={`text-4xl font-bold text-gray-900 mb-8 ${robotoMono.className}`}>
                            Curious about What We Do?
                        </h2>
                        <p className={`text-lg text-gray-600 max-w-3xl mx-auto mb-8 ${fontSaira.className}`}>
                            Discover our wide range of activities, from cultural celebrations
                            and academic support to networking events and community service.
                            Learn how PERMISI HK creates meaningful experiences for Indonesian
                            students in Hong Kong.
                        </p>
                        <Button size="lg" asChild className="bg-red-800 hover:bg-red-950">
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
