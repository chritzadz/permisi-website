"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JoinCTA() {
    return (
        <section className="py-24 bg-normal-maroon relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Ready to Find Your Home Away From Home?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Join PERMISI HK today and become part of a family that
                    supports your journey in Hong Kong.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-white text-normal-maroon hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full"
                        onClick={() =>
                            window.open(
                                "https://forms.gle/your-registration-link",
                                "_blank",
                            )
                        }
                    >
                        Join PERMISI
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white/10 bg-transparent font-bold text-lg px-8 py-6 rounded-full"
                        onClick={() =>
                            (window.location.href =
                                "mailto:permisi.hk@gmail.com")
                        }
                    >
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
}
