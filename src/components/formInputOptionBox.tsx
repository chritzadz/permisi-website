"use client";

import { useEffect, useState } from "react";
import { FormInputOptionBoxProp } from "./properties/FormInputOptionBoxProp";
import { Option } from "@/model/formInputModel/Option";

export default function FormInputOptionBox({type, id, question, value, onChange}: FormInputOptionBoxProp) {
    console.log(type + value);
    const [options, setOptions] = useState<Option[]>([]);

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
        };
        fetchOptions();
    }, [id])

    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-4">
            <label className="block text-lg font-medium text-gray-800 mb-4 ml-1">{question}</label>
            <div className="flex flex-col gap-3">
                {
                    options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="radio" 
                                    name={`option-group-${id}`} 
                                    value={option.option} 
                                    checked={value === option.option}
                                    onChange={() => onChange(option.option)}
                                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-normal-maroon checked:border-[6px] transition-all"
                                />
                            </div>
                            <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{option.option}</span>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}