import { Plus, Type } from "lucide-react";
import { ClimbingBoxLoader } from "react-spinners";

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
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4 cursor-default">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-normal-maroon">
                        <Plus size={24} />
                        <h3 className="text-lg font-bold">Add Form Component</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Input Type</label>
                            <div className="relative">
                                <select 
                                    className="w-full appearance-none border border-gray-300 rounded p-2 pr-8 focus:outline-none focus:border-normal-maroon focus:ring-1 focus:ring-normal-maroon text-black bg-white"
                                    value={currentType}
                                    onChange={e => onTypeChange(e.target.value)}
                                >
                                    <option value="">Select type...</option>
                                    <option value="text">Text Input</option>
                                    <option value="option">Multiple Choice</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <Type size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Question</label>
                            <input 
                                type="text" 
                                value={question} 
                                onChange={e => onQuestionChange(e.target.value)} 
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-normal-maroon focus:ring-1 focus:ring-normal-maroon text-black"
                                placeholder="Enter your question"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        {isLoading ? (
                            <div className="flex items-center justify-center px-4 py-2">
                                <ClimbingBoxLoader size={8} color={"#670a0a"} />
                            </div>
                        ) : (
                            <>
                                <button 
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
                                        isValid 
                                            ? 'bg-normal-maroon hover:bg-dark-maroon text-white' 
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                    onClick={() => {
                                        if (isValid) onSubmit();
                                    }}
                                    disabled={!isValid}
                                >
                                    <Plus size={16} /> Add
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
