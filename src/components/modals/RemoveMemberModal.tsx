"use client";

import React from "react";
import LoadingSpinner from "@/components/loadingSpinner";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { DisplayBebasNeue } from "@/lib/font";

interface RemoveMemberModalProps {
    isOpen: boolean;
    memberName: string;
    memberRole: string;
    division: string;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function RemoveMemberModal({
    isOpen,
    memberName,
    memberRole,
    division,
    isLoading,
    onClose,
    onConfirm
}: RemoveMemberModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4 cursor-default" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="bg-dark-maroon text-normal-creme rounded-sm p-2">
                            <AlertTriangle size={18} />
                        </span>
                        <h3 className={`${DisplayBebasNeue.className} text-2xl tracking-wide text-normal-maroon leading-none`}>
                            Remove Member
                        </h3>
                    </div>
                    <button
                        aria-label="Close"
                        className="p-1.5 rounded-full text-gray-400 hover:text-dark-maroon hover:bg-normal-creme transition-colors"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                    Remove <span className="font-bold text-black">{memberName}</span>
                    {" "}<span className="text-gray-500">({memberRole} &middot; {division})</span> from the
                    board? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        className={`px-4 py-2 bg-dark-maroon hover:bg-normal-maroon text-normal-creme rounded-sm transition-colors flex items-center gap-2 ${isLoading ? 'cursor-wait' : ''}`}
                        onClick={onConfirm}
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner size={16} /> Removing...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} /> Remove
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
