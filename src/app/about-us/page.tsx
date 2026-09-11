"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import {
    BookOpen,
    Check,
    Download,
    FileText,
    History,
    Landmark,
    Quote,
    Target,
} from "lucide-react";
import permisiLogo from "@/../public/assets/permisi-logo.png";

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
        label: "Download Constitution (PDF)",
        icon: FileText,
    },
    {
        title: "Application Handbook",
        description:
            "Interested in joining PERMISI? Download our application handbook for detailed information about membership, activities, and the application process.",
        href: "/files/Application Handbook Permisi 2024_2025.pdf",
        label: "Download Handbook (PDF)",
        icon: BookOpen,
    },
];

export default function AboutUsPage() {
    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        {/* Page header */}
                        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
                            <Image
                                src={permisiLogo}
                                alt="PERMISI HK Logo"
                                width={96}
                                height={96}
                                className="h-20 w-20 sm:h-24 sm:w-24 object-contain mb-4"
                                unoptimized
                            />
                            <h1
                                className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-normal-maroon tracking-wide`}
                            >
                                About Us
                            </h1>
                            <p
                                className={`${MainInter.className} mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl`}
                            >
                                The Indonesian Students Association at City
                                University of Hong Kong — a home away from home.
                            </p>
                        </div>

                        {/* What is PERMISI */}
                        <section className="mb-10 sm:mb-14">
                            <Card className="border-normal-maroon/20">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Quote className="h-6 w-6 text-normal-maroon" />
                                        <CardTitle className="text-xl md:text-2xl text-normal-maroon">
                                            What&apos;s in a name?
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        PERMISI stands for{" "}
                                        <strong>
                                            Persatuan Mahasiswa Indonesia
                                            CityU
                                        </strong>{" "}
                                        which translates to Indonesian
                                        Students&apos; Association CityU.
                                    </p>
                                    <p>
                                        Permisi is also Indonesian for{" "}
                                        <strong>&quot;excuse me&quot;</strong>,
                                        a way of notifying others of our
                                        presence. We chose this as our name
                                        because it represents our culture of
                                        respecting and valuing others —
                                        something that Indonesians are known
                                        for and are proud of. Thus, through this
                                        community, we are making our presence
                                        known in the international world without
                                        letting go of our roots. We hope every
                                        Indonesian student in CityU can be part
                                        of our journey as we continue to grow.
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                        {/* History */}
                        <section className="mb-10 sm:mb-14">
                            <Card className="border-normal-maroon/20">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <History className="h-6 w-6 text-normal-maroon" />
                                        <CardTitle className="text-xl md:text-2xl text-normal-maroon">
                                            History of PERMISI
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        Driven by the longing feeling of home,
                                        PERMISI was introduced in{" "}
                                        <strong>2016</strong> as a community.
                                        Short of{" "}
                                        <strong>
                                            Persatuan Mahasiswa Indonesia
                                            CityUHK
                                        </strong>{" "}
                                        (Indonesian Student Association in
                                        CityUHK), we hope to encourage
                                        comradeship among Indonesian students
                                        within the campus.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                        <div className="bg-normal-creme rounded-lg p-4 sm:p-6">
                                            <p className="text-3xl sm:text-4xl font-bold text-normal-maroon">
                                                2016
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                PERMISI founded as a community
                                            </p>
                                        </div>
                                        <div className="bg-normal-creme rounded-lg p-4 sm:p-6">
                                            <p className="text-3xl sm:text-4xl font-bold text-normal-maroon">
                                                300+
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Students in AY 2025/2026
                                            </p>
                                        </div>
                                        <div className="bg-normal-creme rounded-lg p-4 sm:p-6">
                                            <p className="text-3xl sm:text-4xl font-bold text-normal-maroon">
                                                PPI HK
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Proud part of the Indonesian
                                                Students Association in Hong
                                                Kong
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Nine years later, in the academic year
                                        of 2025/2026, the community is currently
                                        inclusive of more than 300 students. And
                                        as a part of PPI HK, we foster a close
                                        relationship with communities from other
                                        universities as well.
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Vision & Mission */}
                        <section className="mb-10 sm:mb-14">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="border-normal-maroon/20 h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Target className="h-6 w-6 text-normal-maroon" />
                                            <CardTitle className="text-xl md:text-2xl text-normal-maroon">
                                                Vision
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 leading-relaxed">
                                            To foster a tight-knit community and
                                            provide a platform for every
                                            Indonesian student at City
                                            University of Hong Kong to develop
                                            their ideas and talents.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="border-normal-maroon/20 h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Landmark className="h-6 w-6 text-normal-maroon" />
                                            <CardTitle className="text-xl md:text-2xl text-normal-maroon">
                                                Mission
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {missions.map((mission) => (
                                                <li
                                                    key={mission}
                                                    className="flex items-start gap-2 text-gray-700 leading-relaxed"
                                                >
                                                    <Check className="h-5 w-5 shrink-0 text-normal-maroon mt-0.5" />
                                                    <span>{mission}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Documents */}
                        <section>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                                Official Documents
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {documents.map((doc) => {
                                    const Icon = doc.icon;
                                    return (
                                        <Card
                                            key={doc.title}
                                            className="border-normal-maroon/20 h-full"
                                        >
                                            <CardHeader>
                                                <div className="flex items-center gap-3">
                                                    <Icon className="h-6 w-6 text-normal-maroon" />
                                                    <CardTitle className="text-lg md:text-xl text-normal-maroon">
                                                        {doc.title}
                                                    </CardTitle>
                                                </div>
                                                <CardDescription className="text-sm">
                                                    {doc.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardFooter className="mt-auto">
                                                <a
                                                    href={doc.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-bold bg-normal-maroon hover:bg-dark-maroon transition-all duration-300 rounded-sm text-normal-creme px-4 py-2 inline-flex items-center gap-2"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    {doc.label}
                                                </a>
                                            </CardFooter>
                                        </Card>
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
