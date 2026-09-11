import { ChevronDown, Plus, X } from "lucide-react";
import LoadingSpinner from "@/components/loadingSpinner";
import { modalFieldClass } from "./CreateFormModal";
import { DisplayBebasNeue } from "@/lib/font";

interface CreateFormInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    currentType: string;
    onTypeChange: (value: string) => void;
    question: string;
    onQuestionChange: (value: string) => void;
    isLoading?: boolean;
}

export default function CreateFormInputModal({
    isOpen,
    onClose,
    onSubmit,
    currentType,
    onTypeChange,
    question,
    onQuestionChange,
    isLoading = false
}: CreateFormInputModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isValid = currentType !== "" && question.trim() !== "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-[28rem] max-w-full m-4 cursor-default" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="bg-normal-maroon text-normal-creme rounded-sm p-2">
                            <Plus size={18} />
                        </span>
                        <h3 className={`${DisplayBebasNeue.className} text-2xl tracking-wide text-normal-maroon leading-none`}>
                            Add Question
                        </h3>
                    </div>
                    <button
                        aria-label="Close"
                        className="p-1.5 rounded-full text-gray-400 hover:text-dark-maroon hover:bg-normal-creme transition-colors"
                        onClick={onClose}
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    className="flex flex-col gap-4"
                    onSubmit={e => {
                        e.preventDefault();
                        if (!isLoading && isValid) {
                            onSubmit();
                        }
                    }}
                >
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-type" className="text-sm font-semibold text-gray-700">
                            Input Type <span className="text-normal-maroon">*</span>
                        </label>
                        <div className="relative">
                            <select 
                                id="input-type"
                                className={`${modalFieldClass} appearance-none pr-9 bg-white`}
                                value={currentType}
                                onChange={e => onTypeChange(e.target.value)}
                            >
                                <option value="">Select type...</option>
                                <option value="text">Text Input</option>
                                <option value="option">Multiple Choice</option>
                                <option value="number">Number Input</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-normal-maroon">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-question" className="text-sm font-semibold text-gray-700">
                            Question <span className="text-normal-maroon">*</span>
                        </label>
                        <input 
                            id="input-question"
                            type="text" 
                            value={question} 
                            onChange={e => onQuestionChange(e.target.value)} 
                            className={modalFieldClass}
                            placeholder="e.g. What is your full name?"
                            autoFocus
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button 
                            type="button"
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={!isValid || isLoading}
                            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
                                isValid 
                                    ? 'bg-normal-maroon hover:bg-dark-maroon text-normal-creme' 
                                    : 'bg-normal-maroon/30 text-normal-creme/80 cursor-not-allowed'
                            } ${isLoading ? 'cursor-wait' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size={16} /> Adding...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} /> Add Question
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
