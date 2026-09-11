"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
    label?: string;
}

export default function LoadingSpinner({
    size = 24,
    className = "",
    label,
}: LoadingSpinnerProps) {
    const reduceMotion = useReducedMotion();
    const border = Math.max(2, Math.round(size / 6));

    return (
        <div
            role="status"
            aria-live="polite"
            aria-label={label || "Loading"}
            className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}
        >
            <motion.span
                className="block rounded-full"
                style={{
                    width: size,
                    height: size,
                    border: `${border}px solid #e6dccf`,
                    borderTopColor: "#831515",
                }}
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    ease: "linear",
                }}
            />
            {label && (
                <span className="text-xs sm:text-sm text-gray-500">
                    {label}
                </span>
            )}
        </div>
    );
}
