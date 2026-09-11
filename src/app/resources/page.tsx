"use client";

import React from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import {
    BadgePercent,
    BusFront,
    CalendarDays,
    Check,
    ClipboardCheck,
    FileText,
    GraduationCap,
    IdCard,
    LinkIcon,
    Luggage,
    Plane,
    PlaneLanding,
    PlaneTakeoff,
    ShieldCheck,
    Smartphone,
    Stamp,
    Wallet,
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
        <div className="flex items-start gap-4 mb-6 sm:mb-8">
            <div className="bg-normal-maroon text-normal-creme rounded-lg p-3 h-fit shrink-0">
                <Icon className="h-6 w-6 md:h-7 md:w-7" />
            </div>
            <div>
                <p
                    className={`${DisplayBebasNeue.className} text-lg md:text-xl tracking-widest text-normal-maroon`}
                >
                    Phase {index}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                    {description}
                </p>
            </div>
        </div>
    );
}

function InfoCard({
    icon: Icon,
    title,
    children,
    className = "",
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <Card
            className={`border-normal-maroon/20 h-full ${className}`}
        >
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-normal-maroon" />
                    <CardTitle className="text-base md:text-lg text-normal-maroon">
                        {title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="text-sm md:text-base text-gray-700 leading-relaxed">
                {children}
            </CardContent>
        </Card>
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

const externalLinkClass =
    "text-normal-maroon font-semibold underline hover:text-dark-maroon break-all";

export default function ResourcesPage() {
    return (
        <>
            {/* Content wrapper */}
            <div className="relative min-h-screen">
                <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                        {/* Page header */}
                        <div className="text-center mb-10 sm:mb-14">
                            <h1
                                className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-normal-maroon tracking-wide`}
                            >
                                Resources
                            </h1>
                            <p
                                className={`${MainInter.className} mt-3 text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto`}
                            >
                                Planning your journey to Hong Kong?
                                Here&apos;s everything you need to prepare
                                before you embark on this exciting adventure,
                                along with important resources and what to
                                expect during your stay.
                            </p>
                        </div>

                        {/* ================= PHASE 1: PRE-ARRIVAL ================= */}
                        <section className="mb-14 sm:mb-20">
                            <PhaseHeader
                                index="01"
                                icon={PlaneTakeoff}
                                title="Pre-Arrival Preparations"
                                description="Get your documents, bookings, and packing sorted before you fly."
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoCard icon={Stamp} title="Passport" className="md:col-span-2">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 space-y-3">
                                            <p>
                                                Ensure your passport is valid
                                                for at least{" "}
                                                <strong>6 months</strong> from
                                                your intended date of arrival.
                                            </p>
                                            <div className="bg-normal-creme rounded-lg p-3">
                                                <p>
                                                    <strong>
                                                        Important:
                                                    </strong>{" "}
                                                    Keep your landing slip
                                                    safe — you&apos;ll receive
                                                    it upon arrival in Hong
                                                    Kong and it&apos;s
                                                    essential for all
                                                    administrative processes
                                                    at CityU. Many students
                                                    forget this important
                                                    document, which can
                                                    cause delays.
                                                </p>
                                            </div>
                                        </div>
                                        <figure className="shrink-0 w-28 sm:w-32 mx-auto sm:mx-0">
                                            <Image
                                                src={landingSlip}
                                                alt="Sample landing slip"
                                                width={128}
                                                height={202}
                                                className="w-full h-auto rounded-lg border border-normal-maroon/20"
                                            />
                                            <figcaption className="text-xs text-gray-500 text-center mt-1">
                                                Sample landing slip
                                            </figcaption>
                                        </figure>
                                    </div>
                                </InfoCard>

                                <InfoCard icon={FileText} title="Student Visa">
                                    <p className="mb-2">
                                        Check your visa for the following key
                                        dates:
                                    </p>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>
                                                    Date of Issue:
                                                </strong>{" "}
                                                When your visa was granted.
                                            </>,
                                            <>
                                                <strong>
                                                    Date of Expiry:
                                                </strong>{" "}
                                                The last day your visa is
                                                valid.
                                            </>,
                                            <>
                                                <strong>
                                                    &quot;Must Enter By&quot;:
                                                </strong>{" "}
                                                Some visas stipulate a
                                                specific date for your
                                                initial entry.
                                            </>,
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={IdCard} title="Hong Kong Identity Card (HKID)">
                                    <p className="mb-2">
                                        Book an appointment for your HKID as
                                        soon as you receive your visa — you
                                        have <strong>30 days</strong> from
                                        your arrival.
                                    </p>
                                    <a
                                        href="https://www.gov.hk/en/residents/immigration/idcard/hkic/bookregidcard.htm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1 ${externalLinkClass}`}
                                    >
                                        <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                                        Online Appointment Booking for HKID
                                    </a>
                                </InfoCard>

                                <InfoCard icon={Plane} title="Flights">
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>Direct:</strong>{" "}
                                                Cathay Pacific, Garuda
                                                Indonesia.
                                            </>,
                                            <>
                                                <strong>Indirect:</strong>{" "}
                                                Singapore Airlines, Malaysia
                                                Airlines, Air Asia.
                                            </>,
                                            <>
                                                Benefit from student fares
                                                and additional baggage
                                                allowances.
                                            </>,
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={ShieldCheck} title="Insurance">
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
                                </InfoCard>

                                <InfoCard icon={Wallet} title="Banking (Optional)">
                                    <p className="mb-2">
                                        Consider opening a multi-currency
                                        account in Indonesia before you
                                        leave:
                                    </p>
                                    <BulletList
                                        items={[
                                            "Jenius (VISA Card)",
                                            "OCBC (MasterCard, cash withdrawal)",
                                            "Livin by Mandiri",
                                            "Wondr by BNI",
                                        ]}
                                    />
                                    <p className="mt-2">
                                        If you choose not to open an account,
                                        ensure you have enough cash to cover
                                        initial expenses until your HK
                                        account is ready.
                                    </p>
                                </InfoCard>

                                <InfoCard icon={Luggage} title="Packing Essentials" className="md:col-span-2 lg:col-span-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Clothing
                                            </p>
                                            <BulletList
                                                items={[
                                                    <>
                                                        <strong>
                                                            Summer
                                                            (Apr–Nov):
                                                        </strong>{" "}
                                                        27–31°C, humid —
                                                        pack light,
                                                        breathable clothes.
                                                    </>,
                                                    <>
                                                        <strong>
                                                            Winter
                                                            (Dec–Mar):
                                                        </strong>{" "}
                                                        8–12°C with strong
                                                        winds — bring warm
                                                        layers.
                                                    </>,
                                                ]}
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold mb-2">
                                                Other Items
                                            </p>
                                            <BulletList
                                                items={[
                                                    "Personal medicines",
                                                    "Important documents (original and translated versions)",
                                                    "Bedding necessities (bed cover, blanket, pillow)",
                                                    "Instant food and snacks",
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </InfoCard>
                            </div>
                        </section>

                        {/* ================= PHASE 2: ON ARRIVAL ================= */}
                        <section className="mb-14 sm:mb-20">
                            <PhaseHeader
                                index="02"
                                icon={PlaneLanding}
                                title="On Arrival"
                                description="Enrollment, transport, and connectivity once you land."
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoCard icon={CalendarDays} title="Important Dates to Remember" className="md:col-span-2 lg:col-span-3">
                                    <p>
                                        <strong>Early August:</strong> Keep an
                                        eye on your inbox for the CityUHK
                                        Enrollment Notification email — this
                                        is your first step, and it will guide
                                        you through enrollment!
                                    </p>
                                </InfoCard>

                                <InfoCard icon={ClipboardCheck} title="Enrollment Steps">
                                    <ol className="space-y-3 list-none">
                                        <li className="flex gap-3">
                                            <span className="bg-normal-maroon text-normal-creme rounded-full h-6 w-6 shrink-0 flex items-center justify-center text-xs font-bold">
                                                1
                                            </span>
                                            <span>
                                                <strong>
                                                    Complete
                                                    Pre-Enrolment:
                                                </strong>{" "}
                                                Follow the instructions in
                                                your notification email
                                                carefully. This step is
                                                crucial to ensure everything
                                                is in order before you
                                                arrive.
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="bg-normal-maroon text-normal-creme rounded-full h-6 w-6 shrink-0 flex items-center justify-center text-xs font-bold">
                                                2
                                            </span>
                                            <span>
                                                <strong>
                                                    On-Campus Enrollment
                                                    (SID Verification):
                                                </strong>{" "}
                                                Confirm your student ID and
                                                finalize your enrollment.
                                                It&apos;s a simple but
                                                important process!
                                            </span>
                                        </li>
                                    </ol>
                                </InfoCard>

                                <InfoCard icon={FileText} title="What to Bring for Pre-Enrollment">
                                    <p className="mb-2">
                                        When attending pre-enrollment, be
                                        sure to bring these essential
                                        documents:
                                    </p>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>Passport:</strong>{" "}
                                                Your primary identification.
                                            </>,
                                            <>
                                                <strong>Visa:</strong>{" "}
                                                Required for your stay.
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
                                                Necessary if you are under
                                                18 on the enrollment day.
                                            </>,
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={BusFront} title="Temporary Octopus Card">
                                    <p className="mb-2">
                                        While you wait for your Student
                                        Octopus card, get a temporary one to
                                        travel around the city effortlessly
                                        from:
                                    </p>
                                    <BulletList
                                        items={[
                                            "7-Eleven and Circle K stores",
                                            "Selected MTR stations (the nearest being the Airport MTR stations)",
                                            "Airport Octopus vending machines",
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={BusFront} title="Transportation from the Airport">
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>HK-Taxi:</strong>{" "}
                                                Straightforward option, paid
                                                with cash.
                                            </>,
                                            <>
                                                <strong>Bus:</strong>{" "}
                                                Budget-friendly choice,
                                                payable with your Octopus
                                                card.
                                            </>,
                                            <>
                                                <strong>
                                                    Airport Express +
                                                    MTR:
                                                </strong>{" "}
                                                Quick and efficient, also
                                                payable with Octopus.
                                            </>,
                                            <>
                                                <strong>
                                                    CityUHK Shuttle Bus:
                                                </strong>{" "}
                                                Available during orientation
                                                week but spots are limited —
                                                check your CityUHK email for
                                                details.
                                            </>,
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={Smartphone} title="SIM Card Options">
                                    <p className="mb-2">
                                        Staying connected is essential. Two
                                        great options:
                                    </p>
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>SO SIM:</strong>{" "}
                                                Available at Watsons &amp;
                                                ParknShop for $139 for 90
                                                days with 120 GB of data.
                                            </>,
                                            <>
                                                <strong>CMHK:</strong>{" "}
                                                Plan available at 7-Eleven
                                                for $88 for 120 days, also
                                                with 120 GB of data.
                                            </>,
                                        ]}
                                    />
                                </InfoCard>
                            </div>
                        </section>

                        {/* ================= PHASE 3: POST ARRIVAL ================= */}
                        <section>
                            <PhaseHeader
                                index="03"
                                icon={GraduationCap}
                                title="Post Arrival Steps"
                                description="Settle in: banking, student discounts, and course management."
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoCard icon={Wallet} title="Bank Account Setup">
                                    <BulletList
                                        items={[
                                            "Book your appointment a week before",
                                            "Applicants must be 18 years or older",
                                            "Bring: Passport / HKID, SID, proof of residence, etc.",
                                            "A guardian is required for students under 18 — bring your translated KK (Kartu Keluarga)",
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={Stamp} title="Local Bank Options">
                                    <BulletList
                                        items={[
                                            <>
                                                <strong>HSBC:</strong>{" "}
                                                Festival Walk, MOSTown
                                            </>,
                                            <>
                                                <strong>
                                                    Hang Seng Bank:
                                                </strong>{" "}
                                                CityUHK, Festival Walk
                                            </>,
                                            <>
                                                <strong>
                                                    Bank of China:
                                                </strong>{" "}
                                                CityUHK
                                            </>,
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={FileText} title="Required Documents — HSBC">
                                    <BulletList
                                        items={[
                                            "HK phone number",
                                            "SID",
                                            "Passport",
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={FileText} title="Required Documents — Hang Seng" className="md:col-span-2">
                                    <BulletList
                                        items={[
                                            "HK phone number",
                                            "Passport",
                                            <>
                                                Proof of residence — issued by
                                                the Student Residence MOS
                                                Office (requires SID).
                                                <span className="block text-xs text-gray-500 mt-1">
                                                    Open Monday–Friday,
                                                    9:00 AM–1:00 PM and
                                                    2:00 PM–5:30 PM. Closed
                                                    on Saturdays, Sundays,
                                                    and public holidays.
                                                </span>
                                            </>,
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={BadgePercent} title="Student Octopus Card">
                                    <p className="mb-2">
                                        Octopus is Hong Kong&apos;s e-money
                                        (like Flazz at home). The Student
                                        Octopus Card gives you a{" "}
                                        <strong>
                                            50% transport discount
                                        </strong>
                                        , with a minimum fare of $1.4 HKD on
                                        the East Rail Line and $3.2 HKD on
                                        other lines.
                                    </p>
                                    <BulletList
                                        items={[
                                            "Registration details will be shared with you soon",
                                            "Download the Octopus App",
                                            "Submit required documents (photo, student card, offer letter)",
                                            "Double-check your personal information — include hall and room number in your address",
                                            "Card delivery takes up to 1 month",
                                        ]}
                                    />
                                </InfoCard>

                                <InfoCard icon={GraduationCap} title="Add & Drop Courses" className="md:col-span-2 lg:col-span-3">
                                    <ol className="space-y-3 list-none">
                                        <li className="flex gap-3">
                                            <span className="bg-normal-maroon text-normal-creme rounded-full h-6 w-6 shrink-0 flex items-center justify-center text-xs font-bold">
                                                1
                                            </span>
                                            <span>
                                                Check{" "}
                                                <a
                                                    href="https://www.cityu.edu.hk/its/services-facilities/list-of-services-facilities/a/aims-banner?c=%7B50520DE6-2A0E-4A46-BE9F-1E8074961FC8%7D"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={externalLinkClass}
                                                >
                                                    AIMS
                                                </a>{" "}
                                                for the add and drop
                                                schedule — it will be
                                                divided into three time
                                                tickets: electives, GE, and
                                                both.
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="bg-normal-maroon text-normal-creme rounded-full h-6 w-6 shrink-0 flex items-center justify-center text-xs font-bold">
                                                2
                                            </span>
                                            <span>
                                                Study your
                                                programme&apos;s required
                                                courses and other electives.
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="bg-normal-maroon text-normal-creme rounded-full h-6 w-6 shrink-0 flex items-center justify-center text-xs font-bold">
                                                3
                                            </span>
                                            <span>
                                                See your
                                                programme&apos;s
                                                recommended study plan.
                                            </span>
                                        </li>
                                    </ol>
                                </InfoCard>
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
