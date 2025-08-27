import { FormInputTextBoxProp } from "./properties/FormInputText";

export default function AdminPanel({type: string}: FormInputTextBoxProp) {

    return (
        <div className="w-full border-black">
            <input type="text" defaultValue={"PLEASE FILL IN"} className="w-full"/>
        </div>
    )
}