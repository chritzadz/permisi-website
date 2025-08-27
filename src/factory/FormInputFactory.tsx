import FormInputTextBox from "@/components/formInputTextBox";
import { JSX } from "react";

export default abstract class FormInputFactory {
    public static getFormInput(type: string): JSX.Element | null {
        switch(type){
            case "text":
                return(<FormInputTextBox type={type}></FormInputTextBox>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}