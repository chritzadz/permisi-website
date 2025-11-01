"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

interface CTAButtonProps {
    className?: string;
}

export default function CTAButton({ className = "" }: CTAButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);
    const arrowRef = useRef<SVGPathElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    // SVG paths for "Discover Our Community" in handwritten calligraphy style
    // Each path represents a stroke segment forming the letters
    const textPaths = [
        // "Discover" - D
        "M 5 20 L 5 50",
        "M 5 20 Q 5 15 12 15 Q 20 15 20 25 Q 20 45 12 45 Q 5 45 5 40",
        // i
        "M 28 20 L 28 35",
        "M 28 17 Q 28 14 31 14 Q 34 14 34 17 Q 34 20 31 20 Q 28 20 28 17",
        // s
        "M 40 25 Q 40 20 45 20 Q 50 20 50 25 Q 50 30 45 30 Q 40 30 40 35 Q 40 40 45 40 Q 50 40 50 45",
        // c
        "M 58 25 Q 58 20 63 20 Q 68 20 68 25 Q 68 45 63 45 Q 58 45 58 40",
        // o
        "M 75 25 Q 75 20 80 20 Q 85 20 85 25 Q 85 45 80 45 Q 75 45 75 40 Q 75 25 80 25 Q 85 25 85 25",
        // v
        "M 92 20 L 100 45",
        "M 108 20 L 100 45",
        // e
        "M 115 25 Q 115 20 120 20 Q 125 20 125 25 Q 125 30 115 30 L 125 30",
        "M 115 30 Q 115 35 120 35 Q 125 35 125 40 Q 125 45 120 45 Q 115 45 115 40",
        // r
        "M 133 20 L 133 45",
        "M 133 20 Q 133 25 138 25 Q 143 25 143 30",
        // "Our" - O
        "M 155 25 Q 155 20 160 20 Q 165 20 165 25 Q 165 45 160 45 Q 155 45 155 40 Q 155 25 160 25 Q 165 25 165 25",
        // u
        "M 173 20 L 173 40 Q 173 45 178 45 Q 183 45 183 40 L 183 20",
        // r
        "M 190 20 L 190 45",
        "M 190 20 Q 190 25 195 25 Q 200 25 200 30",
        // "Community" - C
        "M 215 25 Q 215 20 220 20 Q 225 20 225 25",
        "M 215 25 Q 215 45 220 45 Q 225 45 225 40",
        // o
        "M 233 25 Q 233 20 238 20 Q 243 20 243 25 Q 243 45 238 45 Q 233 45 233 40 Q 233 25 238 25 Q 243 25 243 25",
        // m
        "M 251 20 L 251 45",
        "M 251 20 Q 251 25 256 25 Q 261 25 261 32 Q 261 25 266 25 Q 271 25 271 32",
        "M 271 20 L 271 45",
        // m
        "M 279 20 L 279 45",
        "M 279 20 Q 279 25 284 25 Q 289 25 289 32 Q 289 25 294 25 Q 299 25 299 32",
        "M 299 20 L 299 45",
        // u
        "M 307 20 L 307 40 Q 307 45 312 45 Q 317 45 317 40 L 317 20",
        // n
        "M 325 20 L 325 45",
        "M 325 20 Q 325 25 330 25 Q 335 25 335 32",
        "M 335 20 L 335 45",
        // i
        "M 343 20 L 343 35",
        "M 343 17 Q 343 14 346 14 Q 349 14 349 17 Q 349 20 346 20 Q 343 20 343 17",
        // t
        "M 357 15 L 357 45",
        "M 352 25 L 362 25",
        // y
        "M 370 20 L 370 35 Q 370 40 375 40 Q 380 40 380 35",
        "M 380 35 L 380 45",
    ];

    useEffect(() => {
        if (!svgRef.current || pathRefs.current.length === 0) return;

        if (isHovered && !hasAnimated) {
            // Show SVG
            gsap.set(svgRef.current, { opacity: 1 });

            // Initialize paths with stroke-dasharray for animation
            pathRefs.current.forEach((path) => {
                if (path) {
                    const length = path.getTotalLength();
                    gsap.set(path, {
                        strokeDasharray: length,
                        strokeDashoffset: length,
                        opacity: 1,
                    });
                }
            });

            // Create timeline for sequential drawing
            const timeline = gsap.timeline({
                onComplete: () => {
                    setHasAnimated(true);
                    // Animate arrow after text
                    if (arrowRef.current) {
                        gsap.to(arrowRef.current, {
                            opacity: 1,
                            x: 4,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                },
            });

            // Animate each path sequentially (handwriting effect)
            pathRefs.current.forEach((path, index) => {
                if (path) {
                    timeline.to(
                        path,
                        {
                            strokeDashoffset: 0,
                            duration: 0.4,
                            ease: "power2.out",
                        },
                        index * 0.08,
                    );
                }
            });
        } else if (!isHovered && hasAnimated) {
            // Fade out SVG when not hovered
            gsap.to(svgRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    setHasAnimated(false);
                    // Reset paths
                    pathRefs.current.forEach((path) => {
                        if (path) {
                            const length = path.getTotalLength();
                            gsap.set(path, {
                                strokeDashoffset: length,
                                opacity: 1,
                            });
                        }
                    });
                    if (arrowRef.current) {
                        gsap.set(arrowRef.current, {
                            opacity: 0,
                            x: 0,
                        });
                    }
                },
            });
        }
    }, [isHovered, hasAnimated]);

    return (
        <button
            ref={buttonRef}
            className={`group relative bg-white hover:bg-dark-maroon text-normal-maroon hover:text-white font-bold py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-full transition-all duration-300 transform shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white/20 cursor-pointer overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Normal text */}
            <span className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                <span className="text-base sm:text-lg md:text-xl transition-opacity duration-300 group-hover:opacity-0">
                    Discover Our Community
                </span>
                <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </span>

            {/* Animated SVG calligraphy */}
            <svg
                ref={svgRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0"
                viewBox="0 0 400 70"
                preserveAspectRatio="xMidYMid meet"
                style={{ width: "95%", height: "60%" }}
            >
                <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {textPaths.map((path, index) => (
                        <path
                            key={index}
                            ref={(el) => {
                                pathRefs.current[index] = el;
                            }}
                            d={path}
                            style={{ opacity: 0 }}
                        />
                    ))}
                    {/* Arrow */}
                    <path
                        ref={arrowRef}
                        d="M 385 35 L 390 40 L 385 45 M 390 40 L 375 40"
                        strokeWidth="2"
                        style={{ opacity: 0 }}
                    />
                </g>
            </svg>
        </button>
    );
}
