"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scrollReveal";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import {
    ArrowUpRight,
    Check,
    GraduationCap,
    PlaneLanding,
    PlaneTakeoff,
} from "lucide-react";
import landingSlip from "@/../public/assets/landing-slip.png";

function PhaseHeader({
    index,
    icon: Icon,
    title,
    description,
}: {
    index: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}) {
    return (
        <div className="relative mb-6 sm:mb-8">
            <span
                aria-hidden
                className={`${DisplayBebasNeue.className} absolute -top-12 sm:-top-20 right-0 text-7xl sm:text-9xl md:text-[9rem] leading-none font-bold text-normal-maroon/10 select-none pointer-events-none`}
            >
                {index}
            </span>
            <ScrollReveal>
                <div className="relative flex items-start gap-4">
                    <div className="bg-normal-maroon text-normal-creme rounded-sm p-3 h-fit shrink-0">
                        <Icon className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <div>
                        <h2
                            className={`${DisplayBebasNeue.className} text-3xl sm:text-4xl md:text-5xl tracking-wide text-normal-maroon leading-none`}
                        >
                            {title}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                            {description}
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}

function ItemRow({
    title,
    delay = 0,
    children,
}: {
    title: string;
    delay?: number;
    children: React.ReactNode;
}) {
    return (
        <ScrollReveal
            delay={delay}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 sm:py-8 border-b border-normal-maroon/15"
        >
            <h3 className="md:col-span-3 text-base md:text-lg font-semibold text-gray-900">
                {title}
            </h3>
            <div className="md:col-span-9 text-sm md:text-base text-gray-700 leading-relaxed space-y-3">
                {children}
            </div>
        </ScrollReveal>
    );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 shrink-0 text-normal-maroon mt-0.5" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function BigFigure({ value, label }: { value: string; label: string }) {
    return (
        <div>
            <p
                className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl leading-none text-normal-maroon`}
            >
                {value}
            </p>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">{label}</p>
        </div>
    );
}

const externalLinkClass =
    "inline-flex items-center gap-1 text-normal-maroon font-semibold underline underline-offset-2 hover:text-dark-maroon break-all";

export default function ResourcesPage() {
    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen overflow-hidden">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        {/* Page header */}
                        <div className="text-center mb-14 sm:mb-20">
                            <ScrollReveal>
                                <h1
                                    className={`${DisplayBebasNeue.className} text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-normal-maroon tracking-wide leading-none`}
                                >
                                    Resources
                                </h1>
                                <p
                                    className={`${MainInter.className} mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto`}
                                >
                                    Planning your journey to Hong Kong?
                                    Here&apos;s everything you need to prepare
                                    before you embark on this exciting
                                    adventure, along with important resources
                                    and what to expect during your stay.
                                </p>
                            </ScrollReveal>
                        </div>

                        {/* ============ PHASE 01 — PRE-ARRIVAL ============ */}
                        <section className="mb-16 sm:mb-24">
                            <PhaseHeader
                                index="01"
                                icon={PlaneTakeoff}
                                title="Pre-Arrival Preparations"
                                description="Get your documents, bookings, and packing sorted before you fly."
                            />
                            <div className="border-t border-normal-maroon/15">
                                <ItemRow title="Passport">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-wrap gap-x-10 gap-y-4">
                                                <BigFigure
                                                    value="6 MONTHS"
                                                    label="Minimum passport validity from your intended date of arrival"
                                                />
                                            </div>
                                            <p>
                                                <strong className="text-normal-maroon">
                                                    Important:
                                                </strong>{" "}
                                                keep your landing slip safe —
                                                you&apos;ll receive it upon
                                                arrival in Hong Kong and
                                                it&apos;s essential for all
                                                administrative processes at
                                                CityU. Many students forget this
                                                important document, which can
                                                cause delays.
                                            </p>
                                        </div>
                                        <figure className="shrink-0 w-28 sm:w-32 mx-auto md:mx-0 relative">
                                            <span
                                                aria-hidden
                                                className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-14 bg-normal-creme border border-normal-maroon/15 rotate-[-2deg]"
                                            />
                                            <Image
                                                src={landingSlip}
                                                alt="Sample landing slip"
                                                width={128}
                                                height={202}
                                                className="w-full h-auto shadow-md rotate-[-3deg] hover:rotate-0 transition-transform duration-500"
                                            />
                                            <figcaption className="text-center text-xs text-gray-500 mt-2">
                                                Sample landing slip
                                            </figcaption>
                                        </figure>
                                    </div>
                                </ItemRow>

                                <ItemRow title="Student Visa" delay={0.1}>
                                    <p>Check your visa for the following key dates:</p>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>Date of Issue:</strong>{" "}
                                                When your visa was granted.
                                            </>,
                                            <>
                                                <strong>Date of Expiry:</strong>{" "}
                                                The last day your visa is valid.
                                            </>,
                                            <>
                                                <strong>
                                                    &quot;Must Enter By&quot;:
                                                </strong>{" "}
                                                Some visas stipulate a specific
                                                date for your initial entry.
                                            </>,
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Hong Kong Identity Card (HKID)" delay={0.15}>
                                    <div className="flex flex-wrap gap-x-10 gap-y-4 mb-1">
                                        <BigFigure
                                            value="30 DAYS"
                                            label="From your arrival to book your HKID appointment — do it as soon as you receive your visa"
                                        />
                                    </div>
                                    <a
                                        href="https://www.gov.hk/en/residents/immigration/idcard/hkic/bookregidcard.htm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={externalLinkClass}
                                    >
                                        Online Appointment Booking for HKID
                                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                                    </a>
                                </ItemRow>

                                <ItemRow title="Flights" delay={0.2}>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>Direct:</strong> Cathay
                                                Pacific, Garuda Indonesia.
                                            </>,
                                            <>
                                                <strong>Indirect:</strong>{" "}
                                                Singapore Airlines, Malaysia
                                                Airlines, Air Asia.
                                            </>,
                                            <>
                                                Benefit from student fares and
                                                additional baggage allowances.
                                            </>,
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Insurance" delay={0.25}>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>Mandatory:</strong>{" "}
                                                CityUHK Basic Package.
                                            </>,
                                            <>
                                                <strong>Optional:</strong>{" "}
                                                CityUHK Top Up Package.
                                            </>,
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Banking (Optional)" delay={0.3}>
                                    <p>
                                        Consider opening a multi-currency
                                        account in Indonesia before you leave:
                                    </p>
                                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                                        {[
                                            "Jenius (VISA Card)",
                                            "OCBC (MasterCard, cash withdrawal)",
                                            "Livin by Mandiri",
                                            "Wondr by BNI",
                                        ].map((bank) => (
                                            <span
                                                key={bank}
                                                className="text-normal-maroon font-semibold"
                                            >
                                                {bank}
                                            </span>
                                        ))}
                                    </div>
                                    <p>
                                        If you choose not to open an account,
                                        ensure you have enough cash to cover
                                        initial expenses until your HK account
                                        is ready.
                                    </p>
                                </ItemRow>

                                <ItemRow title="Packing Essentials" delay={0.35}>
                                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                                        <BigFigure
                                            value="27–31°C"
                                            label="Summer (Apr–Nov) — humid, pack light breathable clothes"
                                        />
                                        <BigFigure
                                            value="8–12°C"
                                            label="Winter (Dec–Mar) — strong winds, bring warm layers"
                                        />
                                    </div>
                                    <BulletList
                                        items={[
                                            "Personal medicines",
                                            "Important documents (original and translated versions)",
                                            "Bedding necessities (bed cover, blanket, pillow)",
                                            "Instant food and snacks",
                                        ]}
                                    />
                                </ItemRow>
                            </div>
                        </section>

                        {/* ============ PHASE 02 — ON ARRIVAL ============ */}
                        <section className="mb-16 sm:mb-24">
                            <PhaseHeader
                                index="02"
                                icon={PlaneLanding}
                                title="On Arrival"
                                description="Enrollment, transport, and connectivity once you land."
                            />
                            <div className="border-t border-normal-maroon/15">
                                <ItemRow title="Important Dates" delay={0}>
                                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                                        <BigFigure
                                            value="AUG"
                                            label="Early August — keep an eye on your inbox for the CityUHK Enrollment Notification email; it's your first step and will guide you through enrollment"
                                        />
                                    </div>
                                </ItemRow>

                                <ItemRow title="Enrollment Steps" delay={0.1}>
                                    <ol className="space-y-4">
                                        {[
                                            {
                                                n: "1",
                                                t: "Complete Pre-Enrolment",
                                                d: "Follow the instructions in your notification email carefully. This step is crucial to ensure everything is in order before you arrive.",
                                            },
                                            {
                                                n: "2",
                                                t: "On-Campus Enrollment (SID Verification)",
                                                d: "Confirm your student ID and finalize your enrollment. It's a simple but important process!",
                                            },
                                        ].map((step) => (
                                            <li key={step.n} className="flex gap-4 items-start">
                                                <span
                                                    className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl leading-none text-normal-maroon/60 shrink-0`}
                                                >
                                                    {step.n}
                                                </span>
                                                <span>
                                                    <strong>{step.t}:</strong>{" "}
                                                    {step.d}
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                </ItemRow>

                                <ItemRow title="What to Bring for Pre-Enrollment" delay={0.15}>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>Passport:</strong> Your
                                                primary identification.
                                            </>,
                                            <>
                                                <strong>Visa:</strong> Required
                                                for your stay.
                                            </>,
                                            <>
                                                <strong>Landing Slip:</strong>{" "}
                                                Essential for administrative
                                                processes at CityU.
                                            </>,
                                            <>
                                                <strong>
                                                    Parental Consent Form:
                                                </strong>{" "}
                                                Necessary if you are under 18 on
                                                the enrollment day.
                                            </>,
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Temporary Octopus Card" delay={0.2}>
                                    <p>
                                        While you wait for your Student Octopus
                                        card, get a temporary one to get around
                                        the city effortlessly from:
                                    </p>
                                    <BulletList
                                        items={[
                                            "7-Eleven and Circle K stores",
                                            "Selected MTR stations (the nearest being the Airport MTR stations)",
                                            "Airport Octopus vending machines",
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Transportation from the Airport" delay={0.25}>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>HK-Taxi:</strong>{" "}
                                                Straightforward option, paid
                                                with cash.
                                            </>,
                                            <>
                                                <strong>Bus:</strong>{" "}
                                                Budget-friendly choice, payable
                                                with your Octopus card.
                                            </>,
                                            <>
                                                <strong>Airport Express +
                                                MTR:</strong> Quick and
                                                efficient, also payable with
                                                Octopus.
                                            </>,
                                            <>
                                                <strong>CityUHK Shuttle Bus:</strong>{" "}
                                                Available during orientation
                                                week but spots are limited —
                                                check your CityUHK email for
                                                details.
                                            </>,
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="SIM Card Options" delay={0.3}>
                                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                                        <BigFigure
                                            value="$139"
                                            label="SO SIM — 90 days, 120 GB data, at Watsons & ParknShop"
                                        />
                                        <BigFigure
                                            value="$88"
                                            label="CMHK — 120 days, 120 GB data, at 7-Eleven"
                                        />
                                    </div>
                                    <p>
                                        Staying connected is essential — grab
                                        either plan as soon as you land.
                                    </p>
                                </ItemRow>
                            </div>
                        </section>

                        {/* ============ PHASE 03 — POST ARRIVAL ============ */}
                        <section>
                            <PhaseHeader
                                index="03"
                                icon={GraduationCap}
                                title="Post Arrival Steps"
                                description="Settle in: banking, student discounts, and course management."
                            />
                            <div className="border-t border-normal-maroon/15">
                                <ItemRow title="Bank Account Setup" delay={0}>
                                    <BulletList
                                        items={[
                                            "Book your appointment a week before",
                                            "Applicants must be 18 years or older",
                                            "Bring: Passport / HKID, SID, proof of residence, etc.",
                                            "A guardian is required for students under 18 — bring your translated KK (Kartu Keluarga)",
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Local Bank Options" delay={0.1}>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>HSBC:</strong> Festival
                                                Walk, MOSTown
                                            </>,
                                            <>
                                                <strong>Hang Seng Bank:</strong>{" "}
                                                CityUHK, Festival Walk
                                            </>,
                                            <>
                                                <strong>Bank of China:</strong>{" "}
                                                CityUHK
                                            </>,
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Required Documents" delay={0.15}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <p className="font-semibold text-normal-maroon mb-2">
                                                HSBC
                                            </p>
                                            <BulletList
                                                items={[
                                                    "HK phone number",
                                                    "SID",
                                                    "Passport",
                                                ]}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-normal-maroon mb-2">
                                                Hang Seng
                                            </p>
                                            <BulletList
                                                items={[
                                                    "HK phone number",
                                                    "Passport",
                                                    <>
                                                        Proof of residence —
                                                        issued by the Student
                                                        Residence MOS Office
                                                        (requires SID). Open
                                                        Monday–Friday,
                                                        9:00 AM–1:00 PM and
                                                        2:00 PM–5:30 PM;
                                                        closed on Saturdays,
                                                        Sundays, and public
                                                        holidays.
                                                    </>,
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </ItemRow>

                                <ItemRow title="Student Octopus Card" delay={0.2}>
                                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                                        <BigFigure
                                            value="50%"
                                            label="Transport discount with the Student Octopus Card"
                                        />
                                        <BigFigure
                                            value="$1.4 / $3.2"
                                            label="Minimum fare (HKD) — East Rail Line / other lines"
                                        />
                                    </div>
                                    <p>
                                        Octopus is Hong Kong&apos;s e-money
                                        (like Flazz at home). Registration
                                        details will be shared with you soon.
                                    </p>
                                    <BulletList
                                        items={[
                                            "Download the Octopus App",
                                            "Submit required documents (photo, student card, offer letter)",
                                            "Double-check your personal information — include hall and room number in your address",
                                            "Card delivery takes up to 1 month",
                                        ]}
                                    />
                                </ItemRow>

                                <ItemRow title="Add & Drop Courses" delay={0.25}>
                                    <ol className="space-y-4">
                                        {[
                                            {
                                                n: "1",
                                                el: (
                                                    <>
                                                        Check{" "}
                                                        <a
                                                            href="https://www.cityu.edu.hk/its/services-facilities/list-of-services-facilities/a/aims-banner?c=%7B50520DE6-2A0E-4A46-BE9F-1E8074961FC8%7D"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={externalLinkClass}
                                                        >
                                                            AIMS
                                                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                                                        </a>{" "}
                                                        for the add and drop
                                                        schedule — it will be
                                                        divided into three time
                                                        tickets: electives, GE,
                                                        and both.
                                                    </>
                                                ),
                                            },
                                            {
                                                n: "2",
                                                el: (
                                                    <>
                                                        Study your
                                                        programme&apos;s
                                                        required courses and
                                                        other electives.
                                                    </>
                                                ),
                                            },
                                            {
                                                n: "3",
                                                el: (
                                                    <>
                                                        See your
                                                        programme&apos;s
                                                        recommended study
                                                        plan.
                                                    </>
                                                ),
                                            },
                                        ].map((step) => (
                                            <li key={step.n} className="flex gap-4 items-start">
                                                <span
                                                    className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl leading-none text-normal-maroon/60 shrink-0`}
                                                >
                                                    {step.n}
                                                </span>
                                                <span>{step.el}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </ItemRow>
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
