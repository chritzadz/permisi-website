'use client';

import { FormPageProp } from "@/components/properties/FormPageProp.ts";
import FormInputFactory from "@/factory/FormInputFactory";
import { Form } from "@/model/formInputModel/Form";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scrollReveal";
import LoadingSpinner from "@/components/loadingSpinner";
import Button from "@/components/ui/button";
import { DisplayBebasNeue, MainInter } from "@/lib/font";
import { Check } from "lucide-react";

export default function FormPage({ params }: FormPageProp) {
  const router = useRouter();
  const { formName } = React.use(params);
  const formNameParse = formName.split('%20').join(' ');
  
  const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [form, setForm] = useState<Form | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
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
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    setSubmitError("");

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
      // Keep the button area in its "done" state (no re-render of the form,
      // no cleared inputs) and glide to the thank-you page.
      setIsSubmitted(true);
      setTimeout(() => {
        router.push(`/formThankyou/${encodeURIComponent(formNameParse)}`);
      }, 900);
    })
    .catch(err => {
      console.error('Sheet error:', err);
      setIsSubmitting(false);
      setSubmitError(err instanceof Error && err.message && err.message !== 'Unknown error'
        ? err.message
        : "Something went wrong sending your response. Please try again.");
    });
  }

  if (isPageLoading) {
    return (
      <div className="w-full h-screen bg-normal-creme flex flex-col justify-center items-center gap-4">
        <LoadingSpinner size={48} />
        <p className={`${DisplayBebasNeue.className} text-2xl tracking-widest text-normal-maroon`}>
          Loading form...
        </p>
      </div>
    )
  }

  return(
    <>
      <div className="relative min-h-screen">
        <section className="pt-28 pb-8 sm:pt-32 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 w-full">
            {/* Form header */}
            <ScrollReveal>
              <p className={`${DisplayBebasNeue.className} text-lg tracking-[0.3em] text-normal-maroon/70`}>
                PERMISI HK
              </p>
              <h1 className={`${DisplayBebasNeue.className} mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-normal-maroon tracking-wide leading-none`}>
                {formNameParse}
              </h1>
              <div className="mt-4 h-1 w-16 bg-normal-maroon" />
              <p className={`${MainInter.className} mt-4 text-sm sm:text-base text-gray-600`}>
                {form?.description || "Please fill out the form below."}
              </p>
            </ScrollReveal>

            {/* Closed state */}
            {form?.status === 'CLOSED' ? (
              <ScrollReveal delay={0.1}>
                <div className="mt-8 sm:mt-10 rounded-xl border border-normal-maroon/15 bg-normal-creme p-8 sm:p-10 text-center">
                  <p className={`${DisplayBebasNeue.className} text-3xl sm:text-4xl tracking-wide text-normal-maroon leading-none`}>
                    This form is closed
                  </p>
                  <p className={`${MainInter.className} mt-3 text-sm sm:text-base text-gray-600`}>
                    Registration is not open yet, or it has already closed.
                    Please check back later or contact us for details.
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <>
                {/* Questions */}
                <div className="flex flex-col gap-4 mt-8 sm:mt-10">
                  { 
                    formInputs.map((formInput, index) => (
                      <div className="w-full" key={formInput.id}>
                        <ScrollReveal delay={Math.min(index * 0.05, 0.3)}>
                          {
                            FormInputFactory.getFormInput(formInput, answers[formInput.id], (value) => handleAnswerChange(formInput.id, value))
                          }
                        </ScrollReveal>
                      </div>
                    ))
                  }
                </div>

                {/* Submit */}
                <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:mt-10">
                  {
                    isSubmitted ? (
                      <p className="inline-flex items-center gap-2 text-normal-maroon font-bold">
                        <Check className="h-5 w-5" />
                        Response received — taking you there…
                      </p>
                    ) : isSubmitting ? (
                      <LoadingSpinner size={28} label="Submitting..." />
                    ) : (
                      <Button size="lg" onClick={processAnswer} className="px-8">
                        Submit Form
                      </Button>
                    )
                  }
                  {submitError && !isSubmitting && !isSubmitted && (
                    <p className="text-sm text-dark-maroon bg-normal-creme border border-normal-maroon/30 rounded-sm px-4 py-2">
                      {submitError}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      {/* Footer at bottom of page content */}
      <Footer />
    </>
  )
}
