"use client";

import { useEffect, useState } from "react";
import { FormInputOptionBoxProp } from "./properties/FormInputOptionBoxProp";
import { Option } from "@/model/formInputModel/Option";

export default function FormInputOptionBox({type, form_input_id, question}: FormInputOptionBoxProp) {
    const [options, setOptions] = useState<Option[]>([]);
    useEffect(() => {
        const fetchOptions = async () => {
            const response = await fetch(`/api/options?forminputid=${form_input_id}`, {
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
    }, [])

    return (
        <div className="w-full border-black">
            <p>{question}</p>
            {
                options.map((option, index) => (
                    <div key={index} className="ml-5">
                        <label>
                            <input type="radio" value={"option"+index} />
                            {option.option}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}