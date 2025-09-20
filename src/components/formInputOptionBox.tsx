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
        <div className="w-full border-black p-5">
            <p className="pl-1">{question}</p>
            {
                options.map((option, index) => (
                    <div key={index} className="ml-5 w-full">
                        <label className="flex w-full flex-row gap-3">
                            <input type="radio" name={`option-group-${id}`} value={"option"+index} onChange={() => onChange(option.option)}/>
                            <p className="text-sm">{option.option}</p>
                        </label>
                    </div>
                ))
            }
        </div>
    )
}