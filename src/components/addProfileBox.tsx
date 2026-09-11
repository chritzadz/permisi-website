"use client";

import React from "react";
import { Plus } from "lucide-react";

interface AddProfileBoxProps {
    onAdd: () => void;
}

const AddProfileBox = ({ onAdd }: AddProfileBoxProps) => {
    return (
        <button
            type="button"
            onClick={onAdd}
            className="group/add flex flex-col items-center w-28 sm:w-32 shrink-0 text-center cursor-pointer"
        >
            <span className="w-20 h-20 rounded-full border-2 border-dashed border-normal-maroon/40 flex items-center justify-center text-normal-maroon group-hover/add:bg-normal-creme group-hover/add:border-normal-maroon transition-all">
                <Plus className="w-7 h-7" strokeWidth={1.5} />
            </span>
            <span className="mt-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider group-hover/add:text-normal-maroon transition-colors">
                Add member
            </span>
        </button>
    );
}

export default AddProfileBox;
