"use client";

import React, { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    y = 50,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;
        gsap.set(ref.current, { opacity: 0, y });
        gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
                markers: false,
            },
        });
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
