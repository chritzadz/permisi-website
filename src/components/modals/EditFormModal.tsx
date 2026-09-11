import LoadingSpinner from "@/components/loadingSpinner";
import { modalFieldClass } from "./CreateFormModal";
import { Check, Pencil, X } from "lucide-react";
import { DisplayBebasNeue } from "@/lib/font";

interface EditFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    formName: string;
    googleSheetsId: string;
    onGoogleSheetsIdChange: (value: string) => void;
    description: string;
    onDescriptionChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    isLoadingLoad: boolean;
}

export default function EditFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    formName,
    googleSheetsId,
    onGoogleSheetsIdChange,
    description,
    onDescriptionChange,
    status,
    onStatusChange,
    isLoadingLoad
}: EditFormModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-[28rem] max-w-full m-4 cursor-default" onClick={e => e.stopPropagation()}>
                {
                    isLoadingLoad ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-10">
                            <LoadingSpinner size={28} />
                            <p className={`${DisplayBebasNeue.className} text-lg tracking-widest text-normal-maroon`}>
                                Loading form details...
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="bg-normal-maroon text-normal-creme rounded-sm p-2">
                                        <Pencil size={18} />
                                    </span>
                                    <h3 className={`${DisplayBebasNeue.className} text-2xl tracking-wide text-normal-maroon leading-none`}>
                                        Edit Form Details
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
                                    if (!isLoading) {
                                        onSubmit();
                                    }
                                }}
                            >
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-form-name" className="text-sm font-semibold text-gray-700">
                                        Form Name
                                    </label>
                                    <input 
                                        id="edit-form-name"
                                        type="text" 
                                        value={formName} 
                                        disabled
                                        className="w-full border border-gray-200 rounded-sm p-2.5 bg-gray-100 text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500">Form name cannot be changed.</p>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-form-sheet" className="text-sm font-semibold text-gray-700">
                                        Google Sheets ID
                                    </label>
                                    <input
                                        id="edit-form-sheet"
                                        type="text"
                                        value={googleSheetsId}
                                        onChange={e => onGoogleSheetsIdChange(e.target.value)} 
                                        className={`${modalFieldClass} font-mono text-sm`}
                                        placeholder="Enter Sheet ID"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-form-description" className="text-sm font-semibold text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="edit-form-description"
                                        value={description}
                                        onChange={e => onDescriptionChange(e.target.value)} 
                                        className={`${modalFieldClass} resize-none h-24`}
                                        placeholder="What is this form for?"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="edit-form-status" className="text-sm font-semibold text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        id="edit-form-status"
                                        value={status}
                                        onChange={e => onStatusChange(e.target.value)}
                                        className={`${modalFieldClass} bg-white`}
                                    >
                                        <option value="OPEN">OPEN — accepting responses</option>
                                        <option value="CLOSED">CLOSED — closed for submissions</option>
                                    </select>
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
                                        disabled={isLoading}
                                        className={`px-4 py-2 bg-normal-maroon hover:bg-dark-maroon text-normal-creme rounded-sm transition-colors flex items-center gap-2 ${isLoading ? 'cursor-wait' : ''}`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <LoadingSpinner size={16} /> Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check size={16} /> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )
                }
            </div>
        </div>
    );
}
