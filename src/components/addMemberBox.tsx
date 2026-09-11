"use client";

import React from "react";
import { Plus } from "lucide-react";

interface AddMemberBoxProps {
    onAdd: () => void;
}

const AddMemberBox = ({ onAdd }: AddMemberBoxProps) => {
    return (
        <button
            type="button"
            onClick={onAdd}
            className="group w-full mt-6 flex flex-row gap-3 items-center justify-center py-5 text-normal-maroon border-2 border-dashed border-normal-maroon/40 rounded-xl hover:bg-normal-creme hover:border-normal-maroon transition-all cursor-pointer"
        >
            <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-semibold text-sm uppercase tracking-wider">
                Add new division
            </span>
        </button>
    );
}

export default AddMemberBox;
