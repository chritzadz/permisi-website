"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/loadingSpinner";
import { modalFieldClass } from "./CreateFormModal";
import { Plus, UserPlus, X } from "lucide-react";
import { DisplayBebasNeue } from "@/lib/font";

const NEW_DIVISION_VALUE = "__new__";

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (member: { name: string; role: string; division: string }) => void;
    isLoading: boolean;
    divisions: string[];
    presetDivision?: string;
    forceNewDivision?: boolean;
}

export default function AddMemberModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    divisions,
    presetDivision,
    forceNewDivision = false
}: AddMemberModalProps) {
    const [divisionChoice, setDivisionChoice] = useState("");
    const [newDivision, setNewDivision] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (isOpen) {
            setName("");
            setRole("");
            setNewDivision("");
            if (forceNewDivision || divisions.length === 0) {
                setDivisionChoice(NEW_DIVISION_VALUE);
            } else {
                setDivisionChoice(presetDivision ?? divisions[0]);
            }
        }
    }, [isOpen, forceNewDivision, presetDivision, divisions]);

    if (!isOpen) return null;

    const isNewDivision = divisionChoice === NEW_DIVISION_VALUE;
    const resolvedDivision = (isNewDivision ? newDivision : divisionChoice).trim();
    const isValid = resolvedDivision !== "" && name.trim() !== "" && role.trim() !== "";

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
                            <UserPlus size={18} />
                        </span>
                        <h3 className={`${DisplayBebasNeue.className} text-2xl tracking-wide text-normal-maroon leading-none`}>
                            Add Member
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
                        if (!isLoading && isValid) {
                            onSubmit({ name: name.trim(), role: role.trim(), division: resolvedDivision });
                        }
                    }}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="member-division" className="text-sm font-semibold text-gray-700">
                            Division <span className="text-normal-maroon">*</span>
                        </label>
                        {divisions.length > 0 && !forceNewDivision ? (
                            <select
                                id="member-division"
                                className={`${modalFieldClass} bg-white`}
                                value={divisionChoice}
                                onChange={e => setDivisionChoice(e.target.value)}
                            >
                                {divisions.map(division => (
                                    <option key={division} value={division}>{division}</option>
                                ))}
                                <option value={NEW_DIVISION_VALUE}>+ New division...</option>
                            </select>
                        ) : (
                            <input
                                id="member-division"
                                type="text"
                                value={newDivision}
                                onChange={e => setNewDivision(e.target.value)}
                                className={modalFieldClass}
                                placeholder="e.g. Executive Board"
                                maxLength={50}
                                required
                                autoFocus
                            />
                        )}
                        {isNewDivision && divisions.length > 0 && (
                            <input
                                type="text"
                                value={newDivision}
                                onChange={e => setNewDivision(e.target.value)}
                                className={`${modalFieldClass} mt-1`}
                                placeholder="New division name"
                                maxLength={50}
                                required
                                autoFocus
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="member-name" className="text-sm font-semibold text-gray-700">
                            Full Name <span className="text-normal-maroon">*</span>
                        </label>
                        <input
                            id="member-name"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={modalFieldClass}
                            placeholder="e.g. Budi Santoso"
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="member-role" className="text-sm font-semibold text-gray-700">
                            Role <span className="text-normal-maroon">*</span>
                        </label>
                        <input
                            id="member-role"
                            type="text"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className={modalFieldClass}
                            placeholder="e.g. Chairperson"
                            maxLength={100}
                            required
                        />
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
                            disabled={isLoading || !isValid}
                            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
                                isValid
                                    ? 'bg-normal-maroon hover:bg-dark-maroon text-normal-creme'
                                    : 'bg-normal-maroon/30 text-normal-creme/80 cursor-not-allowed'
                            } ${isLoading ? 'cursor-wait' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size={16} /> Adding...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} /> Add Member
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
