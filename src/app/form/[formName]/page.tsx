'use client';

import { FormPageProp } from "@/components/properties/FormPageProp.ts";
import FormInputFactory from "@/factory/FormInputFactory";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import React from "react";
import { useEffect, useState } from "react";

export default function FormPage({ params }: FormPageProp) {
    const { formName } = React.use(params);
    const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
    const formNameParse = formName.split('%20').join(' ');

    useEffect(() => {
        const fetchFormComponents = async () => {
            const response = await fetch(`/api/formInputs?formid=${formName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data.data);
            setFormInputs(data.data as FormInputModel[])
        };
        fetchFormComponents();
    }, [formName]);

    return(
        <>
            <div className="w-full justify-center items-center p-5 flex flex-col">
                <h1 className="text-3xl font-bold">{formNameParse}</h1>
                <div className="bg-normal-creme w-full h-screen my-5 flex flex-col rounded-2xl">
                    {
                        formInputs.map((formInput) => (
                            <div className="w-full text-md" key={formInput.id}>
                                {
                                    FormInputFactory.getFormInput(formInput)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}