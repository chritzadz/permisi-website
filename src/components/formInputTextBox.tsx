import { FormInputTextBoxProp } from "./properties/FormInputTextBoxProp";

export default function formInputTextBox({type, question}: FormInputTextBoxProp) {
    return (
        <div className="w-full p-5 flex flex-col gap-2">
            <p className="pl-1">{question}</p>
            <input type="text" placeholder="Please enter here..." className="w-full border-1 focus:border-dark-maroon focus:border-2 p-2"/>
        </div>
    )
}