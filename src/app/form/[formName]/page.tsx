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
            try {
                const response = await fetch(`/api/forms?name=${encodeURIComponent(formNameParse)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.status === 404) {
                    router.push('/404');
                    return;
                }

                const data = await response.json();
                const formFetched = data.data as Form;
                setForms([formFetched]);
            } catch (error) {
                console.error("Error fetching form", error);
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
            <div className="min-h-screen bg-gray-50 w-full flex justify-center py-10 px-4">
                <div className="w-full max-w-3xl flex flex-col gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border-t-8 border-normal-maroon">
                        <h1 className="text-4xl font-bold text-gray-900">{formNameParse}</h1>
                        <p className="text-gray-500 mt-2">
                             {forms.find(f => f.name === formNameParse)?.description || "Please fill out the form below."}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        { isLoadingFormInput? (
                                <div className="w-full flex justify-center py-10">
                                    <ClimbingBoxLoader size={12} color={"#670a0a"}></ClimbingBoxLoader>
                                </div>
                            ) : (
                                formInputs.map((formInput) => (
                                    <div className="w-full" key={formInput.id}>
                                        {
                                            FormInputFactory.getFormInput(formInput, answers[formInput.id], (value) => handleAnswerChange(formInput.id, value))
                                        }
                                    </div>
                                ))
                            )
                        }
                    </div>

                    {
                        !isLoadingFormInput && (
                            <div className="flex justify-between items-center mt-4 px-2">
                               {
                                    isLoading ? (
                                        <div className="w-full flex justify-center">
                                            <ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
                                        </div>
                                    ) : (
                                        <button 
                                            className="bg-normal-maroon hover:bg-dark-maroon text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 w-full sm:w-auto" 
                                            onClick={processAnswer}
                                        >
                                            Submit Form
                                        </button>
                                    )
                               }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}