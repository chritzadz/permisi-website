import FormInputOptionBox from "@/components/formInputOptionBox";
import FormInputTextBox from "@/components/formInputTextBox";
import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { JSX } from "react";

export default abstract class FormInputFactory {
    public static getFormInput(formInput: FormInputModel, value: any, onChange: (value: any) => void): JSX.Element | null {
        switch(formInput.type){
            case "text":
                return(<FormInputTextBox type={formInput.type} question={formInput.question} id={formInput.id} onDelete={() => {}} value={value} onChange={onChange} ></FormInputTextBox>);
            case "option":
                return(<FormInputOptionBox type={formInput.type} id={formInput.id} question={formInput.question} onDelete={() => {}} value={value} onChange={onChange}></FormInputOptionBox>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}