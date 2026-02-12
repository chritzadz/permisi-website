import { ClimbingBoxLoader } from "react-spinners";
import { Pencil } from "lucide-react";

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
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4 cursor-default">
                {
                    isLoadingLoad ? (
                        <div className="">
                            <div className="flex items-center justify-center w-full h-full">
                                <ClimbingBoxLoader size={8} color={"#670a0a"} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-normal-maroon">
                                <Pencil size={24} />
                                <h3 className="text-lg font-bold">Edit Form Details</h3>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Form Name</label>
                                    <input 
                                        type="text" 
                                        value={formName} 
                                        disabled
                                        className="border border-gray-300 rounded p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500">Form name cannot be changed</p>
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
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={e => onDescriptionChange(e.target.value)} 
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:border-normal-maroon focus:ring-1 focus:ring-normal-maroon text-black resize-none h-24"
                                        placeholder="Enter form description"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-2">
                                <>
                                    <button
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </button>
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <ClimbingBoxLoader size={6} color={"#670a0a"} />
                                        </div>
                                    ) : (
                                        <button
                                            className="px-4 py-2 bg-normal-maroon hover:bg-dark-maroon text-white rounded transition-colors flex items-center gap-2"
                                            onClick={onSubmit}
                                        >
                                            <Pencil size={16} /> Update
                                        </button>
                                    )}
                                </>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
}
