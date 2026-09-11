'use client';
import { useEffect, useState } from "react";
import { FormInputOptionEditBoxProp } from "./properties/FormInputOptionEditBoxProp";
import { Option } from "@/model/formInputModel/Option";
import { Check, Trash2, Circle, Plus, PenLine } from "lucide-react";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { apiFetch } from "@/lib/apiFetch";

export default function FormInputOptionEditBox({type, id, question, onDelete, state, setState}: FormInputOptionEditBoxProp) {
    const [options, setOptions] = useState<Option[]>([]);
    const [questionState, setQuestionState] = useState(question);
    const [optionStates, setOptionStates] = useState<string[]>([]);
    const [newOption, setNewOptionState] = useState("");
    const [finalQuestionState, setFinalQuestionState] = useState(question);
    
    // Sync optionStates when options are loaded
    useEffect(() => {
        if(options.length > 0) {
            setOptionStates(options.map(o => o.option));
        }
    }, [options]);

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

        const response1 = await apiFetch('/api/options', {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                oldOptions: options,
                options: optionStates,
                newOption: newOption
            }),
        });

        const data1 = await response1.json();
        setOptions(data1.data as Option[]);
        setOptionStates((data1.data as Option[]).map(o => o.option))
        setNewOptionState("");
        setState(-100); // Exit edit mode
    }

    const handleOptionChange = (i: number, value: string) => {
        setOptionStates(prev => {
            const updated = [...prev];
            updated[i] = value;
            return updated;
        })
    }

    useEffect(() => {
        const fetchOptions = async () => {
            const response = await apiFetch(`/api/options?forminputid=${id}`, {
                method: 'GET',
            });
            const data = await response.json();
            setOptions(data.data as Option[]);
            setOptionStates((data.data as Option[]).map(o => o.option))
        };
        fetchOptions();
    }, [id])

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
                    ? 'bg-normal-creme  shadow-lg ring-1 ring-normal-maroon/20 scale-[1.01] z-10' 
                    : 'bg-normal-creme  hover:bg-normal-creme border border-gray-200 shadow-sm hover:shadow-md'
                }
            `}
        >
            { isActive ? (
                // Edit Mode
                <div className="p-6 flex flex-col gap-4 animate-in fade-in duration-200">
                    <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
                        <label className="text-xs font-bold text-normal-maroon uppercase tracking-wider">
                            Editing Multiple Choice
                        </label>
                        <input 
                            type="text" 
                            value={questionState} 
                            placeholder="Question" 
                            autoFocus
                            onChange={e => setQuestionState(e.target.value)} 
                            className="w-full text-lg font-medium border-b-2 border-gray-200 focus:border-normal-maroon bg-transparent outline-none py-2 px-1 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-3 pl-1">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Circle size={18} className="text-gray-300" />
                                <input 
                                    type="text" 
                                    value={optionStates[index] || ''} 
                                    onChange={e => handleOptionChange(index, e.target.value)} 
                                    className="flex-1 text-gray-700 border-b border-transparent focus:border-gray-300 hover:border-gray-200 bg-transparent outline-none py-1 transition-colors"
                                    placeholder={`Option ${index + 1}`}
                                />
                            </div>
                        ))}
                        
                        <div className="flex items-center gap-3 mt-1">
                            <Plus size={18} className="text-gray-400" />
                            <input 
                                type="text" 
                                value={newOption} 
                                onChange={e => setNewOptionState(e.target.value)} 
                                className="flex-1 text-gray-600 italic border-b border-transparent focus:border-gray-300 bg-transparent outline-none py-1 transition-colors"
                                placeholder="Add option..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCheckClick();
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-end gap-2 pt-2 border-t border-gray-100 mt-2">
                        <button 
                            className="p-2 text-gray-400 hover:text-dark-maroon hover:bg-normal-creme rounded-full transition-colors"
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
                <div className="p-6 flex flex-col gap-4">
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
                    
                    <div className="flex flex-col gap-2 pl-1">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <span className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"></span>
                                <p className="text-gray-600 text-sm">{option.option}</p>
                            </div>
                        ))}
                        {options.length === 0 && (
                            <p className="text-gray-400 text-sm italic">No options added yet</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
