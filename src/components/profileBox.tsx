"use client";

import React from "react";
import Image from "next/image";
import { Trash2, UserRound } from "lucide-react";

interface ProfileBoxProps {
    name: string;
    role: string;
    photoUrl?: string | null;
    onRemove?: () => void;
}

const ProfileBox = ({ name, role, photoUrl, onRemove }: ProfileBoxProps) => {
    return (
        <div className="group relative flex flex-col items-center w-28 sm:w-32 shrink-0 text-center">
            {photoUrl ? (
                <div className="relative w-20 h-20 rounded-full border border-normal-maroon/20 bg-white shadow-sm overflow-hidden">
                    <Image
                        src={photoUrl}
                        alt={name}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            ) : (
                <div className="w-20 h-20 rounded-full border border-normal-maroon/20 bg-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
                    <UserRound className="w-10 h-10 text-normal-maroon" strokeWidth={1.5} />
                </div>
            )}
            <p className="mt-3 font-semibold text-sm leading-tight text-gray-900 w-full break-words">
                {name}
            </p>
            <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-wider w-full break-words">
                {role}
            </p>
            {onRemove && (
                <button
                    aria-label={`Remove ${name}`}
                    title="Remove member"
                    className="absolute -top-1 -right-1 p-1.5 rounded-full bg-white border border-normal-maroon/20 shadow-sm text-gray-400 hover:text-dark-maroon opacity-0 group-hover:opacity-100 transition-all"
                    onClick={onRemove}
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
}

export default ProfileBox;
