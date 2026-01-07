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
  const formNameParse = formName.split('%20').join(' ');
  
  const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [form, setForm] = useState<Form | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAnswerChange = (id: number, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [formRes, inputsRes] = await Promise.all([
          fetch(`/api/forms?name=${encodeURIComponent(formNameParse)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }),
          fetch(`/api/formInputs?formid=${formName}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          })
        ]);

        if (formRes.status === 404) {
          router.push('/404');
          return;
        }

        const formData = await formRes.json();
        setForm(formData.data as Form);

        const inputsData = await inputsRes.json();
        setFormInputs(inputsData.data as FormInputModel[]);

      } catch (error) {
        console.error("Error loading form data", error);
        router.push('/404');
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchAllData();
  }, [formName, formNameParse, router]);

  const processAnswer = () => {
    setIsSubmitting(true);

    fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers, formName: formNameParse }),
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
      setIsSubmitting(false);
      setAnswers({});
    })
    .catch(err => {
      setIsSubmitting(false);
      console.error('Sheet error:', err);
    });
  }

  if (isPageLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ClimbingBoxLoader size={15} color={"#670a0a"}></ClimbingBoxLoader>
      </div>
    )
  }

  return(
    <>
      <div className="min-h-screen bg-gray-50 w-full flex justify-center py-10 px-4">
        <div className="w-full max-w-3xl flex flex-col gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-8 border-normal-maroon">
            <h1 className="text-4xl font-bold text-gray-900">{formNameParse}</h1>
            <p className="text-gray-500 mt-2">
              {form?.description || "Please fill out the form below."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            { 
              formInputs.map((formInput) => (
                <div className="w-full" key={formInput.id}>
                  {
                    FormInputFactory.getFormInput(formInput, answers[formInput.id], (value) => handleAnswerChange(formInput.id, value))
                  }
                </div>
              ))
            }
          </div>

          <div className="flex justify-between items-center mt-4 px-2">
            {
              isSubmitting ? (
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
        </div>
      </div>
    </>
  )
}