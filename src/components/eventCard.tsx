"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import welcomingFreshman from "./../../public/assets/welcoming-freshman.png";
import { useRouter } from "next/navigation";

export default function EventCard({}) {
    const router = useRouter();

    const handleOnClick = () => {
        router.push("/admin/home");
    };

    return (
        <>
            <Card className="max-w-4xl mx-auto">
                <CardContent className="p-8 ">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="relative aspect-video w-full">
                            <Image
                                src={welcomingFreshman}
                                alt="Group activity"
                                fill
                                className="object-cover rounded-lg w-full"
                            />
                        </div>
                        <div className="text-left">
                            <div className="flex items-center mb-4">
                                <Calendar className="h-5 w-5 text-normal-maroon mr-2" />
                                <span
                                    className={`text-sm text-gray-900 font-medium`}
                                >
                                    {"20 July 2025"}
                                </span>
                            </div>
                            <h3
                                className={`text-2xl font-bold text-gray-900 mb-4`}
                            >
                                Welcoming Sessions Student in Jakarta
                            </h3>
                            <p className={`text-gray-600 mb-6`}>
                                Join us for an exciting welcoming session for
                                new Indonesian students! This event will feature
                                orientation activities, cultural performances,
                                and networking opportunities to help new members
                                integrate into our community.
                            </p>
                            <Button
                                className="bg-normal-maroon hover:bg-dark-maroon"
                                onClick={handleOnClick}
                            >
                                See Details{" "}
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
