import { FormInputNumberBoxProp } from "./properties/FormInputNumberBoxProp";

export default function formInputNumberBox({question, value, onChange}: FormInputNumberBoxProp) {
    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-normal-maroon/15">
            <label className="block text-lg font-medium text-gray-900 mb-3 ml-1">{question}</label>
            <input
                type="number"
                value={value ?? ""}
                onChange={e => onChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full text-md border-b-2 border-gray-200 hover:border-normal-maroon/40 focus:border-normal-maroon bg-gray-50/50 focus:bg-white outline-none py-2 px-3 rounded-t-md transition-all"
            />
        </div>
    )
}