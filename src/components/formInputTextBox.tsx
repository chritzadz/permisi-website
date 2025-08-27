import { FormInputTextBoxProp } from "./properties/FormInputTextBoxProp";

export default function formInputTextBox({type, question}: FormInputTextBoxProp) {
    return (
        <div className="w-full border-black">
            <p>{question}</p>
            <input type="text" defaultValue={"PLEASE FILL IN"} className="w-full border-2 border-black"/>
        </div>
    )
}