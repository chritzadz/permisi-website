import FormInputOptionBox from "@/components/formInputOptionBox";
import FormInputTextBox from "@/components/formInputTextBox";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { JSX } from "react";

export default abstract class FormInputFactory {
    public static getFormInput(formInput: FormInputModel): JSX.Element | null {
        switch(formInput.type){
            case "text":
                return(<FormInputTextBox type={formInput.type} question={formInput.question} id={formInput.id} onDelete={() => {}}></FormInputTextBox>);
            case "option":
                return(<FormInputOptionBox type={formInput.type} form_input_id={formInput.id} question={formInput.question}></FormInputOptionBox>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}