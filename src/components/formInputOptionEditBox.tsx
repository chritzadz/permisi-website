'use client';
import { useEffect, useState } from "react";
import { FormInputOptionEditBoxProp } from "./properties/FormInputOptionEditBoxProp";
import { Option } from "@/model/formInputModel/Option";
import { Check, Trash2, Circle, Plus, PenLine, X } from "lucide-react";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { apiFetch } from "@/lib/apiFetch";
import { DisplayBebasNeue } from "@/lib/font";

export default function FormInputOptionEditBox({id, question, onDelete, state, setState, index = 0}: FormInputOptionEditBoxProp) {
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

    const commitPendingOption = () => {
        const trimmed = newOption.trim();
        if (trimmed === "") return;
        setOptionStates(prev => prev.includes(trimmed) ? prev : [...prev, trimmed]);
        setNewOptionState("");
    }

    const handleRemoveOption = (i: number) => {
        setOptionStates(prev => prev.filter((_, idx) => idx !== i));
    }

    const handleCheckClick = async () => {
        const pending = newOption.trim();
        const finalOptions = pending !== "" && !optionStates.includes(pending)
            ? [...optionStates, pending]
            : optionStates;

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
                options: finalOptions
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

    const handleEditClick = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setState(id);
        setQuestionState(finalQuestionState);
    }

    const handleCancelClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setQuestionState(finalQuestionState);
        setOptionStates(options.map(o => o.option));
        setNewOptionState("");
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
            { isActive ? (
                // Edit Mode
                <div className="p-6 flex flex-col gap-4 animate-in fade-in duration-200">
                    <div className="flex flex-col gap-2 border-b border-normal-maroon/10 pb-4">
                        <label className="flex items-center gap-2">
                            <span className={`${DisplayBebasNeue.className} text-xl leading-none text-normal-maroon/50`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xs font-bold text-normal-maroon uppercase tracking-wider">
                                Editing Multiple Choice
                            </span>
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
                        {optionStates.map((option, index) => (
                            <div key={index} className="flex items-center gap-3 group/option">
                                <Circle size={18} className="text-normal-maroon/40 shrink-0" />
                                <input 
                                    type="text" 
                                    value={option} 
                                    onChange={e => handleOptionChange(index, e.target.value)} 
                                    className="flex-1 min-w-0 text-gray-700 border-b border-transparent focus:border-normal-maroon/40 hover:border-gray-200 bg-transparent outline-none py-1 transition-colors"
                                    placeholder={`Option ${index + 1}`}
                                />
                                <button
                                    aria-label={`Remove option ${index + 1}`}
                                    title="Remove option"
                                    className="p-1 rounded-full text-gray-300 hover:text-dark-maroon hover:bg-white opacity-0 group-hover/option:opacity-100 transition-all"
                                    onClick={() => handleRemoveOption(index)}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                        
                        <div className="flex items-center gap-3 mt-1">
                            <button
                                aria-label="Add option"
                                title="Add option"
                                className="text-normal-maroon hover:text-dark-maroon transition-colors shrink-0"
                                onClick={commitPendingOption}
                            >
                                <Plus size={18} />
                            </button>
                            <input 
                                type="text" 
                                value={newOption} 
                                onChange={e => setNewOptionState(e.target.value)} 
                                className="flex-1 min-w-0 text-gray-600 italic border-b border-transparent focus:border-normal-maroon/40 bg-transparent outline-none py-1 transition-colors"
                                placeholder="Add option, then press Enter"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        commitPendingOption();
                                    }
                                }}
                            />
                        </div>
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
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                            <span className={`${DisplayBebasNeue.className} text-2xl leading-none text-normal-maroon/40 shrink-0`}>
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="text-lg font-medium text-gray-900">{finalQuestionState}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-normal-maroon border border-normal-maroon/30 rounded-full px-2 py-1">
                                Choice
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
                    
                    <div className="flex flex-col gap-2 ml-9">
                        {optionStates.map((option, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></span>
                                <p className="text-gray-700">{option}</p>
                            </div>
                        ))}
                        {optionStates.length === 0 && (
                            <p className="text-gray-400 text-sm italic">No options added yet</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
