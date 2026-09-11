"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loadingSpinner";
import { modalFieldClass } from "./CreateFormModal";
import { CalendarPlus, Check, X } from "lucide-react";
import { DisplayBebasNeue } from "@/lib/font";

export interface AvailableForm {
    name: string;
    status: string | null;
    event_id: number | null;
}

interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: { name: string; event_date: string; description: string; linkedForm: string | null }) => void;
    isLoading: boolean;
    isSavingLink?: boolean;
    mode: "create" | "edit";
    initial?: { name: string; eventDate: string; description: string; linkedForm: string | null };
    availableForms: AvailableForm[];
}

export default function EventFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    isSavingLink = false,
    mode,
    initial,
    availableForms
}: EventFormModalProps) {
    const [name, setName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [description, setDescription] = useState("");
    const [linkedForm, setLinkedForm] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setName(initial?.name ?? "");
            setEventDate(initial?.eventDate ?? "");
            setDescription(initial?.description ?? "");
            setLinkedForm(initial?.linkedForm ?? null);
        }
    }, [isOpen, initial]);

    if (!isOpen) return null;

    const isValid = name.trim() !== "" && eventDate !== "";
    const busy = isLoading || isSavingLink;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-[28rem] max-w-full m-4 cursor-default" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="bg-normal-maroon text-normal-creme rounded-sm p-2">
                            <CalendarPlus size={18} />
                        </span>
                        <h3 className={`${DisplayBebasNeue.className} text-2xl tracking-wide text-normal-maroon leading-none`}>
                            {mode === "create" ? "Create Event" : "Edit Event"}
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

                <form
                    className="flex flex-col gap-4"
                    onSubmit={e => {
                        e.preventDefault();
                        if (!busy && isValid) {
                            onSubmit({ name: name.trim(), event_date: eventDate, description: description.trim(), linkedForm });
                        }
                    }}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="event-name" className="text-sm font-semibold text-gray-700">
                            Event Name <span className="text-normal-maroon">*</span>
                        </label>
                        <input
                            id="event-name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={modalFieldClass}
                            placeholder="e.g. Welcoming Session 2026"
                            maxLength={255}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="event-date" className="text-sm font-semibold text-gray-700">
                            Event Date <span className="text-normal-maroon">*</span>
                        </label>
                        <input
                            id="event-date"
                            type="date"
                            value={eventDate}
                            onChange={e => setEventDate(e.target.value)}
                            className={modalFieldClass}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="event-description" className="text-sm font-semibold text-gray-700">
                            Description <span className="text-xs font-normal text-gray-400">(optional)</span>
                        </label>
                        <textarea
                            id="event-description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className={`${modalFieldClass} resize-none h-24`}
                            placeholder="What is this event about?"
                            maxLength={5000}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="event-form" className="text-sm font-semibold text-gray-700">
                            Connect Form <span className="text-xs font-normal text-gray-400">(optional)</span>
                        </label>
                        <select
                            id="event-form"
                            className={`${modalFieldClass} bg-white`}
                            value={linkedForm ?? ""}
                            onChange={e => setLinkedForm(e.target.value === "" ? null : e.target.value)}
                        >
                            <option value="">No form</option>
                            {availableForms.map(form => (
                                <option key={form.name} value={form.name}>
                                    {form.name} {form.status ? `(${form.status})` : ""}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500">
                            {availableForms.length === 0
                                ? "All existing forms are already linked to another event."
                                : "Only unlinked forms can be picked — one form per event."}
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isValid || busy}
                            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
                                isValid
                                    ? 'bg-normal-maroon hover:bg-dark-maroon text-normal-creme'
                                    : 'bg-normal-maroon/30 text-normal-creme/80 cursor-not-allowed'
                            } ${busy ? 'cursor-wait' : ''}`}
                        >
                            {busy ? (
                                <>
                                    <LoadingSpinner size={16} />
                                    {isSavingLink ? "Linking form..." : "Saving..."}
                                </>
                            ) : (
                                <>
                                    <Check size={16} />
                                    {mode === "create" ? "Create Event" : "Save Changes"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
