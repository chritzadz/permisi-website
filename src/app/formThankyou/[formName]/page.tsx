'use client';

import { FormPageProp } from "@/components/properties/FormPageProp.ts";
import Link from "next/link";
import React from "react";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scrollReveal";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import { ArrowRight } from "lucide-react";

export default function FormThankYouPage({ params }: FormPageProp) {
    const { formName } = React.use(params);
    const formNameParsed = decodeURIComponent(formName.replace(/%20/g, ' '));
    
    return (
        <>
            <div className="relative min-h-screen bg-normal-creme">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col items-center text-center min-h-[70vh] justify-center">
                        <ScrollReveal>
                            <h1 className={`${DisplayBebasNeue.className} text-5xl sm:text-7xl md:text-8xl font-bold text-normal-maroon tracking-wide leading-none`}>
                                Thank You!
                            </h1>
                            <div className="mx-auto mt-4 h-1 w-16 bg-normal-maroon" />
                            <p className={`${MainInter.className} mt-6 text-sm sm:text-base md:text-lg text-gray-700`}>
                                Your response to{" "}
                                <span className="font-semibold text-normal-maroon">
                                    {formNameParsed}
                                </span>{" "}
                                has been submitted successfully.
                            </p>
                            <Link
                                href="/home"
                                className="mt-8 inline-flex items-center gap-2 font-bold bg-normal-maroon hover:bg-dark-maroon transition-all duration-300 text-normal-creme rounded-sm px-6 py-3"
                            >
                                Back to Website
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </ScrollReveal>
                    </div>
                </section>
            </div>

            {/* Footer at bottom of page content */}
            <Footer />
        </>
    );
}
