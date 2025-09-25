'use client';
import { useEffect, useState } from "react";
import { FormInputOptionBoxProp } from "./properties/FormInputOptionBoxProp";
import { Option } from "@/model/formInputModel/Option";
import { Check, Trash2 } from "lucide-react";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";

export default function FormInputOptionEditBox({type, id, question, onDelete, state, setState}: FormInputOptionBoxProp) {
    console.log(type);
    const [options, setOptions] = useState<Option[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [questionState, setQuestionState] = useState(question);
    const [optionStates, setOptionStates] = useState<string[]>(options.map(o => o.option));
    const [newOption, setNewOptionState] = useState("");
    const [finalQuestionState, setFinalQuestionState] = useState(question);
    
    const handleCheckClick = async () => {
        //update question, update options, update new option if any
        const response = await fetch('/api/formInputs', {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                question: questionState
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        const newFormInput = data.data as FormInputModel;

        setFinalQuestionState(newFormInput.question);
        setQuestionState(newFormInput.question);

        console.log("start update options")
        const response1 = await fetch('/api/options', {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                oldOptions: options,
                options: optionStates,
                newOption: newOption
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data1 = await response1.json();
        console.log(data1.data as Option[]);
        setOptions(data1.data as Option[]);
        setOptionStates((data1.data as Option[]).map(o => o.option))
        setNewOptionState("");
        setIsEditMode(false);
    }

    const handleDoubleClick = () => {
        setState(id);
        setQuestionState(finalQuestionState);   
    }

    const handleMouseLeave = () => {
        setOptionStates(options.map(o => o.option));
        setIsEditMode(false);
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
            const response = await fetch(`/api/options?forminputid=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data.data as Option[]);
            setOptions(data.data as Option[]);
            setOptionStates((data.data as Option[]).map(o => o.option))
        };
        fetchOptions();
    }, [id])

    return (
        <>
            { state == id ? (
                    <div className="w-full border-black p-5 flex flex-col" onClick={() => {}}>
                        <input type="text" value={questionState} placeholder="Write your question..." onChange={e => setQuestionState(e.target.value)} className="w-full border-2"/>
                        {
                            <div className="ml-5">
                                {
                                    options.map((option, index) => (
                                        <div key={index} className="">
                                            <label className="flex flex-row">
                                                <input type="radio" value={"option"+index} />
                                                <input type="text" value={optionStates[index]} onChange={e => handleOptionChange(index, e.target.value)} className="w-full border-2"/>
                                            </label>
                                        </div>
                                    ))
                                }
                                {

                                }
                                <label className="flex flex-row">
                                    <input type="radio" />
                                    <input type="text" value={newOption} onChange={e => setNewOptionState(e.target.value)} className="w-full border-2"/>
                                </label>
                            </div>
                        }
                        <div className="flex flex-row justify-end gap-2">
                            <Check size={32} onClick={handleCheckClick} />
                            <Trash2 size={32} onClick={onDelete} />
                        </div>
                    </div>
                ) : (
                    <div className="w-full border-black p-5" onDoubleClick={handleDoubleClick}>
                        <p className="pl-1">{questionState}</p>
                        {
                            options.map((option, index) => (
                                <div key={index} className="ml-5 w-full">
                                    <label className="flex w-full flex-row gap-3">
                                        <input type="radio" value={"option"+index}/>
                                        <p className="text-sm">{option.option}</p>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}