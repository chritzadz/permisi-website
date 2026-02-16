import { FormInputNumberBoxProp } from "./properties/FormInputNumberBoxProp";

export default function formInputNumberBox({type, question, value, onChange}: FormInputNumberBoxProp) {
    return (
        <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-4">
            <label className="block text-lg font-medium text-gray-800 mb-3 ml-1">{question}</label>
            <input
                type="number"
                value={value ?? ""}
                onChange={e => onChange(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full text-md border-b-2 border-gray-200 focus:border-normal-maroon bg-gray-50/50 focus:bg-white outline-none py-2 px-3 rounded-t-md transition-all"
            />
        </div>
    )
}