import { useState } from "react";
import { FormInputNumberEditBoxProp } from "./properties/FormInputNumberEditBoxProp";
import { Trash2, Check, PenLine, X } from 'lucide-react';
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { apiFetch } from "@/lib/apiFetch";
import { DisplayBebasNeue } from "@/lib/font";

export default function FormInputNumberEditBox({question, id, onDelete, state, setState, index = 0}: FormInputNumberEditBoxProp) {
    const [questionState, setQuestionState] = useState(question);
    const [finalQuestionState, setFinalQuestionState] = useState(question);

    const isActive = state === id;

    const handleCheckClick = async () => {
        const response = await apiFetch('/api/formInputs', {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                question: questionState
            }),
        });
        const data = await response.json();
        const newFormInput = data.data as FormInputModel;

        setFinalQuestionState(newFormInput.question);
        setQuestionState(newFormInput.question);
        setState(-100);
    }

    const handleEditClick = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setState(id);
        setQuestionState(finalQuestionState);
    }

    const handleCancelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setQuestionState(finalQuestionState);
        setState(-100);
    }

    return (
        <div 
            onClick={(e) => { if (isActive) e.stopPropagation(); }}
            onDoubleClick={isActive ? undefined : handleEditClick}
            className={`
                group relative w-full rounded-xl transition-all duration-300 mb-4 cursor-pointer
                ${isActive 
                    ? 'bg-normal-creme shadow-lg ring-1 ring-normal-maroon/20 scale-[1.01] z-10 cursor-default' 
                    : 'bg-white border border-normal-maroon/15 shadow-sm hover:shadow-md'
                }
            `}
        >
            {isActive ? (
                // Edit Mode
                <div className="p-6 flex flex-col gap-4 animate-in fade-in duration-200">
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <span className={`${DisplayBebasNeue.className} text-xl leading-none text-normal-maroon/50`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs font-bold text-normal-maroon uppercase tracking-wider">
                                Editing Number Field
                            </span>
                        </label>
                        <input 
                            type="text" 
                            value={questionState} 
                            placeholder="Type your question here..." 
                            autoFocus
                            onChange={e => setQuestionState(e.target.value)} 
                            className="w-full text-lg font-medium border-b-2 border-gray-200 focus:border-normal-maroon bg-transparent outline-none py-2 px-1 transition-colors"
                        />
                    </div>
                    
                    <div className="flex flex-row items-center justify-between pt-2 border-t border-normal-maroon/10 mt-2">
                        <button 
                            className="p-2 text-gray-400 hover:text-dark-maroon hover:bg-white rounded-full transition-colors"
                            onClick={onDelete}
                            title="Delete question"
                        >
                            <Trash2 size={20} />
                        </button>
                        <div className="flex flex-row gap-2">
                            <button 
                                className="p-2 text-gray-400 hover:text-dark-maroon hover:bg-white rounded-full transition-colors"
                                onClick={handleCancelClick}
                                title="Cancel"
                            >
                                <X size={20} />
                            </button>
                            <button 
                                className="p-2 text-normal-creme bg-normal-maroon hover:bg-dark-maroon rounded-full shadow-md transition-all hover:scale-105"
                                onClick={handleCheckClick}
                                title="Save changes"
                            >
                                <Check size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                // Display Mode — mirrors the public form input
                <div className="p-6 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                            <span className={`${DisplayBebasNeue.className} text-2xl leading-none text-normal-maroon/40 shrink-0`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="text-lg font-medium text-gray-900">{finalQuestionState}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-normal-maroon border border-normal-maroon/30 rounded-full px-2 py-1">
                                Number
                            </span>
                            <button 
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-normal-maroon cursor-pointer p-1 rounded-full hover:bg-normal-creme"
                                onClick={handleEditClick}
                                title="Edit"
                            >
                                <PenLine size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="ml-9">
                        <div className="w-full text-sm text-gray-400 italic bg-gray-50/50 border-b-2 border-gray-200 py-2 px-3 rounded-t-md">
                            Type your answer here...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
