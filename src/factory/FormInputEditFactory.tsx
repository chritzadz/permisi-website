import FormInputOptionEditBox from "@/components/formInputOptionEditBox";
import FormInputTextEditBox from "@/components/formInputTextEditBox";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { JSX } from "react";

export default abstract class FormInputEditFactory {
    public static getFormInput(formInput: FormInputModel): JSX.Element | null {
        switch(formInput.type){
            case "text":
                return(<FormInputTextEditBox type={formInput.type} question={formInput.question} id={formInput.id}></FormInputTextEditBox>);
            case "option":
                return(<FormInputOptionEditBox type={formInput.type} form_input_id={formInput.id} question={formInput.question}></FormInputOptionEditBox>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}