import FormInputOptionEditBox from "@/components/formInputOptionEditBox";
import FormInputTextEditBox from "@/components/formInputTextEditBox";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { JSX } from "react";

export default abstract class FormInputEditFactory {
    public static getFormInput(formInput: FormInputModel, onDelete: (id: number) => void, selectedState: number, setSelectedFormInput: React.Dispatch<React.SetStateAction<number>>): JSX.Element | null {
        switch(formInput.type){
            case "text":
                return(<FormInputTextEditBox type={formInput.type} question={formInput.question} id={formInput.id} onDelete={() => {onDelete(formInput.id)}} value={''} onChange={() => {}} state={selectedState} setState={setSelectedFormInput}></FormInputTextEditBox>);
            case "option":
                return(<FormInputOptionEditBox type={formInput.type} id={formInput.id} question={formInput.question} onDelete={() => {onDelete(formInput.id)}} value={""} onChange={() => {}} state={selectedState} setState={setSelectedFormInput}></FormInputOptionEditBox>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}