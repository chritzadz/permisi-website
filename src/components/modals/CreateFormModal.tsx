import LoadingSpinner from "@/components/loadingSpinner";
import { Plus, X } from "lucide-react";
import { DisplayBebasNeue } from "@/lib/font";

interface CreateFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    formName: string;
    onFormNameChange: (value: string) => void;
    googleSheetsId: string;
    onGoogleSheetsIdChange: (value: string) => void;
    description: string;
    onDescriptionChange: (value: string) => void;
    error?: string;
}

export const modalFieldClass =
    "w-full border border-gray-300 rounded-sm p-2.5 text-black focus:outline-none focus:border-normal-maroon focus:ring-2 focus:ring-normal-maroon/20 transition-all placeholder:text-gray-400";

export default function CreateFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    formName,
    onFormNameChange,
    googleSheetsId,
    onGoogleSheetsIdChange,
    description,
    onDescriptionChange,
    error
}: CreateFormModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const isValid = formName.trim() !== "" && googleSheetsId.trim() !== "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-[28rem] max-w-full m-4 cursor-default" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <span className="bg-normal-maroon text-normal-creme rounded-sm p-2">
                            <Plus size={18} />
                        </span>
                        <h3 className={`${DisplayBebasNeue.className} text-2xl tracking-wide text-normal-maroon leading-none`}>
                            Create New Form
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
                    {error && (
                        <div className="bg-normal-creme border border-normal-maroon/30 text-dark-maroon px-4 py-2 rounded-sm text-sm">
                            {error}
                        </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="create-form-name" className="text-sm font-semibold text-gray-700">
                            Form Name <span className="text-normal-maroon">*</span>
                        </label>
                        <input
                            id="create-form-name"
                            type="text"
                            value={formName}
                            onChange={e => onFormNameChange(e.target.value)} 
                            className={modalFieldClass}
                            placeholder="e.g. PJJY 2026 Registration"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="create-form-sheet" className="text-sm font-semibold text-gray-700">
                            Google Sheets ID <span className="text-normal-maroon">*</span>
                        </label>
                        <input
                            id="create-form-sheet"
                            type="text"
                            value={googleSheetsId}
                            onChange={e => onGoogleSheetsIdChange(e.target.value)} 
                            className={`${modalFieldClass} font-mono text-sm`}
                            placeholder="Enter Sheet ID"
                            required
                        />
                        <p className="text-xs text-gray-500">
                            Copy it from the sheet URL: <span className="font-mono">docs.google.com/spreadsheets/d/</span>
                            <span className="font-mono text-normal-maroon">[ID]</span>
                            <span className="font-mono">/edit</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="create-form-description" className="text-sm font-semibold text-gray-700">
                            Description <span className="text-xs font-normal text-gray-400">(optional)</span>
                        </label>
                        <textarea
                            id="create-form-description"
                            value={description}
                            onChange={e => onDescriptionChange(e.target.value)} 
                            className={`${modalFieldClass} resize-none h-24`}
                            placeholder="What is this form for?"
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
                            disabled={isLoading || !isValid}
                            className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
                                isValid
                                    ? 'bg-normal-maroon hover:bg-dark-maroon text-normal-creme'
                                    : 'bg-normal-maroon/30 text-normal-creme/80 cursor-not-allowed'
                            } ${isLoading ? 'cursor-wait' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size={16} /> Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} /> Create Form
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
