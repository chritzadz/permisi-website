'use client';

import { FormPageProp } from "@/components/properties/FormPageProp.ts";
import FormInputFactory from "@/factory/FormInputFactory";
import { Form } from "@/model/formInputModel/Form";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function FormPage({ params }: FormPageProp) {
    const router = useRouter();
    const { formName } = React.use(params);
    const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
    const formNameParse = formName.split('%20').join(' ');
    const [answers, setAnswers] = useState<{ [id: string]: string }>({}); //in hashmap form or object
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFormInput, setIsLoadingFormInput] = useState(true);
    const [forms, setForms] = useState<Form[]>([]);
    
    const handleAnswerChange = (id: number, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    }

    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('/api/forms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            const formsFetched = data.data as Form[];
            setForms(formsFetched);

            const found = formsFetched.some(f => f.name === formNameParse);
            if (!found) {
                router.push('/404');
            }
        };

        fetchForms();
    }, [formNameParse, router])

    const processAnswer = () => {
        setIsLoading(true);

        const matchedForm = forms.find(f => f.name === formNameParse);
        const spreadsheetId: string | undefined = matchedForm?.google_sheet_id;
        fetch('/api/sheets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers, spreadsheetId }),
        })
        .then(async res => {
            const data = await res.json();
            if (!res.ok || data.error) {
                throw new Error(data.error || 'Unknown error');
            }
            return data;
        })
        .then(() => {
            router.push(`/formThankyou/${formNameParse}`);
            setIsLoading(false);
            setAnswers({});
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
            setFormInputs(data.data as FormInputModel[])
            setIsLoadingFormInput(false);
        };
        fetchFormComponents();
    }, [formName]);

    return(
        <>
            <div className="w-full justify-center items-center p-5 flex flex-col">
                <h1 className="text-3xl font-bold py-3">{formNameParse}</h1>
                <div className="bg-normal-creme w-full h-screen gap-3 flex flex-col rounded-2xl">
                    { isLoadingFormInput? (
                            <div className="w-full flex justify-center">
                                <ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
                            </div>
                        ) : (
                            formInputs.map((formInput) => (
                                <div className="w-full text-md" key={formInput.id}>
                                    {
                                        FormInputFactory.getFormInput(formInput, answers[formInput.id], (value) => handleAnswerChange(formInput.id, value))
                                    }
                                </div>
                            ))
                        )
                    }
                    {
                        isLoading ? (
                            <div className="w-full flex justify-center">
                                <ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
                            </div>
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