import { Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemNameToDelete: string;
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    itemNameToDelete
}: DeleteConfirmationModalProps) {
    const [confirmName, setConfirmName] = useState("");

    if (!isOpen) return null;

    const handleConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirmName === itemNameToDelete) {
            onConfirm();
            setConfirmName(""); // Reset after confirm
        }
    };

    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
        setConfirmName(""); // Reset on cancel
    };

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleCancel}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4 cursor-default" onClick={handleModalClick}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertTriangle size={24} />
                        <h3 className="text-lg font-bold">Delete Form</h3>
                    </div>
                    
                    <p className="text-gray-600">
                        Are you sure you want to delete <span className="font-bold text-black">{itemNameToDelete}</span>? This action cannot be undone.
                    </p>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Type <span className="font-mono font-bold">{itemNameToDelete}</span> to confirm:
                        </label>
                        <input 
                            type="text" 
                            value={confirmName}
                            onChange={(e) => setConfirmName(e.target.value)}
                            className="border border-gray-300 rounded p-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-black"
                            placeholder={itemNameToDelete}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                        <button 
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className={`px-4 py-2 text-white rounded transition-colors flex items-center gap-2 ${confirmName === itemNameToDelete ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
                            onClick={handleConfirm}
                            disabled={confirmName !== itemNameToDelete}
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
