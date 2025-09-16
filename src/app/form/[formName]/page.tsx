'use client';

import { FormPageProp } from "@/components/properties/FormPageProp.ts";
import { GoogleServiceController } from "@/controller/googleServiceController";
import FormInputFactory from "@/factory/FormInputFactory";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import React from "react";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function FormPage({ params }: FormPageProp) {
    const { formName } = React.use(params);
    const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
    const formNameParse = formName.split('%20').join(' ');
    const [answers, setAnswers] = useState<{ [id: string]: any }>({}); //in hashmap form or object
    const [isLoading, setIsLoading] = useState(false);    
    
    const handleAnswerChange = (id: number, value: any) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    }

    const processAnswer = () => {
        setIsLoading(true);

        // check if all answers is not null (optional validation here)

        // POST answers to backend API route for sheets
        const spreadsheetId: string = "test"
        fetch('/api/sheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers, spreadsheetId }),
        })
        .then(res => res.json())
        .then(data => {
            setIsLoading(false);
            console.log('Sheet response:', data);
        })
        .catch(err => {
            setIsLoading(false);
            console.error('Sheet error:', err);
        });
    }

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
                <div className="bg-normal-creme w-full h-screen gap-3 flex flex-col rounded-2xl">
                    {
                        formInputs.map((formInput) => (
                            <div className="w-full text-md" key={formInput.id}>
                                {
                                    FormInputFactory.getFormInput(formInput, answers[formInput.id], (value) => handleAnswerChange(formInput.id, value))
                                }
                            </div>
                        ))
                    }
                    { 
                        isLoading ? (
                            <ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
                        ) : (
                            <div className="w-full flex justify-center">
                                <button className="flex flex-col justify-center items-center bg-normal-maroon w-24 p-2 rounded-lg text-normal-creme" onClick={processAnswer}>Submit</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}