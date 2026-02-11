import { useState } from "react";
import { FormInputTextEditBoxProp } from "./properties/FormInputTextEditBoxProp";
import { Trash2, Check, PenLine } from 'lucide-react';
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { apiFetch } from "@/lib/apiFetch";

export default function FormInputTextEditBox({type, question, id, onDelete, state, setState}: FormInputTextEditBoxProp) {
    const handleDoubleClick = () => {
        setState(id);
        setQuestionState(finalQuestionState);
    }

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

    const [questionState, setQuestionState] = useState(question);
    const [finalQuestionState, setFinalQuestionState] = useState(question); 

    const isActive = state === id;

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setState(id);
        setQuestionState(finalQuestionState);
    }

    return (
        <div 
            onClick={(e) => { if (isActive) e.stopPropagation(); }}
            className={`
                group relative w-full rounded-xl transition-all duration-300 mb-4
                ${isActive 
                    ? 'bg-normal-creme shadow-lg ring-1 ring-normal-maroon/20 scale-[1.01] z-10' 
                    : 'bg-normal-creme hover:bg-normal-creme  border border-gray-200 shadow-sm hover:shadow-md'
                }
            `}
        >
            {isActive ? (
                // Edit Mode
                <div className="p-6 flex flex-col gap-4 animate-in fade-in duration-200">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-normal-maroon uppercase tracking-wider">
                            Editing Text Field
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
                    
                    <div className="flex flex-row justify-end gap-2 pt-2 border-t border-gray-100 mt-2">
                        <button 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            onClick={onDelete}
                            title="Delete"
                        >
                            <Trash2 size={20} />
                        </button>
                        <button 
                            className="p-2 text-white bg-normal-maroon hover:bg-dark-maroon rounded-full shadow-md transition-all hover:scale-105"
                            onClick={handleCheckClick}
                            title="Save Changes"
                        >
                            <Check size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                // Display Mode
                <div className="p-6 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                        <p className="text-lg font-medium text-gray-800">{finalQuestionState}</p>
                        <button 
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-normal-maroon cursor-pointer p-1 rounded-full hover:bg-gray-100"
                            onClick={handleEditClick}
                            title="Edit"
                        >
                            <PenLine size={16} />
                        </button>
                    </div>
                    <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <p className="text-gray-400 text-sm italic">Short answer text...</p>
                    </div>
                </div>
            )}
        </div>
    );
}