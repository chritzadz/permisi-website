import { useState } from "react";
import { FormInputTextBoxProp } from "./properties/FormInputTextBoxProp";
import { Trash2, Check } from 'lucide-react';
import { FormInputModel } from "@/model/formInputModel/FormInputModel";

export default function FormInputTextEditBox({type, question, id, onDelete}: FormInputTextBoxProp) {
    console.log(type)
    const handleDoubleClick = () => {
        setIsEditMode(true);
        setQuestionState(finalQuestionState);   
    }

    const handleMouseLeave = () => {
        setIsEditMode(false);
    }

    const handleCheckClick = async () => {
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
        setIsEditMode(false);
    }

    const [isEditMode, setIsEditMode] = useState(false);
    const [questionState, setQuestionState] = useState(question);
    const [finalQuestionState, setFinalQuestionState] = useState(question); 

    return (
        <>
            {
                isEditMode ? (
                    <div className="w-full p-5 flex flex-col gap-2" onMouseLeave={handleMouseLeave}>
                        <input type="text" value={questionState} placeholder="Write your question..." onChange={e => setQuestionState(e.target.value)} className="w-full border-2"/>
                        <div className="flex flex-row justify-end gap-2">
                            <Check size={32} onClick={handleCheckClick} />
                            <Trash2 size={32} onClick={onDelete} />
                        </div>
                    </div>
                ) : (
                    <div className="w-full p-5 flex flex-col gap-2" onDoubleClick={handleDoubleClick} onMouseLeave={handleMouseLeave}>
                        <p className="pl-1">{finalQuestionState}</p>
                        <input type="text" placeholder="Please enter here..." className="w-full border-1 focus:border-dark-maroon focus:border-2 p-2"/>
                    </div>
                )
            }
        </>
        
    )
}