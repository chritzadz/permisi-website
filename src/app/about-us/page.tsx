"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scrollReveal";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";
import permisiLogo from "@/../public/assets/permisi-logo.png";

const stats = [
    {
        value: "2016",
        label: "Founded as a community, driven by the longing feeling of home",
    },
    {
        value: "300+",
        label: "Indonesian students in AY 2025/2026",
    },
    {
        value: "PPI HK",
        label: "Part of the Indonesian Students Association in Hong Kong",
    },
];

const missions = [
    "Support the holistic development of our community members through active interaction and meaningful engagement",
    "Build strong and lasting partnerships with external parties to increase opportunities and community exposure and provide a bridge for our community members",
    "Introduce and showcase Indonesian culture to the global community at City University",
];

const documents = [
    {
        title: "PERMISI Constitution",
        description:
            "Learn more about our organizational structure, rules, and guidelines in our official constitution document.",
        href: "/files/PERMISI's Constitution.pdf",
        label: "Download Constitution",
        icon: FileText,
    },
    {
        title: "Application Handbook",
        description:
            "Interested in joining PERMISI? Download our application handbook for detailed information about membership, activities, and the application process.",
        href: "/files/Application Handbook Permisi 2024_2025.pdf",
        label: "Download Handbook",
        icon: BookOpen,
    },
];

function SectionHeading({
    index,
    title,
}: {
    index: string;
    title: string;
}) {
    return (
        <div className="relative mb-8 sm:mb-10">
            <span
                aria-hidden
                className={`${DisplayBebasNeue.className} absolute -top-10 sm:-top-16 left-0 text-6xl sm:text-8xl md:text-9xl leading-none font-bold text-normal-maroon/10 select-none pointer-events-none`}
            >
                {index}
            </span>
            <ScrollReveal>
                <h2
                    className={`${DisplayBebasNeue.className} relative text-3xl sm:text-4xl md:text-5xl tracking-wide text-normal-maroon`}
                >
                    {title}
                </h2>
                <div className="relative mt-3 h-1 w-16 bg-normal-maroon" />
            </ScrollReveal>
        </div>
    );
}

export default function AboutUsPage() {
    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen overflow-hidden">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        {/* Page header */}
                        <div className="text-center mb-14 sm:mb-20">
                            <ScrollReveal>
                                <Image
                                    src={permisiLogo}
                                    alt="PERMISI HK Logo"
                                    width={96}
                                    height={96}
                                    className="h-16 w-16 sm:h-20 sm:w-20 object-contain mx-auto mb-4"
                                    unoptimized
                                />
                                <h1
                                    className={`${DisplayBebasNeue.className} text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-normal-maroon tracking-wide leading-none`}
                                >
                                    About Us
                                </h1>
                                <p
                                    className={`${MainInter.className} mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto`}
                                >
                                    The Indonesian Students Association at City
                                    University of Hong Kong — a home away from
                                    home.
                                </p>
                            </ScrollReveal>
                        </div>

                        {/* What's in a name */}
                        <section className="mb-16 sm:mb-24">
                            <SectionHeading index="01" title="What&apos;s in a name?" />
                            <div className="relative">
                                <span
                                    aria-hidden
                                    className={`${DisplayBebasNeue.className} absolute -top-16 -left-4 text-[10rem] leading-none text-normal-maroon/15 select-none pointer-events-none`}
                                >
                                    &ldquo;
                                </span>
                                <div className="relative max-w-3xl mx-auto md:mx-0 md:ml-24 space-y-5 text-gray-700 leading-relaxed text-sm sm:text-base">
                                    <ScrollReveal>
                                        <p>
                                            PERMISI stands for{" "}
                                            <strong className="text-normal-maroon">
                                                Persatuan Mahasiswa Indonesia
                                                CityU
                                            </strong>{" "}
                                            which translates to Indonesian
                                            Students&apos; Association CityU.
                                        </p>
                                    </ScrollReveal>
                                    <ScrollReveal delay={0.15}>
                                        <p>
                                            Permisi is also Indonesian for{" "}
                                            <strong className="text-normal-maroon">
                                                &quot;excuse me&quot;
                                            </strong>
                                            , a way of notifying others of our
                                            presence. We chose this as our name
                                            because it represents our culture of
                                            respecting and valuing others —
                                            something that Indonesians are known
                                            for and are proud of.
                                        </p>
                                    </ScrollReveal>
                                    <ScrollReveal delay={0.3}>
                                        <p>
                                            Thus, through this community, we are
                                            making our presence known in the
                                            international world without letting
                                            go of our roots. We hope every
                                            Indonesian student in CityU can be
                                            part of our journey as we continue to
                                            grow.
                                        </p>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </section>

                        {/* History */}
                        <section className="mb-16 sm:mb-24">
                            <SectionHeading index="02" title="History of PERMISI" />
                            <ScrollReveal>
                                <p className="max-w-3xl text-gray-700 leading-relaxed text-sm sm:text-base mb-10">
                                    Driven by the longing feeling of home,
                                    PERMISI was introduced in 2016 as a
                                    community. Nine years later, in the academic
                                    year of 2025/2026, the community is
                                    currently inclusive of more than 300
                                    students. And as a part of PPI HK, we foster
                                    a close relationship with communities from
                                    other universities as well.
                                </p>
                            </ScrollReveal>
                            <div className="border-t border-normal-maroon/15">
                                {stats.map((stat, i) => (
                                    <ScrollReveal
                                        key={stat.value}
                                        delay={i * 0.15}
                                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-baseline py-6 sm:py-8 border-b border-normal-maroon/15"
                                    >
                                        <p
                                            className={`${DisplayBebasNeue.className} sm:col-span-4 text-6xl sm:text-7xl md:text-8xl leading-none text-normal-maroon`}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="sm:col-span-8 text-sm sm:text-base text-gray-600">
                                            {stat.label}
                                        </p>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>

                        {/* Vision */}
                        <section className="mb-16 sm:mb-24">
                            <SectionHeading index="03" title="Vision" />
                            <ScrollReveal>
                                <p className="max-w-4xl text-2xl sm:text-3xl md:text-4xl leading-snug text-gray-900">
                                    To foster a{" "}
                                    <span className="text-normal-maroon font-semibold">
                                        tight-knit community
                                    </span>{" "}
                                    and provide a platform for every Indonesian
                                    student at City University of Hong Kong to
                                    develop their{" "}
                                    <span className="text-normal-maroon font-semibold">
                                        ideas and talents
                                    </span>
                                    .
                                </p>
                            </ScrollReveal>
                        </section>

                        {/* Mission */}
                        <section className="mb-16 sm:mb-24">
                            <SectionHeading index="04" title="Mission" />
                            <div className="border-t border-normal-maroon/15">
                                {missions.map((mission, i) => (
                                    <ScrollReveal
                                        key={mission}
                                        delay={i * 0.15}
                                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-start py-6 sm:py-8 border-b border-normal-maroon/15"
                                    >
                                        <p
                                            className={`${DisplayBebasNeue.className} sm:col-span-1 text-5xl sm:text-6xl leading-none text-normal-maroon/60`}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </p>
                                        <p className="sm:col-span-11 text-sm sm:text-base text-gray-700 leading-relaxed">
                                            {mission}
                                        </p>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>

                        {/* Official Documents */}
                        <section>
                            <SectionHeading index="05" title="Official Documents" />
                            <div className="border-t border-normal-maroon/15">
                                {documents.map((doc, i) => {
                                    const Icon = doc.icon;
                                    return (
                                        <ScrollReveal
                                            key={doc.title}
                                            delay={i * 0.15}
                                            className="flex flex-col sm:flex-row sm:items-center gap-4 py-6 sm:py-8 border-b border-normal-maroon/15"
                                        >
                                            <div className="flex-1 flex items-start gap-4">
                                                <Icon className="h-6 w-6 shrink-0 text-normal-maroon mt-1" />
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                                        {doc.title}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-2xl">
                                                        {doc.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <a
                                                href={doc.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 inline-flex items-center gap-1 font-bold text-normal-maroon hover:text-dark-maroon transition-colors duration-300"
                                            >
                                                {doc.label}
                                                <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </section>
            </div>

            {/* Footer at bottom of page content */}
            <Footer />
        </>
    );
}
