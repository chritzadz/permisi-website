import FormInputOptionEditBox from "@/components/formInputOptionEditBox";
import FormInputTextEditBox from "@/components/formInputTextEditBox";
import FormInputNumberEditBox from "@/components/formInputNumberEditBox";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { JSX } from "react";

export default abstract class FormInputEditFactory {
    public static getFormInput(formInput: FormInputModel, onDelete: (id: number) => void, selectedState: number, setSelectedFormInput: React.Dispatch<React.SetStateAction<number>>, index: number): JSX.Element | null {
        switch(formInput.type){
            case "text":
                return(<FormInputTextEditBox type={formInput.type} question={formInput.question} id={formInput.id} onDelete={() => {onDelete(formInput.id)}} value={''} onChange={() => {}} state={selectedState} setState={setSelectedFormInput} index={index}></FormInputTextEditBox>);
            case "option":
                return(<FormInputOptionEditBox type={formInput.type} id={formInput.id} question={formInput.question} onDelete={() => {onDelete(formInput.id)}} value={""} onChange={() => {}} state={selectedState} setState={setSelectedFormInput} index={index}></FormInputOptionEditBox>);
            case "number":
                return(<FormInputNumberEditBox type={formInput.type} question={formInput.question} id={formInput.id} onDelete={() => {onDelete(formInput.id)}} value={''} onChange={() => {}} state={selectedState} setState={setSelectedFormInput} index={index}></FormInputNumberEditBox>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}
