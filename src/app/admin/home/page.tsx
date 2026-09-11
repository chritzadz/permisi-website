"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/scrollReveal";
import LoadingSpinner from "@/components/loadingSpinner";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import { ArrowUpRight, BookText, CalendarDays } from "lucide-react";

interface Stats {
    forms: number | null;
    events: number | null;
}

const quickLinks = [
    {
        index: "01",
        title: "Custom Forms",
        description: "Create, edit, and manage registration forms",
        routePath: "/admin/form",
    },
    {
        index: "02",
        title: "Update Members",
        description: "Manage the executive board and divisions",
        routePath: "/admin/member/update",
    },
];

const AdminHomePage = () => {
    const router = useRouter();
    const [stats, setStats] = useState<Stats>({ forms: null, events: null });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [formsRes, eventsRes] = await Promise.all([
                    fetch("/api/forms?page=1&limit=1"),
                    fetch("/api/events?page=1&limit=1"),
                ]);
                const formsData = await formsRes.json();
                const eventsData = await eventsRes.json();

                setStats({
                    forms: formsData.totalCount ?? 0,
                    events: eventsData.pagination?.total ?? 0,
                });
            } catch (error) {
                console.error("Error loading dashboard stats:", error);
                setStats({ forms: 0, events: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="w-full min-h-screen">
            <section className="py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 w-full">
                    {/* Header */}
                    <ScrollReveal>
                        <p className={`${DisplayBebasNeue.className} text-lg tracking-[0.3em] text-normal-maroon/70`}>
                            PERMISI HK
                        </p>
                        <h1 className={`${DisplayBebasNeue.className} mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-normal-maroon tracking-wide leading-none`}>
                            Dashboard
                        </h1>
                        <div className="mt-4 h-1 w-16 bg-normal-maroon" />
                        <p className={`${MainInter.className} mt-4 text-sm sm:text-base text-gray-600`}>
                            Welcome back, Admin. Here&apos;s what&apos;s
                            happening in the association.
                        </p>
                    </ScrollReveal>

                    {/* Stats */}
                    {isLoading ? (
                        <div className="flex justify-center py-16">
                            <LoadingSpinner size={32} label="Loading stats..." />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 sm:mt-14">
                            <ScrollReveal>
                                <div className="flex items-start gap-5 border border-normal-maroon/15 rounded-sm p-6">
                                    <BookText className="h-6 w-6 shrink-0 text-normal-maroon mt-2" />
                                    <div>
                                        <p className={`${DisplayBebasNeue.className} text-6xl sm:text-7xl leading-none text-normal-maroon`}>
                                            {stats.forms ?? 0}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600 uppercase tracking-wider">
                                            Custom Forms
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal delay={0.15}>
                                <div className="flex items-start gap-5 border border-normal-maroon/15 rounded-sm p-6">
                                    <CalendarDays className="h-6 w-6 shrink-0 text-normal-maroon mt-2" />
                                    <div>
                                        <p className={`${DisplayBebasNeue.className} text-6xl sm:text-7xl leading-none text-normal-maroon`}>
                                            {stats.events ?? 0}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600 uppercase tracking-wider">
                                            Events
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    )}

                    {/* Quick Links */}
                    <div className="mt-12 sm:mt-16">
                        <h2 className={`${DisplayBebasNeue.className} text-2xl sm:text-3xl tracking-wide text-normal-maroon mb-2`}>
                            Quick Links
                        </h2>
                        <div className="border-t border-normal-maroon/15">
                            {quickLinks.map((link, i) => (
                                <ScrollReveal
                                    key={link.routePath}
                                    delay={i * 0.1}
                                >
                                    <button
                                        className="w-full text-left flex items-center gap-4 sm:gap-8 py-5 sm:py-6 border-b border-normal-maroon/15 group cursor-pointer"
                                        onClick={() => router.push(link.routePath)}
                                    >
                                        <span className={`${DisplayBebasNeue.className} text-3xl sm:text-4xl leading-none text-normal-maroon/50 w-12 shrink-0`}>
                                            {link.index}
                                        </span>
                                        <span className="flex-1">
                                            <span className="block font-semibold text-gray-900 group-hover:text-normal-maroon transition-colors">
                                                {link.title}
                                            </span>
                                            <span className="block text-sm text-gray-500 mt-0.5">
                                                {link.description}
                                            </span>
                                        </span>
                                        <ArrowUpRight className="h-5 w-5 shrink-0 text-normal-maroon opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </button>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminHomePage;
