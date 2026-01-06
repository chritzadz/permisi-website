import { ClimbingBoxLoader } from "react-spinners";
import { Plus } from "lucide-react";

interface CreateFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    isLoading: boolean;
    formName: string;
    onFormNameChange: (value: string) => void;
    googleSheetsId: string;
    onGoogleSheetsIdChange: (value: string) => void;
}

export default function CreateFormModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    formName,
    onFormNameChange,
    googleSheetsId,
    onGoogleSheetsIdChange
}: CreateFormModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4 cursor-default">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-normal-maroon">
                        <Plus size={24} />
                        <h3 className="text-lg font-bold">Create New Form</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Form Name</label>
                            <input 
                                type="text" 
                                value={formName} 
                                onChange={e => onFormNameChange(e.target.value)} 
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-normal-maroon focus:ring-1 focus:ring-normal-maroon text-black"
                                placeholder="Enter form name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Google Sheets ID</label>
                            <input
                                type="text"
                                value={googleSheetsId}
                                onChange={e => onGoogleSheetsIdChange(e.target.value)} 
                                className="border border-gray-300 rounded p-2 focus:outline-none focus:border-normal-maroon focus:ring-1 focus:ring-normal-maroon text-black"
                                placeholder="Enter Sheet ID"
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
                                    className="px-4 py-2 bg-normal-maroon hover:bg-dark-maroon text-white rounded transition-colors flex items-center gap-2"
                                    onClick={onSubmit}
                                >
                                    <Plus size={16} /> Create
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
